import _ from "underscore";


type LRIPath = string;

export class LakeResourceIdentifier {

    public escaped: LRIPath; // @lake#localhost->obj1.num@

    public unescaped: string; // lake#localhost->obj1.num

    public resourceName: string; // localhost

    public valuePath: string; // obj1.num

    constructor(lrip: LRIPath) {
        this.escaped = lrip;
        // console.log("escaped", this.escaped)
        this.unescaped = LakeResourceIdentifier.unescape(lrip);
        // console.log("unescaped", this.unescaped)
        this.resourceName = LakeResourceIdentifier.getName(this.unescaped);
        // console.log("resName", this.resourceName)
        this.valuePath = LakeResourceIdentifier.getValuePath(this.unescaped);
        // console.log("valuePath", this.valuePath)
    }

    static matchByText(text: string): LRIPath[] {
        return _.uniq(_.flatten(text.match(/(@lake#)(.*?)(@)/g)));
    }

    static unescape(escaped: LRIPath) {
        return escaped.match(/(@lake#)(.*?)(@)/)[2];
    }

    static getName(unescaped: string) {
        return unescaped.match(/(.*?)(->)/)[1];
    }

    static getValuePath(unescaped: string) {
        return unescaped.match(/(->)(.*)/)[2];
    }

}

export {LakeResourceIdentifier as LRI}