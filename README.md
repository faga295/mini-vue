# @faga/packtool
A pack tool integrating webpack and rollup

# start
**install package**
`npm install @faga/packtool`

**npm scripts**

you can add `npm scripts` or install it globally 

edit your `package.json`

```
"scripts": {
    "build": "pack"
 },
```

**configure file**

append `packTool.config.js` in your root directory like `webpack.config.js`

```
// the simplest configure file
module.exports = {
    entry:['./src/entry1.js'],
}
```

you can append `plugin` or `loader` in `packTool.config.js`,like this:

```
{
    entry:['./src/entry1.ts'],
    plugins:[plugin1],
    module:{
        rules:[
            {
                test:/\.js$/g,
                include:[loader1]
            }
        ]
    }
}
```

## example

```
/src/entry
import {a} from './module/module1.js'
function sum(b){
    return a+b
}
```

```
/src/module/module1.js
export const a = 1;
```

run `npm run build`

you will get `dist/output[entry1].js`
