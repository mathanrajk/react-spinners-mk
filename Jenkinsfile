pipeline {
    agent any

    environment {
        CI = 'true'
        NPM_TOKEN = credentials('NPM_TOKEN')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Clean') {                          // 👈 NEW: wipe stale modules
            steps {
                bat '''
                    if exist node_modules rmdir /s /q node_modules
                    if exist package-lock.json del /f package-lock.json
                '''
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
            bat 'del /f .npmrc 2>nul || echo No .npmrc to clean'
        }
        success {
            echo 'Package published successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}
