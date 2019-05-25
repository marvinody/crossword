import React from 'react';
import { CharInfo } from './store/reducers';
type toggleCharFn = (idx: number) => void;
type Props = {
  char: CharInfo
  idx: number,
  max: number
  select: toggleCharFn,
  deselect: toggleCharFn,
}

const toggleState = (char: CharInfo, idx: number, select: toggleCharFn, deselect: toggleCharFn) => {
  if (char.isSelected) {
    deselect(idx);
  } else {
    select(idx);
  }
}

export const Char: React.FC<Props> = props => {
  const onClick = () => toggleState(props.char, props.idx, props.select, props.deselect)
  const style = {
    transform: `translateY(${-15 - (5 * props.char.order)}px)`
  }
  return (
    <div className='char container'
      onClick={onClick}
      style={props.char.isSelected ? style : {}}
    >
      <div className='single char'>
        {props.char.char}
      </div>
    </div>
  )
}
