import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const PlayAudioOnPageChange = () => {
  const location = useLocation(); // Get the current route location
  const audioRef = useRef(null); // Reference to the audio element

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
        });
      }
    };

    // Delay the audio play to avoid browser restrictions
    setTimeout(playAudio, 0); // Delay in ms (500ms delay)

  }, [location]); // Runs when the location changes

  return (
    <div>
      <audio ref={audioRef} preload="auto">
        <source
          src="https://www.myinstants.com/media/sounds/chalo.mp3"
          type="audio/mp3"
        />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default PlayAudioOnPageChange;
