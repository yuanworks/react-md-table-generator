import { Map } from "immutable";

const initialState = Map({

  fullscreen : false,
  theme      : 'light',
});

export default function settings(state = initialState, action) {

  const { type, payload } = action;

  switch (type) {
    case 'SETTINGS_SET_FULLSCREEN':
      return state.set('fullscreen', payload.fullscreen);

    default:
      return state;
  }
}
