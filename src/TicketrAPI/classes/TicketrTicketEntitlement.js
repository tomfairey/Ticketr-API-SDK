import { TicketrTicket } from '../classes';

export default class TicketrTicketEntitlement {
    #uuid
    #device
    #ticket
    #activated
    #created
    #modified
    #expiry

    constructor({
        uuid,
        device,
        ticket,
        activated,
        created,
        modified,
        expiry
    }) {
        this.#uuid = uuid;
        this.#device = device;
        this.#ticket = new TicketrTicket(ticket);
        this.#activated = activated;
        this.#created = new Date(created * 1000);
        this.#modified = new Date(modified * 1000);
        this.#expiry = new Date(expiry * 1000);
    }

    get uuid() {
        return this.#uuid;
    }
    get device() {
        return this.#device;
    }
    get ticket() {
        return this.#ticket;
    }
    get activated() {
        return this.#activated;
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