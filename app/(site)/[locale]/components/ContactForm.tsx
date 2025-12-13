'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('contactForm');
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    role: '',
    email: '',
    phone: '',
    region: '',
    message: '',
    honeypot: '', // Spam honeypot field
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    console.log('Submitting form data:', formData);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        data = { success: false, error: 'Invalid response from server' };
      }
      
      console.log('API Response:', response.status, data);

      if (response.ok && data.success) {
        setStatus('success');
        setFormData({
          name: '',
          organization: '',
          role: '',
          email: '',
          phone: '',
          region: '',
          message: '',
          honeypot: '',
        });
      } else {
        console.error('Form submission failed:', data);
        setStatus('error');
      }
    } catch (error) {
      console.error('Form error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-navy mb-6 text-center">{t('title')}</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot field - hidden from users, visible to bots */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          className="absolute left-[-9999px] w-0 h-0 opacity-0"
          aria-hidden="true"
        />
        
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1">
            {t('fields.name')} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder={t('placeholders.name')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent transition-smooth text-base"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="organization" className="block text-sm font-semibold text-slate-700 mb-1">
              {t('fields.organization')} *
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              required
              value={formData.organization}
              onChange={handleChange}
              placeholder={t('placeholders.organization')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent transition-smooth text-base"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-semibold text-slate-700 mb-1">
              {t('fields.role')} *
            </label>
            <input
              type="text"
              id="role"
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
              placeholder={t('placeholders.role')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent transition-smooth text-base"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">
            {t('fields.email')} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder={t('placeholders.email')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent transition-smooth text-base"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1">
              {t('fields.phone')}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t('placeholders.phone')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent transition-smooth text-base"
            />
          </div>

          <div>
            <label htmlFor="region" className="block text-sm font-semibold text-slate-700 mb-1">
              {t('fields.region')}
            </label>
            <input
              type="text"
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              placeholder={t('placeholders.region')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent transition-smooth text-base"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1">
            {t('fields.message')} *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder={t('placeholders.message')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent transition-smooth resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? t('submitting') : t('submit')}
        </button>

        {status === 'success' && (
          <div className="p-4 bg-teal/10 border border-teal rounded-lg text-center text-teal font-medium">
            {t('success')}
          </div>
        )}

        {status === 'error' && (
          <div className="p-4 bg-red-50 border border-red-300 rounded-lg text-center text-red-600 font-medium">
            {t('error')}
          </div>
        )}
      </form>
    </div>
  );
}
