import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Grid3X3, List } from 'lucide-react';
import { useGallery } from '../hooks/useGallery';
import { deleteCreation, toggleFavorite } from '../utils/storageManager';
import { useToast } from '../context/ToastContext';
import { soundManager } from '../utils/soundManager';

import CreationCard from '../components/gallery/CreationCard';
import FilterTabs from '../components/gallery/FilterTabs';
import CreationViewer from '../components/gallery/CreationViewer';

const Gallery = () => {
  const {
    creations,
    filter,
    setFilter,
    search,
    setSearch,
    sort,
    setSort,
    favorites
  } = useGallery();

  const { showToast } = useToast();
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const handleDelete = (id) => {
    if (deleteCreation(id)) {
      showToast("🗑️ Artwork moved to trash");
      soundManager.play('trash');
    }
  };

  const handleToggleFav = (id) => {
    toggleFavorite(id);
    soundManager.play('click');
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-16 text-center">
        <h2 className="text-6xl font-black text-gray-900 mb-4 tracking-tighter uppercase">
          Archive <span className="text-amber-500">Center</span>
        </h2>
        <p className="text-gray-500 font-bold italic border-l-4 border-amber-400 pl-4 inline-block">
          Managing {creations.length} digital masterpieces in storage
        </p>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12">
         <div className="flex-1 relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors" size={20} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or emoji..."
              className="w-full pl-16 pr-6 py-5 bg-white rounded-3xl shadow-skeuo-raised border-2 border-white focus:border-amber-400 focus:ring-0 transition-all font-bold text-gray-700"
            />
         </div>

         <div className="flex gap-4">
            <div className="relative">
              <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="pl-12 pr-10 py-5 bg-white rounded-3xl shadow-skeuo-raised border-2 border-white focus:border-amber-400 focus:ring-0 transition-all font-bold text-gray-700 appearance-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="alphabetical">A - Z</option>
              </select>
            </div>

            <div className="flex p-2 bg-gray-100 rounded-3xl shadow-inner border-2 border-gray-200">
               <button
                 onClick={() => setViewMode('grid')}
                 className={`p-3 rounded-2xl transition-all ${viewMode === 'grid' ? 'bg-white shadow-lg text-amber-500' : 'text-gray-400'}`}
               >
                 <Grid3X3 size={20} />
               </button>
               <button
                 onClick={() => setViewMode('list')}
                 className={`p-3 rounded-2xl transition-all ${viewMode === 'list' ? 'bg-white shadow-lg text-amber-500' : 'text-gray-400'}`}
               >
                 <List size={20} />
               </button>
            </div>
         </div>
      </div>

      <FilterTabs activeFilter={filter} setFilter={setFilter} />

      {creations.length > 0 ? (
        <motion.div
          layout
          className={`grid gap-12 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}
        >
          <AnimatePresence mode="popLayout">
            {creations.map((item) => (
              <CreationCard
                key={item.id}
                item={item}
                isFavorite={favorites.includes(item.id)}
                onDelete={handleDelete}
                onView={() => setSelectedItem(item)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-32">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block p-12 bg-white rounded-[4rem] shadow-skeuo-raised border-2 border-white mb-8"
          >
            <div className="text-9xl mb-4 grayscale opacity-20">🖼️</div>
          </motion.div>
          <h3 className="text-2xl font-black text-gray-300 uppercase tracking-widest">
            {search ? 'No matches found' : 'Your emoji universe is waiting 🌎'}
          </h3>
          <p className="text-gray-400 font-bold mt-2">Start creating to fill your archive</p>
        </div>
      )}

      {/* Viewer Modal */}
      <AnimatePresence>
        {selectedItem && (
          <CreationViewer
            item={selectedItem}
            isFavorite={favorites.includes(selectedItem.id)}
            onClose={() => setSelectedItem(null)}
            onToggleFavorite={handleToggleFav}
            onDelete={handleDelete}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
