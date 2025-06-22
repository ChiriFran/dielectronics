import { useEffect, useState } from "react";
import "../styles/LoaderOverlay.css";

const LoaderOverlay = ({ visible }) => {
    const [shouldRender, setShouldRender] = useState(visible);

    useEffect(() => {
        if (visible) {
            setShouldRender(true);
        } else {
            const timeout = setTimeout(() => setShouldRender(false), 2000);
            return () => clearTimeout(timeout);
        }
    }, [visible]);

    if (!shouldRender) return null;

    return (
        <div className={`loader-overlay ${!visible ? "hidden" : ""}`}>
            <div className="loader-content">
                <div className="uiverse-loader">
                    <div className="loader"></div>
                    <div className="loader"></div>
                    <div className="loader"></div>
                </div>

                <h2 className="loader-title">Dielectronics.arg</h2>

                <div className="equalizer">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    );
};

export default LoaderOverlay;
