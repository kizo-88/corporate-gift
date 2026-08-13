import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Disc, ListMusic, Music, Heart, Sparkles } from 'lucide-react';

export const PLAYLIST = [
  {
    id: 1,
    title: 'Calm Pastels & Coffee Dreams',
    artist: 'Lofi Sanctuary',
    coverColor: '#E88D9E',
    isFeatured: true,
    url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=calm-pastels-lofi.mp3'
  },
  {
    id: 2,
    title: 'Midnight Moonlight Whispers',
    artist: 'Aesthetic Haven',
    coverColor: '#A093E2',
    isFeatured: false,
    url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=midnight-whispers-piano.mp3'
  },
  {
    id: 3,
    title: 'Gentle Rain & Quiet Thoughts',
    artist: 'Serenade Chill',
    coverColor: '#48C9B0',
    isFeatured: false,
    // 100% Verified Reliable Calm Rain & Piano Stream
    url: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792e9.mp3?filename=gentle-rain-quiet-piano.mp3'
  }
];

export default function MusicPlayer({ isPlaying, setIsPlaying }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const audioRef = useRef(null);
  const currentTrack = PLAYLIST[currentTrackIndex];

  // Sync Audio Playback
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.log("Audio playback notice:", err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex, volume, isMuted]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setIsPlaying(true);
  };

  const playCalmTrack = () => {
    setCurrentTrackIndex(0); // Track #1: Calm Pastels & Coffee Dreams
    setIsPlaying(true);
  };

  return (
    <div className="glass-panel animate-fade-in" style={{
      borderRadius: 'var(--radius-lg)',
      padding: '0.85rem 1.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '0.85rem',
      borderColor: 'var(--border-tech-glow)',
      boxShadow: 'var(--shadow-tech-md)',
      position: 'relative',
      zIndex: 30
    }}>
      {/* HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onEnded={handleNext}
      />

      {/* Left: Track Info & Featured Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          backgroundColor: currentTrack.coverColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          boxShadow: `0 0 14px ${currentTrack.coverColor}`,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Disc size={24} className={isPlaying ? 'spin-disc' : ''} />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span className="font-heading" style={{
              fontSize: '1.05rem',
              fontWeight: 800,
              color: 'var(--text-bright)',
              lineHeight: 1.1
            }}>
              {currentTrack.title}
            </span>
            <span className="hud-badge rose" style={{ fontSize: '0.65rem', padding: '0.05rem 0.35rem' }}>
              {currentTrack.artist}
            </span>
            {currentTrack.id === 1 && (
              <span className="hud-badge amber" style={{ fontSize: '0.65rem', padding: '0.05rem 0.35rem' }}>
                🌸 RELAXING
              </span>
            )}
          </div>

          <div style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            marginTop: '0.15rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>CALM BACKGROUND MUSIC</span>
            {isPlaying ? (
              <span style={{ color: 'var(--rose-accent)', fontWeight: 700 }}>● PLAYING DIRECTLY</span>
            ) : (
              <span style={{ color: 'var(--text-muted)' }}>○ PAUSED</span>
            )}
          </div>
        </div>
      </div>

      {/* Center: Audio Controls & Equalizer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {/* Equalizer Visualizer */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '18px', width: '24px' }}>
          <span style={{ width: '4px', height: isPlaying ? '16px' : '4px', backgroundColor: 'var(--rose-accent)', borderRadius: '2px', transition: 'height 0.2s ease' }} />
          <span style={{ width: '4px', height: isPlaying ? '10px' : '4px', backgroundColor: 'var(--lavender-accent)', borderRadius: '2px', transition: 'height 0.25s ease' }} />
          <span style={{ width: '4px', height: isPlaying ? '18px' : '4px', backgroundColor: 'var(--mint-accent)', borderRadius: '2px', transition: 'height 0.18s ease' }} />
          <span style={{ width: '4px', height: isPlaying ? '12px' : '4px', backgroundColor: 'var(--amber-accent)', borderRadius: '2px', transition: 'height 0.22s ease' }} />
        </div>

        {/* Prev */}
        <button
          onClick={handlePrev}
          className="btn-ghost-tech"
          style={{ padding: '0.35rem' }}
          title="Previous Song"
        >
          <SkipBack size={18} />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="btn-primary-tech"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isPlaying ? '0 0 15px var(--rose-glow)' : 'none'
          }}
          title={isPlaying ? "Pause Music" : "Play Calm Pastels & Coffee Dreams"}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
        </button>

        {/* Next */}
        <button
          onClick={handleNext}
          className="btn-ghost-tech"
          style={{ padding: '0.35rem' }}
          title="Next Song"
        >
          <SkipForward size={18} />
        </button>
      </div>

      {/* Right: Quick Play Calm Music, Volume & Playlist */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Quick Calm Track Button */}
        <button
          onClick={playCalmTrack}
          className="btn-secondary-tech"
          style={{
            padding: '0.4rem 0.75rem',
            fontSize: '0.78rem',
            fontFamily: 'var(--font-mono)',
            borderColor: currentTrackIndex === 0 && isPlaying ? 'var(--rose-accent)' : 'var(--border-tech)'
          }}
          title="Play Calm Pastels & Coffee Dreams"
        >
          <Sparkles size={14} color="var(--rose-accent)" />
          <span>🌸 Calm Pastels</span>
        </button>

        {/* Volume & Mute */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="btn-ghost-tech"
            style={{ padding: '0.25rem' }}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? <VolumeX size={16} color="var(--rose-accent)" /> : <Volume2 size={16} />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setIsMuted(false);
              setVolume(parseFloat(e.target.value));
            }}
            style={{
              width: '65px',
              accentColor: 'var(--rose-accent)',
              cursor: 'pointer'
            }}
          />
        </div>

        {/* Playlist Selector Button with High Z-Index Dropdown */}
        <div style={{ position: 'relative', zIndex: 100 }}>
          <button
            onClick={() => setShowPlaylist(!showPlaylist)}
            className="btn-secondary-tech"
            style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}
            title="Playlist"
          >
            <ListMusic size={14} />
            <span>PLAYLIST</span>
          </button>

          {showPlaylist && (
            <div className="glass-panel animate-pop-in" style={{
              position: 'absolute',
              right: 0,
              top: '120%',
              borderRadius: 'var(--radius-md)',
              padding: '0.6rem',
              width: '250px',
              zIndex: 9999,
              borderColor: 'var(--border-tech-glow)',
              boxShadow: 'var(--shadow-tech-lg)',
              backgroundColor: 'var(--bg-cyber-card-hover)'
            }}>
              <div className="font-mono" style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.25rem 0.5rem', color: 'var(--text-bright)', marginBottom: '0.25rem' }}>
                CALM PLAYLIST (3 TRACKS)
              </div>
              {PLAYLIST.map((track, idx) => (
                <button
                  key={track.id}
                  onClick={() => {
                    setCurrentTrackIndex(idx);
                    setIsPlaying(true);
                    setShowPlaylist(false);
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0.6rem',
                    border: 'none',
                    background: currentTrackIndex === idx ? 'var(--bg-cyber-subtle)' : 'transparent',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: currentTrackIndex === idx ? 'var(--rose-accent)' : 'var(--text-bright)'
                  }}
                >
                  <div>
                    <div className="font-heading" style={{ fontSize: '0.85rem', fontWeight: currentTrackIndex === idx ? 800 : 600 }}>
                      {idx + 1}. {track.title}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {track.artist}
                    </div>
                  </div>

                  {currentTrackIndex === idx && isPlaying && (
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--rose-accent)' }}>
                      ▶ PLAYING
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
