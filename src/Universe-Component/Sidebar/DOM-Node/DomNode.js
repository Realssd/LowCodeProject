import './DomNode.css'

export default function DomNode(props){
    if(props.proto===null){
        return null;
    }else{
        return (
          <div className={'dom-container'}>
              <li
                  className={'dom-title'}
                  onClick={()=>flip(props.layer,props.index)}
              >
                  {props.proto.getLabel()}
              </li>
              <div className={'dom-children'} id={'dom-children'+props.layer+'-'+props.index}>
                  {props.proto.getChildren().map(child => {
                      return(
                          <DomNode
                              key={(props.layer+1)+'-'+props.proto.getChildren().lastIndexOf(child)}
                              proto={child}
                              layer={props.layer+1}
                              index={props.proto.getChildren().lastIndexOf(child)}
                          />
                      )
                  })}
              </div>
          </div>
        );
    }
}

function flip(layer,index){
    let flipTarget = document.getElementById('dom-children'+layer+'-'+index);
    if(flipTarget.style.display === 'none'){
        flipTarget.style.display = 'block';
    }else{
        flipTarget.style.display = 'none';
    }

}

DomNode.defaultProps={
    proto:null,
    layer:0,
    index:0,
}
