export const getCellValue = (rowIndex, columnIndex) => function(state) {
  return state.table.getIn([ 'rows', rowIndex, columnIndex ]);
};

export const getRowCount = () => function(state) {
  return state.table.get('rowCount')
};
