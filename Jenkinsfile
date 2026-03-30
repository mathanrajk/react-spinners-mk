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
```

---

## Root Cause Summary

| Problem | Cause | Fix |
|---|---|---|
| `Cannot find module 'ajv/dist/core'` | `ajv-draft-04` needs ajv v8, but v6 was installed | Add `"overrides": { "ajv": "^8.0.0" }` |
| Stale broken install on Jenkins | Old `node_modules` cached from previous run | Add `Clean` stage to wipe before install |
| `--legacy-peer-deps` not enough | It skips peer conflicts but doesn't fix version mismatches | `overrides` forces the correct version tree-wide |

---

## Order of Actions
```
1. Fix package.json locally (add overrides)
2. Delete node_modules + package-lock.json locally
3. Run npm install --legacy-peer-deps locally
4. Run npm run build locally ✅
5. Commit & push package.json + package-lock.json
6. Re-run Jenkins pipeline ✅