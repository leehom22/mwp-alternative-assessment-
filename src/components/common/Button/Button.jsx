import "./Button.css";

function Button({ children, secondary = false, ...props }) {
    return (
        <button
            className={secondary ? "btn secondary" : "btn"}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;