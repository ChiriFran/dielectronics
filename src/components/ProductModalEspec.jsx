import { useEffect, useState } from "react";
import "../styles/ProductModalEspec.css";

function ProductModalEspec({ producto, onClose }) {
    const [closing, setClosing] = useState(false);

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div
            className={`specifications-backdrop ${closing ? "fade-out-backdrop" : "fade-in-backdrop"}`}
            onClick={handleClose}
        >
            <div
                className={`specifications-modal ${closing ? "fade-out" : "fade-in"}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="specifications-close" onClick={handleClose}>
                    ×
                </button>

                <div className="specifications-content">
                    {/* Imagen */}
                    <div className="specifications-image-container">
                        <img
                            src={producto.imagen}
                            alt={producto.titulo}
                            className="specifications-image"
                        />
                    </div>

                    {/* Texto */}
                    <div className="specifications-text">
                        <h2>{producto.titulo}</h2>
                        <p><strong>Autor:</strong> {producto.autor}</p>
                        <p><strong>Precio:</strong> ${producto.precio.toLocaleString("es-AR")}</p>
                        <p><strong>Descripción:</strong> {producto.descripcion}</p>
                        <p><strong>Estilo:</strong> {producto.estilo}</p>
                        <p><strong>Label:</strong> {producto.sello}</p>
                        <p><strong>Stock disponible:</strong> {producto.cantidad - (producto.reservados ?? 0)}</p>
                    </div>
                </div>

                <div className="coberturaLinkContainer">
                    <a href="https://checkcoverage.apple.com/?locale=en_US&s=n" target="_blank">Consultar garantia oficial </a>
                </div>

                {/* Especificaciones extra */}
                <div className="specifications-extra">
                    {producto.especificaciones1 && <p>{producto.especificaciones1}</p>}
                    {producto.especificaciones2 && <p>{producto.especificaciones2}</p>}
                    {producto.especificaciones3 && <p>{producto.especificaciones3}</p>}
                </div>
            </div>
        </div>
    );
}

export default ProductModalEspec;
