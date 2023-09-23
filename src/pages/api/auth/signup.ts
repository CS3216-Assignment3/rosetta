import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    const { email, password } = await req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await User.create({ email, password: hashedPassword });

    res.status(201).json({ message: "User reistered."})
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "An error occurred while reistering the user."})
  }
}

