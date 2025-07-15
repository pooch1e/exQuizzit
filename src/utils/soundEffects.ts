// Utility to generate sound effects using Web Audio API
export const generateCorrectSound = () => {
  const audioContext = new (window.AudioContext ||
    (window as any).webkitAudioContext)();

  // Create a pleasant "correct" sound - ascending notes
  const playNote = (frequency: number, startTime: number, duration: number) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.frequency.value = frequency;
    oscillator.type = "sine";

    gainNode.gain.value = 0.1;
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
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
};

export const generateIncorrectSound = () => {
  const audioContext = new (window.AudioContext ||
    (window as any).webkitAudioContext)();

  // Create a "wrong" sound - descending notes with slight dissonance
  const playNote = (frequency: number, startTime: number, duration: number) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.frequency.value = frequency;
    oscillator.type = "sawtooth";

    gainNode.gain.value = 0.1;
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
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
};
