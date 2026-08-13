import React, { useState } from 'react';
import { Lock, ShieldCheck, X, Check, Key } from 'lucide-react';
import { savePin } from '../utils/storage';

export default function LockModal({ savedPin, onUnlock, onSetPin, onClose }) {
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSettingNew, setIsSettingNew] = useState(!savedPin);

  const handleVerifyOrSet = (e) => {
    e.preventDefault();
    if (pinInput.length < 4) {
      setErrorMsg('Please enter a 4-digit PIN code.');
      return;
    }

    if (isSettingNew) {
      savePin(pinInput);
      onSetPin(pinInput);
    } else {
      if (pinInput === savedPin) {
        onUnlock();
      } else {
        setErrorMsg('ACCESS DENIED: Incorrect PIN passcode.');
        setPinInput('');
      }
    }
  };

  const handleRemovePin = () => {
    savePin('');
    onSetPin('');
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(5, 8, 15, 0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }} className="animate-fade-in">
      
      <div className="glass-panel animate-pop-in" style={{
        borderRadius: 'var(--radius-lg)',
        borderColor: 'var(--border-tech-glow)',
        boxShadow: 'var(--shadow-tech-lg)',
        padding: '2.25rem 2rem',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        position: 'relative'
      }}>
        {onClose && (
          <button
            onClick={onClose}
            className="btn-ghost-tech"
            style={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <X size={20} />
          </button>
        )}

        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--neon-cyan-glow)',
          color: 'var(--neon-cyan)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem auto',
          boxShadow: '0 0 20px var(--neon-cyan-glow)'
        }}>
          <ShieldCheck size={28} />
        </div>

        <h3 className="font-heading" style={{ fontSize: '1.6rem', marginBottom: '0.35rem', color: 'var(--text-bright)' }}>
          {isSettingNew ? 'ENCRYPT DIARY LOCK' : 'CYBER LOG ENCRYPTED'}
        </h3>
        <p className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          {isSettingNew 
            ? 'Set a 4-digit PIN code to secure your personal diary log.' 
            : 'AUTHENTICATION REQUIRED: Enter 4-digit PIN passcode.'}
        </p>

        <form onSubmit={handleVerifyOrSet} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="password"
            maxLength={4}
            placeholder="• • • •"
            value={pinInput}
            onChange={(e) => {
              setErrorMsg('');
              setPinInput(e.target.value.replace(/\D/g, ''));
            }}
            className="input-tech font-mono"
            style={{
              fontSize: '2rem',
              textAlign: 'center',
              letterSpacing: '0.6em',
              fontWeight: 700,
              padding: '0.5rem 1rem'
            }}
            autoFocus
          />

          {errorMsg && (
            <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--neon-pink)', fontWeight: 600 }}>
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary-tech"
            disabled={pinInput.length < 4}
            style={{ opacity: pinInput.length < 4 ? 0.6 : 1 }}
          >
            <Check size={18} />
            <span>{isSettingNew ? 'ENABLE ENCRYPTION' : 'AUTHENTICATE LOG'}</span>
          </button>

          {!isSettingNew && savedPin && (
            <button
              type="button"
              onClick={handleRemovePin}
              className="btn-ghost-tech font-mono"
              style={{ fontSize: '0.75rem', alignSelf: 'center', marginTop: '0.5rem', color: 'var(--neon-pink)' }}
            >
              DISABLE PIN SECURITY
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
