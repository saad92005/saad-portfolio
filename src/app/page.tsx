import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Philosophy from "@/components/Philosophy";
import Capabilities from "@/components/Capabilities";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Differentiator from "@/components/Differentiator";
import AiLab from "@/components/AiLab";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Philosophy />
        <Capabilities />
        <Skills />
        <Projects />
        <Experience />
        <Differentiator />
        <AiLab />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
