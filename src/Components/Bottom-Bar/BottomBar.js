import './BottomBar.css'
import BottomBarItem from "../../Universe-Component/Bottombar-Item/BottomBarItem";
export default function BottomBar(props){
    return (
      <div className={'bottom-bar'}>
          {Object.entries(props).map((item)=>{
              return(
                <BottomBarItem key={item[0]} stateKey={item[0]} value={item[1]}/>
              )
          })}
      </div>
    );
}

BottomBar.defaultProps = {
    key1:'value1',
    key2:'value2',
    key3:'value3',
    key4:'value4'
}
