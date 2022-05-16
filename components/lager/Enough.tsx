import { Text, Button } from "react-native";
import orderModel from "../models/orders";
import { Typography } from '../styles';
import productModel from '../models/products';

export default function Enough({ order, setProducts, navigation }) {
    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await productModel.getProducts());
        navigation.navigate("List", { reload: true });
    }

    let canPick;
    let isEnough = true;
    const checkIfEnough = order.order_items.map((item) => {
        if (item.amount > item.stock) {
            isEnough = false;
        }
    });

    const enough = (<Button title={"Allt finns på lager. Plocka order?"} onPress={pick}/>);
    const notEnough = (<Text style={Typography.normal}>För få artiklar på lager.</Text>);

    if (isEnough) {
        canPick = enough;
    } else {
        canPick = notEnough;
    }
    return canPick;
}