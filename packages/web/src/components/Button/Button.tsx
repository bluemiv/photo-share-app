import React from 'react';

interface ButtonProps {
    children: any;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
    return <button onClick={onClick}>{children}</button>;
};

export default Button;
