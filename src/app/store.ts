import { tassign } from 'tassign';

import {
  INCREMENT,
  DECREMENT,

  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_ERROR
} from './actions';

export interface IListItem {
  title: string;
  id: number;
}

export interface IAppState {
  counter: number;
  listLoading: boolean;
  errorMessage: String;
  list: IListItem[];
}

export const INITIAL_STATE: IAppState = {
  counter: 0,
  listLoading: true,
  errorMessage: '',
  list: [{
    id: 1,
    title: 'Volkswagen',
  }, {
    id: 2,
    title: 'Mercedes'
  }, {
    id: 3,
    title: 'Honda'
  }, {
    id: 4,
    title: 'Toyota'
  }]
};

export function rootReducer(state: IAppState, action): IAppState {
  switch (action.type) {
    // just testing
    case INCREMENT:
      return tassign(state, {counter: state.counter + 1 });
    case DECREMENT:
      return tassign(state, { counter: state.counter - 1 });

    // get list
    case FETCH_TODOS_REQUEST:
      return tassign(state, { listLoading: true });
    case FETCH_TODOS_SUCCESS:
      return tassign(state, { listLoading: false, list: action.list });
    case FETCH_TODOS_ERROR:
      return tassign(state, { listLoading: false, errorMessage: action.errorMessage });

    default:
      return state;
  }
}
