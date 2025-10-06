
import logo from '../../../../assets/logo.svg'
const Footer = () => {
  return (
   <footer className="bg-gray-100 border-t border-gray-100  py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
            
            {/* Brand & Features */}
            <div className="col-span-2 flex flex-col space-y-4">
            <span className="flex items-center space-x-2">
                {/* Logo */}
                <img className="w-8 h-8" src={logo}></img>
                <span className="text-xl font-bold text-gray-800 tracking-tight">Classroom</span>
            </span>
            <p className="text-gray-500 text-base mb-6">
                Next-gen tools for teaching and learning.
            </p>
            <div className="space-y-2">
                <a href="#" className="hover:text-blue-600 transition text-gray-700 flex items-center">
                <span className="mr-2">&#x2714;</span> Assignment Checker
                </a>
                <a href="#" className="hover:text-blue-600 transition text-gray-700 flex items-center">
                <span className="mr-2">&#x1F916;</span> AI Chatbot
                </a>
                <a href="#" className="hover:text-blue-600 transition text-gray-700 flex items-center">
                <span className="mr-2">&#x1F4DD;</span> Feedback Trackings
                </a>
            </div>
            </div>
            
            {/* Programs & Community */}
            <div className="flex flex-col">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Programs & Community</h4>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition pb-1">Teachers Community</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition pb-1">Student Forum</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition pb-1">Global Programs</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition pb-1">Webinars & Events</a>
            </div>

            {/* Benefits */}
            <div className="flex flex-col">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Benefits</h4>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition pb-1">For Teachers</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition pb-1">For Students</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition pb-1">Skill Badges</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition pb-1">Learning Paths</a>
            </div>

            {/* Quick Links & Products */}
            <div className="flex flex-col">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Quick Links</h4>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition pb-1">GitHub</a>
            <a href="https://google.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition pb-1">Google</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition pb-1">Docs</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition pb-1">Slides</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition pb-1">Gemini</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition pb-1">AI Assistant</a>
            </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between mt-12 pt-8 border-t border-gray-200">
            <div className="flex space-x-4 mb-4 md:mb-0">
            {/* Social Icons */}
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 00-3.16 19.47c.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.34-3.37-1.34-.45-1.11-1.11-1.41-1.11-1.41-.91-.63.07-.62.07-.62 1 .07 1.53 1.02 1.53 1.02.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.63 9.63 0 012.5-.34c.85.01 1.71.11 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.21 2.4.11 2.65.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.68-4.57 4.93.36.33.68.98.68 1.98 0 1.43-.01 2.58-.01 2.93 0 .27.18.58.69.48A10 10 0 0012 2z" /></svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 48 48"><rect x="8" y="12" width="32" height="24" rx="6" /><circle cx="24" cy="24" r="8" fill="white" /></svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.564-2.005.974-3.127 1.195-.897-.953-2.178-1.55-3.594-1.55-2.723 0-4.928 2.205-4.928 4.93 0 .386.044.762.126 1.124-4.094-.205-7.725-2.168-10.158-5.153-.424.729-.666 1.577-.666 2.476 0 1.71.87 3.213 2.188 4.096-.807-.024-1.566-.247-2.228-.616v.062c0 2.385 1.693 4.374 3.946 4.827-.413.113-.849.174-1.296.174-.317 0-.626-.031-.928-.088.627 1.956 2.444 3.377 4.6 3.418-1.685 1.32-3.808 2.106-6.102 2.106-.396 0-.788-.023-1.177-.069 2.178 1.397 4.768 2.212 7.557 2.212 9.054 0 14-7.498 14-14 0-.213-.005-.426-.014-.637.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            </div>
            <span className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Classroom Platform. All rights reserved.
            </span>
        </div>
        </footer>
  )
}

export default Footer