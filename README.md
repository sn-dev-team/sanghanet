# sanghanet

# initial setup
 1. clone repo

 2. run `npm install` in client folder
    run `npm install` in server folder
    run `npm install` in root folder to get eslint and its dependencies. (Also add/enable eslint extension in VsCode.)
    run `./installGitHooks.sh` in root, to install git hooks

 3. create .env.local / .env.atlas / .env.???? files accordig to your need in server directory.
   Example of .env.local:
```
      DEV_SERVER = 1
      DB_URL=mongodb://localhost:test/27017
      PORT=4000
      CLIENT_ID=55347337253-aglrjccot9o1n7s2caborv6gnee634pf.apps.googleusercontent.com
      CLIENT_SECRET = <???>

      SESSION_SECRET = <???>
```
   > If you would use client as a production build without a front-end dev-server,
   > set DEV_SERVER = 0

   > This CLIENT_ID is valid for localhost only.
   > For deployment you will need a different value for the CLIENT_ID.

   When setting up env.atlas:

      Use DB_URL = mongodb+srv://<username>:<password>@cluster0-deyq5.gcp.mongodb.net/test?retryWrites=true&w=majority

      Your access has to be set up and your IP whitelisted before you can remotely connect using above URL.

   > Since .env files will contain 'secrets' as well, NEVER push them into git repositories.
   > Manage them on your computer only.

   WARNING! - Currently, if the DB_NAME and COLL_NAME local variables are not matching any database and collection in your mongo cluster, no error is thrown but functionality will be lost. Consider that as possible cause when debugging.

# start the system
   ## Manual (legacy) mode
   1. If you would like to start the front-end + dev server, run `npm start` in the client directory.

   2. If you would like to start the back-end server with local db, run `npm run local` in the server directory.

   Feel free to config other .env files and start scripts...

   ## Automatic mode
   --- WITH LOCAL DB ---
   a) If `mongod` daemon/service already running on localhost, run `npm run dev-local` in the root folder.

   --- WITH ATLAS DB ---
   a) In project ROOT folder run `npm run dev`. This command will:

      - set DEV_SERVER variable to 1
      - start client dev server and backend server (atlas conf.) concurrently

   To stop the process, press CTRL-C

   On WINDOWS also run `npm run killnode` to stop execution, because CTRL-C does not release port 4000 (EADDRINUSE :::4000)

   b) Or in project ROOT folder run `npm run build`. This command will:

      - set DEV_SERVER variable to 0
      - run client build and copy to server
      - run backend server (atlas conf.)

# test build

   1. Use the `npm run-script build` in the client folder
      NOTE: this script will delete the contents of the /client/build and /server/app folders, then deploy the app in the /client/build folder and finally will copy it's contents to the /server/app folder.

   The production build is now hosted on the backend server.

# manual test deployment (tested only on Linux!)

   1. Run `npm run deploy` script from root. The script build the product, and copy all necessary files - and modify them - in a separet folder. `cd` this folder.

   2. Heroku deployment works with a git repo, so create one, and commit all files.
      * `git init`
      * `git add .`
      * `git commit -m 'Deploy on Heroku'`

   3. Login to Heroku (user & pwd: our test user credentials)
      *  `heroku login`
      *  `heroku apps:destroy sanghanet --confirm sanghanet`
      *  `heroku apps:create sanghanet --region eu`
      *  `git push heroku master` => the URL here must be: https://sanghanet.herokuapp.com
      *  `heroku logs` => to get logs

# wipe and re-build finance accounts
   ## description
      You can wipe and re-build the exising finance accounts for all members by using the command `npm run buildfinance` in the root directory.
      This functionality is intended to facilitate re-population of the finance accounts in case a change is needed in the account models.
      It uses the Finance and Transaction models in the server/src/models directory.

# wipe and re-build the database
   ## description
      This action will first delete every document and collection from the database. Next, it will rebuild the 'members' collection with the data found in `members.json`. After that, it will generate a finance transaction history with random numbers for each member by calling the command described above.
   ## guide
      Run rebuildDB.sh with a `local` or `atlas` parameter depending on which database you would like to reset. WARNING: using the `atlas` parameter will delete all reset that the deployed app is depending on.

      For those who like to copy and paste:
      run `./server/testDataScripts/rebuildDB.sh local` in the root folder for a local reset
      run `./server/testDataScripts/rebuildDB.sh atlas` in the root folder for an atlas reset - PROCEED WITH CAUTION

# Note for Windows users

      with bash as their shell for npm scripts:
      edit your '.npmrc' config file (ususally in C:\Users\[username] folder) and set bash as 'shell' & 'script-shell'

      for example:
         shell=E:\Dev\Tools\PortableGit\bin\bash.exe
         script-shell=E:\Dev\Tools\PortableGit\bin\bash.exe