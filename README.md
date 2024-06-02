# React Markdown Table Generator

Easily create Markdown Tables without having to be an Ascii Art professional.

Deployed in Vercel: https://react-md-table-generator.vercel.app/

![react_md_table](https://user-images.githubusercontent.com/3508123/66262015-18d2c680-e813-11e9-8885-29439a869849.gif)

## To Run

```
yarn install
yarn start
```

Or

```
npm install
npm start
```

The server will be running on http://localhost:3003

## Rationale

This project is built using React + Redux hooks. It is my first project moving away from Class Components into Functional.

Building a good table generator is difficult because of ContentEditable's unexpected and slightly unpredictable results, especially across browsers.

## TO DO LIST

### Misc

- [x] deploy to Vercel
- [ ] Save redux to local storage (debounced)
- [ ] Try Redux Toolkit / immer
- [ ] Add bottoms links to Github, React, etc.

### Main Editor
- [ ] Render markdown->html inside cells
- [ ] Add undo / redo through Redux
- [ ] Import -> clear after right import
- [ ] Import -> fallback for errors
- [ ] Render emojis/CJK characters in smaller width/size <- seems like this is impossible
- [ ] Copy to clipboard

### Formatting

### Layout
- [x] Fixed toolbar (fullscreen mode)
- [ ] Add zoom in/out

### CSS
- [-] Add SASS color constants <- remove because it should just be CSS vars
- [ ] Move to CSS Modules ?
- [ ] Add dark mode

### Parser
- [ ] Fall-back if parsing has errors

### Tests
- [x] Set puppeteer for E2E testing
- [ ] Util unit tests ?
- [ ] CI tests + coverage

### Known Issues / Bugs
- [ ] Firefox / Chrome works differently (spaces and enters)
- [ ] Check firefox
- [ ] Check safari/opera
- [ ] Check IE
- [ ] Deleting all text inside a cell on chrome sometimes doesn't trigger onChange event
- [ ] Irregular icons such as emojis or chinese characters break the fixed-width tables

## LICENSE

MIT License.

Test Table:

| Default Alignment | Center | Right |
| --- |:---:|----:|
| With \| Pipe | First **Row** 2 | First Row 3 |
| Second Row 1 | Second Row 2 | Second Row 3 |
| `Code` | *Italics* | **Bold** |
