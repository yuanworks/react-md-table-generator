# React Markdown Table Generator

Easily create Markdown Tables without having to be an Ascii Art professional.

![react_md_table](https://user-images.githubusercontent.com/3508123/66262015-18d2c680-e813-11e9-8885-29439a869849.gif)

## To Run

```
yarn install
yarn start
```

Or,

```
npm install
npm start
```

The server will start on `http://localhost:3003`.

## Rationale

This project is built using React + Redux hooks. It is my first project moving away from Class Components into Functional.

Building a good table generator is difficult because of ContentEditable's unexpected and slightly unpredictable results, especially across browsers.

## TO DO LIST

### Misc

- [x] Push the initial commit
- [x] Delete the default README.md
- [x] Make a Todo List
- [x] Add Redux
- [x] Add SASS support
- [x] Add immutable
- [x] Deploy to EC9
- [ ] Buy domain for deployment
- [ ] Set SSL

### Tasks
- [x] Create "table" JSON object
- [ ] Save redux to local storage (debounced)
- [ ] Try Redux Toolkit
- [x] Create redux boilerplate
- [x] Keyboard control (tab + shift tab for left-right, down/up keyboard)
- [x] css for input + cell similar
- [x] markdown table components
- [x] parse markdown table to Array
- [x] add original whitespaces
- [x] create default mock table
- [x] calculate whitespace on changes
- [x] whitespace should be column by column basis, not whole table
- [x] escape | characters
- [x] Change implementation to table
- [ ] Menu bar
- [x] Input bar like excel for table row
- [x] -> when clearing focus, it should disable the input bar and clear it
- [x] insert extra cells
- [ ] Render markdown->html inside cells
- [x] Delete row functionality
- [x] Delete column functionality
- [x] React Spring for Delete Cell fade animation
- [ ] Add undo / redo
- [x] Insert at position for rows/column
- [x] Remove input bar / delete / add column icons when unfocusing table
- [ ] Import CSV

### Main Editor
- [x] Movement up/down with CTRL/CMD key held

### Formatting
- [x] Alignment for columns
- [x] Clear alignment if already selected
- [x] Option to remove filling whitespaces

### Layout
- [x] Button component
- [x] Add alignment icons
- [ ] Move to CSS Modules ?
- [ ] Add night theme
- [x] Add windowed/fullscreen support
- [ ] Fixed toolbar (fullscreen mode)

### CSS
- [x] Column view for panes

### Parser
- [x] Parse text alignment

### Tests
- [x] Set puppeteer for E2E testing
- [ ] Util unit tests ?
- [ ] CI tests + coverage

### Known Issues / Bugs
- [x] Chrome -> Enters add newlines
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
