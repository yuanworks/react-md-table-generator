import { List, Map } from "immutable";

const initialState = Map({
  rows: List(),
  test: 'caca',
})

export default function table(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    case 'test':
      return state.set('test', payload);

    default:
      return state;
  }
}
