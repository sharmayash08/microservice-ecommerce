pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "devopsproject"
    }

    stages {
        stage('Checkout Code') {
            steps {
                sh '''
                    rm -rf everyday-elegance-pipeline
                    git clone https://github.com/sharmayash08/microservice-ecommerce.git everyday-elegance-pipeline
                '''
            }
        }

        stage('Stop Existing Containers') {
            steps {
                dir('everyday-elegance-pipeline') {
                    sh 'docker compose down || true'
                }
            }
        }

        stage('Backup Uploads') {
            steps {
                sh '''
                    # Ensure local backup directory exists
                    mkdir -p jenkins_backup

                    # Get absolute path of the current working directory
                    BACKUP_DIR=$(pwd)/jenkins_backup

                    # Run backup inside container (create /backup folder explicitly)
                    docker run --rm \
                        -v ${COMPOSE_PROJECT_NAME}_strapi-uploads:/data \
                        -v "$BACKUP_DIR":/backup \
                        alpine sh -c "mkdir -p /backup && tar czf /backup/uploads_backup.tar.gz -C /data ."
                '''
            }
        }

        stage('Build and Deploy') {
            steps {
                dir('everyday-elegance-pipeline') {
                    sh 'docker compose up --build -d'
                }
            }
        }

        stage('Verify Services') {
            steps {
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo "🎉 Deployment successful!"
        }
        failure {
            echo "❌ Deployment failed!"
        }
    }
}