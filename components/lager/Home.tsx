import { ScrollView, Image, View } from 'react-native';
import warehouse from '../assets/warehouse.jpg';
import Stock from './Stock';
import { Base } from '../styles';

export default function Home({products, setProducts}) {
    return (
        <ScrollView>
            <View style={Base.scroll}>
                <Image source={warehouse} style={{ width: "100%" }} />
                <Stock products={products} setProducts={setProducts} />
            </View>
        </ScrollView>
    );
}