import { Typography } from "@mui/material";
import axios from 'axios';
import { useState, useEffect } from 'react';
import '../index.css';


interface Event {
    id: number;
    name: string;
    placeOfEvent: string;
    dateOfEvent: string;
    maxSites: number | null;
    timeOfEvent: string;
}

const MainPage = () => {
    const [data, setData] = useState<Event[]>([]);

    const listOfEvents: Event[] = [
        {
            id: 4,
            name: 'Lala',
            placeOfEvent: 'krakow',
            dateOfEvent: '2025-10-10',
            maxSites: null,
            timeOfEvent: "12:00"

        },
        {
            id: 2,
            name: 'Wystep',
            placeOfEvent: 'tarnow',
            dateOfEvent: '2021-10-10',
            maxSites: 100,
            timeOfEvent: "20:00"

        },
        {
            id: 15,
            name: 'Cyrk',
            placeOfEvent: 'rzeszow',
            dateOfEvent: '2025-10-11',
            maxSites: 10000,
            timeOfEvent: "17:00"

        },
        {
            id: 945,
            name: 'Koncert',
            placeOfEvent: 'wroclaw',
            dateOfEvent: '2021-10-10',
            maxSites: null,
            timeOfEvent: "19:30"

        },
        {
            id: 1091,
            name: 'Nowy film',
            placeOfEvent: 'krakow',
            dateOfEvent: '2021-03-10',
            maxSites: null,
            timeOfEvent: "19:45"

        }

    ];

    useEffect(() => {
        setData(listOfEvents);
    }, [listOfEvents]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = () => {
        axios.get('http://localhost:9090/event-app/events')
            .then(response => {
                console.log('Events', response.data);
                setData(response.data);
            }).catch(err => {
                console.log(err);
            });
    }

    return (
        <div>
            <h1 className="text-5xl font-serif text-center mb-2">Welcome to My Component</h1>
            <Typography variant="h3">List of Events</Typography>
            <ul>
                {data.map(event => (
                    <li key={event.id}>
                        {event.name} : {event.dateOfEvent}
                    </li>
                ))}
            </ul>
        </div>
    )
};


export default MainPage;