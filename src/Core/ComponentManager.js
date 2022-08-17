import {Root} from "../Material/PrototypeLib";
import {computed, observable} from "mobx";
import App from "../App";
import InstanceFactory from "./InstanceFactory";

let root = InstanceFactory.createInstanceof(Root, 0);

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

    signOperationStack(ops){
        this.ops=ops;
    }

    existInstance(instance,array) {
        if(array===null){
            return false;
        }
        if(array===undefined){
            array=this.instances;
        }
        if(array.indexOf(instance)>=0){
            return true;
        }
        for (let child of array){
            if(this.existInstance(instance,child.subElmes)){
                return true;
            }
        }
        return false;
    }

    addInstance(instance, target,symbol) {
        let trueTarget = target;
        if (target == null) {
            trueTarget = this.instances[0];
        }
        //this.instances.push(instance);
        this.addi(instance);
        trueTarget.addSubElem(instance);
        if(symbol===undefined){
            this.ops.addUndo(
                {
                    method:'add',
                    target:instance,
                    next:target
                }
            )
        }
        //console.log(this.instances);
        this.updateCanvas();
        this.updateDOM();
        this.selectSingleInstance(instance);
        this.updateSelected();
    }

    addi(instance){
        let total = this.instances;
        let index = total.indexOf(instance);
        if(index<0) {
            total.push(instance);
            if (instance.getChildren() !== null) {
                for (let child of instance.getChildren()) {
                    this.addi(child);
                }
            }
        }
    }
    rmi(instance) {
        let total = this.instances;
        let index = total.indexOf(instance);
        if(index>=0) {
            total.splice(index, 1);
            if (instance.getChildren() !== null) {
                for (let child of instance.getChildren()) {
                    this.rmi(child);
                }
            }
        }
        //console.log(index,this.instances)
    }

    removeInstance(instance,symbol) {
        if(instance.id===0){
            return;
        }
        let total = instance.getParent().subElmes;
        if (total.indexOf(instance) < 0) {
            //console.log("not exist",total,instance)
            return;
        }
        this.rmi(instance);
        let index = instance.getParent().subElmes.indexOf(instance);
        instance.getParent().subElmes.splice(index,1);
        if(symbol===undefined){
            this.ops.addUndo(
                {
                    method:'remove',
                    target:instance,
                    prev:instance.getParent()
                }
            )
        }
        instance.setParent(null);
        this.updateCanvas();
        this.updateDOM();
        this.selectInstance(null);
        this.updateSelected();
    }

    moveInstance(instance, target,symbol) {
        let trueTarget = target;
        if (target == null) {
            trueTarget = this.instances[0];
        }
        if(symbol===undefined && instance.getParent().getId()!==target.getId()){
            this.ops.addUndo(
                {
                    method:'m-parent',
                    target:instance,
                    prev:instance.getParent(),
                    next:target
                }
            )
        }
        instance.getParent().removeSubElem(instance);
        trueTarget.addSubElem(instance);
        this.updateCanvas();
        this.updateSelected();
    }

    modifyInstanceStyle(instance, key: string, value,symbol) {

        if(symbol===undefined&&instance.styles[key]!==value){
            this.ops.addUndo(
                {
                    method:'m-style',
                    target:instance,
                    prev:{key:key,value:instance.styles[key]},
                    next:{key:key,value:value}
                }
            )
        }
        instance.modifyStyle(key, value);
        if(instance.id===0){
            //console.log(key,Number.parseInt(value.slice(0,value.length-2)))
            if(key === 'height'){
                this.app.setState({canvasHeight:Number.parseInt(value.slice(0,value.length-2))});
            }
            if(key === 'width'){
                this.app.setState({canvasWidth:Number.parseInt(value.slice(0,value.length-2))});
            }
        }
        this.updateCanvas();
        this.updateSelected();
    }

    removeInstanceStyle(instance, key: string,symbol) {
        if(symbol===undefined){
            this.ops.addUndo(
                {
                    method:'m-style',
                    target:instance,
                    prev:{key:key,value:instance.styles[key]},
                    next:{key:key,value:undefined}
                }
            )
        }
        instance.removeStyle(key);
        this.updateCanvas();
        this.updateSelected();
    }

    removeInstanceAttr(instance, key: string,symbol) {
        if(symbol===undefined){
            this.ops.addUndo(
                {
                    method:'m-attr',
                    target:instance,
                    prev:{key:key,value:instance.attributes[key]},
                    next:{key:key,value:undefined}
                }
            )
        }
        instance.removeAttr(key);
        this.updateCanvas();
        this.updateSelected();
    }

    modifyInstanceAttr(instance, key: string, value,symbol) {
        if(symbol===undefined && instance.attributes[key]!==value){
            this.ops.addUndo(
                {
                    method:'m-attr',
                    target:instance,
                    prev:{key:key,value:instance.attributes[key]},
                    next:{key:key,value:value}
                }
            )
        }
        instance.modifyAttribute(key, value);
        this.updateCanvas();
        this.updateSelected();
    }

    moveUp(instance,symbol) {
        let parent = instance.getParent()
        if (parent === null) {
            return;
        }
        let index = parent.getChildren().indexOf(instance);
        if (index > 0) {
            let temp = parent.subElmes[index];
            parent.subElmes[index] = parent.subElmes[index - 1];
            parent.subElmes[index - 1] = temp;
            if(symbol===undefined){
                this.ops.addUndo(
                    {
                        method:'moveUp',
                        target:instance
                    }
                )
            }
            this.updateDOM();
            this.updateCanvas();
        }
    }

    moveDown(instance,symbol) {
        let parent = instance.getParent()
        if (parent === null) {
            return;
        }
        let index = parent.getChildren().indexOf(instance);
        if (index < parent.subElmes.length - 1) {
            let temp = parent.subElmes[index];
            parent.subElmes[index] = parent.subElmes[index + 1];
            parent.subElmes[index + 1] = temp;
            if(symbol===undefined){
                if(symbol===undefined){
                    this.ops.addUndo(
                        {
                            method:'moveUp',
                            target:instance
                        }
                    )
                }
            }
            this.updateDOM();
            this.updateCanvas();
        }
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
            this.selectInstance(this.selectedInstanceArray[0]);
        } else {
            this.selectedInstance(null);
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

}


