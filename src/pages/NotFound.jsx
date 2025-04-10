import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-mesh">
      <div className="max-w-md w-full mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-surface-800 rounded-2xl shadow-card p-8 text-center"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full neumorphic-light flex items-center justify-center">
            <span className="text-4xl font-bold text-gradient">404</span>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
          <p className="text-surface-600 dark:text-surface-400 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white flex items-center justify-center gap-2"
              >
                <Home size={18} />
                <span>Go Home</span>
              </motion.button>
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.history.back()}
              className="w-full px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700 flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              <span>Go Back</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound