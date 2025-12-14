const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const ROLE = process.env.APP_ROLE || 'coach';
const roles = ['student', 'coach', 'manager'];

module.exports = (async () => {
  // Берём дефолтный конфиг Expo Router / Expo SDK
  const config = await getDefaultConfig(__dirname);

  // Создаём фильтр для исключения всех ролей кроме выбранной
  const roleExclude = roles
    .filter((r) => r !== ROLE)
    .flatMap((r) => [
      new RegExp(`${path.resolve(__dirname, `app/\\(${r}\\)`)}.*`),
      new RegExp(`${path.resolve(__dirname, `src/apps/${r}`)}/.*`)
    ]);

  // Расширяем существующий blockList, не перезаписывая встроенный
  const existingBlockList = config.resolver.blockList || [];
  config.resolver.blockList = [...existingBlockList, ...roleExclude];

  return config;
})();
