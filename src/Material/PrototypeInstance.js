import Prototype from "./Protoype";
import InstanceFactory from "./InstanceFactory";

const img = new Image(1,1);
img.src="https://s1.ax1x.com/2022/08/15/vdNkMn.png";
export default class PrototypeInstance extends Prototype {

    constructor(protoType: Prototype, index: number) {
        super(
            clone(protoType.htmlLabel),
            clone(protoType.attributes),
            clone(protoType.styles),
            clone(protoType.defaultChildren),
            protoType.canHasChildren
        );
        this.id = index;
        this.subElmes = protoType.defaultChildren==null?null:cloneChildArray(protoType.defaultChildren);
        //console.log(this.subElmes);
        if(this.subElmes!==null){
            for(let child of this.subElmes){
                child.attachToAnother(this);
            }
        }
        this.parentElem = null;
    }

    genHtml() {
        let stringBuilder = ''
        if (this.subElmes.length <= 0) {
            return this.genSingLineHtml();
        } else {
            stringBuilder += this.genHtmlHead() + '\n';
            for (let child of this.subElmes) {
                stringBuilder += child.genHtml();
            }
            stringBuilder += this.genHtmlTail();
        }
        return stringBuilder;
    }

    attachToAnother(another: PrototypeInstance) {
        this.parentElem = another;
    }

    addSubElem(another: PrototypeInstance) {
        if (this.canHasChildren && this.subElmes.indexOf(another) < 0) {
            this.subElmes.push(another);
        }
    }

    removeSubElem(another: PrototypeInstance) {
        let index = this.subElmes.indexOf(another);
        if (index >= 0) {
            this.subElmes.splice(index, 1);
        }
    }

    getChildren() {
        return this.subElmes;
    }

    getParent() {
        return this.parentElem;
    }

    getId() {
        return this.id;
    }

    render(manager,top,left) {
        if (this.htmlLabel === null) {
            return null;
        }
        let res = Object.assign({}, this.htmlLabel);

        let obj = {}
        for (let [k, v] of Object.entries(this.attributes)) {
            if (k.substring(0, 2) === 'on') {
                continue;
            }
            obj[k] = v;
        }
        if (this.canHasChildren) {
            if ('children' in obj) {
                obj.children = obj.children.concat(geneChildren(this.getChildren(), manager));
            } else {
                obj.children = geneChildren(this.getChildren(), manager);
            }
        }
        obj['style'] = this.genStyleJSX();
        obj['style'].cursor = 'pointer'
        obj['onClick'] = () => manager.addSelectInstance(this);
        if(this.id!==0) {
            obj['draggable'] = true;
            obj['onDragStart'] = (event) => {
                event.stopPropagation();
                event.dataTransfer.setDragImage(img, 0, 0);
                console.log("Instance Dragging");
                InstanceFactory.DragManager.setHoldInstance(this);

            }
            obj['onDrag'] = (event => {
                event.stopPropagation();
                //console.log(event.clientX, event.clientY);
                InstanceFactory.DragManager.cursorShow();
                // InstanceFactory.DragManager.getHoldInstance().styles.top = '1px';
                // InstanceFactory.DragManager.getHoldInstance().styles.left = '1px';
                InstanceFactory.DragManager.updateCursor(event.clientX,event.clientY);
            })
            obj['onDragEnd'] = (event) => {
                event.stopPropagation();
                console.log('Instance DragEnd');
                InstanceFactory.DragManager.cursorHide();
                //InstanceFactory.DragManager.setHoldInstance(null);
            }
        }
        obj['onDragOver']=(event)=>{
            event.stopPropagation();
            event.preventDefault();
        }
        obj['onDrop']=(event)=>{
            event.preventDefault();
            event.stopPropagation();
            let instance = InstanceFactory.DragManager.getHoldInstance();
            if(isChild(this,instance)){
                return;
            }
            console.log(`${event.nativeEvent.offsetX}px,${event.nativeEvent.offsetY}px`)
            if(InstanceFactory.Manager.existInstance(instance)){
                instance.getParent().removeSubElem(instance);
                this.addSubElem(instance);
                instance.attachToAnother(this);
            }else{
                console.log("Add");
                InstanceFactory.Manager.addInstance(instance,this);
            }
            InstanceFactory.Manager.modifyInstanceStyle(instance,'position','absolute');
            InstanceFactory.Manager.modifyInstanceStyle(instance,'left',`${event.nativeEvent.offsetX+1}px`);
            InstanceFactory.Manager.modifyInstanceStyle(instance,'top',`${event.nativeEvent.offsetY+1}px`);

        }
        if(top!==undefined){
            obj['style'].top=top;
        }
        if(left!==undefined){
            obj['style'].left=left;
        }
        res.key = 'CanvasNode-' + this.getId().toString();
        res.props = obj;
        return res;
    }
}

function geneChildren(children, manager) {
    let ans = []
    for (let child of children) {
        ans.push(child.render(manager));
    }
    return ans;
}

function clone(obj) {
    if (obj === null || obj === undefined) {
        return null
    }
    if (typeof obj === 'object') {
        let ans = {};
        for (let col of Object.entries(obj)) {
            if (typeof col[1] === 'object') {
                if (Array.isArray(col[1])) {
                    ans[col[0]] = col[1].slice();
                } else {
                    ans[col[0]] = clone(col[1]);
                }

            } else {
                ans[col[0]] = col[1];
            }
        }
        return ans;
    }
    return obj;
}

function cloneChildArray(array){
    let ans = [];
    for (let elem of array){
        ans.push(InstanceFactory.createInstanceof(elem));
    }
    return ans;
}

function isChild(target,instance){
    if(target===instance){
        //console.log(target,instance)
        return true;
    }
    if(instance.subElmes!=null) {
        for (let child of instance.subElmes) {
            if (isChild(target, child)) {

                return true;
            }
        }
    }
    return false;
}
