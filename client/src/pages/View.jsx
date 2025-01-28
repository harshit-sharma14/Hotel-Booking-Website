import React, { useEffect, useState } from 'react';
import axios from 'axios';

const View = () => {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await axios.get('/places');
                setPlaces(response.data);
            } catch (error) {
                console.error('Error fetching places:', error);
            }
        };

        fetchPlaces();
    }, []);

    return (
        <div>
            <h1>Places</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {places.map((place) => (
                    <div key={place._id} className="border p-4 rounded">
                        <img src={`http://localhost:4000/${place.imageUrl}`} alt={place.title} className="w-full h-48 object-cover rounded" />
                        <h2 className="text-xl font-bold mt-2">{place.title}</h2>
                        <p className="mt-1">{place.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default View;