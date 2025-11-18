const avatars = {
  smart_boy: require('../../assets/avatars/smart_boy.png'),
  smart_girl: require('../../assets/avatars/smart_girl.png'),
  stab_avatar: require('../../assets/avatars/stab_avatar.png'),
};

export type AvatarName = keyof typeof avatars;
export default avatars;