import { render } from '@testing-library/react-native';
import PickList from '../components/PickList';

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

const setProducts = () => false;
const params = {order};
const route = {params};

jest.mock("../components/OrderItemList", () => "OrderItemList");
jest.mock("../components/Enough", () => "Enough");

test('List should contain a header for the products', async () => {
    const { getByText } = render(<PickList route={route} setProducts={setProducts} />);

    const result = await getByText("Produkter:", { exact: false });

    expect(result).toBeDefined();
});
