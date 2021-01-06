import { TicketrProfile } from '../classes';

export default class TicketrUser {
    #sub
    #username
    #email
    #profilePicture
    #firstName
    #lastName
    #profiles

    constructor({
        sub,
        username,
        email,
        profilePicture,
        firstName,
        lastName,
        profiles
    }) {
        this.#sub = sub;
        this.#username = username;
        this.#email = email;
        this.#profilePicture = profilePicture;
        this.#firstName = firstName;
        this.#lastName = lastName;

        let profileClasses = {};

        for(let profile in profiles) {
            profile = profiles[profile];

            profileClasses[profile.uuid] = new TicketrProfile(profile);
        }

        this.#profiles = profileClasses;
    }

    get sub() {
        return this.#sub;
    }
    get username() {
        return this.#sub;
    }
    get email() {
        return this.#email;
    }
    get profilePicture() {
        return this.#profilePicture;
    }
    get firstName() {
        return this.#firstName;
    }
    get lastName() {
        return this.#lastName;
    }
    get profiles() {
        return this.#profiles;
    }
}