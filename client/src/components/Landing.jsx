import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Landing() {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      title: "Advanced Diagnostics",
      description: "State-of-the-art laboratory testing with precision and accuracy",
      icon: "🔬"
    },
    {
      title: "Quick Results",
      description: "Get your test results in hours, not days",
      icon: "⚡"
    },
    {
      title: "Expert Analysis",
      description: "Professional interpretation by certified specialists",
      icon: "👨‍⚕️"
    },
    {
      title: "Secure & Private",
      description: "Your health data is protected with enterprise-grade security",
      icon: "🔒"
    }
  ];

  const stats = [
    { number: "50K+", label: "Tests Completed" },
    { number: "99.9%", label: "Accuracy Rate" },
    { number: "24/7", label: "Support Available" },
    { number: "100+", label: "Test Types" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Heading */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
              Your Health,
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent block">
                Our Priority
              </span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-normal">
              Experience next-generation healthcare with precision diagnostics, instant results, and personalized care. 
              Your journey to better health starts here.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <Link
                to="/register"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-base rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 min-w-[200px]"
              >
                <span className="relative z-10">Get Started Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <Link
                to="/login"
                className="group px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold text-base rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 min-w-[200px]"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Feature Showcase */}
          <div className="mt-20 mb-12">
            <div className="glass-effect rounded-3xl p-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-6xl mb-4 animate-bounce">{features[currentFeature].icon}</div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{features[currentFeature].title}</h3>
                <p className="text-gray-300 text-base md:text-lg font-normal">{features[currentFeature].description}</p>
              </div>
              
              {/* Feature Indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFeature(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentFeature ? 'bg-blue-500 scale-125' : 'bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-lg md:text-xl text-gray-300 font-normal">
              Leading the industry with innovation and excellence
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass-effect rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Comprehensive Testing
            </h2>
            <p className="text-xl text-gray-300">
              From routine checks to specialized diagnostics
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-effect rounded-2xl p-8 hover:scale-105 transition-all duration-300 group">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">🩺</div>
              <h3 className="text-2xl font-bold text-white mb-4">Routine Health</h3>
              <p className="text-gray-300 mb-6">
                Complete blood count, lipid panels, metabolic screening, and more essential health markers.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold"
              >
                Learn More →
              </Link>
            </div>

            <div className="glass-effect rounded-2xl p-8 hover:scale-105 transition-all duration-300 group">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">🧬</div>
              <h3 className="text-2xl font-bold text-white mb-4">Genetic Testing</h3>
              <p className="text-gray-300 mb-6">
                Advanced genetic screening, hereditary disease markers, and personalized medicine insights.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold"
              >
                Learn More →
              </Link>
            </div>

            <div className="glass-effect rounded-2xl p-8 hover:scale-105 transition-all duration-300 group">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">⚕️</div>
              <h3 className="text-2xl font-bold text-white mb-4">Specialized Care</h3>
              <p className="text-gray-300 mb-6">
                Hormone panels, allergy testing, cardiac markers, and other specialized diagnostic services.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-effect rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Health Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of satisfied patients who trust MediConnect for their healthcare needs.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
            >
              Start Your Free Account
              <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;
