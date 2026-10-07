import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Stats from "@/components/site/Stats";
import Projects from "@/components/site/Projects";
import Skills from "@/components/site/Skills";
import Experience from "@/components/site/Experience";
import GithubRepos from "@/components/site/GithubRepos";
import Contact from "@/components/site/Contact";

// Re-fetch the GitHub repo list at most once an hour.
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Stats />
        <Projects />
        <Skills />
        <Experience />
        <GithubRepos />
        <Contact />
      </main>
    </>
  );
}
