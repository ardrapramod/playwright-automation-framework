# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\api-tests.spec.ts >> API Tests >> Get details of an existing repository
- Location: tests\api\api-tests.spec.ts:33:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 401
```

# Test source

```ts
  1  | import { test, expect, request } from '@playwright/test';
  2  | import config from '../../config/config.json' with {type: 'json'};
  3  | 
  4  | export class APICommons {
  5  | 
  6  |     private requestContext: any;
  7  |     private response: any;
  8  | 
  9  |     //Method to create the request context, meaning adding base URL, headers, authorization token, etc. 
  10 |     async initializeRequestContext() {
  11 |         this.requestContext = await request.newContext({
  12 |             baseURL: config.api.base_url,
  13 |             extraHTTPHeaders: {
  14 |                 'Authorization': config.api.token
  15 |             }
  16 |         });
  17 |     }
  18 | 
  19 |     //Common method to send the request and get response 
  20 |     async getResponse(requestType: string, endpoint: string, payload?: any) {
  21 |         switch (requestType.toLowerCase()) {
  22 |             case 'get':
  23 |                 this.response = await this.requestContext.get(endpoint);
  24 |                 break;
  25 |             case 'post':
  26 |                 this.response = await this.requestContext.post(endpoint, { data: payload });
  27 |                 break;
  28 |             case 'put':
  29 |                 this.response = await this.requestContext.put(endpoint, { data: payload });
  30 |                 break;
  31 |             case 'patch':
  32 |                 this.response = await this.requestContext.patch(endpoint, { data: payload });
  33 |                 break;
  34 |             case 'delete':
  35 |                 this.response = await this.requestContext.delete(endpoint);
  36 |                 break;
  37 |             default:
  38 |                 throw new Error(`Unsupported request type: ${requestType}`);
  39 |         }
  40 |         //wait for 2 sec
  41 |         await new Promise(resolve => setTimeout(resolve, 2000));
  42 |         return this.response;
  43 |     }
  44 | 
  45 |     //Method to validate the status code 
  46 |     async validateStatusCode(expectedStatusCode: number) {
  47 |         const actualStatusCode = this.response.status();
> 48 |         expect(actualStatusCode).toBe(expectedStatusCode);
     |                                  ^ Error: expect(received).toBe(expected) // Object.is equality
  49 |     }
  50 | 
  51 |     //Method to validate the Status Message 
  52 |     async validateStatusMessage(expectedStatusMessage: string) {
  53 |         const actualStatusMessage = this.response.statusText();
  54 |         expect(actualStatusMessage).toBe(expectedStatusMessage);
  55 |     }
  56 | 
  57 |     //Method to validate the response body 
  58 |     async validateResponseBody(key: string, expectedValue: any) {
  59 |         const responseBody = await this.response.json();
  60 |         const actualValue = responseBody[key.toLowerCase()];
  61 |         expect(actualValue).toBe(expectedValue);
  62 |     }
  63 | 
  64 |     //Method to validate the response headers
  65 |     async validateResponseHeaders(headerKey: string, expectedValue: string) {
  66 |         const headers = this.response.headers();
  67 |         const actualValue = headers[headerKey.toLowerCase()];
  68 |         expect(actualValue).toBe(expectedValue);
  69 |     }
  70 | 
  71 |     //Method to validate the schema of the response body 
  72 |     async validateResponseSchema(key: string, expectedType: string) {
  73 |         const responseBody = await this.response.json();
  74 |         const actualValue = responseBody[key.toLowerCase()];
  75 |         expect(typeof actualValue).toBe(expectedType);
  76 |     }
  77 | 
  78 | }
```