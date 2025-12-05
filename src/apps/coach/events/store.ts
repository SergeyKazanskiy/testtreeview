import { create } from "zustand";
import { AttendanceSlice, createAttendanceSlice } from "./AttendanceScreen/state";
import { CompetitionsSlice, createCompetitionsSlice } from "./CompetitionsScreen/state";
import { DrillSlice, createDrillSlice } from "./DrillScreen/state";
import { DrillsSlice, createDrillsSlice } from "./DrillsScreen/state";
import { EventsSlice, createEventsSlice } from "./EventsScreen/state";
import { GameReportSlice, createGameReportSlice } from "./GameReport/state";
import { ReportSlice, createReportSlice } from "./GamingScreen/data";
import { GameMachine, createGameMachine } from "./GamingScreen/machine";
import { GamingSlice, createGamingSlice } from "./GamingScreen/state";
import { HistorySlice, createHistorySlice } from "./HistoryScreen/state";
import { TestingSlice, createTestingSlice } from "./TestingScreen/state";


export type Store = EventsSlice & AttendanceSlice & TestingSlice & GameReportSlice &
  CompetitionsSlice & HistorySlice & DrillsSlice & DrillSlice & GamingSlice & GameMachine & ReportSlice;

export const useStore = create<Store>((set, get) => ({
  ...createEventsSlice(set, get),
  ...createAttendanceSlice(set, get),
  ...createTestingSlice(set, get),
  ...createCompetitionsSlice(set, get),
  ...createHistorySlice(set, get),
  ...createDrillsSlice(set, get),
  ...createDrillSlice(set, get),
  ...createGamingSlice(set, get),
  ...createGameMachine(set, get),
  ...createReportSlice(set, get),
  ...createGameReportSlice(set, get),
}));

export const configureStore = () => {
  useStore.getState();
};
