import { useState, useEffect } from 'react';
import { Base, Typography, Forms } from '../styles';
import Delivery from '../interfaces/delivery';
import { Picker } from '@react-native-picker/picker';
import productModel from "../models/products";
import deliveryModel from "../models/deliveries";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, ScrollView, Text, TextInput, Button, View } from "react-native";
import { showMessage } from 'react-native-flash-message';

export default function DeliveryForm({ navigation }) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState({});

    async function addDelivery() {
        if (delivery.delivery_date == null) {
            showMessage({
                message: "Saknas",
                description: "Datum saknas",
                type: "warning",
            });
        } else {
            await deliveryModel.updateDeliveries(delivery);
            const updatedProduct = {
                ...currentProduct,
                stock: (currentProduct.stock || 0) + (delivery.amount || 0)
            };
            await productModel.updateProduct(updatedProduct);
            navigation.navigate("List", { reload: true });
        }
    }

    return (
        <ScrollView>
            <View style={ Base.scroll }>
                <Text style={{ ...Typography.header2 }}>Ny inleverans</Text>

                <Text style={{ ...Typography.label }}>Kommentar</Text>
                <TextInput
                    style={{ ...Forms.input }}
                    onChangeText={(content: string) => {
                        setDelivery({ ...delivery, comment: content })
                    }}
                    value={delivery?.comment}
                />
                <Text style={{ ...Typography.label }}>Antal</Text>
                <TextInput
                    style={{ ...Forms.input }}
                    onChangeText={(content: string) => {
                        setDelivery({ ...delivery, amount: parseInt(content) })
                    }}
                    value={delivery?.amount?.toString()}
                    keyboardType="numeric"
                />
                <Text style={{ ...Typography.label }}>Produkt</Text>
                <ProductDropDown
                    delivery={delivery}
                    setDelivery={setDelivery}
                    setCurrentProduct={setCurrentProduct}
                />
                <Text style={{ ...Typography.label }}>Datum</Text>
                <DateDropDown
                    delivery={delivery}
                    setDelivery={setDelivery}
                />
                <Button
                    title="Gör inleverans"
                    onPress={() => {
                        addDelivery();
                    }}
                />
            </View>
        </ScrollView>
    );
};

function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        props.setDelivery({
                            ...props.delivery,
                            delivery_date: date.toLocaleDateString('se-SV'),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}

function ProductDropDown(props) {
    const [products, setProducts] = useState([]);
    let productsHash: any = {};

    useEffect(() => {
        (async () => {
            setProducts(await productModel.getProducts())
        })()
    }, []);

    const itemsList = products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });

    return (
        <Picker
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue) => {
                props.setDelivery({ ...props.delivery, product_id: itemValue });
                props.setCurrentProduct(productsHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
    );
}
