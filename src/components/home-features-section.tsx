import Image from "next/image";

export default function HomeFeaturesSection() {
    return (
        <section className="flex flex-col gap-12 items-center pt-12 w-full min-h-screen bg-gradient-to-t to-white snap-start from-blaze-orange-200">
            <p className="text-5xl font-bold text-center">Features</p>
            <div className="flex justify-between items-start w-1/2">
                <div className="w-1/3">
                    <p className="text-2xl font-bold">AI Chat Partner</p>
                    <p className="text-lg">
                        Using the power of generative AI, Rosetta helps you
                        practice your conversational skills in a realistic
                        setting with an AI chat partner.
                    </p>
                </div>
                <Image
                    src="/chatpartner.jpg"
                    alt="ai chat partner"
                    width={300}
                    height={300}
                    className="rounded-lg shadow"
                />
            </div>
            <div className="flex justify-between items-start w-1/2">
                <Image
                    src="/feedback.jpg"
                    alt="ai chat partner"
                    width={300}
                    height={300}
                    className="rounded-lg shadow"
                />
                <div className="w-1/3">
                    <p className="text-2xl font-bold">Realtime Feedback</p>
                    <p className="text-lg">
                        Rosetta also uses generative AI to provide realtime
                        feedback on every message you send, creating an
                        interactive and engaging learning experience.
                    </p>
                </div>
            </div>
            <div className="flex justify-between items-start w-1/2">
                <div className="w-1/3">
                    <p className="text-2xl font-bold">Track Your Learning</p>
                    <p className="text-lg">
                        Rosetta logs all conversations you have with your AI
                        chat partner for future review. Using generate AI,
                        Rosetta can also create concise study plans based on the
                        mistakes you made in your conversation.
                    </p>
                </div>
                <Image
                    src="/studyplan.jpg"
                    alt="ai chat partner"
                    width={300}
                    height={300}
                    className="rounded-lg shadow"
                />
            </div>
        </section>
    );
}
