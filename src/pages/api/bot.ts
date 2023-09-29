import { NextApiRequest, NextApiResponse } from "next";
import bots from "../../../public/bots.json";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const names = bots.bots;
    const randomIdx = Math.floor(Math.random() * 20);
    const randomName = names[randomIdx];

    res.status(200).json({ name: randomName });
}
