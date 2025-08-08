import "dotenv/config";

export default {
  expo: {
    owner: "maradil",
    name: "SerbianFoodScanner",
    slug: "serbianfoodscanner",
    scheme: "serbianfoodscanner",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    androidStatusBar: {
      barStyle: "dark-content",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSCameraUsageDescription:
          "This app uses your camera to capture food photos.",
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      permissions: [
        "android.permission.CAMERA",
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.RECORD_AUDIO",
      ],
      package: "com.maradil.serbianfoodscanner",
    },
    web: {
      bundler: "metro",
      favicon: "./assets/favicon.png",
    },
    plugins: [
      [
        "expo-image-picker",
        {
          photosPermission:
            "This app needs access to your photos so you can upload or attach food images.",
        },
      ],
      [
        "expo-camera",
        {
          cameraPermission:
            "Allow Serbian Food Scanner to access your camera to take food photos.",
          microphonePermission:
            "Allow microphone access (only needed if recording).",
          recordAudioAndroid: true,
        },
      ],
      "expo-router",
    ],
    extra: {
      eas: {
        projectId: "ec60472c-4e4e-4340-8d44-8a386787e772",
      },
      EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY:
        process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
      EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
      EXPO_PUBLIC_SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    },
  },
};
