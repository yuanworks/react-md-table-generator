// export function getCellValue(state, rowIndex, columnIndex) {
//   return state.table.getIn([ 'rows', rowIndex, columnIndex ]);
// }

export const getCellValue = (rowIndex, columnIndex) => function(state) {
  return state.table.getIn([ 'rows', rowIndex, columnIndex ]);
};
