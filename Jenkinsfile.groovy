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
                // Use the built-in deleteDir() for a more robust and platform-independent clean.
                deleteDir()
            }
        }

        stage('Install Dependencies') {
            steps {
                // Removing --legacy-peer-deps to ensure a correct dependency tree.
                // If this fails, it indicates peer dependency issues that should be fixed in package.json.
                bat 'npm install'
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

        stage('Publish to NPM') {
            steps {
                // Use a try-finally block to ensure .npmrc is always cleaned up
                script {
                    try {
                        bat '''
                            echo //registry.npmjs.org/:_authToken=%%NPM_TOKEN%% > .npmrc
                            npm whoami
                            npm publish --access public
                        '''
                    } finally {
                        bat 'del /f .npmrc 2>nul || echo No .npmrc to clean'
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Package published successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}
