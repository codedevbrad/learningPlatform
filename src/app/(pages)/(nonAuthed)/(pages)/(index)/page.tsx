import HeroSection from "./components/hero"
import FeatureSection from "./components/features"
import SubscriptionPlan from "@/app/reusables/app/subscription"
import FAQSection from "./components/faqs"
import Testimonials from "./components/testimonials"
import LearningeSection from "./components/learning"
import TaughtSection from "./components/langaugesConcepts"
import VideoWelcome from "./components/video"

export default function Page () {
  return (
    <main className="">
      <main className="isolate">
          <HeroSection />
          <VideoWelcome />
          <LearningeSection />
          <SubscriptionPlan />
          <TaughtSection />
          <FeatureSection />
          <FAQSection />
          <Testimonials />
      </main>
    </main>
  )
}