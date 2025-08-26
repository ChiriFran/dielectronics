import React, { useState, useEffect } from "react";
import "../styles/InstagramPopup.css";

const InstagramPopup = () => {
    const [visible, setVisible] = useState(false);
    const [closing, setClosing] = useState(false);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const isClosed = localStorage.getItem("instagramPopupClosed");
        if (isClosed === "true") return;

        const handleFirstInteraction = () => {
            if (!started) {
                setStarted(true);
                setTimeout(() => {
                    setVisible(true);
                }, 5000); // muestra el popup a los 5s
            }
        };

        window.addEventListener("mousemove", handleFirstInteraction, { once: true });
        window.addEventListener("keydown", handleFirstInteraction, { once: true });
        window.addEventListener("touchstart", handleFirstInteraction, { once: true });

        return () => {
            window.removeEventListener("mousemove", handleFirstInteraction);
            window.removeEventListener("keydown", handleFirstInteraction);
            window.removeEventListener("touchstart", handleFirstInteraction);
        };
    }, [started]);

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            setVisible(false);
            localStorage.setItem("instagramPopupClosed", "true");
        }, 400);
    };

    if (!visible) return null;

    return (
        <div className={`instagram-popup-container ${closing ? "instagram-slide-out" : "instagram-slide-in"}`}>
            <button className="instagram-popup-close" onClick={handleClose}>✕</button>

            <p className="instagram-title">
                Seguinos en Instagram!!!
            </p>

            <div className="instagram-popup-video">
                <iframe
                    src="https://www.instagram.com/p/DLOYDo3Nty_/embed"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency="true"
                    allow="encrypted-media; picture-in-picture"
                ></iframe>
            </div>

            <p className="instagram-popup-subtitle">Hace click para reproducir</p>

        </div>
    );
};

export default InstagramPopup;
