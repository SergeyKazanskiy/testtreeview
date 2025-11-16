import { create } from "zustand";
import { ProfileSlice, createProfileSlice } from "./ProfileScreen/state";
import { UsersSlice, createUsersSlice } from "./UsersScreen/state";



export type Store = UsersSlice & ProfileSlice;

export const useStore = create<Store>((set, get) => ({
  ...createUsersSlice(set, get),
  ...createProfileSlice(set, get),
}));

export const configureStore = () => {
  useStore.getState();
};
