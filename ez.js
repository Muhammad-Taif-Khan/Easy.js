//define variables
let toRGB,
    random,
    mean,
    median,
    mode,
    stdDeviation,
    variance,
    percentile,
    getDataSetRand,
    randomRange,
    replaceStringWith;
//initialize the library
const Ez = (function () {

    //objects

    let Dom = {};
    //add properties and methods to the obj
    /**
     * Function to create new Element;
     * @param {string} type type or name of the element you want to create.
     * @param {object} properties attributes you want to add to.
     * @param {Array[]} children children elements you want to append.
     */
    Dom.newNode = function (type, properties, children) {
        let node = document.createElement(type);
        if (properties) {
            Object.assign(node, properties);
        }
        if (children && children.length > 0) {
            children.forEach(child => {
                if (typeof child !== "string") {
                    node.appendChild(child);
                } else {
                    node.appendChild(document.createTextNode(child));
                }
            });
        }
        return node;
    }

    //select dom elements
    /**
     * 
     * @param {string} type The name, id or classname of the element you want to select. 
     * @param {*} all This indicates if you want to select a list of nodes.
     * @param {*} location The parent node of the element you want to select. By default it is 'document'.
     */
    Dom.select = function (type, all = false, location) {
        let node;
        if (location) {
            if (all === true) {
                node = location.querySelectorAll(type);
            } else if (all !== true) {
                node = location.querySelector(type);
            }

        } else if (!location) {
            if (all === true) {
                node = document.querySelectorAll(type);
            } else if (all !== true) {
                node = document.querySelector(type);
            }
        }
        return node;
    }
    Dom.setTitle = function (title) {
        Dom.select('title').innerText = title;
    }
    Dom.setDefaultStyle = function () {
        let style = Dom.newNode('style', {}, [`html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, font, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td {margin:0; padding:0; border:0; outline:0; font-size:100%; vertical-align:baseline; background:transparent;} body {line-height: 1;}ol, ul{list-style:none;} blockquote, q{quotes:none;} blockquote:before, blockquote:after, q:before, q:after{content:'';content:none;} :focus{outline:0;} ins{text-decoration:none;} del{text-decoration:line-through;} table{border-collapse:collapse; border-spacing:0;}`,
        ]);
        Dom.select('head').appendChild(style);
        return;
    }

    Dom.createMoreNodes = (type='div',options ={quantity:1,data:[]})=>{
        let nodes = [],
            i;
        for(i =0; i< options.quantity;i++){
           let elm = document.createElement(type);
           if(options.data.length > 0){
                if(options.quantity === 1 || options.quantity !== options.data.length){
                    elm.innerText = options.data[0];
                }else{
                    elm.innerText = options.data[i];
                }
           }
            nodes.push(elm);
        }
        return nodes;
    }
//get html element's inner content
Dom.getContent = (node)=>{
    if(node.innerText && node.innerText !== ''){
        return node.innerText;
    }
    else if (node.value && node.value !== ''){
        return node.value;
    }
    return;
}
    //sort html content

    Dom.sortHTMLContent = function(NodeList=[],options = {
        dataType:'string',
        order:'a'
    },){
        let data = [],
            sortedData;
      
        if(options.dataType.toUpperCase() === 'STRING'){
            NodeList.forEach(node =>{
                data.push(Dom.getContent(node));
            });
            if(options.order.toUpperCase() === 'A'){
                sortedData = data.sort();
            }
            else if(options.order.toUpperCase() === 'D'){
                sortedData = data.sort((a,b)=>{
                    if(a > b) return -1;
                    if(a<b) return 1;
                    else return 0;
                });
            }
        }
        else if(options.dataType.toUpperCase() === 'NUMBER'){
            NodeList.forEach(node =>{
                data.push(Number(Dom.getContent(node)));
            });
            if(options.order.toUpperCase() === 'A'){
                sortedData = data.sort((a,b)=>{
                    return a-b;
                });
            }
            else if(options.order.toUpperCase() === 'D'){
                sortedData = data.sort((a,b)=>{
                    return b-a;
                });
            }
        }
        NodeList.forEach((node,i) =>{
            NodeList[i].innerText = data[i];
        });
        return;
    }
    // functions
    mean = function (array) {
        let mean = 0;
        array.forEach(elm => {
            mean += elm;
        });
        return mean / array.length;
    }

    median = function (array) {
        let midIdx = Math.floor(array.length / 2);
        let sortedArr = array.sort((a, b) => {
            return a - b;
        });
        if (array.length % 2 === 0) {
            return (sortedArr[midIdx] + sortedArr[midIdx - 1]) / 2;
        }
        return sortedArr[midIdx];
    }
    /**
     * This function return maximum repeated number in array.
     * @returns Array[ ]
     */
    mode = function (array = []) {
        let modeObj = {},
            maxFrequency = 0,
            modes = [];
        array.forEach(num => {
            if (!modeObj[num]) modeObj[num] = 0;
            modeObj[num]++;
        });
        for (let num in modeObj) {
            if (modeObj[num] > maxFrequency) {
                modes = [num];
                maxFrequency = modeObj[num];
            } else if (modeObj[num] === maxFrequency) modes.push(num);
            if (modes.length === Object.keys(modeObj).length) modes = ["none"];
        }
        return modes;
    }

    stdDeviation = function (array) {
        let Mean = mean(array);
        let squared = [];
        array.forEach(elm => {
            let sub = elm - Mean;
            squared.push(sub * sub);
        });
        return Math.sqrt(mean(squared));
    }
    /**
     * This function returns the varaince of an array.
     */
    variance = function (array = []) {
        if (Array.isArray(array)) {
            return stdDeviation(array) * stdDeviation(array);
        }
        return;
    }


    /**
     * This function returns the percentile of an array.
     * @param {Array[]} array array in which to find the percentile.
     * @param {number} percent number that represents the percent.
     */
    percentile = function (array, percent) {
        let percentileIdx = Math.floor((percent / 100) * array.length),
            sortedArr = array.sort((a, b) => {
                return a - b;
            });
        return sortedArr[percentileIdx];
    }

    /**
     * This function returns a random number or an element at random index in array.
     * @param {number|Array[]} data Number or array.
     * @returns Array's element or number.
     */
    random = function (data) {
        if (typeof data === "number") {
            return Math.floor(Math.random() * data);
        } else if (Array.isArray(data)) {
            return data[Math.floor(Math.random() * data.length)];
        }
        return;
    }
    /**
     * This function returns an array of random numbers from min to max of given length.
     * @param {number} min The minumum number of an array.
     * @param {number} max The maximum number of an array. 
     * @param {number} length The number of elements of an array.
     */
    getDataSetRand = function (min, max, length) {
        let dataSet = [],
            i;
        for (i = 0; i < length; i++) {
            dataSet.push(randomRange(min, max));
        }
        return dataSet;
    }
    /**
     * This function returns a random number b/w min-max.
     */
    randomRange = function (min, max) {
        return Math.random() * (max - min) + min;
    }

    //final library
    let mainLibrary = {};
    //add properties and methods to the final library...
    /**
     * This function will create a new node.
     * @param {string} type name of the node you want to create.
     * @param {{}} properties attributes you want to add to the node as 
     * pair of name and value, like: {
     * name: value
     * }
     * @param {Array[]} children children you want to append to the node.
     * @returns  returns html element.
     */

    mainLibrary.newNode = (type, properties, children) => {
        return Dom.newNode(type, properties, children);
    };

    /**
     * This function select the html element using css selector syntax. 
     * @param {string} type The name,class or id  of an element.
     * @param {Node} location The parent Node of The element. By default it is document.
     * @param {boolean} all if it is a list of element then set all to true else to false. By default it is set to false.
     */
    mainLibrary.grab = (type, location = document, all = false) => {
        let node = Dom.select(type, all, location);
        if (!node) return;
        //nodeProps___ object of custom properties of the node.
        let nodeProps = {};
        nodeProps.isEmpty = () => {
            if (node.value && node.value === '') {
                return true;
            } else if (node.value && node.value !== '') {
                return false;
            } else if (node.innerText === '') {
                return true;
            }
            return false;
        }
        nodeProps.hide = function () {
            node.style.display = 'none';
        }
        /**
         * 
         * @param {number} index hide the element at index in the node list
         */
        nodeProps.hideAll = function (index = undefined) {
            if (node.length) {
                if (index !== undefined && index !== null) {
                    node[index].style.display = 'none';
                    return;
                }
                node.forEach(nd => {
                    nd.style.display = 'none';
                });
            }
        }
        /**
         * this function shows the hidden html element by css.
         * @param {string} type the css display type.
         */
        nodeProps.show = function (type = 'initial') {
            if (typeof type === "string") {
                node.style.display = type;
            }
        }
        nodeProps.showAll = function (type = 'initial', index = undefined) {
            if (node.length && typeof type === "string") {
                if (index !== undefined && typeof index === 'number') {
                    node[index].style.display = type;
                    return;
                }
                node.forEach(nd => {
                    nd.style.display = type;
                });
            }
            return;
        }
        /**
         * this funtction delete the selected element.
         */
        nodeProps.delete = function () {
            node.parentNode.removeChild(node);
            return;
        }
        nodeProps.deleteAll = function (index = undefined) {
            if (node.length) {
                if (typeof index === 'number') {
                    node[index].parentNode.removeChild(node[index]);
                    return;
                }
                node.forEach(nd => {
                    nd.parentNode.removeChild(nd);
                });
            }
            return;
        }
        /**
         * Set `Attribute` or add new `Attribute` to an element. if value parameter is not defined then the function will return attribute's value of name defined in the first parameter.
         * @param {string} name name of the attribute.
         * @param {string} value value of the attribute.
         */
        nodeProps.attr = function (name = undefined, value = undefined) {
            if(node.length){
                node.forEach(nd =>{
                    if (value === undefined && node.hasAttribute(name)) {
                        return nd.getAttribute(name);
                    }
                    else if(name !== undefined && value !== undefined) {
                        nd.setAttribute(name, value);
                    }
                });
            }
            else{
                
            if (value === undefined && node.hasAttribute(name)) {
                return node.getAttribute(name);
            }
            else if(name !== undefined && value !== undefined) {
                node.setAttribute(name, value);
            }
        }
        }
        /**
         * 
         * @param {string} event 
         * @param {function} callback 
         * @param {boolean} boolean 
         */
        nodeProps.on = function (event, callback, boolean = false) {
            node.attachEvent ? node.attachEvent(event, callback, boolean) : node.addEventListener(event, callback, boolean);
        }

        nodeProps.onAll = function (event, callback, boolean = false) {
            if (node.length) {
                node.forEach(nd => {
                    if (nd.addEventListener) {
                        nd.addEventListener(event, callback, boolean);
                    } else if (nd.attachEvent) {
                        nd.attachEvent(event, callback, boolean);
                    }
                });
            } else {
                console.error('onAll() method does not work on a single node. it noly works with nodelist!');
            }
        }
        /**
         * This function insert Node inside another Node;
         * @param {Node} Element Html Element or Node to be inserted.
         * @param {boolean} removeInsideData remove the data of target ndoe.
         */
        nodeProps.insert = (Element,removeInsideData = false)=>{
         if(removeInsideData){
             node.innerText = '';
             node.appendChild(Element);
             return;
         }
         node.appendChild(Element);
        };

        nodeProps.addClass= (name)=>{
            if(node.length && name){
                node.forEach(nd =>{
                    nd.classList.add(name);
                });
                return;
            }
           if(name) node.classList.add(name);
        }

        nodeProps.removeClass=(name="")=>{
            let presentClass = node.className;
                presentClass = presentClass.split(' ');
            presentClass.forEach(cls =>{
                if(cls === name){
                    presentClass.splice(presentClass.indexOf(name),1);
                }
            });

            node.className = presentClass.join('');
            return;
        }

        nodeProps.toggleClass = (name="",boolean)=>{
            if(name !== undefined && name.length > 0){
                if(node.length){
                    node.forEach(nd =>{
                        nd.classList.toggle(name,boolean);
                    });
                    return;
                }
                node.classList.toggle(name,boolean);
            }
            return;
        }

        nodeProps.style = (cssPropertyName, cssPropertyValue)=>{
            cssPropertyName = cssPropertyName.trim();
            cssPropertyValue = cssPropertyValue.trim();
            if(cssPropertyName.length > 0){
                cssPropertyName = cssPropertyName.replace(/'-'/g,'');
            }
            console.log(cssPropertyName);
        }
        
        Object.assign(node, nodeProps);
        return node;
    };

    let _multimedia = {};

    _multimedia.audio = (src, volume) => {
        let audio = new Audio(src);
        audio.volume = volume;
        audio.play();
        return audio;
    }

    _multimedia.img = (src, width, height) => {
        let analyze = src.split('.');
        let ext = analyze[analyze.length - 1].toUpperCase();
        if (ext === "JPEG" || ext === "JPG" || ext === "PNG" || ext === "GIF") {
            let img = new Image(width, height);
            img.src = src;
            img.onerror = function () {
                console.error('Error occured when loading the img. It may be you typed img source that not found on your pc.');
                return undefined;
            }
            return img;
        };
        console.error('You typed invalid image extension!')
        return undefined;
    }

    Object.assign(mainLibrary,_multimedia);

    mainLibrary.setDefaultStyle = function () {
        Dom.setDefaultStyle();
    }
    mainLibrary.setTitle = (title) => {
        if (typeof title === "string") {
            Dom.setTitle(title);
            return;
        }
        return;
    }
    /**
     * This function saves the html file.
     * @param {string} fileName String that will be used as filename. 
     */

    mainLibrary.saveAsHTMLFile = (fileName)=>{
        let data = Dom.select('html').outerHTML;
        let blobFile = new Blob([data],{type:'text/plain'});
        let a = Dom.newNode('a',{href:window.webkitURL.createObjectURL(blobFile),download:fileName+'.html'});
        
        document.body.appendChild(a);
        a.click();
        a.parentNode.removeChild(a);
    }
    
//check if the url is valid
mainLibrary.isValidURL = function(url){
     let regex =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
     if(regex.test(url)) return true;
    return false;
}
mainLibrary.getContent = function(node){
    return Dom.getContent(node);
}

mainLibrary.createMoreNodes = function(type,quantity=1,data=[]){
    return Dom.createMoreNodes(type,{
        quantity:quantity,
        data:data
    });
}

mainLibrary.sortHTMLContent = function (NodeList=[],options={dataType:'string',order:'a'}) {
    Dom.sortHTMLContent(NodeList,options);
}

    return mainLibrary;
})();
