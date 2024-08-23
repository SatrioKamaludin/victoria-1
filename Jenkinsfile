pipeline {
    agent any
    stages {
        stage('Install Dependencies - BE - Express') {
            steps {
                dir('BE-Express') {
                    sh 'npm install'
                }
            }
        }

        stage('Build - BE - Express') {
            steps {
                dir('BE-Express') {
                    sh 'npm run build'
                }
            }
        }
        
        stage('Test - BE - Express') {
            steps {
                dir('BE-Express') {
                    sh 'npm test'
                }
            }
        }

        stage('Install Dependencies - BE-NestJS') {
            steps {
                dir('BE-NestJS') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Build - BE-NestJS') {
            steps {
                dir('BE-NestJS') {
                    sh 'npm run build'
                }
            }
        }
        
        stage('Test - BE-NestJS') {
            steps {
                dir('BE-NestJS') {
                    sh 'npm test'
                }
            }
        }

        stage('Install Dependencies - FE-React') {
            steps {
                dir('FE-React') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Build - FE-React') {
            steps {
                dir('FE-React') {
                    sh 'npm run build'
                }
            }
        }
        
        stage('Test - FE-React') {
            steps {
                dir('FE-React') {
                    sh 'npm test'
                }
            }
        }
    }
}