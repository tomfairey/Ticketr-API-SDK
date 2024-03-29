import API from '../API/API.js';
import { TicketrBasket, TicketrOrder, TicketrProfile, TicketrTicket, TicketrUser } from './classes';

export default class TicketrAPI extends API {
    #user
    #profile
    #token
    
    constructor({
        profile = null,
        token = null
    }) {
        super({
            domain: "https://api.ticketr.toms-home.co.uk",
            defaultTimeout: 60000
        });

        if(!!profile) {
            this.header = {
                name: "X-Profile",
                data: profile
            };
        }
        if(!!token) {
            this.#token = token;
            this.setToken = token;
        }
    }

    async requestIntermediatary() {
        let attempts = 0;
        let response;

        while(!response && attempts < 3) {
            attempts ++;

            response = await this.sendRequest('get', '/ticketr/profile');

            if(response.status.toString().split("") !== "2" && response.data.hasOwnProperty("rectify")) {
                if(await this.errorRectifier(response)) {
                    attempts -= 1;
                }
            } else if(attempts < 3) {
                response = null;
            }
        }

        return response;
    }
    
    async errorRectifier(r) {
        switch(r.status) {
            case 403:
                switch(r.data.code) {
                    case "REFRESH_TOKEN":
                        await this.refreshAuthentication();
                        return true;
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }

        return false;
    }

    get user() {
        return this.#user;
    }
    get profile() {
        return this.#profile;
    }
    get token() {
        return this.#token;
    }
    get hasToken() {
        return !!this.#token;
    }

    async setProfile(profile) {
        this.#profile = profile;
        this.header = {
            name: "X-Profile",
            data: this.#profile.uuid
        };
    }
    async getUser(update = false) {
        if(this.#user && !update) {
            return this.#user;
        } else {
            return await new Promise(async (resolve, reject) => {
                let authResponse;
                try {
                    authResponse = await this.sendRequest('get', '/ticketr/user');

                    if(authResponse.status == 200) {
                        this.#user = new TicketrUser(authResponse.data);

                        resolve(this.#user);
                    } else {
                        reject(authResponse);
                    }
                } catch(e) {    
                    reject(e);
                }
            });
        }
    }
    async getProfile(update = false) {
        if(this.#profile && !update) {
            return this.#profile;
        } else {
            return await new Promise(async (resolve, reject) => {
                let authResponse;
                try {
                    authResponse = await this.sendRequest('get', '/ticketr/profile');

                    if(authResponse.status == 200) {
                        this.#profile = new TicketrProfile(authResponse.data, this);

                        resolve(this.profile);
                    } else {
                        reject(authResponse);
                    }
                } catch(e) {
                    reject(e);
                }
            });
        }
    }

    async getStatus() {
        return await this.sendRequest();
    }
    async getAuthentication(username, password) {
        return await new Promise(async (resolve, reject) => {
            let authResponse;
            try {
                authResponse = await this.sendRequest('post', '/auth/login', {username, password});

                if(authResponse.status == 200 && authResponse.data.hasOwnProperty('accessToken')) {
                    this.#token = authResponse.data['accessToken'];
                    this.setToken = authResponse.data['accessToken'];

                    let resolution = {user: await this.getUser()};

                    try {
                        let profile = await this.getProfile();
                        resolution['profile'] = profile;
                    } catch(e) {
                        console.warn(e);
                    }

                    resolve(resolution);
                } else {
                    reject(authResponse);
                }
            } catch(e) {    
                reject(e);
            }
        });
    }
    async refreshAuthentication() {
        return await new Promise(async (resolve, reject) => {
            let authResponse;
            try {
                authResponse = await this.sendRequest('post', '/auth/refresh');

                if(authResponse.status == 200 && authResponse.data.hasOwnProperty('accessToken')) {
                    this.#token = authResponse.data['accessToken'];
                    this.setToken = authResponse.data['accessToken'];

                    resolve({user: await this.getUser(), profile: await this.getProfile()});
                } else {
                    reject(authResponse);
                }
            } catch(e) {    
                reject(e);
            }
        });
    }

    async newBasket() {
        return await new Promise(async (resolve, reject) => {
            let authResponse;
            try {
                authResponse = await this.sendRequest('post', '/ticketr/basket');

                if(authResponse.status.toString().split("")[0] == "2") {
                    let resolution;
                    if(authResponse.status != 204) {
                        resolution = new TicketrBasket(authResponse.data, this);
                    }
                    resolve(resolution);
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
                    let resolution = {};
                    if(authResponse.status != 204) {
                        for(let basketIndex in authResponse.data) {
                            resolution[basketIndex] = new TicketrBasket(authResponse.data[basketIndex], this);
                        }
                    }
                    resolve(resolution);
                } else {
                    reject(authResponse);
                }
            } catch(e) {    
                reject(e);
            }
        });
    }
    async getOrders() {
        return await new Promise(async (resolve, reject) => {
            let authResponse;
            try {
                authResponse = await this.sendRequest('get', '/ticketr/order');

                if(authResponse.status.toString().split("")[0] == "2") {
                    let resolution = [];
                    if(authResponse.status != 204) {
                        for(let order of authResponse.data) {
                            resolution.push(new TicketrOrder(order));
                        }
                    }
                    resolve(resolution);
                } else {
                    reject(authResponse);
                }
            } catch(e) {    
                reject(e);
            }
        });
    }
    async postOrder(uuid) {
        return await new Promise(async (resolve, reject) => {
            let authResponse;
            try {
                authResponse = await this.sendRequest('post', `/ticketr/order/${uuid}`);

                if(authResponse.status.toString().split("")[0] == "2") {
                    // let resolution = [];
                    // for(let order of authResponse.data) {
                    //     resolution.push(new TicketrOrder(order));
                    // }
                    resolve(authResponse.data);
                } else {
                    reject(authResponse);
                }
            } catch(e) {    
                reject(e);
            }
        });
    }

    async getTickets() {
        return await new Promise(async (resolve, reject) => {
            let authResponse;
            try {
                authResponse = await this.sendRequest('get', '/ticketr/tickets');

                if(authResponse.status.toString().split("")[0] == "2") {
                    let resolution = [];
                    if(authResponse.status != 204) {
                        for(let ticket of authResponse.data) {
                            resolution.push(new TicketrTicket(ticket));
                        }
                    }
                    resolve(resolution);
                } else {
                    reject(authResponse);
                }
            } catch(e) {    
                reject(e);
            }
        });
    }
}