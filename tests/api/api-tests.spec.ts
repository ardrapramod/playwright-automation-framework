import { test, expect } from '@playwright/test';
import { APICommons } from '../../commons/api/api-commons.js';
import testdata from '../../testdata/api/data.json' with { type: 'json' };

test.describe('API Tests', () => {
    let apiCommons: APICommons;

    //Initialize API context before each and every test case. 
    test.beforeEach(async () => {
        apiCommons = new APICommons();
        await apiCommons.initializeRequestContext();
    });

    //Test Case 1: Request to create a duplicate repository within GitHub. 
    test('Create duplicate repository', async () => {
        const data = testdata.duplicateRepo;
        await apiCommons.getResponse(data.requestType, data.endpoint, data.body);
        await apiCommons.validateStatusCode(data.expectedStatusCode);
        await apiCommons.validateStatusMessage(data.expectedStatusMessage);
        await apiCommons.validateResponseBody("message", data.expErrorMessage);
    });

    //Test Case 2: Request to create a repository with valid name
    test('Create repository with valid name', async () => {
        const data = testdata.validRepo;
        await apiCommons.getResponse(data.requestType, data.endpoint, data.body);
        await apiCommons.validateStatusCode(data.expectedStatusCode);
        await apiCommons.validateStatusMessage(data.expectedStatusMessage);
        await apiCommons.validateResponseBody("name", data.body.name);
    });

    //Test Case 3: Request to get the details of an existing repository
    test('Get details of an existing repository', async () => {
        const data = testdata.getRepo;
        await apiCommons.getResponse(data.requestType, data.endpoint);
        await apiCommons.validateStatusCode(data.expectedStatusCode);
        await apiCommons.validateStatusMessage(data.expectedStatusMessage);
        await apiCommons.validateResponseBody("name", data.name);
    });

    //Test Case 4: Request to update the details of an existing repository
    test('Update details of an existing repository', async () => {
        const data = testdata.updateRepo;
        await apiCommons.getResponse(data.requestType, data.endpoint, data.body);
        await apiCommons.validateStatusCode(data.expectedStatusCode);
        await apiCommons.validateStatusMessage(data.expectedStatusMessage);
        await apiCommons.validateResponseBody("name", data.name);
    });

    //Test Case 5: Request to delete the details of an existing repository
    test('Delete details of an existing repository', async () => {
        const data = testdata.deleteRepo;
        await apiCommons.getResponse(data.requestType, data.endpoint);
        await apiCommons.validateStatusCode(data.expectedStatusCode);
        await apiCommons.validateStatusMessage(data.expectedStatusMessage);
    });

});