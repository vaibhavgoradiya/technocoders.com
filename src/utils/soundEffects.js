/**
 * Sound effect utility for page navigation and menu interactions
 */

let pageTransitionAudio = null;
let menuAudio = null;

export const playPageTransitionSound = () => {
  try {
    // Create audio element if it doesn't exist
    if (!pageTransitionAudio) {
      pageTransitionAudio = new Audio('/sounds/mixkit-page-forward-single-chime-1107.wav');
      pageTransitionAudio.volume = 0.5; // Set volume to 50%
    }
    
    // Reset and play the sound
    pageTransitionAudio.currentTime = 0;
    pageTransitionAudio.play().catch(error => {
      console.warn('Audio playback failed:', error);
    });
  } catch (error) {
    console.warn('Audio not supported:', error);
  }
};

export const playMenuSound = () => {
  try {
    // Create audio element if it doesn't exist
    if (!menuAudio) {
      menuAudio = new Audio('/sounds/menubar.wav');
      menuAudio.volume = 0.5; // Set volume to 50%
    }
    
    // Reset and play the sound
    menuAudio.currentTime = 0;
    menuAudio.play().catch(error => {
      console.warn('Audio playback failed:', error);
    });
  } catch (error) {
    console.warn('Audio not supported:', error);
  }
};