import React from 'react';
import './style/tweet.scss';


class ProfileTweet extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		}
	}

	render(){
	return (
		<div className="tweetBody" >
			<div className="header row">
				<img className="avatar" src={this.props.tweet.avatar_url}></img>
				<h3>
					  {this.props.tweet.user_name}
				</h3>
			</div>
			<div className="tweetText row">
				<p className="col col-6-of-6">{this.props.tweet.tweetBody}</p>
				<span className="timeStamp col right-3-of-6">{this.props.tweet.created_at}</span>
			</div>
			<hr/>
      <span className="col left-1-of-6">Retweets:{this.props.tweet.retweet_count}</span> <span className="col left-2-of-6" >Favorited:{this.props.tweet.favorite_count}</span>
		</div>
		)
	}
}

export default ProfileTweet;