import { isNil } from 'lodash'

export const getChallengeOutput = (functionOutput: any) => {
    if (isNil(functionOutput) || functionOutput === '') {
        return '???';
    } else {
        return functionOutput;
    }
}