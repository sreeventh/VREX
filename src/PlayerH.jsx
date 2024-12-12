// import { useEffect, useRef } from 'react';
// import { usePlayer } from 'spacesvr';

// function PlayerHeightManager({ desiredHeight }) {
//   const playerState = usePlayer();
//   const lastValidPosition = useRef([0, desiredHeight, 0]);

//   useEffect(() => {
//     const updateHeight = () => {
//       let currentPosition = playerState.position.get();
//       console.log('Raw current position:', currentPosition);

//       if (typeof currentPosition === 'function') {
//         console.log('Position is a function, attempting to call it');
//         currentPosition = currentPosition();
//         console.log('Result of calling position function:', currentPosition);
//       }

//       if (!Array.isArray(currentPosition)) {
//         console.warn('Current position is not an array:', currentPosition);
//         console.log('Player state:', playerState);
//         console.log('Position getter type:', typeof playerState.position.get);
//         currentPosition = lastValidPosition.current;
//       } else if (currentPosition.length !== 3) {
//         console.warn('Current position array does not have 3 elements:', currentPosition);
//         currentPosition = lastValidPosition.current;
//       } else {
//         lastValidPosition.current = currentPosition;
//       }

//       if (typeof desiredHeight !== 'number' || !isFinite(desiredHeight)) {
//         console.warn('Desired height is not a valid number:', desiredHeight);
//         return;
//       }

//       try {
//         playerState.position.set([currentPosition[0], desiredHeight, currentPosition[2]]);
//         console.log('Height updated successfully to:', desiredHeight);
//       } catch (error) {
//         console.error('Error updating player position:', error);
//       }
//     };

//     // Update height immediately
//     updateHeight();

//     // Set up an interval to continuously update the height
//     const intervalId = setInterval(updateHeight, 16); // approximately 60 times per second

//     // Clean up the interval when the component unmounts
//     return () => clearInterval(intervalId);
//   }, [playerState, desiredHeight]);

//   return null; // This component doesn't render anything
// }

// export default PlayerHeightManager;



import { useEffect, useRef } from 'react';
import { usePlayer } from 'spacesvr';

function PlayerHeightManager({ desiredHeight }) {
  const playerState = usePlayer();
  const lastValidPosition = useRef({ x: 0, y: desiredHeight, z: 0 });

  useEffect(() => {
    const updateHeight = () => {
      let currentPosition = playerState.position.get();
      console.log('Current position:', currentPosition);

      if (currentPosition && typeof currentPosition === 'object' && 'x' in currentPosition && 'y' in currentPosition && 'z' in currentPosition) {
        lastValidPosition.current = { ...currentPosition };
      } else {
        console.warn('Invalid current position:', currentPosition);
        currentPosition = lastValidPosition.current;
      }

      if (typeof desiredHeight !== 'number' || !isFinite(desiredHeight)) {
        console.warn('Desired height is not a valid number:', desiredHeight);
        return;
      }

      try {
        playerState.position.set({ ...currentPosition, y: desiredHeight });
        console.log('Height updated successfully to:', desiredHeight);
      } catch (error) {
        console.error('Error updating player position:', error);
      }
    };

    // Update height immediately
    updateHeight();

    // Set up an interval to continuously update the height
    const intervalId = setInterval(updateHeight, 16); // approximately 60 times per second

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [playerState, desiredHeight]);

  return null; // This component doesn't render anything
}

export default PlayerHeightManager;

// import { useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { usePlayer } from 'spacesvr';

// function PlayerHeightManager({ desiredHeight }) {
//   const playerState = usePlayer();
//   const currentHeight = useRef(desiredHeight);

//   useFrame(() => {
//     const currentPosition = playerState.position.get();

//     if (typeof desiredHeight !== 'number' || !isFinite(desiredHeight)) {
//       console.warn('Desired height is not a valid number:', desiredHeight);
//       return;
//     }

//     // Smoothly interpolate between current height and desired height
//     const lerpFactor = 0.1; // Adjust this value to change the speed of transition (0.1 = 10% per frame)
//     currentHeight.current += (desiredHeight - currentHeight.current) * lerpFactor;

//     try {
//       playerState.position.set({ ...currentPosition, y: currentHeight.current });
//     } catch (error) {
//       console.error('Error updating player position:', error);
//     }
//   });

//   return null; // This component doesn't render anything
// }

// export default PlayerHeightManager;

// import { useEffect, useRef } from 'react';
// import { usePlayer } from 'spacesvr';

// function PlayerHeightManager({ desiredHeight }) {
//   const playerState = usePlayer();
//   const lastValidPosition = useRef({ x: 0, y: desiredHeight, z: 0 });
//   const currentHeight = useRef(desiredHeight);

//   useEffect(() => {
//     const updateHeight = () => {
//       let currentPosition = playerState.position.get();

//       if (currentPosition && typeof currentPosition === 'object' && 'x' in currentPosition && 'y' in currentPosition && 'z' in currentPosition) {
//         lastValidPosition.current = { ...currentPosition };
//       } else {
//         console.warn('Invalid current position:', currentPosition);
//         currentPosition = lastValidPosition.current;
//       }

//       if (typeof desiredHeight !== 'number' || !isFinite(desiredHeight)) {
//         console.warn('Desired height is not a valid number:', desiredHeight);
//         return;
//       }

//       // Smoothly interpolate between current height and desired height
//       const lerpFactor = 0.1; // Adjust this value to change the speed of transition (0.1 = 10% per frame)
//       currentHeight.current += (desiredHeight - currentHeight.current) * lerpFactor;

//       try {
//         playerState.position.set({ ...currentPosition, y: currentHeight.current });
//       } catch (error) {
//         console.error('Error updating player position:', error);
//       }
//     };

//     // Update height every frame
//     const animationFrameId = requestAnimationFrame(function animate() {
//       updateHeight();
//       requestAnimationFrame(animate);
//     });

//     // Clean up the animation frame when the component unmounts
//     return () => cancelAnimationFrame(animationFrameId);
//   }, [playerState, desiredHeight]);

//   return null; // This component doesn't render anything
// }

// export default PlayerHeightManager;