import _ from 'lodash';
import './style/index.css'; // loader=> css-loader  module,  style-loader
import './style/a.scss';
import axios from 'axios';

import {d, e, f} from '@/b';

import $ from 'jquery';

function createDomElement() {
  let dom = document.createElement('div');
  dom.innerHTML = _.join(['aicoder.com', ' 好！', '线'], '');
  // dom.className = 'box';

  dom.classList.add('box');
  return dom;
}

let divDom = createDomElement();

document.body.appendChild(divDom);
console.log(12233333333334444444);

// 发送ajax请求数据
axios
  .get('/api/compmsglist')
  .then(res => console.log('res :', res));

class Demo {
  show() {
    console.log('this.Age :', this.Age);
  }

  get Age() {
    return this._age;
  }

  set Age(val) {
    this._age = val + 1;
  }
}

let d1 = new Demo();
d1.Age = 19;
d1.show();

let [a, b, c] = [1, 2, 3];
console.log('a :', a);
console.log('b :', b);
console.log('c :', c);

console.log('d :', d);
console.log('e :', e);
console.log('f :', f);

$(function() {
  console.log('jquery');

  $('.box').click(function() {
    alert(1);
  });
})
;
