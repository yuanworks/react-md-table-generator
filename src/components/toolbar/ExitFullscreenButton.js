import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as SettingsActions from '../../redux/actions/SettingsActions';
import * as SettingsSelectors from '../../redux/selectors/SettingsSelectors';

import Button from '../layout/Button';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function ExitFullscreenButton() {

  const dispatch = useDispatch();
  const setFullscreen = () => dispatch(SettingsActions.setFullscreen(!isFullscreen));

  const isFullscreen = useSelector(SettingsSelectors.isFullscreen());

  const Icon = <FaExternalLinkAlt />;
  const text = isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Mode';

  return (
    <Button type='flat' icon={Icon} onClick={setFullscreen}>
      { text }
    </Button>
  )
}
