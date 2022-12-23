import React, { Component } from 'react';
import Popup from '../popup/Popup.jsx';
import PropTypes from 'prop-types';
import './event.scss';

class Event extends Component {
	state = {
		openPopup: false,
		id: this.props.id,
	};

	openPopupFunction = (e) => {
		e.preventDefault();
		this.props.closeModal();
		this.setState({
			openPopup: !this.state.openPopup,
			id: Number(e.target.id),
		});
	};

	closePopupFunction = () => {
		this.setState({
			openPopup: false,
			id: '',
		});
	};

	render() {
		const {
			height,
			marginTop,
			title,
			time,
			id,
			description,
			setEventsInState,
			closeModal,
		} = this.props;
		const eventStyle = {
			height,
			marginTop,
		};
		return (
			<>
				<div
					style={eventStyle}
					className='event'
					id={id}
					onClick={this.openPopupFunction}
				>
					<div className='event__title' id={id}>
						{title}
					</div>
					<div className='event__time' id={id}>
						{time}
					</div>
				</div>
				{this.state.openPopup && (
					<Popup
						title={title}
						description={description}
						time={time}
						id={this.state.id}
						setEventsInState={setEventsInState}
						closePopup={this.closePopupFunction}
						closeModal={closeModal}
					/>
				)}
			</>
		);
	}
}

Event.propTypes = {
	height: PropTypes.number,
	marginTop: PropTypes.number,
	title: PropTypes.string,
	time: PropTypes.string,
	id: PropTypes.number,
	description: PropTypes.string,
	setEventsInState: PropTypes.func,
	closeModal: PropTypes.func,
};

export default Event;
