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

## TO DO LIST

### Misc

- [x] Push the initial commit
- [x] Delete the default README.md
- [x] Make a Todo List
- [x] Add Redux
- [x] Add SASS support
- [x] Add immutable
- [x] Deploy to EC9

### Tasks
- [x] Create "table" JSON object
- [ ] Save redux to local storage (debounced)
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
- [ ] Add UNDO
- [x] Insert at position for rows/column
- [x] Remove input bar / delete / add column icons when unfocusing table

### FORMATTING
- [x] Alignment for columns
- [x] Clear alignment if already selected
- [ ] Option to remove filling whitespaces

### LAYOUT
- [x] Button component

### CSS
- [x] Column view for panes

### Tests
- [x] Set puppeteer for E2E testing
- [ ] Util unit tests ?
- [ ] CI tests + coverage

### Issues / bugs
- [x] Chrome -> Enters add newlines
- [ ] Firefox / Chrome works differently (spaces and enters)
- [ ] Check firefox
- [ ] Check safari/opera
- [ ] Check IE

## LICENSE

TBD.

Test Table:

| Column 1 | Column 2      |
|:--------:|---------------:|
|  | `right-aligned` |
