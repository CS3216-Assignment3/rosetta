import { NextApiRequest, NextApiResponse } from "next";
import metadata from "../../../public/languagemetadata.json";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const language = req.query.language as string;

    res.status(200).json(metadata[language]);
}
