import './StyleContent.css'
import StyleItem from "./StyleItem";
import AddStyle from "./AddStyle";
export default function StyleContent(props){

    return (
        <div className={'style-content'}>
            {props.selectedItem===null?null:props.selectedItem.getStyles().map((entry=>{
                return (
                    <StyleItem key={props.selectedItem.getId()+entry[0]} instance={props.selectedItem} styleName={entry[0]} value={entry[1]} manager={props.manager}/>
                );
            }))}
            {props.selectedItem===null?null:<AddStyle manager={props.manager} instance={props.selectedItem}/>}
        </div>
    );
}

StyleContent.defaultProps = {
    manager: null,
    selectedItem: null
}
