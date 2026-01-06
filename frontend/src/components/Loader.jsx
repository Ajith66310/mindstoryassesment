import React from 'react';
import { Loader2 } from 'lucide-react'; 

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-white/50">
      <div className="relative">
        {/* Main Spinner */}
        <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
        
        {/* Decorative Pulse Ring */}
        <div className="absolute inset-0 w-12 h-12 border-4 border-green-100 rounded-full"></div>
      </div>
      
      <p className="mt-4 text-gray-600 font-medium tracking-wide animate-pulse">
        Loading Products...
      </p>
    </div>
  );
};

export default Loader;