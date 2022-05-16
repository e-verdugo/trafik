export default interface Invoices {
    id: number,
    order_id: number,
    name: string,
    address: string,
    zip: number,
    city: string,
    country: string,
    total_price: number,
    creation_date: string,
    due_date: string
};
