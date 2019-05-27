import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Char } from './Char';
import { CharConnector } from './CharConnector';
import './CharSelect.scss';
import { deselectChar, loadLevel, selectChar, submitWord } from './store/actions';
import { CharInfo, State as StoreState, Word } from './store/reducers';

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
    this.props.submit();
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
      <div onMouseUp={this.mouseUp}>
        <CharConnector letters={this.props.letters}></CharConnector>
        <ul className='charSelect'>
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
        </ul>
      </div>
    )
  }

  componentDidMount() {
    this.props.load(
      'walked'.split(''),
      [],
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
  submit: () => dispatch(submitWord()),
});

export const CharSelect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DisconnectedCharSelect);
