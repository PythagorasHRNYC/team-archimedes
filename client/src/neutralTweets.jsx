import React from 'react';
import styled from 'styled-components';
import Tweet from './Tweet.jsx';
import { DropTarget } from 'react-dnd'
import { handleDrag } from './index.jsx';
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

class NeutralTweets extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div className="col col-3-of-6" style={{backgroundColor: '#FFF59D'}}>
        <Tweets>
          <div className="row">
            <div className="columnTitle col col-6-of-6">
              <h3 style={{textAlign: "center"}}>Neutral Tweets</h3>
            </div>
            <div>
              {this.props.tweets.map((tweet, i) => <Tweet id={"nt"+i} clickHandler={this.props.clickHandler} dragging={this.props.dragging} type="neutralTweets" key={"nt"+i} tweet={tweet} />)}
            </div>
          </div>
        </Tweets>
      </div>
    )
  }

}


export default DropTarget(Types.item, tweetsTarget, collect)(NeutralTweets);
