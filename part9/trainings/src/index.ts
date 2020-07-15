import express from 'express';
import {calculateBmi }  from './bmiCalculator';
import {ExercisesInput, parseExerciseInputArgumentsFromJson, ExerciseAnalysis, calculateExercises }  from './exerciseCalculator';

const app = express();

app.use(express.json())

app.get('/hello', (_req, res) => {
  return res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    if(!req.query.height || !req.query.weight) {
        return res.status(400).json({'error': 'malformatted parameters'});
    }

    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if(isNaN(height) || isNaN(weight)) {
        return res.status(400).json({'error': 'malformatted parameters'});
    }

    const bmiResult: string = calculateBmi(height, weight);

    return res.status(200).json({
        weight,
        height,
        bmi: bmiResult
    });
});

app.post('/exercises', (req, res) => {
    try {
        const input: ExercisesInput = parseExerciseInputArgumentsFromJson(JSON.stringify(req.body));
        const result: ExerciseAnalysis = calculateExercises(input.exercises, input.targetExercise);

        return res.status(200).json(result);
    }
    catch(e) {
        if(e.message.includes('missing')) {
            return res.status(400).json({'error': 'parameters missing'})
        }
        if(e.message.includes('not numbers')) {
            return res.status(400).json({'error': 'malformatted parameters'})
        }
    }

    return res.status(400);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});