import React from 'react';
import './style/tweet.scss';
import c3 from 'c3';


class Graph extends React.Component {
	constructor(props){
		super(props);
		this.state = {
            scores: this.props.scores
        }
       this.chart = this.chart.bind(this); 
	}

    chart(data) {
		console.log('chart func', this.state.scores);
		c3.generate({
			bindto: "#chart", //+ this.props.id, //chart goes in to here
			data: {
				columns: [
					data
				],
				type: 'spline',
				onclick: function (d, i) { console.log("onclick", d, i); },
				onmouseover: function (d, i) { console.log("onmouseover", d, i); },
				onmouseout: function (d, i) { console.log("onmouseout", d, i); }
			},
			gauge: {
		    //    label: {
		    //        format: function(value, ratio) {
			// 		   if(data > 0){

			// 			   return value + "0% Positive";
			// 		   }else{
			// 				return value + "0% Negative";
			// 		   }
		    //        },
		    //     //    show: false // to turn off the min/max labels.
		    //    },
		   min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
		   max: 10, // 100 is default
		//    units: ' %',
		//    width: 39 // for adjusting arc thickness
			},
			color: {
				pattern: ['red', 'orange', 'yellow'], // the three color levels for the percentage values.
				threshold: {
		//            unit: 'value', // percentage is default
		//            max: 200, // 100 is default
					values: [0, 5, 10]
				}
			},
			size: {
				height: "50px"
			}
		})
	};
	render(){
	return (
		<div>
            <button onClick={()=>{ this.chart(this.state.scores)}} >test</button>

            {/* <div id={`chart${this.props.id}`}></div> */}
            <div id="chart"></div>
        </div>
		)
	}
}

export default Graph;