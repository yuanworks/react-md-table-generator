export const editCell = (rowIndex, columnIndex, value) => ({
  type    : 'TABLE_EDIT_CELL',
  payload : { rowIndex, columnIndex, value },
});

