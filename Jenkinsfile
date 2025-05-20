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
                    --env BASE_URL=https://www.saucedemo.com/,USERNAME=$env.SAUCE_CREDS_USR,PASSWORD=$env.SAUCE_CREDS_PSW
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
        }

        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed.'
        }
    }
}
