import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { CharConnector } from './CharConnector';
import './CharSelect.scss';
import { deselectChar, loadLevel, selectChar, submitWord } from './store/actions';
import { CharInfo, newWord, State as StoreState, Word, ZP } from './store/reducers';

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {

  };


type State = {
  isMouseDown: boolean,
}

export class DisconnectedCharSelect extends React.Component<Props, State> {
  readonly state: State = {
    isMouseDown: false,
  }
  mouseDown = (char: CharInfo, idx: number) => {
    this.setState({
      isMouseDown: true,
    }, () => {
      this.toggleChar(char, idx);
    })
  }
  mouseUp = () => {
    this.setState({ isMouseDown: false, })
    this.props.submit(
      this.props.letters
        .filter(c => c.isSelected)
        .sort((a, b) => a.order - b.order)
        .map(c => c.char)
        .join('')
    );
  }
  // lets us change the char only if the mouse is down already
  toggleChar = (char: CharInfo, idx: number) => {
    if (!this.state.isMouseDown) return;
    if (char.isSelected) {
      this.props.deselect(idx);
    } else {
      this.props.select(idx);
    }
  }


  render() {
    const max = this.props.letters.length;
    return (
      <div className='selector container' onMouseUp={this.mouseUp}>
        <CharConnector letters={this.props.letters}></CharConnector>
        {/* <ul className='charSelect'>
          {this.props.letters.map((char, idx) => {
            return (<Char
              key={idx}
              idx={idx}
              char={char}
              max={max}
              toggleState={this.toggleChar}
              mouseDown={this.mouseDown}
            ></Char>)
          })}
        </ul> */}
      </div>
    )
  }

  componentDidMount() {
    this.props.load(
      'walked'.split(''),
      [
        newWord('walked', ZP, true),
        newWord('wake', ZP, false),
        newWord('lake', { x: 2, y: 0 }, false),
        newWord('elk', { x: 2, y: 3 }, true),
      ],
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  letters: state.wordSelect.letters,
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  load: (letters: Array<string>, words: Array<Word>) => dispatch(loadLevel(letters, words)),
  select: (idx: number) => dispatch(selectChar(idx)),
  deselect: (idx: number) => dispatch(deselectChar(idx)),
  submit: (w: string) => dispatch(submitWord(w)),
});

export const CharSelect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DisconnectedCharSelect);
