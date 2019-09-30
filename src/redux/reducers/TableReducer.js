import { Map, List, fromJS } from "immutable";
import * as TableUtil from "../../utils/TableUtil";

const initialState = Map({

  editingRow    : null,
  editingColumn : null,
  
  rowCount    : 3,
  columnCount : 3,

  maxColumnLength : Map(),

  rows: List([
    List(['','','']),
    List(['','','']),
    List(['','','']),
  ]),
});

export default function table(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    case 'TABLE_EDIT_CELL_VALUE': {
      const rowCount = state.get('rowCount');
      const columnCount = state.get('columnCount');

      const { rowIndex, columnIndex, value } = payload;

      if (rowIndex === rowCount) {
        state = state.set('rowCount', rowIndex + 1);
      }

      if (columnIndex === columnCount) {
        state = state.set('columnCount', columnCount + 1);
      }

      state = state.setIn(['rows', rowIndex, columnIndex], value);
      const maxLength = TableUtil.calculateMaxLength(state.get('rows'), columnIndex);

      return state.setIn(['maxColumnLength', columnIndex], maxLength);
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
        
        default:
          return state;
      }
    }

    case 'TABLE_IMPORT_DATA':
      let { rows, maxColumnLength } = TableUtil.parseMarkdown(action.payload.markdown);
      rows = fromJS(rows);
      const { rowCount, columnCount } = TableUtil.getDimensions(rows);

      return state.merge({
        rows          : fromJS(rows),
        maxColumnLength : fromJS(maxColumnLength),
        rowCount,
        columnCount,
      });

    default:
      return state;
  }
}
