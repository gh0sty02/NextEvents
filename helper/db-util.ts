import { MongoClient } from "mongodb";

export async function connectDB() {
  const client = await MongoClient.connect(
    `mongodb+srv://ghosty:${process.env.MONGO_PASSWORD}@cluster0.vtn83.mongodb.net/events?retryWrites=true&w=majority`
  );

  return client;
}

export async function insertDocument(
  client: MongoClient,
  collection: string,
  document: {}
) {
  const db = client.db();
  await db.collection(collection).insertOne(document);
}

export async function getAllDocuments(client: MongoClient, collection: string) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find()
    .sort({ _id: -1 })
    .toArray();

  return documents;
}
