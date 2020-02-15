export const isFullscreen = () => function(state) {
  return state.settings.get('fullscreen');
};

export const isImportModalOpen = () => function(state) {
  return state.settings.get('importModalOpen');
};
