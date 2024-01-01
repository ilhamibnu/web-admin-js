import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import db from "./config/Database.js";
import SequelizeStore from 'connect-session-sequelize';
import UserRoute from './routes/UserRoute.js';
import ProductRoute from './routes/ProductRoute.js';
import AuthRoute from './routes/AuthRoute.js';

dotenv.config();

const app = express();

const SequelizeStoreInstance = SequelizeStore(session.Store);
const store = new SequelizeStoreInstance({
    db: db
});


// (async()=>{
// await db.sync();

// })();
    

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));


app.use(cors({
    Credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);


// store.sync();


app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port`);
    });