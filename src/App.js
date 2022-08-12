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

class App extends React.Component {
    constructor(props) {
        super(props);
        this.ComponentManager = new ComponentManager(
            this,
            this.updateSelected,
            this.updateDOM,
            this.updateCanvas,
            this.updateAttr,
            this.updateStyle
        );
        this.state ={
            selected:this.ComponentManager.getSelectedInstance(),
            instances:this.ComponentManager.getInstances(),
            instanceNum:this.ComponentManager.getInstanceNum()
        }
    }

    render() {
        return (
            <div className={'wrapper'}>
                <Topbar></Topbar>
                <div className={'flex-wrapper'}>
                    <div className={'left-block'}>
                        <Sidebar
                            title={'ToolBox'}
                            content={<CompContent manager={this.ComponentManager} content={Object.entries(Lib)}/>}
                        />
                        <Sidebar
                            title={'DOM'}
                            content={<DomNode manager={this.ComponentManager} proto={this.ComponentManager.instances[0]}/>}
                        />
                    </div>
                    <div className={'center-block'}>
                        <Canvas manager={this.ComponentManager} content={this.ComponentManager.getInstances()[0]}></Canvas>
                    </div>
                    <div className={'right-block'}>
                        <Sidebar
                            title={'Style'}
                            content={<CompContent manager={this.ComponentManager} content={[]}/>}
                        />
                        <Sidebar
                            title={'Attributes'}
                            content={<CompContent manager={this.ComponentManager} content={[]}/>}
                        />
                    </div>
                </div>
                <BottomBar></BottomBar>
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
        this.setState({instances:this.ComponentManager.getInstances()})
    }

    updateSelected = () => {
        this.setState({selected:this.ComponentManager.getSelectedInstance()})
    }

    updateAttr = () => {
        this.setState({selected:this.ComponentManager.getSelectedInstance()})
    }

    updateStyle = () => {
        this.setState({selected:this.ComponentManager.getSelectedInstance()})
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
