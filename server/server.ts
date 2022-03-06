import cor from './cors';
import express from 'express';
import { queryParser } from 'express-query-parser';
import apiRouter from './route/router';

const app = express();

app.options('*', cor);
app.use(cor);

app.set('port', process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}
app.use(express.json());
app.use(
    queryParser({
        parseNull: true,
        parseUndefined: true,
        parseBoolean: true,
        parseNumber: true,
    })
);
app.use('/api', apiRouter);

app.listen(app.get('port'), () => {
    console.log(`Started the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
