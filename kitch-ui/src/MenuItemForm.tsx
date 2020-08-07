import React, { useState } from "react";
import { Model } from "./model/MenuItem";
import BarLoader from "react-spinners/BarLoader";
import { model } from "./model";
import { Currency, Money } from "./money";

export interface MenuItemFormAction {
    text: string;
    handler: (data: Model.MenuItem) => void;
}

export interface MenuItemFormProps {
    menuItem?: model.MenuItemState;
    action: MenuItemFormAction;
}

const emptyState = { id: "", name: "", description: "", price: new Money(Currency.AUD, 0, 0) };
export default function MenuItemForm(props: MenuItemFormProps) {
    const { action, menuItem } = props;
    const { id, name: defaultName, description: defaultDescription, price: defaultPrice } = (!menuItem ? emptyState : menuItem);
    const [showSpinner, setShowSpinner] = useState(false);
    const [name, setName] = useState(defaultName);
    const [description, setDescription] = useState(defaultDescription);
    const [price, setPrice] = useState(defaultPrice);

    return (
        <>
            <div className="form">
                <div className="form-row"><div className="label">id</div><div className="input">{id}</div></div>
                <div className="form-row"><div className="label">Name</div><div className="input"><input type="text" defaultValue={defaultName} onChange={(e) => setName(e.target.value)} /></div></div>
                <div className="form-row multiline"><div className="label">Description</div><div className="input"><textarea rows={5} defaultValue={defaultDescription} onChange={(e) => setDescription(e.target.value)} /></div></div>
                <div className="form-row"><div className="label">Price</div><div className="input"><input type="text" defaultValue={defaultPrice.toString()} onChange={(e) => setPrice(Money.fromString(e.target.value))} /></div></div>
            </div>
            <div style={{
                padding: 20,
                display: 'flex',
                minWidth: '30em',
                justifyContent: 'flex-end'
            }}>
                {showSpinner ? <BarLoader /> :
                    <button className="form-button" key={action.text} onClick={() => { setShowSpinner(true); action.handler({ id, name, description, price }); }}>{action.text}</button>}
            </div>
        </>
    );
}