'use client';

import Hero from "../components/home/Hero";
import FeaturedAnimations from "../components/home/FeaturedAnimations";
import Shorts from "../components/home/Shorts";
import Portfolio from "../components/home/Portfolio";
import CreativeProcess from "../components/home/CreativeProcess";
import About from "../components/home/About";
import Tools from "../components/home/Tools";
import Contact from "../components/home/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedAnimations />
      <Shorts />
      <Portfolio />
      <CreativeProcess />
      <About />
      <Tools />
      <Contact />
    </>
  );
}
