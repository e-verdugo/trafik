import { Button, View, ScrollView, Text } from "react-native";
import { useEffect, useState } from "react";
import invoiceModel from "../models/invoices";
import { Base, Typography } from "../styles";
import orderModel from "../models/orders";

export default function InvoiceOrders({route, navigation}) {
    let { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState([]);

    if (reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
        route.params = false;
    }

    useEffect(() => {
        reloadOrders();
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status == "Skickad" || order.status == "Packad")
        .map((order, index) => {
            return (<Text key={index} style={Typography.label}>Kund: {order.name} | Adress: {order.address} | Antal artiklar: {order.order_items.length}
                    <Button
                        title={"Fakturera"}
                        key={index}
                        onPress={() => {
                            invoiceModel.addInvoice(order);
                            navigation.navigate('Fakturor');
                        }}
                    />
                </Text>)
        });

    return (
        <ScrollView>
        <View style={Base.scroll}>
            <Text style={Typography.header3}>Ordrar redo att faktureras</Text>
            {listOfOrders}
        </View>
        </ScrollView>
    );
}
