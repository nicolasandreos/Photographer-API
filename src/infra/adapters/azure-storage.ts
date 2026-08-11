import { BlobServiceClient } from "@azure/storage-blob";
import { IUploadFile } from "../../application/ports/upload-file";

export class AzureStorageAdapter implements IUploadFile {
  private readonly containerClient;

  private static verifyEnvironmentVariables(): void {
    if (!process.env.AZURE_STORAGE_CONNECTION_STRING) {
      throw new Error("AZURE_STORAGE_CONNECTION_STRING is not set");
    }
    if (!process.env.AZURE_STORAGE_CONTAINER_NAME) {
      throw new Error("AZURE_STORAGE_CONTAINER_NAME is not set");
    }
  }

  constructor() {
    AzureStorageAdapter.verifyEnvironmentVariables();

    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING!;
    const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME!;

    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    this.containerClient = blobServiceClient.getContainerClient(containerName);
  }

  async upload(
    fileName: string,
    file: Buffer,
    contentType: string,
  ): Promise<string> {
    const blockBlob = this.containerClient.getBlockBlobClient(fileName);
    await blockBlob.uploadData(file, {
      blobHTTPHeaders: {
        blobContentType: contentType,
      },
    });

    return blockBlob.url;
  }
}
