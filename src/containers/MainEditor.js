import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import * as TableActions from '../redux/actions/TableActions';
import { TABLE_SAMPLE } from '../constants/TableConstants';

import Table from "../components/Table";
import MarkdownTable from "../components/MarkdownTable";

import '../styles/MainEditor.scss';
import CellValueInput from '../components/CellValueInput';

export default function MainEditor() {

  const dispatch = useDispatch();
  useEffect(() => { dispatch(TableActions.importMarkdownTable(TABLE_SAMPLE)) }, [dispatch]);

  return (
    <div className='main-editor'>
      <CellValueInput />
      <div className='pane-view'>
        <div className='editor-pane'><Table /></div>
        <div className='markdown-pane'><MarkdownTable /></div>
      </div>
    </div>
  );
}