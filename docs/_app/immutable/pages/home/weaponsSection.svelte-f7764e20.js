import{S as le,i as te,s as j,l as g,w as z,a as B,m as v,n as U,x as Y,c as H,h as c,p as h,b as q,y as Z,J as m,f as E,t as w,d as ie,B as x,r as k,u as S,Q as I,v as F,q as $,K as ae,g as ne}from"../../chunks/index-d5d48e27.js";import{E as oe}from"../../chunks/equippedButton-566568f6.js";import{S as ue}from"../../chunks/SvelteTip-cf62352a.js";import{b as Q}from"../../chunks/constants-56e6b6a8.js";import{T as re,c as R}from"../../chunks/enums-eee6a708.js";import{i as fe,y as G}from"../../chunks/weaponLevel-1d872777.js";import{c as pe}from"../../chunks/utils-edd64bc1.js";function ce(i){let e,s=i[3].weaponsToLabel[i[0]]+"",u,a;return{c(){e=g("div"),u=k(s),this.h()},l(t){e=v(t,"DIV",{class:!0});var l=U(e);u=S(l,s),l.forEach(c),this.h()},h(){h(e,"class",a=I(R("label",{magic:i[4],custom:i[6]}))+" svelte-12aohl3")},m(t,l){q(t,e,l),m(e,u)},p(t,l){l&9&&s!==(s=t[3].weaponsToLabel[t[0]]+"")&&F(u,s),l&80&&a!==(a=I(R("label",{magic:t[4],custom:t[6]}))+" svelte-12aohl3")&&h(e,"class",a)},d(t){t&&c(e)}}}function de(i){let e,s=G(i[3].fullFeatures[i[0]])+"",u,a,t,l=i[5][i[0]].reason?`(${i[5][i[0]].reason})`:"",o;return{c(){e=g("div"),u=k(s),a=B(),t=g("span"),o=k(l),this.h()},l(n){e=v(n,"DIV",{slot:!0});var r=U(e);u=S(r,s),a=H(r),t=v(r,"SPAN",{});var _=U(t);o=S(_,l),_.forEach(c),r.forEach(c),this.h()},h(){$(t,"color","#9c8e8e",!1),h(e,"slot","t")},m(n,r){q(n,e,r),m(e,u),m(e,a),m(e,t),m(t,o)},p(n,r){r&9&&s!==(s=G(n[3].fullFeatures[n[0]])+"")&&F(u,s),r&33&&l!==(l=n[5][n[0]].reason?`(${n[5][n[0]].reason})`:"")&&F(o,l)},d(n){n&&c(e)}}}function J(i){let e,s,u;return s=new oe({props:{isEquipped:i[1].includes(i[0]),onClick:i[22],isVisible:i[1].length<Q||i[1].includes(i[0])}}),{c(){e=g("div"),z(s.$$.fragment),this.h()},l(a){e=v(a,"DIV",{class:!0});var t=U(e);Y(s.$$.fragment,t),t.forEach(c),this.h()},h(){h(e,"class","equip-button svelte-12aohl3")},m(a,t){q(a,e,t),Z(s,e,null),u=!0},p(a,t){const l={};t&3&&(l.isEquipped=a[1].includes(a[0])),t&1029&&(l.onClick=a[22]),t&3&&(l.isVisible=a[1].length<Q||a[1].includes(a[0])),s.$set(l)},i(a){u||(E(s.$$.fragment,a),u=!0)},o(a){w(s.$$.fragment,a),u=!1},d(a){a&&c(e),x(s)}}}function K(i){let e,s=i[7],u,a,t,l=X(i);return{c(){e=g("div"),l.c(),u=k(`
			/`),a=g("span"),t=k(i[7]),this.h()},l(o){e=v(o,"DIV",{class:!0});var n=U(e);l.l(n),u=S(n,`
			/`),a=v(n,"SPAN",{});var r=U(a);t=S(r,i[7]),r.forEach(c),n.forEach(c),this.h()},h(){$(a,"width","15px",!1),h(e,"class","equip-button svelte-12aohl3")},m(o,n){q(o,e,n),l.m(e,null),m(e,u),m(e,a),m(a,t)},p(o,n){n&128&&j(s,s=o[7])?(l.d(1),l=X(o),l.c(),l.m(e,u)):l.p(o,n),n&128&&F(t,o[7])},d(o){o&&c(e),l.d(o)}}}function X(i){let e,s,u,a;return{c(){e=g("input"),this.h()},l(t){e=v(t,"INPUT",{class:!0,type:!0,min:!0}),this.h()},h(){h(e,"class",s=I("count "+(i[9]===0?"bad":i[9]<=Math.ceil(i[7]/3)?"danger":""))+" svelte-12aohl3"),h(e,"type","number"),h(e,"min","0"),e.value=i[9]},m(t,l){q(t,e,l),u||(a=ae(e,"change",i[23]),u=!0)},p(t,l){l&640&&s!==(s=I("count "+(t[9]===0?"bad":t[9]<=Math.ceil(t[7]/3)?"danger":""))+" svelte-12aohl3")&&h(e,"class",s),l&512&&e.value!==t[9]&&(e.value=t[9])},d(t){t&&c(e),u=!1,a()}}}function he(i){let e,s,u,a,t;s=new ue({props:{tooltipStyle:re.CENTER,timeout:300,$$slots:{t:[de],default:[ce]},$$scope:{ctx:i}}});let l=!i[4]&&J(i),o=i[4]&&K(i);return{c(){e=g("div"),z(s.$$.fragment),u=B(),l&&l.c(),a=B(),o&&o.c(),this.h()},l(n){e=v(n,"DIV",{class:!0});var r=U(e);Y(s.$$.fragment,r),u=H(r),l&&l.l(r),a=H(r),o&&o.l(r),r.forEach(c),this.h()},h(){h(e,"class","container svelte-12aohl3")},m(n,r){q(n,e,r),Z(s,e,null),m(e,u),l&&l.m(e,null),m(e,a),o&&o.m(e,null),t=!0},p(n,[r]){const _={};r&33554553&&(_.$$scope={dirty:r,ctx:n}),s.$set(_),n[4]?l&&(ne(),w(l,1,1,()=>{l=null}),ie()):l?(l.p(n,r),r&16&&E(l,1)):(l=J(n),l.c(),E(l,1),l.m(e,a)),n[4]?o?o.p(n,r):(o=K(n),o.c(),o.m(e,null)):o&&(o.d(1),o=null)},i(n){t||(E(s.$$.fragment,n),E(l),t=!0)},o(n){w(s.$$.fragment,n),w(l),t=!1},d(n){n&&c(e),x(s),l&&l.d(),o&&o.d()}}}function me(i,e,s){let u,a,t,l,o,n,r,_,P;var y;let{weapon:d}=e,{equippedClass:M}=e,{equippedWeapons:L}=e,{equippedCombatSkills:N}=e,{onToggleEquip:A}=e,{allWeapons:p}=e,{spellUseFlag:b}=e,{isMagic:O}=e,{weaponUses:D}=e,{onUpdateWeaponUses:V}=e,W={current:b},C={current:null};const ee=()=>A(d,_),se=f=>{const T=parseInt(f.currentTarget.value);T>=0&&T<=a?(l(T),f.currentTarget.value=T+""):f.currentTarget.value=a+""};return i.$$set=f=>{"weapon"in f&&s(0,d=f.weapon),"equippedClass"in f&&s(11,M=f.equippedClass),"equippedWeapons"in f&&s(1,L=f.equippedWeapons),"equippedCombatSkills"in f&&s(12,N=f.equippedCombatSkills),"onToggleEquip"in f&&s(2,A=f.onToggleEquip),"allWeapons"in f&&s(3,p=f.allWeapons),"spellUseFlag"in f&&s(13,b=f.spellUseFlag),"isMagic"in f&&s(4,O=f.isMagic),"weaponUses"in f&&s(14,D=f.weaponUses),"onUpdateWeaponUses"in f&&s(15,V=f.onUpdateWeaponUses)},i.$$.update=()=>{i.$$.dirty&6144&&s(21,u=pe(M,N)),i.$$.dirty&2162697&&s(7,a=((s(16,y=p.fullFeatures[d])===null||y===void 0?void 0:y.uses)||1/0)*(u&&d===fe.HEAL?2:1)),i.$$.dirty&16385&&s(9,t=D[d]),i.$$.dirty&640&&t===void 0&&a!==void 0&&s(9,t=a),i.$$.dirty&32897&&s(8,l=f=>{f<=a&&f>=0&&V(d,f)}),i.$$.dirty&401792&&(W.current!=b||a!==C.current)&&(l(a),s(18,C.current=a,C),s(17,W.current=b,W)),i.$$.dirty&9&&s(6,o=p==null?void 0:p.customSet.has(d)),i.$$.dirty&9&&s(20,n=(p==null?void 0:p.classUnlockSet.has(d))||(p==null?void 0:p.equippedClassSet.has(d))),i.$$.dirty&1&&s(19,r=d.indexOf("TRAINING")>=0),i.$$.dirty&1572928&&s(10,_=o||n||r),i.$$.dirty&8&&s(5,P=p.fullFeatures),i.$$.dirty&33&&P[d].reason},[d,L,A,p,O,P,o,a,l,t,_,M,N,b,D,V,y,W,C,r,n,u,ee,se]}class ke extends le{constructor(e){super(),te(this,e,me,he,j,{weapon:0,equippedClass:11,equippedWeapons:1,equippedCombatSkills:12,onToggleEquip:2,allWeapons:3,spellUseFlag:13,isMagic:4,weaponUses:14,onUpdateWeaponUses:15})}}export{ke as default};
