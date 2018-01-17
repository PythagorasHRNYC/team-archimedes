import React from 'react';
import { DropTarget } from 'react-dnd'

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
    component.props.save(monitor.getItem())
  }
}


class SaveTweet extends React.Component {
  render() {
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div onClick={this.props.handleFaves}>
        <img src="./images/folder_icon.png" alt="" className="save"/>
      </div>
    )
  }
}

export default DropTarget(Types.item, tweetsTarget, collect)(SaveTweet);