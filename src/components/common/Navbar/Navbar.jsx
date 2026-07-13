import "./Navbar.css";
import useActiveSection from "../../../hooks/useActiveSection";

const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" }
];

function Navbar() {

    const activeSection = useActiveSection();

    const scrollTo = (id) => {

        document
            .getElementById(id)
            ?.scrollIntoView({
                behavior: "smooth"
            });

    };

    return (
        <nav className="navbar">
            <div className="logo">
                PixelForge
            </div>

            <ul>
                {navItems.map(item => (
                    <li key={item.id}>
                        <button
                            className={
                                activeSection === item.id
                                    ? "active"
                                    : ""
                            }
                            onClick={() => scrollTo(item.id)}

                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );

}

export default Navbar;