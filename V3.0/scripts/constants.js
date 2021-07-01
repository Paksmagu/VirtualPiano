class Constants {
    constructor() {
        throw "Constants is not meant to be instantiated.";
    }

    static isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (Constants.isMobile.Android() || Constants.isMobile.BlackBerry()
                || Constants.isMobile.iOS() || Constants.isMobile.Opera()
                || Constants.isMobile.Windows());
        }
    };

    static mouseEvent = {pressed: "Pressed", hover: "Hover", released: "Released"}

    static eventTypes = {
        resize: "resize",
        keyDown: "keydown",
        keyUp: "keyup",
        submit: "submit",
        click: "click",
        mobile: {
            pressEvent: "touchstart",
            releaseEvent: "touchend",
            moveEvent: "touchmove",
            cancelEvent: "touchcancel"
        },
        computer: {
            pressEvent: "mousedown",
            releaseEvent: "mouseup",
            moveEvent: "mousemove",
            cancelEvent: "mouseleave"
        }
    }

    static round(value, decimals) {
        return Number(Math.round(value + "e" + decimals) + 'e-' + decimals);
    }
}