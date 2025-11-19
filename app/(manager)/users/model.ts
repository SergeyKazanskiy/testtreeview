import { AvatarName } from '@/src/constants/avatars';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  photo: AvatarName;
}

