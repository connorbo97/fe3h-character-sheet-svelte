import{_ as Ht}from"../../chunks/preload-helper-703ceea7.js";import{S as jt,i as Lt,s as Ut,l as a,r as h,a as v,m as n,n as p,u as g,h as l,c as _,p as s,b,J as e,E as At,o as Mt,K as D,v as se,L as Gt,q as Vt}from"../../chunks/index-d5d48e27.js";import{D as Ke}from"../../chunks/constants-56e6b6a8.js";import{r as kt,D as Bt}from"../../chunks/weaponLevel-1d872777.js";import"../../chunks/enums-eee6a708.js";function wt(r){let c,u;return{c(){c=a("span"),u=h("EXAMPLE"),this.h()},l(d){c=n(d,"SPAN",{});var E=p(c);u=g(E,"EXAMPLE"),E.forEach(l),this.h()},h(){Vt(c,"background-color",r[2]("themeColor"),!1)},m(d,E){b(d,c,E),e(c,u)},p(d,E){E&4&&Vt(c,"background-color",d[2]("themeColor"),!1)},d(d){d&&l(c)}}}function Rt(r){let c,u,d,E,M,i,m,S,T,J,ae,ne,q,re,ie,X,oe,Q,N,z,ue,f,O,P,y,G=r[2]("themeColor").length===7,K,F,ce,ze,Qe,C,ye,We,pe,fe=r[2]("gravity")+"",Fe,Ce,A,ve,Ye,Ze,V,Ae,xe,_e,de=r[2]("mass")+"",Ve,ke,k,me,$e,et,B,Be,tt,he,ge=r[2]("scale")+"",we,Re,w,Ee,lt,st,R,Ue,at,Se,be=r[2]("friction")+"",He,je,U,Te,nt,rt,H,Le,it,Ie,Ne=r[2]("throwForce")+"",Me,Ge,j,Pe,ot,ut,L,Je,ct,De,Oe=r[2]("startingHeight")+"",qe,pt,ft,I=G&&wt(r);return{c(){c=a("div"),u=a("div"),d=a("button"),E=h("Test Settings"),M=v(),i=a("button"),m=h("Save Changes"),S=v(),T=a("div"),J=a("button"),ae=h("Reset to Current Settings"),ne=v(),q=a("button"),re=h("Reset Form to Current Settings"),ie=v(),X=a("button"),oe=h("Reset Form to Default Settings"),Q=v(),N=a("div"),z=a("span"),ue=h("Die Color (must be full RGB hex (e.g. #FF0000 for red))"),f=v(),O=a("input"),y=v(),I&&I.c(),K=v(),F=a("div"),ce=a("span"),ze=h("Gravity"),Qe=v(),C=a("input"),We=v(),pe=a("span"),Fe=h(fe),Ce=v(),A=a("div"),ve=a("span"),Ye=h("Mass"),Ze=v(),V=a("input"),xe=v(),_e=a("span"),Ve=h(de),ke=v(),k=a("div"),me=a("span"),$e=h("Scale"),et=v(),B=a("input"),tt=v(),he=a("span"),we=h(ge),Re=v(),w=a("div"),Ee=a("span"),lt=h("Friction"),st=v(),R=a("input"),at=v(),Se=a("span"),He=h(be),je=v(),U=a("div"),Te=a("span"),nt=h("Throw Force"),rt=v(),H=a("input"),it=v(),Ie=a("span"),Me=h(Ne),Ge=v(),j=a("div"),Pe=a("span"),ot=h("Starting Height"),ut=v(),L=a("input"),ct=v(),De=a("span"),qe=h(Oe),this.h()},l(t){c=n(t,"DIV",{class:!0});var o=p(c);u=n(o,"DIV",{class:!0});var Xe=p(u);d=n(Xe,"BUTTON",{});var vt=p(d);E=g(vt,"Test Settings"),vt.forEach(l),M=_(Xe),i=n(Xe,"BUTTON",{});var _t=p(i);m=g(_t,"Save Changes"),_t.forEach(l),Xe.forEach(l),S=_(o),T=n(o,"DIV",{class:!0});var W=p(T);J=n(W,"BUTTON",{});var dt=p(J);ae=g(dt,"Reset to Current Settings"),dt.forEach(l),ne=_(W),q=n(W,"BUTTON",{});var mt=p(q);re=g(mt,"Reset Form to Current Settings"),mt.forEach(l),ie=_(W),X=n(W,"BUTTON",{});var ht=p(X);oe=g(ht,"Reset Form to Default Settings"),ht.forEach(l),W.forEach(l),o.forEach(l),Q=_(t),N=n(t,"DIV",{class:!0});var Y=p(N);z=n(Y,"SPAN",{});var gt=p(z);ue=g(gt,"Die Color (must be full RGB hex (e.g. #FF0000 for red))"),gt.forEach(l),f=_(Y),O=n(Y,"INPUT",{}),y=_(Y),I&&I.l(Y),Y.forEach(l),K=_(t),F=n(t,"DIV",{class:!0});var Z=p(F);ce=n(Z,"SPAN",{});var Et=p(ce);ze=g(Et,"Gravity"),Et.forEach(l),Qe=_(Z),C=n(Z,"INPUT",{type:!0,min:!0,max:!0,class:!0,id:!0}),We=_(Z),pe=n(Z,"SPAN",{});var St=p(pe);Fe=g(St,fe),St.forEach(l),Z.forEach(l),Ce=_(t),A=n(t,"DIV",{class:!0});var x=p(A);ve=n(x,"SPAN",{});var bt=p(ve);Ye=g(bt,"Mass"),bt.forEach(l),Ze=_(x),V=n(x,"INPUT",{type:!0,min:!0,max:!0,class:!0,id:!0}),xe=_(x),_e=n(x,"SPAN",{});var Tt=p(_e);Ve=g(Tt,de),Tt.forEach(l),x.forEach(l),ke=_(t),k=n(t,"DIV",{class:!0});var $=p(k);me=n($,"SPAN",{});var It=p(me);$e=g(It,"Scale"),It.forEach(l),et=_($),B=n($,"INPUT",{type:!0,min:!0,max:!0,class:!0,id:!0}),tt=_($),he=n($,"SPAN",{});var Nt=p(he);we=g(Nt,ge),Nt.forEach(l),$.forEach(l),Re=_(t),w=n(t,"DIV",{class:!0});var ee=p(w);Ee=n(ee,"SPAN",{});var Pt=p(Ee);lt=g(Pt,"Friction"),Pt.forEach(l),st=_(ee),R=n(ee,"INPUT",{type:!0,min:!0,max:!0,class:!0,id:!0}),at=_(ee),Se=n(ee,"SPAN",{});var Dt=p(Se);He=g(Dt,be),Dt.forEach(l),ee.forEach(l),je=_(t),U=n(t,"DIV",{class:!0});var te=p(U);Te=n(te,"SPAN",{});var Ot=p(Te);nt=g(Ot,"Throw Force"),Ot.forEach(l),rt=_(te),H=n(te,"INPUT",{type:!0,min:!0,max:!0,class:!0,id:!0}),it=_(te),Ie=n(te,"SPAN",{});var yt=p(Ie);Me=g(yt,Ne),yt.forEach(l),te.forEach(l),Ge=_(t),j=n(t,"DIV",{class:!0});var le=p(j);Pe=n(le,"SPAN",{});var Ft=p(Pe);ot=g(Ft,"Starting Height"),Ft.forEach(l),ut=_(le),L=n(le,"INPUT",{type:!0,min:!0,max:!0,class:!0,id:!0}),ct=_(le),De=n(le,"SPAN",{});var Ct=p(De);qe=g(Ct,Oe),Ct.forEach(l),le.forEach(l),this.h()},h(){s(u,"class",""),s(T,"class",""),s(c,"class","button-container svelte-nnvf4p"),O.value=P=r[2]("themeColor","#FF0000"),s(N,"class","field"),s(C,"type","range"),s(C,"min","1"),s(C,"max","10"),s(C,"class","slider"),C.value=ye=r[2]("gravity"),s(C,"id","myRange"),s(F,"class","field"),s(V,"type","range"),s(V,"min","1"),s(V,"max","20"),s(V,"class","slider"),V.value=Ae=r[2]("mass"),s(V,"id","myRange"),s(A,"class","field"),s(B,"type","range"),s(B,"min","1"),s(B,"max","10"),s(B,"class","slider"),B.value=Be=r[2]("scale"),s(B,"id","myRange"),s(k,"class","field"),s(R,"type","range"),s(R,"min","1"),s(R,"max","10"),s(R,"class","slider"),R.value=Ue=r[2]("friction")*10,s(R,"id","myRange"),s(w,"class","field"),s(H,"type","range"),s(H,"min","0"),s(H,"max","15"),s(H,"class","slider"),H.value=Le=r[2]("throwForce"),s(H,"id","myRange"),s(U,"class","field"),s(L,"type","range"),s(L,"min","1"),s(L,"max","15"),s(L,"class","slider"),L.value=Je=r[2]("startingHeight"),s(L,"id","myRange"),s(j,"class","field")},m(t,o){b(t,c,o),e(c,u),e(u,d),e(d,E),e(u,M),e(u,i),e(i,m),e(c,S),e(c,T),e(T,J),e(J,ae),e(T,ne),e(T,q),e(q,re),e(T,ie),e(T,X),e(X,oe),b(t,Q,o),b(t,N,o),e(N,z),e(z,ue),e(N,f),e(N,O),e(N,y),I&&I.m(N,null),b(t,K,o),b(t,F,o),e(F,ce),e(ce,ze),e(F,Qe),e(F,C),e(F,We),e(F,pe),e(pe,Fe),b(t,Ce,o),b(t,A,o),e(A,ve),e(ve,Ye),e(A,Ze),e(A,V),e(A,xe),e(A,_e),e(_e,Ve),b(t,ke,o),b(t,k,o),e(k,me),e(me,$e),e(k,et),e(k,B),e(k,tt),e(k,he),e(he,we),b(t,Re,o),b(t,w,o),e(w,Ee),e(Ee,lt),e(w,st),e(w,R),e(w,at),e(w,Se),e(Se,He),b(t,je,o),b(t,U,o),e(U,Te),e(Te,nt),e(U,rt),e(U,H),e(U,it),e(U,Ie),e(Ie,Me),b(t,Ge,o),b(t,j,o),e(j,Pe),e(Pe,ot),e(j,ut),e(j,L),e(j,ct),e(j,De),e(De,qe),pt||(ft=[D(d,"click",r[6]),D(i,"click",r[7]),D(J,"click",r[8]),D(q,"click",r[9]),D(X,"click",r[10]),D(O,"input",r[11]),D(C,"input",r[12]),D(V,"input",r[13]),D(B,"input",r[14]),D(R,"input",r[15]),D(H,"input",r[16]),D(L,"input",r[17])],pt=!0)},p(t,o){o&4&&P!==(P=t[2]("themeColor","#FF0000"))&&O.value!==P&&(O.value=P),o&4&&(G=t[2]("themeColor").length===7),G?I?I.p(t,o):(I=wt(t),I.c(),I.m(N,null)):I&&(I.d(1),I=null),o&4&&ye!==(ye=t[2]("gravity"))&&(C.value=ye),o&4&&fe!==(fe=t[2]("gravity")+"")&&se(Fe,fe),o&4&&Ae!==(Ae=t[2]("mass"))&&(V.value=Ae),o&4&&de!==(de=t[2]("mass")+"")&&se(Ve,de),o&4&&Be!==(Be=t[2]("scale"))&&(B.value=Be),o&4&&ge!==(ge=t[2]("scale")+"")&&se(we,ge),o&4&&Ue!==(Ue=t[2]("friction")*10)&&(R.value=Ue),o&4&&be!==(be=t[2]("friction")+"")&&se(He,be),o&4&&Le!==(Le=t[2]("throwForce"))&&(H.value=Le),o&4&&Ne!==(Ne=t[2]("throwForce")+"")&&se(Me,Ne),o&4&&Je!==(Je=t[2]("startingHeight"))&&(L.value=Je),o&4&&Oe!==(Oe=t[2]("startingHeight")+"")&&se(qe,Oe)},d(t){t&&l(c),t&&l(Q),t&&l(N),I&&I.d(),t&&l(K),t&&l(F),t&&l(Ce),t&&l(A),t&&l(ke),t&&l(k),t&&l(Re),t&&l(w),t&&l(je),t&&l(U),t&&l(Ge),t&&l(j),pt=!1,Gt(ft)}}}function Jt(r){let c,u,d,E,M=r[1],i=Rt(r);return{c(){c=a("div"),u=a("h1"),d=h("Update how your dice rolls look"),E=v(),i.c(),this.h()},l(m){c=n(m,"DIV",{class:!0});var S=p(c);u=n(S,"H1",{});var T=p(u);d=g(T,"Update how your dice rolls look"),T.forEach(l),E=_(S),i.l(S),S.forEach(l),this.h()},h(){s(c,"class","container")},m(m,S){b(m,c,S),e(c,u),e(u,d),e(c,E),i.m(c,null)},p(m,[S]){S&2&&Ut(M,M=m[1])?(i.d(1),i=Rt(m),i.c(),i.m(c,null)):i.p(m,S)},i:At,o:At,d(m){m&&l(c),i.d(m)}}}function qt(r,c,u){let d,E,M=null,i={},m={},S=0;Mt(()=>{Ht(()=>import("../../chunks/dice-box.es-7f4fe224.js"),["_app/immutable/chunks/dice-box.es-7f4fe224.js","_app/immutable/chunks/preload-helper-703ceea7.js"]).then(f=>{u(4,M=f.default)}),T()});const T=()=>{try{u(5,m=JSON.parse(localStorage.getItem("diceBoxOptions")||"{}"))}catch(f){console.log(f)}return m},J=()=>{d().then(()=>{kt([Bt.d20])})},ae=()=>{d(!0)},ne=()=>{d(!1,!0).then(()=>{kt([Bt.d20])})},q=()=>{u(0,i={}),u(1,S+=1)},re=()=>{u(0,i={...Ke}),u(1,S+=1)},ie=f=>{u(0,i.themeColor=f.currentTarget.value,i)},X=f=>u(0,i.gravity=parseInt(f.currentTarget.value),i),oe=f=>u(0,i.mass=parseInt(f.currentTarget.value),i),Q=f=>u(0,i.scale=parseInt(f.currentTarget.value),i),N=f=>u(0,i.friction=parseInt(f.currentTarget.value)/10,i),z=f=>u(0,i.throwForce=parseInt(f.currentTarget.value),i),ue=f=>u(0,i.startingHeight=parseInt(f.currentTarget.value),i);return r.$$.update=()=>{r.$$.dirty&17&&u(3,d=(f=!1,O=!1)=>{const P=O?{}:i;let y;try{y=T()}catch(K){console.log(K)}if(f)try{localStorage.setItem("diceBoxOptions",JSON.stringify(Object.assign(Object.assign({},y),P))),u(5,m=Object.assign(Object.assign({},y),P))}catch(K){console.log(K)}const G=new M("#dice-box",Object.assign(Object.assign(Object.assign({},Ke),y),P));return window.diceBoxContainer.removeChild(document.getElementById("dice-canvas")),G.init().then(()=>{window.diceBox=G})}),r.$$.dirty&33&&u(2,E=(f,O=1)=>{const P=i[f]!==void 0?i[f]:null;if(P!==null)return P;const y=m[f]!==void 0?m[f]:null;if(y!==null)return y;const G=Ke[f]!==void 0?Ke[f]:null;return G!==null?G:O})},[i,S,E,d,M,m,J,ae,ne,q,re,ie,X,oe,Q,N,z,ue]}class Yt extends jt{constructor(c){super(),Lt(this,c,qt,Jt,Ut,{})}}export{Yt as default};
