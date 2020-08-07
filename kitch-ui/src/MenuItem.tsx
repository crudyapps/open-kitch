import React from "react";
import { Money } from "./money";

interface MenuItemProps {
    id: string;
    name: string;
    description: string;
    price: Money;
    actions: JSX.Element | null;
    handleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function MenuItem(props: MenuItemProps) {
    const { id, name, description, actions, price, handleClick } = props
    return (
        <div className="row line" onClick={handleClick}>
            <div className="menu-item">{id}</div>
            <div className="menu-name">{name}</div>
            <div className="menu-description">{description}</div>
            <div className="menu-price">{price.toString()}</div>
            <div className="menu-action">
                {
                    actions
                }
            </div>
        </div>
    )
}