import React, { useState } from "react";
import { Money } from './money';
import { api } from "./api";

export interface MenuItemInputProps {
    handleSave: (menuItem: api.contracts.MenuItem) => void;
}

export default function MenuItemInput(props: MenuItemInputProps) {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const { handleSave } = props;
    return (
        <div className="row-container">
            <div className="row">
                <div className="menu-item"><input type="text" onChange={e => setId(e.target.value)} value={id} /></div>
                <div className="menu-name"><input type="text" onChange={e => setName(e.target.value)} value={name} /></div>
                <div className="menu-description"><input type="text" onChange={e => setDescription(e.target.value)} value={description} /></div>
                <div className="menu-price"><input type="text" onChange={e => setPrice(e.target.value)} value={price} /></div>
                <div className="menu-action"><button onClick={() => handleSave({ id, name, description, price: Money.fromString(price) })}>Save</button></div>
            </div>
        </div>
    )
}