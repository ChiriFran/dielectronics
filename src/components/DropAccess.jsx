import { useState } from "react";
import "../styles/DropAccess.css";
import dropTitleImg from "../../assets/logo/logo-dielectronics.png";

function DropAccess({ onAccesoPermitido, ocultarFormulario = false }) {
    const [error, setError] = useState("");

    // Contraseña precargada desde el env
    const contraseñaCorrecta = import.meta.env.VITE_DROP_CODE;

    const manejarSubmit = (e) => {
        e.preventDefault();
        // Siempre usamos la contraseña precargada
        if (contraseñaCorrecta) {
            onAccesoPermitido();
            setError("");
        } else {
            setError("Contraseña incorrecta");
        }
    };

    return (
        <div className="drop-access">
            {!ocultarFormulario && (
                <form onSubmit={manejarSubmit} className="formulario-acceso">
                    <label>Bienvenidos a nuestra tienda!</label>
                    <p>Mira todos nuestros productos y sus detalles, compra y gestiona todo desde un mismo lugar!</p>

                    {/* Input oculto con la contraseña precargada */}
                    <input type="hidden" value={contraseñaCorrecta} readOnly />

                    {error && <p className="error">{error}</p>}

                    <button type="submit" className="btn-enviar-countdown">
                        Acceder
                    </button>
                </form>
            )}
        </div>
    );
}

export default DropAccess;
