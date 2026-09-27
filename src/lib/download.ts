/**
 * Audio Download Utility
 * Provides robust file downloading for audio sermons across desktop and mobile browsers.
 */

export interface DownloadProgress {
  loaded: number;
  total: number;
  percent: number;
}

/**
 * Downloads an audio file by requesting it through the backend download proxy
 * or fetching it as a blob so the browser's native download prompt is guaranteed to trigger.
 */
export async function downloadAudioFile(
  fileUrl: string,
  preferredFilename: string,
  onProgress?: (progress: DownloadProgress) => void
): Promise<void> {
  if (!fileUrl) {
    throw new Error('Audio URL is required for download.');
  }

  // Ensure clean filename with .mp3 extension
  let filename = preferredFilename.trim().replace(/[/\\?%*:|"<>]/g, '_');
  if (!filename.toLowerCase().endsWith('.mp3')) {
    filename += '.mp3';
  }

  const proxyDownloadUrl = `/api/download?url=${encodeURIComponent(fileUrl)}&filename=${encodeURIComponent(filename)}`;

  try {
    // 1. Fetch through our same-origin proxy which handles CORS and sets Content-Disposition
    const response = await fetch(proxyDownloadUrl);

    if (!response.ok) {
      throw new Error(`Download request failed with status: ${response.status}`);
    }

    const contentLength = response.headers.get('content-length');
    const totalBytes = contentLength ? parseInt(contentLength, 10) : 0;

    // If reader is supported and we have a stream, read with progress
    if (response.body && totalBytes > 0) {
      const reader = response.body.getReader();
      let receivedBytes = 0;
      const chunks: Uint8Array[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        receivedBytes += value.length;

        if (onProgress) {
          const percent = Math.min(100, Math.round((receivedBytes / totalBytes) * 100));
          onProgress({
            loaded: receivedBytes,
            total: totalBytes,
            percent,
          });
        }
      }

      // Combine chunks into a single Blob
      const blob = new Blob(chunks, { type: 'audio/mpeg' });
      triggerBlobDownload(blob, filename);
      return;
    }

    // Fallback: standard blob response if streaming reader wasn't used
    const blob = await response.blob();
    triggerBlobDownload(blob, filename);
  } catch (err) {
    console.warn('In-memory blob download failed or was interrupted, using direct link fallback:', err);
    // Fallback: direct anchor trigger pointing to /api/download which sends attachment header
    const fallbackLink = document.createElement('a');
    fallbackLink.href = proxyDownloadUrl;
    fallbackLink.setAttribute('download', filename);
    fallbackLink.style.display = 'none';
    document.body.appendChild(fallbackLink);
    fallbackLink.click();
    setTimeout(() => {
      if (document.body.contains(fallbackLink)) {
        document.body.removeChild(fallbackLink);
      }
    }, 2000);
  }
}

/**
 * Triggers browser download dialog from an in-memory Blob.
 * Because blob: URLs are same-origin, all browsers honor the download filename.
 */
function triggerBlobDownload(blob: Blob, filename: string): void {
  const blobUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.style.display = 'none';
  anchor.href = blobUrl;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();

  // Cleanup after browser triggers download
  setTimeout(() => {
    if (document.body.contains(anchor)) {
      document.body.removeChild(anchor);
    }
    URL.revokeObjectURL(blobUrl);
  }, 2000);
}
