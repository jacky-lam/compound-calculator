import cors from 'cors';

const cor = cors({
    origin: 'http://localhost:3000', // load from env-var
    optionsSuccessStatus: 200,
});
export default cor;
