import { Pipe, PipeTransform } from "@angular/core";
import { isArray } from "lodash";

@Pipe({
  name: 'autoFormat'
})
export class AutoFormatPipe implements PipeTransform {
    transform(value: number[], ...args: unknown[]): unknown {
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
        }
        return value;
    }
}
