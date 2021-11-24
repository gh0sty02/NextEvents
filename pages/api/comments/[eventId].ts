import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, email, text } = req.body;

    if (
      !req.query.eventId ||
      !name ||
      name.trim() === "" ||
      !email.includes("@") ||
      !text ||
      text.trim() === ""
    ) {
      console.log(name, email, text);
      return res.status(422).json({ message: "invalid input" });
    }

    const newComment = {
      date: new Date().toISOString(),
      name,
      email,
      text,
    };

    console.log(newComment);

    res.status(200).json({ message: "Comment added successfully" });
  }
  if (req.method === "GET") {
    const dummyComments = [
      { name: "max", id: "1", text: "First comment" },
      { name: "manu", id: "2", text: "second comment" },
    ];

    res.status(200).json({ comments: dummyComments });
  }
}
