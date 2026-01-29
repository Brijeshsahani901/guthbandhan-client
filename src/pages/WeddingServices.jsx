// import React from "react";
// import { motion, useAnimation, useInView } from "framer-motion";
// import { useRef, useEffect } from "react";

// export default function WeddingServices() {
//   return (
//     <div className="font-serif text-gray-800 bg-white pt-24 overflow-x-hidden">
//       {/* Header */}
//       <motion.header
//         className="text-center py-8 bg-pink-50 shadow-md"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//       >
//         <motion.h1 className="text-5xl font-extrabold text-pink-700 tracking-wide">
//           Guthbandhan
//         </motion.h1>
//         <motion.p
//           className="text-lg text-gray-600 mt-2"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           Where Every Wedding Tells a Story
//         </motion.p>
//       </motion.header>

//       {/* Hero Section */}
//       <section className="hero text-center py-16 px-4">
//         <motion.img
//           className="w-full h-[28rem] object-cover rounded-xl shadow-lg"
//           src="https://t4.ftcdn.net/jpg/10/67/10/91/240_F_1067109176_1dc4k9JMAdiEpH60hVZgrZYJI9g8WsZS.jpg"
//           alt="Royal Indian Wedding"
//           initial={{ scale: 0.95, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 1 }}
//         />

//         <motion.h2
//           className="text-4xl font-bold mt-10 text-pink-700"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5, duration: 0.6 }}
//         >
//           Crafting Extraordinary Indian Weddings
//         </motion.h2>
//         <motion.p
//           className="max-w-3xl mx-auto mt-4 text-gray-600"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.7, duration: 0.6 }}
//         >
//           From majestic palaces to intimate garden affairs, Guthbandhan is your
//           trusted wedding planning partner across India.
//         </motion.p>
//         <motion.a
//           href="#contact"
//           className="inline-block mt-8 px-8 py-3 bg-pink-600 text-white rounded-full shadow-lg hover:bg-pink-700 transition font-medium"
//           whileHover={{ scale: 1.08 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Start Planning Your Dream Wedding
//         </motion.a>
//       </section>

//       {/* Services Section */}
//       <AnimatedSection id="services" title="💖 Our Services">
//         <motion.img
//           className="w-full max-w-6xl mx-auto rounded-lg shadow-xl h-96 object-cover"
//           src="https://cheetah.cherishx.com/uploads/1677676631_webp_large.webp"
//           alt="Mehendi Decor"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 1.2 }}
//         />
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 max-w-6xl mx-auto px-4">
//           {services.map((service, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.2 }}
//               whileHover={{ scale: 1.03 }}
//             >
//               <ServiceCard title={service.title} items={service.items} />
//             </motion.div>
//           ))}
//         </div>
//       </AnimatedSection>

//       {/* Venues */}
//       <SectionWithImage
//         id="venues"
//         title="🏰 Venues & Destinations"
//         img="https://www.kalkifashion.com/blogs/wp-content/uploads/2023/01/Wedding-in-udaipur.jpg"
//         text="Jaipur & Udaipur palaces, Goa beaches, Kerala backwaters, Mussoorie & Shimla hills, Delhi NCR farmhouses, and destination weddings in Thailand & Bali."
//       />

//       {/* Real Weddings */}
//       <AnimatedSection id="real-weddings" title="❤ Real Weddings">
//         <motion.img
//           className="w-full max-w-5xl mx-auto rounded-xl shadow-lg"
//           src="https://cdn0.weddingwire.in/article/0647/3_2/960/jpeg/117460-w-7.jpeg"
//           alt="Real Couple"
//           initial={{ opacity: 0, scale: 0.95 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8 }}
//         />
//         <ul className="mt-6 space-y-2 text-center text-gray-700">
//           <li>
//             <strong>Alka & Kapil, Faridabad:</strong> A pastel floral fairytale
//           </li>
//           <li>
//             <strong>Meera & Aarav, Jaipur:</strong> A regal ceremony at Rambagh
//             Palace
//           </li>
//           <li>
//             <strong>Priya & Rohit, Goa:</strong> A vibrant mehendi on the sands
//           </li>
//         </ul>
//       </AnimatedSection>

