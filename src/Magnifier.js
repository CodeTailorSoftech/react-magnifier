import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MagnifyingGlass from './MagnifyingGlass';


const propTypes = {
	// image
	imgSrc: PropTypes.string.isRequired,
	imgAlt: PropTypes.string,
	imgWidth: PropTypes.number,
	imgHeight: PropTypes.number,

	// zoom image
	zoomImgSrc: PropTypes.string,
	zoomFactor: PropTypes.number,

	// magnifying glass
	mgWidth: PropTypes.number,
	mgHeight: PropTypes.number,
	mgShape: PropTypes.string
};

const defaultProps = {
	// image
	imgWidth: 500,

	// zoom image
	zoomFactor: 1.5,

	// magnifying glass
	mgWidth: 150,
	mgHeight: 150,
	mgShape: 'circle'
};


export default class Magnifier extends Component {

	constructor(props) {
		super(props);

		if (!this.props.imgSrc) {
			throw Error('Missing imgSrc prop');
		}

		this.state = {
			showZoom: false,
			relX: 0, // horizontal mouse position relative to image
			relY: 0 // vertical mouse position relative to image
		};

		// function bindings
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseOut = this.onMouseOut.bind(this);
	}

	onMouseMove(e) {
		const imgBounds = e.target.getBoundingClientRect();
		this.setState({
			showZoom: true,
			relX: (e.clientX - imgBounds.left) / e.target.clientWidth,
			relY: (e.clientY - imgBounds.top) / e.target.clientHeight
		});
	}

	onMouseOut() {
		this.setState({
			showZoom: false
		});
	}

	render() {
		return (
			<div
				className="magnifier"
				style={{
					position: 'relative',
					display: 'inline-block'
				}}
			>
				<img
					src={this.props.imgSrc}
					alt={this.props.imgAlt}
					width={this.props.imgWidth}
					height={this.props.imgHeight}
					onMouseMove={this.onMouseMove}
					onMouseOut={this.onMouseOut}
					style={{ cursor: 'none' }}
				/>
				<MagnifyingGlass
					showZoom={this.state.showZoom}
					relX={this.state.relX}
					relY={this.state.relY}
					imgWidth={this.props.imgWidth}
					imgHeight={this.props.imgHeight}
					zoomImgSrc={this.props.zoomImgSrc || this.props.imgSrc}
					zoomFactor={this.props.zoomFactor}
					mgWidth={this.props.mgWidth}
					mgHeight={this.props.mgHeight}
					mgShape={this.props.mgShape}
				/>
			</div>
		);
	}
}


Magnifier.propTypes = propTypes;
Magnifier.defaultProps = defaultProps;