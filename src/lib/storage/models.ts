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

type Message = {
    user: string;
    bot: string;
    evaluation: {
        mistake: boolean;
        content: string;
    };
};

export type { User, Chat, Message };
