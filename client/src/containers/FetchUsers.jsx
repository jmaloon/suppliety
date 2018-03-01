import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loader from 'components/my-elements/Loader';

import * as userActions from 'actions/UserActions';

class FetchUsers extends Component {
  state = { users: this.getUsers(this.props) };

  getUsers({ users, fetchUserIds }) {
    return !fetchUserIds.length && users;
  }

  componentDidMount() {
    this.fetchUsers(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchUsers(nextProps);
    if (this.props.usersIds !== nextProps.userIds) {
      this.setState({ users: this.getUsers(nextProps) });
    }
    if (this.props.fetchUserIds !== nextProps.fetchUserIds) {
      this.setState({ fetching: false });
    }
  }

  fetchUsers({ users, userActions, userIds, fetchUserIds }) {
    if (!!fetchUserIds.length && this.state.fetching !== fetchUserIds) {
      this.setState({ fetching: fetchUserIds });
      userActions.fetchUsers(fetchUserIds);
    }
  }
  render() {
    const { users } = this.state;
    if (users) {
      return this.props.children(users);
    }
    return <Loader />;
  }
}

export default connect(
  ({ users }, { userIds }) => ({
    users: userIds.map(id => users[id]),
    fetchUserIds: userIds.filter(id => !users[id])
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch)
  })
)(FetchUsers);
