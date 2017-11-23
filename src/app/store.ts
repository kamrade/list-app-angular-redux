import { tassign } from 'tassign';
import {
  INCREMENT,
  DECREMENT,

  ADD_LIST_ITEM,
  REMOVE_LIST_ITEM,
  SET_LIST,
  FILTER_LIST,
  SET_FILTER_STRING
} from './actions';

export interface IListItem {
  title: string;
  id: number;
  cards?: string;
}

export interface IAppState {
  counter: number;
  filterString: string;
  messaging?: {
    newMessages: number;
  };
  mainTitle: string;
  list: IListItem[];
  filteredList: IListItem[];
}

export const INITIAL_STATE: IAppState = {
  counter: 0,
  filterString: '',
  messaging: {
    newMessages: 5
  },
  mainTitle: 'List Application',
  filteredList: [],
  list: [{
    id: 1,
    title: 'Volkswagen'
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
    case INCREMENT:
      // to prevent mutation like this state.counter = state.counter++;
      // good practice is to use unit-tests return { counter: state.counter + 1 };
      return tassign(state, {counter: state.counter + 1 });

    case DECREMENT:
      return tassign(state, { counter: state.counter - 1 });

    case SET_LIST:
      return tassign(state, { list: action.list });

    case ADD_LIST_ITEM:
      const newList = state.list.slice(0);
      newList.push({ title: action.newItem, id: +(new Date()) });
      return tassign(state, { list: newList});

    case SET_FILTER_STRING:
      return tassign(state, { filterString: action.filterString });

    case FILTER_LIST:
      let filtList;
      if (state.filterString !== '') {
        filtList = state.list.filter((item) => {
          if (item.title.toLowerCase().indexOf(state.filterString.toLowerCase()) > -1) {
            return item;
          }
        });
      } else {
        filtList = state.list;
      }
      return tassign(state, { filteredList: filtList});

    case REMOVE_LIST_ITEM:
      const listAfterRemove = state.list.filter(item => item.id !== action.id);
      return tassign(state, { list: listAfterRemove});

    default:
      return state;
  }
}
