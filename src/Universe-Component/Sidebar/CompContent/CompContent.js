import './CompContent.css'
import PrototypeInstance from "../../../Material/PrototypeInstance";
import InstanceFactory from "../../../Material/InstanceFactory";
import ComponentManager from "../../../Core/ComponentManager";
const img = new Image(10,10);
img.src="https://s1.ax1x.com/2022/08/15/vdNkMn.png";
export default function CompContent(props) {
    return (
        <ul className={'comp-list'}>
            {props.content.map((item)=>{
                return (
                    <div key={item[0]} className={'item-wrapper'}>
                        <li className={'comp-item'}
                            draggable={true}
                            onDragStart={(event)=>{
                                event.dataTransfer.setDragImage(img,0,0);
                                //console.log('Component Dragging');
                                props.drag.setHoldInstance(InstanceFactory.createInstanceof(item[1]));
                                props.drag.cursorShow();
                            }}
                            onDrag={(event => {
                                //console.log(event.clientX,event.clientY);
                                props.drag.updateCursor(event.clientX,event.clientY);
                            })}
                            onDragEnd={(event)=>{
                                console.log('Component Drag End')
                                props.drag.cursorHide();
                                props.drag.setHoldInstance(null);
                            }}
                        >
                            {
                                //PrototypeInstance.createInstanceof(item[1]).render()
                                item[0]
                            }

                        </li>
                        {/*<div id={"preview-"+item[0]} style={{display:"none"}}>*/}
                        {/*    {PrototypeInstance.createInstanceof(item[1]).render()}*/}
                        {/*</div>*/}
                    </div>
                );
            })}
        </ul>
    );
}

CompContent.defaultProps = {
    content:[]
}
