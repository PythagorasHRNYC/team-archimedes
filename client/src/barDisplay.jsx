import React from 'react';
import $ from 'jquery';
class BarDisplay extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
		<div className="container horizontal rounded">
		  <h2>Reactions to {this.props.lastSearchTerm}</h2>
		  <div className="progress-bar horizontal">
		  <span className="negative">Negative</span><span className="positive">Positive</span>
		    <div className="progress-track">
		      <div className="progress-fill" style={{width: this.props.percentage + '%'}}>
		        <span></span>
		      </div>
		    </div>
		  </div>
		</div>)
	}
}

export default BarDisplay