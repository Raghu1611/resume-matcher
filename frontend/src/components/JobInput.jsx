import React from 'react';

const JobInput = ({ value, onChange }) => {
    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description
            </label>
            <div className="relative">
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Paste the job description here..."
                    className="w-full h-48 p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-gray-700 placeholder-gray-400"
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {value.length} characters
                </div>
            </div>
        </div>
    );
};

export default JobInput;
