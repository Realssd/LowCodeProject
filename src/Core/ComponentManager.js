import {Root} from "../Material/PrototypeLib";
import {computed, observable} from "mobx";
import App from "../App";
import PrototypeInstance from "../Material/PrototypeInstance";
import InstanceFactory from "../Material/InstanceFactory";

let root = InstanceFactory.createInstanceof(Root,0);

export default class ComponentManager {

    constructor(
        app: App,
        updateSelected,
        updateDOM,
        updateCanvas
    ) {
        this.app = app;
        this.updateSelected = () => updateSelected();
        this.updateDOM = () => updateDOM()
        this.updateCanvas = () => updateCanvas();
        this.selectedInstanceArray = [];
        this.nextSelectedInstanceArray = [];
        this.selectedInstance = null;
        this.instances = observable([root]);
        //console.log(this.instances[0].id)
        this.instanceNum = computed(() => this.instances.length);
    }

    existInstance(instance){
        return this.instances.indexOf(instance)>=0;
    }

    addInstance(instance, target) {
        let trueTarget = target;
        if (target == null) {
            trueTarget = this.instances[0];
        }
        this.instances.push(instance);
        trueTarget.addSubElem(instance);
        this.updateCanvas();
        this.updateDOM();
        this.selectSingleInstance(instance);
        this.updateSelected();
    }

    rmi(instance) {
        if (instance.getParent() === null) {
            return;
        }
        let total = instance.getParent().subElmes;
        let index = total.indexOf(instance);
        total.splice(index, 1);
        if (instance.getChildren() !== null) {
            for (let child of instance.getChildren()) {
                this.rmi(child);
            }
        }
    }

    removeInstance(instance) {
        let total = instance.getParent().subElmes;
        if (total.indexOf(instance) < 0) {
            //console.log("not exist",total,instance)
            return;
        }
        this.rmi(instance);
        this.updateCanvas();
        this.updateDOM();
        this.selectInstance(null);
        this.updateSelected();
    }

    moveInstance(instance, target) {
        let trueTarget = target;
        if (target == null) {
            trueTarget = this.instances[0];
        }
        instance.getParent().removeSubElem(instance);
        trueTarget.addSubElem(instance);
    }

    modifyInstanceStyle(instance, key: string, value) {
        instance.modifyStyle(key, value);
        this.updateCanvas();
        this.updateSelected();
    }

    removeInstanceStyle(instance, key: string) {
        instance.removeStyle(key);
        this.updateCanvas();
        this.updateSelected();
    }

    removeInstanceAttr(instance, key: string) {
        instance.removeAttr(key);
        this.updateCanvas();
        this.updateSelected();
    }

    modifyInstanceAttr(instance, key: string, value) {
        instance.modifyAttribute(key, value);
        //console.log(this.instances);
        this.updateCanvas();
        this.updateSelected();
    }

    addSelectInstance(instance) {
        this.nextSelectedInstanceArray.push(instance);
    }

    getInstanceNum() {
        return this.instanceNum;
    }

    getInstances() {
        return this.instances;
    }

    getSelectedInstance() {
        //console.log(this.selectedInstance)
        return this.selectedInstance;
    }

    getSelectedArray() {
        return this.selectedInstanceArray;
    }

    switchSelect() {
        //console.log(this.selectedInstanceArray)
        this.selectedInstanceArray = this.nextSelectedInstanceArray;
        this.nextSelectedInstanceArray = [];
        if (this.selectedInstanceArray.length > 0) {
            this.selectedInstance = this.selectedInstanceArray[0];
        } else {
            this.selectedInstance = null;
        }
        //console.log(this.selectedInstanceArray)
        this.updateSelected();
    }

    selectInstance(instance) {
        this.selectedInstance = instance;
        this.app.updateSelected();
    }

    selectSingleInstance(instance) {
        this.addSelectInstance(instance);
        this.switchSelect();
        this.app.updateSelected();
    }

    moveUp(instance) {
        let parent = instance.getParent()
        if (parent === null) {
            return;
        }
        let index = parent.getChildren().indexOf(instance);
        if (index > 0) {
            let temp = parent.subElmes[index];
            parent.subElmes[index] = parent.subElmes[index - 1];
            parent.subElmes[index - 1] = temp;
            this.updateDOM();
            this.updateCanvas();
        }
    }

    moveDown(instance) {
        let parent = instance.getParent()
        if (parent === null) {
            return;
        }
        let index = parent.getChildren().indexOf(instance);
        if (index < parent.subElmes.length - 1) {
            let temp = parent.subElmes[index];
            parent.subElmes[index] = parent.subElmes[index + 1];
            parent.subElmes[index + 1] = temp;
            this.updateDOM();
            this.updateCanvas();
        }
    }

}

