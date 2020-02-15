import React from 'react';
import { useDispatch } from 'react-redux';

import * as SettingsActions from '../../redux/actions/SettingsActions';

import Button from '../layout/Button';
import { FaDownload } from 'react-icons/fa';

export default function ImportMarkdownButton({ ...props }) {

  const dispatch = useDispatch();
  const setFullscreen = () => dispatch(SettingsActions.showImportModal());

  const Icon = <FaDownload />;

  return (
    <Button icon={Icon} onClick={setFullscreen} {...props}>
      Import Markdown
    </Button>
  )
}
