import fs from 'fs';
import { parse } from 'csv-parse';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export default class CsvHelper {

  /**
   * Read training data from ths CSV exported from Google Sheets
   */
  
  public async readCSV(fileName: string, action: (data: string[][]) => void) {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const parser = parse({ delimiter: ',' }, function(err, data) {
      action(data);
    });
    fs.createReadStream(__dirname + '/' + fileName).pipe(parser);
  }


}
