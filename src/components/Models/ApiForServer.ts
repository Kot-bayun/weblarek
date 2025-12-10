import { IApi } from "../../types";
import { ApiDataToServer } from "../../types";

export class ApiForServer {
    protected api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    doGetRequest(): Promise<ApiDataToServer> {
        return this.api.get('/product/');
    }

    doPostRequest(order: ApiDataToServer): Promise<ApiDataToServer> {
        return this.api.post('/order/', order);
    }
}