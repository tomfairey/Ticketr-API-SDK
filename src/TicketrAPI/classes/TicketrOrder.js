import { TicketrTicket } from '../classes';

export default class TicketrOrder {
    #uuid
    #delivered
    #paymentAttempted
    #paymentConfirmed
    #tickets
    #quantity
    #total
    #created
    #modified
    #TicketrApi

    constructor({
        uuid,
        delivered,
        paymentAttempted,
        paymentConfirmed,
        tickets,
        quantity,
        total,
        creation,
        modified
    }, ticketrApi = null) {
        this.#uuid = uuid;
        this.#delivered = delivered;
        this.#paymentAttempted = paymentAttempted;
        this.#paymentConfirmed = paymentConfirmed;
        let ticketsObj = {};
        for(let ticketIndex in tickets) {
            ticketsObj[ticketIndex] = {
                quantity: tickets[ticketIndex]['quantity'],
                ticket: new TicketrTicket(tickets[ticketIndex]['ticket'])
            };
        }
        this.#tickets = ticketsObj;
        this.#quantity = quantity;
        this.#total = total;
        this.#created = new Date(creation * 1000);
        this.#modified = new Date(modified * 1000);

        this.#TicketrApi = ticketrApi;
    }

    get uuid() {
        return this.#uuid;
    }
    get delivered() {
        return this.#delivered;
    }
    get paymentAttempted() {
        return this.#paymentAttempted;
    }
    get paymentConfirmed() {
        return this.#paymentConfirmed;
    }
    get tickets() {
        return this.#tickets;
    }
    get quantity() {
        return this.#quantity;
    }
    get total() {
        return this.#total;
    }
    get created() {
        return this.#created;
    }
    get modified() {
        return this.#modified;
    }

    async getPaymentIntentAmount() {
        let authResponse;
        try {
            authResponse = await this.#TicketrApi.sendRequest('post', `/ticketr/order/${this.#uuid}`);

            if(authResponse.status.toString().split("")[0] == "2") {
                return authResponse.data.amount;
            } else {
                throw authResponse;
            }
        } catch(e) {    
            throw e;
        }
    }
    async getPaymentIntentClientSecret() {
        let authResponse;
        try {
            authResponse = await this.#TicketrApi.sendRequest('post', `/ticketr/order/${this.#uuid}`);

            if(authResponse.status.toString().split("")[0] == "2") {
                return authResponse.data.client_secret;
            } else {
                throw authResponse;
            }
        } catch(e) {    
            throw e;
        }
    }
    async getPaymentIntentStatus() {
        let authResponse;
        try {
            authResponse = await this.#TicketrApi.sendRequest('post', `/ticketr/order/${this.#uuid}`);

            if(authResponse.status.toString().split("")[0] == "2") {
                return authResponse.data.status;
            } else {
                throw authResponse;
            }
        } catch(e) {    
            throw e;
        }
    }
}