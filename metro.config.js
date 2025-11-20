const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add video file extensions to asset extensions
config.resolver.assetExts.push(
  // Video formats
  "mp4",
  "mov",
  "avi",
  "mkv",
  "webm",
  // Audio formats (if needed)
  "mp3",
  "wav",
  "aac",
  "m4a"
);

module.exports = config;
