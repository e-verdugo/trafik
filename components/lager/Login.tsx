import Auth from '../interfaces/auth';
import { useState, useEffect } from 'react';
import AuthModel from '../models/lager/auth';
import AuthFields from './AuthFields';
import { showMessage } from 'react-native-flash-message';

export default function Login({route, navigation, setIsLoggedIn}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});
    // let { reload } = route.params || false;

    // if (reload) {
    //     reloadLogin();
    // }

    // async function reloadLogin() {
    //     setIsLoggedIn(await AuthModel.loggedIn());
    //     route.params = false;
    // }

    // useEffect(() => {
    //     reloadLogin();
    // }, []);

    async function doLogin() {
        if (auth.email && auth.password) {
            const result = await AuthModel.login(auth.email, auth.password);
    
            if (result.type === "success") {
                setIsLoggedIn(true);
            }
    
            showMessage({
                message: result.title,
                description: result.message,
                type: result.type,
            });
        } else {
            showMessage({
                message: "Saknas",
                description: "E-post eller lösenord saknas",
                type: "warning",
            });
        }
    }

    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={doLogin}
            title="Logga in"
            navigation={navigation}
        />
    );
};