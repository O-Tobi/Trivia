interface ButtonProps{
    label: string
}

const ButtonComponent: React.FC<ButtonProps> = ({label, ...rest}) => {
    return (
        <button {...rest}>
            {label}
        </button>
    )
};

export default ButtonComponent;