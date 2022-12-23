import React, { Component } from 'react';
import { createEvent } from '../../gateway/events.js';
import { getDateTime } from '../../utils/dateUtils.js';
import moment from 'moment/moment.js';
import PropTypes from 'prop-types';

import './modal.scss';

class Modal extends Component {
	state = {
		title: '',
		description: '',
		date: '',
		startTime: '',
		endTime: '',
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.chosenDayForEvent != this.props.chosenDayForEvent) {
			this.setState({
				title: '',
				description: '',
				date: moment(new Date(this.props.chosenDayForEvent)).format(
					'YYYY-MM-DD'
				),
				startTime: moment(new Date(this.props.chosenDayForEvent)).format(
					'HH:mm'
				),
				endTime: moment(
					new Date(this.props.chosenDayForEvent).setHours(
						new Date(this.props.chosenDayForEvent).getHours() + 1
					)
				).format('HH:mm'),
			});
		}
	}

	handleInputChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	createEventFunction = () => {
		const { title, date, startTime, endTime, description } = this.state;

		const newEventForStorage = {
			title,
			date,
			startTime: getDateTime(date, startTime),
			endTime: getDateTime(date, endTime),
			description,
			id: Math.random(),
		};

		createEvent(newEventForStorage).then(() => this.props.setEventsInState());
		this.props.closeModalFunction();
	};

	render() {
		const { closeModalFunction, buttonValue, isOpenModal } = this.props;

		const { title, date, startTime, endTime, description } = this.state;

		if (isOpenModal) {
			return (
				<div className='modal overlay'>
					<div className='modal__content'>
						<div className='create-event'>
							<button
								className='create-event__close-btn'
								onClick={closeModalFunction}
							>
								+
							</button>

							<form className='event-form' onSubmit={this.createEventFunction}>
								<input
									type='text'
									name='title'
									placeholder='Title'
									className='event-form__field'
									value={title}
									onChange={this.handleInputChange}
									required
								/>
								<div className='event-form__time'>
									<input
										type='date'
										name='date'
										className='event-form__field'
										value={date}
										onChange={this.handleInputChange}
										required
									/>
									<input
										type='time'
										name='startTime'
										className='event-form__field'
										value={startTime}
										onChange={this.handleInputChange}
										required
									/>
									<span>-</span>
									<input
										type='time'
										name='endTime'
										className='event-form__field'
										value={endTime}
										onChange={this.handleInputChange}
										required
									/>
								</div>
								{this.state.errorMessage && (
									<span>{this.state.errorMessage}</span>
								)}
								<textarea
									name='description'
									placeholder='Description'
									className='event-form__field'
									value={description}
									onChange={this.handleInputChange}
								></textarea>
								<button type='submit' className='event-form__submit-btn'>
									{buttonValue}
								</button>
							</form>
						</div>
					</div>
				</div>
			);
		} else {
			return null;
		}
	}
}

Modal.propTypes = {
	isOpenModal: PropTypes.bool,
	closeModalFunction: PropTypes.func,
	buttonValue: PropTypes.string,
	chosenDayForEvent: PropTypes.number,
	setEventsInState: PropTypes.func,
};

export default Modal;

// checkTheDuration = () => {
// 	const startTimeHour = Number(this.state.startTime.split(':')[0]);
// 	const startTimeMins = Number(this.state.startTime.split(':')[1]);
// 	const endtTimeHour = Number(this.state.endTime.split(':')[0]);
// 	const endtTimeMins = Number(this.state.endTime.split(':')[1]);

// 	if (startTimeHour === endtTimeHour && endtTimeMins - startTimeMins < 15) {
// 		return 'Your event duration should exceed 15 min';
// 	} else {
// 		return null;
// 	}
// };
