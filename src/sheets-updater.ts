import { google } from 'googleapis';
import { AlphabeticalCounterImpl } from './index';

export class SheetsUpdater {
  private auth: any;
  private sheets: any;
  private counter: AlphabeticalCounterImpl;

  constructor(credentials: any) {
    this.auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    this.sheets = google.sheets({ version: 'v4', auth: this.auth });
    this.counter = new AlphabeticalCounterImpl();
  }

  async updateSpreadsheetWithAlphabeticalCounting(
    spreadsheetId: string, 
    startNumber: number = 1, 
    endNumber: number = 100
  ): Promise<void> {
    try {
      console.log(`Starting to update spreadsheet ${spreadsheetId}...`);
      
      // Generate alphabetical sequence
      const sequence = this.counter.generateAlphabeticalSequence(startNumber, endNumber);
      
      // Prepare data for Google Sheets
      const values = sequence.map((text, index) => [
        startNumber + index,  // Column A: Numbers
        text                  // Column B: Alphabetical counting
      ]);

      // Update the spreadsheet
      await this.sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `A${startNumber}:B${endNumber}`,
        valueInputOption: 'RAW',
        requestBody: {
          values
        }
      });

      console.log(`✅ Successfully updated spreadsheet with ${sequence.length} entries`);
      console.log(`Range updated: A${startNumber}:B${endNumber}`);
      
      // Log first few entries for verification
      console.log('Sample entries:');
      sequence.slice(0, 5).forEach((text, index) => {
        console.log(`  ${startNumber + index}: ${text}`);
      });

    } catch (error) {
      console.error('❌ Error updating spreadsheet:', error);
      throw error;
    }
  }

  async clearSpreadsheetRange(spreadsheetId: string, range: string): Promise<void> {
    try {
      await this.sheets.spreadsheets.values.clear({
        spreadsheetId,
        range
      });
      console.log(`✅ Cleared range: ${range}`);
    } catch (error) {
      console.error('❌ Error clearing spreadsheet range:', error);
      throw error;
    }
  }

  async getSpreadsheetInfo(spreadsheetId: string): Promise<any> {
    try {
      const response = await this.sheets.spreadsheets.get({
        spreadsheetId
      });
      return response.data;
    } catch (error) {
      console.error('❌ Error getting spreadsheet info:', error);
      throw error;
    }
  }

  async testConnection(spreadsheetId: string): Promise<boolean> {
    try {
      await this.getSpreadsheetInfo(spreadsheetId);
      console.log('✅ Google Sheets API connection successful');
      return true;
    } catch (error) {
      console.error('❌ Google Sheets API connection failed:', error);
      return false;
    }
  }
}
