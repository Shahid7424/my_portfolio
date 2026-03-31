
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Skills from "./skills/page";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Navbar from "./components/Navbar";
import About from "././about/page";
import Footer from "./components/Footer"

export default function Home() {
  return (
    <>
    <Navbar />
    <main className=" bg-white text-black">
      <Hero />
      <About />
      <Experience />
       <Skills /> 
      <Projects />
      <Education />
      <Certifications />
    <Footer />
    </main>
    </>
  );
}

