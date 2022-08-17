import Prototype from "../Material/Protoype";
import PrototypeInstance from "../Material/PrototypeInstance";
import PureText from "../Material/PureText";

export default class InstanceFactory {
    static nextIndexId = 0;
    static DragManager = null;
    static Manager = null;
    static createInstanceof(prototype: Prototype, index) {
        if (index === undefined) {
            this.nextIndexId += 1;
            if (prototype.getLabel() === 'PureText') {
                return new PureText(prototype, this.nextIndexId);
            } else {
                return new PrototypeInstance(prototype, this.nextIndexId);
            }
        } else {
            if (prototype.getLabel() === 'PureText') {
                return new PureText(prototype, index);
            } else {
                return new PrototypeInstance(prototype, index);
            }
        }
    }

    static signDragManager(manager) {
        this.DragManager = manager;
    }

    static signManager(manager){
        this.Manager = manager;
    }

}
