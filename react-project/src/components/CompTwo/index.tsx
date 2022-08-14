import React, { useState } from 'react';
import './index.scss';

// const mathImport = import('Utils/math');
import { add } from 'Utils/math';

interface IProperties {
    a: number
    b: number
}

function ComputedOne(props: IProperties) {
  const { a, b } = props;
  const [sum, setSum] = useState(0);
  (async function init() {
    // const math = await mathImport;
    // setSum(math.add(a, b));
    setSum(add(a, b));
  }());

  return <p className="computed-two">{`Hi, I'm computed one, my sum is ${sum}.`}</p>;
}

export default ComputedOne;
