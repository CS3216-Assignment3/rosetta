import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from "langchain/prompts";
import { ConversationChain } from "langchain/chains";
import { AIMessage, HumanMessage } from "langchain/schema";
import { BufferWindowMemory, ChatMessageHistory } from "langchain/memory";


const MODEL = "gpt-3.5-turbo";
const TEMPERATURE = 0.5

const tutorModel = new ChatOpenAI({
    model: MODEL,
    temperature: TEMPERATURE
});

const systemTemplate = `
Act as a kind, paitent and helpful tutor teaching {language} to {nativeLanguage} speaking students.
You will be presented with messages a student sent to their friend while chatting, which are delimited by triple quotes.

Evaluate your student's messages by doing the following things:
1. Check their grammar and offer suggestions on how to correct their message when it is wrong
2. Check their vocabulary and phrases used, and offer better alternatives if needed
3. Provide insights into cultural context, if appropriate

Things to take note of while evaluating your student's message:
1. Your student is learning {language}
2. Your student speaks {nativeLanguage}, so respond in {nativeLanguage}
3. Your student is at the {proficiency} level for {language}
`;

const humanTemplate = 'Please evaluate the message that I sent my friend """{text}"""'

const tutorPrompt = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    new MessagesPlaceholder("history"),
    ["human", humanTemplate],
  ]);

export default class TutorBot {
    constructor(pastMessages) {
        this.tutorMemory =  new BufferWindowMemory({
            k: 5,
            chatHistory: this.getChatMessageHistory(pastMessages),
            returnMessages: true, 
            memoryKey: "history", 
            inputKey: "text" 
        });
        this.tutorChain = new ConversationChain({
            llm: tutorModel,
            prompt: tutorPrompt,
            memory: this.tutorMemory,
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

    async call(language, nativeLanguage, proficiency, text) {
        const result = await this.tutorChain.call({
            language,
            nativeLanguage,
            proficiency,
            text
        })

        return result;
    }
}