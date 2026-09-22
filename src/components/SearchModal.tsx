import React, { useState, useEffect, useRef } from 'react';
import { SiteData } from '../types';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: SiteData;
  onSelectService: (serviceId: string) => void;
  onSelectProject: (projectId: string) => void;
}

interface SearchItem {
  group: 'Services' | 'Projects' | 'Industries' | 'Pages';
  title: string;
  description: string;
  color: string;
  action: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  data,
  onSelectService,
  onSelectProject,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Global hotkeys (Cmd+K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(
        (document.activeElement as HTMLElement)?.tagName
      );
      if ((e.key === '/' && !isTyping) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        if (!isOpen) {
          // Trigger open via custom event or parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Build searchable index
  const index: SearchItem[] = [
    ...data.services.items.map((s) => ({
      group: 'Services' as const,
      title: s.name,
      description: s.short,
      color: 'var(--cobalt)',
      action: () => {
        onSelectService(s.id);
        onClose();
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
      },
    })),
    ...data.work.items.map((p) => ({
      group: 'Projects' as const,
      title: p.name,
      description: p.tagline,
      color: p.accentColor,
      action: () => {
        onSelectProject(p.id);
        onClose();
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
      },
    })),
    ...data.industries.items.map((ind) => ({
      group: 'Industries' as const,
      title: ind.title,
      description: ind.description,
      color: 'var(--teal)',
      action: () => {
        onClose();
        document.getElementById('industries')?.scrollIntoView({ behavior: 'smooth' });
      },
    })),
    {
      group: 'Pages' as const,
      title: 'Project planner',
      description: 'Estimate budget and timeline for your product',
      color: '#141821',
      action: () => {
        onClose();
        document.getElementById('estimate')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      group: 'Pages' as const,
      title: 'How we work',
      description: 'Our five-stage process and engagement models',
      color: '#141821',
      action: () => {
        onClose();
        document.getElementById('approach')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      group: 'Pages' as const,
      title: 'Contact us',
      description: 'Send a project brief and schedule a call',
      color: 'var(--cobalt)',
      action: () => {
        onClose();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
  ];

  const q = query.trim().toLowerCase();
  const results = q
    ? index.filter((item) =>
        (item.title + ' ' + item.description + ' ' + item.group).toLowerCase().includes(q)
      )
    : index.slice(0, 8);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        results[selectedIndex].action();
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-[#d5dae3]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-[#d5dae3]">
          <Search className="w-5 h-5 text-[#545c6d]" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search services, projects, industries, and pricing..."
            className="flex-1 bg-transparent text-base text-[#141821] placeholder-[#7c8497] focus:outline-none"
          />
          <kbd className="px-2 py-0.5 rounded border border-[#d5dae3] text-xs font-mono text-[#545c6d]">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 grid place-items-center text-[#545c6d]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <ul className="max-h-[60vh] overflow-y-auto p-3 divide-y divide-gray-50">
          {results.length === 0 ? (
            <li className="p-8 text-center text-sm text-[#545c6d]">
              No results found for &ldquo;{query}&rdquo;. Try searching for &ldquo;web&rdquo;, &ldquo;mobile&rdquo;, &ldquo;AI&rdquo;, or &ldquo;planner&rdquo;.
            </li>
          ) : (
            results.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <li key={idx} className="py-0.5">
                  <button
                    onClick={item.action}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full text-left p-3 rounded-xl flex items-center justify-between gap-4 transition-colors ${
                      isSelected ? 'bg-[#eceef2]' : 'hover:bg-[#f5f6f8]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span
                        className="w-8 h-8 rounded-lg flex-shrink-0 grid place-items-center text-white"
                        style={{ backgroundColor: item.color }}
                      >
                        <span className="w-2.5 h-2.5 rounded-xs bg-white" />
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <b className="text-sm font-bold text-[#141821] truncate">
                            {item.title}
                          </b>
                          <span className="text-[0.68rem] uppercase font-bold text-[#7c8497] px-1.5 py-0.2 rounded bg-white/70 border border-gray-200">
                            {item.group}
                          </span>
                        </div>
                        <p className="text-xs text-[#545c6d] truncate">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 text-[var(--cobalt)] transition-transform ${
                        isSelected ? 'translate-x-1 opacity-100' : 'opacity-0'
                      }`}
                    />
                  </button>
                </li>
              );
            })
          )}
        </ul>

        {/* Bottom hotkey footer */}
        <div className="bg-[#f5f6f8] px-4 py-2 text-xs text-[#7c8497] flex justify-between items-center border-t border-[#d5dae3]">
          <span>Use &uarr; &darr; to navigate, Enter to select</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
