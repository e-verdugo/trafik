import { View, Text, ScrollView } from "react-native";
import { Base, Typography } from '../styles';
import OrderItemList from "./OrderItemList";
import Enough from "./Enough";

export default function PickList({ route, navigation, setProducts }) {
    const { order } = route.params;

    return (
        <ScrollView>
        <View style={Base.scroll}>
            <Text style={Typography.normal}>{order.name}</Text>
            <Text style={Typography.normal}>{order.address}</Text>
            <Text style={Typography.normal}>{order.zip} {order.city}</Text>
            <Text style={Typography.header4}>Produkter:</Text>
            <OrderItemList order={order}/>
            <Enough order={order} setProducts={setProducts} navigation={navigation}/>
        </View>
        </ScrollView>
    )
};
