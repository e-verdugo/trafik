import { View, Text, Button, ScrollView } from "react-native";
import { Base, Typography } from '../styles';
import deliveryModel from '../models/deliveries';
import productModel from '../models/products';
import { useState, useEffect } from 'react';

export default function DeliveriesList({ route, navigation, setProducts }) {
    let { reload } = route.params || false;
    const [deliveries, setDeliveries] = useState([]);
    let list;
    let isDeliv = false;

    if (reload) {
        reloadDeliveries();
    }

    async function reloadDeliveries() {
        setDeliveries(await deliveryModel.getDeliveries());
        setProducts(await productModel.getProducts());
        route.params = false;
    }

    useEffect(() => {
        reloadDeliveries();
    }, []);

    const listOfDeliveries = deliveries.map((delivery, index) => <Text style={Typography.normal} key={index}>Id: {delivery.id} - Produktid: {delivery.product_id} - Mängd: {delivery.amount} - Inleveransdatum: {delivery.delivery_date} - Kommentar: {delivery.comment} - Produktnamn: {delivery.product_name}</Text>);

    const noDeliveries = (<Text style={Typography.normal}>Finns inga inleveranser.</Text>)

    if (listOfDeliveries.length > 0) {
        isDeliv = true;
    }

    if (isDeliv) {
        list = listOfDeliveries;
    } else {
        list = noDeliveries;
    }

    return (
        <ScrollView>
            <View style={Base.base}>
                <Text style={Typography.header2}>Inleveranser</Text>
                {list}
                <Button
                    title="Skapa ny inleverans"
                    onPress={() => {
                        navigation.navigate('Form');
                    }}
                />
            </View>
        </ScrollView>
    );
}
