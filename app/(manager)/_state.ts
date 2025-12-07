import { create } from "zustand";


type Props = {
  showRootTabs: boolean;
  setShowRootTabs: (value: boolean) => void;
};

export const useRoutersState = create<Props>(set => ({
  showRootTabs: true,
  setShowRootTabs: (value) => set({ showRootTabs: value }),
}));
