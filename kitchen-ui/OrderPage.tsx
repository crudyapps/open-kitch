import React from "react";
import Layout from "./Layout";


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
        <Layout>
            <div>Order</div>
        </Layout>

    )
}

export default OrderPage;