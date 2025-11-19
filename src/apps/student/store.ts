import { create } from "zustand";
import { AshievesSlice, createAshievesSlice } from "./AchievesScreen/state";
import { EventsSlice, createEventsSlice } from "./EventsScreen/state";
import { GameReportsSlice, createGameReportsSlice } from "./GamesScreen/state";
import { ReportSlice, createReportSlice } from "./GamingScreen/data";
import { GameMachine, createGameMachine } from "./GamingScreen/machine";
import { GamingSlice, createGamingSlice } from "./GamingScreen/state";
import { LidersSlice, createLidersSlice } from "./LidersScreen/state";
import { ProfileSlice, createProfileSlice } from "./ProfileScreen/state";
import { StatisticsSlice, createStatisticsSlice } from "./StatisticsScreen/state";


export type Store = ProfileSlice & LidersSlice & EventsSlice &
  StatisticsSlice & AshievesSlice & GameReportsSlice &
  GamingSlice & GameMachine & ReportSlice;

export const useStore = create<Store>((set, get) => ({
  ...createProfileSlice(set, get),
  ...createLidersSlice(set, get),
  ...createEventsSlice(set, get),
  ...createStatisticsSlice(set, get),
  ...createAshievesSlice(set, get),
  ...createGameReportsSlice(set, get),

  ...createGamingSlice(set, get),
  ...createGameMachine(set, get),
  ...createReportSlice(set, get),
}));

export const configureStore = () => {
  useStore.getState();
};