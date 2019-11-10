import TABLE from "../../constants/TableConstants";
import * as TableUtil from '../../utils/TableUtil';

export const getEditingCellValue = toMarkdown => function(state) {
  return cellValueFromState(state, state.table.get(TABLE.State.activeRow), state.table.get(TABLE.State.activeColumn), toMarkdown);
}

export const getCellValue = (rowIndex, columnIndex, toMarkdown) => function(state) {
  return cellValueFromState(state, rowIndex, columnIndex, toMarkdown);
};

function cellValueFromState(state, rowIndex, columnIndex, toMarkdown = false) {
  let value = state.table.getIn([ TABLE.State.rows, rowIndex, columnIndex ]);

  if (toMarkdown && value) {
    value = TableUtil.htmlToMarkdown(value);
  }

  return value;
}

export const getRowCount = () => function(state) {
  return state.table.get(TABLE.State.rowCount);
};

export const getColumnCount = () => function(state) {
  return state.table.get(TABLE.State.columnCount);
};

export const isLastColumn = columnIndex => function(state) {
   return state.table.get(TABLE.State.columnCount) === columnIndex+1;
};

export const isEditingCell = (rowIndex, columnIndex) => function(state) {
  return state.table.get(TABLE.State.activeRow) === rowIndex && state.table.get(TABLE.State.activeColumn) === columnIndex && state.table.get(TABLE.State.editingCell)
};

export const isEditingRow = rowIndex => function(state) {
  return rowIndex !== undefined && state.table.get(TABLE.State.activeRow) === rowIndex;
};

export const isEditingColumn = columnIndex => function(state) {
  return columnIndex !== undefined && state.table.get(TABLE.State.activeColumn) === columnIndex;
};

export const getMaxColumnLength = rowIndex => function(state) {
  return state.table.getIn([ TABLE.State.maxColumnLength, rowIndex ]) || 0;
};

export const isExtraCell = (rowIndex, columnIndex = undefined) => function(state) {
  return (
    (rowIndex !== undefined && state.table.get(TABLE.State.rowCount) === rowIndex) ||
    (columnIndex !== undefined && state.table.get(TABLE.State.columnCount) === columnIndex)
  );
};
