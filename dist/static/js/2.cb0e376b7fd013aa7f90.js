webpackJsonp([2],{112:function(t,e,r){"use strict";function a(t){r(172)}Object.defineProperty(e,"__esModule",{value:!0});var n=r(174),s=r(180),i=r(1),o=a,c=i(n.a,s.a,!1,o,null,null);e.default=c.exports},119:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},120:function(t,e,r){t.exports={default:r(124),__esModule:!0}},124:function(t,e,r){r(125),t.exports=parseInt},125:function(t,e,r){var a=r(25),n=r(126);a(a.S+a.F*(Number.parseInt!=n),"Number",{parseInt:n})},126:function(t,e,r){var a=r(6).parseInt,n=r(127).trim,s=r(119),i=/^[\-+]?0[xX]/;t.exports=8!==a(s+"08")||22!==a(s+"0x16")?function(t,e){var r=n(String(t),3);return a(r,e>>>0||(i.test(r)?16:10))}:a},127:function(t,e,r){var a=r(25),n=r(13),s=r(7),i=r(119),o="["+i+"]",c="​",u=RegExp("^"+o+o+"*"),f=RegExp(o+o+"*$"),l=function(t,e,r){var n={},o=s(function(){return!!i[t]()||c[t]()!=c}),u=n[t]=o?e(d):i[t];r&&(n[r]=u),a(a.P+a.F*o,"String",n)},d=l.trim=function(t,e){return t=String(n(t)),1&e&&(t=t.replace(u,"")),2&e&&(t=t.replace(f,"")),t};t.exports=l},172:function(t,e,r){var a=r(173);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);r(111)("574cd1e2",a,!0)},173:function(t,e,r){e=t.exports=r(110)(!1),e.push([t.i,"",""])},174:function(t,e,r){"use strict";var a=r(175);e.a={name:"form",data:function(){return{}},components:{headTo:a.a},created:function(){},methods:{}}},175:function(t,e,r){"use strict";function a(t){r(176)}var n=r(178),s=r(179),i=r(1),o=a,c=i(n.a,s.a,!1,o,null,null);e.a=c.exports},176:function(t,e,r){var a=r(177);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);r(111)("d0c276ae",a,!0)},177:function(t,e,r){e=t.exports=r(110)(!1),e.push([t.i,"",""])},178:function(t,e,r){"use strict";var a=r(120),n=r.n(a),s=r(4);e.a={name:"header",store:s.a,data:function(){return{headerList:[{title:"表头",name:"formHeader"},{title:"内容",name:"formEdit"},{title:"发布",name:"formRelease"}]}},computed:{step:function(){return this.$store.state.step}},methods:{previou:function(){step},next:function(){},preview:function(){},toggle:function(t){t.stopPropagation();var e=n()(t.target.getAttribute("data-index"));switch(e){case 1:this.$router.push({name:"formHeader"});break;case 2:this.$router.push({name:"formEdit"});break;case 3:this.$router.push({name:"formRelease"})}this.$store.commit("updateStep",{step:e})}}}},179:function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("header",{staticClass:"header",attrs:{id:"header"}},[r("div",{staticClass:"flex header-in"},[r("div",{staticClass:"flex-item header-left"},[t._v("Simple Form Tools")]),t._v(" "),r("div",{staticClass:"flex-item header-center"},[r("ul",{staticClass:"header-nav"},t._l(t.headerList,function(e,a){return r("router-link",{key:a+1,attrs:{to:e.name,tag:"li","active-class":"active"}},[r("span",{staticClass:"header-nav_item"},[t._v(t._s(a+1))]),t._v("\r\n              "+t._s(e.title)+"\r\n           ")])}))]),t._v(" "),r("div",{staticClass:"flex-item header-right"},[t._e()])])])},n=[],s={render:a,staticRenderFns:n};e.a=s},180:function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"form"}},[r("headTo"),t._v(" "),r("transition",{attrs:{"enter-active-class":"fadeIn","leave-active-class":"fadeOut",mode:"out-in"}},[r("keep-alive",[r("router-view",{staticClass:"animated fast"})],1)],1)],1)},n=[],s={render:a,staticRenderFns:n};e.a=s}});