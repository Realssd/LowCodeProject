
export default class Prototype {

    constructor(htmlLabel, attrList, styleList,defaultChildren,canHaveChildren) {
        this.htmlLabel = htmlLabel === undefined ? null : htmlLabel;
        this.attributes = attrList === undefined ? {} : attrList;
        this.styles = styleList === undefined ? {} : styleList;
        this.defaultChildren = defaultChildren;
        if(canHaveChildren===false){
            this.canHasChildren=false;
        }else{
            this.canHasChildren=true
        }
    }

    genHtmlHead() {
        let stringBuffer = '<' + this.htmlLabel.type + ' ';
        for (let [k, v] of Object.entries(this.attributes)) {
            stringBuffer += k + '="' + v + '" ';
        }
        if (Object.keys(this.styles).length > 0) {
            stringBuffer += 'style="';
            for (let [k, v] of Object.entries(this.styles)) {
                stringBuffer += k + ':' + v + ';'
            }
            stringBuffer += '"'
        }
        return stringBuffer + '>';
    }

    genHtmlTail() {
        return "</" + this.htmlLabel.type + ">";
    }

    genSingLineHtml() {
        let stringBuffer = '<' + this.htmlLabel.type + ' ';
        for (let [k, v] of Object.entries(this.attributes)) {
            stringBuffer += k + '= "' + v + '" ';
        }

        if (Object.keys(this.styles).length > 0) {
            stringBuffer += 'style="';
            for (let [k, v] of Object.entries(this.styles)) {
                stringBuffer += k + '=' + v + ';'
            }
            stringBuffer += '"'
        }

        return stringBuffer + '/>';
    }

    genStyleCode() {
        let stringBuffer = ''
        for (const [k, v] of Object.entries(this.styles)) {
            stringBuffer += k + ':' + v + ';\n';
        }
        return stringBuffer;
    }

    genStyleJSX() {
        let obj = {};
        for (const [k, v] of Object.entries(this.styles)) {
            obj[k] = v;
        }
        return obj;
    }

    modifyAttribute(key, value) {
        if (!(key === 'style')) {
            this.attributes[key] = value;
        }
    }

    modifyStyle(key, value) {
        this.styles[key] = value;
    }

    removeStyle(key) {
        //console.log("Remove",this,key)
        if (key in this.styles) {
            delete this.styles[key]
        }
    }

    removeAttr(key) {
        if (key in this.attributes) {
            delete this.attributes[key]
        }
    }

    getLabel(){
        return this.htmlLabel.type;
    }

    getAttributes(){
        return Object.entries(this.attributes);
    }

    getStyles(){
        return Object.entries(this.styles);
    }

}

