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
I had a conversation with my {person} friend about {topic}.
These are the mistakes I made during the conversation I had with my friend, enclosed in triple quotes.
Each mistake is separated by a new line and is accompanied with a piece of feedback.

"""
{mistakes}
"""

Based on the mistakes I made in the conversation, please create a study plan for me to improve my {language}.

Notes on how to create study plan:
1. Create a list of the 5 linguistic topics and concepts I should study for {language}
2. I am learning {language} at the {proficiency} level
3. I speak {nativeLanguage}, so respond in {nativeLanguage}
`;

const responseSchema = z.object({
    plan: z
        .array(
            z.object({
                topic: z.string().describe("The name of the topic to study"),
            }),
        )
        .describe("An array of topics to study"),
});

function makePlanChain() {
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

export { makePlanChain };
