import { string } from "postcss-selector-parser";

export function parseMarkdown(markdown) {

  const lines = markdown.match(/.+/g);
  const result = Array();

  lines.forEach((line, i) => {
 
    // Headers must always exists for most parsers, so we assume this line is the delimiter:
    if (i === 1) {
      return;
    }

    // ## Negative lookbehind would solve it in one line, but it's only supported by Chrome ;(
    //const rows = line.split(/(?<!\\)\|/g);
    
    // Instead, we have to do this:
    const rows = line.split(/\|/g);
    for (let i = 0; i < rows.length-1; i++) {
      
      if (rows[i].endsWith('\\')) {
        for (let j = i + 1; j < rows.length; j++) {
          
          rows[i] += `|${rows[j]}`;
          const lastRow = rows[j];
          rows[j] = '';

          if (!lastRow.endsWith('\\')) {
            break;
          }
        }
      }
    }

    result.push(Array());
    console.log(rows);

    rows.forEach(row => {
      if (row.trim()) {
        result[result.length -1].push(row.trim());
      }
    })
  });

  console.log(result);

  return result;
}

