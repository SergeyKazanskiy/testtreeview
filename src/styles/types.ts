import { ImageSourcePropType } from "react-native";


export type IconPair = {
  active: ImageSourcePropType;
  inactive: ImageSourcePropType;
};

export interface TabIconRenderProps {
  focused: boolean;
  color: string;
  size: number;
}