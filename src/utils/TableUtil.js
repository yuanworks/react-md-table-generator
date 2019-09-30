export function parseMarkdown(markdown) {

  const lines = markdown.match(/.+/g);
  const rows = [];
  const maxColumnLength = [];

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

    let rowIndex = 0;

    parsedRow.forEach(row => {
      const trimRow = row.trim();
      
      if (trimRow) {
        rows[rows.length -1].push(trimRow);
        maxColumnLength[rowIndex] = Math.max(trimRow.length, maxColumnLength[rowIndex] || 0);

        rowIndex++;
      }
    })
  });

  return { rows, maxColumnLength };
}

export function getDimensions(immutableRows) {
  
  let rowCount = 0;
  let columnCount = 0;

  rowCount = immutableRows.size;
  columnCount = immutableRows.first().size;

  return { rowCount, columnCount };
}

export function calculateMaxLength(immutableRows, columnIndex) {

  let maxColumnLength = 0;

  immutableRows.forEach(row => {
    const cellLength = (row.get(columnIndex) && row.get(columnIndex).length) || 0;
    maxColumnLength = Math.max(cellLength, maxColumnLength);
  });

  return maxColumnLength;
}

export function unescapeMarkdown(markdown) {
  let string = markdown || '';
  
  string = string.replace(/\\\|/g, '|');

  for (let key in HTML_ENTITIES) {
    string = string.replace(new RegExp(HTML_ENTITIES[key], 'g'), key);
  }

  return string;
}

const HTML_ENTITIES = {
  '&amp;'  : '&',
  '&lt;'   : '<',
  '&gt;'   : '>',
  '&nbsp;' : ' ',
};

export function htmlToMarkdown(html) {
  let markdown = html || '';

  for (let key in HTML_ENTITIES) {
    markdown = markdown.replace(new RegExp(key, 'g'), HTML_ENTITIES[key]);
  }

  markdown = markdown.replace(/\|/g, '\\|');

  return markdown;
}