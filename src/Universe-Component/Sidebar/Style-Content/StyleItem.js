import './StyleItem.css'

export default function StyleItem(props){
    return(
        <div className={'style-item'}>
            <div className={'style-info'}>
                <span className={'style-title'}>{props.styleName+':'}</span>
                <input
                    className={'style-input'} type={'text'}
                    value={props.value}
                    onChange={(event)=>props.value=event.target.value}
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
            </div>
            <div className={'remove-style'} onClick={(event)=>{
                props.manager.removeInstanceStyle(props.instance,props.styleName)
            }}>-</div>
        </div>
    );
}

StyleItem.defaultProps = {
    instance:null,
    styleName:'key',
    value:'value',
    manager: null
}
