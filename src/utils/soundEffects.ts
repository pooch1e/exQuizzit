// Utility to generate sound effects using Web Audio API
// Create a shared AudioContext to avoid conflicts
let sharedAudioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!sharedAudioContext) {
    sharedAudioContext = new (window.AudioContext ||
      (
        window as Window &
          typeof globalThis & { webkitAudioContext: typeof AudioContext }
      ).webkitAudioContext)();
  }
  return sharedAudioContext;
};

export const generateCorrectSound = () => {
  try {
    const audioContext = getAudioContext();

    // Resume AudioContext if it's suspended
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    // Create a pleasant "correct" sound - ascending notes
    const playNote = (
      frequency: number,
      startTime: number,
      duration: number
    ) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.frequency.value = frequency;
      oscillator.type = "sine";

      gainNode.gain.value = 0.15; // Increased volume for better audibility
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + startTime + duration
      );

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start(audioContext.currentTime + startTime);
      oscillator.stop(audioContext.currentTime + startTime + duration);
    };

    // Play ascending notes: C, E, G (major chord)
    playNote(523, 0, 0.2); // C5
    playNote(659, 0.1, 0.2); // E5
    playNote(784, 0.2, 0.3); // G5
  } catch (error) {
    console.log("Error playing correct sound:", error);
  }
};

export const generateIncorrectSound = () => {
  try {
    const audioContext = getAudioContext();

    // Resume AudioContext if it's suspended
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    // Create a "wrong" sound - descending notes with slight dissonance
    const playNote = (
      frequency: number,
      startTime: number,
      duration: number
    ) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.frequency.value = frequency;
      oscillator.type = "sawtooth";

      gainNode.gain.value = 0.15; // Increased volume for better audibility
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + startTime + duration
      );

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start(audioContext.currentTime + startTime);
      oscillator.stop(audioContext.currentTime + startTime + duration);
    };

    // Play descending notes with slight dissonance
    playNote(400, 0, 0.2); // Lower note
    playNote(350, 0.1, 0.2); // Even lower
    playNote(300, 0.2, 0.3); // Lowest
  } catch (error) {
    console.log("Error playing incorrect sound:", error);
  }
};

// Cleanup function to close the AudioContext when no longer needed
export const cleanupAudioContext = () => {
  if (sharedAudioContext) {
    sharedAudioContext.close();
    sharedAudioContext = null;
  }
};
