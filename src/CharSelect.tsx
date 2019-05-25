import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Char } from './Char';
import './CharSelect.scss';
import { loadWord } from './store/actions';
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
      <div className='charSelect'>
        {this.props.letters.map(char => {
          return (<Char char={char} max={max} ></Char>)
        })}
      </div>
    )
  }
  componentDidMount() {
    this.props.load('cats');
  }
}

const mapStateToProps = (state: StoreState) => ({
  letters: state.wordSelect.letters,
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  load: (word: string) => dispatch(loadWord(word)),
});

export const CharSelect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DisconnectedCharSelect);
