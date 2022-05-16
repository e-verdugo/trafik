import config from "../config/config.json";
import Order from "../interfaces/order";
import OrderItem from "../interfaces/order_item";
import OrderModel from "./orders";
import AsyncStorage from "@react-native-async-storage/async-storage";


const invoices = {
    getInvoices: async function getInvoices() {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            headers: {
                'x-access-token': token,
            },
            method: 'GET'
        });
        const result = await response.json();
        return result.data;
    },
    addInvoice: async function addInvoice(order: Partial<Order>) {
        let invoice = await invoices.orderToInvoice(order);
        const token = await AsyncStorage.getItem('token');
        try {
            await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
                body: JSON.stringify(invoice),
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': token,
                },
                method: 'POST'
            });
            let changedOrder = {
                id: order.id,
                name: order.name,
                status_id: 600,
                api_key: config.api_key,
            };
            await OrderModel.updateOrder(changedOrder);
        } catch (error) {
            console.log("Could not add invoice");
        }
    },
    orderToInvoice: async function orderToInvoice(order: Partial<Order>) {
        let price = await Promise.all(order.order_items.map(async (order_item: Partial<OrderItem>) => {
            return order_item.price * order_item.amount
        }));
        let total_price = 0;
        for (let i = 0; i < price.length; i++) {
            total_price += price[i];
        }
        let date = new Date();
        let duedate = new Date(date.setMonth(date.getMonth()+3));
        let invoice = {
            order_id: order.id,
            name: order.name,
            address: order.address,
            zip: order.zip,
            city: order.city,
            country: order.country,
            total_price: total_price,
            creation_date: new Date().toLocaleDateString(),
            due_date: duedate.toLocaleDateString(),
            api_key: config.api_key,
        };
        return invoice;
    },
};

export default invoices;