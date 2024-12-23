import { Client, Databases, ID } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6762de5e0034d65ae924');

const databases = new Databases(client);

export { client, databases };
