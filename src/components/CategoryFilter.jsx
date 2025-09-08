import "../styles/CategoryFilter.css";

// 👇 acá reemplazás las rutas cuando tengas tus SVGs
const categorias = [
    { id: "celulares", label: "Celulares", icon: "../../assets/icons/iconosFiltroCategoria/phone.svg" },
    { id: "tablets", label: "Tablets", icon: "../../assets/icons/iconosFiltroCategoria/tablet.svg" },
    { id: "computadoras", label: "Computadoras", icon: "../../assets/icons/iconosFiltroCategoria/laptop.svg" },
    { id: "auriculares", label: "Auriculares", icon: "../../assets/icons/iconosFiltroCategoria/earbuds.svg" },
    { id: "varios", label: "Varios", icon: "../../assets/icons/iconosFiltroCategoria/pencil-square.svg" },
];

function CategoryFilter({ categoriaSeleccionada, setCategoriaSeleccionada }) {
    const handleSelect = (id) => {
        setCategoriaSeleccionada(categoriaSeleccionada === id ? "" : id);
    };

    return (
        <div className="category-filter">
            <div className="category-scroll">
                {categorias.map((cat) => (
                    <button
                        key={cat.id}
                        className={`category-item ${categoriaSeleccionada === cat.id ? "active" : ""}`}
                        onClick={() => handleSelect(cat.id)}
                    >
                        <div className="icon">
                            <img src={cat.icon} alt={cat.label} />
                        </div>
                        <span>{cat.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter;
