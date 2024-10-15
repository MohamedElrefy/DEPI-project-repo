pipeline {
    agent any
    stages {
        stage('Build front-end dockerfile') {
            steps {
                dir('react-frontend')
                    script {
                         // Build Docker image
                        sh 'docker build -t project-front:latest .'
                        sh 'docker tag projecta-front:latest'
                        sh 'login -u $USERNAME -p $PASSWORD'
                        sh 'docker push mohamedelrefy20/project-app:latest'
                    }
                }
        }
        stage('Build back-end dockerfile') {
            steps {
                dir('frontend')
                    script {
                         // Build Docker image
                        sh 'docker build -t project-back:latest .'
                        sh 'docker tag project-back:latest'
                        sh 'login -u $USERNAME -p $PASSWORD'
                        sh 'docker push mohamedelrefy20/project-app:latest'
                    }
                }
        }
        stage('Test') {
            steps {
                script {
                    // Run tests (customize as needed)
                    sh 'docker run project-front:latest --name front ./run_tests.sh'
                    sh 'docker run project-back:latest  --name back ./run_tests.sh'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    sh'docker-compose up'
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
