import React, { useState, useEffect } from "react";
import { Money, Currency } from "./money";
import Layout from "./Layout";
import { api } from "./api";
import MenuItemInput from "./MenuItemInput";
import Spinner from "./components/Spinner";

export interface MenuItem {
    item: number;
    name: string;
    description: string;
    price: Money;
}
interface Busy {
    getMenuItems: boolean;
    addMenuItem: boolean;

}

const kitchenId: string = '1';

function MenuItemsPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [busy, setBusy] = useState<Busy>({ getMenuItems: false, addMenuItem: false });

    useEffect(() => {
        if (!isLoaded) {
            const kitchenId = 1;
            setBusy({ ...busy, getMenuItems: true });
            api.kitchen.getMenuItems(kitchenId)
                .then((menuItems) => {
                    setMenuItems(menuItems.map(item => {
                        const { id, name, description, price } = item;
                        return { id, name, description, price: Money.fromJSON(price) };
                    }));
                    setBusy({ ...busy, getMenuItems: false });
                })
            setIsLoaded(true);
        }

    }, [isLoaded]);

    const handleSaveNewMenuItem = (menuItem: api.contracts.MenuItem) => {
        setBusy({ ...busy, addMenuItem: true });
        api.kitchen
            .addMenuItem(kitchenId, menuItem)
            .then((success) => {
                if (!success) {
                    console.log('error');
                }
                setBusy({ ...busy, addMenuItem: false });
            });
    }

    return (
        <Layout>
            <div className="menu">
                <div className="menuHeader">
                </div>
                <div className="row-container  title">
                    <div className="row">
                        <div className="menu-item">item</div>
                        <div className="menu-name">Name</div>
                        <div className="menu-description">Description</div>
                        <div className="menu-price">Price</div>
                        <div className="menu-price"></div>
                    </div>
                </div>
                {
                    busy.addMenuItem ? <Spinner /> :
                        <MenuItemInput handleSave={handleSaveNewMenuItem} />
                }
                {
                    busy.getMenuItems ? <Spinner /> :
                        menuItems.map((menuItem, index) => (
                            <div key={`menuItem-${index}`} className="row-container">
                                <div className="row">
                                    <div className="menu-item">{menuItem.item}</div>
                                    <div className="menu-name">{menuItem.name}</div>
                                    <div className="menu-description">{menuItem.description}</div>
                                    <div className="menu-price">{menuItem.price.toString()}</div>
                                    <div className="menu-price"></div>
                                </div>
                            </div>
                        ))
                }
            </div>
        </Layout>

    );
}

export default MenuItemsPage;