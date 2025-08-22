//wedding services page

import React from "react";

export default function WeddingServices() {
  return (
    <div className="font-serif text-gray-800 bg-white pt-24">
      {/* Header */}
      <header className="text-center py-8 bg-pink-50 shadow-md">
        <h1 className="text-4xl font-bold text-pink-700">Guthbandhan</h1>
        <p className="text-lg text-gray-600">
          Where Every Wedding Tells a Story
        </p>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero text-center py-12">
        <img
          className="w-full h-96 object-cover rounded-lg shadow-lg"
          src="https://t4.ftcdn.net/jpg/10/67/10/91/240_F_1067109176_1dc4k9JMAdiEpH60hVZgrZYJI9g8WsZS.jpg"
          alt="Royal Indian Wedding"
        />
        <h2 className="text-3xl font-bold mt-6 text-pink-700">
          Crafting Extraordinary Indian Weddings
        </h2>
        <p className="max-w-3xl mx-auto mt-4 text-gray-600">
          From majestic palaces to intimate garden affairs, Guthbandhan is your
          trusted wedding planning partner across India.
        </p>
        <a
          href="#contact"
          className="inline-block mt-6 px-6 py-3 bg-pink-600 text-white rounded-full shadow hover:bg-pink-700 transition"
        >
          Start Planning Your Dream Wedding
        </a>
      </section>

      {/* Services */}
      <section id="services" className="py-12 bg-pink-50">
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-8">
          💖 Our Services
        </h2>
        <img
          className="w-full max-w-6xl mx-auto rounded-lg shadow-md h-2xl"
          src="https://cheetah.cherishx.com/uploads/1677676631_webp_large.webp"
          alt="Mehendi Decor"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 max-w-6xl mx-auto px-4">
          <ServiceCard
            title="✨ Complete Wedding Planning"
            items={[
              "Venue scouting & bookings",
              "Theme & concept design",
              "Wedding stationery & invites",
            ]}
          />
          <ServiceCard
            title="🌿 Design & Decor"
            items={[
              "Stunning floral installations",
              "Custom mandaps & varmala arches",
              "Thematic lighting & draping",
            ]}
          />
          <ServiceCard
            title="🍽 Catering & Hospitality"
            items={[
              "Multi-cuisine menus & live counters",
              "Signature cocktails & mocktails",
              "Guest hospitality & RSVP",
            ]}
          />
          <ServiceCard
            title="💃 Entertainment & Experiences"
            items={[
              "Celebrity & folk performances",
              "Pre-wedding games, couple entries, fireworks",
            ]}
          />
          <ServiceCard
            title="📸 Photography & Films"
            items={[
              "Pre-wedding shoots & drone coverage",
              "Cinematic wedding films",
            ]}
          />
        </div>
      </section>

      {/* Venues */}
      <SectionWithImage
        id="venues"
        title="🏰 Venues & Destinations"
        img="https://www.kalkifashion.com/blogs/wp-content/uploads/2023/01/Wedding-in-udaipur.jpg"
        text="Jaipur & Udaipur palaces, Goa beaches, Kerala backwaters, Mussoorie & Shimla hills, Delhi NCR farmhouses, and destination weddings in Thailand & Bali."
      />

      {/* Real Weddings */}
      <section id="real-weddings" className="py-12">
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-8">
          ❤ Real Weddings
        </h2>
        <img
          className="w-full max-w-5xl mx-auto rounded-lg shadow-md"
          src="https://cdn0.weddingwire.in/article/0647/3_2/960/jpeg/117460-w-7.jpeg"
          alt="Real Couple"
        />
        <ul className="mt-6 space-y-2 text-center">
          <li>
            <strong>Alka & Kapil, Faridabad:</strong> A pastel floral fairytale
          </li>
          <li>
            <strong>Meera & Aarav, Jaipur:</strong> A regal ceremony at Rambagh
            Palace
          </li>
          <li>
            <strong>Priya & Rohit, Goa:</strong> A vibrant mehendi on the sands
          </li>
        </ul>
      </section>

      {/* Why Choose */}
      <section id="why" className="py-12 bg-pink-50">
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-8">
          💡 Why Choose Guthbandhan?
        </h2>
        <ul className="list-disc list-inside max-w-xl mx-auto space-y-2 text-gray-700">
          <li>✅ Over 10 years of planning dream weddings</li>
          <li>✅ Handpicked top-tier vendors & designers</li>
          <li>✅ Transparent budgets & on-ground execution</li>
          <li>✅ Stress-free planning so you enjoy every moment</li>
        </ul>
      </section>

      {/* About */}
      <section id="about" className="py-12">
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-4">
          🌸 About Guthbandhan
        </h2>
        <p className="max-w-3xl mx-auto text-center text-gray-600">
          <em>Guthbandhan</em> (meaning “the knot”) is a premier Indian wedding
          planning & experience design company. We blend cherished family
          traditions with modern elegance to curate deeply personal, joyous
          celebrations.
        </p>
      </section>

      {/* Contact */}
      <section id="contact" className="py-12 bg-pink-50 text-center">
        <h2 className="text-3xl font-bold text-pink-700 mb-4">
          📞 Contact Us
        </h2>
        <p className="text-gray-600">Schedule Your Free Consultation:</p>
        <ul className="mt-4 space-y-2">
          <li>WhatsApp: +91 XXXXX XXXXX</li>
          <li>Email: hello@guthbandhan.com</li>
          <li>Instagram: @guthbandhan.weddings</li>
        </ul>
        <a
          href="#contact"
          className="inline-block mt-6 px-6 py-3 bg-pink-600 text-white rounded-full shadow hover:bg-pink-700 transition"
        >
          Start Planning Your Wedding →
        </a>
      </section>

      {/* Footer */}
      {/* <footer className="text-center py-6 bg-pink-700 text-white">
        © 2025 Guthbandhan. All rights reserved.
      </footer> */}
    </div>
  );
}

function ServiceCard({ title, items }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-pink-600 mb-4">{title}</h3>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function SectionWithImage({ id, title, img, text }) {
  return (
    <section id={id} className="py-12">
      <h2 className="text-3xl font-bold text-center text-pink-700 mb-8">
        {title}
      </h2>
      <img
        className="w-full max-w-5xl mx-auto rounded-lg shadow-md"
        src={img}
        alt={title}
      />
      <p className="max-w-3xl mx-auto mt-6 text-center text-gray-600">{text}</p>
    </section>
  );
}