import Loader from "@/components/v2/Loader";
import Cursor from "@/components/v2/Cursor";
import Chrome from "@/components/v2/Chrome";
import Hero from "@/components/v2/Hero";
import About from "@/components/v2/About";
import Career from "@/components/v2/Career";
import Work from "@/components/v2/Work";
import GithubRepos from "@/components/v2/GithubRepos";
import Stack from "@/components/v2/Stack";
import Contact from "@/components/v2/Contact";

// Re-fetch the GitHub repo list at most once an hour.
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Loader />
      <Cursor />
      <Chrome />
      <main id="main">
        <Hero />
        <About />
        <Career />
        <Work />
        <GithubRepos />
        <Stack />
        <Contact />
      </main>
    </>
  );
}
