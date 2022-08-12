import Prototype from "./Protoype";

export default class PrototypeInstance extends Prototype {

    static createInstanceof(protoType : Prototype){
        return new PrototypeInstance(protoType);
    }

    constructor(protoType : Prototype) {
        super(
            protoType.htmlLabel,
            protoType.attributes,
            protoType.styles
        );
        this.subElmes = [];
        this.parentElem = null;
    }

    genHtml(){
        let stringBuilder = ''
        if(this.subElmes.length<=0){
            return this.genSingLineHtml();
        }else{
            stringBuilder+=this.genHtmlHead()+'\n';
            for (let child of this.subElmes ){
                stringBuilder+=child.genHtml();
            }
            stringBuilder+=this.genHtmlTail();
        }
        return stringBuilder;
    }
    attachToAnother(another : PrototypeInstance){
        this.parentElem = another;
    }
    addSubElem(another : PrototypeInstance){
        if(this.subElmes.indexOf(another)<0){
            this.subElmes.push(another);
        }
    }
    removeSubElem(another : PrototypeInstance){
        let index = this.subElmes.indexOf(another);
        if ( index >= 0 ){
            this.subElmes.splice(index,1);
        }
    }
    getChildren(){
        return this.subElmes;
    }

    getParent(){
        return this.parentElem;
    }

    render() {
        if (this.htmlLabel === null) {
            return null;
        }
        let res = Object.assign({}, this.htmlLabel);

        let obj = {}
        for (let [k, v] of Object.entries(this.attributes)) {
            if(k.substring(0,2)==='on'){
                continue;
            }
            obj[k] = v;
        }

        if('children' in obj){
            obj.children=obj.children.concat(geneChildren(this.getChildren()));
        }else{
            obj.children=geneChildren(this.getChildren());
        }
        obj['style'] = this.genStyleJSX();
        //

        res.props = obj;
        return res;
    }
}

function geneChildren(children){
    let ans = []
    for (let child of children){
        if(typeof child === "string"){
            ans.push(child);
        }else if(typeof child === "object"){
            ans.push(child.render());
        }
    }
    return ans;
}
