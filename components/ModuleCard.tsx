import React, { useState } from 'react';
import { Boxes, ChevronDown } from "lucide-react";

const ModuleCard = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-80 rounded-lg border border-gray-200 bg-white shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-3.5 font-medium text-gray-800 hover:bg-gray-50 active:bg-gray-100 transition"
      >
        <div className="flex items-center gap-3">
          <Boxes className="text-blue-600" size={22} />
          <span>Temp</span>
        </div>
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <div className={`transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="py-1">
          <div className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer text-gray-700">
            Temp
          </div>
          <div className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer text-gray-700">
            Temp
          </div>
          <div className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer text-gray-700">
            Temp
          </div>
          <div className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer text-gray-700">
            Temp
          </div>
          <div className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer text-gray-700">
           Temp
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;