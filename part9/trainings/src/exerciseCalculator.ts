interface ExerciseAnalysis {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface Rating {
    rating: number,
    ratingDescription: string
}

const calculateAverage = (array: Array<number>) : number => array.reduce((a, b) => a + b) / array.length;

const evaluateRating = (average: number, target: number) : Rating => {
    const performance: number = average / target;
    
    const createRating = (rating: number, ratingDescription: string) : Rating => {
        return {
            rating,
            ratingDescription
        };
    };

    if(performance < 0.7) {
        return createRating(1, 'nice try!');
    }
    else if (performance < 1) {
        return createRating(2, 'not too bad but could be better');
    }
    else {
        return createRating(3, 'well done!');
    }
};

const calculateExercises = (exercises: Array<number>, targetExercise: number) : ExerciseAnalysis => {

    const average : number = calculateAverage(exercises);
    const evaluatedRating: Rating = evaluateRating(average,  targetExercise);

    return {
        periodLength: exercises.length,
        trainingDays: exercises.filter(e => e > 0).length,
        target: targetExercise,
        average,
        rating: evaluatedRating.rating,
        ratingDescription: evaluatedRating.ratingDescription,
        success: average > targetExercise
    };
};

interface ExercisesInput {
    exercises: Array<number>;
    targetExercise: number;
  }
  
  const parseExerciseInputArguments = (args: Array<string>): ExercisesInput => {
    if (args.length < 4) throw new Error('Not enough arguments');

    let parsedTargetExercise: number;
  
    if (!isNaN(Number(args[2]))) {
      parsedTargetExercise = Number(args[2]);
    } else {
      throw new Error('Provided values were not numbers!');
    }

    const exercises = args.slice(3);

    exercises.forEach(e => {
        if(isNaN(Number(e))) {
            throw new Error('Provided values were not numbers!');
        }
    });

    const parsedExercises = exercises.map(e => Number(e));

    return {
        exercises: parsedExercises,
        targetExercise: parsedTargetExercise
    };
  };

  const input = parseExerciseInputArguments(process.argv);

console.log(calculateExercises(input.exercises, input.targetExercise));