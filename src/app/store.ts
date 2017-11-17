
import { tassign } from 'tassign';
import { INCREMENT } from './actions';

export interface IAppState {
  counter: number;
  messaging?: {
    newMessages: number;
  };
  mainTitle: string
}

export const INITIAL_STATE: IAppState = {
  counter: 0,
  messaging: {
    newMessages: 5
  },
  mainTitle: 'Main Title'
};

export function rootReducer(state: IAppState, action): IAppState {
  switch (action.type) {
    case INCREMENT:
      // to prevent mutation like this
      // state.counter = state.counter++;
      // good practice is to use unit-tests

      // return { counter: state.counter + 1 };
      return tassign(state, {counter: state.counter + 1 });

    default:
      return state;
  }
}
