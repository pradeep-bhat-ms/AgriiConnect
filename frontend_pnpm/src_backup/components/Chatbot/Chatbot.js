import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! I am your Farmer Assistant. How can I help you today?", isBot: true }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
        setInput('');

        // Simple keyword matching for demo
        setTimeout(() => {
            let botReply = "I'm still learning, but I'm here to help! Could you provide more details?";
            const lowerInput = userMessage.toLowerCase();

            if (lowerInput.includes('crop suggestion') || lowerInput.includes('what to grow')) {
                botReply = "For current weather conditions, you might want to consider short-duration crops like vegetables or legumes.";
            } else if (lowerInput.includes('fertilizer') || lowerInput.includes('compost')) {
                botReply = "Organic compost is great for long-term soil health. For immediate nutrient boosts, consider balanced NPK fertilizers depending on your soil test.";
            } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
                botReply = "Hi there! Feel free to ask me about crop suggestions, fertilizers, or agriculture tips.";
            } else if (lowerInput.includes('disease') || lowerInput.includes('pest')) {
                botReply = "To manage pests, integrated pest management (IPM) is recommended. Try Neem oil for organic farming!";
            }

            setMessages(prev => [...prev, { text: botReply, isBot: true }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="bg-white rounded-lg shadow-2xl w-80 sm:w-96 overflow-hidden mb-4 border border-gray-200"
                    >
                        {/* Header */}
                        <div className="bg-primary text-white p-4 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <FaRobot className="text-xl text-accent" />
                                <h3 className="font-semibold text-lg">Farmer Assistant</h3>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:text-red-400 transition-colors"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div className="h-80 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3 scrollbar-hide">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`max-w-[80%] p-3 rounded-lg text-sm shadow-sm ${msg.isBot
                                            ? 'bg-white text-gray-800 self-start border border-gray-100'
                                            : 'bg-secondary text-white self-end'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your question..."
                                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                            <button
                                type="submit"
                                className="bg-secondary text-white p-2 rounded-full hover:bg-green-700 transition-colors flex items-center justify-center w-10 h-10"
                            >
                                <FaPaperPlane />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${isOpen ? 'bg-red-500 text-white' : 'bg-primary text-white'
                    }`}
            >
                {isOpen ? <FaTimes className="text-2xl" /> : <FaRobot className="text-2xl text-accent" />}
            </motion.button>
        </div>
    );
};

export default Chatbot;
