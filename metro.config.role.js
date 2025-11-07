const { getDefaultConfig } = require("expo/metro-config");
const { exclusionList } = require("metro-config");
const path = require("path");

const APP_ROLE = process.env.APP_ROLE || "employee";
const allRoles = ["employee", "leader", "manager"];
const excludedRoles = allRoles.filter((r) => r !== APP_ROLE);

const config = getDefaultConfig(__dirname);

config.resolver.blacklistRE = exclusionList(
  excludedRoles.map((role) =>
    new RegExp(`${path.resolve(__dirname, "app/dashboards", role)}.*`)
  )
);

console.log(`🧠 Building role: ${APP_ROLE}`);
console.log(`🚫 Excluding: ${excludedRoles.join(", ")}`);

module.exports = config;