//       {/* Why Choose */}
//       <AnimatedSection
//         id="why"
//         title="💡 Why Choose Guthbandhan?"
//         bgColor="bg-pink-50"
//       >
//         <motion.ul
//           className="list-disc list-inside max-w-xl mx-auto space-y-3 text-gray-700"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.6 }}
//         >
//           <li>✅ Over 10 years of planning dream weddings</li>
//           <li>✅ Handpicked top-tier vendors & designers</li>
//           <li>✅ Transparent budgets & on-ground execution</li>
//           <li>✅ Stress-free planning so you enjoy every moment</li>
//         </motion.ul>
//       </AnimatedSection>

//       {/* About */}
//       <AnimatedSection id="about" title="🌸 About Guthbandhan">
//         <motion.p
//           className="max-w-3xl mx-auto text-center text-gray-600"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           <em>Guthbandhan</em> (meaning “the knot”) is a premier Indian wedding
//           planning & experience design company. We blend cherished family
//           traditions with modern elegance to curate deeply personal, joyous
//           celebrations.
//         </motion.p>
//       </AnimatedSection>

//       {/* Contact */}
//       <AnimatedSection
//         id="contact"
//         title="📞 Contact Us"
//         bgColor="bg-pink-50"
//         className="text-center"
//       >
//         <motion.p
//           className="text-gray-600 text-center"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 0.1 }}
//         >
//           Schedule Your Free Consultation:
//         </motion.p>

//         <ul className="mt-4 space-y-2 text-center">
//           <li>
//             <strong>Arnav Arvind</strong> -{" "}
//             <a
//               href="tel:+919910550022"
//               className="text-pink-600 hover:underline"
//             >
//               +91 99105 50022
//             </a>{" "}
//             •{" "}
//             <a
//               href="https://wa.me/919910550022"
//               target="_blank"
//               rel="noreferrer"
//               className="text-pink-600 hover:underline"
//             >
//               WhatsApp
//             </a>
//           </li>

//           <li>
//             <strong>Rahul Kapoor</strong> -{" "}
//             <a
//               href="tel:+917838319148"
//               className="text-pink-600 hover:underline"
//             >
//               +91 78383 19148
//             </a>{" "}
//             •{" "}
//             <a
//               href="https://wa.me/917838319148"
//               target="_blank"
//               rel="noreferrer"
//               className="text-pink-600 hover:underline"
//             >
//               WhatsApp
//             </a>
//           </li>

//           <li>
//             <strong>Harshmeet Kapoor</strong> -{" "}
//             <a
//               href="tel:+919810181635"
//               className="text-pink-600 hover:underline"
//             >
//               +91 98101 81635
//             </a>{" "}
//             •{" "}
//             <a
//               href="https://wa.me/919810181635"
//               target="_blank"
//               rel="noreferrer"
//               className="text-pink-600 hover:underline"
//             >
//               WhatsApp
//             </a>
//           </li>

//           <motion.a
//             href="#contact"
//             className="inline-block items-center mt-6 px-6 py-3 bg-pink-600 text-white rounded-full shadow hover:bg-pink-700 transition font-semibold"
//             whileHover={{ scale: 1.08 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Start Planning Your Wedding →
//           </motion.a>
//         </ul>
//       </AnimatedSection>
//     </div>
//   );
// }

// /* Reusable Components */

// function AnimatedSection({ id, title, children, bgColor = "" }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, amount: 0.3 });
//   const controls = useAnimation();

//   useEffect(() => {
//     if (inView) {
//       controls.start("visible");
//     }
//   }, [inView]);

