import React from 'react';
import { ExternalLink, GitBranch, FileText, Zap, Brain, Globe } from 'lucide-react';

const FeaturedProjects: React.FC = () => {
  const projects = [
    {
      title: "Skill Drill AI",
      description: "AI-powered interview preparation platform that delivers role-specific questions, expandable answers, deep explanations, and personalized learning — your ultimate toolkit from preparation to mastery.",
      techStack: ["MongoDB", "Express", "React", "Node.js", "Gemini API"],
      icon: <GitBranch className="h-8 w-8" />,
      color: "from-green-600 to-green-400",
      bgColor: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/20",
      url: "https://skill-drill-ai.vercel.app/"
    },
    {
      title: "Just Notes",
      description: "Clean and intuitive note-taking application with real-time sync, markdown support, and organizational features for productivity enthusiasts.",
      techStack: ["React", "JavaScript", "Node", "Tailwind CSS"],
      icon: <FileText className="h-8 w-8" />,
      color: "from-green-500 to-green-300",
      bgColor: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/20",
      url: "https://just-notes-1.onrender.com/"
    },
    {
      title: "TypeIn.io",
      description: "Advanced typing speed tester with AI-powered feedback, custom text selection, and detailed analytics to improve typing performance.",
      techStack: ["React", "Python", "FastAPI", "OpenAI API", "PostgreSQL"],
      icon: <Zap className="h-8 w-8" />,
      color: "from-green-400 to-green-600",
      bgColor: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/20"
    },
    {
      title: "FitAI",
      description: "AI-powered workout assistant that creates personalized fitness routines, tracks progress, and adapts to user preferences and goals.",
      techStack: ["React Native", "TensorFlow", "Node.js", "MongoDB", "AWS"],
      icon: <Brain className="h-8 w-8" />,
      color: "from-green-700 to-green-500",
      bgColor: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/20"
    },
    {
      title: "GLOBIVIO",
      description: "An interactive world exploration app where you can search, filter, and discover details about every country — from history and culture to key statistics and fascinating facts.",
      techStack: ["React", "REST Countries API", "Tailwind CSS"],
      icon: <Globe className="h-8 w-8" />,
      color: "from-green-500 to-green-300",
      bgColor: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/20",
      url: "https://globivio.netlify.app/"
    }
  ];

  return (
    <section className="py-20 bg-green-50 dark:bg-black transition-colors duration-300" id='projects'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>Our Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 dark:text-green-200 mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-green-800 dark:text-green-200 max-w-2xl mx-auto">
            Discover some of the innovative applications we've built for our clients using modern technologies and best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${project.bgColor} backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 overflow-hidden group border border-white/20 dark:border-gray-700/50`}
            >
              <div className={`h-1 bg-gradient-to-r ${project.color}`}></div>

              <div className="p-8">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${project.color} text-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  {project.icon}
                </div>

                <h3 className="text-xl font-bold text-green-900 dark:text-green-200 mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-green-800 dark:text-green-200 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-white/60 dark:bg-green-900/60 text-green-900 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-green-200/50 dark:border-green-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-400 font-medium transition-all duration-300 group-hover:translate-x-2"
                  >
                    <span>View Details</span>
                    <ExternalLink className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
