import { create } from "zustand";
import { CampsSlice, createCampsSlice } from "./CampsScreen/state";
import { EventSlice, createEventSlice } from "./EventScreen/state";
import { EventsSlice, createEventsSlice } from "./EventsScreen/state";


export type Store = CampsSlice & EventsSlice & EventSlice

export const useStore = create<Store>((set, get) => ({
  ...createCampsSlice(set, get),
  ...createEventsSlice(set, get),
  ...createEventSlice(set, get),
}));

export const configureStore = () => {
  useStore.getState();
};
