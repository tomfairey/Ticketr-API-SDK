import { TicketrTicket } from '../classes';

export default class TicketrBasket {
    #uuid
    #device
    #tickets
    #activated
    #created
    #modified
    #expiry

    constructor({
        uuid,
        tickets,
        creation,
        modified,
        expiry
    }) {
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
}