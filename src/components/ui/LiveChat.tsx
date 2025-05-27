import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const LiveChat = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'agent',
      message: 'Xin chào! Welcome to Vietnam Adventure Tours. How can we help you discover the beauty of Vietnam today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() === '') return;
    
    // Add user message to chat
    const userMessage = {
      sender: 'user',
      message: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatHistory([...chatHistory, userMessage]);
    setMessage('');
    
    // Simulate agent response after a short delay
    setTimeout(() => {
      const agentMessage = {
        sender: 'agent',
        message: 'Thank you for your message! One of our travel experts will get back to you shortly. In the meantime, feel free to explore our tour packages or ask any other questions.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatHistory(prevHistory => [...prevHistory, agentMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button 
        onClick={toggleChat}
        className="fixed bottom-6 right-20 z-50 w-11 h-11 rounded-full bg-[var(--primary-color)] text-white shadow-lg flex items-center justify-center hover:bg-[#0077b3] transition-colors duration-300"
        aria-label="Live Chat"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>
      
      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`fixed bottom-24 right-6 z-50 w-80 md:w-96 rounded-lg shadow-xl overflow-hidden ${
            theme === 'light' ? 'bg-white' : 'bg-gray-800'
          }`}
        >
          {/* Chat Header */}
          <div className="bg-[var(--primary-color)] text-white p-4">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 mr-3 rounded-full bg-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-white">Leo Loves Travel Support</h4>
                <p className="text-sm opacity-80">Typically replies within minutes</p>
              </div>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="p-4 overflow-y-auto h-80">
            <div className="space-y-4">
              {chatHistory.map((chat, index) => (
                <div 
                  key={index}
                  className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      chat.sender === 'user' 
                        ? 'bg-[var(--primary-color)] text-white' 
                        : theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'
                    }`}
                  >
                    <p className="text-sm">{chat.message}</p>
                    <p className={`text-xs mt-1 ${chat.sender === 'user' ? 'text-white/70' : 'opacity-60'}`}>{chat.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
            <div className="flex">
              <input 
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`flex-grow p-2 rounded-l-lg border ${
                  theme === 'light' 
                    ? 'border-gray-300 focus:border-[var(--primary-color)]' 
                    : 'border-gray-600 bg-gray-700 focus:border-[var(--primary-color)]'
                } focus:outline-none`}
                placeholder="Type your message..."
              />
              <button 
                type="submit"
                className="bg-[var(--primary-color)] text-white p-2 rounded-r-lg hover:bg-[#0077b3] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default LiveChat;
