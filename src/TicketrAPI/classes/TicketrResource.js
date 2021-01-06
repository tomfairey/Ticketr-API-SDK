export default class TicketrResource {
    #uuid
    #type
    #dataType
    #data
    #optimised
    #created

    constructor({
        uuid,
        type,
        dataType,
        data,
        optimised,
        created
    }) {
        this.#uuid = uuid;
        this.#type = type;
        this.#dataType = dataType;
        this.#data = data;
        this.#optimised = optimised;
        this.#created = created;
    }

    get uuid() {
        return this.#uuid;
    }
    get type() {
        return this.#type;
    }
    get dataType() {
        return this.#dataType;
    }
    get data() {
        return this.#data;
    }
    get optimised() {
        return this.#optimised;
    }
    get created() {
        return this.#created;
    }
}