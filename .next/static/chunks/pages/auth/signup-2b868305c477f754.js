(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[613],{2120:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/auth/signup",function(){return t(912)}])},912:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return s}});var a=t(5893),i=t(7294);function s(){let[e,n]=(0,i.useState)(""),[t,s]=(0,i.useState)(""),[u,r]=(0,i.useState)("");async function l(n){n.preventDefault();let a=await fetch("/api/auth/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:t,name:u})});if(a.ok)alert("SignUp success. Please sign in.");else{let e=await a.json();alert("Error: "+e.error)}}return(0,a.jsxs)("div",{style:{maxWidth:360,margin:"80px auto"},children:[(0,a.jsx)("h1",{children:"Sign Up"}),(0,a.jsxs)("form",{onSubmit:l,children:[(0,a.jsx)("label",{children:"Email"}),(0,a.jsx)("input",{value:e,onChange:e=>n(e.target.value)}),(0,a.jsx)("label",{children:"Password"}),(0,a.jsx)("input",{type:"password",value:t,onChange:e=>s(e.target.value)}),(0,a.jsx)("label",{children:"Name"}),(0,a.jsx)("input",{value:u,onChange:e=>r(e.target.value)}),(0,a.jsx)("button",{type:"submit",children:"Sign Up"})]})]})}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=2120)}),_N_E=e.O()}]);