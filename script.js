window.pageState = {
};
var query = pageState.query = '';
pageState.casedQuery = '';
pageState.userTestGroups = [];
var EndroitPub = "";
var adSuppressed = false;
var isApp = !!((/\b(app|android)[\-\.]/).test(document.domain) || document.cookie.search("app=") >= 0);

function queryIsMobilePhone() {
    return typeof window.matchMedia != "undefined" && window.matchMedia("only screen and (max-device-width : 650px)").matches
}

function is_touch_device() {
    return "ontouchstart" in window || !!(navigator.msMaxTouchPoints)
}
var isMobilePhone = queryIsMobilePhone();
var isMobilePhoneOrTablet = isApp || isMobilePhone || (typeof window.matchMedia != "undefined" && window.matchMedia("only screen and (max-device-width : 799px)").matches && is_touch_device());
var isMobileNarrowDevice = typeof window.matchMedia != "undefined" && window.matchMedia("only screen and (max-device-width : 767px)").matches;
var isIPhone = typeof navigator.userAgent != "undefined" && !!navigator.userAgent.match(/[\(\/](iPhone|iPod)/);
var isIPad = typeof navigator.userAgent != "undefined" && !!navigator.userAgent.match(/[\(\/](iPad)/);
var isAndroid = typeof navigator.userAgent != "undefined" && navigator.userAgent.indexOf("Android") != -1;
var isMobileLayout = isApp || isMobilePhone;


function correctEndroitPub(b) {
    if (isMobileLayout) {
        return ""
    }
    var a = document.documentElement.clientWidth;
    var c = document.documentElement.clientHeight;
    if (b == "topAndHalfPage") {
        b = "topAndHalfpage"
    }
    if (b == "Default") {
        if (a < 1580) {
            b = "topAndRect"
        }
    }
    if (b == "topAndRect" || b == "topAndHalfpage") {
        if (c < 870) {
            b = "Left"
        } else {
            if (a <= 895) {
                b = "topAndRight"
            }
        }
    }
    if (b == "topAndRect") {
        b = "Left"
    }
    if (b == "Left") {
        if (a < 1200) {
            b = "Collateral"
        }
    }
    if (isMobileNarrowDevice && b == "topAndRight") {
        b = "top"
    }
    return b
}

window.UI_Tools = {
    createTemplateInstance: function(templateQuery, targetQuery) {
        var backup = window.$$initInstance;
        var template = document.querySelector(templateQuery);
        if (template.content) {
            var nodeContainer = document.importNode(template.content, true);
            var node = nodeContainer.children[0];
            window.$$initInstance = function(callback) {
                callback.call(node, node)
            };
            document.querySelector(targetQuery).appendChild(nodeContainer);
            window.$$initInstance = backup
        } else {
            var prototype = template.firstChild;
            while (prototype.nodeType !== 1) {
                prototype = prototype.nextSibling
            }
            var node = prototype.cloneNode(true);
            var scriptTag = node.querySelector("script");
            scriptTag && scriptTag.parentNode.removeChild(scriptTag);
            document.querySelector(targetQuery).appendChild(node);
            if (scriptTag) {
                window.$$initInstance = function(callback) {
                    callback.call(node, node)
                };
                eval(scriptTag.textContent);
                window.$$initInstance = backup
            }
        }
        return node
    },
    toggleClass: function(c, a) {
        var b = new RegExp("\\b" + a + "\\b");
        typeof c === "string" && (c = document.querySelector(c));
        c.className = b.test(c.className) ? c.className.replace(b, "").trim() : c.className.trim() + " " + a
    }
};
