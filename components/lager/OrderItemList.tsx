import { Text } from "react-native";
import { Typography } from '../styles';

export default function OrderItemList({ order }) {
    const orderItemsList = order.order_items.map((item, index) => {
        return <Text style={Typography.normal}
                key={index}>
                    {item.name} - {item.amount} - {item.location}
            </Text>;
    });
    return orderItemsList;
}