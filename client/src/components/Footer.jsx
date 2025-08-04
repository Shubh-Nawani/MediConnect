import { useState, useEffect } from 'react';

function Footer() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <footer className="py-3 px-4 bg-black/20 backdrop-blur-md border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between text-sm text-gray-400">
          {/* Left: Company */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <img 
                src="/favicon.ico" 
                alt="MediConnect" 
                className="w-3 h-3"
              />
            </div>
            <span className="font-medium text-gray-300">MediConnect</span>
            <span>© 2025</span>
          </div>

          {/* Center: System Status */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400 font-medium">All systems operational</span>
          </div>

          {/* Right: Local Time */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-xs text-gray-500">{formatDate(currentTime)}</div>
              <div className="font-mono text-sm text-gray-300">{formatTime(currentTime)}</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