//   return (
//     <motion.section
//       ref={ref}
//       id={id}
//       className={`py-16 px-4 ${bgColor}`}
//       initial="hidden"
//       animate={controls}
//       variants={{
//         hidden: { opacity: 0, y: 50 },
//         visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
//       }}
//     >
//       <h2 className="text-3xl font-bold text-center text-pink-700 mb-8">
//         {title}
//       </h2>
//       {children}
//     </motion.section>
//   );
// }

// function SectionWithImage({ id, title, img, text }) {
//   return (
//     <AnimatedSection id={id} title={title}>
//       <motion.img
//         className="w-full max-w-5xl mx-auto rounded-lg shadow-xl"
//         src={img}
//         alt={title}
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       />
//       <motion.p
//         className="max-w-3xl mx-auto mt-6 text-center text-gray-600"
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ delay: 0.2 }}
//       >
//         {text}
//       </motion.p>
//     </AnimatedSection>
//   );
// }

// function ServiceCard({ title, items }) {
//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
//       <h3 className="text-xl font-semibold text-pink-600 mb-4">{title}</h3>
//       <ul className="list-disc list-inside space-y-2 text-gray-700">
//         {items.map((item, i) => (
//           <li key={i}>{item}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// /* Services Data */
// const services = [
//   {
//     title: "✨ Complete Wedding Planning",
//     items: [
//       "Venue scouting & bookings",
//       "Theme & concept design",
//       "Wedding stationery & invites",
//     ],
//   },
//   {
//     title: "🌿 Design & Decor",
//     items: [
//       "Stunning floral installations",
//       "Custom mandaps & varmala arches",
//       "Thematic lighting & draping",
//     ],
//   },
//   {
//     title: "🍽 Catering & Hospitality",
//     items: [
//       "Multi-cuisine menus & live counters",
//       "Signature cocktails & mocktails",
//       "Guest hospitality & RSVP",
//     ],
//   },
//   {
//     title: "💃 Entertainment & Experiences",
//     items: [
//       "Celebrity & folk performances",
//       "Pre-wedding games, couple entries, fireworks",
//     ],
//   },
//   {
//     title: "📸 Photography & Films",
//     items: ["Pre-wedding shoots & drone coverage", "Cinematic wedding films"],
//   },
// ];


