import { create } from "zustand";
import { AchievesSlice, createAchievesSlice } from "./AchievesScreen/state";
import { CommentsSlice, createCommentsSlice } from "./CommentsScreen/state";
import { GroupSlice, createGroupSlice } from "./GroupScreen/state";
import { GroupsSlice, createGroupsSlice } from "./GroupsScreen/state";
import { ProfileSlice, createProfileSlice } from "./ProfileScreen/state";
import { StatisticsSlice, createStatisticsSlice } from "./StatisticsScreen/state";
import { StudentsSlice, createStudentsSlice } from "./StudentsScreen/state";


export type Store = GroupsSlice  & GroupSlice & StudentsSlice &
  ProfileSlice & StatisticsSlice & AchievesSlice & CommentsSlice;

export const useStore = create<Store>((set, get) => ({
  ...createGroupsSlice(set, get),
  ...createGroupSlice(set, get),
  ...createStudentsSlice(set, get),
  ...createProfileSlice(set, get),
  ...createStatisticsSlice(set, get),
  ...createAchievesSlice(set, get),
  ...createCommentsSlice(set, get),
}));

export const configureStore = () => {
  useStore.getState();
};