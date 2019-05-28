import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import './Board.scss';
import { State as StoreState, WordCharState } from './store/reducers';

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {

  };


type State = {
}

export class DisconnectedBoard extends React.Component<Props, State> {
  readonly state: State = {
    isMouseDown: false,
  }
  render() {
    const grid = this.makeGridOfDivs();
    this.props.board.words.forEach(w => {
      w.split.forEach(c => {
        const row = c.x - this.props.board.offset.x;
        const col = c.y - this.props.board.offset.y;
        const isHidden = c.state === WordCharState.HIDDEN;
        let className = 'cell ';
        switch (c.state) {
          case WordCharState.HIDDEN:
            className += 'hidden'; break;
          case WordCharState.VISIBLE:
            className += 'visible'; break;
        }
        if (grid[col][row].props.className.includes('visible')) {
          return;
        }
        grid[col][row] = <div className={className}>{isHidden ? ' ' : c.char}</div>
      })
    })
    return (
      <div className='grid'>
        {grid.flatMap(row => <div className='row'>{row}</div>)}
      </div>
    )
  }

  makeGridOfDivs() {
    const grid: Array<Array<ReactElement>> = [];
    for (let col = 0; col < this.props.board.height; col++) {
      grid.push([])
      for (let row = 0; row < this.props.board.width; row++) {
        grid[col].push(<div className='cell empty'></div>)
      }
    }
    return grid;
  }
}

const mapStateToProps = (state: StoreState) => ({
  board: state.board,
})
const mapDispatchToProps = (dispatch: Dispatch) => ({

});

export const Board = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DisconnectedBoard);
