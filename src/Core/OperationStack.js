
export default class OperationStack {
    constructor(manager) {
        this.RedoStack=[];
        this.UndoStack=[];
        this.manager = manager;
    }

    undo(){
        if(this.UndoStack.length>0){
            let target = this.UndoStack.pop();
            target.undo();
            this.RedoStack.push(target);
            console.log(target)
        }
    }

    redo(){
        if(this.RedoStack.length>0){
            let target = this.RedoStack.pop();
            target.redo();
            this.UndoStack.push(target);
        }
    }

    addUndo(operation){
        if(this.UndoStack.length>=100){
            this.UndoStack.shift();
        }
        this.UndoStack.push(new Operation(
            operation.method,
            operation.target,
            operation.prev,
            operation.next,
            this.manager));
        console.log(this.UndoStack[this.UndoStack.length-1])
        this.RedoStack=[];
    }
}

class Operation {

    constructor(method,target,prev,next,manager) {
        this.method = method;
        this.target = target;
        this.prev = prev;
        this.next = next;
        this.manager = manager;
    }

    redo(){
        switch (this.method){
            case "add":
                this.manager.addInstance(this.target,this.next,false);
                break;
            case "remove":
                this.manager.removeInstance(this.target,false);
                break;
            case "m-attr":
                if(this.next.value ===undefined){
                    this.manager.removeInstanceAttr(this.target,this.next.key,false);
                }else {
                    this.manager.modifyInstanceAttr(this.target,this.next.key,this.next.value,false);
                }
                break;
            case "m-style":
                if(this.next.value ===undefined){
                    this.manager.removeInstanceStyle(this.target,this.next.key,false);
                }else {
                    this.manager.modifyInstanceStyle(this.target,this.next.key,this.next.value,false)
                }
                break;
            case "m-parent":
                this.manager.moveInstance(this.target,this.next,false);
                break;
            case "moveDown":
                this.manager.moveDown(this.target,false);
                break;
            case "moveUp":
                this.manager.moveUp(this.target,false);
                break;
            default:
                break;
        }
    }

    undo(){
        switch (this.method){
            case "add":
                this.manager.removeInstance(this.target,false);
                break;
            case "remove":
                this.manager.addInstance(this.target,this.prev,false);
                break;
            case "m-attr":
                if(this.prev.value ===undefined){
                    this.manager.removeInstanceAttr(this.target,this.prev.key,false);
                }else {
                    this.manager.modifyInstanceAttr(this.target,this.prev.key,this.prev.value,false);
                }
                break;
            case "m-style":
                if(this.prev.value === undefined){
                    this.manager.removeInstanceStyle(this.target,this.prev.key,false);
                }else {
                    this.manager.modifyInstanceStyle(this.target,this.prev.key,this.prev.value,false)
                }
                break;
            case "m-parent":
                this.manager.moveInstance(this.target,this.prev,false);
                break;
            case "moveUp":
                this.manager.moveDown(this.target,false);
                break;
            case "moveDown":
                this.manager.moveUp(this.target,false);
                break;
            default:
                break;
        }
    }

}
