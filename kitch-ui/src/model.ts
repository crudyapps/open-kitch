import { Money } from "./money";

export namespace model {
    export interface MenuItemState {
        id: string;
        name: string;
        description: string;
        price: Money;
    }
} 