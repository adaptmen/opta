import {Compute} from "./Compute";


export class ComputedText {

    private computes: Compute[];

    private raw: string;

    private computed: string;

    constructor(text: string) {
        this.raw = text;
        this.computes = Compute.matchFromText(this.raw);
        this.computed = this.raw;
    }

    public computeText(): Promise<string> {
        return Promise.all(this.computes.map(c => c.compute())).then(results => {
            results.forEach(computeResult => {
                this.computed = this.computed.replace(
                    computeResult.raw,
                    computeResult.computed
                );
            });
        }).then(() => {
            return this.computed;
        })
    }

}