export const isFullscreen = () => function(state) {
  return state.settings.get('fullscreen');
};
