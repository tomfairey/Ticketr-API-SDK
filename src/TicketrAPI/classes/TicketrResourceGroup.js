import { TicketrResource } from '../classes';

export default class TicketrResourceGroup {
    #uuid
    #name
    #type
    #resources
    #created
    #modified

    constructor({
        uuid,
        name,
        type,
        resources,
        created,
        modified
    }) {
        this.#uuid = uuid;
        this.#name = name;
        this.#type = type;

        let resourcesObject = {};
        for(let resource in resources) {
            resourcesObject[resource] = resources[resource];
            resourcesObject[resource]['resource'] = new TicketrResource(resources[resource]['resource']);
        }
        this.#resources = resourcesObject;

        this.#created = created;
        this.#modified = modified;
    }

    get uuid() {
        return this.#uuid;
    }
    get name() {
        return this.#name;
    }
    get type() {
        return this.#type;
    }
    get resources() {
        return this.#resources;
    }
    get created() {
        return this.#created;
    }
    get modified() {
        return this.#modified;
    }
}