import { TicketrResourceGroup, TicketrResource } from '../classes';

export default class TicketrOperator {
    #uuid
    #noc
    #mode
    #name
    #operatorGroup
    #description
    #logo
    #defaultImage

    constructor({
        uuid,
        noc,
        mode,
        name,
        operatorGroup,
        description,
        logo,
        defaultImage
    }) {
        this.#uuid = uuid;
        this.#noc = noc;
        this.#mode = mode;
        this.#name = name;
        this.#operatorGroup = operatorGroup;
        this.#description = description;
        this.#logo = logo.hasOwnProperty('resources') ? new TicketrResourceGroup(logo) : new TicketrResource(logo);
        this.#defaultImage = defaultImage.hasOwnProperty('resources') ? new TicketrResourceGroup(defaultImage) : new TicketrResource(defaultImage);
    }

    get uuid() {
        return this.#uuid;
    }
    get noc() {
        return this.#noc;
    }
    get mode() {
        return this.#mode;
    }
    get name() {
        return this.#name;
    }
    get operatorGroup() {
        return this.#operatorGroup;
    }
    get description() {
        return this.#description;
    }
    get logo() {
        return this.#logo;
    }
    get defaultImage() {
        return this.#defaultImage;
    }
}