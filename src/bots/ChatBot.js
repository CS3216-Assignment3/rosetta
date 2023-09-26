import { inspect } from "util";
import OpenAI from "openai";

const MODEL = "gpt-3.5-turbo";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const CHAT_SYSTEM_PROMPT = `
Act as a friendly and engaging friend from Germany that is interested in food.
Respond as if you are conversing with a friend that is at a beginner level for German.

Things to take note of while chatting with your friend:
1. Chat and respond in German
`;

export default class ChatBot {
    constructor(openai) {
        this.openai = openai;
        this.messages = [
            { role: "system", content: CHAT_SYSTEM_PROMPT },
            { role: "assistant", content: GREETING },
        ];
    }

    async sendMessage(msg) {
        this.messages.push({
            role: "user",
            content: msg,
        });

        const response = await this.openai.chat.completions.create({
            model: MODEL,
            messages: this.messages,
        });

        console.log(
            "chat response",
            inspect(response, {
                showHidden: true,
                depth: null,
                colors: true,
            }),
        );

        const responseMessage = response.choices[0].message;
        this.messages.push(responseMessage);

        return response;
    }
}