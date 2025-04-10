import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Download, Upload, Layers, Music, Image, Sparkles } from 'lucide-react'
import MainFeature from '../components/MainFeature'

const Home = () => {
  const [activeTab, setActiveTab] = useState('create')
  
  const tabs = [
    { id: 'create', label: 'Create', icon: <Layers size={18} /> },
    { id: 'media', label: 'Media', icon: <Image size={18} /> },
    { id: 'effects', label: 'Effects', icon: <Sparkles size={18} /> },
    { id: 'audio', label: 'Audio', icon: <Music size={18} /> },
  ]

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-mesh">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-2/3 bg-white dark:bg-surface-800 rounded-2xl shadow-card overflow-hidden">
              <div className="aspect-video bg-surface-900 flex items-center justify-center relative">
                <div className="text-white text-center">
                  <p className="text-lg">Preview Area</p>
                  <p className="text-sm text-surface-400">Your video will appear here</p>
                </div>
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/20 backdrop-blur-md hover:bg-white/30 p-2 rounded-full"
                  >
                    <Play size={20} className="text-white" />
                  </motion.button>
                  
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/20 backdrop-blur-md hover:bg-white/30 p-2 rounded-full"
                  >
                    <Download size={20} className="text-white" />
                  </motion.button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="timeline-track mb-4">
                  <div className="timeline-item" style={{ left: '10%', width: '20%' }}></div>
                  <div className="timeline-item" style={{ left: '35%', width: '25%' }}></div>
                  <div className="timeline-marker" style={{ left: '25%' }}></div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-surface-500">00:00</span>
                  <span className="text-sm text-surface-500">00:30</span>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/3 bg-white dark:bg-surface-800 rounded-2xl shadow-card overflow-hidden">
              <div className="border-b border-surface-200 dark:border-surface-700">
                <div className="flex">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1.5 py-3 px-4 text-sm font-medium relative flex-1 justify-center
                        ${activeTab === tab.id 
                          ? 'text-primary dark:text-primary-light' 
                          : 'text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200'
                        }`}
                    >
                      {tab.icon}
                      {tab.label}
                      {activeTab === tab.id && (
                        <motion.div 
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary dark:bg-primary-light"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="p-4 h-[calc(100vh-26rem)] overflow-y-auto scrollbar-hide">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === 'create' && (
                      <MainFeature />
                    )}
                    
                    {activeTab === 'media' && (
                      <div className="space-y-4">
                        <h3 className="font-medium">Media Library</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="aspect-square bg-surface-200 dark:bg-surface-700 rounded-lg flex items-center justify-center">
                              <Image size={24} className="text-surface-400" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'effects' && (
                      <div className="space-y-4">
                        <h3 className="font-medium">Effects Gallery</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {['Fade', 'Zoom', 'Blur', 'Glitch', 'Retro', 'Neon'].map(effect => (
                            <div key={effect} className="p-3 bg-surface-100 dark:bg-surface-700 rounded-lg text-center hover:bg-surface-200 dark:hover:bg-surface-600 cursor-pointer transition-colors">
                              <Sparkles size={20} className="mx-auto mb-1 text-primary" />
                              <p className="text-sm">{effect}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'audio' && (
                      <div className="space-y-4">
                        <h3 className="font-medium">Audio Tracks</h3>
                        <div className="space-y-2">
                          {['Upbeat Pop', 'Cinematic', 'Lo-Fi', 'Ambient'].map(track => (
                            <div key={track} className="p-3 bg-surface-100 dark:bg-surface-700 rounded-lg flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Play size={16} className="text-primary" />
                                <span className="text-sm">{track}</span>
                              </div>
                              <span className="text-xs text-surface-500">0:30</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home