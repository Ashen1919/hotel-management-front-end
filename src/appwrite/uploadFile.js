import Configuration from "./config";
import { Storage } from "appwrite";

const storage = new Storage(client);

const promise = storage.createFile(import.meta.env.VITE_BUCKET_ID,
    ID.unique(),
    document.getElementById('uploader').files[0]
);

promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});