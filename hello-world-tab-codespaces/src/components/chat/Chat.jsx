import React, { useState, useRef, useEffect } from "react";
import "./Chat.css";
import OpenAI from "openai";



export default function Chat() {
    const [messages, setMessages] = useState([
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    /*     useEffect(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, [messages]);
    
        const handleSend = async () => {
            if (input.trim() === "" || loading) return;
            const userMsg = { id: Date.now(), text: input, sender: "me" };
            setMessages((msgs) => [...msgs, userMsg]);
            setInput("");
            setLoading(true);
    
            try {
                const response = await client.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [
                        ...messages
                            .filter(m => m.sender !== "other") // Only user messages
                            .map(m => ({ role: "user", content: m.text })),
                        { role: "user", content: input }
                    ],
                });
                const aiText = response.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
                setMessages(msgs => [
                    ...msgs,
                    { id: Date.now() + 1, text: aiText, sender: "other" }
                ]);
            } catch (error) {
                setMessages(msgs => [
                    ...msgs,
                    { id: Date.now() + 1, text: "Error: " + error.message, sender: "other" }
                ]);
            }
            setLoading(false);
        }; */

    const handleInputKeyDown = (e) => {
        if (e.key === "Enter") {
            // handleSend();
        }
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "400px",
            width: "320px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            background: "#f5f6fa",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}>
            <div style={{
                flex: 1,
                overflowY: "auto",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "8px"
            }}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        style={{
                            alignSelf: msg.sender === "me" ? "flex-end" : "flex-start",
                            background: msg.sender === "me" ? "#0084ff" : "#e4e6eb",
                            color: msg.sender === "me" ? "#fff" : "#050505",
                            padding: "8px 12px",
                            borderRadius: "18px",
                            maxWidth: "70%",
                            wordBreak: "break-word"
                        }}
                    >
                        {msg.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div style={{
                display: "flex",
                padding: "12px",
                borderTop: "1px solid #ddd",
                background: "#fff"
            }}>
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder={loading ? "Waiting for AI..." : "Type a message..."}
                    disabled={loading}
                    style={{
                        flex: 1,
                        border: "none",
                        outline: "none",
                        fontSize: "16px",
                        padding: "8px",
                        borderRadius: "16px",
                        background: "#f0f2f5"
                    }}
                />
                <button
                    // onClick={handleSend}
                    disabled={loading}
                    style={{
                        marginLeft: "8px",
                        background: "#0084ff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "16px",
                        padding: "8px 16px",
                        fontWeight: "bold",
                        cursor: loading ? "not-allowed" : "pointer"
                    }}
                >
                    {loading ? "..." : "Send"}
                </button>
            </div>
        </div>
    );
}
