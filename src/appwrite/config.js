import { Client } from "appwrite";

export default function Configuration() {
  const client = new Client();
  client
    .setEndpoint(import.meta.env.VITE_ENDPOINT)
    .setProject(import.meta.env.VITE_PROJECT_ID);
}
