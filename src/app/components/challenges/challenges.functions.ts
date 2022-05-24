export const getChallengeOutput = (functionOutput: any) => {
    if (functionOutput === null || functionOutput === undefined || functionOutput === '') {
        return '???';
    } else {
        return functionOutput;
    }
}