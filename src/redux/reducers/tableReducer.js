import { List, Map } from "immutable";

const initialState = Map({

  editingRow    : null,
  editingColumn : null,

  rowCount    : 3,
  columnCount : 3,

  rows: List([
    List([ 'Heading 1', 'Heading 2', 'Heading 3', ]),
    List([ 'First Row 1', 'First Row 2', 'First Row 3', ]),
    List([ 'Second Row 1', 'Second Row 2', 'Second Row 3', ]),
  ]),
})

export default function table(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    case 'TABLE_EDIT_CELL_VALUE': {
      const { rowIndex, columnIndex, value } = payload;
      return state.setIn(['rows', rowIndex, columnIndex], value);
    }

    case 'TABLE_SET_EDITING_CELL': {
      const { editingRow, editingColumn } = payload;
      return state.merge({ editingRow, editingColumn });
    }

    case 'TABLE_MOVE_EDITING_CELL': {
      const editingRow    = state.get('editingRow');
      const editingColumn = state.get('editingColumn');
      const rowCount      = state.get('rowCount');
      const columnCount   = state.get('columnCount');
      
      switch (payload.direction) {
        case 'down':
          return state.merge({
            editingRow    : (editingRow + 1) % rowCount,
            editingColumn : (editingColumn + Math.floor((editingRow + 1) / rowCount)) % columnCount,
          });

        case 'right':
          return state.merge({
            editingRow    : (editingColumn + 1) % columnCount,
            editingColumn : (editingRow + Math.floor((editingColumn + 1) / columnCount)) % rowCount,
          });
      }
    }

    default:
      return state;
  }
}
