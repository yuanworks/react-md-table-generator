import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';

import * as TableActions from '../redux/actions/TableActions';
import { TABLE_SAMPLE } from '../constants/TableConstants';
import * as SettingsSelectors from '../redux/selectors/SettingsSelectors';

import Table from "../components/Table";
import MarkdownTable from "../components/MarkdownTable";

import '../styles/MainEditor.scss';
import CellValueInput from '../components/CellValueInput';
import AlignButton from '../components/toolbar/AlignButton';
import AdjustWidthButton from '../components/toolbar/AdjustWidthButton';
import ExitFullscreenButton from '../components/toolbar/ExitFullscreenButton';

export default function MainEditor() {

  const editorPaneRef = useRef();
  const markdownPaneRef = useRef();

  const dispatch = useDispatch();
  useEffect(() => { dispatch(TableActions.importMarkdownTable(TABLE_SAMPLE)) }, [dispatch]);
  
  const clearActiveCell = e => {
    
    if (e.target === editorPaneRef.current || e.target === markdownPaneRef.current) {
      dispatch(TableActions.clearActiveCell());
    }
  }

  const AddCode = e => {
    console.log(window.getSelection());

    const selection = window.getSelection();

    console.log(selection.anchorNode.parentNode.className);
    
    if (selection.anchorNode.parentNode.className === 'cell-value') {
      console.log('CELL!');

      dispatch(TableActions.formatActiveCell(selection.anchorOffset, selection.focusOffset, 'code'));
    }
  }

  const isFullscreen = useSelector(SettingsSelectors.isFullscreen());

  return (
    <div className={classnames('main-editor', {'main-editor-windowed': !isFullscreen})}>

      <div className='toolbar'>
        
        <div className='main-buttons'>
          <CellValueInput />

          <button onClick={AddCode}>Code</button>

          <AlignButton alignment='left' />
          <AlignButton alignment='center' />
          <AlignButton alignment='right' />

          <AdjustWidthButton />
        </div>

        <ExitFullscreenButton />
        
      </div>

      <div className='pane-view'>
        <div className='editor-pane' ref={editorPaneRef} onMouseDown={clearActiveCell}><Table /></div>
        <div className='markdown-pane' ref={markdownPaneRef} onMouseDown={clearActiveCell}><MarkdownTable /></div>
      </div>
    </div>
  );
}