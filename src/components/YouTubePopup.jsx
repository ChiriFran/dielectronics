import React, { useState, useEffect } from "react";
import "../styles/YoutubePopup.css";

const YouTubePopup = () => {
    const [visible, setVisible] = useState(false);
    const [closing, setClosing] = useState(false);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const isClosed = localStorage.getItem("youtubePopupClosed");
        if (isClosed === "true") return;

        // Detectar primera interacción
        const handleFirstInteraction = () => {
            if (!started) {
                setStarted(true);
                setTimeout(() => {
                    setVisible(true);
                }, 5000); // esperar 3s después de la primera interacción
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
            localStorage.setItem("youtubePopupClosed", "true");
        }, 400); // igual al tiempo de animación
    };

    if (!visible) return null;

    return (
        <div className={`popup-container ${closing ? "slide-out" : "slide-in"}`}>
            <button className="popup-close" onClick={handleClose}>
                ✕
            </button>

            <p className="youtubeTitle">
                Learn more about iPhone 16 Pro: <br />
                <a href="https://www.apple.com/iphone-16-pro/" target="blank">Oficial Page</a> </p>
            <div className="popup-video">
                <iframe
                    src="https://www.youtube.com/embed/fm0a4uFS08Y"
                    title="YouTube Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            <h3 className="popup-title">iPhone 16 Pro | All Systems Pro | Apple</h3>

            <a
                href="https://www.youtube.com/watch?v=fm0a4uFS08Y"
                target="_blank"
                rel="noopener noreferrer"
                className="popup-button"
            >
                Ver en YouTube
            </a>
        </div>
    );
};

export default YouTubePopup;
