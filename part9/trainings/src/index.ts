import express from 'express';
import {calculateBmi }  from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  return res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    if(!req.query.height || !req.query.weight) {
        return res.status(400).json({'error': 'malformatted parameters'})
    }

    const height: number = Number(req.query.height);
    const weight: number = Number(req.query.weight);

    if(isNaN(height) || isNaN(weight)) {
        return res.status(400).json({'error': 'malformatted parameters'})
    }

    const bmiResult: string = calculateBmi(height, weight)

    return res.status(200).json({
        weight,
        height,
        bmi: bmiResult
    })
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});