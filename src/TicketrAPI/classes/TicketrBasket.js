import { TicketrOrder, TicketrTicket } from '../classes';

export default class TicketrBasket {
    #uuid
    #device
    #tickets
    #activated
    #created
    #modified
    #expiry
    #TicketrApi

    constructor({
        uuid,
        tickets,
        creation,
        modified,
        expiry
    }, ticketrApi = null) {
        this.#uuid = uuid;
        let ticketsObj = {};
        for(let ticketIndex in tickets) {
            ticketsObj[ticketIndex] = {
                quantity: tickets[ticketIndex]['quantity'],
                ticket: new TicketrTicket(tickets[ticketIndex]['ticket'])
            };
        }
        this.#tickets = ticketsObj;
        this.#created = new Date(creation * 1000);
        this.#modified = new Date(modified * 1000);
        this.#expiry = new Date(expiry * 1000);

        this.#TicketrApi = ticketrApi;
    }

    get uuid() {
        return this.#uuid;
    }
    get tickets() {
        return this.#tickets;
    }
    get created() {
        return this.#created;
    }
    get modified() {
        return this.#modified;
    }
    get expiry() {
        return this.#expiry;
    }

    async update(response = null) {
        return await new Promise(async (resolve, reject) => {
            if(!response) {
                try {
                    let request = await this.#TicketrApi.sendRequest('get', `/ticketr/basket/${this.#uuid}`);

                    if(request.status.toString().split("")[0] == "2") {
                        response = request.data;
                    } else {
                        reject(authResponse);
                    }
                } catch(e) {    
                    reject(e);
                }
            }

            let ticketsObj = {};
            for(let ticketIndex in response.tickets) {
                ticketsObj[ticketIndex] = {
                    quantity: response.tickets[ticketIndex]['quantity'],
                    ticket: new TicketrTicket(response.tickets[ticketIndex]['ticket'])
                };
            }
            this.#tickets = ticketsObj;
            this.#created = new Date(response.creation * 1000);
            this.#modified = new Date(response.modified * 1000);
            this.#expiry = new Date(response.expiry * 1000);

            resolve(true);
        });
    }

    get(ticket) {
        return this.#tickets[ticket.uuid];
    }

    async add(ticket, quantity = 1) {
        if(quantity <= 0) {
            if (quantity) throw new Error("UNACCEPTABLE_QUANTITY");
            return true;
        } else {
            return await new Promise(async (resolve, reject) => {
                let authResponse;
                try {
                    authResponse = await this.#TicketrApi.sendRequest('put', `/ticketr/basket/${this.#uuid}/${ticket.uuid}`, {delta: quantity});

                    await this.update(authResponse.data);

                    if(authResponse.status.toString().split("")[0] == "2") {
                        resolve(true);
                    } else {
                        reject(authResponse);
                    }
                } catch(e) {    
                    reject(e);
                }
            });
        }
    }
    async remove(ticket, quantity = 1) {
        if(quantity <= 0) {
            if (quantity) throw new Error("UNACCEPTABLE_QUANTITY");
            return true;
        } else {
            return await new Promise(async (resolve, reject) => {
                let authResponse;
                try {
                    authResponse = await this.#TicketrApi.sendRequest('put', `/ticketr/basket/${this.#uuid}/${ticket.uuid}`, {delta: -quantity});

                    await this.update(authResponse.data);

                    if(authResponse.status.toString().split("")[0] == "2") {
                        resolve(true);
                    } else {
                        reject(authResponse);
                    }
                } catch(e) {    
                    reject(e);
                }
            });
        }
    }
    async removeAll(ticket) {
        return await new Promise(async (resolve, reject) => {
            let authResponse;
            try {
                authResponse = await this.#TicketrApi.sendRequest('delete', `/ticketr/basket/${this.#uuid}/${ticket.uuid}`);

                await this.update(authResponse.data);

                if(authResponse.status.toString().split("")[0] == "2") {
                    resolve(true);
                } else {
                    reject(authResponse);
                }
            } catch(e) {    
                reject(e);
            }
        });
    }

    async checkout(ticket) {
        return await new Promise(async (resolve, reject) => {
            let authResponse;
            try {
                authResponse = await this.#TicketrApi.sendRequest('post', `/ticketr/basket/${this.#uuid}/checkout`);

                if(authResponse.status.toString().split("")[0] == "2") {
                    let resolution = new TicketrOrder(authResponse.data, this.#TicketrApi);
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