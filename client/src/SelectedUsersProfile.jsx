import React from 'react';
import Loader from './loader.jsx';

class SelectedUsersProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clickedUserDataContentLoaded: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.userData.name !== nextProps.userData.name) {
      this.setState({clickedUserDataContentLoaded: !this.state.clickedUserDataContentLoaded})
    }
  }

  render() {
    if(!this.state.clickedUserDataContentLoaded) {
      return (
        <Loader />
      ) 
    } else {
      return (
        <div className={"profile-content"}>
          <h1>SelectedUsersProfile</h1>
        </div>
      )
    }
  }
}

export default SelectedUsersProfile;