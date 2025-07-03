
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Skills from "./skills/page";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
// import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
    <Navbar />
    <main className=" bg-white text-black">
      <Hero />
      <Experience />
       <Skills /> 
      <Projects />
      <Education />
      <Certifications />
      {/* <Footer /> */}
    </main>
    </>
  );
}

