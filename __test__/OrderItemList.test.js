import { render } from '@testing-library/react-native';
import OrderItemList from '../components/OrderItemList';

const order = {
    id: 7139,
    name: "Anders Andersson",
    address: "Andersgatan 1",
    zip: "12345",
    city: "Anderstorp",
    country: "Sweden",
    status: "Fakturerad",
    status_id: 100,
    order_items: [
        {
            product_id: 27978,
            amount: 999,
            article_number: "1214-RNT",
            name: "Skruv M14",
            description: "Skruv M14, värmförsinkad",
            specifiers: "{\"length\" : \"60mm\", \"width\" : \"14mm\"}",
            stock: 26,
            location: "A1B4",
            price: 10
        }
    ]
};

test('List should contain one order with Skruv M14', async () => {
    const { getByText } = render(<OrderItemList order={order} />);

    const result = await getByText("Skruv M14", { exact: false });

    expect(result).toBeDefined();
});
