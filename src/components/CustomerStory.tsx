import React, { useState } from 'react';
import { CustomerStoryConfig } from '../types';
import { Check, X, ArrowRight, Video, MapPin } from 'lucide-react';

interface CustomerStoryProps {
  story: CustomerStoryConfig;
  onOpenMedoraCaseStudy: () => void;
}

export const CustomerStory: React.FC<CustomerStoryProps> = ({
  story,
  onOpenMedoraCaseStudy,
}) => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedTime, setSelectedTime] = useState(1);

  return (
    <section className="py-16 md:py-24 bg-[#e4f4f1] border-b border-[#d5dae3]">
      <div className="w-[min(1280px,100%-48px)] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        {/* Left Interactive Booking Mockup */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 min-h-[420px] flex items-center justify-center relative overflow-hidden shadow-2xl border border-teal-100">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#cdeee8] opacity-60 pointer-events-none" />

          {/* Floating Toast */}
          <div className="absolute top-5 right-5 bg-[#141821] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg z-10 animate-pulse">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2ee6c4]" />
            <span>Visit confirmed in 42s</span>
          </div>

          {/* Booking Card UI */}
          <div className="relative z-10 bg-white border border-[#dfe5ea] rounded-2xl p-5 sm:p-6 w-full max-w-[340px] shadow-lg space-y-4">
            <h4 className="font-bold text-base text-[#141821]">Book a visit</h4>

            {/* Days Selector */}
            <div className="grid grid-cols-5 gap-1.5 text-center">
              {[
                { day: 'Mon', date: '14' },
                { day: 'Tue', date: '15' },
                { day: 'Wed', date: '16' },
                { day: 'Thu', date: '17' },
                { day: 'Fri', date: '18' },
              ].map((d, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedDay(i)}
                  className={`p-2 rounded-lg text-xs font-bold transition-colors ${
                    selectedDay === i
                      ? 'bg-[var(--teal)] text-white shadow-xs'
                      : 'bg-[#f1f3f7] text-[#6a7284] hover:bg-gray-200'
                  }`}
                >
                  <span className="block text-[0.7rem]">{d.day}</span>
                  <b className="block text-sm font-bold">{d.date}</b>
                </button>
              ))}
            </div>

            {/* Doctors List */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-3 p-2 rounded-lg border border-gray-100 bg-[#fbfdfd]">
                <div className="w-9 h-9 rounded-full bg-[#b8e6df] flex items-center justify-center text-[#0a7a6e] font-bold text-xs">
                  MN
                </div>
                <div className="flex-1 min-w-0">
                  <b className="block text-xs font-bold text-[#141821]">Dr. Meera Nair</b>
                  <small className="block text-[0.7rem] text-[#6a7284]">General physician</small>
                </div>
                <span className="flex items-center gap-1 text-[0.68rem] font-bold text-[#087a6d] bg-[#e4f8f4] px-2 py-0.5 rounded-full">
                  <Video className="w-2.5 h-2.5" /> Video
                </span>
              </div>

              <div className="flex items-center gap-3 p-2 rounded-lg border border-gray-100">
                <div className="w-9 h-9 rounded-full bg-[#dde1e8] flex items-center justify-center text-[#545c6d] font-bold text-xs">
                  AI
                </div>
                <div className="flex-1 min-w-0">
                  <b className="block text-xs font-bold text-[#141821]">Dr. Arun Iyer</b>
                  <small className="block text-[0.7rem] text-[#6a7284]">Dermatologist</small>
                </div>
                <span className="flex items-center gap-1 text-[0.68rem] font-bold text-[#545c6d] bg-gray-100 px-2 py-0.5 rounded-full">
                  <MapPin className="w-2.5 h-2.5" /> Clinic
                </span>
              </div>
            </div>

            {/* Time slots */}
            <div className="flex gap-2">
              {['09:30', '10:00', '10:30'].map((time, idx) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(idx)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                    selectedTime === idx
                      ? 'bg-[#e4f8f4] border-[var(--teal)] text-[#087a6d]'
                      : 'border-[#dfe5ea] text-[#545c6d]'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="w-full py-2.5 rounded-lg font-bold text-xs text-white bg-[var(--teal)] hover:opacity-90 transition-opacity"
            >
              Confirm booking
            </button>
          </div>
        </div>

        {/* Right Story Text & Metrics */}
        <div className="space-y-6">
          <small className="font-bold text-xs uppercase tracking-widest text-[#0a5f56]">
            {story.badge}
          </small>

          <blockquote
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#141821] leading-tight"
            style={{ fontFamily: 'var(--font-d)' }}
          >
            &ldquo;{story.quote}&rdquo;
          </blockquote>

          <div>
            <b className="block text-base font-bold text-[#141821]">{story.author}</b>
            <span className="text-sm text-[#33504c]">
              {story.role}, {story.company}
            </span>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-teal-800/20">
            {story.metrics.map(([value, label], idx) => (
              <div key={idx}>
                <b
                  className="block text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#141821]"
                  style={{ fontFamily: 'var(--font-d)' }}
                >
                  {value}
                </b>
                <span className="text-xs sm:text-sm text-[#33504c] mt-0.5 block leading-snug">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onOpenMedoraCaseStudy}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm bg-[#141821] text-white hover:bg-black transition-colors"
            >
              <span>Read the full case study</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
