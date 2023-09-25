import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
    msg: string;
    chatId: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>,
) {
    // await connectMongoDB()
    const chat = { id: "123" };
    res.status(200).json({ msg: "chat successfully created", chatId: chat.id });
}
