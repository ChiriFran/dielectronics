import { useContext, useEffect, useState, useMemo, useRef, useCallback } from "react";
import { CartContext } from "../context/CartContext";
import { useNotificacion } from "../hooks/useNotificacion";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

import ProductItem from "./ProductItem";
import ProductSkeleton from "./ProductSkeleton";
import Filters from "./Filters";
import CategoryFilter from "./CategoryFilter"; // filtro por categorías
import Notificacion from "./Notificacion";
import Spinner from "./Spinner";
import InstagramPopup from "./InstagramPopup";

import '../styles/ProductList.css';

const BATCH_SIZE = 15;
const MIN_LOADING_TIME = 800;

const ProductList = () => {
  const { cartItems } = useContext(CartContext);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(BATCH_SIZE);

  // 🔹 Filtros
  const [filtroTexto, setFiltroTexto] = useState("");
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [almacenamientoSeleccionado, setAlmacenamientoSeleccionado] = useState("");
  const [acabadoSeleccionado, setAcabadoSeleccionado] = useState("");
  const [verDisponibles, setVerDisponibles] = useState(false);
  const { mensaje, visible, mostrarMensaje } = useNotificacion(1000);

  const sentinelRef = useRef();
  const loadingStartRef = useRef(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const categoriasOrden = ["celulares", "tablets", "computadoras", "auriculares", "varios"];

  // Traer productos de Firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "productos"), (snapshot) => {
      const productosActualizados = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(productosActualizados);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Mensaje carrito vacío
  useEffect(() => {
    if (cartItems.length === 0) {
      mostrarMensaje("Carrito vacío");
    }
  }, [cartItems, mostrarMensaje]);

  // 🔹 Filtrado y orden
  const productosFiltrados = useMemo(() => {
    const filtrados = productos.filter((producto) => {
      const coincideTexto = (producto.titulo || "")
        .toLowerCase()
        .includes(filtroTexto.toLowerCase());

      const coincideMarca = !marcaSeleccionada || producto.marca === marcaSeleccionada;
      const coincideCategoria = !categoriaSeleccionada || producto.categoria === categoriaSeleccionada;
      const coincideAlmacenamiento =
        !almacenamientoSeleccionado || producto.especificacionesAlmacenamiento === almacenamientoSeleccionado;
      const coincideAcabado =
        !acabadoSeleccionado || producto.especificacionesAcabado === acabadoSeleccionado;

      const stockDisponible = ((producto.cantidad ?? 0) - (producto.reservados ?? 0)) > 0;
      const coincideStock = !verDisponibles || stockDisponible;

      return (
        coincideTexto &&
        coincideMarca &&
        coincideCategoria &&
        coincideAlmacenamiento &&
        coincideAcabado &&
        coincideStock
      );
    });

    // Orden según categoriasOrden; desconocidos al final
    filtrados.sort((a, b) => {
      const indexA = categoriasOrden.indexOf(a.categoria);
      const indexB = categoriasOrden.indexOf(b.categoria);

      const finalIndexA = indexA === -1 ? categoriasOrden.length : indexA;
      const finalIndexB = indexB === -1 ? categoriasOrden.length : indexB;

      return finalIndexA - finalIndexB;
    });

    return filtrados;
  }, [
    productos,
    filtroTexto,
    marcaSeleccionada,
    categoriaSeleccionada,
    almacenamientoSeleccionado,
    acabadoSeleccionado,
    verDisponibles
  ]);

  const productosLimitados = productosFiltrados.slice(0, limit);

  // 🔹 Scroll infinito
  const cargarMas = useCallback((node) => {
    if (sentinelRef.current) sentinelRef.current.disconnect();

    sentinelRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoadingMore) {
        setIsLoadingMore(true);
        loadingStartRef.current = Date.now();

        setTimeout(() => {
          setLimit((prev) => Math.min(prev + BATCH_SIZE, productosFiltrados.length));
          const elapsed = Date.now() - loadingStartRef.current;
          const remaining = MIN_LOADING_TIME - elapsed;
          if (remaining > 0) {
            setTimeout(() => setIsLoadingMore(false), remaining);
          } else {
            setIsLoadingMore(false);
          }
        }, 500);
      }
    });

    if (node) sentinelRef.current.observe(node);
  }, [productosFiltrados.length, isLoadingMore]);

  if (loading) {
    return (
      <div className="product-list">
        {[1, 2, 3].map((_, i) => <ProductSkeleton key={i} />)}
      </div>
    );
  }

  return (
    <div>
      {/* 🔹 Filtros */}
      <Filters
        filtroTexto={filtroTexto}
        setFiltroTexto={setFiltroTexto}
        marcaSeleccionada={marcaSeleccionada}
        setMarcaSeleccionada={setMarcaSeleccionada}
        categoriaSeleccionada={categoriaSeleccionada}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
        almacenamientoSeleccionado={almacenamientoSeleccionado}
        setAlmacenamientoSeleccionado={setAlmacenamientoSeleccionado}
        acabadoSeleccionado={acabadoSeleccionado}
        setAcabadoSeleccionado={setAcabadoSeleccionado}
        verDisponibles={verDisponibles}
        setVerDisponibles={setVerDisponibles}
        productos={productos}
      />

      {/* 🔹 Filtro por categoría (extra) */}
      <CategoryFilter
        categoriaSeleccionada={categoriaSeleccionada}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
      />

      <Notificacion mensaje={mensaje} visible={visible} />

      <div className="product-list">
        {productosLimitados.length === 0 ? (
          <div className="product-item no-results">
            <div className="info">
              <h2>Ups!</h2>
              <p>Seguinos en redes y no te pierdas nuestros drops.</p>
            </div>
          </div>
        ) : (
          productosLimitados.map((producto) => (
            <ProductItem key={producto.id} producto={producto} mostrarMensaje={mostrarMensaje} />
          ))
        )}
      </div>

      <InstagramPopup />

      {isLoadingMore && (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <Spinner />
        </div>
      )}

      {!isLoadingMore && limit < productosFiltrados.length && (
        <div ref={cargarMas} style={{ height: "1px" }} />
      )}
    </div>
  );
};

export default ProductList;
