import { Map } from "immutable";

const initialState = Map({

  fullscreen      : false,
  theme           : 'light',
  importModalOpen : false,
});

export default function settings(state = initialState, action) {

  const { type, payload } = action;

  switch (type) {
    case 'SETTINGS_SET_FULLSCREEN':
      return state.set('fullscreen', payload.fullscreen);

    case 'SETTINGS_HIDE_IMPORT_MODAL':
      return state.set('importModalOpen', false);

    case 'SETTINGS_SHOW_IMPORT_MODAL':
      return state.set('importModalOpen', true);

    default:
      return state;
  }
}
