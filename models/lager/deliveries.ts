import config from "../config/config.json";
import Delivery from "../interfaces/delivery";

const deliveries = {
    getDeliveries: async function getDeliveries() {
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
        const result = await response.json();
        
        return result.data;
    },
    updateDeliveries: async function updateDeliveries(delivery: Partial<Delivery>) {
        try {
            delivery.api_key = config.api_key;

            await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`, {
                body: JSON.stringify(delivery),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST'
            });
        } catch (error) {
            console.log("Could not update delivery: ", error);
        }
    },
};

export default deliveries;