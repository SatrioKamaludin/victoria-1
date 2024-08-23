pipeline {
    agent any

    environment {
        // Environment variables for BE-Express and BE-NestJS
        DB_HOST = 'localhost'
        DB_PORT = '5432'
        DB_USER = 'postgres'
        DB_PASSWORD = 'admin'
        DB_NAME = 'victoria'

        // Environment variables for FE-React
        VITE_API_EXPRESS = 'http://localhost:3000/api'
        VITE_API_NESTJS = 'http://localhost:3001/api'
    }

    stages {
        stage('Install Dependencies') {
            parallel {
                stage('Install BE-Express') {
                    steps {
                        dir('BE-Express') {
                            sh 'npm install'
                        }
                    }
                }
                stage('Install BE-NestJS') {
                    steps {
                        dir('BE-NestJS') {
                            sh 'npm install'
                        }
                    }
                }
                stage('Install FE-React') {
                    steps {
                        dir('FE-React') {
                            sh 'npm install'
                        }
                    }
                }
            }
        }
        
        stage('Build') {
            parallel {
                stage('Build BE-Express') {
                    steps {
                        dir('BE-Express') {
                            sh 'npm run build'
                        }
                    }
                }
                stage('Build BE-NestJS') {
                    steps {
                        dir('BE-NestJS') {
                            sh 'npm run build'
                        }
                    }
                }
                stage('Build FE-React') {
                    steps {
                        dir('FE-React') {
                            sh 'npm run build'
                        }
                    }
                }
            }
        }
        
        stage('Test') {
            parallel {
                stage('Test BE-Express') {
                    steps {
                        dir('BE-Express') {
                            sh 'npm test'
                        }
                    }
                }
                stage('Test BE-NestJS') {
                    steps {
                        dir('BE-NestJS') {
                            sh 'npm test'
                        }
                    }
                }
                stage('Test FE-React') {
                    steps {
                        dir('FE-React') {
                            sh 'npm test'
                        }
                    }
                }
            }
        }
    }
}
