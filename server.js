require('dotanv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('marca de tiempo funcionando');
});

app.get('/api/:date?', (req, res) => {
    let dateParam = req.params.date;

    let date = dateParam ?
        (!isNaN(dateParam) ? new Date(parseInt(dateParam)) : new Date(dateParam))
        : new Date();
    
    if (isNaN(date.getTime())) {
        return res.json({error: "Fecha invalida"});
    }

    res.json({
        unix: date.getTime(),
        utc: date.toUTCString(),
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo`);
});