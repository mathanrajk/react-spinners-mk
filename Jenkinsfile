pipeline {
    agent any

    environment {
        // Prevents warnings from being treated as errors during the build
        CI = 'true'
    }

    tools {
        // Ensure you have a NodeJS tool configured in Jenkins (Manage Jenkins -> Global Tool Configuration)
        // named 'NodeJS'
        nodejs 'NodeJS' 
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
         stage('Test') {
            steps {
                sh 'npm run test'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}