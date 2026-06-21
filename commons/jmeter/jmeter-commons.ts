import { exec } from 'child_process';

export class JMeterCommons {

    //Common Method to Run from Command Line 
    private runCommandLine(command: string): Promise<string> {
        return new Promise((resolve, reject) => {

            //code to run the command
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(`Error: ${error.message}`);
                } else {
                    resolve(stdout);
                }                   
                console.log(`Command: ${command} is executed successfully.`);
            });

        });
    }

    //Common method to run JMETER test plan 
    async runJMeterTestPlan(testPlanPath: string): Promise<void> {

        console.log(`Running JMeter Test Plan: ${testPlanPath}`);

        //Update the Relative Path of JMeter Folder Structure. 
        const projectRoot = process.cwd(); //playwright-tdd-framework
        const jmeterBasePath = `${projectRoot}/tests/load/jmeter`;
        const jmeterToolPath = `${jmeterBasePath}/bin/jmeter.bat`; 
        const testpalnPath = `${jmeterBasePath}/testplans/${testPlanPath}`;

        //Update the Relative Path of Result folders
        console.log(`Generating results and reports for JMETER test plan: ${testPlanPath}`);
        const resultsPath = `${jmeterBasePath}/results/TestResults_${Date.now()}.csv`;
        const reportPath = `${jmeterBasePath}/report-output`;

        //Run the JMETER test plan and generate the CSV test results. 
        const command = `"${jmeterToolPath}" -n -t "${testpalnPath}" -l "${resultsPath}"`;
        console.log(`Executing command: ${command}`);

        const reportCommand = `"${jmeterToolPath}" -g "${resultsPath}" -o "${reportPath}"`;
        await this.runCommandLine(command);
        await this.runCommandLine(reportCommand);
        console.log(`JMeter Test Plan: ${testPlanPath} executed successfully. Results sa    ved to: ${resultsPath} and report generated at: ${reportPath}`);
    }

}