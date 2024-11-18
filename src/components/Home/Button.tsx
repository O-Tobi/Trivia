
import { useTheme } from "../../context/ThemeContext";

interface ButtonProps{
    label: string
}

const ButtonComponent: React.FC<ButtonProps> = ({label, ...rest}) => {
    const {toggleDarkMode} = useTheme();

    return (
        <button {...rest} onClick={toggleDarkMode}>
            {label}
        </button>
    )
};



export default ButtonComponent;