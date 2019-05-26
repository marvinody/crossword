export enum ActionType {
  SELECT_CHAR = 1,
  DESELECT_CHAR,
  LOAD_WORD,
  SUBMIT_WORD,
}


export type Action = {
  type: ActionType.SELECT_CHAR,
  idx: number,
} | {
  type: ActionType.DESELECT_CHAR,
  idx: number,
} | {
  type: ActionType.LOAD_WORD,
  word: string,
} | {
  type: ActionType.SUBMIT_WORD,
}

export const loadWord = (word: string): Action => ({
  type: ActionType.LOAD_WORD,
  word,
})

export const selectChar = (idx: number): Action => ({
  type: ActionType.SELECT_CHAR,
  idx,
})

export const deselectChar = (idx: number): Action => ({
  type: ActionType.DESELECT_CHAR,
  idx,
})

export const submitWord = (): Action => ({
  type: ActionType.SUBMIT_WORD,
})


