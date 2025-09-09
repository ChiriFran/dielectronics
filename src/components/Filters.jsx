import { useMemo } from "react";
import "../styles/styles.css";
import '../styles/Filters.css'
import searchIcon from "../../assets/icons/lupa.png";

function Filters({
    filtroTexto,
    setFiltroTexto,

    marcaSeleccionada,
    setMarcaSeleccionada,

    categoriaSeleccionada,
    setCategoriaSeleccionada,

    almacenamientoSeleccionado,
    setAlmacenamientoSeleccionado,

    acabadoSeleccionado,
    setAcabadoSeleccionado,

    verDisponibles,
    setVerDisponibles,

    productos,
}) {
    // 🔹 Generar listas únicas para cada campo
    const marcas = useMemo(() => [...new Set(productos.map((p) => p.marca).filter(Boolean))], [productos]);
    const categorias = useMemo(() => [...new Set(productos.map((p) => p.categoria).filter(Boolean))], [productos]);
    const almacenamientos = useMemo(() => [...new Set(productos.map((p) => p.especificacionesAlmacenamiento).filter(Boolean))], [productos]);
    const acabados = useMemo(() => [...new Set(productos.map((p) => p.especificacionesAcabado).filter(Boolean))], [productos]);

    const limpiarFiltros = () => {
        setFiltroTexto("");
        setMarcaSeleccionada("");
        setCategoriaSeleccionada("");
        setAlmacenamientoSeleccionado("");
        setAcabadoSeleccionado("");
        setVerDisponibles(false);
    };

    return (
        <div className="filters-container">
            <div className="filters-group">
                {/* Campo de búsqueda */}
                <div className="search-input-container filters-item">
                    <img src={searchIcon} alt="Buscar" className="search-icon" />
                    <input
                        type="text"
                        placeholder="Buscar por título..."
                        value={filtroTexto}
                        onChange={(e) => setFiltroTexto(e.target.value)}
                        className="search-input"
                    />
                </div>

                {/* Botón disponibles */}
                <button
                    className={`filters-item ${verDisponibles ? "activo" : ""}`}
                    onClick={() => setVerDisponibles(!verDisponibles)}
                >
                    {verDisponibles ? "Ver Todos" : "Ver Disponibles"}
                </button>

                {/* Acabado */}
                <select
                    value={acabadoSeleccionado}
                    onChange={(e) => setAcabadoSeleccionado(e.target.value)}
                    className="filters-item"
                >
                    <option value="">Acabado</option>
                    {acabados.map((a) => (
                        <option key={a} value={a}>{a}</option>
                    ))}
                </select>

                {/* Almacenamiento */}
                <select
                    value={almacenamientoSeleccionado}
                    onChange={(e) => setAlmacenamientoSeleccionado(e.target.value)}
                    className="filters-item"
                >
                    <option value="">Almacenamiento</option>
                    {almacenamientos.map((al) => (
                        <option key={al} value={al}>{al}</option>
                    ))}
                </select>

                {/* Categoría */}
{/*                 <select
                    value={categoriaSeleccionada}
                    onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                    className="filters-item"
                >
                    <option value="">Categoría</option>
                    {categorias.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select> */}

                {/* Marca */}
                <select
                    value={marcaSeleccionada}
                    onChange={(e) => setMarcaSeleccionada(e.target.value)}
                    className="filters-item"
                >
                    <option value="">Marca</option>
                    {marcas.map((m) => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>

                {/* Botón limpiar */}
                <button className="filters-clear-btn filters-item" onClick={limpiarFiltros}>
                    Limpiar filtros
                </button>
            </div>
        </div>
    );
}

export default Filters;
