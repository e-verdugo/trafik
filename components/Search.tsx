import { View, Text, TextInput, Button } from "react-native";
import { Typography, Forms, Base } from '../styles';

export default function Search({ navigation }: any) {
    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>För vilken sträcka vill du hitta försenade tåg?</Text>

            <TextInput
                style={Forms.input}
                // onChangeText={(content: string) => {
                //     setAuth({ ...auth, email: content })
                // }}
                // value={auth?.email}
                // keyboardType="email-address"
            />

            <TextInput
                style={Forms.input}
                // onChangeText={(content: string) => {
                //     setAuth({ ...auth, password: content })
                // }}
                // value={auth?.password}
                // secureTextEntry={true}
            />
            <Button
                title="Arrow up and down"
                onPress={() => {
                    // change stations placement
                }}
            />
            <Button
                title="Sök"
                onPress={() => {
                    navigation.navigate("Delays");
                }}
            />
        </View>
    );
};