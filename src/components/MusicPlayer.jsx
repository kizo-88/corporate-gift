import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Disc, ListMusic, Music, Sparkles } from 'lucide-react';

export const PLAYLIST = [
  {
    id: 1,
    title: 'Less Than A Lover',
    artist: 'Jennie',
    coverColor: '#E88D9E',
    // Direct audio stream playing seamlessly inside the browser
    url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=less-than-a-lover-jennie.mp3'
  },
  {
    id: 2,
    title: 'Number One Girl',
    artist: 'Rosé',
    coverColor: '#A093E2',
    url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=number-one-girl-rose.mp3'
  },
  {
    id: 3,
    title: 'Handlebars',
    artist: 'Jennie',
    coverColor: '#48C9B0',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=handlebars-jennie.mp3'
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const audioRef = useRef(null);
  const currentTrack = PLAYLIST[currentTrackIndex];

  // Auto handle play/pause & volume directly in browser audio engine
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.log("Direct audio playback info:", err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex, volume, isMuted]);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setIsPlaying(true);
  };

  return (
    <div className="glass-panel" style={{
      borderRadius: 'var(--radius-lg)',
      padding: '0.85rem 1.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '0.85rem',
      borderColor: 'var(--border-tech-glow)',
      boxShadow: 'var(--shadow-tech-md)'
    }}>
      {/* HTML5 Audio Element for Direct Browser Playback */}
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onEnded={handleNext}
      />

      {/* Left: Track Cover & Song Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '10px',
          backgroundColor: currentTrack.coverColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          boxShadow: `0 0 12px ${currentTrack.coverColor}`,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Disc size={22} className={isPlaying ? 'spin-disc' : ''} />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span className="font-heading" style={{
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'var(--text-bright)',
              lineHeight: 1.1
            }}>
              {currentTrack.title}
            </span>
            <span className="hud-badge rose" style={{ fontSize: '0.65rem', padding: '0.05rem 0.35rem' }}>
              {currentTrack.artist}
            </span>
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
            <span>IN-APP AUDIO PLAYER</span>
            {isPlaying && (
              <span style={{ color: 'var(--rose-accent)', fontWeight: 600 }}>● PLAYING DIRECTLY</span>
            )}
          </div>
        </div>
      </div>

      {/* Center: Controls & Animated Equalizer */}
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

        {/* Play/Pause Main Button */}
        <button
          onClick={togglePlay}
          className="btn-primary-tech"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title={isPlaying ? "Pause Music" : "Play Song Directly"}
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

      {/* Right: Volume Slider & Playlist Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Volume & Mute Controls */}
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
              width: '70px',
              accentColor: 'var(--rose-accent)',
              cursor: 'pointer'
            }}
          />
        </div>

        {/* Playlist Selector Button */}
        <div style={{ position: 'relative' }}>
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
              width: '230px',
              zIndex: 60
            }}>
              <div className="font-mono" style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.25rem 0.5rem', color: 'var(--text-muted)' }}>
                IN-APP PLAYLIST (3 SONGS)
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
                    padding: '0.45rem 0.6rem',
                    border: 'none',
                    background: currentTrackIndex === idx ? 'var(--bg-cyber-subtle)' : 'transparent',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: currentTrackIndex === idx ? 'var(--rose-accent)' : 'var(--text-bright)'
                  }}
                >
                  <div>
                    <div className="font-heading" style={{ fontSize: '0.85rem', fontWeight: currentTrackIndex === idx ? 700 : 500 }}>
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
