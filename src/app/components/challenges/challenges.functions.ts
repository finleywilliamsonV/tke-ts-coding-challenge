import { isNil } from 'lodash'

export const getChallengeOutput = (functionOutput: any) => {
    if (isNil(functionOutput)) {
        return '???';
    } else {
        return functionOutput;
    }
}