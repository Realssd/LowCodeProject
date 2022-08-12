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
                backgroundColor: 'red',
                overflow:`${props.overflow}`
            }}
        >

            {props.content.render()}
        </div>
        // props.positionX
    )

}

Canvas.defaultProps = {
    content: Lib.button,
    scaleRate: 50,
    positionX: 0,
    positionY: 0,
    width: 500,
    height: 500,
    overflow:'hidden'
}



