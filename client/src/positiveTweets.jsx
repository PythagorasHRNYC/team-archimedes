import React from 'react';
import styled from 'styled-components';
import Tweet from './Tweet.jsx';
import { DropTarget } from 'react-dnd'
import { handleDrag } from './index.jsx';
import c3 from 'c3';

const Tweets = styled.div``;

const Types = {
  item: 'tweet'
}

const collect = function(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop()
  }
}

const tweetsTarget = {
  canDrop(props, monitor) {
    const item = monitor.getItem();
    return item
  },
  drop(props, monitor, component) {
    component.props.drop(monitor.getItem())
  }
}

class PositiveTweets extends React.Component {
  constructor(props) {
    super(props)
    this.state={
    };
      // this.chart = this.chart.bind(this)

  }
  chart (data){
		c3.generate({
			bindto: '.chart',
			data: {
				columns: [
					['data', data]
				],
			type: 'gauge',
			onclick: function (d, i) { console.log("onclick", d, i); },
			onmouseover: function (d, i) { console.log("onmouseover", d, i); },
			onmouseout: function (d, i) { console.log("onmouseout", d, i); }
			}
		})
	}
  render() {
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div className="col col-3-of-6" style={{backgroundColor: 'rgba(39, 174, 96, .2'}}>
        <Tweets>
          <div className="row">
            <div className="columnTitle col col-6-of-6">
              <h3 style={{textAlign: "center"}}>Positive Tweets</h3>
            </div>
            <div>
              {this.props.tweets.map((tweet, i) => <Tweet id={"p"+i} chart={this.chart}clickHandler={this.props.clickHandler} dragging={this.props.dragging} type="positiveTweets" key={"p"+i} tweet={tweet} />)}
            </div>
          </div>
        </Tweets>
      </div>
    )
  }

}


export default DropTarget(Types.item, tweetsTarget, collect)(PositiveTweets);
