import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
    msg: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>,
) {
    // await connectMongoDB()
    // const message = req.body.message;
    // sendMessage(message)
    res.status(200).json({ msg: "chat message sent" });
}
