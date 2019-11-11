import { Map, List, fromJS } from "immutable";
import * as TableUtil from "../../utils/TableUtil";

const initialState = Map({

  // Editing or highlighted row, column index:
  activeRow    : null,
  activeColumn : null,

  // If the cell is being directly edited (true if cell, false if toolbar)
  editingCell  : null,
  
  // Total number of rows and columns:
  rowCount    : 3,
  columnCount : 3,

  // Extra whitespace on each column to adjust them vertically:
  adjustWidth : true,

  // Max string length per column index:
  maxColumnLength : List(),

  // Alignment for columns (null, 'left', 'center', 'right'):
  columnsAlignment: List(),

  // List of rows (column sized):
  rows: List([
    List(['','','']),
    List(['','','']),
    List(['','','']),
  ]),
});

export default function table(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    case 'TABLE_EDIT_CELL':
    case 'TABLE_EDIT_ACTIVE_CELL': {
      const rowCount = state.get('rowCount');
      const columnCount = state.get('columnCount');

      let { rowIndex, columnIndex, editingCell, value } = payload;

      if (rowIndex === undefined && columnIndex === undefined) {
        rowIndex = state.get('activeRow');
        columnIndex = state.get('activeColumn');
      }

      return state.withMutations(state => {

        state.set('editingCell', editingCell);

        if (rowIndex === rowCount) {
          state.set('rowCount', rowIndex + 1);
          state.set('rows', state.get('rows').push(List([])));
        }
  
        if (columnIndex === columnCount) {
          state.set('columnCount', columnCount + 1);
        }

        state.setIn(['rows', rowIndex, columnIndex], value);
        const maxLength = TableUtil.calculateMaxLength(state.get('rows'), columnIndex);
        state.setIn(['maxColumnLength', columnIndex], maxLength);
      });
    }

    case 'TABLE_FORMAT_ACTIVE_CELL': {

      const { start, end, tag } = action.payload;
      const activeRow = state.get('activeRow');
      const activeColumn = state.get('activeColumn');

      let value = state.getIn([ 'rows', activeRow, activeColumn ]);

      let format = [];

      format.push(value.substring(0, start));
      format.push(`<${tag}>${value.substring(start, end)}</${tag}>`);
      format.push(value.substring(end));

      return state.setIn(['rows', activeRow, activeColumn], format.join(''));
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
      const { columnIndex } = action.payload;

      const columnCount = state.get('columnCount') + 1;

      let rows = state.get('rows');
      rows = rows.map(row => row.insert(columnIndex, ''));
      
      const maxColumnLength = state.get('maxColumnLength').insert(columnIndex, TableUtil.calculateMaxLength(rows), columnIndex);
      
      return state.merge({
        columnCount,
        rows,
        maxColumnLength,
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
    
    case 'TABLE_SET_COLUMN_ALIGNMENT': {
      const { columnIndex, alignment } = payload;
      return state.setIn([ 'columnsAlignment', columnIndex ], alignment);
    }

    case 'TABLE_TOGGLE_ADJUST_WIDTH': {
      const adjustWidth = state.get('adjustWidth');
      return state.set('adjustWidth', !adjustWidth);
    }

    case 'TABLE_CLEAR_ACTIVE_CELL':
      return state.set({
        activeRow    : null,
        activeColumn : null,
      });
    
    case 'TABLE_SET_ACTIVE_CELL': {
      const { activeRow, activeColumn } = payload;
      return state.merge({ activeRow, activeColumn });
    }

    case 'TABLE_MOVE_ACTIVE_CELL': {
      const activeRow    = state.get('activeRow');
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

      return state.set('activeRow', (extraRowCount + activeRow + moveToRow) % extraRowCount);
    }

    case 'TABLE_IMPORT_DATA': {
      const { rows, maxColumnLength, columnsAlignment } = TableUtil.parseMarkdown(action.payload.markdown);
      const immutableRows = fromJS(rows);
      const { rowCount, columnCount } = TableUtil.getDimensions(immutableRows);

      return state.merge({
        rows             : immutableRows,
        maxColumnLength  : fromJS(maxColumnLength),
        columnsAlignment : fromJS(columnsAlignment),
        rowCount,
        columnCount,
      });
    }

    default:
      return state;
  }
}
