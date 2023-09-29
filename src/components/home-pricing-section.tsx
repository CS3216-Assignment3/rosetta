export default function HomePricingSection() {
    return (
        <section className="flex flex-col gap-12 items-center pt-12 w-full min-h-screen snap-start">
            <p className="text-5xl font-bold text-center">Pricing</p>
            <div className="flex gap-24 items-center w-2/3">
                <div className="overflow-hidden w-full rounded-2xl shadow bg-rosetta-orange">
                    <div className="flex flex-col items-center p-8">
                        <p className="text-5xl font-bold text-white">
                            Free Plan
                        </p>
                        <p className="text-7xl font-extrabold">$0</p>
                        <p className="text-3xl font-bold">Monthly</p>
                    </div>
                    <div className="p-8 bg-white">
                        <p className="text-3xl">10 Messages Daily</p>
                        <p className="text-3xl">Basic Topics</p>
                        <p className="text-3xl">Basic Study Plan</p>
                    </div>
                </div>

                <div className="overflow-hidden w-full rounded-2xl shadow bg-rosetta-navy">
                    <div className="flex flex-col items-center p-8">
                        <p className="text-5xl font-bold text-white">
                            Paid Plan
                        </p>
                        <p className="text-7xl font-extrabold text-rosetta-orange">
                            $30
                        </p>
                        <p className="text-3xl font-bold text-rosetta-orange">
                            Monthly
                        </p>
                    </div>
                    <div className="p-8 bg-white">
                        <p className="text-3xl">Unlimited Messages Daily</p>
                        <p className="text-3xl">Customised Topics</p>
                        <p className="text-3xl">Advanced Study Plan</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
