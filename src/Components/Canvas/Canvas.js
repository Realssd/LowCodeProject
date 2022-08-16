import './Canvas.css'
import {Lib} from "../../Material/PrototypeLib";
import React from "react";

export default function Canvas(props) {
    return (
        <div
            className={'canvas'}
            style={{
                width: `${props.width}px`,
                height: `${props.height}px`,
                transform: `translate(${props.positionX}px,${props.positionY}px)`,
                scale: `${props.scaleRate}%`,
                backgroundColor: 'white',
                overflow:`${props.overflow}`
            }}
            onClick={()=>props.manager.switchSelect()}
            onDragOver={(event)=>{
                event.preventDefault();
            }}
            onDrop={(event)=>{
                event.preventDefault();
                let instance = props.drag.getHoldInstance();
                console.log(`${event.nativeEvent.offsetX}px,${event.nativeEvent.offsetY}px`)

                props.manager.addInstance(instance,props.manager.instances[0]);
                props.manager.modifyInstanceStyle(instance,'position','absolute');
                props.manager.modifyInstanceStyle(instance,'left',`${event.nativeEvent.offsetX+1}px`);
                props.manager.modifyInstanceStyle(instance,'top',`${event.nativeEvent.offsetY+1}px`);

            }}
        >

            {props.content.render(props.manager)}
        </div>
        // props.positionX
    )

}

Canvas.defaultProps = {
    content: Lib.button,
    scaleRate: 50,
    positionX: 0,
    positionY: 0,
    width: 1920,
    height: 1080,
    overflow:'hidden'
}



