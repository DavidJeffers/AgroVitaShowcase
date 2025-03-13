import Compressor from "compressorjs";

interface CompressorOptions {
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export function compressImage(
  file: File,
  options?: CompressorOptions
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: options?.quality || 0.6,
      maxWidth: options?.maxWidth || 1024,
      maxHeight: options?.maxHeight || 1024,
      success(result) {
        resolve(result);
      },
      error(err) {
        reject(err);
      },
    });
  });
}
