import { create } from "zustand";
import { CampsSlice, createCampsSlice } from "./CampsScreen/state";
import { EventsSlice, createEventsSlice } from "./EventsScreen/state";


export type Store = CampsSlice & EventsSlice

export const useStore = create<Store>((set, get) => ({
  ...createCampsSlice(set, get),
  ...createEventsSlice(set, get),
}));

export const configureStore = () => {
  useStore.getState();
};
