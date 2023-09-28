import { Message } from "@/lib/storage/models";
import { NextApiRequest, NextApiResponse } from "next";
import metadata from "../../../public/languagemetadata.json";
import { makeChatChain } from "@/lib/langchain/chat-config";
import { makeTutorChain } from "@/lib/langchain/tutor-config";

type RequestBody = {
    input: string;
    nativeLanguage: string;
    language: string;
    topic: string;
    proficiency: string;
    history: Message[];
};

type ResponseData = {
    message: Partial<Message>;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>,
) {
    const body: RequestBody = req.body;

    const botInput =
        body.history.length === 0
            ? metadata[body.language].greeting // default greeting
            : body.history[body.history.length - 1].bot; // last message

    const chatChain = makeChatChain(body.language, body.history);
    const tutorChain = makeTutorChain();

    const promises = [
        chatChain.call({
            input: body.input,
            language: body.language,
            topic: body.topic,
            proficiency: body.proficiency,
            country: metadata[body.language].country,
        }),

        tutorChain.invoke({
            botMessage: botInput,
            userMessage: body.input,
            language: body.language,
            nativeLanguage: body.nativeLanguage,
            topic: body.topic,
            proficiency: body.proficiency,
            person: metadata[body.language].person,
        }),
    ];

    const responses = await Promise.all(promises);
    console.log(responses);
    const chatChainResponse = responses[0];
    const tutorChainResponse = responses[1];

    res.status(200).json({
        message: {
            user: body.input,
            bot: chatChainResponse.response,
            evaluation: tutorChainResponse as {
                correct: boolean;
                content: string;
            },
        },
    });
}
