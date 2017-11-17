
import { tassign } from 'tassign';
import { INCREMENT } from './actions';

export interface IListItem {
  title: string;
  cards?: string;
}

export interface IAppState {
  counter: number;
  messaging?: {
    newMessages: number;
  };
  mainTitle: string;
  list: IListItem[];
}

export const INITIAL_STATE: IAppState = {
  counter: 0,
  messaging: {
    newMessages: 5
  },
  mainTitle: 'List Application',
  list: [{
    title: 'Volkswagen'
  },{
    title: 'Mercedes'
  }]
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
