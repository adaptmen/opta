import {Expression} from "./Expression";


export type ComputeResult = {
    raw: string;
    computed: string;
};

export class Compute {

    private expression: Expression;

    public raw: string;

    constructor(computeText: string) {
        this.raw = computeText;
        this.expression = new Expression(this.raw);
    }

    static matchFromText(text: string): Compute[] {
        const matched = text.match(/(@compute\()(.*?[\)]+)(\))/g) || [];
        const computes = [];
        matched.forEach(comp => {
            computes.push(new Compute(comp));
        });
        return computes;
    }

    public compute(): Promise<ComputeResult> {
        return this.expression.compute().then(computed => {
            return {
                raw: this.raw,
                computed: computed
            };
        });
    }

}