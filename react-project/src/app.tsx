import React, { Suspense, useState } from 'react';
import reactIconImg from 'Assets/images/react-icon.svg';
import style from './app.m.scss';

const CompOne = React.lazy(() => import('Components/CompOne'));
const CompTwo = React.lazy(() => import('Components/CompTwo'));

console.log('reactIconImg :>>', reactIconImg);

interface IPprops {
  name: string;
  age: number;
}

// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v43.0.2/docs/rules/prevent-abbreviations.md
function App(props: IPprops) {
  // 为了让模板代码简介 强制使用结构赋值
  // https://stackoverflow.com/questions/55273742/why-do-i-get-must-use-destructuring-state-assignment
  const { name, age/* , test */ } = props;
  const [showTwo, setShowTwo] = useState<boolean>(false);
  return (
    <>
      <div className="App">Hello World</div>
      <i className="iconfont iconf-aixin" />
      <span>{`Hello! I'm ${name}, ${age} years old.`}</span>
      <Suspense fallback={<div>Loading...</div>}>
        <CompOne a={1} b={2} />
        {showTwo && <CompTwo a={3} b={4} />}
        <button type="button" onClick={() => setShowTwo(true)}>
          显示Two
        </button>
      </Suspense>
      <div className={`img ${style.img}`}>
        <img src={reactIconImg} alt="" />
        {/* <img src="./assets/images/react-icon.svg" alt="" /> */}
      </div>
    </>
  );
}

export default App;
