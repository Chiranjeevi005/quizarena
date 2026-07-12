export interface IStorageProvider {
  uploadFile(bucket: string, key: string, file: Buffer, contentType?: string): Promise<string>;
  downloadFile(bucket: string, key: string): Promise<Buffer>;
  deleteFile(bucket: string, key: string): Promise<void>;
  getFileUrl(bucket: string, key: string): Promise<string>;
}
