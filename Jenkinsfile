pipeline {
    agent any

    tools {
        nodejs 'Node18'
        dockerTool 'Dockertool'
    }

    environment {
        DOCKER_IMAGE = "catalogo-pymes"
        DOCKER_TAG = "latest"
        CONTAINER_NAME = "catalogo-pymes"
    }

    stages {
        stage('Instalar dependencias') {
            steps {
                echo 'Instalando dependencias...'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Ejecutando pruebas...'
                sh 'node node_modules/jest/bin/jest.js'
            }
        }

        stage('Construir imagen Docker') {
            steps {
                echo 'Construyendo imagen Docker...'
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
            }
        }

        stage('Desplegar contenedor') {
            steps {
                echo 'Desplegando contenedor...'
                sh """
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                    docker run -d --name ${CONTAINER_NAME} -p 3000:3000 ${DOCKER_IMAGE}:${DOCKER_TAG}
                """
            }
        }
    }

    post {
        success {
            echo "Despliegue completado exitosamente."
        }
        failure {
            echo "El pipeline falló."
        }
    }
}