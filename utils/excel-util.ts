import fs from 'fs';
import xlsx from 'xlsx';

export class ExcelUtil {

    static readExcel(filepath: string, sheetName: string): any {

        //Verify whether the file exists. 
        if (!fs.existsSync(filepath)) {
            throw new Error(`File not found at the location : ${filepath}`)
        }

        //Read the workbook from the Excel file. 
        const workbook = xlsx.readFile(filepath);

        //Get the specific sheet from the workbook. 
        const sheet = workbook.Sheets[sheetName];

        //Verify whether the sheet exists. 
        if (!sheet) {
            throw new Error(`Given Sheet ${sheetName} is not found at the location : ${filepath}`)
        }

        //Read the data from the Excel sheet and convert it into JSON format. 
        return xlsx.utils.sheet_to_json(sheet);

    }

}

let data = ExcelUtil.readExcel("./files/TestData.xlsx", "Sheet1");
console.log(data);
console.log(data[1]["EmpName"]);