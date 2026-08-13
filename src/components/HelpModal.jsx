import React from 'react';
import { X, BookOpen, ShieldCheck, Download, Music, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HelpModal({ onClose }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(20, 14, 23, 0.65)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }} className="animate-fade-in" onClick={onClose}>
      
      <div className="glass-panel animate-pop-in" style={{
        borderRadius: 'var(--radius-lg)',
        borderColor: 'var(--border-tech-glow)',
        boxShadow: 'var(--shadow-tech-lg)',
        padding: '2rem',
        maxWidth: '520px',
        width: '100%',
        position: 'relative'
      }} onClick={(e) => e.stopPropagation()}>
        
        <button
          onClick={onClose}
          className="btn-ghost-tech"
          style={{ position: 'absolute', right: '1rem', top: '1rem' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--rose-glow)',
            color: 'var(--rose-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={22} />
          </div>
          <div>
            <h3 className="font-heading" style={{ fontSize: '1.4rem', margin: 0, color: 'var(--text-bright)' }}>
              Quick User Guide ✨
            </h3>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              CARA MENGGUNAKAN DIARI SAYA
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <CheckCircle2 size={20} color="var(--rose-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ color: 'var(--text-bright)' }}>Tulis & Simpan Automatik (Auto Save):</strong>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem' }}>
                Setiap kali anda tulis diari, tarikh dan masa akan ditanda secara automatik. Semua tulisan tersimpan dengan selamat di dalam pelayar (Local Storage).
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <Music size={20} color="var(--lavender-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ color: 'var(--text-bright)' }}>Pemain Muzik Latar Belakang:</strong>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem' }}>
                Anda boleh mendengar lagu Jennie & Rosé sambil menaip. Tekan ikon Playlist untuk memilih lagu kegemaran anda.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <ShieldCheck size={20} color="var(--mint-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ color: 'var(--text-bright)' }}>Kunci Keselamatan PIN (Passcode Lock):</strong>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem' }}>
                Tekan ikon kunci 🔒 di bahagian atas untuk menetapkan PIN 4-digit supaya diari anda terlindung daripada orang lain.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <Download size={20} color="var(--amber-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ color: 'var(--text-bright)' }}>Eksport & Backup Data:</strong>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem' }}>
                Tekan butang muat turun 📥 untuk simpan salinan backup fail JSON diari anda ke dalam komputer/telefon pada bila-bila masa.
              </p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
          <button onClick={onClose} className="btn-primary-tech" style={{ padding: '0.5rem 1.25rem' }}>
            Faham & Mula Tulis ✨
          </button>
        </div>
      </div>
    </div>
  );
}
