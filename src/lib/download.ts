/**
 * Robust Audio Download Utility
 * Handles file path mapping, reliable Blob conversion, and bulletproof anchor-tag triggers.
 */

export interface DownloadProgress {
  loaded: number;
  total: number;
  percent: number;
}

/**
 * Normalizes and maps any audio file path (relative, absolute, or external CDN)
 * to a fully qualified URL for streaming or downloading.
 */
export function resolveAudioFilePath(rawPath?: string | null): string {
  if (!rawPath || typeof rawPath !== 'string') return '';
  const trimmed = rawPath.trim();
  if (!trimmed) return '';

  // Already an absolute URL or blob URL
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('data:')
  ) {
    return trimmed;
  }

  // Map relative paths based on current window origin
  if (typeof window !== 'undefined') {
    if (trimmed.startsWith('/')) {
      return `${window.location.origin}${trimmed}`;
    }
    return `${window.location.origin}/${trimmed}`;
  }

  return trimmed;
}

/**
 * Sanitizes a title into a clean filename across Windows, macOS, and Linux
 * and ensures an .mp3 extension.
 */
export function sanitizeDownloadFilename(rawTitle?: string | null): string {
  const base = (rawTitle || 'sermon').trim();
  // Strip characters forbidden in file systems: / \ ? % * : | " < >
  let clean = base.replace(/[/\\?%*:|"<>#]/g, '_').trim();
  // Clean double underscores or trailing periods
  clean = clean.replace(/_+/g, '_').replace(/\.+$/, '');
  if (!clean.toLowerCase().endsWith('.mp3')) {
    clean += '.mp3';
  }
  return clean;
}

/**
 * Builds the same-origin backend proxy download URL.
 * The backend proxy guarantees proper 'Content-Disposition: attachment' and CORS headers.
 */
export function getProxyDownloadUrl(audioUrl: string, filename: string): string {
  const resolvedUrl = resolveAudioFilePath(audioUrl);
  const cleanFilename = sanitizeDownloadFilename(filename);
  return `/api/download?url=${encodeURIComponent(resolvedUrl)}&filename=${encodeURIComponent(cleanFilename)}`;
}

/**
 * Programmatically creates and triggers a download via an anchor tag element.
 * Follows strict DOM requirements to ensure compatibility across Safari, Chrome, Firefox,
 * mobile viewports, and sandboxed iframe environments:
 * - Does NOT use `display: none` (which causes WebKit/Safari to ignore click events).
 * - Appends to document.body, dispatches MouseEvent, and defers cleanup.
 */
export function triggerAnchorTagDownload(targetUrl: string, filename: string): void {
  const cleanFilename = sanitizeDownloadFilename(filename);
  const anchor = document.createElement('a');

  // Use invisible fixed positioning instead of display: none
  anchor.style.position = 'fixed';
  anchor.style.top = '-9999px';
  anchor.style.left = '-9999px';
  anchor.style.width = '1px';
  anchor.style.height = '1px';
  anchor.style.opacity = '0';
  anchor.style.pointerEvents = 'none';

  anchor.href = targetUrl;
  anchor.download = cleanFilename;
  anchor.setAttribute('download', cleanFilename);
  anchor.setAttribute('target', '_self');
  anchor.rel = 'noopener noreferrer';

  document.body.appendChild(anchor);

  try {
    // Primary trigger: Dispatch synthetic click event
    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    anchor.dispatchEvent(clickEvent);
  } catch {
    // Fallback: direct method call
    anchor.click();
  }

  // Defer removal to allow the browser download manager to register the request
  setTimeout(() => {
    if (document.body.contains(anchor)) {
      document.body.removeChild(anchor);
    }
  }, 2000);
}

/**
 * Downloads audio by fetching the file, converting to a Blob, and triggering
 * an anchor tag with the generated blob: URL.
 * Falls back to direct proxy anchor trigger if Blob conversion or fetch fails.
 */
export async function downloadSermonAudio(
  rawAudioUrl: string,
  preferredFilename: string,
  onProgress?: (progress: DownloadProgress) => void
): Promise<void> {
  const mappedUrl = resolveAudioFilePath(rawAudioUrl);
  const cleanFilename = sanitizeDownloadFilename(preferredFilename);

  if (!mappedUrl) {
    throw new Error('No valid audio file URL found for sermon download.');
  }

  const proxyUrl = getProxyDownloadUrl(mappedUrl, cleanFilename);

  try {
    // Fetch through our same-origin download proxy
    const response = await fetch(proxyUrl);

    if (!response.ok) {
      throw new Error(`Proxy download returned status ${response.status}: ${response.statusText}`);
    }

    const contentLength = response.headers.get('content-length');
    const totalBytes = contentLength ? parseInt(contentLength, 10) : 0;

    let blob: Blob;

    // If ReadableStream is available and total size is known, track streaming progress
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

      blob = new Blob(chunks, { type: 'audio/mpeg' });
    } else {
      // Direct Blob conversion
      blob = await response.blob();
    }

    // Verify Blob has content
    if (!blob || blob.size === 0) {
      throw new Error('Downloaded Blob is empty.');
    }

    // Convert Blob to Object URL (Guaranteed same-origin, respects download filename)
    const blobUrl = window.URL.createObjectURL(blob);

    // Trigger download using robust anchor tag
    triggerAnchorTagDownload(blobUrl, cleanFilename);

    // Keep Object URL in memory for 60 seconds to ensure the download pipeline finishes
    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl);
    }, 60000);
  } catch (err) {
    console.warn('Blob conversion download encountered an issue, falling back to direct anchor trigger:', err);
    // Reliable Fallback: Directly trigger anchor tag pointing to /api/download
    triggerAnchorTagDownload(proxyUrl, cleanFilename);
  }
}
