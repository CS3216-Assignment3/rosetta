import { FieldValue } from "firebase/firestore";

type User = {
    nativeLanguage: string;
};

type Chat = {
    id: string;
    timestamp: FieldValue;
    botName: string;
    language: string;
    topic: string;
    proficiency: string;
    readOnly: boolean;
    plan: Plan;
};

type Message = {
    timestamp: FieldValue;
    user: string;
    bot: string;
    evaluation: {
        correct: boolean;
        content: string;
    };
};

type Plan = { topic: string }[];

export type { User, Chat, Message, Plan };
