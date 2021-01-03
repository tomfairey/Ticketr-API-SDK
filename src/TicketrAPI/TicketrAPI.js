import API from '../API/API.js';

export default class TicketrAPI extends API {
    #token
    
    constructor() {
        super({
            domain: "https://api.ticketr.toms-home.co.uk",
            defaultTimeout: 60000
        })
    }
    async getStatus() {
        return await this.sendRequest();
    }
    async getAuth(username, password) {
        return await new Promise(async (resolve, reject) => {
            let authResponse;
            try {
                authResponse = await this.sendRequest('post', '/auth/login', {username, password});
                

                if(authResponse.status == 200 && authResponse.data.hasOwnProperty('accessToken')) {
                    this.#token = authResponse.data['accessToken'];
                    this.token = authResponse.data['accessToken'];

                    resolve({status: 200, data: { status: 200 }});
                } else {
                    reject(authResponse);
                }
            } catch(e) {    
                reject(e);
            }
        });
    }
    async getBaskets() {
        return await new Promise(async (resolve, reject) => {
            let authResponse;
            try {
                authResponse = await this.sendRequest('get', '/ticketr/basket');

                if(authResponse.status.toString().split("")[0] == "2") {
                    resolve(authResponse);
                } else {
                    reject(authResponse);
                }
            } catch(e) {    
                reject(e);
            }
        });
    }
}