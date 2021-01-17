import { TicketrOperator } from '../classes';

export default class TicketrTicket {
    #uuid
    #retailingOperator
    #name
    #description
    #terms
    #validityPeriodType
    #validityPeriod
    #expiryDayPeriod
    #price
    #operators
    #locations
    #created
    #modified

    constructor({
        uuid,
        retailingOperator,
        name,
        description,
        terms,
        validityPeriodType,
        validityPeriod,
        expiryDayPeriod,
        price,
        operators,
        locations,
        created,
        modified
    }) {
        this.#uuid = uuid;
        this.#retailingOperator = new TicketrOperator(retailingOperator);
        this.#name = name;
        this.#description = description;
        this.#terms = terms;
        this.#validityPeriodType = validityPeriodType;
        this.#validityPeriod = validityPeriod;
        this.#expiryDayPeriod = expiryDayPeriod;
        this.#price = price;
        let operatorClasses = [];
        for(let operator of operators) {
            operatorClasses.push(new TicketrOperator(operator));
        }
        this.#operators = operatorClasses;
        this.#locations = locations;
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
    get validityPeriodType() {
        return this.#validityPeriodType;
    }
    get validityPeriod() {
        return this.#validityPeriod;
    }
    get expiryDayPeriod() {
        return this.#expiryDayPeriod;
    }
    get price() {
        return this.#price;
    }
    get operators() {
        return this.#operators;
    }
    get locations() {
        return this.#locations;
    }
    get created() {
        return this.#created;
    }
    get modified() {
        return this.#modified;
    }
}