export const setFullscreen = fullscreen => ({
  type    : 'SETTINGS_SET_FULLSCREEN',
  payload : { fullscreen },
});

export const showImportModal = () => ({
  type: 'SETTINGS_SHOW_IMPORT_MODAL',
});

export const hideImportModal = () => ({
  type: 'SETTINGS_HIDE_IMPORT_MODAL',
});
