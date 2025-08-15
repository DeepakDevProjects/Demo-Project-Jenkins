/**
 * Google Apps Script for Google Spreadsheet
 * This script creates a custom button that triggers Jenkins pipeline
 */

// Configuration - Update these values
const JENKINS_URL = 'http://localhost:8080';
const JENKINS_JOB_NAME = 'alphabetical-counting-pipeline';
const JENKINS_USERNAME = 'your-jenkins-username';
const JENKINS_API_TOKEN = 'your-jenkins-api-token';

/**
 * Creates the custom menu in Google Sheets
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Automation')
    .addItem('Trigger Jenkins', 'triggerJenkinsPipeline')
    .addToUi();
}

/**
 * Triggers the Jenkins pipeline job
 */
function triggerJenkinsPipeline() {
  try {
    // Show loading message
    SpreadsheetApp.getUi().alert('Triggering Jenkins pipeline... Please wait.');
    
    // Build Jenkins API URL
    const jenkinsApiUrl = `${JENKINS_URL}/job/${JENKINS_JOB_NAME}/build`;
    
    // Prepare headers for Jenkins API
    const headers = {
      'Authorization': 'Basic ' + Utilities.base64Encode(`${JENKINS_USERNAME}:${JENKINS_API_TOKEN}`),
      'Content-Type': 'application/json'
    };
    
    // Make the API call to trigger Jenkins
    const options = {
      method: 'POST',
      headers: headers,
      muteHttpExceptions: true
    };
    
    const response = UrlFetchApp.fetch(jenkinsApiUrl, options);
    const responseCode = response.getResponseCode();
    
    if (responseCode === 201 || responseCode === 200) {
      // Success - show success message
      SpreadsheetApp.getUi().alert(
        'Success!', 
        'Jenkins pipeline has been triggered successfully.\n\n' +
        'The pipeline will:\n' +
        '1. Clone the GitHub repository\n' +
        '2. Run the TypeScript code\n' +
        '3. Update this spreadsheet with alphabetical counting\n' +
        '4. Complete the job\n\n' +
        'You can monitor the progress at: ' + JENKINS_URL,
        SpreadsheetApp.getUi().ButtonSet.OK
      );
      
      // Log the trigger
      console.log(`Jenkins pipeline triggered successfully at ${new Date()}`);
      
    } else {
      // Error - show error message
      const errorMessage = `Failed to trigger Jenkins pipeline. Response code: ${responseCode}`;
      SpreadsheetApp.getUi().alert('Error', errorMessage, SpreadsheetApp.getUi().ButtonSet.OK);
      console.error(errorMessage);
    }
    
  } catch (error) {
    // Exception handling
    const errorMessage = `Error triggering Jenkins pipeline: ${error.toString()}`;
    SpreadsheetApp.getUi().alert('Error', errorMessage, SpreadsheetApp.getUi().ButtonSet.OK);
    console.error(errorMessage);
  }
}

/**
 * Alternative function to trigger Jenkins with parameters
 * This can be used if you need to pass parameters to the Jenkins job
 */
function triggerJenkinsPipelineWithParams() {
  try {
    const jenkinsApiUrl = `${JENKINS_URL}/job/${JENKINS_JOB_NAME}/buildWithParameters`;
    
    const headers = {
      'Authorization': 'Basic ' + Utilities.base64Encode(`${JENKINS_USERNAME}:${JENKINS_API_TOKEN}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    
    // Example parameters you might want to pass
    const params = {
      'SPREADSHEET_ID': SpreadsheetApp.getActiveSpreadsheet().getId(),
      'TRIGGER_TIME': new Date().toISOString()
    };
    
    const options = {
      method: 'POST',
      headers: headers,
      payload: params,
      muteHttpExceptions: true
    };
    
    const response = UrlFetchApp.fetch(jenkinsApiUrl, options);
    const responseCode = response.getResponseCode();
    
    if (responseCode === 201 || responseCode === 200) {
      SpreadsheetApp.getUi().alert('Success!', 'Jenkins pipeline triggered with parameters.', SpreadsheetApp.getUi().ButtonSet.OK);
    } else {
      SpreadsheetApp.getUi().alert('Error', `Failed to trigger pipeline. Response code: ${responseCode}`, SpreadsheetApp.getUi().ButtonSet.OK);
    }
    
  } catch (error) {
    SpreadsheetApp.getUi().alert('Error', `Error: ${error.toString()}`, SpreadsheetApp.getUi().ButtonSet.OK);
  }
}

/**
 * Function to check Jenkins job status
 * This can be called to check if the pipeline is still running
 */
function checkJenkinsJobStatus() {
  try {
    const jenkinsApiUrl = `${JENKINS_URL}/job/${JENKINS_JOB_NAME}/lastBuild/api/json`;
    
    const headers = {
      'Authorization': 'Basic ' + Utilities.base64Encode(`${JENKINS_USERNAME}:${JENKINS_API_TOKEN}`),
      'Content-Type': 'application/json'
    };
    
    const options = {
      method: 'GET',
      headers: headers,
      muteHttpExceptions: true
    };
    
    const response = UrlFetchApp.fetch(jenkinsApiUrl, options);
    const responseCode = response.getResponseCode();
    
    if (responseCode === 200) {
      const jobData = JSON.parse(response.getContentText());
      const status = jobData.result || 'UNKNOWN';
      const buildNumber = jobData.number;
      
      SpreadsheetApp.getUi().alert(
        'Job Status', 
        `Build #${buildNumber}\nStatus: ${status}\n\nView details at: ${JENKINS_URL}/job/${JENKINS_JOB_NAME}/${buildNumber}`,
        SpreadsheetApp.getUi().ButtonSet.OK
      );
    } else {
      SpreadsheetApp.getUi().alert('Error', `Failed to get job status. Response code: ${responseCode}`, SpreadsheetApp.getUi().ButtonSet.OK);
    }
    
  } catch (error) {
    SpreadsheetApp.getUi().alert('Error', `Error checking status: ${error.toString()}`, SpreadsheetApp.getUi().ButtonSet.OK);
  }
}
