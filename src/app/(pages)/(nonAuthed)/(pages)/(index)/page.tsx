import HeroSection from "./components/hero"
import FeatureSection from "./components/features"
import FAQSection from "./components/faqs"
import Testimonials from "./components/testimonials"

export default function Page () {
  return (
    <main className="bg-white">
      <main className="isolate">
          <HeroSection />
          <FeatureSection />
          <FAQSection />
          <Testimonials />
      </main>
    </main>
  )
}