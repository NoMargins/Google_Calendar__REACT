import React from 'react';
import moment from 'moment/moment';
import Event from '../event/Event.jsx';
import PropTypes from 'prop-types';
import { formatMins } from '../../../src/utils/dateUtils.js';

import './hour.scss';

class Hour extends React.Component {
	state = {
		isNow: false,
		marginTop: new Date().getMinutes(),
	};

	componentDidMount() {
		if (
			moment(this.props.dataFullDate).format('YYYY MM DD') ===
				moment(new Date()).format('YYYY MM DD') &&
			this.props.dataHour === new Date().getHours()
		) {
			this.setState({
				isNow: true,
			});
		}

		this.interval = setInterval(() => {
			this.setState({
				marginTop: new Date().getMinutes(),
			});
		}, 1000);
	}

	handleTimeSlotClick = (e) => {
		if (e.target.childNodes.length < 1) {
			const setDate = new Promise((resolve) =>
				resolve(
					this.props.setNewDateForEvent(
						new Date(this.props.dataFullDate).setHours(this.props.dataHour)
					)
				)
			);
			return setDate.then(() => this.props.openModal());
		}
	};

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		const { dataHour, hourEvents, dataFullDate, setEventsInState, closeModal } =
			this.props;
		return (
			<div
				className='calendar__time-slot'
				data-time={new Date(dataFullDate).setHours(dataHour)}
				onClick={this.handleTimeSlotClick}
			>
				{this.state.isNow && (
					<div
						className='red-line'
						style={{ marginTop: `${Number(this.state.marginTop)}px` }}
					></div>
				)}

				{hourEvents.map(({ id, startTime, endTime, title, description }) => {
					const eventStart = `${new Date(startTime).getHours()}:${formatMins(
						new Date(startTime).getMinutes()
					)}`;
					const eventEnd = `${new Date(endTime).getHours()}:${formatMins(
						new Date(endTime).getMinutes()
					)}`;

					return (
						<Event
							key={id}
							//calculating event height = duration of event in minutes
							height={
								(new Date(endTime).getTime() - new Date(startTime).getTime()) /
								(1000 * 60)
							}
							marginTop={new Date(startTime).getMinutes()}
							time={`${eventStart} - ${eventEnd}`}
							title={title}
							description={description}
							id={Number(id)}
							closeModal={closeModal}
							setEventsInState={setEventsInState}
						/>
					);
				})}
			</div>
		);
	}
}

Hour.propTypes = {
	dataFullDate: PropTypes.number,
	dataHour: PropTypes.number,
	hourEvents: PropTypes.array,
	setEventsInState: PropTypes.func,
	openModal: PropTypes.func,
	closeModal: PropTypes.func,
	setNewDateForEvent: PropTypes.func,
};

export default Hour;
