import config from "../config/config.json";
import storage from "./storage";

const auth = {
    loggedIn: async function loggedIn() {
        const token = await storage.readToken();
        const twentyFourHours = 1000 * 60 * 60 * 24;
        const notExpired = (new Date().getTime() - token.date) < twentyFourHours;

        return token && notExpired;
    },
    login: async function login(email: string, password: string) {
        const data = {
            api_key: config.api_key,
            email: email,
            password: password,
        };
        const response = await fetch(`${config.auth_url}/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
        });
        const result = await response.json();

        if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
            return {
                title: result.errors.title,
                message: result.errors.detail,
                type: "danger",
            };
        }

        await storage.storeToken(result.data.token);

        return {
            title: "Inloggning",
            message: result.data.message,
            type: "success",
        };
    },
    register: async function register(email: string, password: string) {
        const data = {
            api_key: config.api_key,
            email: email,
            password: password,
        };
        const response = await fetch(`${config.auth_url}/register`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
        });

        return await response.json();
    },
    logout: async function logout() {
        await storage.deleteToken();
    },
    saveData: async function saveData(station: string) {
        const token = await storage.readToken();
        let method = "POST";
        const data = {
            artefact: station,
            api_key: config.api_key,
        };
        const response = await fetch(`${config.auth_url}/data`, {
            method: method,
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                'x-access-token': token.token
            },
        });

        return await response.json();
    },
    getData: async function getData() {
        const token = await storage.readToken();
        const response = await fetch(`${config.auth_url}/data?api_key=${config.api_key}`, {
            method: "GET",
            headers: {
                'x-access-token': token.token
            },
        });

        return await response.json();
    },
    deleteData: async function deleteData(data_id: string) {
        const token = await storage.readToken();
        let method = "DELETE";
        const data = {
            id: data_id,
            api_key: config.api_key,
        };
        const response = await fetch(`${config.auth_url}/data`, {
            method: method,
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                'x-access-token': token.token
            },
        });

        return await response.json();
    },
};

export default auth;