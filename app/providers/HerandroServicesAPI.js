const axios = require('axios');

class HerandroServicesAPI {
    constructor(){
        const baseURL= process.env.HERANDRO_SERVICES_API ?? "http://84.247.137.97:9000";

        this.axiosInstance = axios.create({
            baseURL: baseURL,
            timeout: 5000,
            // headers: {'Authorization': 'Bearer TOKEN'} // Si necesitas headers
        });
    }

    async correctorText(text){
        return await this.axiosInstance.get('/corrector-text', {
            params: { text }
        });
    }


    async translate(language, text){
        return await this.axiosInstance.get('/translate', {
            params: { text: text, language: language }
        });
    }



    //
}

module.exports = new HerandroServicesAPI();