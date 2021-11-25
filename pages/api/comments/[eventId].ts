import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

import {
  connectDB,
  getAllDocuments,
  insertDocument,
} from "../../../helper/db-util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let client: MongoClient;

  try {
    client = await connectDB();
  } catch (err) {
    res.status(500).json({ message: "Error connecting to database" });
    return;
  }

  if (req.method === "POST") {
    const { name, email, text } = req.body;
    const eventId = req.query.eventId;

    if (
      !req.query.eventId ||
      !name ||
      name.trim() === "" ||
      !email.includes("@") ||
      !text ||
      text.trim() === ""
    ) {
      return res.status(422).json({ message: "invalid input" });
    }

    const newComment = {
      eventId,
      name,
      email,
      text,
    };

    let result;
    try {
      result = await insertDocument(client, "comments", newComment);
    } catch (err) {
      res.status(500).json({ message: "Error inserting the document" });
    }

    res
      .status(200)
      .json({ message: "Comment added successfully", Comment: newComment });
  }
  if (req.method === "GET") {
    try {
      const comments = await getAllDocuments(client, "comments");
      res.status(200).json({ comments: comments });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  client.close();
}
