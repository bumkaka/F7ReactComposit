# Start

- create index.js
- put in
```javascript
var   App = new F7ReactComposite({});
App.set({
    ajax: {
        baseURL: 'http://alerts.dev.rexsoftproduction.com/',
        timeout: 4000,
    },
    notify:{
        timeout: 3000
    },
    components: Components,
});
App.initialize();
```
`Components` - object (list) of ReactJS components, needs to parse pages.
```
Components = {
    Form: Form,
    ...
}
```


# USE

App.pageShow - open page by `name`
```javascript
App.pageShow({
    name: 'index',
    reload: true, //replace current page, back button will not work,  true - default
    animatePages: false //show new page with animation, false - defaul
});
```


# Events

```javascript
App.on('pageShow',function( pageName ){
    if (pageName != 'login' && !user.id ) {
        App.pageShow({
            name: 'login',
            reload: false, //replace
            animatePages: false //without animation
        });
    }
});
```
```javascript
App.on('pageShow.dashboard',function( pageName ){
    Orders.fetch();
});
```

