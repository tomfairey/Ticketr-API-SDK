import { TicketrTicket } from '../classes';

export default class TicketrTicketEntitlement {
    #uuid
    #device
    #ticket
    #activated
    #hashes
    #created
    #modified
    #expiry
    #TicketrApi

    constructor({
        uuid,
        device,
        ticket,
        activated,
        hashes,
        created,
        modified,
        expiry
    }, ticketrApi = null) {
        this.#uuid = uuid;
        this.#device = device;
        this.#ticket = new TicketrTicket(ticket);
        this.#activated = activated;
        this.#hashes = hashes;
        this.#created = new Date(created * 1000);
        this.#modified = new Date(modified * 1000);
        this.#expiry = new Date(expiry * 1000);

        this.#TicketrApi = ticketrApi;
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
    get hashes() {
        return this.#hashes;
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

    async activate() {
        let authResponse;
        try {
            authResponse = await this.#TicketrApi.sendRequest('post', `/ticketr/ticket/${this.#uuid}/activate`);

            if(authResponse.status.toString().split("")[0] == "2") {
                this.#activated = authResponse.data.activated;
                this.#hashes = authResponse.data.hashes;
                this.#modified = new Date(authResponse.data.modified * 1000);
                this.#expiry = new Date(authResponse.data.expiry * 1000);

                return true;
            } else {
                throw authResponse;
            }
        } catch(e) {    
            throw e;
        }
    }
}