// import React from 'react'
// import ReactDOM from 'react-dom'
// import { RuReactOptions } from '@/declare'
// class RuReact {
//     container: HTMLElement
//     constructor(options: RuReactOptions) {
//         // super(options)
//         this.container = options.container
//     }
//     // render() {
//     // return <div>name</div>
//     // }
//     // TODO: 处理jsx事件
// }
// export default RuReact
// function jsxProgram() {
//     const name: string = 'hello, world!'
//     return (<div>{name}</div>)
// }
// ReactDOM.render(jsxProgram(), document.getElementById('compileCon'))

// ReactDOM.render()
// const name: string = 'Josh Perez';
// const element = <h1>Hello, {name}</h1>;

// ReactDOM.render(<div>11111111 < /div>, document.getElementById('compileCon'))


export function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
    return key in object;
}