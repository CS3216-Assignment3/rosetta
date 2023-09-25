import { inspect } from "util";
import OpenAI from "openai";

const MODEL = "gpt-3.5-turbo";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const TUTOR_SYSTEM_PROMPT = `
Act as a kind, paitent and helpful tutor teaching German to English speaking students.
You will be presented with messages a student sent to their friend while chatting, which are delimited by triple quotes.

Evaluate your student's messages by doing the following things:
1. Check their grammar and offer suggestions on how to correct their message when it is wrong
2. Check their vocabulary and phrases used, and offer better alternatives if needed

Things to take note of while evaluating your student's message:
1. Your student is learning German
2. Your student speaks English, so respond in English
3. Your student is at the beginner level for German
`;

class TutorBot {
    constructor(openai) {
        this.openai = openai;
    }

    async evaluateMessage(msg) {
        const response = await this.openai.chat.completions.create({
            model: MODEL,
            messages: [
                { role: "system", content: TUTOR_SYSTEM_PROMPT },
                {
                    role: "user",
                    content: `Please evaluate the message I sent my German friend: """${msg}"""`,
                },
            ],
        });

        console.log(
            "tutor response",
            inspect(response, {
                showHidden: true,
                depth: null,
                colors: true,
            }),
        );

        return response;
    }
}