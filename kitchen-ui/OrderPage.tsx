import React from "react";


export interface Order {
    day: Date;
    dayCount: number;
    items: OrderItem[];
}

export interface OrderItem {
    item: number;
    name: string;
    count: number;
}

function OrderPage() {
    return (
        <div>
            Order
        </div>

    )
}

export default OrderPage;