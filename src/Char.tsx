import React from 'react';
import { CharInfo } from './store/reducers';
type Props = {
  char: CharInfo
  max: number
}
export const Char: React.FC<Props> = props => {
  return (
    <div className='char'>{props.char.char}</div>
  )
}
