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
        if (newMessage.trim()) {
            const chatRoomRef = collection(db, "nearbyChat", "chatRoom", "messages");

            await addDoc(chatRoomRef, {
                text: newMessage,
                timestamp: serverTimestamp(),
                votes: 0 // Initialize votes to 0
            });
            setNewMessage(""); // Clear input field
        }
    };

    return (
        <div>
            <Complaint messages={messages}></Complaint>
            <form className="submit" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit">Send</button>
            </form>
            <Geolocation /> {/* Include the Geolocation component */}
        </div>
    );
};

export default ChatRoom;