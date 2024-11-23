import HeroSection from "./components/hero"
import FeatureSection from "./components/features"
import FAQSection from "./components/faqs"
import Testimonials from "./components/testimonials"
import LearningeSection from "./components/learning"
import TaughtSection from "./components/langaugesConcepts"

export default function Page () {
  return (
    <main className="">
      <main className="isolate">
          <HeroSection />
          <LearningeSection />
          <TaughtSection />
          <FeatureSection />
          <FAQSection />
          <Testimonials />
      </main>
    </main>
  )
}