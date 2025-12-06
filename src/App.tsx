import { BrowserRouter as Router, useLocation, Link } from 'react-router-dom';
import BackgroundSketch from './components/BackgroundSketch';
import { eras, type EraId } from './data/content';
import { AnimatePresence, motion } from 'framer-motion';
import InfoTooltip from './components/InfoTooltip';

const ContentWrapper = () => {
  const location = useLocation();
  const currentPath = location.pathname.replace('/', '') || 'prologue';
  const activeEra = eras.find(e => e.id === currentPath) || eras[0];

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden font-sans">
      
      {/* 1. Background */}
      <div className="absolute inset-0 z-0">
        <BackgroundSketch activeEra={activeEra.id as EraId} visualMode={activeEra.visualMode} />
      </div>

      {/* 2. Poem Sidebar */}
      <aside className="absolute top-0 left-0 h-full w-full md:w-1/3 z-10 flex flex-col justify-center p-8 bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none">
        <AnimatePresence mode='wait'>
          <motion.div 
            key={activeEra.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.8 }}
            className="pointer-events-auto"
          >
            {/* Era */}
            <h2 className="text-blue-400 text-xs font-bold tracking-[0.2em] mb-2 uppercase">
              {activeEra.year}
            </h2>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-serif mb-6 text-white drop-shadow-lg">
              {activeEra.title.split('—')[0]}
              {activeEra.explanation && <InfoTooltip content={activeEra.explanation} />}
            </h1>
            
            {/* Poem */}
            <div className="space-y-4 text-lg md:text-xl font-serif text-gray-200 leading-relaxed drop-shadow-md w-screen max-w-none">
              {activeEra.poem.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            
            {/* Visual description for the user */}
            <div className="mt-8 text-xs text-gray-500 border-l border-gray-600 pl-3">
              Model: {activeEra.visualMode.replace('-', ' ')}
            </div>
          </motion.div>
        </AnimatePresence>
      </aside>

      {/* Navigation */}
      <nav className="absolute bottom-0 left-0 right-0 z-20 p-6 flex justify-center md:justify-end md:pr-12 bg-gradient-to-t from-black to-transparent">
        <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
          {eras.map(era => (
            <Link 
              key={era.id} 
              to={`/${era.id}`} 
              className={`whitespace-nowrap text-xs uppercase tracking-widest transition-all duration-500
                ${era.id === activeEra.id ? 'text-blue-400 font-bold border-b border-blue-400' : 'text-gray-500 hover:text-white'}
              `}
            >
              {era.title.split(' ')[0]}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default function App() { return <Router><ContentWrapper /></Router>; }