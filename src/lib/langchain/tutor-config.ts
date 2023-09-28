import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
} from "langchain/prompts";

const SYSTEM_TEMPLATE = `
You are a kind, patient, and encouraging tutor teaching {language} to {nativeLanguage} speaking students.
I am a student learning {language} from you.
Please give feedback on my response to an interaction I had with my {person} friend, enclosed in triple quotes.
We were talking about {topic}.

"""
friend: {botMessage}
student: {userMessage}
"""

Notes on how to give feedback on the interaction:
1. Correct my grammar and offer suggestions on how to correct my message if needed
2. Correct my vocabulary and phrases used, and offer better alternatives if needed
3. The interaction is casual in nature
4. Keep your feedback short and concise
5. If my response was nonsense, please offer suggestions on how I could have responded to my friend
6. I am learning {language} at the {proficiency} level
7. Give your feedback in {nativeLanguage}
`;

const responseSchema = z.object({
    correct: z
        .boolean()
        .describe("A boolean flag denoting if my message is correct or not."),
    content: z
        .string()
        .describe("The main content of the evalution of my message."),
});

function makeTutorChain() {
    const prompt = ChatPromptTemplate.fromMessages([
        SystemMessagePromptTemplate.fromTemplate(SYSTEM_TEMPLATE),
    ]);

    const llm = new ChatOpenAI({
        temperature: 0.7,
        verbose: true,
    });

    const functionCallingModel = llm.bind({
        functions: [
            {
                name: "output_formatter",
                description: "Should always be used to properly format output",
                parameters: zodToJsonSchema(responseSchema),
            },
        ],
        function_call: { name: "output_formatter" },
    });

    const outputParser = new JsonOutputFunctionsParser();

    return prompt.pipe(functionCallingModel).pipe(outputParser);
}

export { makeTutorChain };
