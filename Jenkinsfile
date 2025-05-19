pipeline {
    agent any

    environment {
        BASE_URL = 'https://www.saucedemo.com/'
        USERNAME = 'standard_user'
        PASSWORD = 'secret_sauce'
    }

    stages {
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

        stage('Run Tests') {
            steps {
                echo 'Running Cypress tests...'
                sh 'npx cypress run'
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
