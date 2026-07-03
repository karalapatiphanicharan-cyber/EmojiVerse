import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Image as ImageIcon } from 'lucide-react';

const ImageUploader = ({ onUpload, currentImage }) => {
  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) onUpload(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onUpload(file);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-black text-gray-700 uppercase tracking-widest px-2 flex items-center gap-2">
        <Camera size={16} /> Image Scanner
      </h3>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[32px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

        <label className="relative flex flex-col items-center justify-center w-full aspect-square bg-white border-4 border-dashed border-gray-200 rounded-[32px] cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all shadow-skeuo-inner overflow-hidden">
          {currentImage ? (
            <div className="relative w-full h-full p-4">
              <img
                src={currentImage}
                alt="Preview"
                className="w-full h-full object-contain rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity rounded-2xl">
                <p className="text-white font-bold flex items-center gap-2">
                  <Upload size={20} /> Change Photo
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 shadow-skeuo-raised text-gray-400 group-hover:text-blue-500 group-hover:scale-110 transition-all">
                <Camera size={40} strokeWidth={1.5} />
              </div>
              <p className="mb-2 text-sm text-gray-500 font-bold">
                Drop your image here
              </p>
              <p className="text-xs text-gray-400 font-medium">
                or click to browse
              </p>
            </div>
          )}
          <input type="file" className="hidden" accept="image/*" onChange={onFileChange} />
        </label>
      </div>

      <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex gap-3 items-start">
        <div className="p-2 bg-amber-100 rounded-lg text-amber-600 mt-1">
          <ImageIcon size={16} />
        </div>
        <p className="text-[10px] leading-relaxed text-amber-800 font-medium">
          PRO TIP: High-contrast photos work best for emoji conversions. Landscapes and clear logos produce amazing results!
        </p>
      </div>
    </div>
  );
};

export default ImageUploader;
