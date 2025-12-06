// src/components/InfoTooltip.tsx
import { HelpCircle } from 'lucide-react';

interface InfoTooltipProps {
  content: string;
}

export default function InfoTooltip({ content }: InfoTooltipProps) {
  return (
    <div className="relative inline-block ml-3 group">
      <HelpCircle className="w-5 h-5 text-gray-500 hover:text-blue-400 transition-colors cursor-help" />
      
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-80 
                      opacity-0 group-hover:opacity-100 pointer-events-none 
                      group-hover:pointer-events-auto transition-opacity duration-300 
                      z-50">
        <div className="bg-gray-900 text-gray-200 text-sm rounded-lg shadow-2xl p-5 border border-gray-700 
                        whitespace-pre-line leading-relaxed">
          {content}
          <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 
                          w-0 h-0 border-l-8 border-r-8 border-t-8 
                          border-l-transparent border-r-transparent border-t-gray-900" />
        </div>
      </div>
    </div>
  );
}