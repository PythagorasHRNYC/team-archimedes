import React from 'react';
import $ from 'jquery';
import './style/processBar.scss';

class BarDisplay extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		{console.log("neg=>", this.props.negPercentage, "neut=>", this.props.neutPercentage, "pos=>", this.props.posPercentage)}
		return (
		
		<div className="container horizontal rounded col col-6-of-6">
		  <span style={{fontSize: '2em'}}>{this.props.loading ? 'Loading...' : `Reactions to ${this.props.lastSearchTerm}`}</span>
		  <span style={{position: 'relative', float:'right', fontSize:'2em', color:'blue', textDecoration:'underline', cursor: 'pointer'}} onClick={this.props.showGraph}>{this.props.loading ? '' : `View History of ${this.props.lastSearchTerm}`}</span>
		  <div className="progress-bar horizontal">
			
		  {/* <span className="negative">Negative</span><span className="positive">Positive</span> */}
		    {/* <div className="progress-track">

					<span style={{position:'absolute', left: ((100 - this.props.negPercentage)/3) + this.props.negPercentage +'%', transition: 'left 2s', color: 'white', 
					fontSize: '12px', lineHeight: '20px', 
					fontFamily: `"Lato","Verdana",sans-serif`}}>{ Math.round(100- this.props.negPercentage) + '%'}</span>

					<div className="progress-neut" style={{width: this.props.neutPercentage + '%'}}>
						<span>{ Math.round(100 - this.props.posPercentage - this.props.negPercentage) + '%'}</span>
					</div>

		      <div className="progress-fill" style={{width: this.props.posPercentage + '%'}}>
		        <span>{Math.round(this.props.posPercentage) + '%'}</span>
		      </div>

				</div> */}
				<div className="progress-pos" style={{width:Math.floor(this.props.posPercentage)+"%" , display:"inline-block"}}>
					{Math.floor(this.props.posPercentage)}% 
				</div>
				<div className="progress-neut" style={{width: Math.floor(this.props.neutPercentage)+"%", display:"inline-block"}}>
				{Math.floor(this.props.neutPercentage)}% 
				</div>
				<div className="progress-neg" style={{width: Math.floor(this.props.negPercentage)+"%", display:"inline-block"}}>
				{Math.floor(this.props.negPercentage)}% 					
				</div>
		  </div>
		</div>)
	}
}

export default BarDisplay