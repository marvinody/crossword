import { combineReducers } from 'redux';
import { Action, ActionType } from '../actions';

export type CharInfo = {
  char: string,
  order: number,
  isSelected: boolean,
}

export type Coord = { x: number, y: number }

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
  board: {
    width: number,
    height: number,
    offset: Coord, // used for normalizing any weird board with starts
    words: Array<Word>
  }
}
export const ZP = { x: 0, y: 0 }
export enum WordCharState {
  HIDDEN = 0,
  VISIBLE = 1,
}

export type WordChar = {
  char: string,
  x: number,
  y: number,
  state: WordCharState
}
export type Word = {
  full: string,
  split: Array<WordChar>,
  completed: boolean,
}
export const newWord = (word: string, start: Coord, isHoriz: boolean): Word => ({
  completed: false,
  full: word,
  split: word.split('').map((c: string, idx: number): WordChar => ({
    char: c,
    state: WordCharState.HIDDEN,
    x: start.x + (isHoriz ? idx : 0),
    y: start.y + (!isHoriz ? idx : 0),
  })),
})

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
    case ActionType.LOAD_LEVEL:
      return {
        ...state,
        letters: action.letters.map(c => newChar(c))
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


function board(state = initialState.board, action: Action): State['board'] {
  switch (action.type) {
    case ActionType.LOAD_LEVEL:
      {
        const bounds = action.words
          .map(w => w.split)
          .flat()
          .reduce((acc, cur) => {
            if (cur.x < acc.min.x) acc.min.x = cur.x;
            if (cur.x > acc.max.x) acc.max.x = cur.x;
            if (cur.y < acc.min.y) acc.min.y = cur.y;
            if (cur.y > acc.max.y) acc.max.y = cur.y;
            return acc;
          }, { min: { x: Infinity, y: Infinity }, max: { x: 0, y: 0 } })
        return {
          ...state,
          height: bounds.max.y - bounds.min.y + 1, // last idx -> len := +1
          width: bounds.max.x - bounds.min.x + 1,
          offset: bounds.min, // this should generally be 0 if wellformed
          words: action.words,
        }
      }
    case ActionType.SUBMIT_WORD:
      return {
        ...state,
        words: state.words.map((w): Word => {
          if (w.completed || w.full !== action.word) {
            return w;
          }
          // so we know w is NOT completed AND the word matches
          return {
            completed: true,
            full: w.full,
            split: w.split.map((c): WordChar => ({
              ...c,
              state: WordCharState.VISIBLE
            }))
          }
        })
      }
    default:
      return state;
  }
}


export const initialState: State = {
  wordSelect: {
    letters: Array<CharInfo>(),
    selectedIdx: 0,
  },
  board: {
    width: 0,
    height: 0,
    words: [],
    offset: { x: 0, y: 0 },
  }
}

const reducers = combineReducers<State>({
  wordSelect,
  board,
})

export default reducers
