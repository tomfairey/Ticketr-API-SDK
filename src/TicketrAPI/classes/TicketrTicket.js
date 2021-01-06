import { TicketrOperator } from '../classes';

export default class TicketrTicket {
    #uuid
    #retailingOperator
    #name
    #description
    #terms
    #price
    #created
    #modified

    constructor({
        uuid,
        retailingOperator,
        name,
        description,
        terms,
        price,
        created,
        modified
    }) {
        this.#uuid = uuid;
        this.#retailingOperator = new TicketrOperator(retailingOperator);
        this.#name = name;
        this.#description = description;
        this.#terms = terms;
        this.#price = price;
        this.#created = created;
        this.#modified = modified;
    }

    get uuid() {
        return this.#uuid;
    }
    get retailingOperator() {
        return this.#retailingOperator;
    }
    get name() {
        return this.#name;
    }
    get description() {
        return this.#description;
    }
    get terms() {
        return this.#terms;
    }
    get price() {
        return this.#price;
    }
    get created() {
        return this.#created;
    }
    get modified() {
        return this.#modified;
    }
}