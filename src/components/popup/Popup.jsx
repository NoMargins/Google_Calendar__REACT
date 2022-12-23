import React from 'react';
import { deleteEvent } from '../../gateway/events.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro'; // <-- import styles to be used
import PropTypes from 'prop-types';

import './popup.scss';

const Popup = ({
	closePopup,
	closeModal,
	title,
	time,
	description,
	id,
	setEventsInState,
}) => {
	const deleteEventFunction = () => {
		closeModal();
		deleteEvent(id).then(() => setEventsInState());
		closePopup();
	};

	return (
		<div className='popup overlay'>
			<div className='popup_content'>
				<div className='popup_content__navigation'>
					<button className='event-btn__delete' onClick={deleteEventFunction}>
						<FontAwesomeIcon icon={regular('calendar-xmark')} />
					</button>

					<button className='event-btn__close' onClick={closePopup}>
						<FontAwesomeIcon icon={regular('circle-xmark')} />
					</button>
				</div>
				<div className='popup_content__info'>
					<p className='popup_event-title'>{title}</p>
					<p className='popup_event-time'>{time}</p>
					<p className='popup_event-description'>{description}</p>
				</div>
			</div>
		</div>
	);
};

Popup.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	time: PropTypes.string,
	id: PropTypes.number,
	closePopup: PropTypes.func,
};

export default Popup;
