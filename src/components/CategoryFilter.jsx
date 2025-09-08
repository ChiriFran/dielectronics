import "../styles/CategoryFilter.css";

// Importar los SVGs
import phoneIcon from "../../assets/icons/iconosFiltroCategoria/phone.svg";
import tabletIcon from "../../assets/icons/iconosFiltroCategoria/tablet.svg";
import laptopIcon from "../../assets/icons/iconosFiltroCategoria/laptop.svg";
import earbudsIcon from "../../assets/icons/iconosFiltroCategoria/earbuds.svg";
import pencilSquareIcon from "../../assets/icons/iconosFiltroCategoria/pencil-square.svg";

// Array de categorías usando los íconos importados
const categorias = [
    { id: "celulares", label: "Celulares", icon: phoneIcon },
    { id: "tablets", label: "Tablets", icon: tabletIcon },
    { id: "computadoras", label: "Computadoras", icon: laptopIcon },
    { id: "auriculares", label: "Auriculares", icon: earbudsIcon },
    { id: "varios", label: "Varios", icon: pencilSquareIcon },
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
