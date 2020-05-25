import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

interface Props {
  list: Array<any>;
  updateList: (element: any) => any;
  isChecked: (element: any) => any;
  getText: (element: any) => any;
  getKey: (element: any) => any;
}

const FilterList: React.FC<Props> = ({ list, updateList, isChecked, getText, getKey }) => {
  const renderCheckBox = (el: any) => (
    <ListItem
      key={getKey(el)}
      dense
      disableGutters
      button
      onClick={() => {
        window.scrollTo(0, 0);
        updateList(el);
      }}
    >
      <ListItemIcon style={{ minWidth: '46px' }}>
        <Checkbox color="primary" checked={isChecked(el)} disableRipple />
      </ListItemIcon>
      <ListItemText
        disableTypography
        style={{ fontSize: '0.9rem', marginRight: '1rem', lineHeight: 1.5 }}
      >
        {getText(el)}
      </ListItemText>
    </ListItem>
  );

  return <List disablePadding>{list.map((el) => renderCheckBox(el))}</List>;
};

export default FilterList;
