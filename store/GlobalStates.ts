import create from "zustand";
import { produce } from "immer";

type State = {
    firstTime: boolean;
};

export const global = create<State>((set, get) => ({
    firstTime: true,
}));


  const updateStore = function (updater: (state: State) => void) {
    global.setState(produce(global.getState(), updater));
  };

  export const changeFirstTime = () => {
    updateStore((state) => {
        state.firstTime = false;
    });
  }
