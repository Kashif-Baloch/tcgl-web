"use client"

import Faqs from "@/components/home/faqs"
import Hero from "@/components/home/hero"
import HowItworks from "@/components/home/how-it-works"
import Process from "@/components/home/process"
import Testimonials from "@/components/home/testimonials"
import Footer from "@/components/shared/footer"
import Header from "@/components/shared/header"

export default function LandingPage() {

  return (
    <div className="flex flex-col w-full bg-gray-50">
      {/* Header */}
      <Header />
      <main className="flex-grow bg-gray-100">
        {/* Hero Section */}
        <Hero />
        {/* Process */}
        <Process />
        {/* How It Works */}
        <HowItworks />
        {/* Testimonials */}
        <Testimonials />
        {/* FAQ */}
        <Faqs />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  )
}
