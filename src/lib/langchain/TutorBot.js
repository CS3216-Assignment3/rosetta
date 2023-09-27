import { inspect } from "util";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatPromptTemplate } from "langchain/prompts";

const MODEL = "gpt-3.5-turbo";
const TEMPERATURE = 0.5

const chatModel = new ChatOpenAI({
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
    ["human", humanTemplate],
  ]);

class TutorBot {
    constructor(chatModel, tutorPrompt) {
        this.chatModel = chatModel;
        this.tutorPrompt = tutorPrompt;
        this.log = []
    }

    async evaluateMessage(language, nativeLanguage, proficiency, text) {
        const formattedTutorPrompt = await this.tutorPrompt.formatMessages({
            language,
            nativeLanguage,
            proficiency,
            text,
          });

        this.log.push(formattedTutorPrompt)

        const chatModelResult = await this.chatModel.predictMessages(formattedTutorPrompt);

        console.log(
            "tutor response",
            inspect(chatModelResult, {
                showHidden: true,
                depth: null,
                colors: true,
            }),
        );

        this.log.push(chatModelResult)

        return chatModelResult.content;
    }
}

const rosettaTutorBot = new TutorBot(chatModel, tutorPrompt);
export default rosettaTutorBot;