import React from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function WeddingServices() {
  return (
    <div className="font-sans text-neutral-900 bg-gradient-to-b from-white to-neutral-50 pt-16 overflow-x-hidden">
      {/* Hero Header */}
      <motion.section
        className="relative min-h-[50vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-pink-500/5 to-transparent" />
        
        {/* Animated Blobs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
        
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 backdrop-blur-sm rounded-full mb-6"
          >
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
            <span className="text-primary-600 font-medium text-sm">PREMIUM WEDDING SERVICES</span>
          </motion.div>
          
          <motion.h1
            className="text-5xl  font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-primary-600 via-pink-600 to-primary-600 bg-clip-text text-transparent">
              Dream Weddings
            </span>
            <br />
            <span className="text-neutral-900">Perfected with Love</span>
          </motion.h1>
          
          <motion.p
            className="text-lg text-neutral-600 max-w-3xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            From majestic palaces to intimate garden affairs, Guthbandhan crafts extraordinary 
            Indian weddings that tell your unique love story.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="#contact"
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all duration-300"
              >
                Start Planning Now
              </a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/browse"
                className="px-6 py-3 bg-white border-2 border-primary-500 text-primary-600 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-300"
              >
                Browse Venues
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Image */}
      <motion.section
        className="container-custom py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <img
            className="w-full h-[500px] object-cover"
            src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Royal Indian Wedding"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <div className="text-sm font-medium mb-2">FEATURED WEDDING</div>
            <h3 className="text-3xl font-bold mb-2">Meera & Aarav's Palace Celebration</h3>
            <p className="text-white/80">Jaipur • Rambagh Palace • 2023</p>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <AnimatedSection id="services" title="💝 Our Premium Services">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <ServiceCard {...service} index={index} />
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Venues Section */}
      <section className="bg-gradient-to-br from-primary-50/50 to-pink-50/50 py-20">
        <div className="container-custom">
          <AnimatedSection title="🏰 Exclusive Venues & Destinations">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 text-primary-600 font-medium">
                    <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                    CURATED LOCATIONS
                  </div>
                  <h3 className="text-3xl font-bold text-neutral-900">
                    India's Most Prestigious Wedding Destinations
                  </h3>
                  <p className="text-neutral-600 text-lg leading-relaxed">
                    From royal palaces of Rajasthan to serene beaches of Goa, 
                    we have access to India's most coveted wedding venues. 
                    Each location is handpicked for its unique charm and exceptional service.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "Jaipur & Udaipur Palaces",
                      "Goa Beach Resorts",
                      "Kerala Backwaters",
                      "Delhi NCR Farmhouses",
                      "Shimla Hill Stations",
                      "International Destinations"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        <span className="text-neutral-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    className="w-full h-[400px] object-cover"
                    src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Wedding Venue"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-primary-500 to-pink-500 rounded-2xl -rotate-12 opacity-20"></div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Real Weddings Gallery */}
      <AnimatedSection title="📸 Real Wedding Stories" className="py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {realWeddings.map((wedding, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <img
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    src={wedding.image}
                    alt={wedding.couple}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="font-bold text-xl mb-2">{wedding.couple}</h4>
                    <p className="text-sm text-white/80">{wedding.location}</p>
                    <p className="text-sm mt-2">{wedding.description}</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                    {wedding.theme}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Why Choose Us */}
      <section className="bg-gradient-to-r from-primary-500/5 via-white to-pink-500/5 py-20">
        <div className="container-custom">
          <AnimatedSection title="🌟 Why Choose Guthbandhan">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {whyChooseUs.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-pink-500 flex items-center justify-center text-white text-2xl mb-6">
                      {item.icon}
                    </div>
                    <h4 className="font-bold text-xl mb-3">{item.title}</h4>
                    <p className="text-neutral-600">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-neutral-900 to-primary-900 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></span>
                <span className="text-primary-300 font-medium">GET IN TOUCH</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Let's Create Your <span className="text-primary-300">Dream Wedding</span>
              </h2>
              
              <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                Schedule a complimentary consultation with our expert wedding planners.
              </p>

              {/* Contact Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {contactPersons.map((person, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-primary-400/30 transition-all duration-300"
                  >
                    <h4 className="font-bold text-xl mb-2">{person.name}</h4>
                    <p className="text-white/60 mb-4">{person.role}</p>
                    <div className="space-y-2">
                      <a
                        href={`tel:${person.phone.replace(/\D/g, '')}`}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                      >
                        <span className="text-lg">📞</span>
                        {person.phone}
                      </a>
                      <a
                        href={`https://wa.me/${person.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg transition-colors"
                      >
                        <span className="text-lg">💬</span>
                        WhatsApp
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Final CTA */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary-500 to-pink-500 text-white font-bold rounded-xl shadow-2xl shadow-primary-500/30 hover:shadow-primary-500/50 transition-all duration-300"
                >
                  <span>Start Your Wedding Journey</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* Reusable Components */

function AnimatedSection({ title, children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <motion.section
      ref={ref}
      className={`py-16 ${className}`}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { 
            duration: 0.6,
            ease: "easeOut"
          }
        },
      }}
    >
      {title && (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { delay: 0.1 } }
          }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-600 to-pink-600 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-pink-500 mx-auto rounded-full"></div>
        </motion.div>
      )}
      {children}
    </motion.section>
  );
}

