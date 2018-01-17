import React from 'react';
import { DragSource } from 'react-dnd';
import './style/tweet.scss';
import IconButton from 'material-ui/IconButton';
import ActionAccountCircles from 'material-ui/svg-icons/action/account-circle';
import ActionThumbs from 'material-ui/svg-icons/action/thumbs-up-down';

/**
 * npm install react-modal
 * npm install material-ui
 */

const Types = {
	item: 'tweet',
}

const itemSource = {
	beginDrag(props, monitor, component) {
		component.props.dragging();
		const item = {idx: props.id, type: props.type};
		return item;
	}, 
	endDrag(props, monitor, component) {
		component.props.dragging();
		if (!monitor.didDrop()) {
			return;
		}
		const item = monitor.getItem()
		const dropResult = monitor.getDropResult();

	},
	isDragging(props, monitor) {
		return monitor.getItem().id = props.id
	}
}

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
}

class Tweet extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			comparisonUsers: [],
		}
	}
	componentDidMount(){
		// console.log(this.state.comparisonUsers)
	}
	render(){
		const styles = {
      smallIcon: {
        width: 36,
        height: 36,
      },
      small: {
        width: 72,
        height: 72,
        padding: 16,
      },
			profilebutton: {
				right: "-90%",
				bottom: 25
			}
		};
			
	const { isDragging, connectDragSource } = this.props
	return connectDragSource(
		<div className="tweetBody" data-key={this.props.data} data-type={this.props.type}>

			<IconButton
					iconStyle={styles.smallIcon}
					style={Object.assign(styles.small, styles.profilebutton)}
					onClick={() => {this.props.clickHandler(this.props.tweet.user_name)}}
				>
        <ActionAccountCircles/>
      </IconButton> 

			<div className="header row">
				<img className="avatar" src={this.props.tweet.avatar_url}></img>
				<h3>
				
					<span>@</span>{this.props.tweet.user_name}
				</h3>
			</div>

			<div className="tweetText row">
				<p className="col col-6-of-6">{this.props.tweet.tweetBody}</p>
				<span className="timeStamp col right-3-of-6">{this.props.tweet.created_at}</span>
			</div>
			<hr/>
			{/* <IconButton
						iconStyle={styles.smallIcon}
						style={Object.assign(styles.small, styles.profilebutton)}
						onClick={() => {this.props.clickHandler(this.props.tweet.user_name)}}
					> */}
          <ActionThumbs onClick={()=>{this.props.userClickHandler(this.props.tweet.user_name)}}/>
        {/* </IconButton>  */}
		</div>
		)
	}
}

// export default Tweet;

export default DragSource(Types.item, itemSource, collect)(Tweet);