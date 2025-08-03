import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Startup Founder',
      company: 'TechFlow',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'DevOnDemand transformed our vision into a stunning reality. Their attention to detail and technical expertise exceeded our expectations.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'InnovateCorp',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'The team delivered our complex e-commerce platform ahead of schedule. The quality and performance are outstanding.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Creative Director',
      company: 'DesignStudio',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'Working with DevOnDemand was a game-changer. They brought our creative concepts to life with pixel-perfect precision.',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-green-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4 text-green-500" />
            <span>Client Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-green-900 dark:text-green-200 mb-4 tracking-tight">
            What Our Clients Say
          </h2>
          <p className="text-lg text-green-800 dark:text-green-200 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience with DevOnDemand.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-green-950 rounded-3xl p-10 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 group relative overflow-visible border border-green-100 dark:border-green-900"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center shadow-md">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-4 border-white dark:border-green-800 shadow-lg"
                />
              </div>
              <div className="relative mt-10">
                <Quote className="h-8 w-8 text-green-400 mb-4 opacity-60 mx-auto" />
                <p className="text-green-900 dark:text-green-200 mb-6 leading-relaxed text-center italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center justify-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-green-400 fill-current" />
                  ))}
                </div>
                <div className="flex flex-col items-center">
                  <h4 className="font-semibold text-green-900 dark:text-green-200 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;