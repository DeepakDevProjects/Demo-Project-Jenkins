# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Run Setup Script
```bash
./setup.sh
```

### 2. Test Locally
```bash
npm start
```
You should see alphabetical counting from 1 to 100 printed to the console.

### 3. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Alphabetical counting automation"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 4. Configure Jenkins
1. Go to `http://localhost:8080`
2. Create new Pipeline job: `alphabetical-counting-pipeline`
3. Configure to use GitHub repository
4. Set script path to `Jenkinsfile`

### 5. Set up Google Sheets
1. Create Google Cloud Project
2. Enable Sheets API
3. Create service account
4. Share spreadsheet with service account email
5. Update `google-apps-script.gs` with your credentials

### 6. Test the Complete Flow
1. Click "Trigger Jenkins" button in Google Sheets
2. Watch Jenkins pipeline execute
3. Check spreadsheet for updated data

## 📁 Project Structure
```
Demo-Project-Jenkins/
├── src/
│   ├── index.ts              # Main alphabetical counting logic
│   └── sheets-updater.ts     # Google Sheets integration
├── Jenkinsfile               # Jenkins pipeline configuration
├── google-apps-script.gs     # Google Sheets button script
├── setup.sh                  # Quick setup script
└── README.md                 # Detailed documentation
```

## 🔧 Configuration Files to Update
- `Jenkinsfile` - Update GitHub repo and spreadsheet ID
- `google-apps-script.gs` - Update Jenkins credentials
- `config.template.json` - Copy to `config.json` and customize

## 🎯 Expected Output
When successful, your Google Spreadsheet will have:
- Column A: Numbers (1, 2, 3, ...)
- Column B: Alphabetical counting (one, two, three, ...)

## 🆘 Need Help?
- Check `README.md` for detailed setup instructions
- Review troubleshooting section for common issues
- Ensure all prerequisites are installed
