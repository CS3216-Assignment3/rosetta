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
                <div className="bg-black w-[300px] h-[300px]"></div>
            </div>
            <div className="flex justify-between items-start w-1/2">
                <div className="bg-black w-[300px] h-[300px]"></div>
                <div className="w-1/3">
                    <p className="text-2xl font-bold">AI Chat Partner</p>
                    <p className="text-lg">
                        Using the power of generative AI, Rosetta helps you
                        practice your conversational skills in a realistic
                        setting with an AI chat partner.
                    </p>
                </div>
            </div>
            <div className="flex justify-between items-start w-1/2">
                <div className="w-1/3">
                    <p className="text-2xl font-bold">AI Chat Partner</p>
                    <p className="text-lg">
                        Using the power of generative AI, Rosetta helps you
                        practice your conversational skills in a realistic
                        setting with an AI chat partner.
                    </p>
                </div>
                <div className="bg-black w-[300px] h-[300px]"></div>
            </div>
        </section>
    );
}
