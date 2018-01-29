import { tassign } from 'tassign';

import {
  INCREMENT,
  DECREMENT,

  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_ERROR,

  ADD_LIST_ITEM,
  REMOVE_LIST_ITEM,
  EDIT_LIST_ITEM
} from './actions';

export interface IListItem {
  title: string;
  _id: number;
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
  list: []
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

    // add new list item
    case ADD_LIST_ITEM:
      return tassign(state, { list: [ ...state.list, action.listItem] });

    case REMOVE_LIST_ITEM:
      return tassign(state, { list: state.list.filter(item => item._id !== action.id )} );

    case EDIT_LIST_ITEM:
      return tassign(state, {
        list: state.list.map(item => {
          if(item._id === action.listItem._id) {
            item.title = action.listItem.title;
          }
          return item;
        })
      });

    default:
      return state;
  }
}
