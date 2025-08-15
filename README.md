# Demo Project Jenkins - Alphabetical Counting Automation

This project demonstrates a complete automation workflow that:
1. Uses a custom button in Google Spreadsheets to trigger Jenkins
2. Runs a Jenkins pipeline that executes TypeScript code
3. Updates the spreadsheet with alphabetical counting (one, two, three, etc.)

## Project Structure

```
Demo-Project-Jenkins/
├── src/
│   └── index.ts              # Main TypeScript code for alphabetical counting
├── Jenkinsfile               # Jenkins pipeline configuration
├── google-apps-script.gs     # Google Apps Script for spreadsheet button
├── package.json              # Node.js dependencies
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## Prerequisites

1. **Jenkins** installed and running on localhost:8080
2. **Node.js** (version 18 or higher)
3. **GitHub** repository to store the code
4. **Google Sheets** with API access
5. **Google Cloud Project** with Sheets API enabled

## Setup Instructions

### 1. Local Development Setup

```bash
# Clone the repository
git clone <your-github-repo-url>
cd Demo-Project-Jenkins

# Install dependencies
npm install

# Build TypeScript
npm run build

# Test locally
npm start
```

### 2. Jenkins Setup

1. **Create a new Pipeline Job in Jenkins:**
   - Go to `http://localhost:8080`
   - Click "New Item"
   - Enter job name: `alphabetical-counting-pipeline`
   - Select "Pipeline"
   - Click "OK"

2. **Configure the Pipeline:**
   - In the job configuration, select "Pipeline script from SCM"
   - Choose "Git" as SCM
   - Enter your GitHub repository URL
   - Set branch to `main` or `master`
   - Set script path to `Jenkinsfile`
   - Save the configuration

3. **Set up Jenkins Credentials:**
   - Go to "Manage Jenkins" > "Manage Credentials"
   - Add new credentials:
     - Kind: "Secret file"
     - ID: `google-sheets-credentials`
     - Upload your Google service account JSON file

### 3. Google Sheets Setup

1. **Create a Google Cloud Project:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable Google Sheets API

2. **Create Service Account:**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Download the JSON key file
   - Use this file for Jenkins credentials

3. **Set up Google Apps Script:**
   - Open your Google Spreadsheet
   - Go to "Extensions" > "Apps Script"
   - Replace the default code with content from `google-apps-script.gs`
   - Update the configuration variables:
     ```javascript
     const JENKINS_URL = 'http://localhost:8080';
     const JENKINS_JOB_NAME = 'alphabetical-counting-pipeline';
     const JENKINS_USERNAME = 'your-jenkins-username';
     const JENKINS_API_TOKEN = 'your-jenkins-api-token';
     ```

4. **Get Jenkins API Token:**
   - In Jenkins, go to your user profile
   - Click "Configure"
   - Under "API Token", click "Add new Token"
   - Copy the generated token

5. **Share Spreadsheet with Service Account:**
   - Share your Google Spreadsheet with the service account email
   - Give it "Editor" permissions

### 4. Environment Configuration

Update the following files with your specific values:

#### Jenkinsfile
```groovy
environment {
    GITHUB_REPO = 'YOUR_GITHUB_USERNAME/demo-project-jenkins'
    SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'
}
```

#### src/index.ts
Add environment variable handling:
```typescript
const spreadsheetId = process.env.SPREADSHEET_ID || 'your-spreadsheet-id';
```

## Usage

### 1. Manual Testing

```bash
# Test the alphabetical counter locally
npm run dev

# Build and run
npm run build
npm start
```

### 2. Jenkins Pipeline

1. Click the "Trigger Jenkins" button in your Google Spreadsheet
2. Monitor the pipeline at `http://localhost:8080`
3. The pipeline will:
   - Clone the GitHub repository
   - Install dependencies
   - Build TypeScript code
   - Run the alphabetical counter
   - Update the spreadsheet

### 3. Expected Output

The spreadsheet will be updated with:
- Column A: Numbers (1, 2, 3, ...)
- Column B: Alphabetical counting (one, two, three, ...)

## Troubleshooting

### Common Issues

1. **Jenkins can't access GitHub:**
   - Ensure Jenkins has proper Git credentials
   - Check repository permissions

2. **Google Sheets API errors:**
   - Verify service account has proper permissions
   - Check if Sheets API is enabled
   - Ensure spreadsheet is shared with service account

3. **TypeScript build failures:**
   - Check Node.js version (should be 18+)
   - Verify all dependencies are installed
   - Check TypeScript configuration

4. **Jenkins pipeline failures:**
   - Check Jenkins logs for detailed error messages
   - Verify all environment variables are set
   - Ensure Jenkins has internet access

### Debugging

1. **Check Jenkins logs:**
   - Go to the specific build in Jenkins
   - Click "Console Output" to see detailed logs

2. **Test Google Apps Script:**
   - Use the Apps Script editor's "Run" function
   - Check "Execution log" for errors

3. **Verify API connections:**
   - Test Jenkins API manually with curl
   - Verify Google Sheets API access

## Security Considerations

1. **Jenkins Security:**
   - Use Jenkins API tokens instead of passwords
   - Restrict Jenkins access to localhost only
   - Regularly update Jenkins and plugins

2. **Google API Security:**
   - Use service accounts with minimal permissions
   - Store credentials securely in Jenkins
   - Regularly rotate API keys

3. **Repository Security:**
   - Don't commit sensitive credentials
   - Use environment variables for configuration
   - Implement proper access controls

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review Jenkins and Google API documentation
3. Create an issue in the GitHub repository
