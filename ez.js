//define variables
let toRGB,
    random,
    mean,
    median,
    factorial,
    mode,
    stdDeviation,
    variance,
    percentile,
    getDataSetRand,
    randomRange,
    abs,
    sigmoid;
//initialize the library
/**
* `MIT License
* Copyright (c) 2020 Muhammad Taif Khan`
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
const Ez = (
    () =>{
    'use strict'
    //objects

    let Dom = {};
    //add properties and methods to the obj
    
    Dom.newNode = function (type, properties, children) {
        let node = document.createElement(type);
        if (properties) {
            Object.assign(node, properties);
        }
        if (children && children.length > 0) {
            let i;
            for (i = 0; i < children.length; i++) {
                if (typeof children[i] !== 'string') {
                    node.appendChild(children[i]);
                } else {
                    node.appendChild(document.createTextNode(children[i]));
                }
            }

        }
        return node;
    }

    //select dom elements
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
        let styleSheet = document.querySelector('style');
        let style = `html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, font, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td {margin:0; padding:0; border:0; outline:0;vertical-align:baseline; background:transparent;} body {line-height: 1;}ol, ul{list-style:none;} blockquote, q{quotes:none;} blockquote:before, blockquote:after, q:before, q:after{content:'';content:none;} :focus{outline:0;} ins{text-decoration:none;}del{text-decoration:line-through;}table{border-collapse:collapse; border-spacing:0;}`;
        if (styleSheet) {
            styleSheet.innerText += style;
        } else {
            let newStyleSheet = Dom.newNode('style', {}, [style]);
            Dom.select('head').appendChild(newStyleSheet);
        }
    }

    Dom.createMoreNodes = (type = 'div', options = {
        quantity: 1,
        data: []
    }) => {
        let nodes = [],
            i;
        for (i = 0; i < options.quantity; i++) {
            let elm = document.createElement(type);
            if (options.data.length > 0) {
                if (options.quantity === 1 || options.quantity !== options.data.length) {
                    elm.innerText = options.data[0];
                } else {
                    elm.innerText = options.data[i];
                }
            }
            nodes.push(elm);
        }
        return nodes;
    }
    //get html element's inner content
    Dom.getContent = (node) => {
        if (node.innerText && node.innerText !== '') {
            return node.innerText;
        } else if (node.value && node.value !== '') {
            return node.value;
        }
        return;
    }
    //sort html content

    Dom.sortHTMLContent = function (NodeList = [], options = {
        dataType: 'string',
        order: 'a'
    }, ) {
        let data = [],
            sortedData;

        if (options.dataType.toUpperCase() === 'STRING') {
            for (let i = 0; i < NodeList.length; i++) {
                data.push(Dom.getContent(NodeList[i]));
            }
            if (options.order.toUpperCase() === 'A') {
                sortedData = data.sort();
            } else if (options.order.toUpperCase() === 'D') {
                sortedData = data.sort((a, b) => {
                    if (a > b) return -1;
                    if (a < b) return 1;
                    else return 0;
                });
            }
        } else if (options.dataType.toUpperCase() === 'NUMBER') {
            for (let i = 0; i < NodeList.length; i++) {
                data.push(Number(Dom.getContent(NodeList[i])));
            }
            if (options.order.toUpperCase() === 'A') {
                sortedData = data.sort((a, b) => {
                    return a - b;
                });
            } else if (options.order.toUpperCase() === 'D') {
                sortedData = data.sort((a, b) => {
                    return b - a;
                });
            }
        }
        for (let i = 0; i < NodeList.length; i++) {
            NodeList[i].innerText = data[i];
        }
    }
    //functions -> Maths
    abs = (x)=>{
        return Math.abs(x);
    }
    /**
     * The `sigmoid` function returns the sigmoid of a number `x` given.
     * @param {Number} x A number.
     */
    sigmoid = function (x) {
        return 1 / (1 + Math.exp(-x));
    }


    // functions

    mean = function (array) {
        let mean = 0;
        for (let i = 0; i < array.length; i++) {

            mean += array[i];
        }
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
    factorial = function (num = 0) {
        if (typeof num !== 'number') {
            throw new Error('You must enter a number to find the factorial of!');
        }
        if (num === 1) {
            return num
        }
        if (num === 0) {
            return 1;
        }
        if (num < 0) {
            throw new Error('Please enter a positive number for the factorial!');
        }
        return num * factorial(num - 1);
    }

    /**
     * This function return maximum repeated number in array.
     * @returns `Array[ Number ]`
     */
    mode = function (array = []) {
        let modeObj = {},
            maxFrequency = 0,
            modes = [];
        for (let i = 0; i < array.length; i++) {
            if (!modeObj[array[i]]) modeObj[array[i]] = 0;
            modeObj[array[i]]++;
        }
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
        let Mean = mean(array),
            squared = [];
        for (let i = 0; i < array.length; i++) {
            let sub = array[i] - Mean;
            squared.push(sub * sub);

        }
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
                for (let i = 0; i < node.length; i++) {
                    node[i].style.display = 'none';
                }
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
                for (let i = 0; i < node.length; i++) {
                    node[i].style.display = type;
                }
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
                for (let i = 0; i < node.length; i++) {
                    node[i].parentNode.removeChild(node[i]);
                }
            }
            return;
        }
        /**
         * Set `Attribute` or add new `Attribute` to an element. if value parameter is not defined then the function will return attribute's value of name defined in the first parameter.
         * @param {string} name name of the attribute.
         * @param {string} value value of the attribute.
         */
        nodeProps.attr = function (name = undefined, value = undefined) {
            if (node.length) {
                for (let i = 0; i < node.length; i++) {
                    if (value === undefined && node[i].hasAttribute(name)) {
                        return node[i].getAttribute(name);
                    } else if (name !== undefined && value !== undefined) {
                        node[i].setAttribute(name, value);
                    }
                }
            } else {
                if (value === undefined && node.hasAttribute(name)) {
                    return node.getAttribute(name);
                } else if (name !== undefined && value !== undefined) {
                    node.setAttribute(name, value);
                }
            }
            return node;
        }

        nodeProps.on = function (event, callback, boolean = false) {
            node.attachEvent ? node.attachEvent(event, callback, boolean) : node.addEventListener(event, callback, boolean);
        }

        nodeProps.onAll = function (event, callback, boolean = false) {
            if (node.length) {
                for (let i = 0; i < node.length; i++) {
                    if (node[i].addEventListener) {
                        node[i].addEventListener(event, callback, boolean);
                    } else if (node[i].attachEvent) {
                        node[i].attachEvent(event, callback, boolean);
                    }
                }
            } else {
                console.error('onAll() method does not work on a single node. it noly works with nodelist!');
            }
        }
        /**
         * This function insert Node inside another Node;
         * @param {Node} Element Html Element or Node to be inserted.
         * @param {boolean} removeInsideData remove the data of target ndoe.
         */
        nodeProps.insert = (Elements, removeInsideData = false) => {
            if (Elements.length) {
                for (let i = 0; i < Elements.length; i++) {
                    node.appendChild(Elements[i]);
                }
            } else {
                if (removeInsideData) {
                    node.innerText = '';
                    node.appendChild(Elements);
                    return;
                }
                node.appendChild(Elements);
            }
        };

        nodeProps.hasClass = (name = '') => {
            if (typeof name !== 'string') {
                throw new Error('The class name should be string!');
            }
            if (name.length === 0) {
                throw new Error('You forgot to give the class\'' + ' name parameter to the function Node.hasClass(name)!');
            }
            name = name.trim();
            if (node.className.split(' ').includes(name)) {
                return true;
            }
            return false;
        }

        nodeProps.addClass = (name) => {
            if (node.length && name && typeof name === 'string') {
                for (let i = 0; i < node.length; i++) {
                    node[i].classList.add(name);
                }
            } else if (name && typeof name === 'string') node.classList.add(name);

            return node;
        }

        nodeProps.removeClass = (name = "") => {
            // let presentClass = node.className;
            //     presentClass = presentClass.split(' ');
            if (node.length) {
                for (let i = 0; i < node.length; i++) {
                    if (node[i].className.split(' ').includes(name)) {
                        node[i].classList.remove(name);
                    }
                }
            } else {
                if (node.className.split(' ').includes(name)) {
                    node.classList.remove(name);
                }
            }
            return node;
        }

        nodeProps.toggleClass = (name = "", boolean = true) => {
            if (name !== undefined && name.length > 0) {
                if (node.length) {
                    for (let i = 0; i < node.length; i++) {
                        node[i].classList.toggle(name, boolean);
                    }
                } else {
                    node.classList.toggle(name, boolean);
                }
            }
        }

        nodeProps.addStyle = (cssPropertyName = '', cssPropertyValue = '', refrence = node.localName) => {
            if (cssPropertyValue.length === 0 || cssPropertyName.length === 0) {
                return false;
            }
            let styleSheet = document.querySelector('style'),
                isRepeated = false;
            if (refrence.toUpperCase() === "CLASS") {
                refrence = "." + node.className.split(' ')[0];
            } else if (refrence.toUpperCase() === "ID") {
                refrence = "#" + node.id.split(' ')[0];
            }
            if (styleSheet) {
                let splited = styleSheet.innerText.split('}');
                splited.pop();
                if (styleSheet.innerText.includes(node.localName)) {
                    for (let i = 0; i < splited.length; i++) {
                        if (splited[i].includes(node.localName) && !isRepeated) {
                            isRepeated = true;
                            splited[i] += cssPropertyName + ":" + cssPropertyValue + ";";
                        }
                    }
                }
                if (!styleSheet.innerText.includes(node.localName)) {
                    let newStyle = " " + refrence + "{" + cssPropertyName + ":" + cssPropertyValue + ";";
                    splited.push(newStyle);
                }
                splited[splited.length - 1] += "}";
                styleSheet.innerText = splited.join('}');
            } else if (!styleSheet) {
                let newStyleSheet = document.createElement('style');
                let newStyle = " " + refrence + "{" + cssPropertyName + " : " + cssPropertyValue + ";}";
                newStyleSheet.innerText = newStyle;
                document.querySelector('head').appendChild(newStyleSheet);
            }
            return node;
        }
        nodeProps.getParent = ()=>{
            if(node.parentNode && !node.length){
                return node.parentNode;
            }
        }

        Object.assign(node, nodeProps);
        return node;
    };
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

    mainLibrary.saveAsHTMLFile = (fileName) => {
        if (typeof fileName !== "string") return;
        let data = Dom.select('html').outerHTML;
        let blobFile = new Blob([data], {
            type: 'text/plain'
        });
        let a = Dom.newNode('a', {
            href: window.webkitURL.createObjectURL(blobFile),
            download: fileName + '.html'
        });

        document.body.appendChild(a);
        a.click();
        a.parentNode.removeChild(a);
    }

    //check if the url is valid
    mainLibrary.isValidURL = function (url) {
        if (typeof url !== "string") return;
        let regex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regex.test(url)) return true;
        return false;
    }

    /**
     * `Ez.getContent()` returns the inner content or data of an element.
     * @param {string} node HTML element to get content of.
     */
    mainLibrary.getContent = function (node) {
        return Dom.getContent(node);
    }

    mainLibrary.createMoreNodes = function (type, quantity = 1, data = []) {
        return Dom.createMoreNodes(type, {
            quantity: quantity,
            data: data
        });
    }

    mainLibrary.sortHTMLContent = function (NodeList = [], options = {
        dataType: 'string',
        order: 'a'
    }) {
        Dom.sortHTMLContent(NodeList, options);
    }

    //---------------
    //Array's Functions...
    //---------------

    /**
     * `Ez.filter()` method filter the provided `array` for a specific condition returned by the `callback` function.
     *This method does not change the original array.
     * @param {Array} array Array to be filtered.
     * @param {Function} callback A function that check a specific condition for each of the element of an Array.
     * @returns `array`
     */
    mainLibrary.filter = (array, callback)=>{
        if(Array.isArray(array) && array !== undefined){
            let filteredArray = [];
            for(let i = 0; i< array.length; i++){
                if(callback(array[i],i,array)){
                    filteredArray.push(array[i]);
                }
            }
           return filteredArray;
        }
        console.error('In Ez.filter() method the first paramater is either undefined or not an array!');
    }


    /**
     * The `map` function call a function for each element of an array.
     * Does not change the original array.
     * @param {Array[]} array The Array to be manipulated.
     * @param {function} func The callback function to call for each Element of the Array.
     * @returns `Array[]`
     */
    mainLibrary.map = (array, func) => {
        if (!Array.isArray(array) ||array === undefined) {
            console.error('In Ez.map() method the first paramater is either undefined or not an array!');
            return;
        }
        let newArray = [];
        for(let i = 0; i< array.length;i++){
            newArray.push(array[i]);
        }
        for (let i = 0; i < newArray.length; i++) {
            newArray[i] = func(newArray[i], i, newArray);

        }
        return newArray;
    };
    /**
     * This function converts an Array to an Object.
     * @param {Array[]} array Array that will be converted to an Object.
     */
mainLibrary.toObject = (array=[])=>{
    if(!Array.isArray(array)){
        throw new Error('You must enter an Array to convert it to Object');
    }
    let obj = {};
    for (let i = 0; i < array.length; i++) {
        obj[array[i]] = array[i];
    }
    return obj;
}
    /**
     * `Ez.Easy` Object  that holds all the information about the Library.
     */
    mainLibrary.Easy = {
        name: "Easy.js|Ez.js",
        version: "20.8.01",
        creator: "Muhammad Taif Khan",
        firstLaunch: '1/8/2020',
        support: 'frontend'
    };

    return mainLibrary;
})();