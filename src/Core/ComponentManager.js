import {Lib} from "../Material/PrototypeLib";
import {computed, observable} from "mobx";
import App from "../App";
import PrototypeInstance from "../Material/PrototypeInstance";


export default class ComponentManager {

    constructor(
        app: App,
        updateSelected,
        updateDOM,
        updateCanvas,
        updateAttr,
        updateStyle,
    ) {
        this.app = app;
        this.updateSelected = () => updateSelected();
        this.updateDOM = () => updateDOM()
        this.updateCanvas = () => updateCanvas();
        this.updateAttr = () => updateAttr();
        this.updateStyle = () => updateStyle();
        this.selectedInstance = null;
        this.instances = observable([PrototypeInstance.createInstanceof(Lib.div)]);
        this.instanceNum = computed(() => this.instances.length);
    }

    addInstance(instance, target) {
        let trueTarget = target;
        if (target == null) {
            trueTarget = this.instances[0];
        }
        this.instances.push(instance);
        trueTarget.addSubElem(instance);
        instance.attachToAnother(trueTarget);
        this.updateCanvas();
        this.updateDOM();
        this.selectInstance(instance);
        this.updateSelected();
    }

    rmi(instance) {
        let index = this.instances.indexOf(instance);
        this.instances.splice(index, 1);
        for (let child of instance.getChildren()) {
            this.rmi(child);
        }
    }

    removeInstance(instance) {
        if (this.instances.indexOf(instance) <= 0) {
            return;
        }
        this.rmi(instance);
        this.updateCanvas();
        this.updateDOM();
        this.selectedInstance(null);
        this.updateSelected();
    }

    moveInstance(instance, target) {
        let trueTarget = target;
        if (target == null) {
            trueTarget = this.instances[0];
        }
        instance.getParent().removeSubElem(instance);
        trueTarget.addSubElem(instance);
        instance.attachToAnother(trueTarget);
    }

    modifyInstanceStyle(instance, key: string, value) {
        instance.modifyStyle(key, value);
        this.updateCanvas();
        this.updateStyle();
    }

    modifyInstanceAttr(instance, key: string, value) {
        instance.modifyAttribute(key, value);
        this.updateCanvas();
        this.updateAttr();
    }

    selectInstance(instance) {
        this.selectedInstance = instance;
        this.updateSelected();
    }

    getInstanceNum() {
        return this.instanceNum;
    }

    getInstances() {
        return this.instances;
    }

    getSelectedInstance() {
        return this.selectedInstance;
    }

}

