# Big Mac Price Compare server
    This server is used to grab data on big mac price data across the world.


1. Clone this repository to your local machine `git clone BOILERPLATE-URL NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env` and to test `mv example.env .env.test .env.production`

configure postgrator to use your postgres db


## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm t`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.