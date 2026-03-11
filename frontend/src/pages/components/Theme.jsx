import { FaMoon, FaSun } from "react-icons/fa";
import { toggleTheme } from "../../util/heleper";
import "./assets/styles/main.css";

export default function ToggleTheme(){

    return (
        <button type="button" onClick={toggleTheme} className="theme" id="theme-btn">
            <FaMoon className="icon" />
        </button>
    );
}