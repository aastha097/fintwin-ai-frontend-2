'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Upload as UploadIcon,
  FileText,
  X,
  CheckCircle2,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import type { UploadedFile } from '@/lib/types';

interface UploadProps {
  onComplete: () => void;
}

export function Upload({ onComplete }: UploadProps) {
  const { uploadedFiles, addFile, removeFile } = useAppStore();
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileTypes = [
    { id: 'financial_statement', label: 'Financial Statements', accept: '.pdf,.xlsx' },
    { id: 'bank_data', label: 'Bank Data', accept: '.csv,.xlsx' },
    { id: 'tax_return', label: 'Tax Returns', accept: '.pdf' },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const next = prev + Math.random() * 25;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 200);

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newFile: UploadedFile = {
      id: `file-${Date.now()}`,
      name: file.name,
      type: detectFileType(file.name),
      uploadedAt: new Date(),
      size: file.size,
      status: 'completed',
    };

    addFile(newFile);
    setIsUploading(false);
    setUploadProgress(0);
  };

  const detectFileType = (
    filename: string
  ): 'financial_statement' | 'bank_data' | 'tax_return' => {
    if (filename.toLowerCase().includes('tax') || filename.endsWith('.pdf')) {
      return 'tax_return';
    }
    if (filename.toLowerCase().includes('bank')) {
      return 'bank_data';
    }
    return 'financial_statement';
  };

  const canProceed = uploadedFiles.length >= 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/10 to-background p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-3xl font-bold mb-3">Upload Your Financial Data</h1>
          <p className="text-muted-foreground">
            Share your financial documents and let FinTwin AI analyze your wealth
          </p>
        </motion.div>

        {/* File Types Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-3 gap-3 mb-8"
        >
          {fileTypes.map((type) => (
            <div
              key={type.id}
              className="p-3 rounded-lg bg-card/50 border border-border/40 text-center text-sm"
            >
              <FileText className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="font-medium text-xs">{type.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Drop Zone */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative p-12 rounded-2xl border-2 border-dashed transition-all mb-8 ${
            dragActive
              ? 'border-primary bg-primary/5'
              : 'border-border/50 hover:border-primary/50'
          }`}
        >
          <input
            type="file"
            onChange={handleChange}
            disabled={isUploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="text-center pointer-events-none">
            {isUploading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="flex justify-center mb-4"
              >
                <Loader2 className="w-12 h-12 text-primary" />
              </motion.div>
            ) : (
              <UploadIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            )}

            <h3 className="font-semibold mb-1">
              {isUploading ? 'Uploading...' : 'Drag and drop your files here'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isUploading
                ? `${Math.round(uploadProgress)}%`
                : 'or click to browse'}
            </p>

            {isUploading && (
              <div className="w-full bg-input rounded-full h-1 mt-4">
                <motion.div
                  className="bg-primary h-full rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3 mb-8"
          >
            <h3 className="font-semibold text-sm">Uploaded Files</h3>
            {uploadedFiles.map((file, index) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-border/40"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-3">
                  {file.status === 'completed' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring' }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </motion.div>
                  )}
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-1 hover:bg-input rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex gap-4"
        >
          <button className="flex-1 px-6 py-3 rounded-lg border border-border/40 hover:bg-input transition-colors font-medium">
            Cancel
          </button>
          <button
            onClick={onComplete}
            disabled={!canProceed}
            className={`flex-1 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
              canProceed
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            Continue to Analysis
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
