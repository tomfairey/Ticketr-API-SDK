import Axios from 'axios';

export default class API {
    #domain = null;
    #token = null;
    #defaultTimeout = 0;
    #lastRequest = 0;
    #lastRequests = {};
    #completingRequest = null;
    #headers = {};

    static errorCodes = {
        notFound: 404,
        notAuthenticated: 403
    };

    constructor({
        domain, defaultTimeout
    }) {
        this.#domain = domain;
        this.#defaultTimeout = defaultTimeout;
    };

    set token(token) {
        this.#token = token;
    }

    set header({name, data}) {
        this.#headers[`${name}`] = `${data}`;
    }

    async sendRequest(
        method = 'get', path = '/', data = null
    ) {
        const self = this;
        const url = `${this.#domain}${path}`;

        try {
            let object = {
                method: method,
                url: url,
                data: data,
                responseType: "json",
                headers: this.#headers,
                withCredentials: true,
                onDownloadProgress(event) {
                    if (timestampTriggered) return
                    timestampTriggered = true
                    this.lastRequest = Date.now()
                    self.lastRequests[request.methodID] = Date.now()
                },
            };

            if(this.#token) {
                object.headers['Authorization'] = `Bearer ${this.#token}`;
            }

            const response = await Axios(object);

            return response;
        } catch (e) {
            let errorObject;
            
            if (e.response) {
                errorObject = e.response;
            }

            throw this.errorHandler(errorObject);
        };
    }
    errorHandler(e) {
        let errorCode;
        let errorMessage;

        switch(e.status) {
            case 400:
                errorCode = e.data.code ? e.data.code : "BAD_REQUEST";
                errorMessage = e.data.message ? e.data.message : "Server was unable to understand the request";
                break;
            case 401:
                errorCode = "UNAUTHENTICATED";
                errorMessage = e.data.message ? e.data.message : "Server requires client to perform authentication to access the resource";
            case 403:
                errorCode = "UNAUTHORISED";
                errorMessage = e.data.message ? e.data.message : "Client does not have permission to view this resource";
                break;
            case 404:
                errorCode = "NOT_FOUND";
                errorMessage = e.data.message ? e.data.message : "The requested resource could not be found";
                break;
            case 405:
                errorCode = "METHOD_NOT_ALLOWED";
                errorMessage = e.data.message ? e.data.message : "The requested resource does not allow requested method";
                break;
            case 406:
                errorCode = "NOT_ACCEPTABLE";
                errorMessage = e.data.message ? e.data.message : "The request could not be deemed acceptable by the server";
                break;
            default:
                errorCode = "UNHANDLED_ERROR";
                errorMessage = e.data.message ? e.data.message : "Unhandled error";
                break;
        }

        let errorReturning = new Error(errorMessage);
        errorReturning.code = errorCode;

        return errorReturning;
    }
};