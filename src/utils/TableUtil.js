export function parseMarkdown(markdown) {

  const lines = markdown.match(/.+/g);
  const rows = [];
  let maxCellLength = 0;

  lines.forEach((line, i) => {
 
    // Headers must always exists for most parsers, so we assume this line is the delimiter:
    if (i === 1) {
      // TODO: parse text alignment
      return;
    }

    // ! Negative lookbehind would solve it in one line, but it's only supported by Chrome ;(
    // const rows = line.split(/(?<!\\)\|/g);
    
    // Instead, we have to do this:
    const parsedRow = line.split(/\|/g);
    for (let i = 0; i < parsedRow.length-1; i++) {
      
      if (parsedRow[i].endsWith('\\')) {
        for (let j = i + 1; j < parsedRow.length; j++) {
          
          parsedRow[i] += `|${parsedRow[j]}`;
          const lastRow = parsedRow[j];
          parsedRow[j] = '';

          if (!lastRow.endsWith('\\')) {
            break;
          }
        }
      }
    }

    rows.push([]);

    parsedRow.forEach(row => {
      const trimRow = row.trim();
      
      if (trimRow) {
        rows[rows.length -1].push(trimRow);

        if (trimRow.length > maxCellLength) {
          maxCellLength = trimRow.length;
        }
      }
    })
  });

  return { rows, maxCellLength };
}

export function getDimensions(immutableRows) {
  
  let rowCount = 0;
  let columnCount = 0;

  rowCount = immutableRows.size;
  columnCount = immutableRows.first().size;

  return { rowCount, columnCount };
}
