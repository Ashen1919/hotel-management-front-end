import { Client, Storage } from "appwrite";

const client = new Client()
    .setEndpoint(import.meta.env.VITE_ENDPOINT)
    .setProject(import.meta.env.VITE_PROJECT_ID);

const storage = new Storage(client);

const promise = storage.createFile(
    import.meta.env.VITE_BUCKET_ID,
    ID.unique(),
    document.getElementById('uploader').files[0]
);

promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});
