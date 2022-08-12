import './CompContent.css'
import PrototypeInstance from "../../../Material/PrototypeInstance";
import ComponentManager from "../../../Core/ComponentManager";
export default function CompContent(props) {
    return (
        <ul className={'comp-list'}>
            {props.content.map((item)=>{
                return (
                    <li key={item[0]} className={'comp-item'}
                        onClick={()=>{
                            let newNode = PrototypeInstance.createInstanceof(item[1]);
                            props.manager.addInstance(newNode,null)
                        }}>
                        {item[0]}
                    </li>
                );
            })}
        </ul>
    );
}

CompContent.defaultProps = {
    content:[]
}
