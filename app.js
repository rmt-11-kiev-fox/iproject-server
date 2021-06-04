if (process.env.NODE_ENV == 'development') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`This app is running on port ${PORT}`);
})