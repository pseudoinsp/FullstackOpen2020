interface ExerciseAnalysis {
  periodLength: Number,
  trainingDays: Number,
  success: boolean,
  rating: Number,
  ratingDescription: String,
  target: Number,
  average: Number
}

interface Rating {
    rating: number,
    ratingDescription: String
}

const calculateAverage = (array: Array<number>) : number => array.reduce((a, b) => a + b) / array.length

const evaluateRating = (average: number, target: number) : Rating => {
    const performance: Number = average / target
    
    const createRating = (rating: number, ratingDescription: String) : Rating => {
        return {
            rating,
            ratingDescription
        }
    }

    if(performance < 0.7) {
        return createRating(1, 'nice try!')
    }
    else if (performance < 1) {
        return createRating(2, 'not too bad but could be better')
    }
    else {
        return createRating(3, 'well done!')
    }

}

const calculateExercises = (exercises: Array<number>, targetExercise: number) : ExerciseAnalysis => {

    const average : number = calculateAverage(exercises)
    const evaluatedRating: Rating = evaluateRating(average,  targetExercise)

    return {
        periodLength: exercises.length,
        trainingDays: exercises.filter(e => e > 0).length,
        target: targetExercise,
        average,
        rating: evaluatedRating.rating,
        ratingDescription: evaluatedRating.ratingDescription,
        success: average > targetExercise
    }
}

console.log(calculateExercises([3, 3, 2, 4.5, 2, 3, 1], 2))