function ServiceCard({ title, items, index }) {
  const gradientColors = [
    "from-primary-500 to-pink-500",
    "from-blue-500 to-cyan-500",
    "from-emerald-500 to-green-500",
    "from-purple-500 to-violet-500",
    "from-amber-500 to-orange-500",
    "from-rose-500 to-red-500"
  ];

  return (
    <div className="group h-full">
      <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-xl border border-neutral-200 hover:border-transparent transition-all duration-300 overflow-hidden">
        {/* Gradient Header */}
        <div className={`h-2 bg-gradient-to-r ${gradientColors[index % gradientColors.length]}`}></div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradientColors[index % gradientColors.length]} p-0.5`}>
              <div className="w-full h-full rounded-xl bg-white flex items-center justify-center text-lg">
                {title.includes("✨") ? "✨" : 
                 title.includes("🌿") ? "🌿" : 
                 title.includes("🍽") ? "🍽" : 
                 title.includes("💃") ? "💃" : 
                 title.includes("📸") ? "📸" : "💝"}
              </div>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 pt-2">{title.replace(/[✨🌿🍽💃📸💝]/g, '')}</h3>
          </div>
          
          <ul className="space-y-3">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradientColors[index % gradientColors.length]} mt-2 flex-shrink-0`}></div>
                <span className="text-neutral-700">{item}</span>
              </li>
            ))}
          </ul>
          
          <motion.div
            className="mt-8 pt-6 border-t border-neutral-100"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <a href="#contact" className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
              <span>Learn More</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* Data */

const services = [
  {
    title: "Complete Wedding Planning",
    items: [
      "Venue scouting & premium bookings",
      "Custom theme & concept design",
      "Luxury wedding stationery",
      "Complete timeline management"
    ],
  },
  {
    title: "Design & Decor",
    items: [
      "Stunning floral installations",
      "Custom mandaps & varmala arches",
      "Thematic lighting & draping",
      "Luxury furniture & setup"
    ],
  },
  {
    title: "Catering & Hospitality",
    items: [
      "Multi-cuisine gourmet menus",
      "Signature cocktails & mocktails",
      "Live food stations",
      "VIP guest hospitality"
    ],
  },
  {
    title: "Entertainment & Experiences",
    items: [
      "Celebrity & folk performances",
      "Pre-wedding games & activities",
      "Grand couple entries",
      "Fireworks & light shows"
    ],
  },
  {
    title: "Photography & Films",
    items: [
      "Pre-wedding cinematic shoots",
      "Drone & 360° coverage",
      "Destination wedding films",
      "Same-day edits"
    ],
  },
  {
    title: "Bridal & Groom Services",
    items: [
      "Luxury makeup & styling",
      "Designer wardrobe selection",
      "Groom's ensemble curation",
      "Beauty & wellness packages"
    ],
  },
];

const realWeddings = [
  {
    couple: "Alka & Kapil",
    location: "Faridabad • 2023",
    theme: "Pastel Fairytale",
    description: "A romantic floral celebration with pastel hues",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    couple: "Meera & Aarav",
    location: "Jaipur Palace • 2023",
    theme: "Royal Celebration",
    description: "Regal ceremony at Rambagh Palace",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    couple: "Priya & Rohit",
    location: "Goa Beach • 2022",
    theme: "Beach Wedding",
    description: "Vibrant mehendi on golden sands",
    image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const whyChooseUs = [
  {
    icon: "🎯",
    title: "10+ Years Experience",
    description: "Over a decade of crafting dream weddings across India"
  },
  {
    icon: "🤝",
    title: "Trusted Partners",
    description: "Handpicked network of premium vendors & designers"
  },
  {
    icon: "💎",
    title: "Luxury Focus",
    description: "Exclusive access to India's most coveted venues"
  },
  {
    icon: "✨",
    title: "Stress-Free",
    description: "Complete management so you enjoy every moment"
  }
];

const contactPersons = [
  {
    name: "Arnav Arvind",
    role: "Lead Wedding Planner",
    phone: "+91 99105 50022"
  },
  {
    name: "Rahul Kapoor",
    role: "Venue Specialist",
    phone: "+91 78383 19148"
  },
  {
    name: "Harshmeet Kapoor",
    role: "Design Director",
    phone: "+91 98101 81635"
  }
];