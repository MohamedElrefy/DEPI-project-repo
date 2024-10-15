pipeline {
    agent any
    stages {
        stage('Build front-end dockerfile') {
            steps {
                dir('react-frontend') {
                    script {
                        // Build Docker image
                        sh 'docker build -t project-front:latest .'
                        
                    }
                }
            }
        }
        stage('Build back-end dockerfile') {
            steps {
                dir('backend/src') {
                    script {
                        // Build Docker image
                        sh 'docker build -t project-back:latest .'
                        // Tag the image
                      
                        
                    }
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    // Run tests (customize as needed)
                    sh 'docker run --rm project-front:latest ./run_tests.sh'
                    sh 'docker run --rm project-back:latest ./run_tests.sh'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Deploy using docker-compose
                    sh 'docker-compose up -d'
                }
            }
        }
    }
    post {
        success {
            slackSend(channel: '#jenkins', message: "Build #${env.BUILD_NUMBER} - Success: ${env.BUILD_URL}")
        }
        failure {
            slackSend(channel: '#jenkins', message: "Build #${env.BUILD_NUMBER} - Failed: ${env.BUILD_URL}")
        }
    }
}
