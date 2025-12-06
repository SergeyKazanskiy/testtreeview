import { create } from "zustand";
import { CoachesSlice, createCoachesSlice } from "./CoachesScreen/state";
import { CoachSlice, createCoachSlice } from "./CoachScreen/state";


export type Store = CoachesSlice & CoachSlice 

export const useStore = create<Store>((set, get) => ({
  ...createCoachesSlice(set, get),
  ...createCoachSlice(set, get),
}));

export const configureStore = () => {
  useStore.getState();
};
