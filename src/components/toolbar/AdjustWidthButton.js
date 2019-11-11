import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import * as TableActions from '../../redux/actions/TableActions';
import * as TableSelectors from '../../redux/selectors/TableSelectors';
import Button from '../layout/Button';

export default function AdjustWidthButton() {
  
  const dispatch        = useDispatch();
  const adjustWidth     = useSelector(TableSelectors.getAdjustWidth());
    
  const toggleAdjustWidth = () => {
    dispatch(TableActions.toggleAdjustWidth());
  };

  return (
    <Button onClick={toggleAdjustWidth} selected={adjustWidth}>Adjust Width</Button>
  );
}
