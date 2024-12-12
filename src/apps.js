// import { exec } from "child_process";

// export function openApplication(appName) {
//   return new Promise((resolve, reject) => {
//     exec(`open -a "${appName}"`, (error, stdout, stderr) => {
//       if (error) {
//         reject(`Failed to open ${appName}: ${error.message}`);
//         return;
//       }
//       if (stderr) {
//         reject(`Error with ${appName}: ${stderr}`);
//         return;
//       }
//       resolve(`${appName} launched successfully`);
//     });
//   });
// }

// // Main execution function
// async function launchApps() {
//   try {
//     // await openApplication("Microsoft Teams");
//     // await openApplication("Notes");
//     console.log("All applications opened");
//   } catch (error) {
//     console.error(error);
//   }
// }

// // Only run if this is the main module
// if (import.meta.url === `file://${process.argv[1]}`) {
//   launchApps();
// }

// export default openApplication;

// import { exec } from "child_process";

// export function openMusicApp() {
//   return new Promise((resolve, reject) => {
//     exec("open -a Music", (error, stdout, stderr) => {
//       if (error) {
//         reject(`Failed to open Music app: ${error.message}`);
//         return;
//       }
//       resolve("Music app opened successfully");
//     });
//   });
// }

// export function playMusic(playlist = "Kuthu") {
//   return new Promise((resolve, reject) => {
//     const appleScript = `
//       tell application "Music"
//         activate
//         play playlist "${playlist}"
//       end tell
//     `;

//     exec(`osascript -e '${appleScript}'`, (error, stdout, stderr) => {
//       if (error) {
//         reject(`Failed to play music: ${error.message}`);
//         return;
//       }
//       resolve(`Started playing playlist: ${playlist}`);
//     });
//   });
// }

// // Main execution function
// async function playMusicSequence() {
//   try {
//     await openMusicApp();
//     await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait a second for app to open
//     await playMusic(); // Plays default playlist
//     console.log("Music playback initiated");
//   } catch (error) {
//     console.error(error);
//   }
// }

// // Only run if this is the main module
// if (import.meta.url === `file://${process.argv[1]}`) {
//   playMusicSequence();
// }

// export default {
//   openMusicApp,
//   playMusic,
// };

// import { exec } from "child_process";

// export function openTeams() {
//   return new Promise((resolve, reject) => {
//     exec('open -a "Microsoft Teams"', (error, stdout, stderr) => {
//       if (error) {
//         reject(`Failed to open Microsoft Teams: ${error.message}`);
//         return;
//       }
//       resolve("Microsoft Teams opened successfully");
//     });
//   });
// }

// export function openTeamsCalendar() {
//   return new Promise((resolve, reject) => {
//     const appleScript = `
//       tell application "Microsoft Teams"
//         activate
//         delay 2
//         tell application "System Events"
//           tell process "Microsoft Teams"
//             click menu item "Calendar" of menu "Go" of menu bar 1
//           end tell
//         end tell
//       end tell
//     `;

//     exec(`osascript -e '${appleScript}'`, (error, stdout, stderr) => {
//       if (error) {
//         reject(`Failed to open Teams Calendar: ${error.message}`);
//         return;
//       }
//       resolve("Teams Calendar opened successfully");
//     });
//   });
// }

import { exec } from "child_process";

export function playMusicInBackground(playlist = "Kuthu") {
  return new Promise((resolve, reject) => {
    const appleScript = `
      tell application "Music"
        if it is not running then launch
        play playlist "${playlist}"
      end tell
    `;

    exec(`osascript -e '${appleScript}'`, (error, stdout, stderr) => {
      if (error) {
        reject(`Failed to play music: ${error.message}`);
        return;
      }
      resolve(`Started playing playlist: ${playlist}`);
    });
  });
}

// Main execution function
async function playMusicSequence() {
  try {
    await playMusicInBackground(); // Plays default playlist
    console.log("Music playback initiated in background");
  } catch (error) {
    console.error(error);
  }
}

// Only run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  playMusicSequence();
}

export default {
  playMusicInBackground,
};
