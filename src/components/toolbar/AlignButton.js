import React from 'react';
import Button from '../layout/Button';

import { useDispatch, useSelector } from 'react-redux';

import * as TableActions from '../../redux/actions/TableActions';
import * as TableSelectors from '../../redux/selectors/TableSelectors';

const ALIGNMENT_TEXT = {
  'left'   : 'Left',
  'right'  : 'Right',
  'center' : 'Center',
};

export default function AlignButton({ alignment }) {

  const dispatch        = useDispatch();
  const columnAlignment = useSelector(TableSelectors.getColumnAlignment(activeColumn));
  const activeColumn    = useSelector(TableSelectors.getActiveColumn());
  
  const setColumnAlignment = () => {
    dispatch(TableActions.setColumnAlignment(activeColumn, (alignment !== columnAlignment) ? alignment : null));
  };

  return (
    <Button onClick={setColumnAlignment} selected={columnAlignment === alignment}>{ALIGNMENT_TEXT[alignment]}</Button>
  );
}
