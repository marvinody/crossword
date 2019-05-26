import React from 'react';
import { CharInfo } from './store/reducers';
type toggleCharFn = (char: CharInfo, idx: number) => void;
type Props = {
  char: CharInfo
  idx: number,
  max: number
  toggleState: toggleCharFn,
  mouseDown: toggleCharFn,
}

export const Char: React.FC<Props> = props => {
  const toggle = () => props.toggleState(props.char, props.idx)
  const inc = (360 / props.max) | 0 // chars into the circle
  const deg = props.idx * inc + 'deg'
  const style = {
    transform: `rotate(${deg}) translate(100px)`
  }
  const singleCharStyle = {
    transform: `rotate(-${deg})`
  }
  const className = 'char container ' + (props.char.isSelected ? 'selected' : '');
  return (
    <li className={className}
      onMouseEnter={toggle}
      onMouseDown={() => props.mouseDown(props.char, props.idx)}
      style={style}
    >
      <div className='single char' style={singleCharStyle}>
        {props.char.char}
      </div>
    </li>
  )
}
