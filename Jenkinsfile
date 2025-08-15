pipeline {
    agent any
    
    environment {
        NODE_VERSION = '18'
        // https://github.com/DeepakDevProjects/Demo-Project-Jenkins
        GITHUB_REPO = 'DeepakDevProjects/Demo-Project-Jenkins'
        SPREADSHEET_ID = '13zbniVZQlUYMQQDnNPLqjX7VcrTmVBZ7PL4HWX8BX0s'
        GOOGLE_CREDENTIALS = credentials('google-sheets-credentials')
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }
        
        // stage('Setup Node.js') {
        //     steps {
        //         echo 'Setting up Node.js environment...'
        //         sh '''
        //             # Install Node.js if not available
        //             if ! command -v node &> /dev/null; then
        //                 echo "Installing Node.js..."
        //                 curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
        //                 sudo apt-get install -y nodejs
        //             fi
                    
        //             # Check Node.js version
        //             node --version
        //             npm --version
        //         '''
        //     }
        // }

        stage('Setup Node.js') {
            steps {
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                    nvm install 18
                    nvm use 18
                    node -v
                    npm -v
                '''
            }
        }

        
        stage('Install Dependencies') {
            // steps {
            //     echo 'Installing npm dependencies...'
            //     sh 'npm install'
            // }
            steps {
                echo 'Installing npm dependencies...'
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                    nvm use 18
                    npm install
                '''
            }
        }
        
        stage('Build TypeScript') {
            // steps {
            //     echo 'Building TypeScript code...'
            //     sh 'npm run build'
            // }
            steps {
                echo 'Building TypeScript code...'
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                    nvm use 18
                    npm run build
                '''
            }
        }
        
        stage('Run Alphabetical Counter') {
            // steps {
            //     echo 'Running alphabetical counting automation...'
            //     script {
            //         // Set up Google credentials
            //         withCredentials([file(credentialsId: 'google-sheets-credentials', variable: 'GOOGLE_CREDS')]) {
            //             sh '''
            //                 export GOOGLE_APPLICATION_CREDENTIALS="$GOOGLE_CREDS"
            //                 export SPREADSHEET_ID="$SPREADSHEET_ID"
            //                 npm start
            //             '''
            //         }
            //     }
            // }
            steps {
                echo 'Running alphabetical counting automation...'
                script {
                    withCredentials([file(credentialsId: 'google-sheets-credentials', variable: 'GOOGLE_CREDS')]) {
                        sh '''
                            export NVM_DIR="$HOME/.nvm"
                            [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                            nvm use 18
                            export GOOGLE_APPLICATION_CREDENTIALS="$GOOGLE_CREDS"
                            export SPREADSHEET_ID="$SPREADSHEET_ID"
                            npm start
                        '''
                    }
                }
            }
        }
        
        stage('Verify Results') {
            steps {
                echo 'Verifying the results...'
                sh '''
                    echo "Checking if the script executed successfully..."
                    if [ -f "dist/index.js" ]; then
                        echo "✅ TypeScript build successful"
                    else
                        echo "❌ TypeScript build failed"
                        exit 1
                    fi
                '''
            }
        }
    }
    
    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        success {
            echo '🎉 Pipeline completed successfully!'
            echo 'Alphabetical counting has been updated in the Google Spreadsheet.'
        }
        failure {
            echo '❌ Pipeline failed!'
            echo 'Check the logs for more details.'
        }
    }
}
