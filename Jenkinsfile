pipeline {
    agent any
    stages {
        stage('Build front-end dockerfile') {
            steps {
                dir('react-frontend')
                    script {
                         // Build Docker image
                        sh 'docker build -t project-front:latest .'
                        sh 'docker tag projectapp:latest'
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
                        sh 'docker tag projectapp:latest'
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
                    ansiblePlaybook playbook: './playbook.yml', 
                                inventory: './inventory.ini'
                }
            }
        }
    }
    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
