import { ScrollView, Text, View } from 'react-native';
import { Base, Typography } from '../styles';
import StockList from './StockList';

export default function Stock({products, setProducts}) {
    return (
        <ScrollView>
            <View style={Base.scroll}>
                <Text style={Typography.header4}>Lagerförteckning</Text>
                <StockList products={products} setProducts={setProducts}/>
            </View>
        </ScrollView>
    );
}