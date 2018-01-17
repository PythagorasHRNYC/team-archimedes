import React from 'react';
import styled from 'styled-components';
import Tweet from './Tweet.jsx';
import { DragSource, DropTarget } from 'react-dnd'
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

class NegativeTweets extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div className="col col-3-of-6" style={{backgroundColor: 'rgba(192, 57, 43, .2)'}}>
        <Tweets>
          <div className="row">
            <div className="columnTitle col col-6-of-6">
              <h3>Negative Tweets</h3>
            </div>
            <div>
              {this.props.tweets.map((tweet, i) => <Tweet id={i} clickHandler={this.props.clickHandler} dragging={this.props.dragging} type="negativeTweets" key={i} tweet={tweet}/>)}
            </div>
          </div>
        </Tweets>
      </div>
    )
  }
}

export default DropTarget(Types.item, tweetsTarget, collect)(NegativeTweets);
