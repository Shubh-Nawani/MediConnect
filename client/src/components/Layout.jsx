import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-md flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-gray-900">MediConnect</span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-600">
                © 2025 MediConnect. Your trusted health partner.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Built with ❤️ by Shubh Nawani
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
