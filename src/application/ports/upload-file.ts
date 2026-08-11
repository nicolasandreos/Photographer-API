export interface IUploadFile {
    upload(fileName: string, file: Buffer, contentType: string): Promise<string>
}