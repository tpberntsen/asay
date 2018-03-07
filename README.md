# Asay
Chat with us on [Slack](https://join.slack.com/t/asay/shared_invite/enQtMjUyNjQxODYxNjM0LTgzNWFkZTc5ZjZlNTdiNTlkMjhjMzdkOTUyMTg0NzRkNTRjNzhhZjVmMjQwMzJjYWUwYThmYWVkYTY1MzZlMzk)

## Stack
- Version control: GitHub
- Database: PostgreSQL
- Back-end: Node.js, Express.js
- Front-end: React
- Deployment: Zeit Now

## Install local dev environment
Please follow the guide in the order it is presented to you.

### Version control
 1. Sign up @ github
 2. Get an admin to add you as a collaborator to the project
 3. Clone project from asayio/asay
 4. Get .env file from admin

### Development
1. Install Node 8 from nodejs.org
2. Install project libraries from terminal/command prompt
```
cd ./
npm install
```    
3. Run ./app and ./server 
```
cd ./
npm start
``` 
### Deployment
This step is only necessary if you need to publicly deploy the solution.

1. Signup @ zeit.co
2. Shut down your local instance if running (CTRL+C)
3. Build and deploy the solution
``` 
cd [your local ./server
npm login 
npm run build
now --public
```  
4. Go to the URL where the solution is deployed

## Coding practice
Please follow the following guidelines to ensure a smooth handling of your pull requests.

### Coding guidelines

- Indentation is tab-based
- Code, comments, and naming must be in English
- All naming should be understandable and easily differentiable
- Try to avoid naming things with abbreviations that have be explained
- Use plural tense for multiple items
- Naming in the front-end should use `PascalCase`
- Naming in the back-end should use `camelCase`

### Directory layout
- Files should be located according to a `./src/domain/component` logical mapping
- Add subfolders when it supports better encapsulation and understanding
- Duplicate code should be refactored into reusable classes, functions, etc.

### Commits
- We use only one branch, which is the `master` branch
- We flag a version as a release when a feature milestone has been tested
- We strive to do smaller commits on a continuous basis instead of committing huge ones 
  - Ideally, every commit should only contain a single new feature/change
- We start every day off with a pull request to sync our code

### Test
- Tests scripts are written and committed along with the code
- Regression unit tests should be run (and have to pass) before committing
- Integration testing is done before a release
