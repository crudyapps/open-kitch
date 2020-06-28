import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Money, Currency } from "./money";

export interface OrderWaiting {
    number: number;
    contact: string;
    value: Money;
    created: Date;
}
export interface Order {
    day: Date;
    contact: string;
    number: number;
    items: OrderItem[];
}

export interface OrderItem {
    number: number;
    name: string;
    count: number;
}

function OrderPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [order, setOrder] = useState<Order>();
    const [ordersWaiting, setOrdersWaiting] = useState<OrderWaiting[]>()
    useEffect(() => {
        setOrdersWaiting([{
            number: 56,
            contact: "Alex",
            value: new Money(Currency.AUD, 879, 20),
            created: new Date()
        }, {
            number: 57,
            contact: "John",
            value: new Money(Currency.AUD, 55, 50),
            created: new Date()
        }])
        setOrder({
            day: new Date(Date.now()),
            contact: "Justin",
            number: 55,
            items: [{
                number: 1,
                name: "eggs on toast",
                count: 5
            }, {
                number: 2,
                name: "smashed avocado",
                count: 2
            }]
        })
    }, [isLoaded])

    return (
        <Layout>
            <div className="order">
                <div className="order-top">
                    <div className="order-details-container">
                        <div className="order-details">
                            <div className="order-info">
                                <div className="contact-name">
                                    <div>
                                        Contact name
                                </div>
                                    <div>
                                        {order?.contact}
                                    </div>
                                </div>
                                <div className="order-number">
                                    <div>
                                        Order number
                                </div>
                                    <div>
                                        #{order?.number}
                                    </div>
                                </div>
                            </div>
                            <div className="order-items">
                                {
                                    order?.items?.map((item, index) =>
                                        (<div key={`oi-${index}`} className="order-item">
                                            <div className="order-item-number">{item.number}</div><div className="order-item-name">{item.name}</div><div className="order-item-count">{item.count}</div></div>))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="order-list-container">
                        <div className="order-list">
                            <div className="waiting-title">Waiting</div>
                            {
                                ordersWaiting?.map((order, index) => (<div key={`ow-${index}`} className="waiting-order">{`#${order.number}-${order.contact}--${order.value.toString(true)}`}</div>))
                            }
                        </div>
                    </div>
                </div>
                <div className="order-bottom">
                    <div className="dashboard-card">
                        <div>Order count</div>
                        <div>99</div>
                        <div>for today</div>
                    </div>
                    <div className="dashboard-card">
                        <div>Order Item</div>
                        <div>753</div>
                        <div>per hour</div>
                    </div>
                    <div className="dashboard-card">
                        <div>Revenue</div>
                        <div className="dashboard-card-money">
                            <div>AUD</div>
                            <div>5000</div>
                        </div>
                        <div>for today</div>
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default OrderPage;