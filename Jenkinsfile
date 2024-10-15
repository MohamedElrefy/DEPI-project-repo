pipeline {
    agent any
    stages {
        stage('Build front-end dockerfile') {
            steps {
                dir('react-frontend') {
                    script {
                        // Build Docker image
                        sh 'docker build -t project-front:latest .'
                        // Tag the image
                        sh 'docker tag project-front:latest mohamedelrefy20/project-front:latest'
                        // Login to Docker Hub
                        sh 'echo $PASSWORD | docker login -u $USERNAME --password-stdin'
                        // Push the image to Docker Hub
                        sh 'docker push mohamedelrefy20/project-front:latest'
                    }
                }
            }
        }
        stage('Build back-end dockerfile') {
            steps {
                dir('backend') {
                    script {
                        // Build Docker image
                        sh 'docker build -t project-back:latest .'
                        // Tag the image
                        sh 'docker tag project-back:latest mohamedelrefy20/project-back:latest'
                        // Login to Docker Hub
                        sh 'docker login -u $USERNAME -p $PASSWORD'
                        // Push the image to Docker Hub
                        sh 'docker push mohamedelrefy20/project-back:latest'
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
