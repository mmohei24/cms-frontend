pipeline {
  agent any  
  stages {
    stage("Checkout"){
        steps{
                git 'https://github.com/oraby88/cmsproject.git'
            }
        }
    stage('Install') {
      steps {
         sh 'npm install' 
         }
    }
    stage('Static code analysis') {
            steps { 
                sh 'npm run-script lint'
            }
        }
    stage('Build') {
      steps { 
        sh 'npm run-script build' 
        }
    }
  }
}