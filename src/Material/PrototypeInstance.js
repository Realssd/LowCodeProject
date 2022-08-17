import Prototype from "./Protoype";
import InstanceFactory from "../Core/InstanceFactory";
import reverseColor from '../Core/ReverseColor'

const img = new Image(1, 1);
img.src = "https://s1.ax1x.com/2022/08/15/vdNkMn.png";
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
        this.subElmes = protoType.defaultChildren == null ? null : cloneChildArray(protoType.defaultChildren);
        //console.log(this.subElmes);
        if (this.subElmes !== null) {
            for (let child of this.subElmes) {
                child.attachToAnother(this);
            }
        }
        this.parentElem = null;
    }

    genHtml() {
        let stringBuilder = ''
        if (!this.canHasChildren) {
            return genSingLineHtml(this);
        } else {
            stringBuilder += genHtmlHead(this);
            for (let child of this.subElmes) {
                stringBuilder += child.genHtml();
            }
            stringBuilder += genHtmlTail(this);
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
        another.setParent(this);
    }

    removeSubElem(another: PrototypeInstance) {
        let index = this.subElmes.indexOf(another);
        if (index >= 0) {
            this.subElmes.splice(index, 1);
        }
        another.setParent(null);
    }

    getChildren() {
        return this.subElmes;
    }

    setParent(parent) {
        this.parentElem = parent;
    }

    getParent() {
        return this.parentElem;
    }

    getId() {
        return this.id;
    }

    render(manager, top, left) {
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
        obj['onClick'] = () => {
            manager.addSelectInstance(this);
        };
        if (this.id !== 0) {
            obj['draggable'] = true;
            obj['onDragStart'] = (event) => {
                event.stopPropagation();
                event.dataTransfer.setDragImage(img, 0, 0);
                //console.log("Instance Dragging");
                InstanceFactory.DragManager.setHoldInstance(this);

            }

            obj['onMouseEnter'] = (event => {
                event.stopPropagation();
                if ('backgroundColor' in this.styles) {
                    event.target.style.backgroundColor = reverseColor(this.styles.backgroundColor);
                } else {
                    event.target.style.backgroundColor = reverseColor(window.getComputedStyle(event.target).backgroundColor);
                }
            })

            obj['onMouseLeave'] = (event => {
                event.stopPropagation();
                if ('backgroundColor' in this.styles) {
                    event.target.style.backgroundColor = this.styles.backgroundColor;
                } else {
                    event.nativeEvent.target.style.removeProperty('background-color');
                }
            })
            obj['onDrag'] = (event => {
                event.stopPropagation();
                //console.log(event.clientX, event.clientY);
                InstanceFactory.DragManager.cursorShow();
                // InstanceFactory.DragManager.getHoldInstance().styles.top = '1px';
                // InstanceFactory.DragManager.getHoldInstance().styles.left = '1px';
                InstanceFactory.DragManager.updateCursor(event.clientX, event.clientY);
            })
            obj['onDragEnd'] = (event) => {
                event.stopPropagation();
                //console.log('Instance DragEnd');
                InstanceFactory.DragManager.cursorHide();
                InstanceFactory.DragManager.setHoldInstance(null);
            }
            obj['onDragEnter'] = (event) => {
                event.stopPropagation();
                //console.log('enter',event.target.style.backgroundColor)
                if ('backgroundColor' in this.styles) {
                    event.target.style.backgroundColor = reverseColor(this.styles.backgroundColor);
                } else {
                    event.target.style.backgroundColor = reverseColor(window.getComputedStyle(event.target).backgroundColor);
                }

            }

            obj['onDragLeave'] = (event) => {
                event.stopPropagation();
                if ('backgroundColor' in this.styles) {
                    event.target.style.backgroundColor = this.styles.backgroundColor;
                } else {
                    event.nativeEvent.target.style.removeProperty('background-color');
                }
            }
        }


        obj['onDragOver'] = (event) => {
            event.stopPropagation();
            event.preventDefault();
        }
        obj['onDrop'] = (event) => {
            event.preventDefault();
            event.stopPropagation();
            let instance = InstanceFactory.DragManager.getHoldInstance();
            if (isChild(this, instance)) {
                InstanceFactory.Manager.modifyInstanceStyle(instance, 'position', 'absolute');
                InstanceFactory.Manager.modifyInstanceStyle(instance, 'left', `${Number.parseInt(instance.styles.left)+event.nativeEvent.offsetX + 1}px`);
                InstanceFactory.Manager.modifyInstanceStyle(instance, 'top', `${Number.parseInt(instance.styles.top)+event.nativeEvent.offsetY + 1}px`);
                InstanceFactory.Manager.moveInstance(instance,InstanceFactory.Manager.getInstances()[0],false);

                if (this.id !== 0) {
                    if ('backgroundColor' in this.styles) {
                        event.target.style.backgroundColor = this.styles.backgroundColor;
                    } else {
                        event.nativeEvent.target.style.removeProperty('background-color');
                    }
                }
                InstanceFactory.DragManager.cursorHide();
                InstanceFactory.DragManager.setHoldInstance(null);
                return;
            }
            //console.log("Canvas")
            //console.log(`${Number.parseInt(instance.styles.left)+event.nativeEvent.offsetX}px,${Number.parseInt(instance.styles.top)+event.nativeEvent.offsetY}px`)
            if (InstanceFactory.Manager.existInstance(instance)) {
                InstanceFactory.Manager.modifyInstanceStyle(instance, 'position', 'absolute');
                InstanceFactory.Manager.modifyInstanceStyle(instance, 'left', `${event.nativeEvent.offsetX + 1}px`);
                InstanceFactory.Manager.modifyInstanceStyle(instance, 'top', `${event.nativeEvent.offsetY + 1}px`);
                InstanceFactory.Manager.moveInstance(instance,this);
            } else {
                //console.log("Add");
                InstanceFactory.Manager.addInstance(instance, this);
                InstanceFactory.Manager.modifyInstanceStyle(instance, 'position', 'absolute',false);
                InstanceFactory.Manager.modifyInstanceStyle(instance, 'left', `${event.nativeEvent.offsetX + 1}px`,false);
                InstanceFactory.Manager.modifyInstanceStyle(instance, 'top', `${event.nativeEvent.offsetY + 1}px`,false);
            }
            if (this.id !== 0) {
                if ('backgroundColor' in this.styles) {
                    event.target.style.backgroundColor = this.styles.backgroundColor;
                } else {
                    event.nativeEvent.target.style.removeProperty('background-color');
                }
            }
            InstanceFactory.DragManager.cursorHide();
            InstanceFactory.DragManager.setHoldInstance(null);

        }
        if (top !== undefined) {
            obj['style'].top = top;
        }
        if (left !== undefined) {
            obj['style'].left = left;
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

function cloneChildArray(array) {
    let ans = [];
    for (let elem of array) {
        ans.push(InstanceFactory.createInstanceof(elem));
    }
    return ans;
}

function isChild(target, instance) {
    if (target === instance) {
        //console.log(target,instance)
        return true;
    }
    if (instance.subElmes != null) {
        for (let child of instance.subElmes) {
            if (isChild(target, child)) {

                return true;
            }
        }
    }
    return false;
}

function genHtmlHead(protoType) {
    let stringBuffer = '\n<' + protoType.htmlLabel.type + ' ';
    for (let [k, v] of Object.entries(protoType.attributes)) {
        stringBuffer += attrNameConvert(k) + '="' + v + '" ';
    }
    if (Object.keys(protoType.styles).length > 0) {
        stringBuffer += 'style="';
        stringBuffer += genStyleCode(protoType);
        stringBuffer += '"'
    }
    return stringBuffer + '>';
}

function genHtmlTail(protoType) {
    return "\n</" + protoType.htmlLabel.type + ">";
}

function genSingLineHtml(protoType) {
    let stringBuffer = '\n<' + protoType.htmlLabel.type + ' ';
    for (let [k, v] of Object.entries(protoType.attributes)) {
        stringBuffer += k + '= "' + v + '" ';
    }

    if (Object.keys(protoType.styles).length > 0) {
        stringBuffer += 'style="';
        stringBuffer += genStyleCode(protoType);
        stringBuffer += '"'
    }

    return stringBuffer + '/>';
}

function genStyleCode(protoType) {
    let stringBuffer = ''
    for (const [k, v] of Object.entries(protoType.styles)) {
        stringBuffer += styleNameConvert(k) + ':' + v + ';';
    }
    return stringBuffer;
}

function attrNameConvert(name: string) {
    if(name==='className'){
        return 'class';
    }
    return name.toLowerCase();
}

function styleNameConvert(name: string) {
    let stringBuilder = '';
    for (let c of name) {
        if (c === c.toUpperCase()) {
            stringBuilder += '-';
        }
        stringBuilder += c.toLowerCase();
    }
    return stringBuilder;
}
