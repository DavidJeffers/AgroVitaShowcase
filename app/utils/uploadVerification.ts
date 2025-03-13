import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const uploadVerification = async (fileName: string, buffer: ArrayBuffer) => {
  try {
    const s3Client = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.CLOUDFLARE_API_TOKEN_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.CLOUDFLARE_API_TOKEN_S3_SECRET_ACCESS_KEY!,
      },
    });

    const command = new PutObjectCommand({
      Bucket: "farmer-verification",
      Key: fileName,
      Body: buffer as Buffer,
      ContentType: "application/octet-stream",
    });

    const result = await s3Client.send(command);

    return result;
  } catch (error) {
    console.error("Upload error:", error);
    return new Error("Failed to upload file");
  }
};

export default uploadVerification;
