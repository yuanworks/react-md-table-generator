import React from 'react';
import PropTypes from 'prop-types';
import { FaAlignCenter, FaAlignLeft, FaAlignRight } from 'react-icons/fa';

import Button from '../layout/Button';

import { useDispatch, useSelector } from 'react-redux';

import * as TableActions from '../../redux/actions/TableActions';
import * as TableSelectors from '../../redux/selectors/TableSelectors';

const ALIGNMENT_ICON = {
  'left'   : FaAlignLeft,
  'right'  : FaAlignRight,
  'center' : FaAlignCenter,
}
const ALIGNMENT_TEXT = {
  'left'   : 'Left',
  'right'  : 'Right',
  'center' : 'Center',
};

export default function AlignButton({ alignment }) {

  const dispatch        = useDispatch();
  const activeColumn    = useSelector(TableSelectors.getActiveColumn());
  const columnAlignment = useSelector(TableSelectors.getColumnAlignment(activeColumn));
  
  const setColumnAlignment = () => {
    dispatch(TableActions.setColumnAlignment(activeColumn, (alignment !== columnAlignment) ? alignment : null));
  };

  const Icon = ALIGNMENT_ICON[alignment];

  return (
    <Button onClick={setColumnAlignment} selected={columnAlignment === alignment} icon={<Icon />}>
      {ALIGNMENT_TEXT[alignment]}
    </Button>
  );
}

AlignButton.propTypes = {
  alignment: PropTypes.oneOf(['left', 'right', 'center']),
};