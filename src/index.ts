export interface AlphabeticalCounter {
  getAlphabeticalNumber(num: number): string;
  generateAlphabeticalSequence(start: number, end: number): string[];
}

export class AlphabeticalCounterImpl implements AlphabeticalCounter {
  private readonly ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  private readonly teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  private readonly tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  getAlphabeticalNumber(num: number): string {
    if (num === 0) return 'zero';
    if (num < 0) return 'negative ' + this.getAlphabeticalNumber(Math.abs(num));
    
    if (num < 10) return this.ones[num];
    if (num < 20) return this.teens[num - 10];
    if (num < 100) {
      const ten = Math.floor(num / 10);
      const one = num % 10;
      return this.tens[ten] + (one > 0 ? '-' + this.ones[one] : '');
    }
    if (num < 1000) {
      const hundred = Math.floor(num / 100);
      const remainder = num % 100;
      return this.ones[hundred] + ' hundred' + (remainder > 0 ? ' and ' + this.getAlphabeticalNumber(remainder) : '');
    }
    if (num < 1000000) {
      const thousand = Math.floor(num / 1000);
      const remainder = num % 1000;
      return this.getAlphabeticalNumber(thousand) + ' thousand' + (remainder > 0 ? ' ' + this.getAlphabeticalNumber(remainder) : '');
    }
    
    return 'number too large';
  }

  generateAlphabeticalSequence(start: number, end: number): string[] {
    const sequence: string[] = [];
    for (let i = start; i <= end; i++) {
      sequence.push(this.getAlphabeticalNumber(i));
    }
    return sequence;
  }
}

async function main(): Promise<void> {
  try {
    console.log('Starting alphabetical counting automation...');
    
    // Initialize the counter
    const counter = new AlphabeticalCounterImpl();
    
    // Generate alphabetical numbers from 1 to 100
    const sequence = counter.generateAlphabeticalSequence(1, 100);
    
    console.log('Generated alphabetical sequence:');
    sequence.forEach((num, index) => {
      console.log(`${index + 1}: ${num}`);
    });
    
    // Check if we have Google Sheets credentials
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const googleCredentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    
    if (spreadsheetId && googleCredentialsPath) {
      try {
        const fs = require('fs');
        const credentials = JSON.parse(fs.readFileSync(googleCredentialsPath, 'utf8'));
        const { SheetsUpdater } = require('./sheets-updater');
        
        const sheetsUpdater = new SheetsUpdater(credentials);
        await sheetsUpdater.updateSpreadsheetWithAlphabeticalCounting(spreadsheetId);
        console.log('✅ Spreadsheet updated successfully!');
      } catch (sheetsError) {
        const errorMessage = sheetsError instanceof Error ? sheetsError.message : String(sheetsError);
        console.warn('⚠️ Could not update spreadsheet:', errorMessage);
        console.log('Continuing with local execution only...');
      }
    } else {
      console.log('ℹ️ No spreadsheet configuration found. Running in local mode only.');
    }
    
    console.log('🎉 Alphabetical counting automation completed successfully!');
    
  } catch (error) {
    console.error('❌ Error in main execution:', error);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  main();
}
