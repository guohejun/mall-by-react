import React from "react";

const styles = {
	margin: "20vh auto",
	background: "rgb(255, 255, 255)",
	display: "block",
	shapeRendering: "auto"};

class Loading extends React.Component {
	render() {
		return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
		            style={styles}
		            width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
			<circle cx="50" cy="50" r="31.7152" fill="none" stroke="#e90c59" strokeWidth="2">
				<animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1"
				         keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.5s"></animate>
				<animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1"
				         keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.5s"></animate>
			</circle>
			<circle cx="50" cy="50" r="11.3122" fill="none" stroke="#46dff0" strokeWidth="2">
				<animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1"
				         keySplines="0 0.2 0.8 1" calcMode="spline"></animate>
				<animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1"
				         keySplines="0.2 0 0.8 1" calcMode="spline"></animate>
			</circle>
		</svg>
	}
}

export default Loading;