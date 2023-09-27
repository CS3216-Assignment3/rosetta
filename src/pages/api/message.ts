import type { NextApiRequest, NextApiResponse } from 'next'
import ChatBot from '../../lib/langchain/ChatBot';
import TutorBot from '../../lib/langchain/TutorBot';

type ResponseData = {
    ok: boolean,
    chatResponse?: string,
    tutorResponse?: string,
    error?: string
  }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
        try {            
            const { userId, chatId, text } = req.body
            const { language, topic, proficiency, chatHistory } = getChatInfo()
            const { nativeLanguage } = getUserInfo()
            const chatBot = new ChatBot(chatHistory)
            const chatResponse = await chatBot.call(topic, proficiency, language, text)
            const tutorBot = new TutorBot(chatHistory)
            const tutorResponse = await tutorBot.call(language, nativeLanguage, proficiency, text)
            res.status(200).json({ ok: true, chatResponse, tutorResponse })
        } catch (error) {
            res.status(500).json({ ok: false, error: `An error occurred: ${error}.`})
        }
    }
}

function getChatInfo() {
    const language = "Chinese"
    const topic = "Gaming"
    const proficiency = "Beginner"
    const chatHistory = [{ role: "ai", content: `你好, 你叫什么名字`}]
    return { language, topic, proficiency, chatHistory } 
}

function getUserInfo() {
    const nativeLanguage = "English";
    return { nativeLanguage }
}