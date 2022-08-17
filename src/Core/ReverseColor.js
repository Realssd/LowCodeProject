import rgba from "color-rgba";

export default function reverseColor(color) {
    let [r, g, b, ] = rgba(color);
    //console.log("convert",color,rgba(color),`rgba(${(r+128)%255},${(g+128)%255},${(b+128)%255},${255})`)
    r=(r===127?0:r);
    g=(g===127?0:g);
    b=(b===127?0:b);
    return `rgba(${255 - r},${255 - g},${255 - b},${255})`
}
