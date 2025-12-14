export default ({ config }: any) => {
  const appRole = process.env.APP_ROLE || "student";

  // Укажи реальные projectId (можно взять из expo.dev → Project Settings → General)
  const projectIds: Record<string, string> = {
    student: "2d081913-084b-46d1-b13a-1f743377f78d",
    coach: "bb7ea6e2-94f6-401b-88fd-440ddd4233b5",
    manager: "c2dc6db4-6adc-4634-bff7-09c89294feac",
  };

  return {
    ...config,
    name: `testtreeview-${appRole}`,
    slug: `testtreeview-${appRole}`,
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "testtreeview",
    userInterfaceStyle: "light",
    android: {
      package: `com.testtreeview.${appRole}`, // 👈 обязательно уникальный!
      versionCode: 1,
      googleServicesFile: "./google-services.json"
    },
    ios: {
      bundleIdentifier: `com.testtreeview.${appRole}`,
      buildNumber: '1.0.0',
    },
    extra: {
      appRole,
      eas: {
        projectId: projectIds[appRole],
      },
    },
    updates: {
      url: `https://u.expo.dev/${projectIds[appRole]}`,
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    platforms: ["ios", "android", "web"],
    plugins: ["expo-router"],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
  };
};


//npx expo config --json   Это для проверки - после этого в терминале должно быть
// "android": {
//   "googleServicesFile": "./google-services.json", - это для пушей
//   "package": "com.testtreeview.student"
// }