import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { api, kitchenId } from "./api";
import Switch from "react-switch";
import { toMenuItemContract, toMenuItemState } from "./mapper";
import { model } from "./model";
import MenuItem from "./MenuItem";
import MenuItemForm from "./MenuItemForm";
import Modal from "./components/Modal";
import { Money, Currency } from "./money";

export default function MenuItemsPage() {
    const [menuItems, setMenuItems] = useState<model.MenuItemState[]>([]);
    const [busy, setBusy] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState<model.MenuItemState | null>(null);
    const [modalActionText, setModalActionText] = useState("");

    useEffect(() => {
        setBusy(true);
        api.kitchen.getMenuItems(kitchenId)
            .then((menuItems) => {
                setMenuItems(toMenuItemState(menuItems))
                setBusy(false);
            });
    }, []);

    const selectMenuItem = (menuItem: model.MenuItemState) => {
        if (isEditMode) {
            setSelectedMenuItem(menuItem);
            setModalActionText("Save");
            setShowModal(true);
        }
    }
    const addMenuItem = (newMenuItem: model.MenuItemState) => {
        setBusy(true);
        api.kitchen
            .saveMenuItem(kitchenId, toMenuItemContract(newMenuItem))
            .then((response) => {
                if (response.ok) {
                    const newMenuItemList = [...menuItems];
                    newMenuItemList.push(newMenuItem)
                    setMenuItems(newMenuItemList);
                    setBusy(false);
                    setShowModal(false);
                }
                setBusy(false);
            });
    }
    const saveMenuItem = (menuItem: model.MenuItemState) => {
        setBusy(true);
        api.kitchen
            .saveMenuItem(kitchenId, toMenuItemContract(menuItem))
            .then((response) => {
                if (response.ok) {
                    const newMenuItemList = [...menuItems].filter((item) => item.id !== menuItem.id);
                    newMenuItemList.push(menuItem)
                    setMenuItems(newMenuItemList);
                    setBusy(false);
                    setShowModal(false);
                }
                setBusy(false);
            });
    }

    const deleteMenuItem = (menuItemId: string) => {
        setBusy(true);
        api.kitchen
            .deleteMenuItem(kitchenId, Number(menuItemId))
            .then(() => {
                const newMenuItemList = [...menuItems].filter((item) => item.id !== menuItemId);
                setMenuItems(newMenuItemList);
                setBusy(false);
                setShowModal(false);
            });
    }

    const createActions = (menuItem: model.MenuItemState, isEditMode: boolean) => {
        if (!isEditMode) {
            return null;
        }
        return (<>
            <button style={{ padding: 0 }} onClick={(e) => { deleteMenuItem(menuItem.id); e.stopPropagation(); }}>
                <i className="material-icons">delete</i>
            </button>
        </>)
    };

    const showAddMenuItem = () => {
        console.log('show add menu item');
        setSelectedMenuItem({ id: String(Date.now()), name: "", description: "", price: new Money(Currency.AUD, 0, 0) });
        setModalActionText("Add");
        setShowModal(true);
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
                            handleDiameter={15}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={10}
                            width={24}
                            id="material-switch"
                        />
                    </div>
                    <div className="table-head">
                        <button onClick={showAddMenuItem}>Add</button>
                    </div>
                    <div className="row title">
                        <div className="menu-item">id</div>
                        <div className="menu-name">Name</div>
                        <div className="menu-description">Description</div>
                        <div className="menu-price">Price</div>
                        <div className="menu-action"></div>
                    </div>
                    {
                        menuItems.map((menuItem) => <MenuItem key={`mi-${menuItem.id}`} {...menuItem} handleClick={() => selectMenuItem(menuItem)} actions={createActions(menuItem, isEditMode)} />)
                    }
                </div>
                <div className="sides" />
                {
                    showModal ? <Modal onClose={() => { if (!busy) { setShowModal(false); } }}><MenuItemForm menuItem={selectedMenuItem} action={{ text: `${modalActionText}`, handler: saveMenuItem }} /></Modal> : null
                }
            </div>
        </Layout>


    );
}
