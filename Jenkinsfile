pipeline {
    agent any

    environment {
        CI = 'true'
        NPM_TOKEN = credentials('NPM_TOKEN') // pulls from Jenkins credentials
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install --legacy-peer-deps'
            }
        }

        stage('Lint') {
            steps {
                bat 'npm run lint'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Test') {
            steps {
                bat 'npm run test'
            }
        }

        stage('NPM Login') {
            steps {
                // Write token to .npmrc so npm treats you as logged in
                bat '''
                    echo //registry.npmjs.org/:_authToken=%NPM_TOKEN% > .npmrc
                    npm whoami
                '''
            }
        }

        stage('Publish') {
            steps {
                bat 'npm publish --access public'
            }
        }
    }

    post {
        always {
            // Clean up .npmrc so token is not left on the agent
            bat 'del /f .npmrc 2>nul || echo No .npmrc to clean'
        }
        success {
            echo 'Pipeline completed and package published successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}