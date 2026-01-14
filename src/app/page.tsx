import React from "react";
import Banner from "@/components/Banner";
import EnquiryForm from "@/components/EnquiryForm";
import CareSlider from "@/components/CareSlider";
import AboutSection from "@/components/AboutSection";
import AchievementSection from "@/components/AchievementSection";
import WhySection from "@/components/WhySection";
import TeamSection from "@/components/TeamSection";
import TestimonialSection from "@/components/TestimonialSection";
import BlogSection from "@/components/BlogSection";

export default function Home() {
  return (
    <main>
      <Banner />
      <EnquiryForm />
      <CareSlider />
      <AboutSection />
      <AchievementSection />
      <WhySection />
      <TeamSection />
      <TestimonialSection />
      <BlogSection />
    </main>
  );
}
