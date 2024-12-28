import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import AboutSection from "../components/AboutSection";

const Home = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false, // Animation can trigger multiple times
    threshold: 0.2, // 20% of the element is visible
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <section>
      <div className="flex flex-col items-center justify-center bg-img min-h-screen px-5">
        <motion.h1
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="dancing text-4xl md:text-7xl font-extrabold text-white mb-4 tracking-wider text-center"
        >
          Welcome to <span className="text-[#F15E42]">Pawfect Haven!</span>
        </motion.h1>

        <motion.p
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.3 },
            },
          }}
          className="text-sm md:text-lg text-white text-center sub-text tracking-widest leading-relaxed"
        >
          Discover your perfect furry friend. <br />
          Whether you’re looking to rescue a dog or adopt a cat, <br />
          we’re here to connect loving pets with caring families.
        </motion.p>
      </div>
      <AboutSection></AboutSection>
    </section>
  );
};

export default Home;
