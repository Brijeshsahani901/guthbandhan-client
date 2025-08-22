import { useState } from 'react'
import Slider from 'react-slick'
import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: "Guthbandhan helped me find my soulmate when I least expected it. The matching algorithm is truly impressive - we have so much in common!",
    name: "Sarah Johnson",
    role: "Married to Michael, Met in 2024",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    quote: "After trying several dating apps with no luck, I found my perfect match on Guthbandhan. The focus on compatibility made all the difference.",
    name: "David Chen",
    role: "Engaged to Emma, Met in 2024",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    quote: "What sets Guthbandhan apart is the quality of matches. I connected with people who shared my values and life goals, which led to my current relationship.",
    name: "Jessica Miller",
    role: "Dating Thomas for 1 year",
    avatar: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    quote: "The verified profiles gave me confidence that I was talking to genuine people. I met my fiancée here and couldn't be happier!",
    name: "Robert Taylor",
    role: "Engaged to Amanda, Met in 2023",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
]

const Testimonials = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (current, next) => setActiveSlide(next),
  }
  
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-secondary-700 text-white overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-lg text-white/90">
            Hear from couples who found love through Guthbandhan.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 text-white/10 text-9xl font-serif">"</div>
          <div className="absolute -bottom-6 -right-6 text-white/10 text-9xl font-serif">"</div>
          
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="outline-none focus:outline-none">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeSlide === index ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-10"
                >
                  <p className="text-xl md:text-2xl mb-8 font-serif leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-white/80">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  )
}

export default Testimonials