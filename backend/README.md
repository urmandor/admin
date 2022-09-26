# Introduction

You would have to first run `npm install` to install all the dependencies for the back-end

Then please specify your database credentials in the `backend/src/config/dataSource.ts` file. For simplicity, I haven't used the environment variables in this project.

You would then have to run the migrations, by executing `npm run typeorm migration:run -- -d src/config/dataSource.ts` command.

Once that is done, start the project by running `npm start` on `http://localhost:5000/`