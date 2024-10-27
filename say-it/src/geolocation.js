// src/Geolocation.js

import React, { useState, useEffect } from "react";

const Geolocation = ({ setUserLocation }) => { // Accept setUserLocation as a prop
    const [position, setPosition] = useState(null);
    const [error, setError] = useState(null);
    const [watchId, setWatchId] = useState(null);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setPosition({
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                    });
                    setUserLocation({
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                    }); // Update user location in ChatRoom
                },
                (err) => {
                    setError(err.message);
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };

    const startWatching = () => {
        if (navigator.geolocation) {
            const id = navigator.geolocation.watchPosition(
                (pos) => {
                    setPosition({
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                    });
                    setUserLocation({
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                    }); // Update user location in ChatRoom
                },
                (err) => {
                    setError(err.message);
                }
            );
            setWatchId(id);
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };

    const stopWatching = () => {
        if (watchId !== null) {
            navigator.geolocation.clearWatch(watchId);
            setWatchId(null);
        }
    };

    useEffect(() => {
        getLocation();
        return () => {
            stopWatching();
        };
    }, []);

    return (
        <div>
            <h2>Geolocation</h2>
            {error && <p>Error: {error}</p>}
            {position ? (
                <p>
                    Latitude: {position.latitude}, Longitude: {position.longitude}
                </p>
            ) : (
                <p>Fetching location...</p>
            )}
            <button onClick={startWatching}>Start Tracking Location</button>
            <button onClick={stopWatching}>Stop Tracking Location</button>
        </div>
    );
};

export default Geolocation;