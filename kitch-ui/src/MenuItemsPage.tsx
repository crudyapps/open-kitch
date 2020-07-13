import React, { useState, useEffect } from "react";
import { Money, Currency } from "./money";
import Layout from "./Layout";
import { api, kitchenId } from "./api";
import MenuItemInput from "./MenuItemInput";
import Spinner from "./components/Spinner";
import Switch from "react-switch";

export interface MenuItemState {
    item: string;
    name: string;
    description: string;
    price: Money;
}
interface Busy {
    getMenuItems: boolean;
}

function toMenuItemState(menuItems: api.contracts.MenuItem[]): MenuItemState[] {
    return menuItems.map(({ id, name, description, price }) => { return { item: id, name, description, price }; });
}

function getMenuItemsRows(busy: Busy, onSaved, menuItems: MenuItemState[], isEditMode: boolean): React.ReactNode {
    if (busy.getMenuItems) { return <Spinner />; }

    if (isEditMode) {
        return menuItems.map((menuItem, index) => (
            <div key={`i-${menuItem.item}`} className="row">
                <MenuItemInput OnSaved={onSaved} handleDelete={() => { }} menuItem={menuItem} />
            </div>));
    }

    return menuItems.map((menuItem, index) => (
        <div key={`ro-${menuItem.item}`} className="row">
            <div className="menu-item">{menuItem.item}</div>
            <div className="menu-name">{menuItem.name}</div>
            <div className="menu-description">{menuItem.description}</div>
            <div className="menu-price">{menuItem.price.toString()}</div>
            <div className="menu-action"></div>
        </div>
    ));
}

const getAddMenuItemSection = (busy: Busy, onSaved, isEditMode: boolean) => {
    if (!isEditMode) {
        return <div className="row"></div>;
    }

    return (<div className="row">
        <MenuItemInput OnSaved={onSaved} />
    </div>);
}

function MenuItemsPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [menuItems, setMenuItems] = useState<MenuItemState[]>([]);
    const [busy, setBusy] = useState<Busy>({ getMenuItems: false });
    const [isEditMode, setEditMode] = useState(false);

    useEffect(() => {
        if (!isLoaded) {
            setBusy({ ...busy, getMenuItems: true });
            api.kitchen.getMenuItems(kitchenId)
                .then((menuItems) => {
                    setMenuItems(toMenuItemState(menuItems))
                    setBusy({ ...busy, getMenuItems: false });
                });
        }
        setIsLoaded(true);
    }, [isLoaded]);


    const onSaved = () => {
        api.kitchen.getMenuItems(kitchenId)
            .then((menuItems) => {
                setMenuItems(toMenuItemState(menuItems))
                setBusy({ ...busy, getMenuItems: false });
            })
    }


    return (
        <Layout>
            <div className="page-body">
                <div className="sides" />
                <div className="menu-items-table">
                    <div className="table-head">
                        <Switch
                            checked={isEditMode}
                            onChange={() => setEditMode(!isEditMode)}
                            onColor="#86d3ff"
                            onHandleColor="#2693e6"
                            handleDiameter={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={20}
                            width={48}
                            className="react-switch"
                            id="material-switch"
                        />
                    </div>
                    {
                        getAddMenuItemSection(busy, onSaved, isEditMode)
                    }

                    <div className="row title">
                        <div className="menu-item">item</div>
                        <div className="menu-name">Name</div>
                        <div className="menu-description">Description</div>
                        <div className="menu-price">Price</div>
                        <div className="menu-action"></div>
                    </div>
                    {
                        getMenuItemsRows(busy, onSaved, menuItems, isEditMode)
                    }
                </div>
                <div className="sides" />
            </div>
        </Layout>

    );


}

export default MenuItemsPage;