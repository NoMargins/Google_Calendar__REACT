import React, { Component } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';
import { getWeekStartDate, generateWeekRange } from './utils/dateUtils.js';
import { fetchEvents } from './gateway/events.js';

import './common.scss';

class App extends Component {
	state = {
		weekStartDate: new Date(),
		openModal: false,
		events: [],
		chosenDayForEvent: null,
	};

	componentDidMount() {
		this.setEventsInState();
	}

	componentDidUpdate(prevProps, prevState) {
		prevState.chosenDayForEvent !== this.state.chosenDayForEvent;
	}

	setEventsInState = () => {
		fetchEvents().then((resp) =>
			this.setState({
				events: resp,
			})
		);
	};

	openModalFunction = () => {
		this.setState({
			openModal: true,
		});
	};

	closeModalFunction = () => {
		this.setState({
			openModal: false,
		});
	};

	setNewWeekStart = (date) => {
		this.setState({
			weekStartDate: date,
		});
	};

	setNewDateForEvent = (date) => {
		this.setState({
			chosenDayForEvent: date,
		});
	};

	render() {
		const { weekStartDate, chosenDayForEvent, events, openModal } = this.state;
		const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

		return (
			<>
				<Header
					createEvent={this.openModalFunction}
					weekDates={weekDates}
					setNewWeekStart={this.setNewWeekStart}
					weekStartDate={weekStartDate}
					openModal={this.openModalFunction}
					setNewDateForEvent={this.setNewDateForEvent}
					whatIsEventDate={chosenDayForEvent}
				/>

				<Calendar
					weekDates={weekDates}
					handleClick={this.openModalFunction}
					openModal={this.openModalFunction}
					setNewDateForEvent={this.setNewDateForEvent}
					events={events}
					setEventsInState={this.setEventsInState}
					closeModalFunction={this.closeModalFunction}
				/>
				<Modal
					isOpenModal={openModal}
					closeModalFunction={this.closeModalFunction}
					buttonValue='Create'
					chosenDayForEvent={chosenDayForEvent}
					setEventsInState={this.setEventsInState}
				/>
			</>
		);
	}
}

export default App;
