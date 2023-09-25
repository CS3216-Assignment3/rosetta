import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user"

import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
    ok: boolean,
    userId?: string
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method == "POST") {
    try {
        const { name, email } = await req.body
        await connectMongoDB()
        const newUser = await User.create({ name, email })
        const userId = newUser._id
        res.status(200).json({ 
            ok: true,
            userId,
            message: "User registered" 
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: `An error occurred: ${error}`
        })
    }
    return;
  }
  res.status(200).json({ ok: true, message: "Hello World"})
}
