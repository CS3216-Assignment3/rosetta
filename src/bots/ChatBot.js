import { inspect } from "util";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatPromptTemplate } from "langchain/prompts";

const MODEL = "gpt-3.5-turbo";
const TEMPERATURE = 0.7

const chatModel = new ChatOpenAI({
    model: MODEL,
    temperature: TEMPERATURE
});

const systemTemplate = `
Act as a friendly and engaging friend that is interested in {topic}.
Respond as if you are conversing with a friend that is at a {proficiency} level for {language}.

Things to take note of while chatting with your friend:
1. Chat and respond in {language}
`;

const humanTemplate = "{text}"

const chatPrompt = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["human", humanTemplate],
  ]);

class ChatBot {
    constructor(chatModel, chatPrompt) {
        this.chatModel;
        this.chatPrompt;
        this.messages = [
            { role: "system", content: CHAT_SYSTEM_PROMPT },
            { role: "assistant", content: GREETING },
        ];
    }

    async sendMessage(topic, proficiency, language, text) {
        const formattedChatPrompt = await this.chatPrompt.formatMessages({
            topic,
            proficiency,
            language,
            text,
          });

        this.messages.push(formattedChatPrompt);

        const chatModelResult = await this.chatModel.predictMessages(formattedChatPrompt);

        console.log(
            "chat response",
            inspect(chatModelResult, {
                showHidden: true,
                depth: null,
                colors: true,
            }),
        );

        this.messages.push(chatModelResult);

        return chatModelResult;
    }
}

rosettaChatBot = new ChatBot(chatModel, chatPrompt);
export default rosettaChatBot;