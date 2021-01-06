import API from '../API/API.js';
import { TicketrUser, TicketrProfile } from './classes';

export default class TicketrAPI extends API {
    #user
    #profile
    #token
    
    constructor() {
        super({
            domain: "https://api.ticketr.toms-home.co.uk",
            defaultTimeout: 60000
        })
    }

    get user() {
        return this.#user;
    }
    get profile() {
        return this.#profile;
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
                        this.#profile = new TicketrProfile(authResponse.data);

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
                    this.token = authResponse.data['accessToken'];

                    resolve({user: await this.getUser()});
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
                    this.token = authResponse.data['accessToken'];

                    resolve({user: await this.getUser()});
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