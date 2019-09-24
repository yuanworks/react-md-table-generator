import { List, Map } from "immutable";

const initialState = Map({
  rows: List([
    List([ 'Heading 1', 'Heading 2', 'Heading 3', ]),
    List([ 'First Row 1', 'First Row 2', 'First Row 3', ]),
    List([ 'Second Row 1', 'Second Row 2', 'Second Row 3', ]),
  ]),
  test: 'caca',
})

export default function table(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    case 'test':
      return state.set('test', payload);

    case 'TABLE_EDIT_CELL': {
      const { rowIndex, columnIndex, value } = payload;
      return state.setIn(['rows', rowIndex, columnIndex], value);
    }

    default:
      return state;
  }
}
