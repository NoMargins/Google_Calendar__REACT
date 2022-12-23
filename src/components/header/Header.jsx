import React from 'react';
import moment from 'moment/moment';
import PropTypes from 'prop-types';

import { getWeekStartDate } from '../../utils/dateUtils.js';

import './header.scss';

const Header = ({
	setNewWeekStart,
	weekStartDate,
	weekDates,
	setNewDateForEvent,
	openModal,
	whatIsEventDate,
}) => {
	const handleButtonClick = (direction) => {
		direction === 'next'
			? setNewWeekStart(
					getWeekStartDate(
						new Date(weekStartDate).setDate(
							new Date(weekStartDate).getDate() + 7
						)
					)
			  )
			: setNewWeekStart(
					getWeekStartDate(
						new Date(weekStartDate).setDate(
							new Date(weekStartDate).getDate() - 7
						)
					)
			  );
	};

	const handlePrevBtnClick = (e) => {
		e.preventDefault();
		handleButtonClick('prev');
	};

	const handleNextBtnClick = (e) => {
		e.preventDefault();
		handleButtonClick('next');
	};

	const handleTodayBtnClick = (e) => {
		e.preventDefault();
		setNewWeekStart(new Date());
	};

	const handleCreateBtnClick = (e) => {
		e.preventDefault();
		const setDate = new Promise((resolve) =>
			resolve(setNewDateForEvent(new Date().getTime()))
		);
		return setDate.then(() => openModal());
	};

	const lastDay = weekDates.pop();
	const setMonths = () => {
		if (
			moment(weekStartDate).format('MMM YYYY') !=
			moment(lastDay).format('MMM YYYY')
		) {
			return `${moment(weekStartDate).format('MMM')} - ${moment(lastDay).format(
				'MMM YYYY'
			)}`;
		} else {
			return `${moment(weekStartDate).format('MMM YYYY')}`;
		}
	};
	const resultOfMonthsComparison = setMonths();

	return (
		<header className='header'>
			<button
				className='button create-event-btn'
				onClick={handleCreateBtnClick}
			>
				<i className='fas fa-plus create-event-btn__icon'></i>Create
			</button>
			<div className='navigation'>
				<button
					className='navigation__today-btn button'
					data-direction='today'
					onClick={handleTodayBtnClick}
				>
					Today
				</button>
				<button
					className='icon-button navigation__nav-icon'
					data-direction='previous'
					onClick={handlePrevBtnClick}
				>
					<i className='fas fa-chevron-left'></i>
				</button>
				<button
					className='icon-button navigation__nav-icon'
					data-direction='next'
					onClick={handleNextBtnClick}
				>
					<i className='fas fa-chevron-right'></i>
				</button>
				<span className='navigation__displayed-month'>
					{resultOfMonthsComparison}
				</span>
			</div>
		</header>
	);
};

Header.propTypes = {
	setNewWeekStart: PropTypes.func,
	weekStartDate: PropTypes.object,
	weekDates: PropTypes.array,
	setNewDateForEvent: PropTypes.func,
	openModal: PropTypes.func,
	whatIsEventDate: PropTypes.number,
};

export default Header;
