import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'couple' | 'ceremony' | 'decor';
  categoryLabel: string;
  src: string;
  caption: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'hero',
    title: 'Sushma & Sai Rahul in Royal Silk',
    category: 'couple',
    categoryLabel: 'The Couple',
    src: '/src/assets/images/hero_sushma_sai_rahul_1792860092519.jpg',
    caption: 'Radiant bride Sushma in heirloom crimson Kanjeevaram and groom Sai Rahul in ivory silk bandhgala.'
  },
  {
    id: 'bride',
    title: 'The Radiant Bride Sushma',
    category: 'couple',
    categoryLabel: 'The Couple',
    src: '/src/assets/images/bride_sushma_portrait_1792860093076.jpg',
    caption: 'Sushma adorned in temple gold jewelry and fragrant fresh jasmine (mallepoolu).'
  },
  {
    id: 'groom',
    title: 'Groom Sai Rahul',
    category: 'couple',
    categoryLabel: 'The Couple',
    src: '/src/assets/images/groom_sai_rahul_portrait_1792860093860.jpg',
    caption: 'Sai Rahul in traditional regal ivory sherwani at the heritage palace courtyard.'
  },
  {
    id: 'mandap',
    title: 'Swarna Kalyana Mandapam',
    category: 'decor',
    categoryLabel: 'Decor & Mandap',
    src: '/src/assets/images/sacred_mandap_decor_1792860094506.jpg',
    caption: 'Sacred wedding altar adorned with cascades of golden marigolds, hanging brass bells, and holy Agni.'
  },
  {
    id: 'haldi',
    title: 'Haldi & Floral Urli Festivity',
    category: 'ceremony',
    categoryLabel: 'Ceremonies',
    src: '/src/assets/images/haldi_mehendi_festivity_1792860094441.jpg',
    caption: 'Traditional brass urli with floating marigold flowers, yellow turmeric rituals, and joyful celebration.'
  }
];

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'couple' | 'ceremony' | 'decor'>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(item => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredItems.length);
    }
  };

  const prevPhoto = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-[#FFFDF9] border-t border-[#D4AF37]/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="font-royal text-xs tracking-widest uppercase text-[#AA771C] font-semibold mb-2">
            Captured Memories
          </p>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-[#73151E] font-bold tracking-tight mb-4">
            Cherished Moments &amp; Celebrations
          </h2>
          <p className="text-sm text-[#665342] leading-relaxed">
            A glimpse into the celebrations, royal attire, and sacred spaces leading up to our big day.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {(['all', 'couple', 'ceremony', 'decor'] as const).map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-lg text-xs font-royal font-semibold tracking-wider uppercase transition-all ${
                activeFilter === filter
                  ? 'bg-[#8B1E28] text-white shadow-sm'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {filter === 'all' ? 'All Photos' : filter === 'couple' ? 'Bride & Groom' : filter === 'ceremony' ? 'Rituals' : 'Mandap & Decor'}
            </button>
          ))}
        </div>

        {/* Masonry / Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-stone-100 border border-[#D4AF37]/30 shadow-sm hover:shadow-xl transition-all aspect-[4/3]"
            >
              <img
                src={item.src}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase font-royal tracking-widest text-[#F3E5AB]">
                  {item.categoryLabel}
                </span>
                <h4 className="font-serif-display text-base font-bold text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-stone-300 line-clamp-2">
                  {item.caption}
                </p>
              </div>

              <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            <img
              src={filteredItems[selectedPhotoIndex].src}
              alt={filteredItems[selectedPhotoIndex].title}
              referrerPolicy="no-referrer"
              className="max-h-[70vh] w-auto object-contain rounded-lg shadow-2xl"
            />
            <div className="text-center mt-4 text-white max-w-xl">
              <h3 className="font-serif-display text-lg font-bold text-[#F3E5AB]">
                {filteredItems[selectedPhotoIndex].title}
              </h3>
              <p className="text-xs text-stone-300 mt-1">
                {filteredItems[selectedPhotoIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
