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
};

type Message = {
    timestamp: FieldValue;
    user: string;
    bot: string;
    evaluation: {
        mistake: boolean;
        content: string;
    };
};

export type { User, Chat, Message };
