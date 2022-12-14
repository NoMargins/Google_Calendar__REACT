const events = [
	{
		id: 1,
		title: 'Go to the gym',
		description: 'some text here',
		dateFrom: new Date(2020, 8, 15, 10, 15),
		dateTo: new Date(2020, 8, 15, 15, 0),
	},
	{
		id: 2,
		title: 'Go to the school',
		description: 'hello, 2 am',
		dateFrom: new Date(2020, 8, 16, 10, 15),
		dateTo: new Date(2020, 8, 16, 11, 0),
	},
	{
		id: 3,
		title: 'Lunch',
		description: '',
		dateFrom: new Date(2020, 8, 17, 10, 30),
		dateTo: new Date(2020, 8, 17, 11, 30),
	},
	{
		id: 4,
		title: 'Meet friend',
		description: 'at the cafe',
		dateFrom: new Date(2020, 8, 25, 10, 30),
		dateTo: new Date(2020, 8, 25, 11, 0),
	},
];

export default events;

const baseUrl = 'https://633aeb89e02b9b64c61ad82e.mockapi.io/events';

export const fetchEvents = () => {
	return fetch(baseUrl).then((resp) => {
		if (resp.ok) {
			return resp.json();
		} else {
			throw new Error('Failed to load events');
		}
	});
};

export const createEvent = (eventData) => {
	return fetch(baseUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(eventData),
	}).then((response) => {
		if (!response.ok) {
			throw new Error('Failed to create event');
		}
	});
};

export const updateEvent = (eventID, eventData) => {
	return fetch(`${baseUrl}/${eventID}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(eventData),
	}).then((response) => {
		if (!response.ok) {
			throw new Error('Failed to update event');
		}
	});
};

export const deleteEvent = (eventID) => {
	return fetch(`${baseUrl}/${eventID}`, {
		method: 'DELETE',
	}).then((response) => {
		if (!response.ok) {
			throw new Error('Failed to delete event');
		}
	});
};
