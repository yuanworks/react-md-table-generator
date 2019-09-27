export const editValue = (rowIndex, columnIndex, value) => ({
  type    : 'TABLE_EDIT_CELL_VALUE',
  payload : { rowIndex, columnIndex, value },
});

export const setEditingCell = (editingRow, editingColumn) => ({
  type    : 'TABLE_SET_EDITING_CELL',
  payload : { editingRow, editingColumn },
});

export const moveEditingCell = direction => ({
  type    : 'TABLE_MOVE_EDITING_CELL',
  payload : { direction },
});

export const importMarkdownTable = markdown => ({
  type    : 'TABLE_IMPORT_DATA',
  payload : { markdown },
});
