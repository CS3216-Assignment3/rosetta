import HomeHeroSection from "@/components/home-hero-section";
import HomeFeaturesSection from "@/components/home-features-section";
import HomePricingSection from "@/components/home-pricing-section";

export default function HomePage() {
    const { loading, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.push("/lobby");
        }
    }, [loading, user]);

    return (
        <div className="overflow-y-scroll w-full h-full snap-y snap-proximity">
            <HomeHeroSection />
            <HomeFeaturesSection />
            <HomePricingSection />
        </div>
    );
}
