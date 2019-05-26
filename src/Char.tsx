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
  const inc = (360 / props.max) | 0 // chars into the circle
  const deg = props.idx * inc + 'deg'
  const style = {
    transform: `rotate(${deg}) translate(100px)`
  }
  const singleCharStyle = {
    transform: `rotate(-${deg})`
  }
  return (
    <li className='char container'
      onClick={onClick}
      style={style}
    >
      <div className='single char' style={singleCharStyle}>
        {props.char.char}
      </div>
    </li>
  )
}
