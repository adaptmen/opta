import {LRI} from "./LRI";
import {getProp} from "@adaptmen/js-prop";


const data = {
    obj1: {
        addr: "https://google.com",
        num: 1
    },
    obj2: {
        num: 2,
        numText: "numText is @compute(concatString(\"Число равно \", add(@lake#localhost->obj1.num@, 1))) and sum is @compute(add(@lake#localhost->obj1.num@, @lake#localhost->obj2.num@))"
    }
};

type LRLoadResult = {
    [x: string]: any
};

export class LakeResourceLoader {

    private static Cache: LRLoadResult = {};

    static LoadLRI(lri: LRI): Promise<LRLoadResult> {
        return Promise.resolve({
            [lri.escaped]: getProp(data, lri.valuePath)
        });
    }

    static LoadLRIBatch(lris: LRI[]): Promise<LRLoadResult> {
        const resultMap = {};
        lris.forEach(lri => {
            resultMap[lri.escaped] = getProp(data, lri.valuePath)
        });
        return Promise.resolve(resultMap)
    }

}

export {LakeResourceLoader as LRL}