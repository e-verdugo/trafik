import { useEffect } from 'react';
import productModel from '../models/products';
import { View, Text } from 'react-native';
import { Typography } from '../styles';

export default function StockList({products, setProducts}) {
    useEffect(() => {
        (async () => {
            setProducts(await productModel.getProducts())
        })()
    }, []);

    const list = products.map((product, index) => <Text style={Typography.normal} key={index}>{product.name} - {product.stock}</Text>);

    return (
        <View>
            {list}
        </View>
    );
}
