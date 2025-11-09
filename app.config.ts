import 'dotenv/config'; // если используешь .env (не обязательно)

export default ({ config }: any) => {
  const appRole = process.env.APP_ROLE || "employee";

  const projectIds: Record<string, string> = {
    employee: "79add351-9990-4a24-b2ab-ed6798aeb729",
    leader: "PROJECT_ID_FOR_LEADER",
    manager: "PROJECT_ID_FOR_MANAGER",
  };

  return {
    ...config,
    name: `testtreeview-${appRole}`,
    slug: `testtreeview-${appRole}`,
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png", 
    scheme: "testtreeview",
    userInterfaceStyle: "light",
    extra: {
      appRole,
      eas: {
        projectId: projectIds[appRole],
      },
    },
  };
};


// import { capitalize } from './utils/capitalize.js';

// const role = process.env.APP_ROLE || 'employee';

// export default {
//   expo: {
//     name: `testtreeview-${role}`,
//     slug: `testtreeview-${role}`,
//     entryPoint: `./App${capitalize(role)}.ts`,
//     version: '1.0.0',

//     android: {
//       package: `com.testtreeview.${role}`,
//     },
//     ios: {
//       bundleIdentifier: `com.testtreeview.${role}`,
//     },

//     extra: {
//       role,
//       eas: {
//         projectId: '79add351-9990-4a24-b2ab-ed6798aeb729',
//       },
//     },

//     // 👇 Добавляем вручную
//     updates: {
//       url: 'https://u.expo.dev/79add351-9990-4a24-b2ab-ed6798aeb729',
//     },
//     runtimeVersion: {
//       policy: 'appVersion',
//     },
//   },
// };
