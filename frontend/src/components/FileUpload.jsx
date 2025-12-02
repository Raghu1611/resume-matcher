import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FileUpload = ({ file, setFile }) => {
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            setFile(acceptedFiles[0]);
        }
    }, [setFile]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
        },
        maxFiles: 1,
        multiple: false,
    });

    const removeFile = (e) => {
        e.stopPropagation();
        setFile(null);
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Resume (PDF)
            </label>

            <div
                {...getRootProps()}
                className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 cursor-pointer
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50'}
          ${file ? 'bg-green-50 border-green-200' : ''}
        `}
            >
                <input {...getInputProps()} />

                <AnimatePresence mode="wait">
                    {!file ? (
                        <motion.div
                            key="upload-placeholder"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center text-center"
                        >
                            <div className="bg-primary/10 p-4 rounded-full mb-4">
                                <UploadCloud className="h-8 w-8 text-primary" />
                            </div>
                            <p className="text-lg font-medium text-gray-900">
                                {isDragActive ? 'Drop your resume here' : 'Click or drag to upload'}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">PDF files only (max 5MB)</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="file-preview"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-green-100"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="bg-red-100 p-2 rounded-lg">
                                    <FileText className="h-6 w-6 text-red-500" />
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-gray-900 truncate max-w-[200px]">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={removeFile}
                                className="p-1 hover:bg-red-50 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default FileUpload;
