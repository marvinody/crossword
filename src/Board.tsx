import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import './CharSelect.scss';
import { deselectChar, selectChar, submitWord } from './store/actions';
import { State as StoreState } from './store/reducers';

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
    return (
      <div >

      </div>
    )
  }
}

const mapStateToProps = (state: StoreState) => ({
  letters: state.wordSelect.letters,
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  select: (idx: number) => dispatch(selectChar(idx)),
  deselect: (idx: number) => dispatch(deselectChar(idx)),
  submit: () => dispatch(submitWord()),
});

export const Board = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DisconnectedBoard);
