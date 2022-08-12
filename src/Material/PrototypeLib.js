import Prototype from "./Protoype";

export const Lib = {
    div:new Prototype(
            <div></div>,
            {
                className:"div-class",
                children:["Block"]
            },
            {
                width:'100px',
                height:'100px'
            }
        ),
    button:new Prototype(
            <button></button>,
            {
                onClick:'',
                children:["Button"]
            },
            {

            }
        ),
    a:new Prototype(
                <a></a>,
                {
                    href:'#',
                    alt:'链接',
                    children:["我是你爹"]
                },
                {

                }
            ),
    img:new Prototype(
            <img/>,
            {
                src:'',
                alt:''
            },
            {

            }
        ),
    span:new Prototype(
        <span></span>
    ),
    input:new Prototype(
        <input/>
    ),
    ul:new Prototype(
        <ul></ul>
    ),
    li:new Prototype(
        <li></li>
    ),
    nav:new Prototype(
        <nav></nav>
    ),
    header:new Prototype(
        <header></header>
    ),
    footer:new Prototype(
        <footer></footer>
    )

}
