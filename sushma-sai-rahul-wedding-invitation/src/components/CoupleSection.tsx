import React, { useState } from 'react';
import { Heart, Quote, Sparkles, ChevronRight, BookOpen } from 'lucide-react';
import { STORY_MILESTONES, WEDDING_DETAILS } from '../data/weddingData';

export const CoupleSection: React.FC = () => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  return (
    <section id="couple" className="py-20 bg-[#FFFDF9] border-t border-[#D4AF37]/20 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-royal text-xs tracking-widest uppercase text-[#AA771C] font-semibold mb-2">
            The Blessed Union
          </p>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-[#73151E] font-bold tracking-tight mb-4">
            Meet Sushma &amp; Sai Rahul
          </h2>
          <div className="flex items-center justify-center gap-2 text-xs text-[#8C6D58] mb-3">
            <span>Daughter of padmavathi &amp; venkata ramana</span>
            <span aria-hidden="true">·</span>
            <span>Son of lakshmi &amp; satyanarayana</span>
          </div>
          <p className="text-sm text-[#665342] leading-relaxed">
            Bound by values, nurtured by eternal family blessings, and embarking on a lifelong journey of love, friendship, and sacred companionship.
          </p>
        </div>

        {/* Bride & Groom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 mb-20 items-stretch">
          {/* Bride Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D4AF37]/30 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="relative mb-6 rounded-xl overflow-hidden aspect-[3/4] bg-stone-100 shadow-inner group">
                <img
                  src="/src/assets/images/bride_sushma_portrait_1792860093076.jpg"
                  alt="Bride Sushma"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-royal tracking-widest uppercase text-[#F3E5AB] font-semibold block mb-0.5">
                    The Radiant Bride
                  </span>
                  <h3 className="font-royal text-2xl font-bold">
                    Sushma
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#AA771C] font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Daughter of Smt. Padmavathi &amp; Sri Venkata Ramana</span>
                </div>
                <p className="text-sm text-[#5C4D3C] leading-relaxed">
                  Known for her warm smile, compassionate spirit, and deep devotion to family traditions. Sushma brings joy to every space she enters and looks forward to weaving a beautiful lifetime together with Sai Rahul.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100">
              <blockquote className="italic text-xs text-[#8B1E28] font-serif-display leading-relaxed">
                "In Sai Rahul, I found my gentle confidant, my greatest cheerleader, and the companion my heart was always searching for."
              </blockquote>
            </div>
          </div>

          {/* Groom Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D4AF37]/30 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="relative mb-6 rounded-xl overflow-hidden aspect-[3/4] bg-stone-100 shadow-inner group">
                <img
                  src="/src/assets/images/groom_sai_rahul_portrait_1792860093860.jpg"
                  alt="Groom Sai Rahul"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-royal tracking-widest uppercase text-[#F3E5AB] font-semibold block mb-0.5">
                    The Handsome Groom
                  </span>
                  <h3 className="font-royal text-2xl font-bold">
                    Sai Rahul
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#AA771C] font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Son of Smt. Lakshmi &amp; Sri Satyanarayana</span>
                </div>
                <p className="text-sm text-[#5C4D3C] leading-relaxed">
                  Grounded, ambitious, and deeply caring. Sai Rahul values integrity, warmth, and laughter. He considers this union the most sacred milestone and is overjoyed to begin their shared adventure with Sushma.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100">
              <blockquote className="italic text-xs text-[#8B1E28] font-serif-display leading-relaxed">
                "From our first conversation, Sushma's grace and warmth won my heart. I cannot wait to hold her hand at the Sumuhurtham on 12th November."
              </blockquote>
            </div>
          </div>
        </div>

        {/* Story Milestones Section */}
        <div className="bg-[#FAF6EE] rounded-2xl p-6 sm:p-10 border border-[#D4AF37]/30">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="font-script text-2xl text-[#9E1B32] block">
              Our Journey
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#3D291D]">
              How Destiny Wrote Our Story
            </h3>
          </div>

          {/* Interactive milestone navigation tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
            {STORY_MILESTONES.map((milestone, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStoryIndex(idx)}
                className={`px-4 py-2 rounded-lg text-xs font-royal font-semibold tracking-wider uppercase transition-all whitespace-nowrap ${
                  activeStoryIndex === idx
                    ? 'bg-[#8B1E28] text-[#FFF8E7] shadow-sm'
                    : 'bg-white text-[#735F4C] border border-stone-200 hover:bg-stone-50'
                }`}
              >
                {milestone.yearOrPhase}
              </button>
            ))}
          </div>

          {/* Active Milestone Card */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 max-w-3xl mx-auto shadow-sm">
            <div className="flex items-center gap-3 text-xs font-bold text-[#AA771C] uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Chapter {activeStoryIndex + 1}: {STORY_MILESTONES[activeStoryIndex].yearOrPhase}</span>
            </div>
            <h4 className="font-serif-display text-xl sm:text-2xl font-bold text-[#73151E] mb-3">
              {STORY_MILESTONES[activeStoryIndex].title}
            </h4>
            <p className="text-sm sm:text-base text-[#4A3B2C] leading-relaxed mb-4">
              {STORY_MILESTONES[activeStoryIndex].description}
            </p>
            {STORY_MILESTONES[activeStoryIndex].quote && (
              <div className="bg-[#FFFDF9] p-4 rounded-lg border-l-2 border-[#D4AF37] italic text-xs sm:text-sm text-[#8B1E28]">
                {STORY_MILESTONES[activeStoryIndex].quote}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
