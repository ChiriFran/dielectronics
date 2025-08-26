import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

import FaqModal from "./FaqModal";
import ProductModalEspec from "./ProductModalEspec"; // Nuevo modal para ver especificaciones

import '../styles/ProductItem.css'

function ProductItem({ producto: productoProp, mostrarMensaje }) {
    const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
    const [producto, setProducto] = useState(productoProp);
    const [mostrarFaq, setMostrarFaq] = useState(false);
    const [mostrarEspecificaciones, setMostrarEspecificaciones] = useState(false);

    useEffect(() => {
        const ref = doc(db, "productos", productoProp.id);
        const unsubscribe = onSnapshot(ref, (docSnap) => {
            if (docSnap.exists()) {
                setProducto(docSnap.data());
            }
        });
        return () => unsubscribe();
    }, [productoProp.id]);

    const cantidadTotal = producto.cantidad ?? 0;
    const reservados = producto.reservados ?? 0;
    const stockDisponible = Math.max(0, cantidadTotal - reservados);

    const carritoItem = cartItems.find(item => item.id === productoProp.id);
    const cantidadEnCarrito = carritoItem ? carritoItem.cantidad : 0;

    const handleAdd = () => {
        if (cantidadEnCarrito >= stockDisponible) {
            mostrarMensaje("Límite stock disponible");
            return;
        }
        addToCart(productoProp);
        mostrarMensaje("Producto añadido al carrito");
    };

    const handleRemove = () => {
        removeFromCart(productoProp.id);
        mostrarMensaje("Producto eliminado del carrito");
    };

    return (
        <div className="product-card">
            <div className="image" onClick={() => setMostrarEspecificaciones(true)}>
                <img
                    src={producto.imagen}
                    alt={producto.titulo}
                    className={stockDisponible <= 0 ? "agotadoImagen" : ""}
                />
            </div>

            <div className="info">
                <div className="itemTitleContainer">
                    <h3 className={stockDisponible <= 0 ? "agotado" : ""}>
                        {producto.titulo}
                    </h3>
                </div>

                <p className={`price ${stockDisponible <= 0 ? "agotado" : ""}`}>
                    ${producto.precio.toLocaleString("es-AR", { minimumFractionDigits: 0 })}
                </p>

                <p className="description">
                    {`${(producto.descripcion + ' - ' + producto.estilo).slice(0, 150)}${(producto.descripcion + ' - ' + producto.estilo).length > 150 ? '...' : ''
                        }`}
                </p>

                {/* Botón ver especificaciones */}
                <button
                    className="specs-button"
                    onClick={() => setMostrarEspecificaciones(true)}
                >
                    Ver mas info
                </button>

                <div className="button-container">
                    <button
                        className="add-button"
                        onClick={handleAdd}
                        title="Agregar al carrito"
                        disabled={stockDisponible <= 0}
                    >
                        {stockDisponible <= 0 ? "Agotado" : "Agregar al carrito"}
                    </button>

                    <button
                        className="remove-button"
                        onClick={handleRemove}
                        title="Eliminar del carrito"
                        disabled={cantidadEnCarrito === 0}
                    >
                        Eliminar
                    </button>
                </div>

                <div className={`stock ${stockDisponible <= 0 ? "agotadoStock" : ""}`}>
                    Stock: {stockDisponible > 0 ? stockDisponible : "AGOTADO"}
                    {cantidadEnCarrito > 0 && (
                        <span> (En carrito: {cantidadEnCarrito})</span>
                    )}
                </div>
            </div>

            {/* Botón flotante FAQ */}
            <div
                className="faq-button"
                onClick={() => setMostrarFaq(true)}
                title="Preguntas frecuentes"
            >
                i
            </div>

            {mostrarFaq && <FaqModal onClose={() => setMostrarFaq(false)} />}

            {mostrarEspecificaciones && (
                <ProductModalEspec producto={producto} onClose={() => setMostrarEspecificaciones(false)} />
            )}
        </div>
    );
}

export default ProductItem;
