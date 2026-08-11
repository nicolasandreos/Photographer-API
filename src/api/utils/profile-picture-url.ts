export const buildProfilePictureUrl = (
  blobName: string | null | undefined,
): string | null => {
  if (!blobName) {
    return null;
  }

  const base = process.env.AZURE_STORAGE_PUBLIC_BASE_URL?.replace(/\/$/, "");
  if (!base) {
    return null;
  }

  return `${base}/${blobName}`;
};
