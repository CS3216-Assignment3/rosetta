import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from "langchain/prompts";
import { ConversationChain } from "langchain/chains";
import { AIMessage, HumanMessage } from "langchain/schema";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";

const MODEL = "gpt-3.5-turbo";
const TEMPERATURE = 0.7

const chatModel = new ChatOpenAI({
    model: MODEL,
    temperature: TEMPERATURE,
});

const systemTemplate = `
You are a friendly and engaging friend that is interested in {topic}.
Respond as if you are conversing with a friend that is at a {proficiency} level for {language}.

Things to take note of while chatting with your friend:
1. Chat and respond in {language}
`;

const humanTemplate = "{text}"

const chatPrompt = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    new MessagesPlaceholder("history"),
    ["human", humanTemplate],
  ]);

export default class ChatBot {
    constructor(pastMessages) {
        this.chatMemory =  new BufferMemory({ 
            chatHistory: this.getChatMessageHistory(pastMessages),
            returnMessages: true, 
            memoryKey: "history", 
            inputKey: "text" 
        });
        this.chatChain = new ConversationChain({
            llm: chatModel,
            prompt: chatPrompt,
            memory: this.chatMemory,
            verbose: true
        });
    }

    getChatMessageHistory(pastMessages) {
        const hist = []
        for (let msg in pastMessages) {
            if (msg.role === "human") {
                hist.push(new HumanMessage(msg.content))
            } else if (msg.role === "ai") {
                hist.push(new AIMessage(msg.content))
            }
        }
        return new ChatMessageHistory(hist)
    }

    async call(topic, proficiency, language, text) {
        const result = await this.chatChain.call({
            topic,
            proficiency,
            language,
            text,
        })
        return result;
    }
}