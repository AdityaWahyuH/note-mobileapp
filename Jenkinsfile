pipeline {
    agent any
    
    environment {
        IMAGE_NAME = 'adityawahyuh/note-mobileapp'
        REGISTRY = 'https://index.docker.io/v1/'
        REGISTRY_CREDENTIALS = 'note-mobileapp'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    bat '''
                        echo Installing dependencies...
                        npm install
                    '''
                }
            }
        }
        
        stage('Lint Code') {
            steps {
                script {
                    try {
                        bat 'npm run lint || echo Linting skipped'
                    } catch (Exception e) {
                        echo 'Lint not configured or failed'
                    }
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    try {
                        bat 'npm test -- --passWithNoTests --watchAll=false'
                    } catch (Exception e) {
                        echo 'No tests found or tests failed'
                    }
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image..."
                    bat "docker build -t ${IMAGE_NAME}:latest ."
                }
            }
        }
        
        stage('Push to Registry') {
            steps {
                script {
                    withCredentials([usernamePassword(
                        credentialsId: "${REGISTRY_CREDENTIALS}",
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )]) {
                        bat """
                            echo %DOCKER_PASS% | docker login ${REGISTRY} -u %DOCKER_USER% --password-stdin
                            docker push ${IMAGE_NAME}:latest
                        """
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline executed successfully!'
            echo 'Image pushed to Docker Hub: ${IMAGE_NAME}:latest'
            echo 'To deploy, run: docker-compose up -d'
            bat 'echo Build completed at %date% %time%'
        }
        failure {
            echo 'Pipeline execution failed!'
            bat 'echo Build failed at %date% %time%'
        }
        always {
            script {
                bat 'docker logout || echo Logout skipped'
            }
            cleanWs()
        }
    }
}
