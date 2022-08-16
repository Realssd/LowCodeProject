import Prototype from "./Protoype";
import PrototypeInstance from "./PrototypeInstance";

export default class PureText extends PrototypeInstance {

    constructor(protoType: Prototype, index: number) {
        super(protoType,index);
    }



    modifyAttribute(key, value) {
        if (key === 'Text') {
            this.attributes[key] = value;
        }
    }

    genHtml() {
        return this.attributes.Text
    }

    attachToAnother(another: PrototypeInstance) {
        this.parentElem = another;
    }

    getChildren() {
        return null;
    }

    getParent() {
        return this.parentElem;
    }

    getId() {
        return this.id;
    }

    render(manager) {
        return this.attributes.Text;
    }

    addSubElem(another: PrototypeInstance) {
        //DO NOTHING
    }

    removeSubElem(another: PrototypeInstance) {
        //DO NOTHING
    }

    modifyStyle(key, value) {
        //DO NOTHING
    }

    removeStyle(key) {
        //DO NOTHING
    }

    removeAttr(key) {
        //DO NOTHING
    }
}
