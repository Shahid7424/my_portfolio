"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import Image from "next/image";

// Colorful animated text component
function ColourfulText({ text }) {
  const colors = [
    "rgb(131, 179, 32)",
    "rgb(47, 195, 106)",
    "rgb(42, 169, 210)",
    "rgb(4, 112, 202)",
    "rgb(107, 10, 255)",
    "rgb(183, 0, 218)",
    "rgb(218, 0, 171)",
    "rgb(230, 64, 92)",
    "rgb(232, 98, 63)",
    "rgb(249, 129, 47)",
  ];

  const [currentColors, setCurrentColors] = useState(colors);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...colors].sort(() => Math.random() - 0.5);
      setCurrentColors(shuffled);
      setCount((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    

      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${count}-${index}`}
          initial={{ y: 0 }}
          animate={{
            color: currentColors[index % currentColors.length],
            y: [0, -3, 0],
            scale: [1, 1.01, 1],
            filter: ["blur(0px)", "blur(5px)", "blur(0px)"],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 0.5,
            delay: index * 0.05,
          }}
          className="inline-block whitespace-pre font-sans tracking-tight"
        >
          {char}
        </motion.span>
      ))}
      
    </>
  );
}

// Main Hero component
export default function Hero() {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <section className="w-full py-4 px-6 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          {/* Left: Personal Info */}
          <div className="text-center md:text-left md:w-1/2 w-full">
            <h1 className="text-5xl font-bold mb-2">
              <ColourfulText text="SHAHID SHAH" />
            </h1>
            <p className="mt-2">
              Software Developer (JavaScript | React | Next.js | Node.js)
            </p>
            <p className="mt-4">
              <a
                href="mailto:shahshahid121212@gmail.com"
                className="text-blue-400 hover:underline"
              >
                shahshahid121212@gmail.com
              </a>{" "}
              |{" "}
              <a
                href="tel:+918948681079"
                className="ml-2 text-blue-400 hover:underline"
              >
                +91 89486 81079
              </a>
            </p>

            <div className="mt-6 flex justify-center md:justify-start gap-6">
              <a
                href="https://github.com/Shahid7424"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                <FaGithub className="text-xl" />
                GitHub
              </a>

              <a
                href="https://linkedin.com/in/shahid-shah-416b3b198"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:underline"
              >
                <FaLinkedin className="text-xl" />
                LinkedIn
              </a>

              <a
                href="https://shahid7424.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-400 hover:underline"
              >
                <FaGlobe className="text-xl" />
                Portfolio
              </a>
            </div>
          </div>

          {/* Right: Profile Image */}
          <div className="mt-10 md:mt-0 md:w-1/3 w-full flex justify-center">
            <Image
              src="/images/portfolio.jpg"
              alt="Shahid Shah"
              width={600}
              height={600}
              className="rounded-full object-cover shadow-lg border-2 border-gray-300"
              priority
            />
          </div>
        </div>
      </section>
    </div>
  );
}
