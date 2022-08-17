import Prototype from "./Protoype";
import InstanceFactory from "../Core/InstanceFactory";

export const Lib = {
    PureText:new Prototype(
        {type:'PureText'},
        {Text:'PureText'},
        {},
        null,
        false),
    div:new Prototype(
            <div></div>,
            {
                className:"div-class",
            },
            {
                width:'100px',
                height:'100px',
                backgroundColor:'red'
            },
        [InstanceFactory.createInstanceof(new Prototype(
            {type:'PureText'},
            {Text:'Block'},
            {},
            null,
            false),)]
        ),
    button:new Prototype(
            <button></button>,
            {
                onClick:'',
            },
            {

            },
        [InstanceFactory.createInstanceof(new Prototype(
            {type:'PureText'},
            {Text:'Button'},
            {},
            null,
            false))]
        )
}

export const Root = new Prototype(
    <div></div>,
    {
        className:"div-class",
        id:'root'
    },
    {
        width:'500px',
        height:'500px'
    },
    [],
    true);
