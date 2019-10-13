import TABLE from "../../constants/TableConstants";

export const getCellValue = (rowIndex, columnIndex) => function(state) {
  return state.table.getIn([ TABLE.State.rows, rowIndex, columnIndex ]);
};

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
  return state.table.get(TABLE.State.editingRow) === rowIndex && state.table.get(TABLE.State.editingColumn) === columnIndex
};

export const isEditingRow = rowIndex => function(state) {
  return rowIndex !== undefined && state.table.get(TABLE.State.editingRow) === rowIndex;
};

export const isEditingColumn = columnIndex => function(state) {
  return columnIndex !== undefined && state.table.get(TABLE.State.editingColumn) === columnIndex;
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
