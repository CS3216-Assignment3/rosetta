import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user"

import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method == "POST") {
    try {
        const { name, email } = await req.body
        await connectMongoDB()
        await User.create({ name, email })
        res.status(200).json({ message: "User registered" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "An error occurred"})
    }
    return;
  }
  res.status(200).json({ message: "Hello World"})
}
