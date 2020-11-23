import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Fullstack!');
});

app.get('/bmi', (req: { query: {height?: string, weight?: string } }, res) => {
    if(typeof req.query.height !== 'string' || typeof req.query.weight !== 'string') {
        return res.json({
            error: "malformatted parameters"
        });
    } else {
        const h = parseFloat(req.query.height);
        const w = parseFloat(req.query.weight);
        const output = {
            height: h,
            weight: w,
            bmi: calculateBmi(h, w)
        };
        return res.json(output);
    }
});

const PORT = 3002;

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));