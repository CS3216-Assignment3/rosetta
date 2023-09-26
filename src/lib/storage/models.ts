type User = {
    id: string;
    email: string;
    nativeLanguage: string;
    currentLanguage: string;
    currentProficiency: string;
    favouriteTopics: string[];
};

type Chat = {
    botName: string;
    language: string;
    topic: string;
    proficiency: string;
    readOnly: boolean;
};

type UserMessage = {
    body: string;
    evaluation: {
        mistake: boolean;
        body: string;
    };
};

type BotMessage = {
    body: string;
};

export type { User, Chat, UserMessage, BotMessage };
