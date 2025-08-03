import React from 'react';
import { ArrowRight, Sparkles, Zap, Target, Rocket, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const handleSubmitClick = () => {
    navigate('/submit');
  };

  return (
    <section className="relative bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-black dark:via-gray-900 dark:to-green-900/40 pt-16 pb-24 overflow-hidden transition-colors duration-300">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-300/30 to-green-500/30 dark:from-green-800/30 dark:to-green-900/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-200/30 to-green-400/30 dark:from-green-900/20 dark:to-green-700/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-100/20 to-green-400/20 dark:from-green-900/10 dark:to-green-700/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-green-400 dark:bg-green-300 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-green-300 dark:bg-green-200 rounded-full animate-bounce-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-20 w-4 h-4 bg-green-600 dark:bg-green-500 rounded-full animate-bounce-slow" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-900/70 text-green-700 dark:text-green-300 px-6 py-3 rounded-full text-sm font-medium mb-8 animate-pulse-slow border border-green-200 dark:border-green-700 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 animate-bounce-slow text-green-500 dark:text-green-300" />
            <span>Turn Your Ideas Into Reality</span>
            <Star className="h-4 w-4 animate-bounce-slow text-green-500 dark:text-green-300" style={{ animationDelay: '0.5s' }} />
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-green-900 dark:text-green-200 mb-6 leading-tight">
            Build Your Dream
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-green-400 to-green-700 dark:from-green-300 dark:via-green-500 dark:to-green-700 animate-gradient bg-300%">
              App or Website
            </span>
            <span className="block relative">
              On Demand
              <Rocket className="inline-block ml-4 h-12 w-12 text-green-600 dark:text-green-400 animate-bounce-slow" />
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-green-800 dark:text-green-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            From concept to deployment, we transform your innovative ideas into powerful applications using cutting-edge technologies. Submit your project today and watch your vision come to life.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={handleSubmitClick}
              className="group relative bg-gradient-to-r from-green-600 via-green-500 to-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 flex items-center space-x-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-green-600 to-green-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-2">
                <span>Submit Your Project</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </button>
            <button onClick={() => {
              const section = document.getElementById("projects");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
              className="group text-green-900 dark:text-green-200 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-green-200 dark:border-green-600 hover:border-green-300 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              View Examples
            </button>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="relative bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
              <Zap className="h-10 w-10 text-green-600 dark:text-green-400 animate-pulse-slow" />
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent rounded-2xl group-hover:from-green-400/40 transition-all duration-300"></div>
            </div>
            <h3 className="text-xl font-bold text-green-900 dark:text-green-200 mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Lightning Fast</h3>
            <p className="text-green-800 dark:text-green-200 leading-relaxed">Get your project delivered in record time with our streamlined development process.</p>
          </div>
          <div className="text-center group">
            <div className="relative bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
              <Target className="h-10 w-10 text-green-700 dark:text-green-300 animate-pulse-slow" style={{ animationDelay: '1s' }} />
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent rounded-2xl group-hover:from-green-400/40 transition-all duration-300"></div>
            </div>
            <h3 className="text-xl font-bold text-green-900 dark:text-green-200 mb-3 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">Precision Built</h3>
            <p className="text-green-800 dark:text-green-200 leading-relaxed">Every feature is crafted with attention to detail and modern best practices.</p>
          </div>
          <div className="text-center group">
            <div className="relative bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
              <Sparkles className="h-10 w-10 text-green-700 dark:text-green-300 animate-pulse-slow" style={{ animationDelay: '2s' }} />
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent rounded-2xl group-hover:from-green-400/40 transition-all duration-300"></div>
            </div>
            <h3 className="text-xl font-bold text-green-900 dark:text-green-200 mb-3 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">Modern Tech</h3>
            <p className="text-green-800 dark:text-green-200 leading-relaxed">Built with the latest frameworks and technologies for optimal performance.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;