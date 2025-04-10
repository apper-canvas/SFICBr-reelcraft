import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Image, Clock, Trash2, Plus, Check, X, AlertCircle } from 'lucide-react'

const MainFeature = () => {
  const [uploadedImages, setUploadedImages] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [imageDurations, setImageDurations] = useState({})
  const fileInputRef = useRef(null)
  
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return
    
    setIsUploading(true)
    setUploadError(null)
    
    // Simulate upload delay
    setTimeout(() => {
      try {
        const newImages = files.map(file => {
          // Validate file type
          if (!file.type.startsWith('image/')) {
            throw new Error(`${file.name} is not an image file`)
          }
          
          // Create object URL for preview
          const imageUrl = URL.createObjectURL(file)
          
          return {
            id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: file.name,
            url: imageUrl,
            size: file.size
          }
        })
        
        // Add default durations for new images
        const newDurations = {}
        newImages.forEach(img => {
          newDurations[img.id] = 3.0 // Default 3 seconds
        })
        
        setUploadedImages(prev => [...prev, ...newImages])
        setImageDurations(prev => ({ ...prev, ...newDurations }))
        setIsUploading(false)
      } catch (error) {
        setUploadError(error.message)
        setIsUploading(false)
      }
    }, 1000)
  }
  
  const handleRemoveImage = (id) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id))
    
    // Also remove duration
    setImageDurations(prev => {
      const newDurations = { ...prev }
      delete newDurations[id]
      return newDurations
    })
  }
  
  const handleDurationChange = (id, value) => {
    setImageDurations(prev => ({
      ...prev,
      [id]: parseFloat(value)
    }))
  }
  
  const getTotalDuration = () => {
    return Object.values(imageDurations).reduce((sum, duration) => sum + duration, 0)
  }
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium">Upload Images</h3>
        
        <motion.div 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="border-2 border-dashed border-surface-300 dark:border-surface-600 rounded-xl p-6 text-center cursor-pointer hover:border-primary dark:hover:border-primary-light transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            accept="image/*" 
            multiple 
            onChange={handleFileChange}
          />
          
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-100 dark:bg-surface-700 flex items-center justify-center">
            <Upload size={24} className="text-primary dark:text-primary-light" />
          </div>
          
          <h4 className="font-medium mb-1">Drop images here</h4>
          <p className="text-sm text-surface-500 mb-2">or click to browse</p>
          <p className="text-xs text-surface-400">Supports: JPG, PNG, WEBP</p>
        </motion.div>
        
        <AnimatePresence>
          {isUploading && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-surface-100 dark:bg-surface-700 rounded-lg p-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                <span className="text-sm">Uploading images...</span>
              </div>
            </motion.div>
          )}
          
          {uploadError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg p-3 flex items-start gap-2"
            >
              <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Upload Error</p>
                <p className="text-xs">{uploadError}</p>
              </div>
              <button 
                className="ml-auto"
                onClick={() => setUploadError(null)}
              >
                <X size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {uploadedImages.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Image Sequence</h3>
            <div className="flex items-center gap-1 text-xs bg-surface-100 dark:bg-surface-700 px-2 py-1 rounded-full">
              <Clock size={14} />
              <span>{getTotalDuration().toFixed(1)}s</span>
            </div>
          </div>
          
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
            <AnimatePresence>
              {uploadedImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-surface-100 dark:bg-surface-700 rounded-lg p-3 flex gap-3"
                >
                  <div className="w-16 h-16 rounded-lg bg-surface-200 dark:bg-surface-600 overflow-hidden flex-shrink-0">
                    <img 
                      src={image.url} 
                      alt={image.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="truncate">
                        <p className="text-sm font-medium truncate">{image.name}</p>
                        <p className="text-xs text-surface-500">
                          {(image.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      
                      <div className="flex gap-1 ml-2">
                        <button 
                          onClick={() => handleRemoveImage(image.id)}
                          className="p-1.5 hover:bg-surface-200 dark:hover:bg-surface-600 rounded-full"
                        >
                          <Trash2 size={16} className="text-surface-500 hover:text-red-500" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex items-center gap-2">
                      <label className="text-xs text-surface-500">Duration:</label>
                      <input
                        type="range"
                        min="0.5"
                        max="10"
                        step="0.1"
                        value={imageDurations[image.id] || 3.0}
                        onChange={(e) => handleDurationChange(image.id, e.target.value)}
                        className="flex-grow h-1.5 bg-surface-300 dark:bg-surface-600 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                      />
                      <span className="text-xs font-medium w-8 text-right">
                        {imageDurations[image.id]?.toFixed(1)}s
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium flex items-center justify-center gap-2"
            >
              <span>Create Video</span>
            </motion.button>
          </div>
        </div>
      )}
      
      {uploadedImages.length === 0 && !isUploading && (
        <div className="bg-surface-100 dark:bg-surface-700 rounded-lg p-4 text-center">
          <Image size={24} className="mx-auto mb-2 text-surface-400" />
          <p className="text-sm text-surface-500">No images uploaded yet</p>
          <p className="text-xs text-surface-400 mt-1">Upload images to create your video</p>
        </div>
      )}
    </div>
  )
}

export default MainFeature