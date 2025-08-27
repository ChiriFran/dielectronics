import { useEffect, useState, useContext } from "react";
import "../styles/ProductModalEspec.css";
import { CartContext } from "../context/CartContext";

function ProductModalEspec({ producto, onClose }) {
    const [closing, setClosing] = useState(false);
    const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

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

    // Calcular stock disponible
    const cantidadTotal = producto.cantidad ?? 0;
    const reservados = producto.reservados ?? 0;
    const stockDisponible = Math.max(0, cantidadTotal - reservados);

    // Saber cuánto hay en el carrito
    const carritoItem = cartItems.find(item => item.id === producto.id);
    const cantidadEnCarrito = carritoItem ? carritoItem.cantidad : 0;

    const handleAdd = () => {
        if (cantidadEnCarrito >= stockDisponible) return;
        addToCart(producto);
    };

    const handleRemove = () => {
        if (cantidadEnCarrito === 0) return;
        removeFromCart(producto.id);
    };

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
                        <p className="precioModal">${producto.precio.toLocaleString("es-AR")}</p>
                        <p className="descripcionModal">{producto.descripcion}</p>

                        {/* Botones de carrito */}
                        <div className="button-container">
                            <button
                                className="add-button"
                                onClick={handleAdd}
                                disabled={stockDisponible <= 0}
                            >
                                {stockDisponible <= 0 ? "Agotado" : "Agregar al carrito"}
                            </button>

                            <button
                                className="remove-button"
                                onClick={handleRemove}
                                disabled={cantidadEnCarrito === 0}
                            >
                                Eliminar
                            </button>
                        </div>

                        {/* Stock info */}
                        <div className={`stockModal ${stockDisponible <= 0 ? "agotadoStockModal" : ""}`}>
                            Stock: {stockDisponible > 0 ? stockDisponible : "AGOTADO"}
                            {cantidadEnCarrito > 0 && (
                                <span> (En carrito: {cantidadEnCarrito})</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Especificaciones extra */}
                <div className="specifications-extra">
                    <span className="specifications-title">Especificaciones:</span>
                    <p><strong>Fabricante:</strong> {producto.marca}</p>
                    <p><strong>Acabado:</strong> {producto.especificacionesAcabado}</p>
                    <p><strong>Almacenamiento:</strong> {producto.especificacionesAlmacenamiento}</p>
                    <p><strong>Chip:</strong> {producto.especificacionesChip}</p>
                    <p><strong>En la caja:</strong> {producto.especificacionesCaja}</p>
                </div>

                <div className="coberturaLinkContainer">
                    <p>
                        ¿Necesitas consultar el estado de tu garantía oficial?{" "}
                        <a
                            href="https://checkcoverage.apple.com/?locale=en_US&s=n"
                            target="_blank"
                            rel="noreferrer"
                        >
                            click aqui
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProductModalEspec;
