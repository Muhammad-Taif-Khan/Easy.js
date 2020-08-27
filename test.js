Ez.setDefaultStyle();

Ez.grab('body').insert(
    Ez.newNode('div',{},Ez.createMoreNodes('div',3,['thsi','sdfsdf','last one child']))
);

Ez.grab('body').insert(
    Ez.newNode('div')
);

let elm = Ez.grab('div').style('hello-world');
