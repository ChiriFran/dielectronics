import React from "react";
import "../styles/HeroYoutube.css";

const HeroYoutube = () => {
    // URL del video de YouTube
    const videoId = "eDqfg_LexCQ";
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return (
        <section
            className="hero-youtube"
            style={{ backgroundImage: `url(${thumbnailUrl})` }}
        >
            <div className="hero-youtube-overlay">
                <div className="hero-youtube-content">
                    <h4>Introducing iPhone 16 Pro | Apple</h4>
                    <a
                        href={videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero-youtube-btn"
                    >
                        ▶ Reproducir
                    </a>
                </div>
            </div>
        </section>
    );
};

export default HeroYoutube;
