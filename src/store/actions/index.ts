import { Word } from "../reducers";

export enum ActionType {
  SELECT_CHAR = 1,
  DESELECT_CHAR,
  LOAD_LEVEL,
  SUBMIT_WORD,
}


export type Action = {
  type: ActionType.SELECT_CHAR,
  idx: number,
} | {
  type: ActionType.DESELECT_CHAR,
  idx: number,
} | {
  type: ActionType.LOAD_LEVEL,
  words: Array<Word>,
  letters: Array<string>
} | {
  type: ActionType.SUBMIT_WORD,
  word: string,
}

export const loadLevel = (letters: Array<string>, words: Array<Word>): Action => ({
  type: ActionType.LOAD_LEVEL,
  words,
  letters,
})

export const selectChar = (idx: number): Action => ({
  type: ActionType.SELECT_CHAR,
  idx,
})

export const deselectChar = (idx: number): Action => ({
  type: ActionType.DESELECT_CHAR,
  idx,
})

export const submitWord = (word: string): Action => ({
  type: ActionType.SUBMIT_WORD,
  word,
})


