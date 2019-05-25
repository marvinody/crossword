export enum ActionType {
  SELECT_WORD = 1,
  DESELECT_WORD,
  LOAD_WORD,
}


export type Action = {
  type: ActionType.SELECT_WORD,
  idx: number,
} | {
  type: ActionType.DESELECT_WORD,
  idx: number,
} | {
  type: ActionType.LOAD_WORD,
  word: string,
}

export const loadWord = (word: string): Action => ({
  type: ActionType.LOAD_WORD,
  word,
})

export const selectWord = (idx: number): Action => ({
  type: ActionType.SELECT_WORD,
  idx,
})

export const deselectWord = (idx: number): Action => ({
  type: ActionType.DESELECT_WORD,
  idx,
})


