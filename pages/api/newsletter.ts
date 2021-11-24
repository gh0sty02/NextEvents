import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const email: string = req.body.email;

    if (!email || !email.includes("@")) {
      return res.status(422).json({ message: "Invalid Email" });
    }
    if (email) {
      console.log(email);
      return res.status(200).json({ message: "Subscribed Successfully" });
    }
  }
}

export const fileHandler = (filename: string, data: string) => {
  const fileBuffer = fs
    .readFileSync(path.join(process.cwd(), "data", `${filename}.json`))
    .toString();

  const fileData = JSON.parse(fileBuffer.toString());
  fileData.push(data);

  fs.writeFileSync(`${filename}.json`, JSON.stringify(fileData));
};
