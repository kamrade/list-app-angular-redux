import { tassign } from 'tassign';
import { INCREMENT } from './actions';
import { Map } from 'immutable';

export interface IAppState {
  counter: number;
  messaging?: {
    newMessages: number;
  };
}

export const INITIAL_STATE: IAppState = {
  counter: 0,
  messaging: {
    newMessages: 5
  }
};

export function rootReducer(state: Map<string, any>, action): Map<string, any> {
  switch (action.type) {
    case INCREMENT:
      // to prevent mutation like this
      // state.counter = state.counter++;
      // good practice is to use unit-tests

      // return { counter: state.counter + 1 };
      // return Object.assign({}, state, { counter: state.counter + 1 });
      // return tassign(state, {counter: state.counter + 1 });
      return state.set('counter', state.get('counter') + 1);

    default:
      return state;
  }
}
