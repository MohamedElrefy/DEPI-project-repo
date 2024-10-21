pipeline {
    agent any
    stages {
        stage('Build front-end dockerfile') {
            steps {
                dir('react-frontend') {
                    script {
                        withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME')]) {
                            sh """
                            docker build -t mohamedelrefy20/frontend:latest .
                            docker login -u ${USERNAME} -p ${PASSWORD}
                            docker push mohamedelrefy20/frontend:latest
                            """
                        }
                    }
                }
            }
        }

        stage('Build back-end dockerfile') {
            steps {
                dir('backend/src') {
                    script {
                        withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME')]) {
                            sh """
                            docker build -t mohamedelrefy20/backend:latest .
                            docker login -u ${USERNAME} -p ${PASSWORD}
                            docker push mohamedelrefy20/backend:latest
                            """
                        }
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Ensure docker-compose.yml is configured to use the new images
                   
                    sh 'kubectl apply -f namespace.yaml'
                    sh 'kubectl apply -f frontend-deployment.yaml'
                    sh 'kubectl apply -f backend-deployment.yaml'
                    sh 'kubectl apply -f network-policy.yaml'
                    sh 'kubectl apply -f secret.yaml'
                    sh 'docker-compose up -d --build'
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
