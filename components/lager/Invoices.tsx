import { Button, View, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import invoiceModel from "../models/invoices";
import authModel from '../models/lager/auth';
import { Base, Typography } from "../styles";
import { DataTable } from "react-native-paper";

export default function Invoices({ navigation }) {
    const [allInvoices, setAllInvoices] = useState([]);

    useEffect(() => {
        const update = navigation.addListener('focus', async () => {
            setAllInvoices(await invoiceModel.getInvoices())
        });
        return update;
    }, [navigation]);

    const table = allInvoices.map((invoice, index) => {
        return (
            <DataTable.Row key={index}>
                <DataTable.Cell>{invoice.name}</DataTable.Cell>
                <DataTable.Cell>{invoice.id}</DataTable.Cell>
                <DataTable.Cell>{invoice.order_id}</DataTable.Cell>
            </DataTable.Row>
        );
    });

    return (
        <ScrollView>
            <View style={Base.scroll}>
                <DataTable>
                    <DataTable.Header style={Typography.header2}>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title>Id</DataTable.Title>
                        <DataTable.Title>Order</DataTable.Title>
                    </DataTable.Header>
                    {table}
                </DataTable>
                <Button
                    title="Fakturera orders"
                    onPress={async () => {
                        setAllInvoices(await invoiceModel.getInvoices());
                        navigation.navigate('Fakturera orders', {params: {reload: true}});
                    }}
                />
                <Button
                    title="Log out"
                    onPress={() => {
                        authModel.logout();
                        navigation.navigate('Lager');
                    }}
                />
            </View>
        </ScrollView>
    );
}
