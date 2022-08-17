export default class DragManager {

    constructor(app, manager) {
        this.app = app;
        this.holdInstace = null;
        this.manager = manager;
    }

    setHoldInstance(instance) {
        this.holdInstace = instance;
    }

    getHoldInstance() {
        return this.holdInstace;
    }

    updateCursor(x, y) {
        this.app.updateCursor(x, y)
    }

    cursorShow() {
        // delete this.holdInstace.styles.left;
        // delete this.holdInstace.styles.top;
        this.app.cursorShow();
    }

    cursorHide() {
        this.app.cursorHide();
    }

}
