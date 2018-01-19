import React from 'react';
import Loader from './loader.jsx';
import List from 'material-ui/List';
import { ListItem, FlatButton }  from 'material-ui';
import ProfileTweet from './ProfileTweet.jsx';
import MiniProfile from './MiniProfile.jsx';



class SelectedUsersProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clickedUserDataContentLoaded: false,
      navbarChoice: {
        index: 0, 
        list: "userStatuses"
      }
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
        <div className="profile-content">
          <div className="profile-image-div">
            <img className="profile-image" srcSet={`${this.props.userData.profile_image_url_https, this.props.userData.profile_image_url_https_400}`} />
          </div>
          <FlatButton
            label={'Statuses'}
            onClick={() => { this.setState({
              navbarChoice: {
                index: 0, 
                list: "userStatuses"
              }
            })}}
            className={'status-button'}
          />
          <FlatButton
            label={'Friends'}
            onClick={() => { this.setState({
              navbarChoice: {
                index: 1, 
                list: "usersFriends"
              }
            })}}
            className={'friends-button'}
          />
          <FlatButton
            label={'Followers'}
            onClick={() => { this.setState({
              navbarChoice: {
                index: 1, 
                list: "usersFollowers"
              }
            })}}
            className={'followers-button'}
          />
          <List
            className={'profile-list'}
          >  
            {this.props.userData[`${this.state.navbarChoice.list}`].map((listItem) => <ListItem 
              className={'profile-list-status-list-item'}
              // children={listItem.tweetBody}
              containerElement={
                  [
                    <ProfileTweet
                      tweet={{
                        tweetBody: listItem.tweetBody,
                        created_at: listItem.timeStamp,
                        user_name: `@${this.props.userData.screen_name}`,
                        avatar_url: this.props.userData.profile_image_url_https,
                        retweet_count: listItem.retweet_count,
                        favorite_count: listItem.favorite_count
                      }}
                    />,
                    <MiniProfile
                      profile={{
                        description: listItem.description,
                        created_at: listItem.created_at,
                        user_name: `@${listItem.screen_name}`,
                        avatar_url: listItem.profile_image_url_https,
                        followers_count: listItem.followers_count,
                        friends_count: listItem.friends_count,
                        statuses_count: listItem.statuses_count
                      }}
                    />
                ][this.state.navbarChoice.index]
              }
            />)}
          </List>
        </div>
      )
    }
  }
}

export default SelectedUsersProfile;