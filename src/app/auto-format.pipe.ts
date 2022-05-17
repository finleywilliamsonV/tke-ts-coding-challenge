import { Pipe, PipeTransform } from "@angular/core";
import { isArray, isNil } from 'lodash';

@Pipe({
  name: 'autoFormat'
})
export class AutoFormatPipe implements PipeTransform {
    transform(value: unknown, ...args: unknown[]): unknown {

        // if the value is an array, give it some spaces to make it a bit more readable
        if (isArray(value)) {
            return value.reduce(
                (acc: string, curr: number, index: number) => {
                    if (index > 0 && index <= (value.length - 1)) {
                        acc += ", ";
                    }
                    acc += curr;
                    return acc;
                },
                "" as string,
            );
        
        // else, if null or empty string, display ???
        } else if (isNil(value) || value === '') {
            return '???';

        // else return the value
        } else {
            return value;
        }
    }
}
