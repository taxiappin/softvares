import React, { useState, useEffect, useMemo } from 'react';
import { ContactConfig } from '../types';
import {
  Mail,
  Clock,
  Check,
  Copy,
  ExternalLink,
  MessageCircle,
  QrCode,
  Sparkles,
  Smartphone,
  PhoneCall,
  RotateCcw,
} from 'lucide-react';

interface ContactSectionProps {
  contact: ContactConfig;
  prefilledMessage?: string;
  onClearPrefill?: () => void;
}

const QUICK_TOPICS = [
  '🚀 Build a custom web or mobile app',
  '🤖 Add AI models & smart automation',
  '☁️ Cloud platform & DevOps migration',
  '📅 Book a 30-min discovery call',
];

export const ContactSection: React.FC<ContactSectionProps> = ({
  contact,
  prefilledMessage,
  onClearPrefill,
}) => {
  const [customMessage, setCustomMessage] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [activeTab, setActiveTab] = useState<'scan' | 'message'>('scan');

  // Sync incoming prefilled brief
  useEffect(() => {
    if (prefilledMessage) {
      setCustomMessage(prefilledMessage);
    }
  }, [prefilledMessage]);

  const rawPhone = useMemo(() => {
    const raw = contact.whatsappNumber || '+919100850500';
    return raw.replace(/[^0-9]/g, '');
  }, [contact.whatsappNumber]);

  const displayPhone = contact.whatsappDisplayNumber || contact.whatsappNumber || '+91 9100850500';

  const activeMessage = useMemo(() => {
    if (customMessage.trim()) return customMessage.trim();
    if (contact.whatsappWelcomeMessage?.trim()) return contact.whatsappWelcomeMessage.trim();
    return 'Hi Softvares team, I would like to discuss an engineering project with you.';
  }, [customMessage, contact.whatsappWelcomeMessage]);

  const whatsappUrl = useMemo(() => {
    const encoded = encodeURIComponent(activeMessage);
    return `https://wa.me/${rawPhone}?text=${encoded}`;
  }, [rawPhone, activeMessage]);

  const qrCodeUrl = useMemo(() => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
      whatsappUrl
    )}&margin=10&color=14-24-33`;
  }, [whatsappUrl]);

  const handleOpenWhatsApp = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(whatsappUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    } catch {
      // Fallback
    }
  };

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(displayPhone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2200);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="w-[min(1280px,100%-48px)] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
        {/* Left Column: Direct Contact Context & Working Process */}
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Instant WhatsApp Consultation</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#141821]"
              style={{ fontFamily: 'var(--font-d)' }}
            >
              {contact.title}
            </h2>
            <p className="text-[#545c6d] text-base sm:text-lg mt-3 leading-relaxed">
              Connect directly with our engineering team on WhatsApp. Scan the QR code or click below to launch the conversation instantly.
            </p>
          </div>

          {/* 3 Steps */}
          <ol className="space-y-5">
            <li className="flex gap-4 items-start">
              <span className="w-9 h-9 rounded-full bg-[#141821] text-white flex-shrink-0 grid place-items-center font-bold text-sm font-['Bricolage_Grotesque']">
                1
              </span>
              <div>
                <b className="block text-base font-bold text-[#141821]">Scan or Click to Chat</b>
                <span className="text-sm text-[#545c6d] leading-relaxed mt-0.5 block">
                  Scan the QR code with your mobile camera or click the direct button to launch WhatsApp immediately.
                </span>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <span className="w-9 h-9 rounded-full bg-[#141821] text-white flex-shrink-0 grid place-items-center font-bold text-sm font-['Bricolage_Grotesque']">
                2
              </span>
              <div>
                <b className="block text-base font-bold text-[#141821]">Share Your Project Goals</b>
                <span className="text-sm text-[#545c6d] leading-relaxed mt-0.5 block">
                  Chat directly with our senior developers and tech leads without sales gatekeepers or tedious back-and-forth forms.
                </span>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <span className="w-9 h-9 rounded-full bg-[#141821] text-white flex-shrink-0 grid place-items-center font-bold text-sm font-['Bricolage_Grotesque']">
                3
              </span>
              <div>
                <b className="block text-base font-bold text-[#141821]">Receive Scope & Plan</b>
                <span className="text-sm text-[#545c6d] leading-relaxed mt-0.5 block">
                  Get initial architecture insights, realistic budget tiers, and a free 30-minute discovery session within one working day.
                </span>
              </div>
            </li>
          </ol>

          {/* Direct Contact Details Card */}
          <div className="p-5 rounded-2xl bg-[#f5f6f8] border border-[#d5dae3] space-y-3.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-xs uppercase font-bold tracking-wider text-[#545c6d]">
                WhatsApp Direct Line
              </span>
              <button
                onClick={handleCopyPhone}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--cobalt)] hover:underline"
              >
                {copiedPhone ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy number</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white grid place-items-center flex-shrink-0 shadow-xs">
                <MessageCircle className="w-5 h-5 fill-current" />
              </div>
              <div>
                <a
                  href={`tel:${rawPhone}`}
                  className="font-bold text-lg text-[#141821] hover:text-[var(--cobalt)] transition-colors tracking-tight block"
                >
                  {displayPhone}
                </a>
                <span className="text-xs text-[#545c6d]">
                  Click to call or chat directly on WhatsApp
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#d5dae3]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#545c6d]">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[var(--cobalt)]" />
                <a
                  href={`mailto:${contact.email}`}
                  className="text-[#141821] font-semibold hover:underline"
                >
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{contact.workingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive WhatsApp Connect & QR Scanner Card */}
        <div className="bg-white border-2 border-[#141821]/10 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          {/* Card Top Brand Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#d5dae3]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white grid place-items-center shadow-md">
                <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-[#141821]">WhatsApp Direct Chat</h3>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[0.68rem] font-bold bg-emerald-100 text-emerald-800">
                    Official
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#545c6d]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Senior engineering team online</span>
                </div>
              </div>
            </div>

            {/* Quick view toggle */}
            <div className="hidden sm:flex bg-[#f1f3f7] p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('scan')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'scan'
                    ? 'bg-white text-[#141821] shadow-xs'
                    : 'text-[#545c6d] hover:text-[#141821]'
                }`}
              >
                Scan QR
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('message')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'message'
                    ? 'bg-white text-[#141821] shadow-xs'
                    : 'text-[#545c6d] hover:text-[#141821]'
                }`}
              >
                Customize Text
              </button>
            </div>
          </div>

          {/* Primary Action Button: 1-Click WhatsApp Redirect */}
          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={handleOpenWhatsApp}
              className="w-full py-4 px-6 rounded-2xl font-bold text-base sm:text-lg text-white bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.99] transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center gap-3 group"
            >
              <MessageCircle className="w-6 h-6 fill-white text-[#25D366] group-hover:rotate-12 transition-transform" />
              <span>Chat on WhatsApp Directly</span>
              <ExternalLink className="w-5 h-5 ml-1 opacity-90" />
            </button>

            <div className="flex items-center justify-between text-xs text-[#545c6d] px-1">
              <span>Redirects to secure WhatsApp chat</span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1 text-[var(--cobalt)] font-semibold hover:underline"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Link copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy chat link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* QR Code Presentation Box */}
          <div className="mt-6 bg-[#f8f9fc] border border-[#d5dae3] rounded-2xl p-5 sm:p-6 text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#141821] uppercase tracking-wider mb-3">
              <QrCode className="w-4 h-4 text-[#25D366]" />
              <span>Scan to Chat on Mobile Phone</span>
            </div>

            <div className="inline-block p-3.5 bg-white rounded-2xl border-2 border-[#141821]/10 shadow-md relative group">
              <img
                src={qrCodeUrl}
                alt="WhatsApp Chat QR Code"
                width={200}
                height={200}
                className="w-44 h-44 sm:w-52 sm:h-52 object-contain mx-auto transition-transform group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 pointer-events-none border-2 border-emerald-500/0 group-hover:border-emerald-500/40 rounded-2xl transition-colors" />
            </div>

            <p className="text-xs text-[#545c6d] mt-3 leading-relaxed max-w-sm mx-auto">
              Point your phone's camera at the QR code to open the WhatsApp chat instantly on your mobile device.
            </p>
          </div>

          {/* Quick Starter Topics & Message Draft Box */}
          <div className="mt-6 pt-5 border-t border-[#d5dae3] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#141821] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Pre-filled opening message</span>
              </span>
              {customMessage && (
                <button
                  type="button"
                  onClick={() => {
                    setCustomMessage('');
                    if (onClearPrefill) onClearPrefill();
                  }}
                  className="text-xs text-[#545c6d] hover:text-[#141821] inline-flex items-center gap-1 underline"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset message</span>
                </button>
              )}
            </div>

            {/* Quick starter chips */}
            <div className="flex flex-wrap gap-1.5">
              {QUICK_TOPICS.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setCustomMessage(`Hi Softvares team, I would like to enquire about: ${topic.replace(/^[^\w\s]+/, '').trim()}`)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-[#f1f3f7] hover:bg-[#e4e7ee] text-[#141821] font-medium transition-colors border border-transparent hover:border-[#cbd2de]"
                >
                  {topic}
                </button>
              ))}
            </div>

            {/* Editable textarea so user can tweak their message before hitting chat */}
            <textarea
              rows={2}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder={contact.whatsappWelcomeMessage || 'Type your message or project requirements here...'}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#d5dae3] text-xs sm:text-sm text-[#141821] bg-white transition-all focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366]"
            />
          </div>

          {/* Bottom Security / Trust Notice */}
          <div className="mt-4 pt-3 flex items-center justify-center gap-4 text-[0.72rem] text-[#717b8f]">
            <span className="flex items-center gap-1">
              <Smartphone className="w-3 h-3 text-emerald-600" />
              <span>Works on iOS, Android & Desktop Web</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-[var(--cobalt)]" />
              <span>No spam guaranteed</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
