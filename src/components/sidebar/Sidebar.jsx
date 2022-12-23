import React from 'react';

import './sidebar.scss';

const Sidebar = ({ hour }) => {
	return (
		<div className='time-slot'>
			<span className='time-slot__time'>{`${hour}:00`}</span>
		</div>
	);
};

export default Sidebar;
