import {test, expect} from '@playwright/test';
import { JMeterCommons } from '../../commons/jmeter/jmeter-commons.js';

test.describe('JMeter Load Tests', () => {

    let jmeter : JMeterCommons;

    test.beforeEach(() => {
        jmeter = new JMeterCommons();
    });

    test('Run JMeter Test Plan', async () => {
        test.setTimeout(300000); // Set timeout to 5 minutes for load test execution
        const testPlan= 'LoadTest.jmx';
        await jmeter.runJMeterTestPlan(testPlan);
    });

});
