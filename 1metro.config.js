const { getDefaultConfig } = require("expo/metro-config");
const fs = require("fs");
const path = require("path");

const projectRoot = __dirname;
const config = getDefaultConfig(projectRoot);

const appRole = process.env.APP_ROLE ?? "student";

const appsRoot = path.join(projectRoot, "src", "apps");

// список всех папок ролей
const allRoles = fs.existsSync(appsRoot)
  ? fs
      .readdirSync(appsRoot, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
  : [];

const ignoredRoles = allRoles.filter((r) => r !== appRole);

// перехватываем попытку загрузить файлы других ролей
const originalResolveRequest = config.resolver.resolveRequest;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  for (const role of ignoredRoles) {
    if (moduleName.includes(`/src/apps/${role}/`)) {
      // возвращаем фиктивный модуль
      return {
        filePath: path.join(projectRoot, "empty.js"),
        type: "sourceFile",
      };
    }
  }

  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }

  return null;
};

module.exports = config;
