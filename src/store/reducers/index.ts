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
    case ActionType.SUBMIT_WORD:
      return {
        ...state,
        selectedIdx: 0,
        letters: state.letters.map(c => ({
          ...c,
          order: -1,
          isSelected: false,
        }))
      }
    case ActionType.LOAD_WORD:
      return {
        ...state,
        letters: action.word.split('').map(c => newChar(c))
      }
    case ActionType.SELECT_CHAR:
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
    case ActionType.DESELECT_CHAR:
      const chosenLetter = state.letters[action.idx]
      // prevent out of order deselecting
      if (chosenLetter.order !== state.selectedIdx - 1) {
        return state;
      }
      return {
        ...state,
        letters: state.letters.map((c, idx) => {
          if (idx !== action.idx && c.order < chosenLetter.order) {
            return c;
          } else if (idx !== action.idx && c.order > chosenLetter.order) {
            return {
              char: c.char,
              isSelected: true,
              order: c.order - 1,
            }
          }
          return {
            char: c.char,
            isSelected: false,
            order: -1,
          };
        }),
        selectedIdx: state.selectedIdx - 1,
      }
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
