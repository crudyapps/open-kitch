import React, { useState, useEffect } from "react";
import { Money, Currency } from "./money";
import Layout from "./Layout";

export interface MenuItem {
    item: number;
    name: string;
    description: string;
    price: Money;
}
function MenuItemsPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        setMenuItems([
            { item: 1, name: "eggs on toast", description: "old favorites", price: new Money(Currency.AUD, 8, 50) },
            { item: 2, name: "smashed avocado on toasts", description: "yuppy delight", price: new Money(Currency.AUD, 10, 20) },
            { item: 3, name: "pumpkin soup", description: "sweet winter favorites", price: new Money(Currency.AUD, 5, 30) }
        ])
    }, [isLoaded]);

    const add = () => {
        alert('todo-add');
    }

    return (
        <Layout>
            <div className="menu">
                <div className="menuHeader">
                    <button onClick={add}>+</button>
                </div>
                <div className="row-container  title">
                    <div className="row">
                        <div className="menu-item">item</div>
                        <div className="menu-name">Name</div>
                        <div className="menu-description">Description</div>
                        <div className="menu-price">Price</div>
                    </div>
                </div>
                {
                    menuItems.map((menuItem, index) => (
                        <div key={`menuItem-${index}`} className="row-container">
                            <div className="row">
                                <div className="menu-item">{menuItem.item}</div>
                                <div className="menu-name">{menuItem.name}</div>
                                <div className="menu-description">{menuItem.description}</div>
                                <div className="menu-price">{menuItem.price.toString()}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Layout>

    );
}

export default MenuItemsPage;