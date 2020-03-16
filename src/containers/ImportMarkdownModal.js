import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as TableActions from '../redux/actions/TableActions';
import * as SettingsActions from '../redux/actions/SettingsActions';
import * as SettingsSelectors from '../redux/selectors/SettingsSelectors';

import { Modal, ModalFooter, ModalBody, ModalHeader } from '../components/layout/Modal';
import TextArea from '../components/layout/TextArea';
import Button from '../components/layout/Button';
import styles from './Layout.module.scss';

const IMPORT_TEXT_PLACEHOLDER =
`(Any line that doesn't start with | is ignored).
`;

export default function ImportMarkdownModal() {

  const [value, setValue] = useState('');
  const isOpen = useSelector(SettingsSelectors.isImportModalOpen());

  const dispatch = useDispatch();

  const hideModal = () => dispatch(SettingsActions.hideImportModal());

  const importClick = () => {
    dispatch(TableActions.importMarkdownTable(value));
    hideModal();
  }

  const changeValue = e => setValue(e.target.value);

  return (
    <Modal isOpen={isOpen} className={styles.importMarkdownModal} toggle={hideModal}>
      <ModalHeader toggle={hideModal}>Import Markdown</ModalHeader>
      <ModalBody>
        <p>Paste or type the table markdown below.</p>
        <TextArea className={styles.importMarkdownTextArea} rows={10} placeholder={IMPORT_TEXT_PLACEHOLDER} value={value} onChange={changeValue} />
      </ModalBody>

      <ModalFooter>
        <Button type='colorful' size='medium' onClick={importClick}>Import</Button>
        <Button size='medium' onClick={hideModal}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}
