import React from "react";

const AboutSection = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 px-8 py-16 max-w-7xl mx-auto">
      {/* Left Side - Image */}
      <div className="relative w-full lg:w-1/2">
        <img src="https://img.freepik.com/free-photo/beautiful-brunette-woman-plays-with-two-shiba-inu-dogs-looks-away-thinks-how-feed-pets-teach-commands-expresses-caress-isolated-pink-background_273609-34195.jpg"
          className="rounded-lg shadow-xl"
        />
      </div>

      {/* Right Side - Text */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-[#181818] text-4xl font-extrabold mb-4 leading-snug">
          We Are Providing Pet Care <br />
          <span className="text-[#F15E42]">Service For Years.</span>
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Our passion is connecting loving families with their perfect furry
          companions. From cat adoption to dog rescue, we ensure safe and
          joyful transitions. Explore our services and meet your next best
          friend today!
        </p>

        {/* Testimonial Section */}
        <blockquote className="italic text-gray-600 border-l-4 border-[#F15E42] pl-4 mb-4">
          "They helped us find the perfect dog for our family. Highly
          recommend!"
        </blockquote>
        <p className="font-bold text-[#181818]">Kash Prestonal</p>
        <span className="text-sm text-gray-500">Founder, Pawfect Haven</span>
      </div>
    </div>
  );
};

export default AboutSection;
