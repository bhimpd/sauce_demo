pipeline {
    agent any

    environment {
        SAUCE_CREDS = credentials('sauce-credentials')
    }

    stages {
        stage('Print Credentials') {
            steps {
                echo "Username: $env.SAUCE_CREDS_USR"
                echo "Password: $env.SAUCE_CREDS_PSW"
            }
        }

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/bhimpd/sauce_demo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install' 
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running Cypress tests...'
                sh """
                    npx cypress run \
                    --env BASE_URL=https://www.saucedemo.com/,USER_NAME=$env.SAUCE_CREDS_USR,PASSWORD=$env.SAUCE_CREDS_PSW
                """
            }
        }

        stage('Build') {
            steps {
                echo 'Building project...'
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying...'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            echo 'Attempting to send always email...'
            emailext(
                subject: "🔔 Build Completed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Build has finished (status: ${currentBuild.currentResult}).\nSee ${env.BUILD_URL}",
                to: 'test@example.com'
            )
        }
        success {
            echo 'Pipeline completed successfully!'
            echo 'Attempting to send success email...'
            emailext(
                subject: "✅ SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """<p>Good news! The build succeeded.</p>
                        <p><a href='${env.BUILD_URL}'>View build logs</a></p>""",
                mimeType: 'text/html',
                to: 'test@example.com'
            )
        }
        failure {
            echo 'Pipeline failed.'
            echo 'Attempting to send failure email...'
            emailext(
                subject: "❌ FAILURE: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """<p>Oops, the build failed.</p>
                        <p><a href='${env.BUILD_URL}'>View logs</a></p>""",
                mimeType: 'text/html',
                to: 'test@example.com'
            )
        }
    }

}
