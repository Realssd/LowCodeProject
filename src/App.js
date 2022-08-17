import './App.css';
import './Material/PrototypeLib'
import {Lib} from "./Material/PrototypeLib";
import Topbar from "./Components/Topbar/Topbar";
import BottomBar from "./Components/Bottom-Bar/BottomBar";
import Sidebar from "./Universe-Component/Sidebar/Sidebar";
import CompContent from "./Universe-Component/Sidebar/CompContent/CompContent";
import DomNode from "./Universe-Component/Sidebar/DOM-Node/DomNode"
import React from "react";
import Canvas from "./Components/Canvas/Canvas";
import ComponentManager from "./Core/ComponentManager";
import AttrContent from "./Universe-Component/Sidebar/Attr-Content/AttrContent";
import StyleContent from "./Universe-Component/Sidebar/Style-Content/StyleContent";
import DragManager from "./Core/DragManager";
import Cursor from "./Components/Cursor/Cursor";
import InstanceFactory from "./Core/InstanceFactory";
import OperationStack from "./Core/OperationStack";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.ComponentManager = new ComponentManager(
            this,
            this.updateSelected,
            this.updateDOM,
            this.updateCanvas
        );

        this.DragManager = new DragManager(this,this.ComponentManager);
        this.OperationStack = new OperationStack(this.ComponentManager);
        this.ComponentManager.signOperationStack(this.OperationStack);
        InstanceFactory.signDragManager(this.DragManager);
        InstanceFactory.signManager(this.ComponentManager);
        this.state ={
            selected:this.ComponentManager.getSelectedInstance(),
            selectedArray:this.ComponentManager.getSelectedArray(),
            instances:this.ComponentManager.getInstances(),
            instanceNum:this.ComponentManager.getInstanceNum(),
            holdInstance:null,
            canvasRate:100,
            canvasWidth:500,
            canvasHeight:500
        }
    }

    render() {
        return (
            <div className={'wrapper'}>

                <Topbar
                    manager={this.ComponentManager}
                    selected={this.state.selected}
                    ops={this.OperationStack}
                    canvasWidth={this.state.canvasWidth}
                    canvasHeight={this.state.canvasHeight}
                ></Topbar>
                <div className={'flex-wrapper'}>
                    <div className={'left-block'}>
                        <Sidebar
                            title={'ToolBox'}
                            content={
                                <CompContent
                                    drag={this.DragManager}
                                    manager={this.ComponentManager}
                                    content={Object.entries(Lib)}
                                />
                            }
                        />
                        <Sidebar
                            title={'DOM'}
                            content={
                                <DomNode
                                    drag={this.DragManager}
                                    manager={this.ComponentManager}
                                    proto={this.state.instances[0]}
                                />
                            }
                        />
                    </div>
                    <div className={'center-block'}>
                        <Canvas
                            drag={this.DragManager}
                            manager={this.ComponentManager}
                            content={this.state.instances}
                            scaleRate={this.state.canvasRate}
                            width={this.state.canvasWidth}
                            height={this.state.canvasHeight}
                        />
                        <input
                            className={'scale-range'}
                            type="range" min="0"
                            max="100" step="1"
                            defaultValue={'100'}
                            onChange={(event)=>{
                                this.setState({canvasRate: event.target.value});
                            }}
                        />
                    </div>
                    <div className={'right-block'}>
                        <Sidebar
                            title={'Style'}
                            content={<StyleContent selectedItem={this.state.selected} manager={this.ComponentManager}/>}
                        />
                        <Sidebar
                            title={'Attributes'}
                            content={<AttrContent selectedItem={this.state.selected} manager={this.ComponentManager}/>}
                        />
                    </div>
                </div>
                <BottomBar selected={this.state.selectedArray} manager={this.ComponentManager} />
                <Cursor manager={this.ComponentManager} instance={this.state.holdInstance}/>
                <a id={'undefined'} style={{display:'none'}}></a>
            </div>
        );
    }

    updateDOM = () => {
        this.setState({
            instances:this.ComponentManager.getInstances(),
            instanceNum:this.ComponentManager.getInstanceNum()
        })
    }

    updateCanvas = () => {
        this.setState({instances:this.ComponentManager.instances})
    }

    updateSelected = () => {
        this.setState({
            selected:this.ComponentManager.getSelectedInstance(),
            selectedArray:this.ComponentManager.getSelectedArray()
        })
    }

    updateCursor(x,y){
        let cursor = document.getElementById('cursor');
        cursor.style.display = 'block';
        cursor.style.top=`${y+1}px`;
        cursor.style.left=`${x+1}px`;
        //console.log("set",x,y)
    }

    cursorShow(){
        this.setState({holdInstance:this.DragManager.getHoldInstance()});
    }

    cursorHide(){
        this.setState({holdInstance:this.DragManager.getHoldInstance()});
        let cursor = document.getElementById('cursor');
        cursor.style.display = 'none';
    }
}


export default App;


// let root = PrototypeInstance.createInstanceof(Lib.div)
// for (let i = 0; i < 5; i+=1){
//     let child1=PrototypeInstance.createInstanceof(Lib.button);
//     for (let j =0; j < 5; j+=1){
//         let child2=PrototypeInstance.createInstanceof(Lib.a);
//         child1.addSubElem(child2)
//     }
//     root.addSubElem(child1)
// }
