import { test, expect, request } from '@playwright/test';
import config from '../../config/config.json' with {type: 'json'};

export class APICommons {

    private requestContext: any;
    private response: any;

    //Method to create the request context, meaning adding base URL, headers, authorization token, etc. 
    async initializeRequestContext() {
        this.requestContext = await request.newContext({
            baseURL: config.api.base_url,
            extraHTTPHeaders: {
                'Authorization': config.api.token
            }
        });
    }

    //Common method to send the request and get response 
    async getResponse(requestType: string, endpoint: string, payload?: any) {
        switch (requestType.toLowerCase()) {
            case 'get':
                this.response = await this.requestContext.get(
                    
                );
                break;
            case 'post':
                this.response = await this.requestContext.post(endpoint, { data: payload });
                break;
            case 'put':
                this.response = await this.requestContext.put(endpoint, { data: payload });
                break;
            case 'patch':
                this.response = await this.requestContext.patch(endpoint, { data: payload });
                break;
            case 'delete':
                this.response = await this.requestContext.delete(endpoint);
                break;
            default:
                throw new Error(`Unsupported request type: ${requestType}`);
        }
        //wait for 2 sec
        await new Promise(resolve => setTimeout(resolve, 2000));
        return this.response;
        
    }

    //Method to validate the status code 
    async validateStatusCode(expectedStatusCode: number) {
        const actualStatusCode = this.response.status();
        expect(actualStatusCode).toBe(expectedStatusCode);
    }

    //Method to validate the Status Message 
    async validateStatusMessage(expectedStatusMessage: string) {
        const actualStatusMessage = this.response.statusText();
        expect(actualStatusMessage).toBe(expectedStatusMessage);
    }

    //Method to validate the response body 
    async validateResponseBody(key: string, expectedValue: any) {
        const responseBody = await this.response.json();
        const actualValue = responseBody[key.toLowerCase()];
        expect(actualValue).toBe(expectedValue);
    }

    //Method to validate the response headers
    async validateResponseHeaders(headerKey: string, expectedValue: string) {
        const headers = this.response.headers();
        const actualValue = headers[headerKey.toLowerCase()];
        expect(actualValue).toBe(expectedValue);
    }

    //Method to validate the schema of the response body 
    async validateResponseSchema(key: string, expectedType: string) {
        const responseBody = await this.response.json();
        const actualValue = responseBody[key.toLowerCase()];
        expect(typeof actualValue).toBe(expectedType);
    }

}