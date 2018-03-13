import React, { PureComponent } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';

import { FormControl } from 'material-ui/Form';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import Plus from 'mdi-material-ui/Plus';

import { withStyles, getProductImage } from 'theme/utils';

const styles = theme => ({
  image: {
    width: 200
  }
});

class ProductForm extends PureComponent {
  state = { ...this.getInitialState(this.props) };

  // brand: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'brand'
  // },
  // company: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'company'
  // },
  // clicked: Number,
  // created: Date,
  // description: String,
  // image: String,
  // tags: [String],
  // title: String,
  // prices: Object,
  // privacy: Boolean

  getInitialState(props) {
    if (props && props.product) {
      const { _id, title, description, image, tags, prices } = props.currentUser;
      return {
        _id,
        title,
        description,
        image,
        tags,
        prices
      };
    }
    return {};
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  canSave = () => {
    const { title } = this.state;
    return !!title;
  };

  addTag = () => {
    const { newTag, tags = [] } = this.state;
    if (!!newTag) {
      this.setState({
        newTag: '',
        tags: [...tags, this.state.newTag]
      });
    }
  };

  deleteTag = value => () => {
    this.setState({ tags: this.state.tags.filter(tag => tag !== value) });
  };

  onSubmit = evt => {
    evt.preventDefault();
    console.log(this.state);
    if (this.canSave()) this.props.onSubmit(this.state);
  };

  render() {
    const { classes } = this.props;
    const { title = '', description = '', image, newTag = '', tags = [], prices = {} } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <img src={getProductImage(image)} alt={title} className={classes.image} />
        <TextField fullWidth label="Product Name" value={title} onChange={this.handleChange('title')} />
        <TextField
          fullWidth
          label="Description"
          placeholder="Max 150 char"
          value={description.substring(0, 150)}
          onChange={this.handleChange('description')}
        />
        <FormControl fullWidth>
          <InputLabel>New Tag</InputLabel>
          <Input
            value={newTag}
            onChange={this.handleChange('newTag')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton color="primary" disabled={!newTag} onClick={this.addTag}>
                  <Plus />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {tags.map((tag, i) => <Chip key={i} label={tag} onDelete={this.deleteTag(tag)} />)}
        <Button variant="raised" color="primary" type="submit" disabled={!this.canSave()} onClick={this.onSubmit}>
          Save
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(ProductForm);
