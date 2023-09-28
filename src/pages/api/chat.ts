import { Message } from "@/lib/storage/models";
import { NextApiRequest, NextApiResponse } from "next";
import metadata from "../../../public/languagemetadata.json";
import { makeChatChain } from "@/lib/langchain/chat-config";

type RequestBody = {
    language: string;
    topic: string;
    proficiency: string;
    history: Message[];
    input: string;
};

type ResponseData = {
    message: Message;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>,
) {
    const body: RequestBody = req.body;

    const chatChain = makeChatChain(body.language, body.history);
    const chatChainResponse = await chatChain.call({
        country: metadata[body.language].country,
        language: body.language,
        topic: body.topic,
        proficiency: body.proficiency,
        input: body.input,
    });

    res.status(200).json({
        message: {
            user: body.input,
            bot: chatChainResponse.response,
            evaluation: {
                mistake: false,
                content: "<WIP>",
            },
        },
    });
}
