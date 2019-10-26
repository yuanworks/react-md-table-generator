export const editCell = (rowIndex, columnIndex, value, editingCell) => ({
  type    : 'TABLE_EDIT_CELL',
  payload : { rowIndex, columnIndex, editingCell, value },
});

export const editActiveCell = value => ({
  type    : 'TABLE_EDIT_ACTIVE_CELL',
  payload : { value }
})

export const setActiveCell = (activeRow, activeColumn) => ({
  type    : 'TABLE_SET_ACTIVE_CELL',
  payload : { activeRow, activeColumn },
});

export const clearActiveCell = () => ({
  type: 'TABLE_CLEAR_ACTIVE_CELL',
  payload : {},
})

export const moveActiveCell = direction => ({
  type    : 'TABLE_MOVE_ACTIVE_CELL',
  payload : { direction },
});

export const importMarkdownTable = markdown => ({
  type    : 'TABLE_IMPORT_DATA',
  payload : { markdown },
});

export const deleteRow = rowIndex => ({
  type    : 'TABLE_DELETE_ROW',
  payload : { rowIndex },
});

export const deleteColumn = columnIndex => ({
  type    : 'TABLE_DELETE_COLUMN',
  payload : { columnIndex },
});

export const insertRow = rowIndex => ({
  type    : 'TABLE_INSERT_ROW',
  payload : { rowIndex },
});

export const insertColumn = columnIndex => ({
  type    : 'TABLE_INSERT_COLUMN',
  payload : { columnIndex },
});