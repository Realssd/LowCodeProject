import './CompContent.css';
import InstanceFactory from "../../../Core/InstanceFactory";
const img = new Image(10,10);
img.src="https://s1.ax1x.com/2022/08/15/vdNkMn.png";



export default function CompContent(props) {

    return (
        <ul className={'comp-list'}>
            {props.content.map((item)=>{

                const dragstart = (event)=>{
                    event.dataTransfer.setDragImage(img,0,0);
                    //console.log('Component Dragging');
                    props.drag.setHoldInstance(InstanceFactory.createInstanceof(item[1]));
                    props.drag.cursorShow();
                };

                const drag = (event) => {
                    //console.log(event.clientX,event.clientY);
                    props.drag.updateCursor(event.clientX,event.clientY);
                };

                const dragEnd = (event)=>{
                    event.stopPropagation();
                    //console.log('Instance DragEnd');
                    InstanceFactory.DragManager.cursorHide();
                    props.drag.setHoldInstance(null);
                };

                return (
                    <div key={item[0]} className={'item-wrapper'}>
                        <li className={'comp-item'}
                            draggable={true}
                            onDragStart={dragstart}
                            onDrag={drag}
                            onDragEnd={dragEnd}
                            onTouchStart={dragstart}
                            onTouchMove={drag}
                            onTouchEnd={dragEnd}
                        >
                            {
                                //PrototypeInstance.createInstanceof(item[1]).render()
                                item[0]
                            }

                        </li>
                    </div>
                );
            })}
        </ul>
    );
}

CompContent.defaultProps = {
    content:[]
}
