import './AttrItem.css'
import {Lib} from "../../../Material/PrototypeLib";

export default function AttrItem(props){

    return(
      <div className={'attr-item'}>
          <span className={'attr-title'}>{props.attrName+':'}</span>
          <input
              className={'attr-input'} type={'text'}
              defaultValue={props.value}
              onBlur={(event)=>{
                  if(event.target.value==='undefined'){
                      props.manager.removeInstanceAttr(props.instance,props.attrName)
                  }else{
                      props.manager.modifyInstanceAttr(
                          props.instance,
                          props.attrName,
                          event.target.value
                      );
                      console.log(Lib.div.defaultChildren)
                  }
              }}
          />
      </div>
    );
}

AttrItem.defaultProps = {
    instance:null,
    attrName:'key',
    value:'value',
    manager: null
}
