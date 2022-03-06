export default class BaseApi {
    baseApiUrl: string;

    constructor() {
        this.baseApiUrl = 'http://localhost:3001/api'; // load from env-var
    }
}

export type ApiError = {
    message: string;
};
