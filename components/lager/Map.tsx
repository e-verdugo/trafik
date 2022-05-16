import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShipOrder from "./MapDetails";
import OrderList from "./MapList";

const Stack = createNativeStackNavigator();

export default function Map(props) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={OrderList} />
            <Stack.Screen name="Map">
                {(screenProps) => <ShipOrder {...screenProps} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}