import {ComputedText} from "./ComputedText/ComputedText";
import {getProp} from "@adaptmen/js-prop";


// Test

const data = {
    obj1: {
        addr: "https://google.com",
        num: 1
    },
    obj2: {
        num: 2,
        numText: "numText is @compute(concatString(\"1 + 1 = \", add(@lake#localhost->obj1.num@, 1))) and sum is \"1 + 2 = @compute(add(@lake#localhost->obj1.num@, @lake#localhost->obj2.num@))\""
    }
};


const text: string = getProp(data, "obj2.numText");

console.log("text:", text);

const computedText = new ComputedText(text);

computedText.computeText().then(result => {
    console.log("computed text:", result);
})