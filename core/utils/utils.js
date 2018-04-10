export const notice = function(msg, alert = false){
    let __color_1 = 'background-image:-webkit-gradient( linear, left top, right top,font-weight:bold;-webkit-background-clip: text;font-size:5em;'
    let __color_2 = 'color:red'
    let __color_3 = 'color: green'
    console.group && console.group("需要注意的: ");
    console.log('| %c%s', (alert ? __color_3 : __color_2), msg);
    console.group && console.groupEnd();
};

export default {
    notice
};