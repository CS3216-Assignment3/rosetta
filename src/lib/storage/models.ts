type User = {
    nativeLanguage: string;
};

type Chat = {
    id: string;
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
        content: string;
    };
};

type BotMessage = {
    body: string;
};

export type { User, Chat, UserMessage, BotMessage };
