# AWS Amplify Environment Set Up
Amplify environment suggestion

![AWS Architecture](images/Amplify.jpg)

## Getting Started
### Creating Repository and Environments
1. Create Amazon CodeCommit repository;
2. Create IAM developer user with access to repository and needed AWS resources (E.g.: Amplify, S3, API Gateway, Lambda, etc.);
3. Create Amplify IAM user for the Amplify CLI and configure as AWS CLI profile;
4. Create Amplify role for the backend deployment;
5. Clone repository and Initialize Amplify Prod Env with Amplify CLI (create two branchs, dev & test, and three envs, dev & test & master):
   ```
    git clone <repository>
    amplify init # for the first branch. To create another env, utilize amplify env add
    git add <files>
    git commit -m "Prod env created."
    git push -u origin master
    amplify push
   ```
6. Create Test & Dev branch and initialize Amplify Test & Dev Env:
   ```
   amplify env add
   git add <files>
   git commit -m "Test env created."
   git push -u origin master
   amplify env add
   git add <files>
   git commit -m "Dev env created."
   git push -u origin master
   git checkout -b test
   git push -u origin test
   git checkout -b dev
   git push -u origin dev
   ```
7. Go to the Amplify console and add the frontend environments with the respective branch;
8. You can add build specification in the repository utilising the _amplify.yml_ (It is recommended to update the build settings in console too). Example:
   ```
   version: 0.1
    backend:
    phases:
        build:
        commands:
            - '# Execute Amplify CLI with the helper script'
            - amplifyPush --simple
    frontend:
    phases:
        preBuild:
        commands:
            - npm ci
        build:
        commands:
            - npm run build
    artifacts:
        baseDirectory: dist/<your angular app>
        files:
        - '**/*'
    cache:
        paths:
        - node_modules/**/*
   ```
9.  Restrict access for the Amplify Env endpoints;
10. (Optional) Restrict push to master branch; 
11. (Optional) Enable email notification for test & production environments.

### Multi Account Approach
Actually (02/05/2020), Amplify not supports multi-account approach utilizing CodeCommit, but, if would like to copy the project for another account you can replicate & sync the CodeCommit repository between accounts.

_Note: For other Git repositories you already can separate branch by account. For example with GitHub._

### Developers Tips
1. Creating Amplify profile:
   ```
   aws configure --profile amplify
   ```
2. Cloning CodeCommit Repository using SSH:
   ```
    # Upload the public key in IAM - SSH keys for AWS CodeCommit;
    # Change the .ssh/config file
    # Host codecommit
    #    Hostname git-codecommit.<region>.amazonaws.com
    #    User <SSH key id>
    #    IdentityFile ~/.ssh/id_rsa
    # Clone the repository
    git clone codecommit:/v1/repos/<repository>
   ```
3. Sometimes when you run **amplify remove** some resources still in the account. Verify if the resource is deleted and if needed remove manually (E.g.: S3 Bucket);
4. Working with different environments:
   ![dad](images/AmplifyEnvAddDeploySwitching.jpg)

## References
* AWS CLI: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html
* Amplify policy: https://aws-amplify.github.io/docs/cli-toolchain/usage?sdk=js#iam-policy-for-the-cli 
* Getting Started Amplify + Angular: https://aws-amplify.github.io/docs/js/angular
* Workflow tips: https://read.acloud.guru/multiple-serverless-environments-with-aws-amplify-344759e1be08 
* Limit pushes and merges to branches: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-conditional-branch.html
* Starting from existing project: https://aws.amazon.com/blogs/mobile/amplify-cli-adds-scaffolding-support-for-amplify-apps-and-authoring-plugins/
* Replicating CodeCommit repository: https://aws.amazon.com/blogs/devops/replicate-aws-codecommit-repository-between-regions-using-aws-fargate/