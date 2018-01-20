import React from 'react';
import Loader from './loader.jsx';
import List from 'material-ui/List';
import { ListItem, FlatButton }  from 'material-ui';
import ProfileTweet from './ProfileTweet.jsx';
import Graph from './Graph.jsx';
import MiniProfile from './MiniProfile.jsx';
import sentiment from 'sentiment';
import c3 from 'c3';
import IconButton from 'material-ui/IconButton';
import ActionNavigationClose from 'material-ui/svg-icons/navigation/close';



class SelectedUsersProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clickedUserDataContentLoaded: false,
      navbarChoice: {
        index: 0, 
        list: "userStatuses"
      },
      scores: ["scores"]
    }
    // this.chart = this.chart.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.userData.name !== nextProps.userData.name) {
      this.setState({clickedUserDataContentLoaded: !this.state.clickedUserDataContentLoaded})
    }
  }

  render() {
    const styles = {
      smallIcon: {
        width: 36,
        height: 36,
      },
      mediumIcon: {
        width: 48,
        height: 48,
      },
      largeIcon: {
        width: 60,
        height: 60,
      },
      small: {
        width: 72,
        height: 72,
        padding: 16,
      },
      medium: {
        width: 96,
        height: 96,
        padding: 24,
      },
      large: {
        width: 120,
        height: 120,
        padding: 30,
      },
      closeButton: {
        right: "-90%",
        bottom: 85
      }
    };
    if(!this.state.clickedUserDataContentLoaded) {
      return (
        <Loader />
      ) 
    } else {
      return (
        <div className="main-container">

          <div className="profile-name">
            <h1>@{this.props.userData.screen_name}</h1>
            <IconButton
                iconStyle={styles.mediumIcon}
                style={Object.assign(styles.medium, styles.closeButton)}
                onClick={this.props.clickHandler}
              >
                <ActionNavigationClose/>
            </IconButton>
          </div>

        <div className="inner-container">

          <div className="nav-bar">
            <FlatButton label={'Statuses'} onClick={() => { this.setState({
                navbarChoice: {index: 0, list: "userStatuses"}
            })}}/>
            <FlatButton label={'Friends'} onClick={() => { this.setState({
              navbarChoice: {index: 1, list: "usersFriends"}
            })}}/>
            <FlatButton label={'Followers'} onClick={() => { this.setState({
                navbarChoice: {index: 1, list: "usersFollowers"}
              })}}/>
            <FlatButton label={'Historical Data'} onClick={() => { this.setState({
                navbarChoice: {index: 2, list: 'userStatuses'}
              })}}/>
          </div>

          <div className="profile-image-div">
            <img  srcSet={`${this.props.userData.profile_image_url_https, this.props.userData.profile_image_url_https_400}`} />
          </div>
          
          <List >  
            {
              this.props.userData[`${this.state.navbarChoice.list}`].map((listItem, idx) => {
              this.state.scores.push(sentiment(listItem.tweetBody).score)

              return <ListItem 
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
                          followers_count_count: listItem.followers_count,
                          friends_count: listItem.friends_count,
                          statuses_count: listItem.statuses_count
                        }}
                      />,
                      <Graph 
                      scores={this.state.scores}
                      />
                      ][this.state.navbarChoice.index]
                }
              />
          })
            
            }
          </List>
          </div>  
        </div> //inner-containter then Main-container
      )
    }
  }
}

export default SelectedUsersProfile;