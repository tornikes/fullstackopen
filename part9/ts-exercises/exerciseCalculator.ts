interface ExerciseSummary {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
};

function exerciseCalculator(hours: number[], target: number): ExerciseSummary {
    const periodLength = hours.length;
    const trainingDays = hours.filter(day => day > 0).length;
    const average = hours.reduce((a, b) => a + b) / periodLength;
    const success = average >= target;
    const [rating, ratingDescription] = getRating(average, target);
    return {
        periodLength,
        trainingDays,
        average,
        success,
        target,
        rating,
        ratingDescription
    };
}

function getRating(average: number, target: number): [number, string] {
    const ratio = average / target;
    if (ratio < 0.5) {
        return [1, 'Try Harder Next Time']
    } else if (ratio >= .5 && ratio <= 1) {
        return [2, 'Not too bad but could be better'];
    } else {
        return [3, 'You worked really hard!'];
    }
}

function argsParser(args: string[]) {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (!args.slice(2).some(arg => isNaN(Number(arg)))) {
        return {
            value: Number(args[2]),
            restValues: args.slice(3).map(Number)
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

try {
    const { value, restValues } = argsParser(process.argv);
    console.log(exerciseCalculator(restValues, value));
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}
