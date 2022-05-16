import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Invoices from "./Invoices";
import InvoiceOrders from "./InvoiceOrders"

const Stack = createNativeStackNavigator();

export default function Invoice(props) {
    return (
        <Stack.Navigator initialRouteName="Fakturor">
            <Stack.Screen name="Fakturor" component={Invoices} />
            <Stack.Screen name="Fakturera orders" component={InvoiceOrders} />
        </Stack.Navigator>
    )
}