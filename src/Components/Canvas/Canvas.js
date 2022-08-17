import './Canvas.css'
import {Lib} from "../../Material/PrototypeLib";
import React from "react";
import InstanceFactory from "../../Core/InstanceFactory";

export default function Canvas(props) {
    let ctx = props.content[0].render(props.manager);
    return (
        <div
            className={'canvas'}
            style={{
                width: `${props.width}px`,
                height: `${props.height}px`,
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
                if(props.manager.existInstance(instance)){
                    InstanceFactory.Manager.modifyInstanceStyle(instance, 'position', 'absolute');
                    InstanceFactory.Manager.modifyInstanceStyle(instance, 'left', `${event.nativeEvent.offsetX + 1}px`);
                    InstanceFactory.Manager.modifyInstanceStyle(instance, 'top', `${event.nativeEvent.offsetY + 1}px`);
                    InstanceFactory.Manager.moveInstance(instance,this);
                }else{
                    props.manager.addInstance(instance,props.manager.instances[0]);
                    props.manager.modifyInstanceStyle(instance,'position','absolute',false);
                    props.manager.modifyInstanceStyle(instance,'left',`${event.nativeEvent.offsetX+1}px`,false);
                    props.manager.modifyInstanceStyle(instance,'top',`${event.nativeEvent.offsetY+1}px`,false);
                }


            }}
            onChange={()=>console.log('change')}
        >

            {ctx}
        </div>
        // props.positionX
    )

}

Canvas.defaultProps = {
    content: null,
    scaleRate: 50,
    width: 1920,
    height: 1080,
    overflow:'hidden'
}



