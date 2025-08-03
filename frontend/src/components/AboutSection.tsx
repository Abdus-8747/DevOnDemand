import React from 'react';
import { CheckCircle, Lightbulb, Rocket, Shield } from 'lucide-react';

const AboutSection: React.FC = () => {
  const features = [
    {
      icon: Lightbulb,
      title: 'Innovative Solutions',
      description: 'We bring fresh perspectives and cutting-edge technologies to every project.'
    },
    {
      icon: Rocket,
      title: 'Fast Delivery',
      description: 'Rapid development cycles without compromising on quality or functionality.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Built with security best practices and enterprise-grade reliability.'
    },
    {
      icon: CheckCircle,
      title: 'Quality Assured',
      description: 'Rigorous testing and quality assurance for every line of code we write.'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div>
            <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>About DevOnDemand</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-green-900 dark:text-green-200 mb-6">
              Transforming Ideas Into
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400 dark:from-green-300 dark:to-green-500">
                Digital Reality
              </span>
            </h2>
            
            <p className="text-lg text-green-800 dark:text-green-200 mb-8 leading-relaxed">
              We're a team of passionate developers, designers, and innovators dedicated to bringing your digital dreams to life. With years of experience and a commitment to excellence, we transform complex ideas into simple, elegant solutions.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-green-500 to-green-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900 dark:text-green-200 mb-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right side - Visual */}
          <div className="relative">
          <div className="relative bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/20 rounded-3xl p-8 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-green-200/10 rounded-3xl"></div>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white dark:bg-green-950 p-4 rounded-xl shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300">
                    <div className="w-full h-3 bg-gradient-to-r from-green-400 to-green-600 rounded mb-3"></div>
                    <div className="space-y-2">
                      <div className="w-3/4 h-2 bg-green-100 dark:bg-green-900 rounded"></div>
                      <div className="w-1/2 h-2 bg-green-100 dark:bg-green-900 rounded"></div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-green-950 p-4 rounded-xl shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                    <div className="w-full h-3 bg-gradient-to-r from-green-300 to-green-500 rounded mb-3"></div>
                    <div className="space-y-2">
                      <div className="w-2/3 h-2 bg-green-100 dark:bg-green-900 rounded"></div>
                      <div className="w-3/4 h-2 bg-green-100 dark:bg-green-900 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-green-950 p-6 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
                    <div>
                      <div className="w-20 h-2 bg-green-100 dark:bg-green-900 rounded mb-1"></div>
                      <div className="w-16 h-2 bg-green-100 dark:bg-green-900 rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-green-100 dark:bg-green-900 rounded"></div>
                    <div className="w-5/6 h-2 bg-green-100 dark:bg-green-900 rounded"></div>
                    <div className="w-4/5 h-2 bg-green-100 dark:bg-green-900 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-bounce-slow"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-green-300 to-green-600 rounded-full animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;