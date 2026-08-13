import React, { useState } from 'react';
import { Lock, Key, ShieldCheck, X, Check } from 'lucide-react';
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
      // Setting a new PIN
      savePin(pinInput);
      onSetPin(pinInput);
    } else {
      // Unlocking with saved PIN
      if (pinInput === savedPin) {
        onUnlock();
      } else {
        setErrorMsg('Incorrect PIN passcode. Please try again.');
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
      backgroundColor: 'rgba(58, 50, 44, 0.65)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }} className="animate-fade-in">
      
      <div className="tape-top animate-pop-in" style={{
        backgroundColor: 'var(--bg-cream-paper)',
        borderRadius: 'var(--radius-lg)',
        border: '1.5px solid var(--border-soft)',
        boxShadow: 'var(--shadow-lg)',
        padding: '2.25rem 2rem',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        position: 'relative'
      }}>
        {onClose && (
          <button
            onClick={onClose}
            className="btn-ghost"
            style={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <X size={20} />
          </button>
        )}

        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--pastel-rose)',
          color: '#8A4B4E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem auto'
        }}>
          <Lock size={28} />
        </div>

        <h3 className="font-heading" style={{ fontSize: '2rem', marginBottom: '0.35rem' }}>
          {isSettingNew ? 'Set Passcode Lock' : 'Diary Protected'}
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-medium)', marginBottom: '1.5rem' }}>
          {isSettingNew 
            ? 'Create a 4-digit PIN code to secure your secret diary entries.' 
            : 'Enter your 4-digit PIN to access your personal thoughts.'}
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
            className="input-pastel"
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
            <div style={{ fontSize: '0.825rem', color: '#D9534F', fontWeight: 600 }}>
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={pinInput.length < 4}
            style={{ opacity: pinInput.length < 4 ? 0.6 : 1 }}
          >
            <Check size={18} />
            <span>{isSettingNew ? 'Save PIN Lock' : 'Unlock Diary'}</span>
          </button>

          {!isSettingNew && savedPin && (
            <button
              type="button"
              onClick={handleRemovePin}
              className="btn-danger-ghost"
              style={{ fontSize: '0.8rem', alignSelf: 'center', marginTop: '0.5rem' }}
            >
              Remove Passcode Lock
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
