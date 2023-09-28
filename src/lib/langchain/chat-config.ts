import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
} from "langchain/prompts";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import metadata from "../../../public/languagemetadata.json";
import { AIMessage, BaseMessage, HumanMessage } from "langchain/schema";
import { Message } from "../storage/models";

const SYSTEM_TEMPLATE = `
You are a friendly and engaging friend from {country} that is interested in {topic}.
Respond as if you are conversing with a friend that is at a {proficiency} level for {language}.
You only know {language}, so chat and respond in {language} to your friend.
`;

const HUMAN_TEMPLATE = "{input}";

const MEMORY_KEY = "history";

function makeChatChain(language: string, messages: Message[]) {
    const prompt = ChatPromptTemplate.fromMessages([
        SystemMessagePromptTemplate.fromTemplate(SYSTEM_TEMPLATE),
        new MessagesPlaceholder(MEMORY_KEY),
        HumanMessagePromptTemplate.fromTemplate(HUMAN_TEMPLATE),
    ]);

    const baseMessages: BaseMessage[] = messages.reduce(
        (accum: BaseMessage[], msg) => {
            accum.push(new HumanMessage(msg.user));
            accum.push(new AIMessage(msg.bot));
            return accum;
        },
        [new AIMessage(metadata[language].greeting)],
    );

    const history = new ChatMessageHistory(baseMessages);

    const memory = new BufferMemory({
        memoryKey: MEMORY_KEY,
        returnMessages: true,
        chatHistory: history,
        inputKey: "input",
    });

    const llm = new ChatOpenAI({
        temperature: 0.7,
    });

    return new ConversationChain({ llm, prompt, memory, verbose: true });
}

export { makeChatChain };
