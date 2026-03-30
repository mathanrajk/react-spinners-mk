pipeline {
    agent any

    environment {
        // Prevents warnings from being treated as errors during the build
        CI = 'true'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                bat  'npm install'
            }
        }
        
        stage('Lint') {
            steps {
                bat  'npm run lint'
            }
        }
        
        stage('Build') {
            steps {
                bat  'npm run build'
            }
        }
         stage('Test') {
            steps {
                bat  'npm run test'
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