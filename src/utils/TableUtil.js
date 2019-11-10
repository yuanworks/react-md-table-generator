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

    parsedRow.forEach(cell => {
      let trimRow = this.markdownToHtml(cell.trim());

      trimRow = trimRow.replace(/\\\|/g, '|');
      
      // this rule is not working :S
      trimRow = trimRow.replace( new RegExp('\\\|', 'g'), '|');
      
      //trimRow = trimRow.split('\\|').join('|');
      
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
    let cell = row.get(columnIndex) || '';

    cell = this.htmlToMarkdown(cell);

    maxColumnLength = Math.max(cell.length, maxColumnLength);
  });

  return maxColumnLength;
}

const MARKDOWN_TO_HTML = [
  { pattern: '\\*\\*(.*)\\*\\*', replacer: (_, p) => {console.log(_, p); return `<b>${p}</b>`} },
  { pattern: '\\*(.*)\\*', replacer: (_, p) => {console.log(_, p); return `<i>${p}</i>`} },
  // this rule doesn't work ? { pattern: '\\\|', replacer: '|' }, //(...args) => { console.log(args); return '+' }} //'(CA)' },
]

export function markdownToHtml(markdown) {
  let html = markdown || '';

  console.log(html);

  for (let rule of MARKDOWN_TO_HTML) {
    html = html.replace(new RegExp(rule.pattern, 'g'), rule.replacer);
  }

  console.log(html);

  return html;
}

const HTML_ENTITIES = {
  '&amp;'  : '&',
  '&lt;'   : '<',
  '&gt;'   : '>',
  '&nbsp;' : ' ',
  //'\*'     : '<b>',
  //'<\/b>'   : '**',
};

const HTML_TO_MARKDOWN = [
  { pattern: '<b>(.*?)<\/b>', replacer: (match, p) => {console.log(match, p); return `**${p}**`} },
  { pattern: '<i>(.*?)<\/i>', replacer: (match, p) => {console.log(match, p); return `*${p}*`} },
  { pattern: '<code>(.*?)</code>', replacer: (_, p) => `\`${p}\``}
];

export function htmlToMarkdown(html) {
  let markdown = html || '';

  for (let rule of HTML_TO_MARKDOWN) {
    markdown = markdown.replace(new RegExp(rule.pattern, 'g'), rule.replacer);
  }
  
  for (let key in HTML_ENTITIES) {
    markdown = markdown.replace(new RegExp(key, 'g'), HTML_ENTITIES[key]);
  }

  markdown = markdown.replace(/\|/g, '\\|');

  if (markdown.endsWith('<br>')) {
    markdown = markdown.slice(0, -4);
  }

  return markdown;
}

export function inlineParse(html) {
  return html.replace(/`(.+?)`/g, (_, p) => ` <code>${p}</code> &nbsp;`);
}