import React, { useState, useEffect } from "react";
import { Money } from './money';
import { api, kitchenId } from "./api";
import Spinner from "./components/Spinner";
import { MenuItemState } from "./MenuItemsPage";

export interface MenuItemInputProps {
    menuItem?: MenuItemState;
    OnSave?: () => void;
    OnSaved?: () => void;
    handleDelete?: (id: string | undefined) => void;
}

export default function MenuItemInput(props: MenuItemInputProps) {
    const { menuItem } = props;
    const [id, setId] = useState(menuItem?.item);
    const [name, setName] = useState(menuItem?.name);
    const [description, setDescription] = useState(menuItem?.description);
    const [price, setPrice] = useState(menuItem?.price.toString());
    const [isBusy, setIsBusy] = useState(false);
    const { OnSave, OnSaved, handleDelete } = props;
    if (isBusy) {
        return <Spinner />;
    }
    const handleSave = (menuItem: api.contracts.MenuItem) => {
        const { id, name, description, price } = menuItem;
        if (!id) {
            alert("item cannot be empty");
            return;
        }
        setIsBusy(true);
        if (OnSave) {
            OnSave();
        }
        api.kitchen
            .addMenuItem(kitchenId, menuItem)
            .then((success) => {
                if (!success) {
                    console.log('error');
                }
                setIsBusy(false);
                if (OnSaved) {
                    OnSaved();
                }
            })
    }
    return (<>
        <div className="menu-item"><input type="text" onChange={e => setId(e.target.value)} defaultValue={id} /></div>
        <div className="menu-name"><input type="text" onChange={e => setName(e.target.value)} defaultValue={name} /></div>
        <div className="menu-description"><input type="text" onChange={e => setDescription(e.target.value)} defaultValue={description} /></div>
        <div className="menu-price">
            <input type="text" onChange={e => setPrice(e.target.value)} defaultValue={price} />
        </div>
        <div className="menu-action">
            <button onClick={() => handleSave({ id, name, description, price: Money.fromString(price) })}><i className="material-icons save-green">check_circle</i></button>
            {
                handleDelete ? <button onClick={() => handleDelete(id)}><i className="material-icons delete-red">delete</i></button> : null
            }
        </div>
    </>);
}