import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check } from 'lucide-react';

const EmailPopup = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="fixed bottom-8 right-8 z-50"
                >
                    <div className="bg-white rounded-lg shadow-2xl p-4 border border-green-100 flex items-center space-x-4 max-w-sm">
                        <div className="bg-green-100 p-2 rounded-full">
                            <Mail className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">Results Emailed!</h4>
                            <p className="text-sm text-gray-500">Check your inbox for the detailed report.</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <Check className="h-5 w-5" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EmailPopup;
