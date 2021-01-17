import { TicketrTicketEntitlement } from '../classes';

export default class TicketrProfile {
    #uuid
    #name
    #colour
    #tickets
    #group
    #creation
    #TicketrApi

    constructor({
        uuid,
        name,
        colour,
        tickets,
        group,
        creation
    }, ticketrApi = null) {
        this.#uuid = uuid;
        this.#name = name;
        this.#colour = colour;
        this.#tickets = tickets.map(t => new TicketrTicketEntitlement(t, ticketrApi));
        this.#group = group;
        this.#creation = creation;

        this.#TicketrApi = ticketrApi;
    }

    get uuid() {
        return this.#uuid;
    }
    get name() {
        return this.#name;
    }
    get colour() {
        return this.#colour;
    }
    get tickets() {
        return this.#tickets;
    }
    get group() {
        return this.#group;
    }
    get creation() {
        return this.#creation;
    }
}