import React from "react";
import { motion } from "framer-motion";

const AboutSection = () => {
  // Animation Variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.4 } },
  };

  const founderHover = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
      className="flex flex-col xl:flex-row items-center justify-between gap-12 px-8 py-16 max-w-7xl mx-auto"
    >
      {/* Left Side - Image */}
      <motion.div variants={imageVariants} className="relative w-full xl:w-1/2">
        <img
          src="https://img.freepik.com/free-photo/beautiful-brunette-woman-plays-with-two-shiba-inu-dogs-looks-away-thinks-how-feed-pets-teach-commands-expresses-caress-isolated-pink-background_273609-34195.jpg"
          className="rounded-lg shadow-xl w-full"
          alt="Pet Care"
        />
      </motion.div>

      {/* Right Side - Text */}
      <motion.div variants={textVariants} className="w-full xl:w-1/2">
        <h2 className="text-[#373737] text-3xl md:text-5xl">
          We Are Providing Pet Care
        </h2>
        <p className="text-[#C52546] play-fair font-semibold tracking-widest text-xl md:text-2xl my-3">
          Service For Years
        </p>
        <p className="text-[#373737] text-sm md:text-base leading-[1.6rem] md:leading-[1.7rem] mt-5">
          Our passion is connecting loving families with their perfect furry
          companions. From cat adoption to dog rescue, we ensure safe and joyful
          transitions. Explore our services and meet your next best friend
          today!
        </p>

        {/* Testimonial Section */}
        <blockquote className="italic text-sm md:text-base text-gray-600 border-l-4 font-light leading-[1.5rem] tracking-wider border-[#C52546] pl-4 my-5">
          "They helped us find the perfect dog for our family. Highly
          recommend!"
        </blockquote>

        <div className="flex flex-col md:flex-row items-center mt-8 gap-6">
          <motion.div
            whileHover="hover"
            variants={founderHover}
            className="flex items-center gap-6"
          >
            <div>
              <img
                className="w-16 h-16 rounded-full"
                src="https://scontent.fdac14-1.fna.fbcdn.net/v/t39.30808-6/409721608_335483608833302_3123188489471629805_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeFtXe6aRw45T51HKwn0Tva0cBbzHCBTQ1xwFvMcIFNDXANe4U2n6Zb-NrpoK9TOfoXA1pf_KCoAFPE5WuGH_HC0&_nc_ohc=jE5ooU2m9l8Q7kNvgHf4Qio&_nc_zt=23&_nc_ht=scontent.fdac14-1.fna&_nc_gid=ATlf_vCR39Slw0hnHvtYf5K&oh=00_AYD_xbHjg-EYZu_U0YXYg_a8mDjblqOZwIqCXKo2nn-64w&oe=6776D222"
                alt="Founder"
              />
            </div>
            <div>
              <p className="font-bold text-[#373737]">MD Tahsinur Rahman</p>
              <span className="text-xs text-gray-500 tracking-wider">
                Founder, Pawfect Haven
              </span>
            </div>
          </motion.div>

          <motion.div
            whileHover="hover"
            variants={founderHover}
            className="flex items-center gap-6"
          >
            <div>
              <img
                className="w-16 h-16 rounded-full"
                src="https://scontent.fdac14-1.fna.fbcdn.net/v/t1.6435-9/150959374_974922056245770_436511227967223500_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeH2Lws1eyh40R1Y6-FDvG85dYJxvzZNhPd1gnG_Nk2E95MilRRZdf-t78s8tdKu4eHtdz4d4E9kHN_GXdRxNYn5&_nc_ohc=iGIQoHtuQ2EQ7kNvgHjk5zU&_nc_zt=23&_nc_ht=scontent.fdac14-1.fna&_nc_gid=AcGwA8Lk7zEh08LfJa49RIP&oh=00_AYC-HkH_n-p25WeU8-yp_sILICIHwRFKUPtUpWf-8rW1Jw&oe=67984EDD"
                alt="Founder"
              />
            </div>
            <div>
              <p className="font-bold text-[#373737]">Anirban Ghosh Argha</p>
              <span className="text-xs text-gray-500 tracking-wider">
                Founder, Pawfect Haven
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutSection;
