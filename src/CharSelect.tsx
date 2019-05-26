import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Char } from './Char';
import { CharConnector } from './CharConnector';
import './CharSelect.scss';
import { deselectWord, loadWord, selectWord } from './store/actions';
import { State as StoreState } from './store/reducers';

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {

  };


type State = {

}

export class DisconnectedCharSelect extends React.Component<Props, State> {
  readonly state: State = {

  }
  render() {
    const max = this.props.letters.length;
    return (
      <div>
        <CharConnector letters={this.props.letters}></CharConnector>
        <ul className='charSelect'>
          {this.props.letters.map((char, idx) => {
            return (<Char
              key={idx}
              idx={idx}
              char={char}
              max={max}
              select={this.props.select}
              deselect={this.props.deselect}
            ></Char>)
          })}
        </ul>
      </div>
    )
  }
  componentDidMount() {
    this.props.load('walked');
  }
}

const mapStateToProps = (state: StoreState) => ({
  letters: state.wordSelect.letters,
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  load: (word: string) => dispatch(loadWord(word)),
  select: (idx: number) => dispatch(selectWord(idx)),
  deselect: (idx: number) => dispatch(deselectWord(idx)),
});

export const CharSelect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DisconnectedCharSelect);
