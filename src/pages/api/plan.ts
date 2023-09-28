import { Message } from "@/lib/storage/models";
import { NextApiRequest, NextApiResponse } from "next";
import metadata from "../../../public/languagemetadata.json";
import { makePlanChain } from "@/lib/langchain/plan-config";

type RequestBody = {
    nativeLanguage: string;
    language: string;
    topic: string;
    proficiency: string;
    mistakes: Message[];
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const body: RequestBody = req.body;

    const formattedMistakes = body.mistakes
        .map((m) => formatMistake(m.bot, m.user, m.evaluation.content))
        .join("\n\n");

    console.log(formattedMistakes);

    const planChain = makePlanChain();
    const chainResponse = await planChain.invoke({
        language: body.language,
        nativeLanguage: body.nativeLanguage,
        topic: body.topic,
        proficiency: body.proficiency,
        person: metadata[body.language].person,
        mistakes: formattedMistakes,
    });

    res.status(200).json(chainResponse);
}

function formatMistake(
    botMessage: string,
    userMessage: string,
    evaluation: string,
) {
    return `friend: ${botMessage}
student: ${userMessage}
tutor feedback: ${evaluation}`;
}
