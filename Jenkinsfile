pipeline {
    agent any

    environment {
        VERCEL_TOKEN = credentials('vercel_token')
    }

    stages {
        stage('install_dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('test') {
            steps {
                echo "Skipping test staddbge..jj. some changes jhmade"
            }
        }

        // stage('build') {
        //     steps {
        //         bat 'npm run build'
        //     }
        // }

        stage('deploy') {
            steps {
                bat "npx vercel --prod --yes --token=%VERCEL_TOKEN%"
            }
        }
    }
}
