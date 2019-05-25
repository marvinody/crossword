import { combineReducers } from 'redux';
import { Action, ActionType } from '../actions';

export type CharInfo = {
  char: string,
  order: number,
  isSelected: boolean,
}

const newChar = (char: string) => ({
  char,
  order: -1,
  isSelected: false,
})

export type State = {
  wordSelect: {
    letters: Array<CharInfo>,
    selectedIdx: number,
  },
}


function wordSelect(state = initialState.wordSelect, action: Action): State['wordSelect'] {
  switch (action.type) {
    case ActionType.LOAD_WORD:
      return {
        ...state,
        letters: action.word.split('').map(c => newChar(c))
      }
    case ActionType.SELECT_WORD:
      return {
        ...state,
        letters: state.letters.map((c, idx) => {
          if (idx !== action.idx) {
            return c;
          }
          return {
            char: c.char,
            isSelected: true,
            order: state.selectedIdx,
          };
        }),
        selectedIdx: state.selectedIdx + 1,
      }
    case ActionType.DESELECT_WORD:
    default:
      return state
  }
}

export const initialState: State = {
  wordSelect: {
    letters: Array<CharInfo>(),
    selectedIdx: 0,
  },
}

const reducers = combineReducers<State>({
  wordSelect,
})

export default reducers
