const CALENDAR_API_URL = 'https://www.googleapis.com/calendar/v3';

const getAccessToken = () => {
    return sessionStorage.getItem('googleAccessToken');
};

export const listUpcomingEvents = async () => {
    const token = getAccessToken();
    if (!token) throw new Error("No access token found. Please sign in again.");

    const response = await fetch(`${CALENDAR_API_URL}/calendars/primary/events?timeMin=${new Date().toISOString()}&maxResults=10&singleEvents=true&orderBy=startTime`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch events');
    }

    return response.json();
};

export const createMeeting = async (summary, description, startTime, endTime) => {
    const token = getAccessToken();
    if (!token) throw new Error("No access token found. Please sign in again.");

    const event = {
        summary,
        description,
        start: { dateTime: new Date(startTime).toISOString() },
        end: { dateTime: new Date(endTime).toISOString() },
        conferenceData: {
            createRequest: { requestId: Math.random().toString(36).substring(7) }
        }
    };

    const response = await fetch(`${CALENDAR_API_URL}/calendars/primary/events?conferenceDataVersion=1`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error("Calendar API Error:", errorBody);
        throw new Error('Failed to create meeting');
    }

    return response.json();
};
