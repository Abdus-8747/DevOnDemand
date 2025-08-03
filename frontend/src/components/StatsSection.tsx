import React from 'react';
import { Users, Code, Clock, Award } from 'lucide-react';

const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: Users,
      value: '500+',
      label: 'Happy Clients',
      color: 'from-green-600 to-green-400',
      bgColor: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/20'
    },
    {
      icon: Code,
      value: '1000+',
      label: 'Projects Delivered',
      color: 'from-green-500 to-green-300',
      bgColor: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/20'
    },
    {
      icon: Clock,
      value: '24/7',
      label: 'Support Available',
      color: 'from-green-400 to-green-600',
      bgColor: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/20'
    },
    {
      icon: Award,
      value: '99%',
      label: 'Success Rate',
      color: 'from-green-700 to-green-500',
      bgColor: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/20'
    }
  ];

  return (
    <section className="py-20 bg-green-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`relative bg-gradient-to-br ${stat.bgColor} p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 group overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${stat.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold text-green-900 dark:text-green-200 mb-2 group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-green-800 dark:text-green-200 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;