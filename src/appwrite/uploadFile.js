import { Client, Storage, ID } from "appwrite";

export default async function UploadFile(){
    const client = new Client()
    .setEndpoint(import.meta.env.VITE_ENDPOINT)
    .setProject(import.meta.env.VITE_PROJECT_ID);

const storage = new Storage(client);

if (!image) {
    console.log("No image selected");
    return;
  }

  try {
    // Upload file to Appwrite Storage
    const response = await storage.createFile(
      import.meta.env.VITE_BUCKET_ID,  // Bucket ID
      ID.unique(),                    // Unique ID for the file
      image                           // File from the input field
    );
    console.log("File uploaded successfully:", response);
    // You can also set additional form data if needed, like name, price, etc.
  } catch (error) {
    console.error("File upload failed:", error);
  }

}
