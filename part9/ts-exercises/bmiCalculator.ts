export function calculateBmi(height: number, weight: number): string {
    const hMeters = height / 100;
    const bmi = weight / (hMeters ** 2);
    if (bmi < 19) {
        return 'Underweight';
    } else if (bmi >= 19 && bmi <= 25) {
        return 'Normal (Healthy Weight)';
    } else {
        return 'Overweight';
    }
}

function parseArgs(args: string[]) {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

try {
    const { value1, value2 } = parseArgs(process.argv);
    console.log(calculateBmi(value1, value2));
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}
