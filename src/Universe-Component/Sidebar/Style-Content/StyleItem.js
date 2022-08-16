import './StyleItem.css'

export default function StyleItem(props){
    return(
        <div className={'style-item'}>
            <span className={'style-title'}>{props.styleName+':'}</span>
            <input
                className={'style-input'} type={'text'}
                defaultValue={props.value}
                onBlur={(event)=>{
                    if(event.target.value==='undefined'){
                        props.manager.removeInstanceStyle(props.instance,props.styleName);
                        return;
                    }
                    props.manager.modifyInstanceStyle(
                        props.instance,
                        props.styleName,
                        event.target.value
                    );
                }}
            />
            <span style={{display:'none'}}>{props.instance.id}</span>
        </div>
    );
}

StyleItem.defaultProps = {
    instance:null,
    styleName:'key',
    value:'value',
    manager: null
}
