// src/ChatRoom.jsx

import React, { useState, useEffect } from "react";
import { db, serverTimestamp } from "./firebase";
import './App.css';
import Complaint from "./complaint";
import Geolocation from "./geolocation"; // Import Geolocation
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";

const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [userLocation, setUserLocation] = useState(null);
    const [proximityDistance, setProximityDistance] = useState(5); // Default distance in km

    // Fetch messages in real-time
    useEffect(() => {
        const chatRoomRef = collection(db, "nearbyChat", "chatRoom", "messages");
        const q = query(chatRoomRef, orderBy("timestamp", "asc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messagesData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(messagesData);
        });
        return unsubscribe; // Unsubscribe on cleanup
    }, []);

    // Function to handle sending a new message
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() && userLocation) {
            const chatRoomRef = collection(db, "nearbyChat", "chatRoom", "messages");

            await addDoc(chatRoomRef, {
                text: newMessage,
                timestamp: serverTimestamp(),
                location: userLocation, // Store user's location with the message
                votes: 0 // Initialize votes to 0
            });
            setNewMessage(""); // Clear input field
        }
    };

    // Calculate distance between two coordinates
    const calculateDistance = (loc1, loc2) => {
        if (!loc1 || !loc2) return Infinity; // If location data is missing
        const R = 6371; // Radius of the Earth in km
        const dLat = (loc2.latitude - loc1.latitude) * (Math.PI / 180);
        const dLon = (loc2.longitude - loc1.longitude) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(loc1.latitude * (Math.PI / 180)) *
            Math.cos(loc2.latitude * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    };

    // Filter messages based on proximity
    const filteredMessages = messages.filter((message) => {
        const distance = calculateDistance(userLocation, message.location);
        return distance <= proximityDistance; // Use user-defined proximity distance
    });

    return (
        
        <div>
            <Complaint messages={filteredMessages}></Complaint>
            <form className="submit" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit">Send</button>
            </form>
            <Geolocation setUserLocation={setUserLocation} /> {/* Pass setUserLocation as a prop */}
            <p></p>

            {/* Input for setting proximity distance */}
            <div>
                <label>
                    Set Proximity Distance (km):
                    <input
                        type="number"
                        value={proximityDistance}
                        onChange={(e) => setProximityDistance(e.target.value)}
                        min="0" // Ensure the distance can't be negative
                    />
                </label>
            </div>
            <p></p>
            <p></p>
        </div>
        
    );
};

export default ChatRoom;