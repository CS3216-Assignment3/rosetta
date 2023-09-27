import type { NextApiRequest, NextApiResponse } from 'next'
import rosettaChatBot from '../../lib/langchain/ChatBot';
import rosettaTutorBot from '../../lib/langchain/TutorBot';

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
            const { language, topic, proficiency } = getChatInfo()
            const { nativeLanguage } = getUserInfo()
            const chatResponse = await rosettaChatBot.sendMessage(topic, proficiency, language, text)
            const tutorResponse = await rosettaTutorBot.evaluateMessage(language, nativeLanguage, proficiency, text)
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
    return { language, topic, proficiency } 
}

function getUserInfo() {
    const nativeLanguage = "English";
    return { nativeLanguage }
}