import {LRI} from "../Lake/LRI";
import {LRL} from "../Lake/LRL";


export class Expression {

    private raw: string;

    private code: string;

    public lris: LRI[];

    constructor(text: string) {
        this.raw = text;
        this.processRaw(this.raw);
    }

    private processRaw(raw: string) {
        const clear = (raw.match(/(@compute\()(.*?[\)]+)(\))/) || [])[2];
        this.lris = LRI.matchByText(clear).map(lripath => new LRI(lripath));
        this.code = clear;
    }

    private evaluate(): Promise<any> {
        return function() {
            const add = function(a, b) {
                return a + b;
            };
            const concatString = function(...args) {
                return args.map(String).join("");
            };
            const evalResult = eval(this.code);
            return evalResult
        }.call({code: this.code});
    }

    private static context = {
    };

    private normalize(): Promise<void> {
        return LRL.LoadLRIBatch(this.lris).then(result => {
            for (let lripath in result) {
                this.code = this.code.replace(lripath, result[lripath]);
            }
        });
    }

    public compute(): Promise<string> {
        return this.normalize().then(() => {
            const evaluated = this.evaluate();
            console.log("evaluated", evaluated)
            return evaluated;
        });
    }

}