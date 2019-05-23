import React from 'react';
import { Char } from './Char';
import './CharSelect.scss';
export type CharInfo = {
  char: string,
  order: number,
  isSelected: boolean,
}

type Props = {
  letters: Array<CharInfo>
};
type State = {
  isMouseDown: boolean;
}

export class CharSelect extends React.Component<Props, State> {
  readonly state: State = {
    isMouseDown: false,
  }

  handleMouseDown = () => {
    this.setState({
      isMouseDown: true,
    })
  }

  handleMouseUp = () => {
    this.setState({
      isMouseDown: false,
    })
  }

  render() {
    const max = this.props.letters.length;
    return (
      <div className='charSelect'>
        {this.props.letters.map(char => {
          return (<Char char={char} max={max} ></Char>)
        })}
      </div>
    )
  }

}
