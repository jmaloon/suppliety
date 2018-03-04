import React, { PureComponent } from 'react';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

export default class MySelect extends PureComponent {
  render() {
    const { label, value, onChange, items, helperText, ...rest } = this.props;
    return (
      <FormControl {...rest}>
        {!!label && <InputLabel>{label}</InputLabel>}
        <Select value={value} onChange={onChange}>
          {items.map((item, i) => (
            <MenuItem key={i} value={item.value}>
              {item.text}
            </MenuItem>
          ))}
        </Select>
        {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
}
