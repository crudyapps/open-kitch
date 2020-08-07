import { api } from "./api";
import { model } from "./model";
import { Money } from "./money";

export function toMenuItemContract(menuItem: model.MenuItemState): api.contracts.MenuItem {
    const { id, name, description, price } = menuItem;

    return {
        id: Number(id),
        name,
        description,
        price: price.toJSON()
    }
}

export function toMenuItemState(menuItems: api.contracts.MenuItem[]): model.MenuItemState[] {
    return menuItems.map(({ id, name, description, price }) => ({ id: String(id), name, description, price: Money.fromJSON(price) }));
}
