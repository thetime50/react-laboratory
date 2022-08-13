import React from 'react';
import reactIconImg from 'Assets/images/react-icon.svg';

console.log('reactIconImg :>>', reactIconImg);

interface IPprops {
  name: string;
  age: number;
}

// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v43.0.2/docs/rules/prevent-abbreviations.md
function App(props: IPprops) {
  // 为了让模板代码简介 强制使用结构赋值
  // https://stackoverflow.com/questions/55273742/why-do-i-get-must-use-destructuring-state-assignment
  const { name, age } = props;
  return (
    <>
      <div className="App">Hello World</div>
      <i className="iconfont iconf-aixin" />
      <span>{`Hello! I'm ${name}, ${age} years old.`}</span>
      <div className="img">
        <img src={reactIconImg} alt="" />
        {/* <img src="./assets/images/react-icon.svg" alt="" /> */}
      </div>
    </>
  );
}

export default App;
