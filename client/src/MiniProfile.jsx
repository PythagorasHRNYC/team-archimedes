import React from 'react';
import './style/tweet.scss';


class MiniProfile extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		}
	}

	render(){
	return (
		<div className="tweetBody" >
			<div className="header row">
				<img className="avatar" src={this.props.profile.avatar_url}></img>
				<h3>
					  {this.props.profile.user_name}
				</h3>
			</div>
			<div className="tweetText row">
				{"Description:"}
				<p className="col col-6-of-6">{this.props.profile.description}</p>
				{"Member Since:"}
				<span className="timeStamp col right-3-of-6">{this.props.profile.created_at}</span>
			</div>
			<hr/>
      <span className="col left-1-of-6">followers:{this.props.profile.followers_count}</span> <span className="col left-2-of-6" >Friends:{this.props.profile.friends_count}</span> <span>Statuses:{this.props.profile.statuses_count}</span>
		</div>
		)
	}
}

export default MiniProfile;