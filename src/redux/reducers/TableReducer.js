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

      return state.withMutations(state => {
        state.setIn(['rows', rowIndex, columnIndex], value);
        const maxLength = TableUtil.calculateMaxLength(state.get('rows'), columnIndex);
        state.setIn(['maxColumnLength', columnIndex], maxLength);
      });
    }

    case 'TABLE_INSERT_ROW': {
      const rowCount = state.get('rowCount');
      let rows = state.get('rows');

      rows = rows.insert(action.payload.rowIndex, List([]));

      return state.merge({
        rowCount: rowCount + 1,
        rows,
      });
    }

    case 'TABLE_INSERT_COLUMN': {
      const columnCount = state.get('columnCount');
      let rows = state.get('rows')

      rows = rows.map(row => row.insert(action.payload.columnIndex, ''));

      console.log('RESET maxColumnLength');
      
      return state.merge({
        columnCount: columnCount + 1,
        rows,
      });
    }

    case 'TABLE_DELETE_ROW': {
      const rowCount = state.get('rowCount');

      const { rowIndex } = payload;
      
      state = state.set('rowCount', rowCount - 1);
      return state.deleteIn([ 'rows', rowIndex ]);
    }

    case 'TABLE_DELETE_COLUMN': {
      const columnCount = state.get('columnCount');

      const { columnIndex } = payload;
      let rows = state.get('rows');

      rows = rows.map(row => row.filter((_, i) => i !== columnIndex));

      return state.merge({
        rows,
        columnCount: columnCount - 1,
      });
    }

    case 'TABLE_SET_EDITING_CELL': {
      const { editingRow, editingColumn } = payload;
      return state.merge({ editingRow, editingColumn });
    }

    case 'TABLE_MOVE_EDITING_CELL': {
      const editingRow    = state.get('editingRow');
      const extraRowCount = state.get('rowCount') + 1;
      let moveToRow = 0;
      
      switch (payload.direction) {
        case 'down':
          moveToRow = 1;
          break;

        case 'up':
          moveToRow = -1;
          break;

        default:
          return state;
      }

      return state.set('editingRow', (extraRowCount + editingRow + moveToRow) % extraRowCount);
    }

    case 'TABLE_IMPORT_DATA': {
      let { rows, maxColumnLength } = TableUtil.parseMarkdown(action.payload.markdown);
      rows = fromJS(rows);
      const { rowCount, columnCount } = TableUtil.getDimensions(rows);

      return state.merge({
        rows          : fromJS(rows),
        maxColumnLength : fromJS(maxColumnLength),
        rowCount,
        columnCount,
      });
    }

    default:
      return state;
  }
}
