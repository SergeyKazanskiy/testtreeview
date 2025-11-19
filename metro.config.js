const { getDefaultConfig } = require("expo/metro-config");
const exclusionList = require("metro-config/src/defaults/exclusionList");
const fs = require("fs");
const path = require("path");

const config = getDefaultConfig(__dirname);

const appRole = process.env.APP_ROLE ?? "student";
const appsPath = path.resolve(__dirname, "src/apps");

// Считываем все папки внутри src/apps
const allRoles = fs.readdirSync(appsPath, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// Исключаем папку текущей роли
const ignoredDirs = allRoles.filter(role => role !== appRole)
  .map(dir => `/src/apps/${dir}/`);

const blockList = ignoredDirs.map(dir => new RegExp(`${dir}.*`));

// Подставляем в конфиг Metro
config.resolver.blockList = exclusionList(blockList);

module.exports = config;
