import { render } from '@testing-library/react-native';
import DeliveriesList from '../components/DeliveriesList';

const setProducts = () => false;

test('There should be a message saying that there are no deliveries', async () => {
    const { getByText } = render(<DeliveriesList route={false} setProducts={setProducts}/>);

    const noDeliveries = await getByText('Finns inga inleveranser.', { exact: false });

    expect(noDeliveries).toBeDefined();
});