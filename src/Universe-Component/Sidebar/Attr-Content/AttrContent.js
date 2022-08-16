import './AttrContent.css'
import AttrItem from "./AttrItem";
import AddAttr from "./AddAttr"
export default function AttrContent(props) {

    return (
        <div className={'attr-content'}>
            {props.selectedItem===null?null:props.selectedItem.getAttributes().map((entry=>{
                return (
                    <AttrItem
                        key={props.selectedItem.getId()+entry[0]}
                        instance={props.selectedItem}
                        attrName={entry[0]} value={entry[1]}
                        manager={props.manager}
                    />
                );
            }))}
            {props.selectedItem===null?null:<AddAttr manager={props.manager} instance={props.selectedItem}/>}
        </div>
    );
}

AttrContent.defaultProps = {
    manager: null,
    selectedItem: null
}
