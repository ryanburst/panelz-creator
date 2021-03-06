var fabric=fabric||{version:"2.0.0-beta2"};"undefined"!=typeof exports&&(exports.fabric=fabric),"undefined"!=typeof document&&"undefined"!=typeof window?(fabric.document=document,fabric.window=window,window.fabric=fabric):(fabric.document=require("jsdom").jsdom(decodeURIComponent("%3C!DOCTYPE%20html%3E%3Chtml%3E%3Chead%3E%3C%2Fhead%3E%3Cbody%3E%3C%2Fbody%3E%3C%2Fhtml%3E"),{features:{FetchExternalResources:["img"]}}),fabric.window=fabric.document.defaultView),fabric.isTouchSupported="ontouchstart"in fabric.document.documentElement,fabric.isLikelyNode="undefined"!=typeof Buffer&&"undefined"==typeof window,fabric.SHARED_ATTRIBUTES=["display","transform","fill","fill-opacity","fill-rule","opacity","stroke","stroke-dasharray","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","id"],fabric.DPI=96,fabric.reNum="(?:[-+]?(?:\\d+|\\d*\\.\\d+)(?:e[-+]?\\d+)?)",fabric.fontPaths={},fabric.iMatrix=[1,0,0,1,0,0],fabric.canvasModule="canvas-prebuilt",fabric.charWidthsCache={},fabric.textureSize=2048,fabric.enableGLFiltering=!0,fabric.devicePixelRatio=fabric.window.devicePixelRatio||fabric.window.webkitDevicePixelRatio||fabric.window.mozDevicePixelRatio||1,fabric.initFilterBackend=function(){return fabric.isWebglSupported&&fabric.isWebglSupported(fabric.textureSize)&&fabric.enableGLFiltering?(console.log("max texture size: "+fabric.maxTextureSize),new fabric.WebglFilterBackend({tileSize:fabric.textureSize})):fabric.Canvas2dFilterBackend?new fabric.Canvas2dFilterBackend:void 0},function(){function t(t,e){if(this.__eventListeners[t]){var i=this.__eventListeners[t];e?i[i.indexOf(e)]=!1:fabric.util.array.fill(i,!1)}}function e(t,e){if(this.__eventListeners||(this.__eventListeners={}),1===arguments.length)for(var i in t)this.on(i,t[i]);else this.__eventListeners[t]||(this.__eventListeners[t]=[]),this.__eventListeners[t].push(e);return this}function i(e,i){if(this.__eventListeners){if(0===arguments.length)for(e in this.__eventListeners)t.call(this,e);else if(1===arguments.length&&"object"==typeof arguments[0])for(var r in e)t.call(this,r,e[r]);else t.call(this,e,i);return this}}function r(t,e){if(this.__eventListeners){var i=this.__eventListeners[t];if(i){for(var r=0,n=i.length;r<n;r++)i[r]&&i[r].call(this,e||{});return this.__eventListeners[t]=i.filter(function(t){return t!==!1}),this}}}fabric.Observable={observe:e,stopObserving:i,fire:r,on:e,off:i,trigger:r}}(),fabric.Collection={_objects:[],add:function(){if(this._objects.push.apply(this._objects,arguments),this._onObjectAdded)for(var t=0,e=arguments.length;t<e;t++)this._onObjectAdded(arguments[t]);return this.renderOnAddRemove&&this.renderAll(),this},insertAt:function(t,e,i){var r=this.getObjects();return i?r[e]=t:r.splice(e,0,t),this._onObjectAdded&&this._onObjectAdded(t),this.renderOnAddRemove&&this.renderAll(),this},remove:function(){for(var t,e=this.getObjects(),i=!1,r=0,n=arguments.length;r<n;r++)t=e.indexOf(arguments[r]),t!==-1&&(i=!0,e.splice(t,1),this._onObjectRemoved&&this._onObjectRemoved(arguments[r]));return this.renderOnAddRemove&&i&&this.renderAll(),this},forEachObject:function(t,e){for(var i=this.getObjects(),r=0,n=i.length;r<n;r++)t.call(e,i[r],r,i);return this},getObjects:function(t){return"undefined"==typeof t?this._objects:this._objects.filter(function(e){return e.type===t})},item:function(t){return this.getObjects()[t]},isEmpty:function(){return 0===this.getObjects().length},size:function(){return this.getObjects().length},contains:function(t){return this.getObjects().indexOf(t)>-1},complexity:function(){return this.getObjects().reduce(function(t,e){return t+=e.complexity?e.complexity():0},0)}},fabric.CommonMethods={_setOptions:function(t){for(var e in t)this.set(e,t[e])},_initGradient:function(t,e){!t||!t.colorStops||t instanceof fabric.Gradient||this.set(e,new fabric.Gradient(t))},_initPattern:function(t,e,i){!t||!t.source||t instanceof fabric.Pattern?i&&i():this.set(e,new fabric.Pattern(t,i))},_initClipping:function(t){if(t.clipTo&&"string"==typeof t.clipTo){var e=fabric.util.getFunctionBody(t.clipTo);"undefined"!=typeof e&&(this.clipTo=new Function("ctx",e))}},_setObject:function(t){for(var e in t)this._set(e,t[e])},set:function(t,e){return"object"==typeof t?this._setObject(t):"function"==typeof e&&"clipTo"!==t?this._set(t,e(this.get(t))):this._set(t,e),this},_set:function(t,e){this[t]=e},toggle:function(t){var e=this.get(t);return"boolean"==typeof e&&this.set(t,!e),this},get:function(t){return this[t]}},function(t){var e=Math.sqrt,i=Math.atan2,r=Math.pow,n=Math.abs,s=Math.PI/180;fabric.util={removeFromArray:function(t,e){var i=t.indexOf(e);return i!==-1&&t.splice(i,1),t},getRandomInt:function(t,e){return Math.floor(Math.random()*(e-t+1))+t},degreesToRadians:function(t){return t*s},radiansToDegrees:function(t){return t/s},rotatePoint:function(t,e,i){t.subtractEquals(e);var r=fabric.util.rotateVector(t,i);return new fabric.Point(r.x,r.y).addEquals(e)},rotateVector:function(t,e){var i=Math.sin(e),r=Math.cos(e),n=t.x*r-t.y*i,s=t.x*i+t.y*r;return{x:n,y:s}},transformPoint:function(t,e,i){return i?new fabric.Point(e[0]*t.x+e[2]*t.y,e[1]*t.x+e[3]*t.y):new fabric.Point(e[0]*t.x+e[2]*t.y+e[4],e[1]*t.x+e[3]*t.y+e[5])},makeBoundingBoxFromPoints:function(t){var e=[t[0].x,t[1].x,t[2].x,t[3].x],i=fabric.util.array.min(e),r=fabric.util.array.max(e),n=Math.abs(i-r),s=[t[0].y,t[1].y,t[2].y,t[3].y],o=fabric.util.array.min(s),a=fabric.util.array.max(s),h=Math.abs(o-a);return{left:i,top:o,width:n,height:h}},invertTransform:function(t){var e=1/(t[0]*t[3]-t[1]*t[2]),i=[e*t[3],-e*t[1],-e*t[2],e*t[0]],r=fabric.util.transformPoint({x:t[4],y:t[5]},i,!0);return i[4]=-r.x,i[5]=-r.y,i},toFixed:function(t,e){return parseFloat(Number(t).toFixed(e))},parseUnit:function(t,e){var i=/\D{0,2}$/.exec(t),r=parseFloat(t);switch(e||(e=fabric.Text.DEFAULT_SVG_FONT_SIZE),i[0]){case"mm":return r*fabric.DPI/25.4;case"cm":return r*fabric.DPI/2.54;case"in":return r*fabric.DPI;case"pt":return r*fabric.DPI/72;case"pc":return r*fabric.DPI/72*12;case"em":return r*e;default:return r}},falseFunction:function(){return!1},getKlass:function(t,e){return t=fabric.util.string.camelize(t.charAt(0).toUpperCase()+t.slice(1)),fabric.util.resolveNamespace(e)[t]},resolveNamespace:function(e){if(!e)return fabric;var i,r=e.split("."),n=r.length,s=t||fabric.window;for(i=0;i<n;++i)s=s[r[i]];return s},loadImage:function(t,e,i,r){if(!t)return void(e&&e.call(i,t));var n=fabric.util.createImage();n.onload=function(){e&&e.call(i,n),n=n.onload=n.onerror=null},n.onerror=function(){fabric.log("Error loading "+n.src),e&&e.call(i,null,!0),n=n.onload=n.onerror=null},0!==t.indexOf("data")&&r&&(n.crossOrigin=r),n.src=t},enlivenObjects:function(t,e,i,r){function n(){++o===a&&e&&e(s)}t=t||[];var s=[],o=0,a=t.length,h=!0;return a?void t.forEach(function(t,e){if(!t||!t.type)return void n();var o=fabric.util.getKlass(t.type,i);o.fromObject(t,function(i,o){o||(s[e]=i),r&&r(t,i,o),n()},h)}):void(e&&e(s))},enlivenPatterns:function(t,e){function i(){++n===s&&e&&e(r)}t=t||[];var r=[],n=0,s=t.length;return s?void t.forEach(function(t,e){t&&t.source?new fabric.Pattern(t,function(t){r[e]=t,i()}):(r[e]=t,i())}):void(e&&e(r))},groupSVGElements:function(t,e,i){var r;return 1===t.length?t[0]:(e&&(e.width&&e.height?e.centerPoint={x:e.width/2,y:e.height/2}:(delete e.width,delete e.height)),r=new fabric.Group(t,e),"undefined"!=typeof i&&(r.sourcePath=i),r)},populateWithProperties:function(t,e,i){if(i&&"[object Array]"===Object.prototype.toString.call(i))for(var r=0,n=i.length;r<n;r++)i[r]in t&&(e[i[r]]=t[i[r]])},drawDashedLine:function(t,r,n,s,o,a){var h=s-r,c=o-n,l=e(h*h+c*c),u=i(c,h),f=a.length,d=0,g=!0;for(t.save(),t.translate(r,n),t.moveTo(0,0),t.rotate(u),r=0;l>r;)r+=a[d++%f],r>l&&(r=l),t[g?"lineTo":"moveTo"](r,0),g=!g;t.restore()},createCanvasElement:function(t){return t||(t=fabric.document.createElement("canvas")),t},createImage:function(){return fabric.document.createElement("img")},createAccessors:function(t){var e,i,r,n,s,o=t.prototype;for(e=o.stateProperties.length;e--;)i=o.stateProperties[e],r=i.charAt(0).toUpperCase()+i.slice(1),n="set"+r,s="get"+r,o[s]||(o[s]=function(t){return new Function('return this.get("'+t+'")')}(i)),o[n]||(o[n]=function(t){return new Function("value",'return this.set("'+t+'", value)')}(i))},clipContext:function(t,e){e.save(),e.beginPath(),t.clipTo(e),e.clip()},multiplyTransformMatrices:function(t,e,i){return[t[0]*e[0]+t[2]*e[1],t[1]*e[0]+t[3]*e[1],t[0]*e[2]+t[2]*e[3],t[1]*e[2]+t[3]*e[3],i?0:t[0]*e[4]+t[2]*e[5]+t[4],i?0:t[1]*e[4]+t[3]*e[5]+t[5]]},qrDecompose:function(t){var n=i(t[1],t[0]),o=r(t[0],2)+r(t[1],2),a=e(o),h=(t[0]*t[3]-t[2]*t[1])/a,c=i(t[0]*t[2]+t[1]*t[3],o);return{angle:n/s,scaleX:a,scaleY:h,skewX:c/s,skewY:0,translateX:t[4],translateY:t[5]}},customTransformMatrix:function(t,e,i){var r=[1,0,n(Math.tan(i*s)),1],o=[n(t),0,0,n(e)];return fabric.util.multiplyTransformMatrices(o,r,!0)},resetObjectTransform:function(t){t.scaleX=1,t.scaleY=1,t.skewX=0,t.skewY=0,t.flipX=!1,t.flipY=!1,t.setAngle(0)},getFunctionBody:function(t){return(String(t).match(/function[^{]*\{([\s\S]*)\}/)||{})[1]},isTransparent:function(t,e,i,r){r>0&&(e>r?e-=r:e=0,i>r?i-=r:i=0);var n,s,o=!0,a=t.getImageData(e,i,2*r||1,2*r||1),h=a.data.length;for(n=3;n<h&&(s=a.data[n],o=s<=0,o!==!1);n+=4);return a=null,o},parsePreserveAspectRatioAttribute:function(t){var e,i="meet",r="Mid",n="Mid",s=t.split(" ");return s&&s.length&&(i=s.pop(),"meet"!==i&&"slice"!==i?(e=i,i="meet"):s.length&&(e=s.pop())),r="none"!==e?e.slice(1,4):"none",n="none"!==e?e.slice(5,8):"none",{meetOrSlice:i,alignX:r,alignY:n}},clearFabricFontCache:function(t){t?fabric.charWidthsCache[t]&&delete fabric.charWidthsCache[t]:fabric.charWidthsCache={}}}}("undefined"!=typeof exports?exports:this),function(){function t(t,r,s,o,h,c,l){var u=a.call(arguments);if(n[u])return n[u];var f=Math.PI,d=l*f/180,g=Math.sin(d),p=Math.cos(d),v=0,m=0;s=Math.abs(s),o=Math.abs(o);var b=-p*t*.5-g*r*.5,_=-p*r*.5+g*t*.5,y=s*s,x=o*o,C=_*_,S=b*b,T=y*x-y*C-x*S,w=0;if(T<0){var O=Math.sqrt(1-T/(y*x));s*=O,o*=O}else w=(h===c?-1:1)*Math.sqrt(T/(y*C+x*S));var k=w*s*_/o,j=-w*o*b/s,D=p*k-g*j+.5*t,E=g*k+p*j+.5*r,P=i(1,0,(b-k)/s,(_-j)/o),A=i((b-k)/s,(_-j)/o,(-b-k)/s,(-_-j)/o);0===c&&A>0?A-=2*f:1===c&&A<0&&(A+=2*f);for(var M=Math.ceil(Math.abs(A/f*2)),L=[],I=A/M,F=8/3*Math.sin(I/4)*Math.sin(I/4)/Math.sin(I/2),R=P+I,B=0;B<M;B++)L[B]=e(P,R,p,g,s,o,D,E,F,v,m),v=L[B][4],m=L[B][5],P=R,R+=I;return n[u]=L,L}function e(t,e,i,r,n,o,h,c,l,u,f){var d=a.call(arguments);if(s[d])return s[d];var g=Math.cos(t),p=Math.sin(t),v=Math.cos(e),m=Math.sin(e),b=i*n*v-r*o*m+h,_=r*n*v+i*o*m+c,y=u+l*(-i*n*p-r*o*g),x=f+l*(-r*n*p+i*o*g),C=b+l*(i*n*m+r*o*v),S=_+l*(r*n*m-i*o*v);return s[d]=[y,x,C,S,b,_],s[d]}function i(t,e,i,r){var n=Math.atan2(e,t),s=Math.atan2(r,i);return s>=n?s-n:2*Math.PI-(n-s)}function r(t,e,i,r,n,s,h,c){var l=a.call(arguments);if(o[l])return o[l];var u,f,d,g,p,v,m,b,_=Math.sqrt,y=Math.min,x=Math.max,C=Math.abs,S=[],T=[[],[]];f=6*t-12*i+6*n,u=-3*t+9*i-9*n+3*h,d=3*i-3*t;for(var w=0;w<2;++w)if(w>0&&(f=6*e-12*r+6*s,u=-3*e+9*r-9*s+3*c,d=3*r-3*e),C(u)<1e-12){if(C(f)<1e-12)continue;g=-d/f,0<g&&g<1&&S.push(g)}else m=f*f-4*d*u,m<0||(b=_(m),p=(-f+b)/(2*u),0<p&&p<1&&S.push(p),v=(-f-b)/(2*u),0<v&&v<1&&S.push(v));for(var O,k,j,D=S.length,E=D;D--;)g=S[D],j=1-g,O=j*j*j*t+3*j*j*g*i+3*j*g*g*n+g*g*g*h,T[0][D]=O,k=j*j*j*e+3*j*j*g*r+3*j*g*g*s+g*g*g*c,T[1][D]=k;T[0][E]=t,T[1][E]=e,T[0][E+1]=h,T[1][E+1]=c;var P=[{x:y.apply(null,T[0]),y:y.apply(null,T[1])},{x:x.apply(null,T[0]),y:x.apply(null,T[1])}];return o[l]=P,P}var n={},s={},o={},a=Array.prototype.join;fabric.util.drawArc=function(e,i,r,n){for(var s=n[0],o=n[1],a=n[2],h=n[3],c=n[4],l=n[5],u=n[6],f=[[],[],[],[]],d=t(l-i,u-r,s,o,h,c,a),g=0,p=d.length;g<p;g++)f[g][0]=d[g][0]+i,f[g][1]=d[g][1]+r,f[g][2]=d[g][2]+i,f[g][3]=d[g][3]+r,f[g][4]=d[g][4]+i,f[g][5]=d[g][5]+r,e.bezierCurveTo.apply(e,f[g])},fabric.util.getBoundsOfArc=function(e,i,n,s,o,a,h,c,l){for(var u,f=0,d=0,g=[],p=t(c-e,l-i,n,s,a,h,o),v=0,m=p.length;v<m;v++)u=r(f,d,p[v][0],p[v][1],p[v][2],p[v][3],p[v][4],p[v][5]),g.push({x:u[0].x+e,y:u[0].y+i}),g.push({x:u[1].x+e,y:u[1].y+i}),f=p[v][4],d=p[v][5];return g},fabric.util.getBoundsOfCurve=r}(),function(){function t(t,e){for(var i=s.call(arguments,2),r=[],n=0,o=t.length;n<o;n++)r[n]=i.length?t[n][e].apply(t[n],i):t[n][e].call(t[n]);return r}function e(t,e){return n(t,e,function(t,e){return t>=e})}function i(t,e){return n(t,e,function(t,e){return t<e})}function r(t,e){for(var i=t.length;i--;)t[i]=e;return t}function n(t,e,i){if(t&&0!==t.length){var r=t.length-1,n=e?t[r][e]:t[r];if(e)for(;r--;)i(t[r][e],n)&&(n=t[r][e]);else for(;r--;)i(t[r],n)&&(n=t[r]);return n}}var s=Array.prototype.slice;fabric.util.array={fill:r,invoke:t,min:i,max:e}}(),function(){function t(e,i,r){if(r)if(!fabric.isLikelyNode&&i instanceof Element)e=i;else if(i instanceof Array){e=[];for(var n=0,s=i.length;n<s;n++)e[n]=t({},i[n],r)}else if(i&&"object"==typeof i)for(var o in i)i.hasOwnProperty(o)&&(e[o]=t({},i[o],r));else e=i;else for(var o in i)e[o]=i[o];return e}function e(e,i){return t({},e,i)}fabric.util.object={extend:t,clone:e}}(),function(){function t(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})}function e(t,e){return t.charAt(0).toUpperCase()+(e?t.slice(1):t.slice(1).toLowerCase())}function i(t){return t.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&apos;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function r(t){for(var e,i=0,r=[],i=0;i<t.length;i++)(e=n(t,i))!==!1&&r.push(e);return r}function n(t,e){var i=t.charCodeAt(e);if(isNaN(i))return"";if(i<55296||i>57343)return t.charAt(e);if(55296<=i&&i<=56319){if(t.length<=e+1)throw"High surrogate without following low surrogate";var r=t.charCodeAt(e+1);if(56320>r||r>57343)throw"High surrogate without following low surrogate";return t.charAt(e)+t.charAt(e+1)}if(0===e)throw"Low surrogate without preceding high surrogate";var n=t.charCodeAt(e-1);if(55296>n||n>56319)throw"Low surrogate without preceding high surrogate";return!1}fabric.util.string={camelize:t,capitalize:e,escapeXml:i,graphemeSplit:r}}(),function(){function t(){}function e(t){for(var e=null,i=this;i.constructor.superclass;){var n=i.constructor.superclass.prototype[t];if(i[t]!==n){e=n;break}i=i.constructor.superclass.prototype}return e?arguments.length>1?e.apply(this,r.call(arguments,1)):e.call(this):console.log("tried to callSuper "+t+", method not found in prototype chain",this)}function i(){function i(){this.initialize.apply(this,arguments)}var s=null,a=r.call(arguments,0);"function"==typeof a[0]&&(s=a.shift()),i.superclass=s,i.subclasses=[],s&&(t.prototype=s.prototype,i.prototype=new t,s.subclasses.push(i));for(var h=0,c=a.length;h<c;h++)o(i,a[h],s);return i.prototype.initialize||(i.prototype.initialize=n),i.prototype.constructor=i,i.prototype.callSuper=e,i}var r=Array.prototype.slice,n=function(){},s=function(){for(var t in{toString:1})if("toString"===t)return!1;return!0}(),o=function(t,e,i){for(var r in e)r in t.prototype&&"function"==typeof t.prototype[r]&&(e[r]+"").indexOf("callSuper")>-1?t.prototype[r]=function(t){return function(){var r=this.constructor.superclass;this.constructor.superclass=i;var n=e[t].apply(this,arguments);if(this.constructor.superclass=r,"initialize"!==t)return n}}(r):t.prototype[r]=e[r],s&&(e.toString!==Object.prototype.toString&&(t.prototype.toString=e.toString),e.valueOf!==Object.prototype.valueOf&&(t.prototype.valueOf=e.valueOf))};fabric.util.createClass=i}(),function(){function t(t){var e,i,r=Array.prototype.slice.call(arguments,1),n=r.length;for(i=0;i<n;i++)if(e=typeof t[r[i]],!/^(?:function|object|unknown)$/.test(e))return!1;return!0}function e(t,e){return{handler:e,wrappedHandler:i(t,e)}}function i(t,e){return function(i){e.call(o(t),i||fabric.window.event)}}function r(t,e){return function(i){if(p[t]&&p[t][e])for(var r=p[t][e],n=0,s=r.length;n<s;n++)r[n].call(this,i||fabric.window.event)}}function n(t){t||(t=fabric.window.event);var e=t.target||(typeof t.srcElement!==h?t.srcElement:null),i=fabric.util.getScrollLeftTop(e);return{x:v(t)+i.left,y:m(t)+i.top}}function s(t,e,i){var r="touchend"===t.type?"changedTouches":"touches";return t[r]&&t[r][0]?t[r][0][e]-(t[r][0][e]-t[r][0][i])||t[i]:t[i]}var o,a,h="unknown",c=function(){var t=0;return function(e){return e.__uniqueID||(e.__uniqueID="uniqueID__"+t++)}}();!function(){var t={};o=function(e){return t[e]},a=function(e,i){t[e]=i}}();var l,u,f=t(fabric.document.documentElement,"addEventListener","removeEventListener")&&t(fabric.window,"addEventListener","removeEventListener"),d=t(fabric.document.documentElement,"attachEvent","detachEvent")&&t(fabric.window,"attachEvent","detachEvent"),g={},p={};f?(l=function(t,e,i,r){t.addEventListener(e,i,!d&&r)},u=function(t,e,i,r){t.removeEventListener(e,i,!d&&r)}):d?(l=function(t,i,r){var n=c(t);a(n,t),g[n]||(g[n]={}),g[n][i]||(g[n][i]=[]);var s=e(n,r);g[n][i].push(s),t.attachEvent("on"+i,s.wrappedHandler)},u=function(t,e,i){var r,n=c(t);if(g[n]&&g[n][e])for(var s=0,o=g[n][e].length;s<o;s++)r=g[n][e][s],r&&r.handler===i&&(t.detachEvent("on"+e,r.wrappedHandler),g[n][e][s]=null)}):(l=function(t,e,i){var n=c(t);if(p[n]||(p[n]={}),!p[n][e]){p[n][e]=[];var s=t["on"+e];s&&p[n][e].push(s),t["on"+e]=r(n,e)}p[n][e].push(i)},u=function(t,e,i){var r=c(t);if(p[r]&&p[r][e])for(var n=p[r][e],s=0,o=n.length;s<o;s++)n[s]===i&&n.splice(s,1)}),fabric.util.addListener=l,fabric.util.removeListener=u;var v=function(t){return t.clientX},m=function(t){return t.clientY};fabric.isTouchSupported&&(v=function(t){return s(t,"pageX","clientX")},m=function(t){return s(t,"pageY","clientY")}),fabric.util.getPointer=n,fabric.util.object.extend(fabric.util,fabric.Observable)}(),function(){function t(t,e){var i=t.style;if(!i)return t;if("string"==typeof e)return t.style.cssText+=";"+e,e.indexOf("opacity")>-1?s(t,e.match(/opacity:\s*(\d?\.?\d*)/)[1]):t;for(var r in e)if("opacity"===r)s(t,e[r]);else{var n="float"===r||"cssFloat"===r?"undefined"==typeof i.styleFloat?"cssFloat":"styleFloat":r;i[n]=e[r]}return t}var e=fabric.document.createElement("div"),i="string"==typeof e.style.opacity,r="string"==typeof e.style.filter,n=/alpha\s*\(\s*opacity\s*=\s*([^\)]+)\)/,s=function(t){return t};i?s=function(t,e){return t.style.opacity=e,t}:r&&(s=function(t,e){var i=t.style;return t.currentStyle&&!t.currentStyle.hasLayout&&(i.zoom=1),n.test(i.filter)?(e=e>=.9999?"":"alpha(opacity="+100*e+")",i.filter=i.filter.replace(n,e)):i.filter+=" alpha(opacity="+100*e+")",t}),fabric.util.setStyle=t}(),function(){function t(t){return"string"==typeof t?fabric.document.getElementById(t):t}function e(t,e){var i=fabric.document.createElement(t);for(var r in e)"class"===r?i.className=e[r]:"for"===r?i.htmlFor=e[r]:i.setAttribute(r,e[r]);return i}function i(t,e){t&&(" "+t.className+" ").indexOf(" "+e+" ")===-1&&(t.className+=(t.className?" ":"")+e)}function r(t,i,r){return"string"==typeof i&&(i=e(i,r)),t.parentNode&&t.parentNode.replaceChild(i,t),i.appendChild(t),i}function n(t){for(var e=0,i=0,r=fabric.document.documentElement,n=fabric.document.body||{scrollLeft:0,scrollTop:0};t&&(t.parentNode||t.host)&&(t=t.parentNode||t.host,t===fabric.document?(e=n.scrollLeft||r.scrollLeft||0,i=n.scrollTop||r.scrollTop||0):(e+=t.scrollLeft||0,i+=t.scrollTop||0),1!==t.nodeType||"fixed"!==fabric.util.getElementStyle(t,"position")););return{left:e,top:i}}function s(t){var e,i,r=t&&t.ownerDocument,s={left:0,top:0},o={left:0,top:0},a={borderLeftWidth:"left",borderTopWidth:"top",paddingLeft:"left",paddingTop:"top"};if(!r)return o;for(var h in a)o[a[h]]+=parseInt(c(t,h),10)||0;return e=r.documentElement,"undefined"!=typeof t.getBoundingClientRect&&(s=t.getBoundingClientRect()),i=n(t),{left:s.left+i.left-(e.clientLeft||0)+o.left,top:s.top+i.top-(e.clientTop||0)+o.top}}var o,a=Array.prototype.slice,h=function(t){return a.call(t,0)};try{o=h(fabric.document.childNodes)instanceof Array}catch(t){}o||(h=function(t){for(var e=new Array(t.length),i=t.length;i--;)e[i]=t[i];return e});var c;c=fabric.document.defaultView&&fabric.document.defaultView.getComputedStyle?function(t,e){var i=fabric.document.defaultView.getComputedStyle(t,null);return i?i[e]:void 0}:function(t,e){var i=t.style[e];return!i&&t.currentStyle&&(i=t.currentStyle[e]),i},function(){function t(t){return"undefined"!=typeof t.onselectstart&&(t.onselectstart=fabric.util.falseFunction),r?t.style[r]="none":"string"==typeof t.unselectable&&(t.unselectable="on"),t}function e(t){return"undefined"!=typeof t.onselectstart&&(t.onselectstart=null),r?t.style[r]="":"string"==typeof t.unselectable&&(t.unselectable=""),t}var i=fabric.document.documentElement.style,r="userSelect"in i?"userSelect":"MozUserSelect"in i?"MozUserSelect":"WebkitUserSelect"in i?"WebkitUserSelect":"KhtmlUserSelect"in i?"KhtmlUserSelect":"";fabric.util.makeElementUnselectable=t,fabric.util.makeElementSelectable=e}(),function(){function t(t,e){var i=fabric.document.getElementsByTagName("head")[0],r=fabric.document.createElement("script"),n=!0;r.onload=r.onreadystatechange=function(t){if(n){if("string"==typeof this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState)return;n=!1,e(t||fabric.window.event),r=r.onload=r.onreadystatechange=null}},r.src=t,i.appendChild(r)}fabric.util.getScript=t}(),fabric.util.getById=t,fabric.util.toArray=h,fabric.util.makeElement=e,fabric.util.addClass=i,fabric.util.wrapElement=r,fabric.util.getScrollLeftTop=n,fabric.util.getElementOffset=s,fabric.util.getElementStyle=c}(),function(){function t(t,e){return t+(/\?/.test(t)?"&":"?")+e}function e(){}function i(i,n){n||(n={});var s=n.method?n.method.toUpperCase():"GET",o=n.onComplete||function(){},a=r(),h=n.body||n.parameters;return a.onreadystatechange=function(){4===a.readyState&&(o(a),a.onreadystatechange=e)},"GET"===s&&(h=null,"string"==typeof n.parameters&&(i=t(i,n.parameters))),a.open(s,i,!0),"POST"!==s&&"PUT"!==s||a.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),a.send(h),a}var r=function(){for(var t=[function(){return new ActiveXObject("Microsoft.XMLHTTP")},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml2.XMLHTTP.3.0")},function(){return new XMLHttpRequest}],e=t.length;e--;)try{var i=t[e]();if(i)return t[e]}catch(t){}}();fabric.util.request=i}(),fabric.log=function(){},fabric.warn=function(){},"undefined"!=typeof console&&["log","warn"].forEach(function(t){"undefined"!=typeof console[t]&&"function"==typeof console[t].apply&&(fabric[t]=function(){return console[t].apply(console,arguments)})}),function(){function t(t){e(function(i){t||(t={});var r,n=i||+new Date,s=t.duration||500,o=n+s,a=t.onChange||function(){},h=t.abort||function(){return!1},c=t.easing||function(t,e,i,r){return-i*Math.cos(t/r*(Math.PI/2))+i+e},l="startValue"in t?t.startValue:0,u="endValue"in t?t.endValue:100,f=t.byValue||u-l;t.onStart&&t.onStart(),function i(u){r=u||+new Date;var d=r>o?s:r-n;return h()?void(t.onComplete&&t.onComplete()):(a(c(d,l,f,s)),r>o?void(t.onComplete&&t.onComplete()):void e(i))}(n)})}function e(){return i.apply(fabric.window,arguments)}var i=fabric.window.requestAnimationFrame||fabric.window.webkitRequestAnimationFrame||fabric.window.mozRequestAnimationFrame||fabric.window.oRequestAnimationFrame||fabric.window.msRequestAnimationFrame||function(t){fabric.window.setTimeout(t,1e3/60)};fabric.util.animate=t,fabric.util.requestAnimFrame=e}(),function(){function t(t,e,i){var r="rgba("+parseInt(t[0]+i*(e[0]-t[0]),10)+","+parseInt(t[1]+i*(e[1]-t[1]),10)+","+parseInt(t[2]+i*(e[2]-t[2]),10);return r+=","+(t&&e?parseFloat(t[3]+i*(e[3]-t[3])):1),r+=")"}function e(e,i,r,n){var s=new fabric.Color(e).getSource(),o=new fabric.Color(i).getSource();n=n||{},fabric.util.animate(fabric.util.object.extend(n,{duration:r||500,startValue:s,endValue:o,byValue:o,easing:function(e,i,r,s){var o=n.colorEasing?n.colorEasing(e,s):1-Math.cos(e/s*(Math.PI/2));return t(i,r,o)}}))}fabric.util.animateColor=e}(),function(){function t(t,e,i,r){return t<Math.abs(e)?(t=e,r=i/4):r=0===e&&0===t?i/(2*Math.PI)*Math.asin(1):i/(2*Math.PI)*Math.asin(e/t),{a:t,c:e,p:i,s:r}}function e(t,e,i){return t.a*Math.pow(2,10*(e-=1))*Math.sin((e*i-t.s)*(2*Math.PI)/t.p)}function i(t,e,i,r){return i*((t=t/r-1)*t*t+1)+e}function r(t,e,i,r){return t/=r/2,t<1?i/2*t*t*t+e:i/2*((t-=2)*t*t+2)+e}function n(t,e,i,r){return i*(t/=r)*t*t*t+e}function s(t,e,i,r){return-i*((t=t/r-1)*t*t*t-1)+e}function o(t,e,i,r){return t/=r/2,t<1?i/2*t*t*t*t+e:-i/2*((t-=2)*t*t*t-2)+e}function a(t,e,i,r){return i*(t/=r)*t*t*t*t+e}function h(t,e,i,r){return i*((t=t/r-1)*t*t*t*t+1)+e}function c(t,e,i,r){return t/=r/2,t<1?i/2*t*t*t*t*t+e:i/2*((t-=2)*t*t*t*t+2)+e}function l(t,e,i,r){return-i*Math.cos(t/r*(Math.PI/2))+i+e}function u(t,e,i,r){return i*Math.sin(t/r*(Math.PI/2))+e}function f(t,e,i,r){return-i/2*(Math.cos(Math.PI*t/r)-1)+e}function d(t,e,i,r){return 0===t?e:i*Math.pow(2,10*(t/r-1))+e}function g(t,e,i,r){return t===r?e+i:i*(-Math.pow(2,-10*t/r)+1)+e}function p(t,e,i,r){return 0===t?e:t===r?e+i:(t/=r/2,t<1?i/2*Math.pow(2,10*(t-1))+e:i/2*(-Math.pow(2,-10*--t)+2)+e)}function v(t,e,i,r){return-i*(Math.sqrt(1-(t/=r)*t)-1)+e}function m(t,e,i,r){return i*Math.sqrt(1-(t=t/r-1)*t)+e}function b(t,e,i,r){return t/=r/2,t<1?-i/2*(Math.sqrt(1-t*t)-1)+e:i/2*(Math.sqrt(1-(t-=2)*t)+1)+e}function _(i,r,n,s){var o=1.70158,a=0,h=n;if(0===i)return r;if(i/=s,1===i)return r+n;a||(a=.3*s);var c=t(h,n,a,o);return-e(c,i,s)+r}function y(e,i,r,n){var s=1.70158,o=0,a=r;if(0===e)return i;if(e/=n,1===e)return i+r;o||(o=.3*n);var h=t(a,r,o,s);return h.a*Math.pow(2,-10*e)*Math.sin((e*n-h.s)*(2*Math.PI)/h.p)+h.c+i}function x(i,r,n,s){var o=1.70158,a=0,h=n;if(0===i)return r;if(i/=s/2,2===i)return r+n;a||(a=s*(.3*1.5));var c=t(h,n,a,o);return i<1?-.5*e(c,i,s)+r:c.a*Math.pow(2,-10*(i-=1))*Math.sin((i*s-c.s)*(2*Math.PI)/c.p)*.5+c.c+r}function C(t,e,i,r,n){return void 0===n&&(n=1.70158),i*(t/=r)*t*((n+1)*t-n)+e}function S(t,e,i,r,n){return void 0===n&&(n=1.70158),i*((t=t/r-1)*t*((n+1)*t+n)+1)+e}function T(t,e,i,r,n){return void 0===n&&(n=1.70158),t/=r/2,t<1?i/2*(t*t*(((n*=1.525)+1)*t-n))+e:i/2*((t-=2)*t*(((n*=1.525)+1)*t+n)+2)+e}function w(t,e,i,r){return i-O(r-t,0,i,r)+e}function O(t,e,i,r){return(t/=r)<1/2.75?i*(7.5625*t*t)+e:t<2/2.75?i*(7.5625*(t-=1.5/2.75)*t+.75)+e:t<2.5/2.75?i*(7.5625*(t-=2.25/2.75)*t+.9375)+e:i*(7.5625*(t-=2.625/2.75)*t+.984375)+e}function k(t,e,i,r){return t<r/2?.5*w(2*t,0,i,r)+e:.5*O(2*t-r,0,i,r)+.5*i+e}fabric.util.ease={easeInQuad:function(t,e,i,r){return i*(t/=r)*t+e},easeOutQuad:function(t,e,i,r){return-i*(t/=r)*(t-2)+e},easeInOutQuad:function(t,e,i,r){return t/=r/2,t<1?i/2*t*t+e:-i/2*(--t*(t-2)-1)+e},easeInCubic:function(t,e,i,r){return i*(t/=r)*t*t+e},easeOutCubic:i,easeInOutCubic:r,easeInQuart:n,easeOutQuart:s,easeInOutQuart:o,easeInQuint:a,easeOutQuint:h,easeInOutQuint:c,easeInSine:l,easeOutSine:u,easeInOutSine:f,easeInExpo:d,easeOutExpo:g,easeInOutExpo:p,easeInCirc:v,easeOutCirc:m,easeInOutCirc:b,easeInElastic:_,easeOutElastic:y,easeInOutElastic:x,easeInBack:C,easeOutBack:S,easeInOutBack:T,easeInBounce:w,easeOutBounce:O,easeInOutBounce:k}}(),function(t){"use strict";function e(t){return t in w?w[t]:t}function i(t,e,i,r){var n,s="[object Array]"===Object.prototype.toString.call(e);return"fill"!==t&&"stroke"!==t||"none"!==e?"strokeDashArray"===t?e="none"===e?null:e.replace(/,/g," ").split(/\s+/).map(function(t){return parseFloat(t)}):"transformMatrix"===t?e=i&&i.transformMatrix?y(i.transformMatrix,p.parseTransformAttribute(e)):p.parseTransformAttribute(e):"visible"===t?(e="none"!==e&&"hidden"!==e,i&&i.visible===!1&&(e=!1)):"opacity"===t?(e=parseFloat(e),i&&"undefined"!=typeof i.opacity&&(e*=i.opacity)):"originX"===t?e="start"===e?"left":"end"===e?"right":"center":n=s?e.map(_):_(e,r):e="",!s&&isNaN(n)?e:n}function r(t){for(var e in O)if("undefined"!=typeof t[O[e]]&&""!==t[e]){if("undefined"==typeof t[e]){if(!p.Object.prototype[e])continue;t[e]=p.Object.prototype[e]}if(0!==t[e].indexOf("url(")){var i=new p.Color(t[e]);t[e]=i.setAlpha(b(i.getAlpha()*t[O[e]],2)).toRgba()}}return t}function n(t,e){for(var i,r,n=[],s=0;s<e.length;s++)i=e[s],r=t.getElementsByTagName(i),n=n.concat(Array.prototype.slice.call(r));return n}function s(t,e){var i,r;t.replace(/;\s*$/,"").split(";").forEach(function(t){var n=t.split(":");i=n[0].trim().toLowerCase(),r=n[1].trim(),e[i]=r})}function o(t,e){var i,r;for(var n in t)"undefined"!=typeof t[n]&&(i=n.toLowerCase(),r=t[n],e[i]=r)}function a(t,e){var i={};for(var r in p.cssRules[e])if(h(t,r.split(" ")))for(var n in p.cssRules[e][r])i[n]=p.cssRules[e][r][n];return i}function h(t,e){var i,r=!0;return i=l(t,e.pop()),i&&e.length&&(r=c(t,e)),i&&r&&0===e.length}function c(t,e){for(var i,r=!0;t.parentNode&&1===t.parentNode.nodeType&&e.length;)r&&(i=e.pop()),t=t.parentNode,r=l(t,i);return 0===e.length}function l(t,e){var i,r=t.nodeName,n=t.getAttribute("class"),s=t.getAttribute("id");if(i=new RegExp("^"+r,"i"),e=e.replace(i,""),s&&e.length&&(i=new RegExp("#"+s+"(?![a-zA-Z\\-]+)","i"),e=e.replace(i,"")),n&&e.length){n=n.split(" ");for(var o=n.length;o--;)i=new RegExp("\\."+n[o]+"(?![a-zA-Z\\-]+)","i"),e=e.replace(i,"")}return 0===e.length}function u(t,e){var i;if(t.getElementById&&(i=t.getElementById(e)),i)return i;var r,n,s=t.getElementsByTagName("*");for(n=0;n<s.length;n++)if(r=s[n],e===r.getAttribute("id"))return r}function f(t){for(var e=n(t,["use","svg:use"]),i=0;e.length&&i<e.length;){var r,s,o,a,h,c=e[i],l=c.getAttribute("xlink:href").substr(1),f=c.getAttribute("x")||0,g=c.getAttribute("y")||0,p=u(t,l).cloneNode(!0),v=(p.getAttribute("transform")||"")+" translate("+f+", "+g+")",m=e.length;if(d(p),/^svg$/i.test(p.nodeName)){var b=p.ownerDocument.createElement("g");for(o=0,a=p.attributes,h=a.length;o<h;o++)s=a.item(o),b.setAttribute(s.nodeName,s.nodeValue);for(;p.firstChild;)b.appendChild(p.firstChild);p=b}for(o=0,a=c.attributes,h=a.length;o<h;o++)s=a.item(o),"x"!==s.nodeName&&"y"!==s.nodeName&&"xlink:href"!==s.nodeName&&("transform"===s.nodeName?v=s.nodeValue+" "+v:p.setAttribute(s.nodeName,s.nodeValue));p.setAttribute("transform",v),p.setAttribute("instantiated_by_use","1"),p.removeAttribute("id"),r=c.parentNode,r.replaceChild(p,c),e.length===m&&i++}}function d(t){var e,i,r,n,s=t.getAttribute("viewBox"),o=1,a=1,h=0,c=0,l=t.getAttribute("width"),u=t.getAttribute("height"),f=t.getAttribute("x")||0,d=t.getAttribute("y")||0,g=t.getAttribute("preserveAspectRatio")||"",v=!s||!C.test(t.nodeName)||!(s=s.match(k)),m=!l||!u||"100%"===l||"100%"===u,b=v&&m,y={},x="";if(y.width=0,y.height=0,y.toBeParsed=b,b)return y;if(v)return y.width=_(l),y.height=_(u),y;if(h=-parseFloat(s[1]),c=-parseFloat(s[2]),e=parseFloat(s[3]),i=parseFloat(s[4]),m?(y.width=e,y.height=i):(y.width=_(l),y.height=_(u),o=y.width/e,a=y.height/i),g=p.util.parsePreserveAspectRatioAttribute(g),"none"!==g.alignX&&(a=o=o>a?a:o),1===o&&1===a&&0===h&&0===c&&0===f&&0===d)return y;if((f||d)&&(x=" translate("+_(f)+" "+_(d)+") "),r=x+" matrix("+o+" 0 0 "+a+" "+h*o+" "+c*a+") ","svg"===t.nodeName){for(n=t.ownerDocument.createElement("g");t.firstChild;)n.appendChild(t.firstChild);t.appendChild(n)}else n=t,r=n.getAttribute("transform")+r;return n.setAttribute("transform",r),y}function g(t,e){for(;t&&(t=t.parentNode);)if(t.nodeName&&e.test(t.nodeName.replace("svg:",""))&&!t.getAttribute("instantiated_by_use"))return!0;return!1}var p=t.fabric||(t.fabric={}),v=p.util.object.extend,m=p.util.object.clone,b=p.util.toFixed,_=p.util.parseUnit,y=p.util.multiplyTransformMatrices,x=/^(path|circle|polygon|polyline|ellipse|rect|line|image|text)$/i,C=/^(symbol|image|marker|pattern|view|svg)$/i,S=/^(?:pattern|defs|symbol|metadata|clipPath|mask)$/i,T=/^(symbol|g|a|svg)$/i,w={cx:"left",x:"left",r:"radius",cy:"top",y:"top",display:"visible",visibility:"visible",transform:"transformMatrix","fill-opacity":"fillOpacity","fill-rule":"fillRule","font-family":"fontFamily","font-size":"fontSize","font-style":"fontStyle","font-weight":"fontWeight","stroke-dasharray":"strokeDashArray","stroke-linecap":"strokeLineCap","stroke-linejoin":"strokeLineJoin","stroke-miterlimit":"strokeMiterLimit",
"stroke-opacity":"strokeOpacity","stroke-width":"strokeWidth","text-decoration":"textDecoration","text-anchor":"originX",opacity:"opacity"},O={stroke:"strokeOpacity",fill:"fillOpacity"};p.cssRules={},p.gradientDefs={},p.parseTransformAttribute=function(){function t(t,e){var i=Math.cos(e[0]),r=Math.sin(e[0]),n=0,s=0;3===e.length&&(n=e[1],s=e[2]),t[0]=i,t[1]=r,t[2]=-r,t[3]=i,t[4]=n-(i*n-r*s),t[5]=s-(r*n+i*s)}function e(t,e){var i=e[0],r=2===e.length?e[1]:e[0];t[0]=i,t[3]=r}function i(t,e,i){t[i]=Math.tan(p.util.degreesToRadians(e[0]))}function r(t,e){t[4]=e[0],2===e.length&&(t[5]=e[1])}var n=[1,0,0,1,0,0],s=p.reNum,o="(?:\\s+,?\\s*|,\\s*)",a="(?:(skewX)\\s*\\(\\s*("+s+")\\s*\\))",h="(?:(skewY)\\s*\\(\\s*("+s+")\\s*\\))",c="(?:(rotate)\\s*\\(\\s*("+s+")(?:"+o+"("+s+")"+o+"("+s+"))?\\s*\\))",l="(?:(scale)\\s*\\(\\s*("+s+")(?:"+o+"("+s+"))?\\s*\\))",u="(?:(translate)\\s*\\(\\s*("+s+")(?:"+o+"("+s+"))?\\s*\\))",f="(?:(matrix)\\s*\\(\\s*("+s+")"+o+"("+s+")"+o+"("+s+")"+o+"("+s+")"+o+"("+s+")"+o+"("+s+")\\s*\\))",d="(?:"+f+"|"+u+"|"+l+"|"+c+"|"+a+"|"+h+")",g="(?:"+d+"(?:"+o+"*"+d+")*)",v="^\\s*(?:"+g+"?)\\s*$",m=new RegExp(v),b=new RegExp(d,"g");return function(s){var o=n.concat(),a=[];if(!s||s&&!m.test(s))return o;s.replace(b,function(s){var h=new RegExp(d).exec(s).filter(function(t){return!!t}),c=h[1],l=h.slice(2).map(parseFloat);switch(c){case"translate":r(o,l);break;case"rotate":l[0]=p.util.degreesToRadians(l[0]),t(o,l);break;case"scale":e(o,l);break;case"skewX":i(o,l,2);break;case"skewY":i(o,l,1);break;case"matrix":o=l}a.push(o.concat()),o=n.concat()});for(var h=a[0];a.length>1;)a.shift(),h=p.util.multiplyTransformMatrices(h,a[0]);return h}}();var k=new RegExp("^\\s*("+p.reNum+"+)\\s*,?\\s*("+p.reNum+"+)\\s*,?\\s*("+p.reNum+"+)\\s*,?\\s*("+p.reNum+"+)\\s*$");p.parseSVGDocument=function(t,e,i,r){if(t){f(t);var n=p.Object.__uid++,s=d(t),o=p.util.toArray(t.getElementsByTagName("*"));if(s.crossOrigin=r&&r.crossOrigin,s.svgUid=n,0===o.length&&p.isLikelyNode){o=t.selectNodes('//*[name(.)!="svg"]');for(var a=[],h=0,c=o.length;h<c;h++)a[h]=o[h];o=a}var l=o.filter(function(t){return d(t),x.test(t.nodeName.replace("svg:",""))&&!g(t,S)});if(!l||l&&!l.length)return void(e&&e([],{}));p.gradientDefs[n]=p.getGradientDefs(t),p.cssRules[n]=p.getCSSRules(t),p.parseElements(l,function(t){e&&e(t,s)},m(s),i,r)}};var j=new RegExp("(normal|italic)?\\s*(normal|small-caps)?\\s*(normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)?\\s*("+p.reNum+"(?:px|cm|mm|em|pt|pc|in)*)(?:\\/(normal|"+p.reNum+"))?\\s+(.*)");v(p,{parseFontDeclaration:function(t,e){var i=t.match(j);if(i){var r=i[1],n=i[3],s=i[4],o=i[5],a=i[6];r&&(e.fontStyle=r),n&&(e.fontWeight=isNaN(parseFloat(n))?n:parseFloat(n)),s&&(e.fontSize=_(s)),a&&(e.fontFamily=a),o&&(e.lineHeight="normal"===o?1:o)}},getGradientDefs:function(t){var e,i,r,s=["linearGradient","radialGradient","svg:linearGradient","svg:radialGradient"],o=n(t,s),a=0,h={},c={};for(a=o.length;a--;)e=o[a],r=e.getAttribute("xlink:href"),i=e.getAttribute("id"),r&&(c[i]=r.substr(1)),h[i]=e;for(i in c){var l=h[c[i]].cloneNode(!0);for(e=h[i];l.firstChild;)e.appendChild(l.firstChild)}return h},parseAttributes:function(t,n,s){if(t){var o,h,c={};"undefined"==typeof s&&(s=t.getAttribute("svgUid")),t.parentNode&&T.test(t.parentNode.nodeName)&&(c=p.parseAttributes(t.parentNode,n,s)),h=c&&c.fontSize||t.getAttribute("font-size")||p.Text.DEFAULT_SVG_FONT_SIZE;var l=n.reduce(function(e,i){return o=t.getAttribute(i),o&&(e[i]=o),e},{});l=v(l,v(a(t,s),p.parseStyleAttribute(t)));var u,f,d={};for(var g in l)u=e(g),f=i(u,l[g],c,h),d[u]=f;d&&d.font&&p.parseFontDeclaration(d.font,d);var m=v(c,d);return T.test(t.nodeName)?m:r(m)}},parseElements:function(t,e,i,r,n){new p.ElementsParser(t,e,i,r,n).parse()},parseStyleAttribute:function(t){var e={},i=t.getAttribute("style");return i?("string"==typeof i?s(i,e):o(i,e),e):e},parsePointsAttribute:function(t){if(!t)return null;t=t.replace(/,/g," ").trim(),t=t.split(/\s+/);var e,i,r=[];for(e=0,i=t.length;e<i;e+=2)r.push({x:parseFloat(t[e]),y:parseFloat(t[e+1])});return r},getCSSRules:function(t){for(var e,i=t.getElementsByTagName("style"),r={},n=0,s=i.length;n<s;n++){var o=i[n].textContent||i[n].text;o=o.replace(/\/\*[\s\S]*?\*\//g,""),""!==o.trim()&&(e=o.match(/[^{]*\{[\s\S]*?\}/g),e=e.map(function(t){return t.trim()}),e.forEach(function(t){for(var e=t.match(/([\s\S]*?)\s*\{([^}]*)\}/),i={},n=e[2].trim(),s=n.replace(/;$/,"").split(/\s*;\s*/),o=0,a=s.length;o<a;o++){var h=s[o].split(/\s*:\s*/),c=h[0],l=h[1];i[c]=l}t=e[1],t.split(",").forEach(function(t){t=t.replace(/^svg/i,"").trim(),""!==t&&(r[t]?p.util.object.extend(r[t],i):r[t]=p.util.object.clone(i))})}))}return r},loadSVGFromURL:function(t,e,i,r){function n(t){var n=t.responseXML;n&&!n.documentElement&&p.window.ActiveXObject&&t.responseText&&(n=new ActiveXObject("Microsoft.XMLDOM"),n.async="false",n.loadXML(t.responseText.replace(/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i,""))),n&&n.documentElement||e&&e(null),p.parseSVGDocument(n.documentElement,function(t,i){e&&e(t,i)},i,r)}t=t.replace(/^\n\s*/,"").trim(),new p.util.request(t,{method:"get",onComplete:n})},loadSVGFromString:function(t,e,i,r){t=t.trim();var n;if("undefined"!=typeof DOMParser){var s=new DOMParser;s&&s.parseFromString&&(n=s.parseFromString(t,"text/xml"))}else p.window.ActiveXObject&&(n=new ActiveXObject("Microsoft.XMLDOM"),n.async="false",n.loadXML(t.replace(/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i,"")));p.parseSVGDocument(n.documentElement,function(t,i){e(t,i)},i,r)}})}("undefined"!=typeof exports?exports:this),fabric.ElementsParser=function(t,e,i,r,n){this.elements=t,this.callback=e,this.options=i,this.reviver=r,this.svgUid=i&&i.svgUid||0,this.parsingOptions=n},fabric.ElementsParser.prototype.parse=function(){this.instances=new Array(this.elements.length),this.numElements=this.elements.length,this.createObjects()},fabric.ElementsParser.prototype.createObjects=function(){for(var t=0,e=this.elements.length;t<e;t++)this.elements[t].setAttribute("svgUid",this.svgUid),function(t,e){setTimeout(function(){t.createObject(t.elements[e],e)},0)}(this,t)},fabric.ElementsParser.prototype.createObject=function(t,e){var i=fabric[fabric.util.string.capitalize(t.tagName.replace("svg:",""))];if(i&&i.fromElement)try{this._createObject(i,t,e)}catch(t){fabric.log(t)}else this.checkIfDone()},fabric.ElementsParser.prototype._createObject=function(t,e,i){if(t.async)t.fromElement(e,this.createCallback(i,e),this.options);else{var r=t.fromElement(e,this.options);this.resolveGradient(r,"fill"),this.resolveGradient(r,"stroke"),r._removeTransformMatrix(),this.reviver&&this.reviver(e,r),this.instances[i]=r,this.checkIfDone()}},fabric.ElementsParser.prototype.createCallback=function(t,e){var i=this;return function(r){i.resolveGradient(r,"fill"),i.resolveGradient(r,"stroke"),r._removeTransformMatrix(),i.reviver&&i.reviver(e,r),i.instances[t]=r,i.checkIfDone()}},fabric.ElementsParser.prototype.resolveGradient=function(t,e){var i=t.get(e);if(/^url\(/.test(i)){var r=i.slice(5,i.length-1);fabric.gradientDefs[this.svgUid][r]&&t.set(e,fabric.Gradient.fromElement(fabric.gradientDefs[this.svgUid][r],t))}},fabric.ElementsParser.prototype.checkIfDone=function(){0===--this.numElements&&(this.instances=this.instances.filter(function(t){return null!=t}),this.callback(this.instances))},function(t){"use strict";function e(t,e){this.x=t,this.y=e}var i=t.fabric||(t.fabric={});return i.Point?void i.warn("fabric.Point is already defined"):(i.Point=e,void(e.prototype={type:"point",constructor:e,add:function(t){return new e(this.x+t.x,this.y+t.y)},addEquals:function(t){return this.x+=t.x,this.y+=t.y,this},scalarAdd:function(t){return new e(this.x+t,this.y+t)},scalarAddEquals:function(t){return this.x+=t,this.y+=t,this},subtract:function(t){return new e(this.x-t.x,this.y-t.y)},subtractEquals:function(t){return this.x-=t.x,this.y-=t.y,this},scalarSubtract:function(t){return new e(this.x-t,this.y-t)},scalarSubtractEquals:function(t){return this.x-=t,this.y-=t,this},multiply:function(t){return new e(this.x*t,this.y*t)},multiplyEquals:function(t){return this.x*=t,this.y*=t,this},divide:function(t){return new e(this.x/t,this.y/t)},divideEquals:function(t){return this.x/=t,this.y/=t,this},eq:function(t){return this.x===t.x&&this.y===t.y},lt:function(t){return this.x<t.x&&this.y<t.y},lte:function(t){return this.x<=t.x&&this.y<=t.y},gt:function(t){return this.x>t.x&&this.y>t.y},gte:function(t){return this.x>=t.x&&this.y>=t.y},lerp:function(t,i){return"undefined"==typeof i&&(i=.5),i=Math.max(Math.min(1,i),0),new e(this.x+(t.x-this.x)*i,this.y+(t.y-this.y)*i)},distanceFrom:function(t){var e=this.x-t.x,i=this.y-t.y;return Math.sqrt(e*e+i*i)},midPointFrom:function(t){return this.lerp(t)},min:function(t){return new e(Math.min(this.x,t.x),Math.min(this.y,t.y))},max:function(t){return new e(Math.max(this.x,t.x),Math.max(this.y,t.y))},toString:function(){return this.x+","+this.y},setXY:function(t,e){return this.x=t,this.y=e,this},setX:function(t){return this.x=t,this},setY:function(t){return this.y=t,this},setFromPoint:function(t){return this.x=t.x,this.y=t.y,this},swap:function(t){var e=this.x,i=this.y;this.x=t.x,this.y=t.y,t.x=e,t.y=i},clone:function(){return new e(this.x,this.y)}}))}("undefined"!=typeof exports?exports:this),function(t){"use strict";function e(t){this.status=t,this.points=[]}var i=t.fabric||(t.fabric={});return i.Intersection?void i.warn("fabric.Intersection is already defined"):(i.Intersection=e,i.Intersection.prototype={constructor:e,appendPoint:function(t){return this.points.push(t),this},appendPoints:function(t){return this.points=this.points.concat(t),this}},i.Intersection.intersectLineLine=function(t,r,n,s){var o,a=(s.x-n.x)*(t.y-n.y)-(s.y-n.y)*(t.x-n.x),h=(r.x-t.x)*(t.y-n.y)-(r.y-t.y)*(t.x-n.x),c=(s.y-n.y)*(r.x-t.x)-(s.x-n.x)*(r.y-t.y);if(0!==c){var l=a/c,u=h/c;0<=l&&l<=1&&0<=u&&u<=1?(o=new e("Intersection"),o.appendPoint(new i.Point(t.x+l*(r.x-t.x),t.y+l*(r.y-t.y)))):o=new e}else o=new e(0===a||0===h?"Coincident":"Parallel");return o},i.Intersection.intersectLinePolygon=function(t,i,r){for(var n,s,o,a=new e,h=r.length,c=0;c<h;c++)n=r[c],s=r[(c+1)%h],o=e.intersectLineLine(t,i,n,s),a.appendPoints(o.points);return a.points.length>0&&(a.status="Intersection"),a},i.Intersection.intersectPolygonPolygon=function(t,i){for(var r=new e,n=t.length,s=0;s<n;s++){var o=t[s],a=t[(s+1)%n],h=e.intersectLinePolygon(o,a,i);r.appendPoints(h.points)}return r.points.length>0&&(r.status="Intersection"),r},void(i.Intersection.intersectPolygonRectangle=function(t,r,n){var s=r.min(n),o=r.max(n),a=new i.Point(o.x,s.y),h=new i.Point(s.x,o.y),c=e.intersectLinePolygon(s,a,t),l=e.intersectLinePolygon(a,o,t),u=e.intersectLinePolygon(o,h,t),f=e.intersectLinePolygon(h,s,t),d=new e;return d.appendPoints(c.points),d.appendPoints(l.points),d.appendPoints(u.points),d.appendPoints(f.points),d.points.length>0&&(d.status="Intersection"),d}))}("undefined"!=typeof exports?exports:this),function(t){"use strict";function e(t){t?this._tryParsingColor(t):this.setSource([0,0,0,1])}function i(t,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?t+6*(e-t)*i:i<.5?e:i<2/3?t+(e-t)*(2/3-i)*6:t}var r=t.fabric||(t.fabric={});return r.Color?void r.warn("fabric.Color is already defined."):(r.Color=e,r.Color.prototype={_tryParsingColor:function(t){var i;t in e.colorNameMap&&(t=e.colorNameMap[t]),"transparent"===t&&(i=[255,255,255,0]),i||(i=e.sourceFromHex(t)),i||(i=e.sourceFromRgb(t)),i||(i=e.sourceFromHsl(t)),i||(i=[0,0,0,1]),i&&this.setSource(i)},_rgbToHsl:function(t,e,i){t/=255,e/=255,i/=255;var n,s,o,a=r.util.array.max([t,e,i]),h=r.util.array.min([t,e,i]);if(o=(a+h)/2,a===h)n=s=0;else{var c=a-h;switch(s=o>.5?c/(2-a-h):c/(a+h),a){case t:n=(e-i)/c+(e<i?6:0);break;case e:n=(i-t)/c+2;break;case i:n=(t-e)/c+4}n/=6}return[Math.round(360*n),Math.round(100*s),Math.round(100*o)]},getSource:function(){return this._source},setSource:function(t){this._source=t},toRgb:function(){var t=this.getSource();return"rgb("+t[0]+","+t[1]+","+t[2]+")"},toRgba:function(){var t=this.getSource();return"rgba("+t[0]+","+t[1]+","+t[2]+","+t[3]+")"},toHsl:function(){var t=this.getSource(),e=this._rgbToHsl(t[0],t[1],t[2]);return"hsl("+e[0]+","+e[1]+"%,"+e[2]+"%)"},toHsla:function(){var t=this.getSource(),e=this._rgbToHsl(t[0],t[1],t[2]);return"hsla("+e[0]+","+e[1]+"%,"+e[2]+"%,"+t[3]+")"},toHex:function(){var t,e,i,r=this.getSource();return t=r[0].toString(16),t=1===t.length?"0"+t:t,e=r[1].toString(16),e=1===e.length?"0"+e:e,i=r[2].toString(16),i=1===i.length?"0"+i:i,t.toUpperCase()+e.toUpperCase()+i.toUpperCase()},toHexa:function(){var t,e=this.getSource();return t=255*e[3],t=t.toString(16),t=1===t.length?"0"+t:t,this.toHex()+t.toUpperCase()},getAlpha:function(){return this.getSource()[3]},setAlpha:function(t){var e=this.getSource();return e[3]=t,this.setSource(e),this},toGrayscale:function(){var t=this.getSource(),e=parseInt((.3*t[0]+.59*t[1]+.11*t[2]).toFixed(0),10),i=t[3];return this.setSource([e,e,e,i]),this},toBlackWhite:function(t){var e=this.getSource(),i=(.3*e[0]+.59*e[1]+.11*e[2]).toFixed(0),r=e[3];return t=t||127,i=Number(i)<Number(t)?0:255,this.setSource([i,i,i,r]),this},overlayWith:function(t){t instanceof e||(t=new e(t));for(var i=[],r=this.getAlpha(),n=.5,s=this.getSource(),o=t.getSource(),a=0;a<3;a++)i.push(Math.round(s[a]*(1-n)+o[a]*n));return i[3]=r,this.setSource(i),this}},r.Color.reRGBa=/^rgba?\(\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/,r.Color.reHSLa=/^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3}\%)\s*,\s*(\d{1,3}\%)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/,r.Color.reHex=/^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i,r.Color.colorNameMap={aqua:"#00FFFF",black:"#000000",blue:"#0000FF",fuchsia:"#FF00FF",gray:"#808080",grey:"#808080",green:"#008000",lime:"#00FF00",maroon:"#800000",navy:"#000080",olive:"#808000",orange:"#FFA500",purple:"#800080",red:"#FF0000",silver:"#C0C0C0",teal:"#008080",white:"#FFFFFF",yellow:"#FFFF00"},r.Color.fromRgb=function(t){return e.fromSource(e.sourceFromRgb(t))},r.Color.sourceFromRgb=function(t){var i=t.match(e.reRGBa);if(i){var r=parseInt(i[1],10)/(/%$/.test(i[1])?100:1)*(/%$/.test(i[1])?255:1),n=parseInt(i[2],10)/(/%$/.test(i[2])?100:1)*(/%$/.test(i[2])?255:1),s=parseInt(i[3],10)/(/%$/.test(i[3])?100:1)*(/%$/.test(i[3])?255:1);return[parseInt(r,10),parseInt(n,10),parseInt(s,10),i[4]?parseFloat(i[4]):1]}},r.Color.fromRgba=e.fromRgb,r.Color.fromHsl=function(t){return e.fromSource(e.sourceFromHsl(t))},r.Color.sourceFromHsl=function(t){var r=t.match(e.reHSLa);if(r){var n,s,o,a=(parseFloat(r[1])%360+360)%360/360,h=parseFloat(r[2])/(/%$/.test(r[2])?100:1),c=parseFloat(r[3])/(/%$/.test(r[3])?100:1);if(0===h)n=s=o=c;else{var l=c<=.5?c*(h+1):c+h-c*h,u=2*c-l;n=i(u,l,a+1/3),s=i(u,l,a),o=i(u,l,a-1/3)}return[Math.round(255*n),Math.round(255*s),Math.round(255*o),r[4]?parseFloat(r[4]):1]}},r.Color.fromHsla=e.fromHsl,r.Color.fromHex=function(t){return e.fromSource(e.sourceFromHex(t))},r.Color.sourceFromHex=function(t){if(t.match(e.reHex)){var i=t.slice(t.indexOf("#")+1),r=3===i.length||4===i.length,n=8===i.length||4===i.length,s=r?i.charAt(0)+i.charAt(0):i.substring(0,2),o=r?i.charAt(1)+i.charAt(1):i.substring(2,4),a=r?i.charAt(2)+i.charAt(2):i.substring(4,6),h=n?r?i.charAt(3)+i.charAt(3):i.substring(6,8):"FF";return[parseInt(s,16),parseInt(o,16),parseInt(a,16),parseFloat((parseInt(h,16)/255).toFixed(2))]}},void(r.Color.fromSource=function(t){var i=new e;return i.setSource(t),i}))}("undefined"!=typeof exports?exports:this),function(){function t(t){var e,i,r,n=t.getAttribute("style"),s=t.getAttribute("offset")||0;if(s=parseFloat(s)/(/%$/.test(s)?100:1),s=s<0?0:s>1?1:s,n){var o=n.split(/\s*;\s*/);""===o[o.length-1]&&o.pop();for(var a=o.length;a--;){var h=o[a].split(/\s*:\s*/),c=h[0].trim(),l=h[1].trim();"stop-color"===c?e=l:"stop-opacity"===c&&(r=l)}}return e||(e=t.getAttribute("stop-color")||"rgb(0,0,0)"),r||(r=t.getAttribute("stop-opacity")),e=new fabric.Color(e),i=e.getAlpha(),r=isNaN(parseFloat(r))?1:parseFloat(r),r*=i,{offset:s,color:e.toRgb(),opacity:r}}function e(t){return{x1:t.getAttribute("x1")||0,y1:t.getAttribute("y1")||0,x2:t.getAttribute("x2")||"100%",y2:t.getAttribute("y2")||0}}function i(t){return{x1:t.getAttribute("fx")||t.getAttribute("cx")||"50%",y1:t.getAttribute("fy")||t.getAttribute("cy")||"50%",r1:0,x2:t.getAttribute("cx")||"50%",y2:t.getAttribute("cy")||"50%",r2:t.getAttribute("r")||"50%"}}function r(t,e,i){var r,n=0,s=1,o="";for(var a in e)"Infinity"===e[a]?e[a]=1:"-Infinity"===e[a]&&(e[a]=0),r=parseFloat(e[a],10),s="string"==typeof e[a]&&/^\d+%$/.test(e[a])?.01:1,"x1"===a||"x2"===a||"r2"===a?(s*="objectBoundingBox"===i?t.width:1,n="objectBoundingBox"===i?t.left||0:0):"y1"!==a&&"y2"!==a||(s*="objectBoundingBox"===i?t.height:1,n="objectBoundingBox"===i?t.top||0:0),e[a]=r*s+n;if("ellipse"===t.type&&null!==e.r2&&"objectBoundingBox"===i&&t.rx!==t.ry){var h=t.ry/t.rx;o=" scale(1, "+h+")",e.y1&&(e.y1/=h),e.y2&&(e.y2/=h)}return o}var n=fabric.util.object.clone;fabric.Gradient=fabric.util.createClass({offsetX:0,offsetY:0,initialize:function(t){t||(t={});var e={};this.id=fabric.Object.__uid++,this.type=t.type||"linear",e={x1:t.coords.x1||0,y1:t.coords.y1||0,x2:t.coords.x2||0,y2:t.coords.y2||0},"radial"===this.type&&(e.r1=t.coords.r1||0,e.r2=t.coords.r2||0),this.coords=e,this.colorStops=t.colorStops.slice(),t.gradientTransform&&(this.gradientTransform=t.gradientTransform),this.offsetX=t.offsetX||this.offsetX,this.offsetY=t.offsetY||this.offsetY},addColorStop:function(t){for(var e in t){var i=new fabric.Color(t[e]);this.colorStops.push({offset:parseFloat(e),color:i.toRgb(),opacity:i.getAlpha()})}return this},toObject:function(t){var e={type:this.type,coords:this.coords,colorStops:this.colorStops,offsetX:this.offsetX,offsetY:this.offsetY,gradientTransform:this.gradientTransform?this.gradientTransform.concat():this.gradientTransform};return fabric.util.populateWithProperties(this,e,t),e},toSVG:function(t){var e,i,r=n(this.coords,!0),s=n(this.colorStops,!0),o=r.r1>r.r2;s.sort(function(t,e){return t.offset-e.offset});for(var a in r)"x1"===a||"x2"===a?r[a]+=this.offsetX-t.width/2:"y1"!==a&&"y2"!==a||(r[a]+=this.offsetY-t.height/2);if(i='id="SVGID_'+this.id+'" gradientUnits="userSpaceOnUse"',this.gradientTransform&&(i+=' gradientTransform="matrix('+this.gradientTransform.join(" ")+')" '),"linear"===this.type?e=["<linearGradient ",i,' x1="',r.x1,'" y1="',r.y1,'" x2="',r.x2,'" y2="',r.y2,'">\n']:"radial"===this.type&&(e=["<radialGradient ",i,' cx="',o?r.x1:r.x2,'" cy="',o?r.y1:r.y2,'" r="',o?r.r1:r.r2,'" fx="',o?r.x2:r.x1,'" fy="',o?r.y2:r.y1,'">\n']),"radial"===this.type){if(o){s=s.concat(),s.reverse();for(var h=0;h<s.length;h++)s[h].offset=1-s[h].offset}var c=Math.min(r.r1,r.r2);if(c>0)for(var l=Math.max(r.r1,r.r2),u=c/l,h=0;h<s.length;h++)s[h].offset+=u*(1-s[h].offset)}for(var h=0;h<s.length;h++){var f=s[h];e.push("<stop ",'offset="',100*f.offset+"%",'" style="stop-color:',f.color,null!==f.opacity?";stop-opacity: "+f.opacity:";",'"/>\n')}return e.push("linear"===this.type?"</linearGradient>\n":"</radialGradient>\n"),e.join("")},toLive:function(t){var e,i=fabric.util.object.clone(this.coords);if(this.type){"linear"===this.type?e=t.createLinearGradient(i.x1,i.y1,i.x2,i.y2):"radial"===this.type&&(e=t.createRadialGradient(i.x1,i.y1,i.r1,i.x2,i.y2,i.r2));for(var r=0,n=this.colorStops.length;r<n;r++){var s=this.colorStops[r].color,o=this.colorStops[r].opacity,a=this.colorStops[r].offset;"undefined"!=typeof o&&(s=new fabric.Color(s).setAlpha(o).toRgba()),e.addColorStop(a,s)}return e}}}),fabric.util.object.extend(fabric.Gradient,{fromElement:function(n,s){var o,a,h,c=n.getElementsByTagName("stop"),l=n.getAttribute("gradientUnits")||"objectBoundingBox",u=n.getAttribute("gradientTransform"),f=[];o="linearGradient"===n.nodeName||"LINEARGRADIENT"===n.nodeName?"linear":"radial","linear"===o?a=e(n):"radial"===o&&(a=i(n));for(var d=c.length;d--;)f.push(t(c[d]));h=r(s,a,l);var g=new fabric.Gradient({type:o,coords:a,colorStops:f,offsetX:-s.left,offsetY:-s.top});return(u||""!==h)&&(g.gradientTransform=fabric.parseTransformAttribute((u||"")+h)),g},forObject:function(t,e){return e||(e={}),r(t,e.coords,"userSpaceOnUse"),new fabric.Gradient(e)}})}(),function(){"use strict";var t=fabric.util.toFixed;fabric.Pattern=fabric.util.createClass({repeat:"repeat",offsetX:0,offsetY:0,initialize:function(t,e){if(t||(t={}),this.id=fabric.Object.__uid++,this.setOptions(t),!t.source||t.source&&"string"!=typeof t.source)return void(e&&e(this));if("undefined"!=typeof fabric.util.getFunctionBody(t.source))this.source=new Function(fabric.util.getFunctionBody(t.source)),e&&e(this);else{var i=this;this.source=fabric.util.createImage(),fabric.util.loadImage(t.source,function(t){i.source=t,e&&e(i)})}},toObject:function(e){var i,r,n=fabric.Object.NUM_FRACTION_DIGITS;return"function"==typeof this.source?i=String(this.source):"string"==typeof this.source.src?i=this.source.src:"object"==typeof this.source&&this.source.toDataURL&&(i=this.source.toDataURL()),r={type:"pattern",source:i,repeat:this.repeat,offsetX:t(this.offsetX,n),offsetY:t(this.offsetY,n)},fabric.util.populateWithProperties(this,r,e),r},toSVG:function(t){var e="function"==typeof this.source?this.source():this.source,i=e.width/t.width,r=e.height/t.height,n=this.offsetX/t.width,s=this.offsetY/t.height,o="";return"repeat-x"!==this.repeat&&"no-repeat"!==this.repeat||(r=1),"repeat-y"!==this.repeat&&"no-repeat"!==this.repeat||(i=1),e.src?o=e.src:e.toDataURL&&(o=e.toDataURL()),'<pattern id="SVGID_'+this.id+'" x="'+n+'" y="'+s+'" width="'+i+'" height="'+r+'">\n<image x="0" y="0" width="'+e.width+'" height="'+e.height+'" xlink:href="'+o+'"></image>\n</pattern>\n'},setOptions:function(t){for(var e in t)this[e]=t[e]},toLive:function(t){var e="function"==typeof this.source?this.source():this.source;if(!e)return"";if("undefined"!=typeof e.src){if(!e.complete)return"";if(0===e.naturalWidth||0===e.naturalHeight)return""}return t.createPattern(e,this.repeat)}})}(),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.toFixed;return e.Shadow?void e.warn("fabric.Shadow is already defined."):(e.Shadow=e.util.createClass({color:"rgb(0,0,0)",blur:0,offsetX:0,offsetY:0,affectStroke:!1,includeDefaultValues:!0,initialize:function(t){"string"==typeof t&&(t=this._parseShadow(t));for(var i in t)this[i]=t[i];this.id=e.Object.__uid++},_parseShadow:function(t){var i=t.trim(),r=e.Shadow.reOffsetsAndBlur.exec(i)||[],n=i.replace(e.Shadow.reOffsetsAndBlur,"")||"rgb(0,0,0)";return{color:n.trim(),offsetX:parseInt(r[1],10)||0,offsetY:parseInt(r[2],10)||0,blur:parseInt(r[3],10)||0}},toString:function(){return[this.offsetX,this.offsetY,this.blur,this.color].join("px ")},toSVG:function(t){var r=40,n=40,s=e.Object.NUM_FRACTION_DIGITS,o=e.util.rotateVector({x:this.offsetX,y:this.offsetY},e.util.degreesToRadians(-t.angle)),a=20;return t.width&&t.height&&(r=100*i((Math.abs(o.x)+this.blur)/t.width,s)+a,n=100*i((Math.abs(o.y)+this.blur)/t.height,s)+a),t.flipX&&(o.x*=-1),t.flipY&&(o.y*=-1),'<filter id="SVGID_'+this.id+'" y="-'+n+'%" height="'+(100+2*n)+'%" x="-'+r+'%" width="'+(100+2*r)+'%" >\n\t<feGaussianBlur in="SourceAlpha" stdDeviation="'+i(this.blur?this.blur/2:0,s)+'"></feGaussianBlur>\n\t<feOffset dx="'+i(o.x,s)+'" dy="'+i(o.y,s)+'" result="oBlur" ></feOffset>\n\t<feFlood flood-color="'+this.color+'"/>\n\t<feComposite in2="oBlur" operator="in" />\n\t<feMerge>\n\t\t<feMergeNode></feMergeNode>\n\t\t<feMergeNode in="SourceGraphic"></feMergeNode>\n\t</feMerge>\n</filter>\n'},toObject:function(){if(this.includeDefaultValues)return{color:this.color,blur:this.blur,offsetX:this.offsetX,offsetY:this.offsetY,affectStroke:this.affectStroke};var t={},i=e.Shadow.prototype;return["color","blur","offsetX","offsetY","affectStroke"].forEach(function(e){this[e]!==i[e]&&(t[e]=this[e])},this),t}}),void(e.Shadow.reOffsetsAndBlur=/(?:\s|^)(-?\d+(?:px)?(?:\s?|$))?(-?\d+(?:px)?(?:\s?|$))?(\d+(?:px)?)?(?:\s?|$)(?:$|\s)/))}("undefined"!=typeof exports?exports:this),function(){"use strict";if(fabric.StaticCanvas)return void fabric.warn("fabric.StaticCanvas is already defined.");var t=fabric.util.object.extend,e=fabric.util.getElementOffset,i=fabric.util.removeFromArray,r=fabric.util.toFixed,n=fabric.util.transformPoint,s=fabric.util.invertTransform,o=new Error("Could not initialize `canvas` element");fabric.StaticCanvas=fabric.util.createClass(fabric.CommonMethods,{initialize:function(t,e){e||(e={}),this._initStatic(t,e)},backgroundColor:"",backgroundImage:null,overlayColor:"",overlayImage:null,includeDefaultValues:!0,stateful:!1,renderOnAddRemove:!0,clipTo:null,controlsAboveOverlay:!1,allowTouchScrolling:!1,imageSmoothingEnabled:!0,viewportTransform:fabric.iMatrix.concat(),backgroundVpt:!0,overlayVpt:!0,onBeforeScaleRotate:function(){},enableRetinaScaling:!0,vptCoords:{},skipOffscreen:!0,_initStatic:function(t,e){var i=fabric.StaticCanvas.prototype.renderAll.bind(this);this._objects=[],this._createLowerCanvas(t),this._initOptions(e),this._setImageSmoothing(),this.interactive||this._initRetinaScaling(),e.overlayImage&&this.setOverlayImage(e.overlayImage,i),e.backgroundImage&&this.setBackgroundImage(e.backgroundImage,i),e.backgroundColor&&this.setBackgroundColor(e.backgroundColor,i),e.overlayColor&&this.setOverlayColor(e.overlayColor,i),this.calcOffset()},_isRetinaScaling:function(){return 1!==fabric.devicePixelRatio&&this.enableRetinaScaling},getRetinaScaling:function(){return this._isRetinaScaling()?fabric.devicePixelRatio:1},_initRetinaScaling:function(){this._isRetinaScaling()&&(this.lowerCanvasEl.setAttribute("width",this.width*fabric.devicePixelRatio),this.lowerCanvasEl.setAttribute("height",this.height*fabric.devicePixelRatio),this.contextContainer.scale(fabric.devicePixelRatio,fabric.devicePixelRatio))},calcOffset:function(){return this._offset=e(this.lowerCanvasEl),this},setOverlayImage:function(t,e,i){return this.__setBgOverlayImage("overlayImage",t,e,i)},setBackgroundImage:function(t,e,i){return this.__setBgOverlayImage("backgroundImage",t,e,i)},setOverlayColor:function(t,e){return this.__setBgOverlayColor("overlayColor",t,e)},setBackgroundColor:function(t,e){return this.__setBgOverlayColor("backgroundColor",t,e)},_setImageSmoothing:function(){var t=this.getContext();t.imageSmoothingEnabled=t.imageSmoothingEnabled||t.webkitImageSmoothingEnabled||t.mozImageSmoothingEnabled||t.msImageSmoothingEnabled||t.oImageSmoothingEnabled,t.imageSmoothingEnabled=this.imageSmoothingEnabled},__setBgOverlayImage:function(t,e,i,r){return"string"==typeof e?fabric.util.loadImage(e,function(e){e&&(this[t]=new fabric.Image(e,r)),i&&i(e)},this,r&&r.crossOrigin):(r&&e.setOptions(r),this[t]=e,i&&i(e)),this},__setBgOverlayColor:function(t,e,i){return this[t]=e,this._initGradient(e,t),this._initPattern(e,t,i),this},_createCanvasElement:function(t){var e=fabric.util.createCanvasElement(t);if(e.style||(e.style={}),!e)throw o;if("undefined"==typeof e.getContext)throw o;return e},_initOptions:function(t){this._setOptions(t),this.width=this.width||parseInt(this.lowerCanvasEl.width,10)||0,this.height=this.height||parseInt(this.lowerCanvasEl.height,10)||0,this.lowerCanvasEl.style&&(this.lowerCanvasEl.width=this.width,this.lowerCanvasEl.height=this.height,this.lowerCanvasEl.style.width=this.width+"px",this.lowerCanvasEl.style.height=this.height+"px",this.viewportTransform=this.viewportTransform.slice())},_createLowerCanvas:function(t){this.lowerCanvasEl=fabric.util.getById(t)||this._createCanvasElement(t),fabric.util.addClass(this.lowerCanvasEl,"lower-canvas"),this.interactive&&this._applyCanvasStyle(this.lowerCanvasEl),this.contextContainer=this.lowerCanvasEl.getContext("2d")},getWidth:function(){return this.width},getHeight:function(){return this.height},setWidth:function(t,e){return this.setDimensions({width:t},e)},setHeight:function(t,e){return this.setDimensions({height:t},e)},setDimensions:function(t,e){var i;e=e||{};for(var r in t)i=t[r],e.cssOnly||(this._setBackstoreDimension(r,t[r]),i+="px"),e.backstoreOnly||this._setCssDimension(r,i);return this._initRetinaScaling(),this._setImageSmoothing(),this.calcOffset(),e.cssOnly||this.renderAll(),this},_setBackstoreDimension:function(t,e){return this.lowerCanvasEl[t]=e,this.upperCanvasEl&&(this.upperCanvasEl[t]=e),this.cacheCanvasEl&&(this.cacheCanvasEl[t]=e),this[t]=e,this},_setCssDimension:function(t,e){return this.lowerCanvasEl.style[t]=e,this.upperCanvasEl&&(this.upperCanvasEl.style[t]=e),this.wrapperEl&&(this.wrapperEl.style[t]=e),this},getZoom:function(){return this.viewportTransform[0]},setViewportTransform:function(t){var e,i=this._activeGroup,r=!1,n=!0;this.viewportTransform=t;for(var s=0,o=this._objects.length;s<o;s++)e=this._objects[s],e.group||e.setCoords(r,n);return i&&i.setCoords(r,n),this.calcViewportBoundaries(),this.renderAll(),this},zoomToPoint:function(t,e){var i=t,r=this.viewportTransform.slice(0);t=n(t,s(this.viewportTransform)),r[0]=e,r[3]=e;var o=n(t,r);return r[4]+=i.x-o.x,r[5]+=i.y-o.y,this.setViewportTransform(r)},setZoom:function(t){return this.zoomToPoint(new fabric.Point(0,0),t),this},absolutePan:function(t){var e=this.viewportTransform.slice(0);return e[4]=-t.x,e[5]=-t.y,this.setViewportTransform(e)},relativePan:function(t){return this.absolutePan(new fabric.Point(-t.x-this.viewportTransform[4],-t.y-this.viewportTransform[5]))},getElement:function(){return this.lowerCanvasEl},_onObjectAdded:function(t){this.stateful&&t.setupState(),t._set("canvas",this),t.setCoords(),this.fire("object:added",{target:t}),t.fire("added")},_onObjectRemoved:function(t){this.fire("object:removed",{target:t}),t.fire("removed"),delete t.canvas},clearContext:function(t){return t.clearRect(0,0,this.width,this.height),this},getContext:function(){return this.contextContainer},clear:function(){return this._objects.length=0,this.backgroundImage=null,this.overlayImage=null,this.backgroundColor="",this.overlayColor="",this._hasITextHandlers&&(this.off("mouse:up",this._mouseUpITextHandler),this._iTextInstances=null,this._hasITextHandlers=!1),this.clearContext(this.contextContainer),this.fire("canvas:cleared"),this.renderAll(),this},renderAll:function(){var t=this.contextContainer;return this.renderCanvas(t,this._objects),this},calcViewportBoundaries:function(){var t={},e=this.getWidth(),i=this.getHeight(),r=s(this.viewportTransform);return t.tl=n({x:0,y:0},r),t.br=n({x:e,y:i},r),t.tr=new fabric.Point(t.br.x,t.tl.y),t.bl=new fabric.Point(t.tl.x,t.br.y),this.vptCoords=t,t},renderCanvas:function(t,e){this.calcViewportBoundaries(),this.clearContext(t),this.fire("before:render"),this.clipTo&&fabric.util.clipContext(this,t),this._renderBackground(t),t.save(),t.transform.apply(t,this.viewportTransform),this._renderObjects(t,e),t.restore(),!this.controlsAboveOverlay&&this.interactive&&this.drawControls(t),this.clipTo&&t.restore(),this._renderOverlay(t),this.controlsAboveOverlay&&this.interactive&&this.drawControls(t),this.fire("after:render")},_renderObjects:function(t,e){for(var i=0,r=e.length;i<r;++i)e[i]&&e[i].render(t)},_renderBackgroundOrOverlay:function(t,e){var i=this[e+"Color"];i&&(t.fillStyle=i.toLive?i.toLive(t,this):i,t.fillRect(i.offsetX||0,i.offsetY||0,this.width,this.height)),i=this[e+"Image"],i&&(this[e+"Vpt"]&&(t.save(),t.transform.apply(t,this.viewportTransform)),i.render(t),this[e+"Vpt"]&&t.restore())},_renderBackground:function(t){this._renderBackgroundOrOverlay(t,"background")},_renderOverlay:function(t){this._renderBackgroundOrOverlay(t,"overlay")},getCenter:function(){return{top:this.getHeight()/2,left:this.getWidth()/2}},centerObjectH:function(t){return this._centerObject(t,new fabric.Point(this.getCenter().left,t.getCenterPoint().y))},centerObjectV:function(t){return this._centerObject(t,new fabric.Point(t.getCenterPoint().x,this.getCenter().top))},centerObject:function(t){var e=this.getCenter();return this._centerObject(t,new fabric.Point(e.left,e.top))},viewportCenterObject:function(t){var e=this.getVpCenter();return this._centerObject(t,e)},viewportCenterObjectH:function(t){
var e=this.getVpCenter();return this._centerObject(t,new fabric.Point(e.x,t.getCenterPoint().y)),this},viewportCenterObjectV:function(t){var e=this.getVpCenter();return this._centerObject(t,new fabric.Point(t.getCenterPoint().x,e.y))},getVpCenter:function(){var t=this.getCenter(),e=s(this.viewportTransform);return n({x:t.left,y:t.top},e)},_centerObject:function(t,e){return t.setPositionByOrigin(e,"center","center"),this.renderAll(),this},toDatalessJSON:function(t){return this.toDatalessObject(t)},toObject:function(t){return this._toObjectMethod("toObject",t)},toDatalessObject:function(t){return this._toObjectMethod("toDatalessObject",t)},_toObjectMethod:function(e,i){var r={objects:this._toObjects(e,i)};return t(r,this.__serializeBgOverlay(e,i)),fabric.util.populateWithProperties(this,r,i),r},_toObjects:function(t,e){return this.getObjects().filter(function(t){return!t.excludeFromExport}).map(function(i){return this._toObject(i,t,e)},this)},_toObject:function(t,e,i){var r;this.includeDefaultValues||(r=t.includeDefaultValues,t.includeDefaultValues=!1);var n=t[e](i);return this.includeDefaultValues||(t.includeDefaultValues=r),n},__serializeBgOverlay:function(t,e){var i={};return this.backgroundColor&&(i.background=this.backgroundColor.toObject?this.backgroundColor.toObject(e):this.backgroundColor),this.overlayColor&&(i.overlay=this.overlayColor.toObject?this.overlayColor.toObject(e):this.overlayColor),this.backgroundImage&&(i.backgroundImage=this._toObject(this.backgroundImage,t,e)),this.overlayImage&&(i.overlayImage=this._toObject(this.overlayImage,t,e)),i},svgViewportTransformation:!0,toSVG:function(t,e){t||(t={});var i=[];return this._setSVGPreamble(i,t),this._setSVGHeader(i,t),this._setSVGBgOverlayColor(i,"backgroundColor"),this._setSVGBgOverlayImage(i,"backgroundImage",e),this._setSVGObjects(i,e),this._setSVGBgOverlayColor(i,"overlayColor"),this._setSVGBgOverlayImage(i,"overlayImage",e),i.push("</svg>"),i.join("")},_setSVGPreamble:function(t,e){e.suppressPreamble||t.push('<?xml version="1.0" encoding="',e.encoding||"UTF-8",'" standalone="no" ?>\n','<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ','"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n')},_setSVGHeader:function(t,e){var i,n=e.width||this.width,s=e.height||this.height,o='viewBox="0 0 '+this.width+" "+this.height+'" ',a=fabric.Object.NUM_FRACTION_DIGITS;e.viewBox?o='viewBox="'+e.viewBox.x+" "+e.viewBox.y+" "+e.viewBox.width+" "+e.viewBox.height+'" ':this.svgViewportTransformation&&(i=this.viewportTransform,o='viewBox="'+r(-i[4]/i[0],a)+" "+r(-i[5]/i[3],a)+" "+r(this.width/i[0],a)+" "+r(this.height/i[3],a)+'" '),t.push("<svg ",'xmlns="http://www.w3.org/2000/svg" ','xmlns:xlink="http://www.w3.org/1999/xlink" ','version="1.1" ','width="',n,'" ','height="',s,'" ',o,'xml:space="preserve">\n',"<desc>Created with Fabric.js ",fabric.version,"</desc>\n","<defs>\n",this.createSVGFontFacesMarkup(),this.createSVGRefElementsMarkup(),"</defs>\n")},createSVGRefElementsMarkup:function(){var t=this,e=["backgroundColor","overlayColor"].map(function(e){var i=t[e];if(i&&i.toLive)return i.toSVG(t,!1)});return e.join("")},createSVGFontFacesMarkup:function(){for(var t,e,i,r,n,s,o,a="",h={},c=fabric.fontPaths,l=this.getObjects(),u=0,f=l.length;u<f;u++)if(t=l[u],e=t.fontFamily,t.type.indexOf("text")!==-1&&!h[e]&&c[e]&&(h[e]=!0,t.styles)){i=t.styles;for(n in i){r=i[n];for(o in r)s=r[o],e=s.fontFamily,!h[e]&&c[e]&&(h[e]=!0)}}for(var d in h)a+=["\t\t@font-face {\n","\t\t\tfont-family: '",d,"';\n","\t\t\tsrc: url('",c[d],"');\n","\t\t}\n"].join("");return a&&(a=['\t<style type="text/css">',"<![CDATA[\n",a,"]]>","</style>\n"].join("")),a},_setSVGObjects:function(t,e){for(var i,r=0,n=this.getObjects(),s=n.length;r<s;r++)i=n[r],i.excludeFromExport||this._setSVGObject(t,i,e)},_setSVGObject:function(t,e,i){t.push(e.toSVG(i))},_setSVGBgOverlayImage:function(t,e,i){this[e]&&this[e].toSVG&&t.push(this[e].toSVG(i))},_setSVGBgOverlayColor:function(t,e){var i=this[e];if(i)if(i.toLive){var r=i.repeat;t.push('<rect transform="translate(',this.width/2,",",this.height/2,')"',' x="',i.offsetX-this.width/2,'" y="',i.offsetY-this.height/2,'" ','width="',"repeat-y"===r||"no-repeat"===r?i.source.width:this.width,'" height="',"repeat-x"===r||"no-repeat"===r?i.source.height:this.height,'" fill="url(#SVGID_'+i.id+')"',"></rect>\n")}else t.push('<rect x="0" y="0" ','width="',this.width,'" height="',this.height,'" fill="',this[e],'"',"></rect>\n")},sendToBack:function(t){if(!t)return this;var e,r,n,s=this._activeGroup;if(t===s)for(n=s._objects,e=n.length;e--;)r=n[e],i(this._objects,r),this._objects.unshift(r);else i(this._objects,t),this._objects.unshift(t);return this.renderAll&&this.renderAll()},bringToFront:function(t){if(!t)return this;var e,r,n,s=this._activeGroup;if(t===s)for(n=s._objects,e=0;e<n.length;e++)r=n[e],i(this._objects,r),this._objects.push(r);else i(this._objects,t),this._objects.push(t);return this.renderAll&&this.renderAll()},sendBackwards:function(t,e){if(!t)return this;var r,n,s,o,a,h=this._activeGroup;if(t===h)for(a=h._objects,r=0;r<a.length;r++)n=a[r],s=this._objects.indexOf(n),0!==s&&(o=s-1,i(this._objects,n),this._objects.splice(o,0,n));else s=this._objects.indexOf(t),0!==s&&(o=this._findNewLowerIndex(t,s,e),i(this._objects,t),this._objects.splice(o,0,t));return this.renderAll&&this.renderAll(),this},_findNewLowerIndex:function(t,e,i){var r;if(i){r=e;for(var n=e-1;n>=0;--n){var s=t.intersectsWithObject(this._objects[n])||t.isContainedWithinObject(this._objects[n])||this._objects[n].isContainedWithinObject(t);if(s){r=n;break}}}else r=e-1;return r},bringForward:function(t,e){if(!t)return this;var r,n,s,o,a,h=this._activeGroup;if(t===h)for(a=h._objects,r=a.length;r--;)n=a[r],s=this._objects.indexOf(n),s!==this._objects.length-1&&(o=s+1,i(this._objects,n),this._objects.splice(o,0,n));else s=this._objects.indexOf(t),s!==this._objects.length-1&&(o=this._findNewUpperIndex(t,s,e),i(this._objects,t),this._objects.splice(o,0,t));return this.renderAll&&this.renderAll(),this},_findNewUpperIndex:function(t,e,i){var r;if(i){r=e;for(var n=e+1;n<this._objects.length;++n){var s=t.intersectsWithObject(this._objects[n])||t.isContainedWithinObject(this._objects[n])||this._objects[n].isContainedWithinObject(t);if(s){r=n;break}}}else r=e+1;return r},moveTo:function(t,e){return i(this._objects,t),this._objects.splice(e,0,t),this.renderAll&&this.renderAll()},dispose:function(){return this.clear(),this},toString:function(){return"#<fabric.Canvas ("+this.complexity()+"): { objects: "+this.getObjects().length+" }>"}}),t(fabric.StaticCanvas.prototype,fabric.Observable),t(fabric.StaticCanvas.prototype,fabric.Collection),t(fabric.StaticCanvas.prototype,fabric.DataURLExporter),t(fabric.StaticCanvas,{EMPTY_JSON:'{"objects": [], "background": "white"}',supports:function(t){var e=fabric.util.createCanvasElement();if(!e||!e.getContext)return null;var i=e.getContext("2d");if(!i)return null;switch(t){case"getImageData":return"undefined"!=typeof i.getImageData;case"setLineDash":return"undefined"!=typeof i.setLineDash;case"toDataURL":return"undefined"!=typeof e.toDataURL;case"toDataURLWithQuality":try{return e.toDataURL("image/jpeg",0),!0}catch(t){}return!1;default:return null}}}),fabric.StaticCanvas.prototype.toJSON=fabric.StaticCanvas.prototype.toObject}(),fabric.BaseBrush=fabric.util.createClass({color:"rgb(0, 0, 0)",width:1,shadow:null,strokeLineCap:"round",strokeLineJoin:"round",strokeDashArray:null,setShadow:function(t){return this.shadow=new fabric.Shadow(t),this},_setBrushStyles:function(){var t=this.canvas.contextTop;t.strokeStyle=this.color,t.lineWidth=this.width,t.lineCap=this.strokeLineCap,t.lineJoin=this.strokeLineJoin,this.strokeDashArray&&fabric.StaticCanvas.supports("setLineDash")&&t.setLineDash(this.strokeDashArray)},_setShadow:function(){if(this.shadow){var t=this.canvas.contextTop,e=this.canvas.getZoom();t.shadowColor=this.shadow.color,t.shadowBlur=this.shadow.blur*e,t.shadowOffsetX=this.shadow.offsetX*e,t.shadowOffsetY=this.shadow.offsetY*e}},_resetShadow:function(){var t=this.canvas.contextTop;t.shadowColor="",t.shadowBlur=t.shadowOffsetX=t.shadowOffsetY=0}}),function(){fabric.PencilBrush=fabric.util.createClass(fabric.BaseBrush,{initialize:function(t){this.canvas=t,this._points=[]},onMouseDown:function(t){this._prepareForDrawing(t),this._captureDrawingPath(t),this._render()},onMouseMove:function(t){this._captureDrawingPath(t),this.canvas.clearContext(this.canvas.contextTop),this._render()},onMouseUp:function(){this._finalizeAndAddPath()},_prepareForDrawing:function(t){var e=new fabric.Point(t.x,t.y);this._reset(),this._addPoint(e),this.canvas.contextTop.moveTo(e.x,e.y)},_addPoint:function(t){this._points.push(t)},_reset:function(){this._points.length=0,this._setBrushStyles(),this._setShadow()},_captureDrawingPath:function(t){var e=new fabric.Point(t.x,t.y);this._addPoint(e)},_render:function(){var t=this.canvas.contextTop,e=this.canvas.viewportTransform,i=this._points[0],r=this._points[1];t.save(),t.transform(e[0],e[1],e[2],e[3],e[4],e[5]),t.beginPath(),2===this._points.length&&i.x===r.x&&i.y===r.y&&(i.x-=.5,r.x+=.5),t.moveTo(i.x,i.y);for(var n=1,s=this._points.length;n<s;n++){var o=i.midPointFrom(r);t.quadraticCurveTo(i.x,i.y,o.x,o.y),i=this._points[n],r=this._points[n+1]}t.lineTo(i.x,i.y),t.stroke(),t.restore()},convertPointsToSVGPath:function(t){var e=[],i=new fabric.Point(t[0].x,t[0].y),r=new fabric.Point(t[1].x,t[1].y);e.push("M ",t[0].x," ",t[0].y," ");for(var n=1,s=t.length;n<s;n++){var o=i.midPointFrom(r);e.push("Q ",i.x," ",i.y," ",o.x," ",o.y," "),i=new fabric.Point(t[n].x,t[n].y),n+1<t.length&&(r=new fabric.Point(t[n+1].x,t[n+1].y))}return e.push("L ",i.x," ",i.y," "),e},createPath:function(t){var e=new fabric.Path(t,{fill:null,stroke:this.color,strokeWidth:this.width,strokeLineCap:this.strokeLineCap,strokeLineJoin:this.strokeLineJoin,strokeDashArray:this.strokeDashArray,originX:"center",originY:"center"});return this.shadow&&(this.shadow.affectStroke=!0,e.setShadow(this.shadow)),e},_finalizeAndAddPath:function(){var t=this.canvas.contextTop;t.closePath();var e=this.convertPointsToSVGPath(this._points).join("");if("M 0 0 Q 0 0 0 0 L 0 0"===e)return void this.canvas.renderAll();var i=this.createPath(e);this.canvas.add(i),i.setCoords(),this.canvas.clearContext(this.canvas.contextTop),this._resetShadow(),this.canvas.renderAll(),this.canvas.fire("path:created",{path:i})}})}(),fabric.CircleBrush=fabric.util.createClass(fabric.BaseBrush,{width:10,initialize:function(t){this.canvas=t,this.points=[]},drawDot:function(t){var e=this.addPoint(t),i=this.canvas.contextTop,r=this.canvas.viewportTransform;i.save(),i.transform(r[0],r[1],r[2],r[3],r[4],r[5]),i.fillStyle=e.fill,i.beginPath(),i.arc(e.x,e.y,e.radius,0,2*Math.PI,!1),i.closePath(),i.fill(),i.restore()},onMouseDown:function(t){this.points.length=0,this.canvas.clearContext(this.canvas.contextTop),this._setShadow(),this.drawDot(t)},onMouseMove:function(t){this.drawDot(t)},onMouseUp:function(){var t=this.canvas.renderOnAddRemove;this.canvas.renderOnAddRemove=!1;for(var e=[],i=0,r=this.points.length;i<r;i++){var n=this.points[i],s=new fabric.Circle({radius:n.radius,left:n.x,top:n.y,originX:"center",originY:"center",fill:n.fill});this.shadow&&s.setShadow(this.shadow),e.push(s)}var o=new fabric.Group(e,{originX:"center",originY:"center"});o.canvas=this.canvas,this.canvas.add(o),this.canvas.fire("path:created",{path:o}),this.canvas.clearContext(this.canvas.contextTop),this._resetShadow(),this.canvas.renderOnAddRemove=t,this.canvas.renderAll()},addPoint:function(t){var e=new fabric.Point(t.x,t.y),i=fabric.util.getRandomInt(Math.max(0,this.width-20),this.width+20)/2,r=new fabric.Color(this.color).setAlpha(fabric.util.getRandomInt(0,100)/100).toRgba();return e.radius=i,e.fill=r,this.points.push(e),e}}),fabric.SprayBrush=fabric.util.createClass(fabric.BaseBrush,{width:10,density:20,dotWidth:1,dotWidthVariance:1,randomOpacity:!1,optimizeOverlapping:!0,initialize:function(t){this.canvas=t,this.sprayChunks=[]},onMouseDown:function(t){this.sprayChunks.length=0,this.canvas.clearContext(this.canvas.contextTop),this._setShadow(),this.addSprayChunk(t),this.render()},onMouseMove:function(t){this.addSprayChunk(t),this.render()},onMouseUp:function(){var t=this.canvas.renderOnAddRemove;this.canvas.renderOnAddRemove=!1;for(var e=[],i=0,r=this.sprayChunks.length;i<r;i++)for(var n=this.sprayChunks[i],s=0,o=n.length;s<o;s++){var a=new fabric.Rect({width:n[s].width,height:n[s].width,left:n[s].x+1,top:n[s].y+1,originX:"center",originY:"center",fill:this.color});this.shadow&&a.setShadow(this.shadow),e.push(a)}this.optimizeOverlapping&&(e=this._getOptimizedRects(e));var h=new fabric.Group(e,{originX:"center",originY:"center"});h.canvas=this.canvas,this.canvas.add(h),this.canvas.fire("path:created",{path:h}),this.canvas.clearContext(this.canvas.contextTop),this._resetShadow(),this.canvas.renderOnAddRemove=t,this.canvas.renderAll()},_getOptimizedRects:function(t){for(var e,i={},r=0,n=t.length;r<n;r++)e=t[r].left+""+t[r].top,i[e]||(i[e]=t[r]);var s=[];for(e in i)s.push(i[e]);return s},render:function(){var t=this.canvas.contextTop;t.fillStyle=this.color;var e=this.canvas.viewportTransform;t.save(),t.transform(e[0],e[1],e[2],e[3],e[4],e[5]);for(var i=0,r=this.sprayChunkPoints.length;i<r;i++){var n=this.sprayChunkPoints[i];"undefined"!=typeof n.opacity&&(t.globalAlpha=n.opacity),t.fillRect(n.x,n.y,n.width,n.width)}t.restore()},addSprayChunk:function(t){this.sprayChunkPoints=[];for(var e,i,r,n=this.width/2,s=0;s<this.density;s++){e=fabric.util.getRandomInt(t.x-n,t.x+n),i=fabric.util.getRandomInt(t.y-n,t.y+n),r=this.dotWidthVariance?fabric.util.getRandomInt(Math.max(1,this.dotWidth-this.dotWidthVariance),this.dotWidth+this.dotWidthVariance):this.dotWidth;var o=new fabric.Point(e,i);o.width=r,this.randomOpacity&&(o.opacity=fabric.util.getRandomInt(0,100)/100),this.sprayChunkPoints.push(o)}this.sprayChunks.push(this.sprayChunkPoints)}}),fabric.PatternBrush=fabric.util.createClass(fabric.PencilBrush,{getPatternSrc:function(){var t=20,e=5,i=fabric.document.createElement("canvas"),r=i.getContext("2d");return i.width=i.height=t+e,r.fillStyle=this.color,r.beginPath(),r.arc(t/2,t/2,t/2,0,2*Math.PI,!1),r.closePath(),r.fill(),i},getPatternSrcFunction:function(){return String(this.getPatternSrc).replace("this.color",'"'+this.color+'"')},getPattern:function(){return this.canvas.contextTop.createPattern(this.source||this.getPatternSrc(),"repeat")},_setBrushStyles:function(){this.callSuper("_setBrushStyles"),this.canvas.contextTop.strokeStyle=this.getPattern()},createPath:function(t){var e=this.callSuper("createPath",t),i=e._getLeftTopCoords().scalarAdd(e.strokeWidth/2);return e.stroke=new fabric.Pattern({source:this.source||this.getPatternSrcFunction(),offsetX:-i.x,offsetY:-i.y}),e}}),function(){var t=fabric.util.getPointer,e=fabric.util.degreesToRadians,i=fabric.util.radiansToDegrees,r=Math.atan2,n=Math.abs,s=fabric.StaticCanvas.supports("setLineDash"),o=.5;fabric.Canvas=fabric.util.createClass(fabric.StaticCanvas,{initialize:function(t,e){e||(e={}),this._initStatic(t,e),this._initInteractive(),this._createCacheCanvas()},uniScaleTransform:!1,uniScaleKey:"shiftKey",centeredScaling:!1,centeredRotation:!1,centeredKey:"altKey",altActionKey:"shiftKey",interactive:!0,selection:!0,selectionKey:"shiftKey",altSelectionKey:null,selectionColor:"rgba(100, 100, 255, 0.3)",selectionDashArray:[],selectionBorderColor:"rgba(255, 255, 255, 0.3)",selectionLineWidth:1,hoverCursor:"move",moveCursor:"move",defaultCursor:"default",freeDrawingCursor:"crosshair",rotationCursor:"crosshair",containerClass:"canvas-container",perPixelTargetFind:!1,targetFindTolerance:0,skipTargetFind:!1,isDrawingMode:!1,preserveObjectStacking:!1,snapAngle:0,snapThreshold:null,stopContextMenu:!1,fireRightClick:!1,fireMiddleClick:!1,_initInteractive:function(){this._currentTransform=null,this._groupSelector=null,this._initWrapperElement(),this._createUpperCanvas(),this._initEventListeners(),this._initRetinaScaling(),this.freeDrawingBrush=fabric.PencilBrush&&new fabric.PencilBrush(this),this.calcOffset()},_chooseObjectsToRender:function(){var t,e=this.getActiveGroup(),i=this.getActiveObject(),r=[],n=[];if(!e&&!i||this.preserveObjectStacking)r=this._objects;else{for(var s=0,o=this._objects.length;s<o;s++)t=this._objects[s],e&&e.contains(t)||t===i?n.push(t):r.push(t);e&&(e._set("_objects",n),r.push(e)),i&&r.push(i)}return r},renderAll:function(){!this.contextTopDirty||this._groupSelector||this.isDrawingMode||(this.clearContext(this.contextTop),this.contextTopDirty=!1);var t=this.contextContainer;return this.renderCanvas(t,this._chooseObjectsToRender()),this},renderTop:function(){var t=this.contextTop;return this.clearContext(t),this.selection&&this._groupSelector&&this._drawSelection(t),this.fire("after:render"),this.contextTopDirty=!0,this},_resetCurrentTransform:function(){var t=this._currentTransform;t.target.set({scaleX:t.original.scaleX,scaleY:t.original.scaleY,skewX:t.original.skewX,skewY:t.original.skewY,left:t.original.left,top:t.original.top}),this._shouldCenterTransform(t.target)?"rotate"===t.action?this._setOriginToCenter(t.target):("center"!==t.originX&&("right"===t.originX?t.mouseXSign=-1:t.mouseXSign=1),"center"!==t.originY&&("bottom"===t.originY?t.mouseYSign=-1:t.mouseYSign=1),t.originX="center",t.originY="center"):(t.originX=t.original.originX,t.originY=t.original.originY)},containsPoint:function(t,e,i){var r,n=!0,s=i||this.getPointer(t,n);return r=e.group&&e.group===this.getActiveGroup()?this._normalizePointer(e.group,s):{x:s.x,y:s.y},e.containsPoint(r)||e._findTargetCorner(s)},_normalizePointer:function(t,e){var i=t.calcTransformMatrix(),r=fabric.util.invertTransform(i),n=this.restorePointerVpt(e);return fabric.util.transformPoint(n,r)},isTargetTransparent:function(t,e,i){var r=t.hasBorders,n=t.transparentCorners,s=this.contextCache,o=t.selectionBackgroundColor;t.hasBorders=t.transparentCorners=!1,t.selectionBackgroundColor="",s.save(),s.transform.apply(s,this.viewportTransform),t.render(s),s.restore(),t.active&&t._renderControls(s),t.hasBorders=r,t.transparentCorners=n,t.selectionBackgroundColor=o;var a=fabric.util.isTransparent(s,e,i,this.targetFindTolerance);return this.clearContext(s),a},_shouldClearSelection:function(t,e){var i=this.getActiveGroup(),r=this.getActiveObject();return!e||e&&i&&!i.contains(e)&&i!==e&&!t[this.selectionKey]||e&&!e.evented||e&&!e.selectable&&r&&r!==e},_shouldCenterTransform:function(t){if(t){var e,i=this._currentTransform;return"scale"===i.action||"scaleX"===i.action||"scaleY"===i.action?e=this.centeredScaling||t.centeredScaling:"rotate"===i.action&&(e=this.centeredRotation||t.centeredRotation),e?!i.altKey:i.altKey}},_getOriginFromCorner:function(t,e){var i={x:t.originX,y:t.originY};return"ml"===e||"tl"===e||"bl"===e?i.x="right":"mr"!==e&&"tr"!==e&&"br"!==e||(i.x="left"),"tl"===e||"mt"===e||"tr"===e?i.y="bottom":"bl"!==e&&"mb"!==e&&"br"!==e||(i.y="top"),i},_getActionFromCorner:function(t,e,i){if(!e)return"drag";switch(e){case"mtr":return"rotate";case"ml":case"mr":return i[this.altActionKey]?"skewY":"scaleX";case"mt":case"mb":return i[this.altActionKey]?"skewX":"scaleY";default:return"scale"}},_setupCurrentTransform:function(t,i){if(i){var r=this.getPointer(t),n=i._findTargetCorner(this.getPointer(t,!0)),s=this._getActionFromCorner(i,n,t),o=this._getOriginFromCorner(i,n);this._currentTransform={target:i,action:s,corner:n,scaleX:i.scaleX,scaleY:i.scaleY,skewX:i.skewX,skewY:i.skewY,offsetX:r.x-i.left,offsetY:r.y-i.top,originX:o.x,originY:o.y,ex:r.x,ey:r.y,lastX:r.x,lastY:r.y,left:i.left,top:i.top,theta:e(i.angle),width:i.width*i.scaleX,mouseXSign:1,mouseYSign:1,shiftKey:t.shiftKey,altKey:t[this.centeredKey]},this._currentTransform.original={left:i.left,top:i.top,scaleX:i.scaleX,scaleY:i.scaleY,skewX:i.skewX,skewY:i.skewY,originX:o.x,originY:o.y},this._resetCurrentTransform()}},_translateObject:function(t,e){var i=this._currentTransform,r=i.target,n=t-i.offsetX,s=e-i.offsetY,o=!r.get("lockMovementX")&&r.left!==n,a=!r.get("lockMovementY")&&r.top!==s;return o&&r.set("left",n),a&&r.set("top",s),o||a},_changeSkewTransformOrigin:function(t,e,i){var r="originX",n={0:"center"},s=e.target.skewX,o="left",a="right",h="mt"===e.corner||"ml"===e.corner?1:-1,c=1;t=t>0?1:-1,"y"===i&&(s=e.target.skewY,o="top",a="bottom",r="originY"),n[-1]=o,n[1]=a,e.target.flipX&&(c*=-1),e.target.flipY&&(c*=-1),0===s?(e.skewSign=-h*t*c,e[r]=n[-t]):(s=s>0?1:-1,e.skewSign=s,e[r]=n[s*h*c])},_skewObject:function(t,e,i){var r=this._currentTransform,n=r.target,s=!1,o=n.get("lockSkewingX"),a=n.get("lockSkewingY");if(o&&"x"===i||a&&"y"===i)return!1;var h,c,l=n.getCenterPoint(),u=n.toLocalPoint(new fabric.Point(t,e),"center","center")[i],f=n.toLocalPoint(new fabric.Point(r.lastX,r.lastY),"center","center")[i],d=n._getTransformedDimensions();return this._changeSkewTransformOrigin(u-f,r,i),h=n.toLocalPoint(new fabric.Point(t,e),r.originX,r.originY)[i],c=n.translateToOriginPoint(l,r.originX,r.originY),s=this._setObjectSkew(h,r,i,d),r.lastX=t,r.lastY=e,n.setPositionByOrigin(c,r.originX,r.originY),s},_setObjectSkew:function(t,e,i,r){var n,s,o,a,h,c,l,u,f,d=e.target,g=!1,p=e.skewSign;return"x"===i?(a="y",h="Y",c="X",u=0,f=d.skewY):(a="x",h="X",c="Y",u=d.skewX,f=0),o=d._getTransformedDimensions(u,f),l=2*Math.abs(t)-o[i],l<=2?n=0:(n=p*Math.atan(l/d["scale"+c]/(o[a]/d["scale"+h])),n=fabric.util.radiansToDegrees(n)),g=d["skew"+c]!==n,d.set("skew"+c,n),0!==d["skew"+h]&&(s=d._getTransformedDimensions(),n=r[a]/s[a]*d["scale"+h],d.set("scale"+h,n)),g},_scaleObject:function(t,e,i){var r=this._currentTransform,n=r.target,s=n.get("lockScalingX"),o=n.get("lockScalingY"),a=n.get("lockScalingFlip");if(s&&o)return!1;var h=n.translateToOriginPoint(n.getCenterPoint(),r.originX,r.originY),c=n.toLocalPoint(new fabric.Point(t,e),r.originX,r.originY),l=n._getTransformedDimensions(),u=!1;return this._setLocalMouse(c,r),u=this._setObjectScale(c,r,s,o,i,a,l),n.setPositionByOrigin(h,r.originX,r.originY),u},_setObjectScale:function(t,e,i,r,n,s,o){var a,h,c,l,u=e.target,f=!1,d=!1,g=!1;return c=t.x*u.scaleX/o.x,l=t.y*u.scaleY/o.y,a=u.scaleX!==c,h=u.scaleY!==l,s&&c<=0&&c<u.scaleX&&(f=!0),s&&l<=0&&l<u.scaleY&&(d=!0),"equally"!==n||i||r?n?"x"!==n||u.get("lockUniScaling")?"y"!==n||u.get("lockUniScaling")||d||r||u.set("scaleY",l)&&(g=g||h):f||i||u.set("scaleX",c)&&(g=g||a):(f||i||u.set("scaleX",c)&&(g=g||a),d||r||u.set("scaleY",l)&&(g=g||h)):f||d||(g=this._scaleObjectEqually(t,u,e,o)),e.newScaleX=c,e.newScaleY=l,f||d||this._flipObject(e,n),g},_scaleObjectEqually:function(t,e,i,r){var n,s=t.y+t.x,o=r.y*i.original.scaleY/e.scaleY+r.x*i.original.scaleX/e.scaleX;return i.newScaleX=i.original.scaleX*s/o,i.newScaleY=i.original.scaleY*s/o,n=i.newScaleX!==e.scaleX||i.newScaleY!==e.scaleY,e.set("scaleX",i.newScaleX),e.set("scaleY",i.newScaleY),n},_flipObject:function(t,e){t.newScaleX<0&&"y"!==e&&("left"===t.originX?t.originX="right":"right"===t.originX&&(t.originX="left")),t.newScaleY<0&&"x"!==e&&("top"===t.originY?t.originY="bottom":"bottom"===t.originY&&(t.originY="top"))},_setLocalMouse:function(t,e){var i=e.target,r=this.getZoom(),s=i.padding/r;"right"===e.originX?t.x*=-1:"center"===e.originX&&(t.x*=2*e.mouseXSign,t.x<0&&(e.mouseXSign=-e.mouseXSign)),"bottom"===e.originY?t.y*=-1:"center"===e.originY&&(t.y*=2*e.mouseYSign,t.y<0&&(e.mouseYSign=-e.mouseYSign)),n(t.x)>s?t.x<0?t.x+=s:t.x-=s:t.x=0,n(t.y)>s?t.y<0?t.y+=s:t.y-=s:t.y=0},_rotateObject:function(t,e){var n=this._currentTransform;if(n.target.get("lockRotation"))return!1;var s=r(n.ey-n.top,n.ex-n.left),o=r(e-n.top,t-n.left),a=i(o-s+n.theta),h=!0;if(n.target.snapAngle>0){var c=n.target.snapAngle,l=n.target.snapThreshold||c,u=Math.ceil(a/c)*c,f=Math.floor(a/c)*c;Math.abs(a-f)<l?a=f:Math.abs(a-u)<l&&(a=u)}return a<0&&(a=360+a),a%=360,n.target.angle===a?h=!1:n.target.angle=a,h},setCursor:function(t){this.upperCanvasEl.style.cursor=t},_resetObjectTransform:function(t){t.scaleX=1,t.scaleY=1,t.skewX=0,t.skewY=0,t.setAngle(0)},_drawSelection:function(t){var e=this._groupSelector,i=e.left,r=e.top,a=n(i),h=n(r);if(this.selectionColor&&(t.fillStyle=this.selectionColor,t.fillRect(e.ex-(i>0?0:-i),e.ey-(r>0?0:-r),a,h)),this.selectionLineWidth&&this.selectionBorderColor)if(t.lineWidth=this.selectionLineWidth,t.strokeStyle=this.selectionBorderColor,this.selectionDashArray.length>1&&!s){var c=e.ex+o-(i>0?0:a),l=e.ey+o-(r>0?0:h);t.beginPath(),fabric.util.drawDashedLine(t,c,l,c+a,l,this.selectionDashArray),fabric.util.drawDashedLine(t,c,l+h-1,c+a,l+h-1,this.selectionDashArray),fabric.util.drawDashedLine(t,c,l,c,l+h,this.selectionDashArray),fabric.util.drawDashedLine(t,c+a-1,l,c+a-1,l+h,this.selectionDashArray),t.closePath(),t.stroke()}else fabric.Object.prototype._setLineDash.call(this,t,this.selectionDashArray),t.strokeRect(e.ex+o-(i>0?0:a),e.ey+o-(r>0?0:h),a,h)},findTarget:function(t,e){if(!this.skipTargetFind){var i,r=!0,n=this.getPointer(t,r),s=this.getActiveGroup(),o=this.getActiveObject();if(this.targets=[],s&&!e&&s===this._searchPossibleTargets([s],n))return this._fireOverOutEvents(s,t),s;if(o&&o._findTargetCorner(n))return this._fireOverOutEvents(o,t),o;if(o&&o===this._searchPossibleTargets([o],n)){if(!this.preserveObjectStacking)return this._fireOverOutEvents(o,t),o;i=o}var a=this._searchPossibleTargets(this._objects,n);return t[this.altSelectionKey]&&a&&i&&a!==i&&(a=i),this._fireOverOutEvents(a,t),a}},_fireOverOutEvents:function(t,e){var i,r,n=this._hoveredTarget;n!==t&&(i={e:e,target:t,previousTarget:this._hoveredTarget},r={e:e,target:this._hoveredTarget,nextTarget:t},this._hoveredTarget=t),t?n!==t&&(n&&(this.fire("mouse:out",r),n.fire("mouseout",r)),this.fire("mouse:over",i),t.fire("mouseover",i)):n&&(this.fire("mouse:out",r),n.fire("mouseout",r))},_checkTarget:function(t,e){if(e&&e.visible&&e.evented&&this.containsPoint(null,e,t)){if(!this.perPixelTargetFind&&!e.perPixelTargetFind||e.isEditing)return!0;var i=this.isTargetTransparent(e,t.x,t.y);if(!i)return!0}},_searchPossibleTargets:function(t,e){for(var i,r,n,s=t.length;s--;)if(this._checkTarget(e,t[s])){i=t[s],"group"===i.type&&i.subTargetCheck&&(r=this._normalizePointer(i,e),n=this._searchPossibleTargets(i._objects,r),n&&this.targets.push(n));break}return i},restorePointerVpt:function(t){return fabric.util.transformPoint(t,fabric.util.invertTransform(this.viewportTransform))},getPointer:function(e,i,r){r||(r=this.upperCanvasEl);var n,s=t(e),o=r.getBoundingClientRect(),a=o.width||0,h=o.height||0;return a&&h||("top"in o&&"bottom"in o&&(h=Math.abs(o.top-o.bottom)),"right"in o&&"left"in o&&(a=Math.abs(o.right-o.left))),this.calcOffset(),s.x=s.x-this._offset.left,s.y=s.y-this._offset.top,i||(s=this.restorePointerVpt(s)),n=0===a||0===h?{width:1,height:1}:{width:r.width/a,height:r.height/h},{x:s.x*n.width,y:s.y*n.height}},_createUpperCanvas:function(){var t=this.lowerCanvasEl.className.replace(/\s*lower-canvas\s*/,"");this.upperCanvasEl=this._createCanvasElement(),fabric.util.addClass(this.upperCanvasEl,"upper-canvas "+t),this.wrapperEl.appendChild(this.upperCanvasEl),this._copyCanvasStyle(this.lowerCanvasEl,this.upperCanvasEl),this._applyCanvasStyle(this.upperCanvasEl),this.contextTop=this.upperCanvasEl.getContext("2d")},_createCacheCanvas:function(){this.cacheCanvasEl=this._createCanvasElement(),this.cacheCanvasEl.setAttribute("width",this.width),this.cacheCanvasEl.setAttribute("height",this.height),this.contextCache=this.cacheCanvasEl.getContext("2d")},_initWrapperElement:function(){this.wrapperEl=fabric.util.wrapElement(this.lowerCanvasEl,"div",{class:this.containerClass}),fabric.util.setStyle(this.wrapperEl,{width:this.getWidth()+"px",height:this.getHeight()+"px",position:"relative"}),fabric.util.makeElementUnselectable(this.wrapperEl)},_applyCanvasStyle:function(t){var e=this.getWidth()||t.width,i=this.getHeight()||t.height;fabric.util.setStyle(t,{position:"absolute",width:e+"px",height:i+"px",left:0,top:0,"touch-action":"none"}),t.width=e,t.height=i,fabric.util.makeElementUnselectable(t)},_copyCanvasStyle:function(t,e){e.style.cssText=t.style.cssText},getSelectionContext:function(){return this.contextTop},getSelectionElement:function(){return this.upperCanvasEl},_setActiveObject:function(t){var e=this._activeObject;e&&(e.set("active",!1),t!==e&&e.onDeselect&&"function"==typeof e.onDeselect&&e.onDeselect()),this._activeObject=t,t.set("active",!0)},setActiveObject:function(t,e){var i=this.getActiveObject();return i&&i!==t&&i.fire("deselected",{e:e}),this._setActiveObject(t),this.fire("object:selected",{target:t,e:e}),t.fire("selected",{e:e}),this.renderAll(),this},getActiveObject:function(){return this._activeObject},_onObjectRemoved:function(t){this.getActiveObject()===t&&(this.fire("before:selection:cleared",{target:t}),this._discardActiveObject(),this.fire("selection:cleared",{target:t}),t.fire("deselected")),this._hoveredTarget===t&&(this._hoveredTarget=null),this.callSuper("_onObjectRemoved",t)},_discardActiveObject:function(){var t=this._activeObject;t&&(t.set("active",!1),t.onDeselect&&"function"==typeof t.onDeselect&&t.onDeselect()),this._activeObject=null},discardActiveObject:function(t){var e=this._activeObject;return e&&(this.fire("before:selection:cleared",{target:e,e:t}),this._discardActiveObject(),this.fire("selection:cleared",{e:t}),e.fire("deselected",{e:t})),this},_setActiveGroup:function(t){this._activeGroup=t,t&&t.set("active",!0)},setActiveGroup:function(t,e){return this._setActiveGroup(t),t&&(this.fire("object:selected",{target:t,e:e}),t.fire("selected",{e:e})),this},getActiveGroup:function(){return this._activeGroup},_discardActiveGroup:function(){var t=this.getActiveGroup();t&&t.destroy(),this.setActiveGroup(null)},discardActiveGroup:function(t){var e=this.getActiveGroup();return e&&(this.fire("before:selection:cleared",{e:t,target:e}),this._discardActiveGroup(),this.fire("selection:cleared",{e:t})),this},deactivateAll:function(){for(var t,e=this.getObjects(),i=0,r=e.length;i<r;i++)t=e[i],t&&t.set("active",!1);return this._discardActiveGroup(),this._discardActiveObject(),this},deactivateAllWithDispatch:function(t){for(var e,i=this.getObjects(),r=0,n=i.length;r<n;r++)e=i[r],e&&e.set("active",!1);return this.discardActiveGroup(t),this.discardActiveObject(t),this},dispose:function(){this.callSuper("dispose");var t=this.wrapperEl;return this.removeListeners(),t.removeChild(this.upperCanvasEl),t.removeChild(this.lowerCanvasEl),delete this.upperCanvasEl,t.parentNode&&t.parentNode.replaceChild(this.lowerCanvasEl,this.wrapperEl),delete this.wrapperEl,this},clear:function(){return this.discardActiveGroup(),this.discardActiveObject(),this.clearContext(this.contextTop),this.callSuper("clear")},drawControls:function(t){var e=this.getActiveGroup();e?e._renderControls(t):this._drawObjectsControls(t)},_drawObjectsControls:function(t){for(var e,i=0,r=this._objects.length;i<r;++i)e=this._objects[i],e&&e.active&&e._renderControls(t)},_toObject:function(t,e,i){var r=this._realizeGroupTransformOnObject(t),n=this.callSuper("_toObject",t,e,i);return this._unwindGroupTransformOnObject(t,r),n},_realizeGroupTransformOnObject:function(t){var e=["angle","flipX","flipY","height","left","scaleX","scaleY","top","width"];if(t.group&&t.group===this.getActiveGroup()){var i={};return e.forEach(function(e){i[e]=t[e]}),this.getActiveGroup().realizeTransform(t),i}return null},_unwindGroupTransformOnObject:function(t,e){e&&t.set(e)},_setSVGObject:function(t,e,i){var r;r=this._realizeGroupTransformOnObject(e),this.callSuper("_setSVGObject",t,e,i),this._unwindGroupTransformOnObject(e,r)}});for(var a in fabric.StaticCanvas)"prototype"!==a&&(fabric.Canvas[a]=fabric.StaticCanvas[a]);fabric.isTouchSupported&&(fabric.Canvas.prototype._setCursorFromEvent=function(){}),fabric.Element=fabric.Canvas}(),function(){function t(t,e){return"which"in t?t.which===e:t.button===e-1}var e={mt:0,tr:1,mr:2,br:3,mb:4,bl:5,ml:6,tl:7},i=fabric.util.addListener,r=fabric.util.removeListener,n=3,s=2,o=1;fabric.util.object.extend(fabric.Canvas.prototype,{cursorMap:["n-resize","ne-resize","e-resize","se-resize","s-resize","sw-resize","w-resize","nw-resize"],
_initEventListeners:function(){this._bindEvents(),i(fabric.window,"resize",this._onResize),i(this.upperCanvasEl,"mousedown",this._onMouseDown),i(this.upperCanvasEl,"mousemove",this._onMouseMove),i(this.upperCanvasEl,"mouseout",this._onMouseOut),i(this.upperCanvasEl,"mouseenter",this._onMouseEnter),i(this.upperCanvasEl,"wheel",this._onMouseWheel),i(this.upperCanvasEl,"contextmenu",this._onContextMenu),i(this.upperCanvasEl,"touchstart",this._onMouseDown,{passive:!1}),i(this.upperCanvasEl,"touchmove",this._onMouseMove,{passive:!1}),"undefined"!=typeof eventjs&&"add"in eventjs&&(eventjs.add(this.upperCanvasEl,"gesture",this._onGesture),eventjs.add(this.upperCanvasEl,"drag",this._onDrag),eventjs.add(this.upperCanvasEl,"orientation",this._onOrientationChange),eventjs.add(this.upperCanvasEl,"shake",this._onShake),eventjs.add(this.upperCanvasEl,"longpress",this._onLongPress))},_bindEvents:function(){this._onMouseDown=this._onMouseDown.bind(this),this._onMouseMove=this._onMouseMove.bind(this),this._onMouseUp=this._onMouseUp.bind(this),this._onResize=this._onResize.bind(this),this._onGesture=this._onGesture.bind(this),this._onDrag=this._onDrag.bind(this),this._onShake=this._onShake.bind(this),this._onLongPress=this._onLongPress.bind(this),this._onOrientationChange=this._onOrientationChange.bind(this),this._onMouseWheel=this._onMouseWheel.bind(this),this._onMouseOut=this._onMouseOut.bind(this),this._onMouseEnter=this._onMouseEnter.bind(this),this._onContextMenu=this._onContextMenu.bind(this)},removeListeners:function(){r(fabric.window,"resize",this._onResize),r(this.upperCanvasEl,"mousedown",this._onMouseDown),r(this.upperCanvasEl,"mousemove",this._onMouseMove),r(this.upperCanvasEl,"mouseout",this._onMouseOut),r(this.upperCanvasEl,"mouseenter",this._onMouseEnter),r(this.upperCanvasEl,"wheel",this._onMouseWheel),r(this.upperCanvasEl,"contextmenu",this._onContextMenu),r(this.upperCanvasEl,"touchstart",this._onMouseDown),r(this.upperCanvasEl,"touchmove",this._onMouseMove),"undefined"!=typeof eventjs&&"remove"in eventjs&&(eventjs.remove(this.upperCanvasEl,"gesture",this._onGesture),eventjs.remove(this.upperCanvasEl,"drag",this._onDrag),eventjs.remove(this.upperCanvasEl,"orientation",this._onOrientationChange),eventjs.remove(this.upperCanvasEl,"shake",this._onShake),eventjs.remove(this.upperCanvasEl,"longpress",this._onLongPress))},_onGesture:function(t,e){this.__onTransformGesture&&this.__onTransformGesture(t,e)},_onDrag:function(t,e){this.__onDrag&&this.__onDrag(t,e)},_onMouseWheel:function(t){this.__onMouseWheel(t)},_onMouseOut:function(t){var e=this._hoveredTarget;this.fire("mouse:out",{target:e,e:t}),this._hoveredTarget=null,e&&e.fire("mouseout",{e:t}),this._iTextInstances&&this._iTextInstances.forEach(function(t){t.isEditing&&t.hiddenTextarea.focus()})},_onMouseEnter:function(t){this.findTarget(t)||(this.fire("mouse:over",{target:null,e:t}),this._hoveredTarget=null)},_onOrientationChange:function(t,e){this.__onOrientationChange&&this.__onOrientationChange(t,e)},_onShake:function(t,e){this.__onShake&&this.__onShake(t,e)},_onLongPress:function(t,e){this.__onLongPress&&this.__onLongPress(t,e)},_onContextMenu:function(t){return this.stopContextMenu&&(t.stopPropagation(),t.preventDefault()),!1},_onMouseDown:function(t){this.__onMouseDown(t),i(fabric.document,"touchend",this._onMouseUp,{passive:!1}),i(fabric.document,"touchmove",this._onMouseMove,{passive:!1}),r(this.upperCanvasEl,"mousemove",this._onMouseMove),r(this.upperCanvasEl,"touchmove",this._onMouseMove),"touchstart"===t.type?r(this.upperCanvasEl,"mousedown",this._onMouseDown):(i(fabric.document,"mouseup",this._onMouseUp),i(fabric.document,"mousemove",this._onMouseMove))},_onMouseUp:function(t){if(this.__onMouseUp(t),r(fabric.document,"mouseup",this._onMouseUp),r(fabric.document,"touchend",this._onMouseUp),r(fabric.document,"mousemove",this._onMouseMove),r(fabric.document,"touchmove",this._onMouseMove),i(this.upperCanvasEl,"mousemove",this._onMouseMove),i(this.upperCanvasEl,"touchmove",this._onMouseMove,{passive:!1}),"touchend"===t.type){var e=this;setTimeout(function(){i(e.upperCanvasEl,"mousedown",e._onMouseDown)},400)}},_onMouseMove:function(t){!this.allowTouchScrolling&&t.preventDefault&&t.preventDefault(),this.__onMouseMove(t)},_onResize:function(){this.calcOffset()},_shouldRender:function(t,e){var i=this.getActiveGroup()||this.getActiveObject();return(!i||!i.isEditing||t!==i)&&!!(t&&(t.isMoving||t!==i)||!t&&i||!t&&!i&&!this._groupSelector||e&&this._previousPointer&&this.selection&&(e.x!==this._previousPointer.x||e.y!==this._previousPointer.y))},__onMouseUp:function(e){var i;if(t(e,n))return void(this.fireRightClick&&this._handleEvent(e,"up",i,n));if(t(e,s))return void(this.fireMiddleClick&&this._handleEvent(e,"up",i,s));if(this.isDrawingMode&&this._isCurrentlyDrawing)return void this._onMouseUpInDrawingMode(e);var r=!0,a=this._currentTransform,h=this._groupSelector,c=!h||0===h.left&&0===h.top;a&&(this._finalizeCurrentTransform(),r=!a.actionPerformed),i=r?this.findTarget(e,!0):a.target;var l=this._shouldRender(i,this.getPointer(e));i||!c?this._maybeGroupObjects(e):(this._groupSelector=null,this._currentTransform=null),i&&(i.isMoving=!1),this._setCursorFromEvent(e,i),this._handleEvent(e,"up",i?i:null,o,c),i&&(i.__corner=0),l&&this.renderAll()},_handleEvent:function(t,e,i,r,n){var s="undefined"==typeof i?this.findTarget(t):i,a=this.targets||[],h={e:t,target:s,subTargets:a,button:r||o,isClick:n||!1};this.fire("mouse:"+e,h),s&&s.fire("mouse"+e,h);for(var c=0;c<a.length;c++)a[c].fire("mouse"+e,h)},_finalizeCurrentTransform:function(){var t=this._currentTransform,e=t.target;e._scaling&&(e._scaling=!1),e.setCoords(),this._restoreOriginXY(e),(t.actionPerformed||this.stateful&&e.hasStateChanged())&&(this.fire("object:modified",{target:e}),e.fire("modified"))},_restoreOriginXY:function(t){if(this._previousOriginX&&this._previousOriginY){var e=t.translateToOriginPoint(t.getCenterPoint(),this._previousOriginX,this._previousOriginY);t.originX=this._previousOriginX,t.originY=this._previousOriginY,t.left=e.x,t.top=e.y,this._previousOriginX=null,this._previousOriginY=null}},_onMouseDownInDrawingMode:function(t){this._isCurrentlyDrawing=!0,this.discardActiveObject(t).renderAll(),this.clipTo&&fabric.util.clipContext(this,this.contextTop);var e=this.getPointer(t);this.freeDrawingBrush.onMouseDown(e),this._handleEvent(t,"down")},_onMouseMoveInDrawingMode:function(t){if(this._isCurrentlyDrawing){var e=this.getPointer(t);this.freeDrawingBrush.onMouseMove(e)}this.setCursor(this.freeDrawingCursor),this._handleEvent(t,"move")},_onMouseUpInDrawingMode:function(t){this._isCurrentlyDrawing=!1,this.clipTo&&this.contextTop.restore(),this.freeDrawingBrush.onMouseUp(),this._handleEvent(t,"up")},__onMouseDown:function(e){var i=this.findTarget(e);if(t(e,n))return void(this.fireRightClick&&this._handleEvent(e,"down",i?i:null,n));if(t(e,s))return void(this.fireMiddleClick&&this._handleEvent(e,"down",i?i:null,s));if(this.isDrawingMode)return void this._onMouseDownInDrawingMode(e);if(!this._currentTransform){var r=this.getPointer(e,!0);this._previousPointer=r;var o=this._shouldRender(i,r),a=this._shouldGroup(e,i);if(this._shouldClearSelection(e,i)?this.deactivateAllWithDispatch(e):a&&(this._handleGrouping(e,i),i=this.getActiveGroup()),!this.selection||i&&(i.selectable||i.isEditing)||(this._groupSelector={ex:r.x,ey:r.y,top:0,left:0}),i){!i.selectable||!i.__corner&&a||(this._beforeTransform(e,i),this._setupCurrentTransform(e,i));var h=this.getActiveObject();i!==this.getActiveGroup()&&i!==h&&(this.deactivateAll(),i.selectable&&(h&&h.fire("deselected",{e:e}),this.setActiveObject(i,e)))}this._handleEvent(e,"down",i?i:null),o&&this.renderAll()}},_beforeTransform:function(t,e){this.stateful&&e.saveState(),e._findTargetCorner(this.getPointer(t))&&this.onBeforeScaleRotate(e)},_setOriginToCenter:function(t){this._previousOriginX=this._currentTransform.target.originX,this._previousOriginY=this._currentTransform.target.originY;var e=t.getCenterPoint();t.originX="center",t.originY="center",t.left=e.x,t.top=e.y,this._currentTransform.left=t.left,this._currentTransform.top=t.top},_setCenterToOrigin:function(t){var e=t.translateToOriginPoint(t.getCenterPoint(),this._previousOriginX,this._previousOriginY);t.originX=this._previousOriginX,t.originY=this._previousOriginY,t.left=e.x,t.top=e.y,this._previousOriginX=null,this._previousOriginY=null},__onMouseMove:function(t){var e,i;if(this.isDrawingMode)return void this._onMouseMoveInDrawingMode(t);if(!("undefined"!=typeof t.touches&&t.touches.length>1)){var r=this._groupSelector;r?(i=this.getPointer(t,!0),r.left=i.x-r.ex,r.top=i.y-r.ey,this.renderTop()):this._currentTransform?this._transformObject(t):(e=this.findTarget(t),this._setCursorFromEvent(t,e)),this._handleEvent(t,"move",e?e:null)}},__onMouseWheel:function(t){this._handleEvent(t,"wheel")},_transformObject:function(t){var e=this.getPointer(t),i=this._currentTransform;i.reset=!1,i.target.isMoving=!0,i.shiftKey=t.shiftKey,i.altKey=t[this.centeredKey],this._beforeScaleTransform(t,i),this._performTransformAction(t,i,e),i.actionPerformed&&this.renderAll()},_performTransformAction:function(t,e,i){var r=i.x,n=i.y,s=e.target,o=e.action,a=!1;"rotate"===o?(a=this._rotateObject(r,n))&&this._fire("rotating",s,t):"scale"===o?(a=this._onScale(t,e,r,n))&&this._fire("scaling",s,t):"scaleX"===o?(a=this._scaleObject(r,n,"x"))&&this._fire("scaling",s,t):"scaleY"===o?(a=this._scaleObject(r,n,"y"))&&this._fire("scaling",s,t):"skewX"===o?(a=this._skewObject(r,n,"x"))&&this._fire("skewing",s,t):"skewY"===o?(a=this._skewObject(r,n,"y"))&&this._fire("skewing",s,t):(a=this._translateObject(r,n),a&&(this._fire("moving",s,t),this.setCursor(s.moveCursor||this.moveCursor))),e.actionPerformed=e.actionPerformed||a},_fire:function(t,e,i){this.fire("object:"+t,{target:e,e:i}),e.fire(t,{e:i})},_beforeScaleTransform:function(t,e){if("scale"===e.action||"scaleX"===e.action||"scaleY"===e.action){var i=this._shouldCenterTransform(e.target);(i&&("center"!==e.originX||"center"!==e.originY)||!i&&"center"===e.originX&&"center"===e.originY)&&(this._resetCurrentTransform(),e.reset=!0)}},_onScale:function(t,e,i,r){return!t[this.uniScaleKey]&&!this.uniScaleTransform||e.target.get("lockUniScaling")?(e.reset||"scale"!==e.currentAction||this._resetCurrentTransform(),e.currentAction="scaleEqually",this._scaleObject(i,r,"equally")):(e.currentAction="scale",this._scaleObject(i,r))},_setCursorFromEvent:function(t,e){if(!e||!e.selectable)return this.setCursor(this.defaultCursor),!1;var i=e.hoverCursor||this.hoverCursor,r=this.getActiveGroup(),n=e._findTargetCorner&&(!r||!r.contains(e))&&e._findTargetCorner(this.getPointer(t,!0));return n?this._setCornerCursor(n,e,t):this.setCursor(i),!0},_setCornerCursor:function(t,i,r){if(t in e)this.setCursor(this._getRotatedCornerCursor(t,i,r));else{if("mtr"!==t||!i.hasRotatingPoint)return this.setCursor(this.defaultCursor),!1;this.setCursor(this.rotationCursor)}},_getRotatedCornerCursor:function(t,i,r){var n=Math.round(i.getAngle()%360/45);return n<0&&(n+=8),n+=e[t],r[this.altActionKey]&&e[t]%2===0&&(n+=2),n%=8,this.cursorMap[n]}})}(),function(){var t=Math.min,e=Math.max;fabric.util.object.extend(fabric.Canvas.prototype,{_shouldGroup:function(t,e){var i=this.getActiveObject();return t[this.selectionKey]&&e&&e.selectable&&(this.getActiveGroup()||i&&i!==e)&&this.selection},_handleGrouping:function(t,e){var i=this.getActiveGroup();(e!==i||(e=this.findTarget(t,!0)))&&(i?this._updateActiveGroup(e,t):this._createActiveGroup(e,t))},_updateActiveGroup:function(t,e){var i=this.getActiveGroup();if(i.contains(t)){if(i.removeWithUpdate(t),t.set("active",!1),1===i.size())return this.discardActiveGroup(e),void this.setActiveObject(i.item(0),e)}else i.addWithUpdate(t);this.fire("selection:created",{target:i,e:e}),i.set("active",!0)},_createActiveGroup:function(t,e){if(this._activeObject&&t!==this._activeObject){var i=this._createGroup(t);i.addWithUpdate(),this.setActiveGroup(i,e),this._activeObject=null,this.fire("selection:created",{target:i,e:e})}t.set("active",!0)},_createGroup:function(t){var e=this.getObjects(),i=e.indexOf(this._activeObject)<e.indexOf(t),r=i?[this._activeObject,t]:[t,this._activeObject];return this._activeObject.isEditing&&this._activeObject.exitEditing(),new fabric.Group(r,{canvas:this})},_groupSelectedObjects:function(t){var e=this._collectObjects();1===e.length?this.setActiveObject(e[0],t):e.length>1&&(e=new fabric.Group(e.reverse(),{canvas:this}),e.addWithUpdate(),this.setActiveGroup(e,t),this.fire("selection:created",{target:e,e:t}),this.renderAll())},_collectObjects:function(){for(var i,r=[],n=this._groupSelector.ex,s=this._groupSelector.ey,o=n+this._groupSelector.left,a=s+this._groupSelector.top,h=new fabric.Point(t(n,o),t(s,a)),c=new fabric.Point(e(n,o),e(s,a)),l=n===o&&s===a,u=this._objects.length;u--&&(i=this._objects[u],!(i&&i.selectable&&i.visible&&(i.intersectsWithRect(h,c)||i.isContainedWithinRect(h,c)||i.containsPoint(h)||i.containsPoint(c))&&(i.set("active",!0),r.push(i),l))););return r},_maybeGroupObjects:function(t){this.selection&&this._groupSelector&&this._groupSelectedObjects(t);var e=this.getActiveGroup();e&&(e.setObjectsCoords().setCoords(),e.isMoving=!1,this.setCursor(this.defaultCursor)),this._groupSelector=null,this._currentTransform=null}})}(),function(){var t=fabric.StaticCanvas.supports("toDataURLWithQuality");fabric.util.object.extend(fabric.StaticCanvas.prototype,{toDataURL:function(t){t||(t={});var e=t.format||"png",i=t.quality||1,r=t.multiplier||1,n={left:t.left||0,top:t.top||0,width:t.width||0,height:t.height||0};return this.__toDataURLWithMultiplier(e,i,n,r)},__toDataURLWithMultiplier:function(t,e,i,r){var n=this.getWidth(),s=this.getHeight(),o=(i.width||this.getWidth())*r,a=(i.height||this.getHeight())*r,h=this.getZoom(),c=h*r,l=this.viewportTransform,u=(l[4]-i.left)*r,f=(l[5]-i.top)*r,d=[c,0,0,c,u,f],g=this.interactive;this.viewportTransform=d,this.interactive&&(this.interactive=!1),n!==o||s!==a?this.setDimensions({width:o,height:a}):this.renderAll();var p=this.__toDataURL(t,e,i);return g&&(this.interactive=g),this.viewportTransform=l,this.setDimensions({width:n,height:s}),p},__toDataURL:function(e,i){var r=this.contextContainer.canvas;"jpg"===e&&(e="jpeg");var n=t?r.toDataURL("image/"+e,i):r.toDataURL("image/"+e);return n},toDataURLWithMultiplier:function(t,e,i){return this.toDataURL({format:t,multiplier:e,quality:i})}})}(),fabric.util.object.extend(fabric.StaticCanvas.prototype,{loadFromDatalessJSON:function(t,e,i){return this.loadFromJSON(t,e,i)},loadFromJSON:function(t,e,i){if(t){var r="string"==typeof t?JSON.parse(t):fabric.util.object.clone(t);this.clear();var n=this;return this._enlivenObjects(r.objects,function(){n._setBgOverlay(r,function(){delete r.objects,delete r.backgroundImage,delete r.overlayImage,delete r.background,delete r.overlay,n._setOptions(r),e&&e()})},i),this}},_setBgOverlay:function(t,e){var i=this,r={backgroundColor:!1,overlayColor:!1,backgroundImage:!1,overlayImage:!1};if(!(t.backgroundImage||t.overlayImage||t.background||t.overlay))return void(e&&e());var n=function(){r.backgroundImage&&r.overlayImage&&r.backgroundColor&&r.overlayColor&&(i.renderAll(),e&&e())};this.__setBgOverlay("backgroundImage",t.backgroundImage,r,n),this.__setBgOverlay("overlayImage",t.overlayImage,r,n),this.__setBgOverlay("backgroundColor",t.background,r,n),this.__setBgOverlay("overlayColor",t.overlay,r,n)},__setBgOverlay:function(t,e,i,r){var n=this;return e?void("backgroundImage"===t||"overlayImage"===t?fabric.util.enlivenObjects([e],function(e){n[t]=e[0],i[t]=!0,r&&r()}):this["set"+fabric.util.string.capitalize(t,!0)](e,function(){i[t]=!0,r&&r()})):(i[t]=!0,void(r&&r()))},_enlivenObjects:function(t,e,i){var r=this;if(!t||0===t.length)return void(e&&e());var n=this.renderOnAddRemove;this.renderOnAddRemove=!1,fabric.util.enlivenObjects(t,function(t){t.forEach(function(t,e){r.insertAt(t,e)}),r.renderOnAddRemove=n,e&&e()},null,i)},_toDataURL:function(t,e){this.clone(function(i){e(i.toDataURL(t))})},_toDataURLWithMultiplier:function(t,e,i){this.clone(function(r){i(r.toDataURLWithMultiplier(t,e))})},clone:function(t,e){var i=JSON.stringify(this.toJSON(e));this.cloneWithoutData(function(e){e.loadFromJSON(i,function(){t&&t(e)})})},cloneWithoutData:function(t){var e=fabric.document.createElement("canvas");e.width=this.getWidth(),e.height=this.getHeight();var i=new fabric.Canvas(e);i.clipTo=this.clipTo,this.backgroundImage?(i.setBackgroundImage(this.backgroundImage.src,function(){i.renderAll(),t&&t(i)}),i.backgroundImageOpacity=this.backgroundImageOpacity,i.backgroundImageStretch=this.backgroundImageStretch):t&&t(i)}}),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend,r=e.util.object.clone,n=e.util.toFixed,s=e.util.string.capitalize,o=e.util.degreesToRadians,a=e.StaticCanvas.supports("setLineDash"),h=!e.isLikelyNode;e.Object||(e.Object=e.util.createClass(e.CommonMethods,{type:"object",originX:"left",originY:"top",top:0,left:0,width:0,height:0,scaleX:1,scaleY:1,flipX:!1,flipY:!1,opacity:1,angle:0,skewX:0,skewY:0,cornerSize:13,transparentCorners:!0,hoverCursor:null,moveCursor:null,padding:0,borderColor:"rgba(102,153,255,0.75)",borderDashArray:null,cornerColor:"rgba(102,153,255,0.5)",cornerStrokeColor:null,cornerStyle:"rect",cornerDashArray:null,centeredScaling:!1,centeredRotation:!0,fill:"rgb(0,0,0)",fillRule:"nonzero",globalCompositeOperation:"source-over",backgroundColor:"",selectionBackgroundColor:"",stroke:null,strokeWidth:1,strokeDashArray:null,strokeLineCap:"butt",strokeLineJoin:"miter",strokeMiterLimit:10,shadow:null,borderOpacityWhenMoving:.4,borderScaleFactor:1,transformMatrix:null,minScaleLimit:.01,selectable:!0,evented:!0,visible:!0,hasControls:!0,hasBorders:!0,hasRotatingPoint:!0,rotatingPointOffset:40,perPixelTargetFind:!1,includeDefaultValues:!0,clipTo:null,lockMovementX:!1,lockMovementY:!1,lockRotation:!1,lockScalingX:!1,lockScalingY:!1,lockUniScaling:!1,lockSkewingX:!1,lockSkewingY:!1,lockScalingFlip:!1,excludeFromExport:!1,objectCaching:h,statefullCache:!1,noScaleCache:!0,dirty:!0,needsItsOwnCache:!1,stateProperties:"top left width height scaleX scaleY flipX flipY originX originY transformMatrix stroke strokeWidth strokeDashArray strokeLineCap strokeLineJoin strokeMiterLimit angle opacity fill fillRule globalCompositeOperation shadow clipTo visible backgroundColor skewX skewY".split(" "),cacheProperties:"fill stroke strokeWidth strokeDashArray width height stroke strokeWidth strokeDashArray strokeLineCap strokeLineJoin strokeMiterLimit fillRule backgroundColor".split(" "),initialize:function(t){t=t||{},t&&this.setOptions(t),this.objectCaching&&this._createCacheCanvas()},_createCacheCanvas:function(){this._cacheProperties={},this._cacheCanvas=e.document.createElement("canvas"),this._cacheContext=this._cacheCanvas.getContext("2d"),this._updateCacheCanvas()},_getCacheCanvasDimensions:function(){var t=this.canvas&&this.canvas.getZoom()||1,i=this.getObjectScaling(),r=this._getNonTransformedDimensions(),n=this.canvas&&this.canvas._isRetinaScaling()?e.devicePixelRatio:1,s=i.scaleX*t*n,o=i.scaleY*t*n,a=r.x*s,h=r.y*o;return{width:a+2,height:h+2,zoomX:s,zoomY:o}},_updateCacheCanvas:function(){if(this.noScaleCache&&this.canvas&&this.canvas._currentTransform){var t=this.canvas._currentTransform.action;if("scale"===t.slice(0,5))return!1}var e=this._getCacheCanvasDimensions(),i=e.width,r=e.height,n=e.zoomX,s=e.zoomY;return(i!==this.cacheWidth||r!==this.cacheHeight)&&(this._cacheCanvas.width=Math.ceil(i),this._cacheCanvas.height=Math.ceil(r),this._cacheContext.translate(i/2,r/2),this._cacheContext.scale(n,s),this.cacheWidth=i,this.cacheHeight=r,this.zoomX=n,this.zoomY=s,!0)},setOptions:function(t){this._setOptions(t),this._initGradient(t.fill,"fill"),this._initGradient(t.stroke,"stroke"),this._initClipping(t),this._initPattern(t.fill,"fill"),this._initPattern(t.stroke,"stroke")},transform:function(t,e){this.group&&!this.group._transformDone&&this.group.transform(t);var i=e?this._getLeftTopCoords():this.getCenterPoint();t.translate(i.x,i.y),this.angle&&t.rotate(o(this.angle)),t.scale(this.scaleX*(this.flipX?-1:1),this.scaleY*(this.flipY?-1:1)),this.skewX&&t.transform(1,0,Math.tan(o(this.skewX)),1,0,0),this.skewY&&t.transform(1,Math.tan(o(this.skewY)),0,1,0,0)},toObject:function(t){var i=e.Object.NUM_FRACTION_DIGITS,r={type:this.type,originX:this.originX,originY:this.originY,left:n(this.left,i),top:n(this.top,i),width:n(this.width,i),height:n(this.height,i),fill:this.fill&&this.fill.toObject?this.fill.toObject():this.fill,stroke:this.stroke&&this.stroke.toObject?this.stroke.toObject():this.stroke,strokeWidth:n(this.strokeWidth,i),strokeDashArray:this.strokeDashArray?this.strokeDashArray.concat():this.strokeDashArray,strokeLineCap:this.strokeLineCap,strokeLineJoin:this.strokeLineJoin,strokeMiterLimit:n(this.strokeMiterLimit,i),scaleX:n(this.scaleX,i),scaleY:n(this.scaleY,i),angle:n(this.getAngle(),i),flipX:this.flipX,flipY:this.flipY,opacity:n(this.opacity,i),shadow:this.shadow&&this.shadow.toObject?this.shadow.toObject():this.shadow,visible:this.visible,clipTo:this.clipTo&&String(this.clipTo),backgroundColor:this.backgroundColor,fillRule:this.fillRule,globalCompositeOperation:this.globalCompositeOperation,transformMatrix:this.transformMatrix?this.transformMatrix.concat():null,skewX:n(this.skewX,i),skewY:n(this.skewY,i)};return e.util.populateWithProperties(this,r,t),this.includeDefaultValues||(r=this._removeDefaultValues(r)),r},toDatalessObject:function(t){return this.toObject(t)},_removeDefaultValues:function(t){var i=e.util.getKlass(t.type).prototype,r=i.stateProperties;return r.forEach(function(e){t[e]===i[e]&&delete t[e];var r="[object Array]"===Object.prototype.toString.call(t[e])&&"[object Array]"===Object.prototype.toString.call(i[e]);r&&0===t[e].length&&0===i[e].length&&delete t[e]}),t},toString:function(){return"#<fabric."+s(this.type)+">"},getObjectScaling:function(){var t=this.scaleX,e=this.scaleY;if(this.group){var i=this.group.getObjectScaling();t*=i.scaleX,e*=i.scaleY}return{scaleX:t,scaleY:e}},getObjectOpacity:function(){var t=this.opacity;return this.group&&(t*=this.group.getObjectOpacity()),t},_set:function(t,i){var r="scaleX"===t||"scaleY"===t;return r&&(i=this._constrainScale(i)),"scaleX"===t&&i<0?(this.flipX=!this.flipX,i*=-1):"scaleY"===t&&i<0?(this.flipY=!this.flipY,i*=-1):"shadow"!==t||!i||i instanceof e.Shadow?"dirty"===t&&this.group&&this.group.set("dirty",i):i=new e.Shadow(i),this[t]=i,this.cacheProperties.indexOf(t)>-1&&(this.group&&this.group.set("dirty",!0),this.dirty=!0),this.group&&this.stateProperties.indexOf(t)>-1&&this.group.set("dirty",!0),"width"!==t&&"height"!==t||(this.minScaleLimit=Math.min(.1,1/Math.max(this.width,this.height))),this},setOnGroup:function(){},getViewportTransform:function(){return this.canvas&&this.canvas.viewportTransform?this.canvas.viewportTransform:e.iMatrix.concat()},render:function(t){0===this.width&&0===this.height||!this.visible||this.canvas&&this.canvas.skipOffscreen&&!this.group&&!this.isOnScreen()||(t.save(),this._setupCompositeOperation(t),this.drawSelectionBackground(t),this.transform(t),this._setOpacity(t),this._setShadow(t,this),this.transformMatrix&&t.transform.apply(t,this.transformMatrix),this.clipTo&&e.util.clipContext(this,t),this.shouldCache()?(this._cacheCanvas||this._createCacheCanvas(),this.isCacheDirty()&&(this.statefullCache&&this.saveState({propertySet:"cacheProperties"}),this.drawObject(this._cacheContext),this.dirty=!1),this.drawCacheOnCanvas(t)):(this.drawObject(t),this.objectCaching&&this.statefullCache&&this.saveState({propertySet:"cacheProperties"})),this.clipTo&&t.restore(),t.restore())},shouldCache:function(){return this.objectCaching&&(!this.group||this.needsItsOwnCache||!this.group.isCaching())},willDrawShadow:function(){return!!this.shadow},drawObject:function(t){this._renderBackground(t),this._setStrokeStyles(t,this),this._setFillStyles(t,this),this._render(t)},drawCacheOnCanvas:function(t){t.scale(1/this.zoomX,1/this.zoomY),t.drawImage(this._cacheCanvas,-this.cacheWidth/2,-this.cacheHeight/2)},isCacheDirty:function(t){if(!t&&this._updateCacheCanvas())return!0;if(this.dirty||this.statefullCache&&this.hasStateChanged("cacheProperties")){if(!t){var e=this.cacheWidth/this.zoomX,i=this.cacheHeight/this.zoomY;this._cacheContext.clearRect(-e/2,-i/2,e,i)}return!0}return!1},_renderBackground:function(t){if(this.backgroundColor){var e=this._getNonTransformedDimensions();t.fillStyle=this.backgroundColor,t.fillRect(-e.x/2,-e.y/2,e.x,e.y),this._removeShadow(t)}},_setOpacity:function(t){this.group&&!this.group.transformDone?t.globalAlpha=this.getObjectOpacity():t.globalAlpha*=this.opacity},_setStrokeStyles:function(t,e){e.stroke&&(t.lineWidth=e.strokeWidth,t.lineCap=e.strokeLineCap,t.lineJoin=e.strokeLineJoin,t.miterLimit=e.strokeMiterLimit,t.strokeStyle=e.stroke.toLive?e.stroke.toLive(t,this):e.stroke)},_setFillStyles:function(t,e){e.fill&&(t.fillStyle=e.fill.toLive?e.fill.toLive(t,this):e.fill)},_setLineDash:function(t,e,i){e&&(1&e.length&&e.push.apply(e,e),a?t.setLineDash(e):i&&i(t))},_renderControls:function(t,i){var r,n=this.getViewportTransform(),s=this.calcTransformMatrix();i=i||{},s=e.util.multiplyTransformMatrices(n,s),r=e.util.qrDecompose(s),t.save(),t.translate(r.translateX,r.translateY),t.lineWidth=1*this.borderScaleFactor,this.group||(t.globalAlpha=this.isMoving?this.borderOpacityWhenMoving:1),this.group&&this.group===this.canvas.getActiveGroup()?(t.rotate(o(r.angle)),(this.hasBorders||i.hasBorders)&&this.drawBordersInGroup(t,r,i)):(t.rotate(o(this.angle)),(this.hasBorders||i.hasBorders)&&this.drawBorders(t,i)),(this.hasControls||i.hasControls)&&this.drawControls(t,i),t.restore()},_setShadow:function(t){if(this.shadow){var i=this.canvas&&this.canvas.viewportTransform[0]||1,r=this.canvas&&this.canvas.viewportTransform[3]||1,n=this.getObjectScaling();this.canvas&&this.canvas._isRetinaScaling()&&(i*=e.devicePixelRatio,r*=e.devicePixelRatio),t.shadowColor=this.shadow.color,t.shadowBlur=this.shadow.blur*(i+r)*(n.scaleX+n.scaleY)/4,t.shadowOffsetX=this.shadow.offsetX*i*n.scaleX,t.shadowOffsetY=this.shadow.offsetY*r*n.scaleY}},_removeShadow:function(t){this.shadow&&(t.shadowColor="",t.shadowBlur=t.shadowOffsetX=t.shadowOffsetY=0)},_applyPatternGradientTransform:function(t,e){if(e.toLive){var i=e.gradientTransform||e.patternTransform,r=-this.width/2+e.offsetX||0,n=-this.height/2+e.offsetY||0;t.translate(r,n),i&&t.transform.apply(t,i)}},_renderFill:function(t){this.fill&&(t.save(),this._applyPatternGradientTransform(t,this.fill),"evenodd"===this.fillRule?t.fill("evenodd"):t.fill(),t.restore())},_renderStroke:function(t){this.stroke&&0!==this.strokeWidth&&(this.shadow&&!this.shadow.affectStroke&&this._removeShadow(t),t.save(),this._setLineDash(t,this.strokeDashArray,this._renderDashedStroke),this._applyPatternGradientTransform(t,this.stroke),t.stroke(),t.restore())},_findCenterFromElement:function(){return{x:this.left+this.width/2,y:this.top+this.height/2}},_removeTransformMatrix:function(){var t=this._findCenterFromElement();if(this.transformMatrix){var i=e.util.qrDecompose(this.transformMatrix);this.flipX=!1,this.flipY=!1,this.set("scaleX",i.scaleX),this.set("scaleY",i.scaleY),this.angle=i.angle,this.skewX=i.skewX,this.skewY=0,t=e.util.transformPoint(t,this.transformMatrix)}this.transformMatrix=null,this.setPositionByOrigin(t,"center","center")},clone:function(t,i){return this.constructor.fromObject?this.constructor.fromObject(this.toObject(i),t):new e.Object(this.toObject(i))},cloneAsImage:function(t,i){var r=this.toDataURL(i);return e.util.loadImage(r,function(i){t&&t(new e.Image(i))}),this},toDataURL:function(t){t||(t={});var i=e.util.createCanvasElement(),r=this.getBoundingRect();i.width=r.width,i.height=r.height,e.util.wrapElement(i,"div");var n=new e.StaticCanvas(i,{enableRetinaScaling:t.enableRetinaScaling});"jpg"===t.format&&(t.format="jpeg"),"jpeg"===t.format&&(n.backgroundColor="#fff");var s={active:this.get("active"),left:this.getLeft(),top:this.getTop()};this.set("active",!1),this.setPositionByOrigin(new e.Point(n.getWidth()/2,n.getHeight()/2),"center","center");var o=this.canvas;n.add(this);var a=n.toDataURL(t);return this.set(s).setCoords(),this.canvas=o,n.dispose(),n=null,a},isType:function(t){return this.type===t},complexity:function(){return 1},toJSON:function(t){return this.toObject(t)},setGradient:function(t,i){i||(i={});var r={colorStops:[]};return r.type=i.type||(i.r1||i.r2?"radial":"linear"),r.coords={x1:i.x1,y1:i.y1,x2:i.x2,y2:i.y2},(i.r1||i.r2)&&(r.coords.r1=i.r1,r.coords.r2=i.r2),r.gradientTransform=i.gradientTransform,e.Gradient.prototype.addColorStop.call(r,i.colorStops),this.set(t,e.Gradient.forObject(this,r))},setPatternFill:function(t){return this.set("fill",new e.Pattern(t))},setShadow:function(t){return this.set("shadow",t?new e.Shadow(t):null)},setColor:function(t){return this.set("fill",t),this},setAngle:function(t){var e=("center"!==this.originX||"center"!==this.originY)&&this.centeredRotation;return e&&this._setOriginToCenter(),this.set("angle",t),e&&this._resetOrigin(),this},centerH:function(){return this.canvas&&this.canvas.centerObjectH(this),this},viewportCenterH:function(){return this.canvas&&this.canvas.viewportCenterObjectH(this),this},centerV:function(){return this.canvas&&this.canvas.centerObjectV(this),this},viewportCenterV:function(){return this.canvas&&this.canvas.viewportCenterObjectV(this),this},center:function(){return this.canvas&&this.canvas.centerObject(this),this},viewportCenter:function(){return this.canvas&&this.canvas.viewportCenterObject(this),this},remove:function(){return this.canvas&&this.canvas.remove(this),this},getLocalPointer:function(t,i){i=i||this.canvas.getPointer(t);var r=new e.Point(i.x,i.y),n=this._getLeftTopCoords();return this.angle&&(r=e.util.rotatePoint(r,n,o(-this.angle))),{x:r.x-n.x,y:r.y-n.y}},_setupCompositeOperation:function(t){this.globalCompositeOperation&&(t.globalCompositeOperation=this.globalCompositeOperation)}}),e.util.createAccessors(e.Object),e.Object.prototype.rotate=e.Object.prototype.setAngle,i(e.Object.prototype,e.Observable),e.Object.NUM_FRACTION_DIGITS=2,e.Object._fromObject=function(t,i,n,s,o){var a=e[t];if(i=r(i,!0),!s){var h=o?new a(i[o],i):new a(i);return n&&n(h),h}e.util.enlivenPatterns([i.fill,i.stroke],function(t){"undefined"!=typeof t[0]&&(i.fill=t[0]),"undefined"!=typeof t[1]&&(i.stroke=t[1]);var e=o?new a(i[o],i):new a(i);n&&n(e)})},e.Object.__uid=0)}("undefined"!=typeof exports?exports:this),function(){var t=fabric.util.degreesToRadians,e={left:-.5,center:0,right:.5},i={top:-.5,center:0,bottom:.5};fabric.util.object.extend(fabric.Object.prototype,{translateToGivenOrigin:function(t,r,n,s,o){var a,h,c,l=t.x,u=t.y;return"string"==typeof r?r=e[r]:r-=.5,"string"==typeof s?s=e[s]:s-=.5,a=s-r,"string"==typeof n?n=i[n]:n-=.5,"string"==typeof o?o=i[o]:o-=.5,h=o-n,(a||h)&&(c=this._getTransformedDimensions(),l=t.x+a*c.x,u=t.y+h*c.y),new fabric.Point(l,u)},translateToCenterPoint:function(e,i,r){var n=this.translateToGivenOrigin(e,i,r,"center","center");return this.angle?fabric.util.rotatePoint(n,e,t(this.angle)):n},translateToOriginPoint:function(e,i,r){var n=this.translateToGivenOrigin(e,"center","center",i,r);return this.angle?fabric.util.rotatePoint(n,e,t(this.angle)):n},getCenterPoint:function(){var t=new fabric.Point(this.left,this.top);return this.translateToCenterPoint(t,this.originX,this.originY)},getPointByOrigin:function(t,e){var i=this.getCenterPoint();return this.translateToOriginPoint(i,t,e)},toLocalPoint:function(e,i,r){var n,s,o=this.getCenterPoint();return n="undefined"!=typeof i&&"undefined"!=typeof r?this.translateToGivenOrigin(o,"center","center",i,r):new fabric.Point(this.left,this.top),s=new fabric.Point(e.x,e.y),this.angle&&(s=fabric.util.rotatePoint(s,o,-t(this.angle))),s.subtractEquals(n)},setPositionByOrigin:function(t,e,i){var r=this.translateToCenterPoint(t,e,i),n=this.translateToOriginPoint(r,this.originX,this.originY);this.set("left",n.x),
this.set("top",n.y)},adjustPosition:function(i){var r,n,s=t(this.angle),o=this.getWidth(),a=Math.cos(s)*o,h=Math.sin(s)*o;r="string"==typeof this.originX?e[this.originX]:this.originX-.5,n="string"==typeof i?e[i]:i-.5,this.left+=a*(n-r),this.top+=h*(n-r),this.setCoords(),this.originX=i},_setOriginToCenter:function(){this._originalOriginX=this.originX,this._originalOriginY=this.originY;var t=this.getCenterPoint();this.originX="center",this.originY="center",this.left=t.x,this.top=t.y},_resetOrigin:function(){var t=this.translateToOriginPoint(this.getCenterPoint(),this._originalOriginX,this._originalOriginY);this.originX=this._originalOriginX,this.originY=this._originalOriginY,this.left=t.x,this.top=t.y,this._originalOriginX=null,this._originalOriginY=null},_getLeftTopCoords:function(){return this.translateToOriginPoint(this.getCenterPoint(),"left","top")},onDeselect:function(){}})}(),function(){function t(t){return[new fabric.Point(t.tl.x,t.tl.y),new fabric.Point(t.tr.x,t.tr.y),new fabric.Point(t.br.x,t.br.y),new fabric.Point(t.bl.x,t.bl.y)]}var e=fabric.util.degreesToRadians,i=fabric.util.multiplyTransformMatrices;fabric.util.object.extend(fabric.Object.prototype,{oCoords:null,aCoords:null,getCoords:function(e,i){this.oCoords||this.setCoords();var r=e?this.aCoords:this.oCoords;return t(i?this.calcCoords(e):r)},intersectsWithRect:function(t,e,i,r){var n=this.getCoords(i,r),s=fabric.Intersection.intersectPolygonRectangle(n,t,e);return"Intersection"===s.status},intersectsWithObject:function(t,e,i){var r=fabric.Intersection.intersectPolygonPolygon(this.getCoords(e,i),t.getCoords(e,i));return"Intersection"===r.status||t.isContainedWithinObject(this,e,i)||this.isContainedWithinObject(t,e,i)},isContainedWithinObject:function(t,e,i){for(var r=this.getCoords(e,i),n=0,s=t._getImageLines(i?t.calcCoords(e):e?t.aCoords:t.oCoords);n<4;n++)if(!t.containsPoint(r[n],s))return!1;return!0},isContainedWithinRect:function(t,e,i,r){var n=this.getBoundingRect(i,r);return n.left>=t.x&&n.left+n.width<=e.x&&n.top>=t.y&&n.top+n.height<=e.y},containsPoint:function(t,e,i,r){var e=e||this._getImageLines(r?this.calcCoords(i):i?this.aCoords:this.oCoords),n=this._findCrossPoints(t,e);return 0!==n&&n%2===1},isOnScreen:function(t){if(!this.canvas)return!1;for(var e,i=this.canvas.vptCoords.tl,r=this.canvas.vptCoords.br,n=this.getCoords(!0,t),s=0;s<4;s++)if(e=n[s],e.x<=r.x&&e.x>=i.x&&e.y<=r.y&&e.y>=i.y)return!0;if(this.intersectsWithRect(i,r,!0))return!0;var o={x:(i.x+r.x)/2,y:(i.y+r.y)/2};return!!this.containsPoint(o,null,!0)},_getImageLines:function(t){return{topline:{o:t.tl,d:t.tr},rightline:{o:t.tr,d:t.br},bottomline:{o:t.br,d:t.bl},leftline:{o:t.bl,d:t.tl}}},_findCrossPoints:function(t,e){var i,r,n,s,o,a,h=0;for(var c in e)if(a=e[c],!(a.o.y<t.y&&a.d.y<t.y||a.o.y>=t.y&&a.d.y>=t.y||(a.o.x===a.d.x&&a.o.x>=t.x?o=a.o.x:(i=0,r=(a.d.y-a.o.y)/(a.d.x-a.o.x),n=t.y-i*t.x,s=a.o.y-r*a.o.x,o=-(n-s)/(i-r)),o>=t.x&&(h+=1),2!==h)))break;return h},getBoundingRectWidth:function(){return this.getBoundingRect().width},getBoundingRectHeight:function(){return this.getBoundingRect().height},getBoundingRect:function(t,e){var i=this.getCoords(t,e);return fabric.util.makeBoundingBoxFromPoints(i)},getWidth:function(){return this._getTransformedDimensions().x},getHeight:function(){return this._getTransformedDimensions().y},_constrainScale:function(t){return Math.abs(t)<this.minScaleLimit?t<0?-this.minScaleLimit:this.minScaleLimit:t},scale:function(t){return t=this._constrainScale(t),t<0&&(this.flipX=!this.flipX,this.flipY=!this.flipY,t*=-1),this.scaleX=t,this.scaleY=t,this.setCoords()},scaleToWidth:function(t){var e=this.getBoundingRect().width/this.getWidth();return this.scale(t/this.width/e)},scaleToHeight:function(t){var e=this.getBoundingRect().height/this.getHeight();return this.scale(t/this.height/e)},calcCoords:function(t){var i=e(this.angle),r=this.getViewportTransform(),n=t?this._getTransformedDimensions():this._calculateCurrentDimensions(),s=n.x,o=n.y,a=Math.sin(i),h=Math.cos(i),c=s>0?Math.atan(o/s):0,l=s/Math.cos(c)/2,u=Math.cos(c+i)*l,f=Math.sin(c+i)*l,d=this.getCenterPoint(),g=t?d:fabric.util.transformPoint(d,r),p=new fabric.Point(g.x-u,g.y-f),v=new fabric.Point(p.x+s*h,p.y+s*a),m=new fabric.Point(p.x-o*a,p.y+o*h),b=new fabric.Point(g.x+u,g.y+f);if(!t)var _=new fabric.Point((p.x+m.x)/2,(p.y+m.y)/2),y=new fabric.Point((v.x+p.x)/2,(v.y+p.y)/2),x=new fabric.Point((b.x+v.x)/2,(b.y+v.y)/2),C=new fabric.Point((b.x+m.x)/2,(b.y+m.y)/2),S=new fabric.Point(y.x+a*this.rotatingPointOffset,y.y-h*this.rotatingPointOffset);var g={tl:p,tr:v,br:b,bl:m};return t||(g.ml=_,g.mt=y,g.mr=x,g.mb=C,g.mtr=S),g},setCoords:function(t,e){return this.oCoords=this.calcCoords(t),e||(this.aCoords=this.calcCoords(!0)),t||this._setCornerCoords&&this._setCornerCoords(),this},_calcRotateMatrix:function(){if(this.angle){var t=e(this.angle),i=Math.cos(t),r=Math.sin(t);return 6.123233995736766e-17!==i&&i!==-1.8369701987210297e-16||(i=0),[i,r,-r,i,0,0]}return fabric.iMatrix.concat()},calcTransformMatrix:function(t){var e=this.getCenterPoint(),r=[1,0,0,1,e.x,e.y],n=this._calcRotateMatrix(),s=this._calcDimensionsTransformMatrix(this.skewX,this.skewY,!0),o=this.group&&!t?this.group.calcTransformMatrix():fabric.iMatrix.concat();return o=i(o,r),o=i(o,n),o=i(o,s)},_calcDimensionsTransformMatrix:function(t,r,n){var s=[1,0,Math.tan(e(t)),1],o=[1,Math.tan(e(r)),0,1],a=this.scaleX*(n&&this.flipX?-1:1),h=this.scaleY*(n&&this.flipY?-1:1),c=[a,0,0,h],l=i(c,s,!0);return i(l,o,!0)},_getNonTransformedDimensions:function(){var t=this.strokeWidth,e=this.width+t,i=this.height+t;return{x:e,y:i}},_getTransformedDimensions:function(t,e){"undefined"==typeof t&&(t=this.skewX),"undefined"==typeof e&&(e=this.skewY);var i,r,n=this._getNonTransformedDimensions(),s=n.x/2,o=n.y/2,a=[{x:-s,y:-o},{x:s,y:-o},{x:-s,y:o},{x:s,y:o}],h=this._calcDimensionsTransformMatrix(t,e,!1);for(i=0;i<a.length;i++)a[i]=fabric.util.transformPoint(a[i],h);return r=fabric.util.makeBoundingBoxFromPoints(a),{x:r.width,y:r.height}},_calculateCurrentDimensions:function(){var t=this.getViewportTransform(),e=this._getTransformedDimensions(),i=fabric.util.transformPoint(e,t,!0);return i.scalarAdd(2*this.padding)}})}(),fabric.util.object.extend(fabric.Object.prototype,{sendToBack:function(){return this.group?fabric.StaticCanvas.prototype.sendToBack.call(this.group,this):this.canvas.sendToBack(this),this},bringToFront:function(){return this.group?fabric.StaticCanvas.prototype.bringToFront.call(this.group,this):this.canvas.bringToFront(this),this},sendBackwards:function(t){return this.group?fabric.StaticCanvas.prototype.sendBackwards.call(this.group,this,t):this.canvas.sendBackwards(this,t),this},bringForward:function(t){return this.group?fabric.StaticCanvas.prototype.bringForward.call(this.group,this,t):this.canvas.bringForward(this,t),this},moveTo:function(t){return this.group?fabric.StaticCanvas.prototype.moveTo.call(this.group,this,t):this.canvas.moveTo(this,t),this}}),function(){function t(t,e){if(e){if(e.toLive)return t+": url(#SVGID_"+e.id+"); ";var i=new fabric.Color(e),r=t+": "+i.toRgb()+"; ",n=i.getAlpha();return 1!==n&&(r+=t+"-opacity: "+n.toString()+"; "),r}return t+": none; "}var e=fabric.Object.NUM_FRACTION_DIGITS,i=fabric.util.toFixed;fabric.util.object.extend(fabric.Object.prototype,{getSvgStyles:function(e){var i=this.fillRule,r=this.strokeWidth?this.strokeWidth:"0",n=this.strokeDashArray?this.strokeDashArray.join(" "):"none",s=this.strokeLineCap?this.strokeLineCap:"butt",o=this.strokeLineJoin?this.strokeLineJoin:"miter",a=this.strokeMiterLimit?this.strokeMiterLimit:"4",h="undefined"!=typeof this.opacity?this.opacity:"1",c=this.visible?"":" visibility: hidden;",l=e?"":this.getSvgFilter(),u=t("fill",this.fill),f=t("stroke",this.stroke);return[f,"stroke-width: ",r,"; ","stroke-dasharray: ",n,"; ","stroke-linecap: ",s,"; ","stroke-linejoin: ",o,"; ","stroke-miterlimit: ",a,"; ",u,"fill-rule: ",i,"; ","opacity: ",h,";",l,c].join("")},getSvgSpanStyles:function(e){var i=e.strokeWidth?"stroke-width: "+e.strokeWidth+"; ":"",r=e.fontFamily?"font-family: "+e.fontFamily.replace(/"/g,"'")+"; ":"",n=e.fontSize?"font-size: "+e.fontSize+"; ":"",s=e.fontStyle?"font-style: "+e.fontStyle+"; ":"",o=e.fontWeight?"font-weight: "+e.fontWeight+"; ":"",a=e.fill?t("fill",e.fill):"",h=e.stroke?t("stroke",e.stroke):"",c=this.getSvgTextDecoration(e);return[h,i,r,n,s,o,c,a].join("")},getSvgTextDecoration:function(t){return"overline"in t||"underline"in t||"linethrough"in t?"text-decoration: "+(t.overline?"overline ":"")+(t.underline?"underline ":"")+(t.linethrough?"line-through ":"")+";":""},getSvgFilter:function(){return this.shadow?"filter: url(#SVGID_"+this.shadow.id+");":""},getSvgId:function(){return this.id?'id="'+this.id+'" ':""},getSvgTransform:function(){var t=this.getAngle(),e=this.getSkewX()%360,r=this.getSkewY()%360,n=this.getCenterPoint(),s=fabric.Object.NUM_FRACTION_DIGITS,o="translate("+i(n.x,s)+" "+i(n.y,s)+")",a=0!==t?" rotate("+i(t,s)+")":"",h=1===this.scaleX&&1===this.scaleY?"":" scale("+i(this.scaleX,s)+" "+i(this.scaleY,s)+")",c=0!==e?" skewX("+i(e,s)+")":"",l=0!==r?" skewY("+i(r,s)+")":"",u=this.flipX?" matrix(-1 0 0 1 0 0) ":"",f=this.flipY?" matrix(1 0 0 -1 0 0)":"";return[o,a,h,u,f,c,l].join("")},getSvgTransformMatrix:function(){return this.transformMatrix?" matrix("+this.transformMatrix.join(" ")+") ":""},_setSVGBg:function(t){this.backgroundColor&&t.push("\t\t<rect ",this._getFillAttributes(this.backgroundColor),' x="',i(-this.width/2,e),'" y="',i(-this.height/2,e),'" width="',i(this.width,e),'" height="',i(this.height,e),'"></rect>\n')},_createBaseSVGMarkup:function(){var t=[];return this.fill&&this.fill.toLive&&t.push(this.fill.toSVG(this,!1)),this.stroke&&this.stroke.toLive&&t.push(this.stroke.toSVG(this,!1)),this.shadow&&t.push(this.shadow.toSVG(this)),t}})}(),function(){function t(t,e,r){var n={},s=!0;r.forEach(function(e){n[e]=t[e]}),i(t[e],n,s)}function e(t,i,r){if(!fabric.isLikelyNode&&t instanceof Element)return t===i;if(t instanceof Array){if(t.length!==i.length)return!1;for(var n=0,s=t.length;n<s;n++)if(t[n]!==i[n])return!1;return!0}if(t&&"object"==typeof t){if(!r&&Object.keys(t).length!==Object.keys(i).length)return!1;for(var o in t)if(!e(t[o],i[o]))return!1;return!0}return t===i}var i=fabric.util.object.extend,r="stateProperties";fabric.util.object.extend(fabric.Object.prototype,{hasStateChanged:function(t){return t=t||r,t="_"+t,!Object.keys(this[t]).length||!e(this[t],this,!0)},saveState:function(e){var i=e&&e.propertySet||r,n="_"+i;return this[n]?(t(this,n,this[i]),e&&e.stateProperties&&t(this,n,e.stateProperties),this):this.setupState(e)},setupState:function(t){t=t||{};var e=t.propertySet||r;return t.propertySet=e,this["_"+e]={},this.saveState(t),this}})}(),function(){var t=fabric.util.degreesToRadians;fabric.util.object.extend(fabric.Object.prototype,{_controlsVisibility:null,_findTargetCorner:function(t){if(!this.hasControls||!this.active)return!1;var e,i,r=t.x,n=t.y;this.__corner=0;for(var s in this.oCoords)if(this.isControlVisible(s)&&("mtr"!==s||this.hasRotatingPoint)&&(!this.get("lockUniScaling")||"mt"!==s&&"mr"!==s&&"mb"!==s&&"ml"!==s)&&(i=this._getImageLines(this.oCoords[s].corner),e=this._findCrossPoints({x:r,y:n},i),0!==e&&e%2===1))return this.__corner=s,s;return!1},_setCornerCoords:function(){var e,i,r=this.oCoords,n=t(45-this.angle),s=.707106*this.cornerSize,o=s*Math.cos(n),a=s*Math.sin(n);for(var h in r)e=r[h].x,i=r[h].y,r[h].corner={tl:{x:e-a,y:i-o},tr:{x:e+o,y:i-a},bl:{x:e-o,y:i+a},br:{x:e+a,y:i+o}}},drawSelectionBackground:function(e){if(!this.selectionBackgroundColor||this.group||!this.active||this.canvas&&!this.canvas.interactive)return this;e.save();var i=this.getCenterPoint(),r=this._calculateCurrentDimensions(),n=this.canvas.viewportTransform;return e.translate(i.x,i.y),e.scale(1/n[0],1/n[3]),e.rotate(t(this.angle)),e.fillStyle=this.selectionBackgroundColor,e.fillRect(-r.x/2,-r.y/2,r.x,r.y),e.restore(),this},drawBorders:function(t,e){e=e||{};var i=this._calculateCurrentDimensions(),r=1/this.borderScaleFactor,n=i.x+r,s=i.y+r;if(t.save(),t.strokeStyle=e.borderColor||this.borderColor,this._setLineDash(t,e.borderDashArray||this.borderDashArray,null),t.strokeRect(-n/2,-s/2,n,s),e.hasRotatingPoint||this.hasRotatingPoint&&this.isControlVisible("mtr")&&!this.get("lockRotation")&&this.hasControls){var o=-s/2;t.beginPath(),t.moveTo(0,o),t.lineTo(0,o-this.rotatingPointOffset),t.closePath(),t.stroke()}return t.restore(),this},drawBordersInGroup:function(t,e,i){i=i||{};var r=this._getNonTransformedDimensions(),n=fabric.util.customTransformMatrix(e.scaleX,e.scaleY,e.skewX),s=fabric.util.transformPoint(r,n),o=1/this.borderScaleFactor,a=s.x+o,h=s.y+o;return t.save(),this._setLineDash(t,i.borderDashArray||this.borderDashArray,null),t.strokeStyle=i.borderColor||this.borderColor,t.strokeRect(-a/2,-h/2,a,h),t.restore(),this},drawControls:function(t,e){e=e||{};var i=this._calculateCurrentDimensions(),r=i.x,n=i.y,s=e.cornerSize||this.cornerSize,o=-(r+s)/2,a=-(n+s)/2,h=e.transparentCorners||this.transparentCorners?"stroke":"fill";return t.save(),t.strokeStyle=t.fillStyle=e.cornerColor||this.cornerColor,this.transparentCorners||(t.strokeStyle=e.cornerStrokeColor||this.cornerStrokeColor),this._setLineDash(t,e.cornerDashArray||this.cornerDashArray,null),this._drawControl("tl",t,h,o,a,e),this._drawControl("tr",t,h,o+r,a,e),this._drawControl("bl",t,h,o,a+n,e),this._drawControl("br",t,h,o+r,a+n,e),this.get("lockUniScaling")||(this._drawControl("mt",t,h,o+r/2,a,e),this._drawControl("mb",t,h,o+r/2,a+n,e),this._drawControl("mr",t,h,o+r,a+n/2,e),this._drawControl("ml",t,h,o,a+n/2,e)),(e.hasRotatingPoint||this.hasRotatingPoint)&&this._drawControl("mtr",t,h,o+r/2,a-this.rotatingPointOffset,e),t.restore(),this},_drawControl:function(t,e,i,r,n,s){if(s=s||{},this.isControlVisible(t)){var o=this.cornerSize,a=!this.transparentCorners&&this.cornerStrokeColor;switch(s.cornerStyle||this.cornerStyle){case"circle":e.beginPath(),e.arc(r+o/2,n+o/2,o/2,0,2*Math.PI,!1),e[i](),a&&e.stroke();break;default:this.transparentCorners||e.clearRect(r,n,o,o),e[i+"Rect"](r,n,o,o),a&&e.strokeRect(r,n,o,o)}}},isControlVisible:function(t){return this._getControlsVisibility()[t]},setControlVisible:function(t,e){return this._getControlsVisibility()[t]=e,this},setControlsVisibility:function(t){t||(t={});for(var e in t)this.setControlVisible(e,t[e]);return this},_getControlsVisibility:function(){return this._controlsVisibility||(this._controlsVisibility={tl:!0,tr:!0,br:!0,bl:!0,ml:!0,mt:!0,mr:!0,mb:!0,mtr:!0}),this._controlsVisibility}})}(),fabric.util.object.extend(fabric.StaticCanvas.prototype,{FX_DURATION:500,fxCenterObjectH:function(t,e){e=e||{};var i=function(){},r=e.onComplete||i,n=e.onChange||i,s=this;return fabric.util.animate({startValue:t.get("left"),endValue:this.getCenter().left,duration:this.FX_DURATION,onChange:function(e){t.set("left",e),s.renderAll(),n()},onComplete:function(){t.setCoords(),r()}}),this},fxCenterObjectV:function(t,e){e=e||{};var i=function(){},r=e.onComplete||i,n=e.onChange||i,s=this;return fabric.util.animate({startValue:t.get("top"),endValue:this.getCenter().top,duration:this.FX_DURATION,onChange:function(e){t.set("top",e),s.renderAll(),n()},onComplete:function(){t.setCoords(),r()}}),this},fxRemove:function(t,e){e=e||{};var i=function(){},r=e.onComplete||i,n=e.onChange||i,s=this;return fabric.util.animate({startValue:t.get("opacity"),endValue:0,duration:this.FX_DURATION,onStart:function(){t.set("active",!1)},onChange:function(e){t.set("opacity",e),s.renderAll(),n()},onComplete:function(){s.remove(t),r()}}),this}}),fabric.util.object.extend(fabric.Object.prototype,{animate:function(){if(arguments[0]&&"object"==typeof arguments[0]){var t,e,i=[];for(t in arguments[0])i.push(t);for(var r=0,n=i.length;r<n;r++)t=i[r],e=r!==n-1,this._animate(t,arguments[0][t],arguments[1],e)}else this._animate.apply(this,arguments);return this},_animate:function(t,e,i,r){var n,s=this;e=e.toString(),i=i?fabric.util.object.clone(i):{},~t.indexOf(".")&&(n=t.split("."));var o=n?this.get(n[0])[n[1]]:this.get(t);"from"in i||(i.from=o),e=~e.indexOf("=")?o+parseFloat(e.replace("=","")):parseFloat(e),fabric.util.animate({startValue:i.from,endValue:e,byValue:i.by,easing:i.easing,duration:i.duration,abort:i.abort&&function(){return i.abort.call(s)},onChange:function(e){n?s[n[0]][n[1]]=e:s.set(t,e),r||i.onChange&&i.onChange()},onComplete:function(){r||(s.setCoords(),i.onComplete&&i.onComplete())}})}}),function(t){"use strict";function e(t,e){var i=t.origin,r=t.axis1,n=t.axis2,s=t.dimension,o=e.nearest,a=e.center,h=e.farthest;return function(){switch(this.get(i)){case o:return Math.min(this.get(r),this.get(n));case a:return Math.min(this.get(r),this.get(n))+.5*this.get(s);case h:return Math.max(this.get(r),this.get(n))}}}var i=t.fabric||(t.fabric={}),r=i.util.object.extend,n=i.util.object.clone,s={x1:1,x2:1,y1:1,y2:1},o=i.StaticCanvas.supports("setLineDash");if(i.Line)return void i.warn("fabric.Line is already defined");var a=i.Object.prototype.cacheProperties.concat();a.push("x1","x2","y1","y2"),i.Line=i.util.createClass(i.Object,{type:"line",x1:0,y1:0,x2:0,y2:0,cacheProperties:a,initialize:function(t,e){t||(t=[0,0,0,0]),this.callSuper("initialize",e),this.set("x1",t[0]),this.set("y1",t[1]),this.set("x2",t[2]),this.set("y2",t[3]),this._setWidthHeight(e)},_setWidthHeight:function(t){t||(t={}),this.width=Math.abs(this.x2-this.x1),this.height=Math.abs(this.y2-this.y1),this.left="left"in t?t.left:this._getLeftToOriginX(),this.top="top"in t?t.top:this._getTopToOriginY()},_set:function(t,e){return this.callSuper("_set",t,e),"undefined"!=typeof s[t]&&this._setWidthHeight(),this},_getLeftToOriginX:e({origin:"originX",axis1:"x1",axis2:"x2",dimension:"width"},{nearest:"left",center:"center",farthest:"right"}),_getTopToOriginY:e({origin:"originY",axis1:"y1",axis2:"y2",dimension:"height"},{nearest:"top",center:"center",farthest:"bottom"}),_render:function(t){if(t.beginPath(),!this.strokeDashArray||this.strokeDashArray&&o){var e=this.calcLinePoints();t.moveTo(e.x1,e.y1),t.lineTo(e.x2,e.y2)}t.lineWidth=this.strokeWidth;var i=t.strokeStyle;t.strokeStyle=this.stroke||t.fillStyle,this.stroke&&this._renderStroke(t),t.strokeStyle=i},_renderDashedStroke:function(t){var e=this.calcLinePoints();t.beginPath(),i.util.drawDashedLine(t,e.x1,e.y1,e.x2,e.y2,this.strokeDashArray),t.closePath()},_findCenterFromElement:function(){return{x:(this.x1+this.x2)/2,y:(this.y1+this.y2)/2}},toObject:function(t){return r(this.callSuper("toObject",t),this.calcLinePoints())},_getNonTransformedDimensions:function(){var t=this.callSuper("_getNonTransformedDimensions");return"butt"===this.strokeLineCap&&(0===this.width&&(t.y-=this.strokeWidth),0===this.height&&(t.x-=this.strokeWidth)),t},calcLinePoints:function(){var t=this.x1<=this.x2?-1:1,e=this.y1<=this.y2?-1:1,i=t*this.width*.5,r=e*this.height*.5,n=t*this.width*-.5,s=e*this.height*-.5;return{x1:i,x2:n,y1:r,y2:s}},toSVG:function(t){var e=this._createBaseSVGMarkup(),i=this.calcLinePoints();return e.push("<line ",this.getSvgId(),'x1="',i.x1,'" y1="',i.y1,'" x2="',i.x2,'" y2="',i.y2,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),this.getSvgTransformMatrix(),'"/>\n'),t?t(e.join("")):e.join("")}}),i.Line.ATTRIBUTE_NAMES=i.SHARED_ATTRIBUTES.concat("x1 y1 x2 y2".split(" ")),i.Line.fromElement=function(t,e){e=e||{};var n=i.parseAttributes(t,i.Line.ATTRIBUTE_NAMES),s=[n.x1||0,n.y1||0,n.x2||0,n.y2||0];return e.originX="left",e.originY="top",new i.Line(s,r(n,e))},i.Line.fromObject=function(t,e,r){function s(t){delete t.points,e&&e(t)}var o=n(t,!0);o.points=[t.x1,t.y1,t.x2,t.y2];var a=i.Object._fromObject("Line",o,s,r,"points");return a&&delete a.points,a}}("undefined"!=typeof exports?exports:this),function(t){"use strict";function e(t){return"radius"in t&&t.radius>=0}var i=t.fabric||(t.fabric={}),r=Math.PI,n=i.util.object.extend;if(i.Circle)return void i.warn("fabric.Circle is already defined.");var s=i.Object.prototype.cacheProperties.concat();s.push("radius"),i.Circle=i.util.createClass(i.Object,{type:"circle",radius:0,startAngle:0,endAngle:2*r,cacheProperties:s,initialize:function(t){this.callSuper("initialize",t),this.set("radius",t&&t.radius||0)},_set:function(t,e){return this.callSuper("_set",t,e),"radius"===t&&this.setRadius(e),this},toObject:function(t){return this.callSuper("toObject",["radius","startAngle","endAngle"].concat(t))},toSVG:function(t){var e=this._createBaseSVGMarkup(),i=0,n=0,s=(this.endAngle-this.startAngle)%(2*r);if(0===s)e.push("<circle ",this.getSvgId(),'cx="'+i+'" cy="'+n+'" ','r="',this.radius,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform()," ",this.getSvgTransformMatrix(),'"/>\n');else{var o=Math.cos(this.startAngle)*this.radius,a=Math.sin(this.startAngle)*this.radius,h=Math.cos(this.endAngle)*this.radius,c=Math.sin(this.endAngle)*this.radius,l=s>r?"1":"0";e.push('<path d="M '+o+" "+a," A "+this.radius+" "+this.radius," 0 ",+l+" 1"," "+h+" "+c,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform()," ",this.getSvgTransformMatrix(),'"/>\n')}return t?t(e.join("")):e.join("")},_render:function(t){t.beginPath(),t.arc(0,0,this.radius,this.startAngle,this.endAngle,!1),this._renderFill(t),this._renderStroke(t)},getRadiusX:function(){return this.get("radius")*this.get("scaleX")},getRadiusY:function(){return this.get("radius")*this.get("scaleY")},setRadius:function(t){return this.radius=t,this.set("width",2*t).set("height",2*t)}}),i.Circle.ATTRIBUTE_NAMES=i.SHARED_ATTRIBUTES.concat("cx cy r".split(" ")),i.Circle.fromElement=function(t,r){r||(r={});var s=i.parseAttributes(t,i.Circle.ATTRIBUTE_NAMES);if(!e(s))throw new Error("value of `r` attribute is required and can not be negative");return s.left=(s.left||0)-s.radius,s.top=(s.top||0)-s.radius,s.originX="left",s.originY="top",new i.Circle(n(s,r))},i.Circle.fromObject=function(t,e,r){return i.Object._fromObject("Circle",t,e,r)}}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={});return e.Triangle?void e.warn("fabric.Triangle is already defined"):(e.Triangle=e.util.createClass(e.Object,{type:"triangle",initialize:function(t){this.callSuper("initialize",t),this.set("width",t&&t.width||100).set("height",t&&t.height||100)},_render:function(t){var e=this.width/2,i=this.height/2;t.beginPath(),t.moveTo(-e,i),t.lineTo(0,-i),t.lineTo(e,i),t.closePath(),this._renderFill(t),this._renderStroke(t)},_renderDashedStroke:function(t){var i=this.width/2,r=this.height/2;t.beginPath(),e.util.drawDashedLine(t,-i,r,0,-r,this.strokeDashArray),e.util.drawDashedLine(t,0,-r,i,r,this.strokeDashArray),e.util.drawDashedLine(t,i,r,-i,r,this.strokeDashArray),t.closePath()},toSVG:function(t){var e=this._createBaseSVGMarkup(),i=this.width/2,r=this.height/2,n=[-i+" "+r,"0 "+-r,i+" "+r].join(",");return e.push("<polygon ",this.getSvgId(),'points="',n,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),'"/>'),t?t(e.join("")):e.join("")}}),void(e.Triangle.fromObject=function(t,i,r){return e.Object._fromObject("Triangle",t,i,r)}))}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=2*Math.PI,r=e.util.object.extend;if(e.Ellipse)return void e.warn("fabric.Ellipse is already defined.");var n=e.Object.prototype.cacheProperties.concat();n.push("rx","ry"),e.Ellipse=e.util.createClass(e.Object,{type:"ellipse",rx:0,ry:0,cacheProperties:n,initialize:function(t){this.callSuper("initialize",t),this.set("rx",t&&t.rx||0),this.set("ry",t&&t.ry||0)},_set:function(t,e){switch(this.callSuper("_set",t,e),t){case"rx":this.rx=e,this.set("width",2*e);break;case"ry":this.ry=e,this.set("height",2*e)}return this},getRx:function(){return this.get("rx")*this.get("scaleX")},getRy:function(){return this.get("ry")*this.get("scaleY")},toObject:function(t){return this.callSuper("toObject",["rx","ry"].concat(t))},toSVG:function(t){var e=this._createBaseSVGMarkup(),i=0,r=0;return e.push("<ellipse ",this.getSvgId(),'cx="',i,'" cy="',r,'" ','rx="',this.rx,'" ry="',this.ry,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),this.getSvgTransformMatrix(),'"/>\n'),t?t(e.join("")):e.join("")},_render:function(t){t.beginPath(),t.save(),t.transform(1,0,0,this.ry/this.rx,0,0),t.arc(0,0,this.rx,0,i,!1),t.restore(),this._renderFill(t),this._renderStroke(t)}}),e.Ellipse.ATTRIBUTE_NAMES=e.SHARED_ATTRIBUTES.concat("cx cy rx ry".split(" ")),e.Ellipse.fromElement=function(t,i){i||(i={});var n=e.parseAttributes(t,e.Ellipse.ATTRIBUTE_NAMES);return n.left=(n.left||0)-n.rx,n.top=(n.top||0)-n.ry,n.originX="left",n.originY="top",new e.Ellipse(r(n,i))},e.Ellipse.fromObject=function(t,i,r){return e.Object._fromObject("Ellipse",t,i,r)}}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend;if(e.Rect)return void e.warn("fabric.Rect is already defined");var r=e.Object.prototype.stateProperties.concat();r.push("rx","ry");var n=e.Object.prototype.cacheProperties.concat();n.push("rx","ry"),e.Rect=e.util.createClass(e.Object,{stateProperties:r,type:"rect",rx:0,ry:0,cacheProperties:n,initialize:function(t){this.callSuper("initialize",t),this._initRxRy()},_initRxRy:function(){this.rx&&!this.ry?this.ry=this.rx:this.ry&&!this.rx&&(this.rx=this.ry)},_render:function(t){if(1===this.width&&1===this.height)return void t.fillRect(-.5,-.5,1,1);var e=this.rx?Math.min(this.rx,this.width/2):0,i=this.ry?Math.min(this.ry,this.height/2):0,r=this.width,n=this.height,s=-this.width/2,o=-this.height/2,a=0!==e||0!==i,h=.4477152502;t.beginPath(),t.moveTo(s+e,o),t.lineTo(s+r-e,o),a&&t.bezierCurveTo(s+r-h*e,o,s+r,o+h*i,s+r,o+i),t.lineTo(s+r,o+n-i),a&&t.bezierCurveTo(s+r,o+n-h*i,s+r-h*e,o+n,s+r-e,o+n),t.lineTo(s+e,o+n),a&&t.bezierCurveTo(s+h*e,o+n,s,o+n-h*i,s,o+n-i),t.lineTo(s,o+i),a&&t.bezierCurveTo(s,o+h*i,s+h*e,o,s+e,o),t.closePath(),this._renderFill(t),this._renderStroke(t)},_renderDashedStroke:function(t){var i=-this.width/2,r=-this.height/2,n=this.width,s=this.height;t.beginPath(),e.util.drawDashedLine(t,i,r,i+n,r,this.strokeDashArray),e.util.drawDashedLine(t,i+n,r,i+n,r+s,this.strokeDashArray),e.util.drawDashedLine(t,i+n,r+s,i,r+s,this.strokeDashArray),e.util.drawDashedLine(t,i,r+s,i,r,this.strokeDashArray),t.closePath()},toObject:function(t){return this.callSuper("toObject",["rx","ry"].concat(t))},toSVG:function(t){var e=this._createBaseSVGMarkup(),i=-this.width/2,r=-this.height/2;return e.push("<rect ",this.getSvgId(),'x="',i,'" y="',r,'" rx="',this.get("rx"),'" ry="',this.get("ry"),'" width="',this.width,'" height="',this.height,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),this.getSvgTransformMatrix(),'"/>\n'),t?t(e.join("")):e.join("")}}),e.Rect.ATTRIBUTE_NAMES=e.SHARED_ATTRIBUTES.concat("x y rx ry width height".split(" ")),e.Rect.fromElement=function(t,r){if(!t)return null;r=r||{};var n=e.parseAttributes(t,e.Rect.ATTRIBUTE_NAMES);n.left=n.left||0,n.top=n.top||0,n.originX="left",n.originY="top";var s=new e.Rect(i(r?e.util.object.clone(r):{},n));return s.visible=s.visible&&s.width>0&&s.height>0,s},e.Rect.fromObject=function(t,i,r){return e.Object._fromObject("Rect",t,i,r)}}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend,r=e.util.array.min,n=e.util.array.max,s=e.util.toFixed,o=e.Object.NUM_FRACTION_DIGITS;if(e.Polyline)return void e.warn("fabric.Polyline is already defined");var a=e.Object.prototype.cacheProperties.concat();a.push("points"),e.Polyline=e.util.createClass(e.Object,{type:"polyline",points:null,minX:0,minY:0,cacheProperties:a,initialize:function(t,e){e=e||{},this.points=t||[],this.callSuper("initialize",e),this._calcDimensions(),"top"in e||(this.top=this.minY),"left"in e||(this.left=this.minX),this.pathOffset={x:this.minX+this.width/2,y:this.minY+this.height/2}},_calcDimensions:function(){var t=this.points,e=r(t,"x"),i=r(t,"y"),s=n(t,"x"),o=n(t,"y");this.width=s-e||0,this.height=o-i||0,this.minX=e||0,this.minY=i||0},toObject:function(t){return i(this.callSuper("toObject",t),{points:this.points.concat()})},toSVG:function(t){for(var e=[],i=this.pathOffset.x,r=this.pathOffset.y,n=this._createBaseSVGMarkup(),a=0,h=this.points.length;a<h;a++)e.push(s(this.points[a].x-i,o),",",s(this.points[a].y-r,o)," ");return n.push("<",this.type," ",this.getSvgId(),'points="',e.join(""),'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform()," ",this.getSvgTransformMatrix(),'"/>\n'),t?t(n.join("")):n.join("")},commonRender:function(t){var e,i=this.points.length,r=this.pathOffset.x,n=this.pathOffset.y;if(!i||isNaN(this.points[i-1].y))return!1;t.beginPath(),t.moveTo(this.points[0].x-r,this.points[0].y-n);for(var s=0;s<i;s++)e=this.points[s],t.lineTo(e.x-r,e.y-n);return!0},_render:function(t){this.commonRender(t)&&(this._renderFill(t),this._renderStroke(t))},_renderDashedStroke:function(t){var i,r;t.beginPath();for(var n=0,s=this.points.length;n<s;n++)i=this.points[n],r=this.points[n+1]||i,e.util.drawDashedLine(t,i.x,i.y,r.x,r.y,this.strokeDashArray)},complexity:function(){return this.get("points").length}}),e.Polyline.ATTRIBUTE_NAMES=e.SHARED_ATTRIBUTES.concat(),e.Polyline.fromElement=function(t,i){if(!t)return null;i||(i={});var r=e.parsePointsAttribute(t.getAttribute("points")),n=e.parseAttributes(t,e.Polyline.ATTRIBUTE_NAMES);return new e.Polyline(r,e.util.object.extend(n,i))},e.Polyline.fromObject=function(t,i,r){return e.Object._fromObject("Polyline",t,i,r,"points")}}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend;return e.Polygon?void e.warn("fabric.Polygon is already defined"):(e.Polygon=e.util.createClass(e.Polyline,{type:"polygon",_render:function(t){this.commonRender(t)&&(t.closePath(),this._renderFill(t),this._renderStroke(t))},_renderDashedStroke:function(t){this.callSuper("_renderDashedStroke",t),t.closePath()}}),e.Polygon.ATTRIBUTE_NAMES=e.SHARED_ATTRIBUTES.concat(),e.Polygon.fromElement=function(t,r){if(!t)return null;r||(r={});var n=e.parsePointsAttribute(t.getAttribute("points")),s=e.parseAttributes(t,e.Polygon.ATTRIBUTE_NAMES);return new e.Polygon(n,i(s,r))},void(e.Polygon.fromObject=function(t,i,r){return e.Object._fromObject("Polygon",t,i,r,"points")}))}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.array.min,r=e.util.array.max,n=e.util.object.extend,s=Object.prototype.toString,o=e.util.drawArc,a={m:2,l:2,h:1,v:1,c:6,s:4,q:4,t:2,a:7},h={m:"l",M:"L"};if(e.Path)return void e.warn("fabric.Path is already defined");var c=e.Object.prototype.cacheProperties.concat();c.push("path"),e.Path=e.util.createClass(e.Object,{type:"path",path:null,minX:0,minY:0,cacheProperties:c,initialize:function(t,e){e=e||{},e&&this.setOptions(e),t||(t=[]);var i="[object Array]"===s.call(t);this.path=i?t:t.match&&t.match(/[mzlhvcsqta][^mzlhvcsqta]*/gi),this.path&&(i||(this.path=this._parsePath()),this._setPositionDimensions(e),this.objectCaching&&this._createCacheCanvas())},_setPositionDimensions:function(t){var e=this._parseDimensions();this.minX=e.left,this.minY=e.top,this.width=e.width,this.height=e.height,"undefined"==typeof t.left&&(this.left=e.left+("center"===this.originX?this.width/2:"right"===this.originX?this.width:0)),"undefined"==typeof t.top&&(this.top=e.top+("center"===this.originY?this.height/2:"bottom"===this.originY?this.height:0)),this.pathOffset=this.pathOffset||{x:this.minX+this.width/2,y:this.minY+this.height/2}},_renderPathCommands:function(t){var e,i,r,n=null,s=0,a=0,h=0,c=0,l=0,u=0,f=-this.pathOffset.x,d=-this.pathOffset.y;t.beginPath();for(var g=0,p=this.path.length;g<p;++g){switch(e=this.path[g],e[0]){case"l":h+=e[1],c+=e[2],t.lineTo(h+f,c+d);break;case"L":h=e[1],c=e[2],t.lineTo(h+f,c+d);break;case"h":h+=e[1],t.lineTo(h+f,c+d);break;case"H":h=e[1],t.lineTo(h+f,c+d);break;case"v":c+=e[1],t.lineTo(h+f,c+d);break;case"V":c=e[1],t.lineTo(h+f,c+d);break;case"m":h+=e[1],c+=e[2],s=h,a=c,t.moveTo(h+f,c+d);
break;case"M":h=e[1],c=e[2],s=h,a=c,t.moveTo(h+f,c+d);break;case"c":i=h+e[5],r=c+e[6],l=h+e[3],u=c+e[4],t.bezierCurveTo(h+e[1]+f,c+e[2]+d,l+f,u+d,i+f,r+d),h=i,c=r;break;case"C":h=e[5],c=e[6],l=e[3],u=e[4],t.bezierCurveTo(e[1]+f,e[2]+d,l+f,u+d,h+f,c+d);break;case"s":i=h+e[3],r=c+e[4],null===n[0].match(/[CcSs]/)?(l=h,u=c):(l=2*h-l,u=2*c-u),t.bezierCurveTo(l+f,u+d,h+e[1]+f,c+e[2]+d,i+f,r+d),l=h+e[1],u=c+e[2],h=i,c=r;break;case"S":i=e[3],r=e[4],null===n[0].match(/[CcSs]/)?(l=h,u=c):(l=2*h-l,u=2*c-u),t.bezierCurveTo(l+f,u+d,e[1]+f,e[2]+d,i+f,r+d),h=i,c=r,l=e[1],u=e[2];break;case"q":i=h+e[3],r=c+e[4],l=h+e[1],u=c+e[2],t.quadraticCurveTo(l+f,u+d,i+f,r+d),h=i,c=r;break;case"Q":i=e[3],r=e[4],t.quadraticCurveTo(e[1]+f,e[2]+d,i+f,r+d),h=i,c=r,l=e[1],u=e[2];break;case"t":i=h+e[1],r=c+e[2],null===n[0].match(/[QqTt]/)?(l=h,u=c):(l=2*h-l,u=2*c-u),t.quadraticCurveTo(l+f,u+d,i+f,r+d),h=i,c=r;break;case"T":i=e[1],r=e[2],null===n[0].match(/[QqTt]/)?(l=h,u=c):(l=2*h-l,u=2*c-u),t.quadraticCurveTo(l+f,u+d,i+f,r+d),h=i,c=r;break;case"a":o(t,h+f,c+d,[e[1],e[2],e[3],e[4],e[5],e[6]+h+f,e[7]+c+d]),h+=e[6],c+=e[7];break;case"A":o(t,h+f,c+d,[e[1],e[2],e[3],e[4],e[5],e[6]+f,e[7]+d]),h=e[6],c=e[7];break;case"z":case"Z":h=s,c=a,t.closePath()}n=e}},_render:function(t){this._renderPathCommands(t),this._renderFill(t),this._renderStroke(t)},toString:function(){return"#<fabric.Path ("+this.complexity()+'): { "top": '+this.top+', "left": '+this.left+" }>"},toObject:function(t){var e=n(this.callSuper("toObject",["sourcePath","pathOffset"].concat(t)),{path:this.path.map(function(t){return t.slice()}),top:this.top,left:this.left});return e},toDatalessObject:function(t){var e=this.toObject(t);return this.sourcePath&&(e.path=this.sourcePath),delete e.sourcePath,e},toSVG:function(t){for(var e=[],i=this._createBaseSVGMarkup(),r="",n=0,s=this.path.length;n<s;n++)e.push(this.path[n].join(" "));var o=e.join(" ");return r=" translate("+-this.pathOffset.x+", "+-this.pathOffset.y+") ",i.push("<path ",this.getSvgId(),'d="',o,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),r,this.getSvgTransformMatrix(),'" stroke-linecap="round" ',"/>\n"),t?t(i.join("")):i.join("")},complexity:function(){return this.path.length},_parsePath:function(){for(var t,e,i,r,n,s=[],o=[],c=/([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi,l=0,u=this.path.length;l<u;l++){for(t=this.path[l],r=t.slice(1).trim(),o.length=0;i=c.exec(r);)o.push(i[0]);n=[t.charAt(0)];for(var f=0,d=o.length;f<d;f++)e=parseFloat(o[f]),isNaN(e)||n.push(e);var g=n[0],p=a[g.toLowerCase()],v=h[g]||g;if(n.length-1>p)for(var m=1,b=n.length;m<b;m+=p)s.push([g].concat(n.slice(m,m+p))),g=v;else s.push(n)}return s},_parseDimensions:function(){for(var t,n,s,o,a=[],h=[],c=null,l=0,u=0,f=0,d=0,g=0,p=0,v=0,m=this.path.length;v<m;++v){switch(t=this.path[v],t[0]){case"l":f+=t[1],d+=t[2],o=[];break;case"L":f=t[1],d=t[2],o=[];break;case"h":f+=t[1],o=[];break;case"H":f=t[1],o=[];break;case"v":d+=t[1],o=[];break;case"V":d=t[1],o=[];break;case"m":f+=t[1],d+=t[2],l=f,u=d,o=[];break;case"M":f=t[1],d=t[2],l=f,u=d,o=[];break;case"c":n=f+t[5],s=d+t[6],g=f+t[3],p=d+t[4],o=e.util.getBoundsOfCurve(f,d,f+t[1],d+t[2],g,p,n,s),f=n,d=s;break;case"C":g=t[3],p=t[4],o=e.util.getBoundsOfCurve(f,d,t[1],t[2],g,p,t[5],t[6]),f=t[5],d=t[6];break;case"s":n=f+t[3],s=d+t[4],null===c[0].match(/[CcSs]/)?(g=f,p=d):(g=2*f-g,p=2*d-p),o=e.util.getBoundsOfCurve(f,d,g,p,f+t[1],d+t[2],n,s),g=f+t[1],p=d+t[2],f=n,d=s;break;case"S":n=t[3],s=t[4],null===c[0].match(/[CcSs]/)?(g=f,p=d):(g=2*f-g,p=2*d-p),o=e.util.getBoundsOfCurve(f,d,g,p,t[1],t[2],n,s),f=n,d=s,g=t[1],p=t[2];break;case"q":n=f+t[3],s=d+t[4],g=f+t[1],p=d+t[2],o=e.util.getBoundsOfCurve(f,d,g,p,g,p,n,s),f=n,d=s;break;case"Q":g=t[1],p=t[2],o=e.util.getBoundsOfCurve(f,d,g,p,g,p,t[3],t[4]),f=t[3],d=t[4];break;case"t":n=f+t[1],s=d+t[2],null===c[0].match(/[QqTt]/)?(g=f,p=d):(g=2*f-g,p=2*d-p),o=e.util.getBoundsOfCurve(f,d,g,p,g,p,n,s),f=n,d=s;break;case"T":n=t[1],s=t[2],null===c[0].match(/[QqTt]/)?(g=f,p=d):(g=2*f-g,p=2*d-p),o=e.util.getBoundsOfCurve(f,d,g,p,g,p,n,s),f=n,d=s;break;case"a":o=e.util.getBoundsOfArc(f,d,t[1],t[2],t[3],t[4],t[5],t[6]+f,t[7]+d),f+=t[6],d+=t[7];break;case"A":o=e.util.getBoundsOfArc(f,d,t[1],t[2],t[3],t[4],t[5],t[6],t[7]),f=t[6],d=t[7];break;case"z":case"Z":f=l,d=u}c=t,o.forEach(function(t){a.push(t.x),h.push(t.y)}),a.push(f),h.push(d)}var b=i(a)||0,_=i(h)||0,y=r(a)||0,x=r(h)||0,C=y-b,S=x-_,T={left:b,top:_,width:C,height:S};return T}}),e.Path.fromObject=function(t,i,r){return e.Object._fromObject("Path",t,i,r,"path")},e.Path.ATTRIBUTE_NAMES=e.SHARED_ATTRIBUTES.concat(["d"]),e.Path.fromElement=function(t,i,r){var s=e.parseAttributes(t,e.Path.ATTRIBUTE_NAMES);s.originX="left",s.originY="top",i&&i(new e.Path(s.d,n(s,r)))},e.Path.async=!0}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend,r=e.util.array.min,n=e.util.array.max;if(!e.Group){var s={lockMovementX:!0,lockMovementY:!0,lockRotation:!0,lockScalingX:!0,lockScalingY:!0,lockUniScaling:!0};e.Group=e.util.createClass(e.Object,e.Collection,{type:"group",strokeWidth:0,subTargetCheck:!1,initialize:function(t,e,i){e=e||{},this._objects=[],i&&this.callSuper("initialize",e),this._objects=t||[];for(var r=this._objects.length;r--;)this._objects[r].group=this;if(e.originX&&(this.originX=e.originX),e.originY&&(this.originY=e.originY),i)for(var n,r=this._objects.length;r--;)n=this._objects[r],n.__origHasControls=n.hasControls,n.hasControls=!1;else{var s=e&&e.centerPoint;s||this._calcBounds(),this._updateObjectsCoords(s),delete e.centerPont,this.callSuper("initialize",e)}this.setCoords()},_updateObjectsCoords:function(t){for(var t=t||this.getCenterPoint(),e=this._objects.length;e--;)this._updateObjectCoords(this._objects[e],t)},_updateObjectCoords:function(t,e){t.__origHasControls=t.hasControls,t.hasControls=!1;var i=t.getLeft(),r=t.getTop(),n=!0,s=!0;t.set({left:i-e.x,top:r-e.y}),t.setCoords(n,s)},toString:function(){return"#<fabric.Group: ("+this.complexity()+")>"},addWithUpdate:function(t){return this._restoreObjectsState(),e.util.resetObjectTransform(this),t&&(this._objects.push(t),t.group=this,t._set("canvas",this.canvas)),this.forEachObject(this._setObjectActive,this),this._calcBounds(),this._updateObjectsCoords(),this.setCoords(),this.dirty=!0,this},_setObjectActive:function(t){t.set("active",!0),t.group=this},removeWithUpdate:function(t){return this._restoreObjectsState(),e.util.resetObjectTransform(this),this.forEachObject(this._setObjectActive,this),this.remove(t),this._calcBounds(),this._updateObjectsCoords(),this.setCoords(),this.dirty=!0,this},_onObjectAdded:function(t){this.dirty=!0,t.group=this,t._set("canvas",this.canvas)},_onObjectRemoved:function(t){this.dirty=!0,delete t.group,t.set("active",!1)},delegatedProperties:{fill:!0,stroke:!0,strokeWidth:!0,fontFamily:!0,fontWeight:!0,fontSize:!0,fontStyle:!0,lineHeight:!0,textDecoration:!0,textAlign:!0,backgroundColor:!0},_set:function(t,e){var i=this._objects.length;if(this.delegatedProperties[t]||"canvas"===t)for(;i--;)this._objects[i].set(t,e);else for(;i--;)this._objects[i].setOnGroup(t,e);this.callSuper("_set",t,e)},toObject:function(t){var e=this.getObjects().map(function(e){var i=e.includeDefaultValues;e.includeDefaultValues=e.group.includeDefaultValues;var r=e.toObject(t);return e.includeDefaultValues=i,r});return i(this.callSuper("toObject",t),{objects:e})},toDatalessObject:function(t){var e,r=this.sourcePath;return e=r?r:this.getObjects().map(function(e){var i=e.includeDefaultValues;e.includeDefaultValues=e.group.includeDefaultValues;var r=e.toDatalessObject(t);return e.includeDefaultValues=i,r}),i(this.callSuper("toDatalessObject",t),{objects:e})},render:function(t){this._transformDone=!0,this.callSuper("render",t),this._transformDone=!1},shouldCache:function(){var t=this.objectCaching&&(!this.group||this.needsItsOwnCache||!this.group.isCaching());if(this.caching=t,t)for(var e=0,i=this._objects.length;e<i;e++)if(this._objects[e].willDrawShadow())return this.caching=!1,!1;return t},willDrawShadow:function(){if(this.shadow)return!0;for(var t=0,e=this._objects.length;t<e;t++)if(this._objects[t].willDrawShadow())return!0;return!1},isCaching:function(){return this.caching||this.group&&this.group.isCaching()},drawObject:function(t){for(var e=0,i=this._objects.length;e<i;e++)this._renderObject(this._objects[e],t)},isCacheDirty:function(){if(this.callSuper("isCacheDirty"))return!0;if(!this.statefullCache)return!1;for(var t=0,e=this._objects.length;t<e;t++)if(this._objects[t].isCacheDirty(!0)){var i=this._getNonTransformedDimensions();return this._cacheContext.clearRect(-i.x/2,-i.y/2,i.x,i.y),!0}return!1},_renderControls:function(t,e,i){if(t.save(),t.globalAlpha=this.isMoving?this.borderOpacityWhenMoving:1,this.callSuper("_renderControls",t,e),this.canvas&&this===this.canvas.getActiveGroup())for(var r=0,n=this._objects.length;r<n;r++)this._objects[r]._renderControls(t,i);t.restore()},_renderObject:function(t,e){if(t.visible){var i=t.hasRotatingPoint;t.hasRotatingPoint=!1,t.render(e),t.hasRotatingPoint=i}},_restoreObjectsState:function(){return this._objects.forEach(this._restoreObjectState,this),this},realizeTransform:function(t){var i=t.calcTransformMatrix(),r=e.util.qrDecompose(i),n=new e.Point(r.translateX,r.translateY);return t.flipX=!1,t.flipY=!1,t.set("scaleX",r.scaleX),t.set("scaleY",r.scaleY),t.skewX=r.skewX,t.skewY=r.skewY,t.angle=r.angle,t.setPositionByOrigin(n,"center","center"),t},_restoreObjectState:function(t){return this.realizeTransform(t),t.setCoords(),t.hasControls=t.__origHasControls,delete t.__origHasControls,t.set("active",!1),delete t.group,this},destroy:function(){return this._restoreObjectsState()},setObjectsCoords:function(){var t=!0,e=!0;return this.forEachObject(function(i){i.setCoords(t,e)}),this},_calcBounds:function(t){for(var e,i,r,n=[],s=[],o=["tr","br","bl","tl"],a=0,h=this._objects.length,c=o.length,l=!0;a<h;++a)for(e=this._objects[a],e.setCoords(l),r=0;r<c;r++)i=o[r],n.push(e.oCoords[i].x),s.push(e.oCoords[i].y);this.set(this._getBounds(n,s,t))},_getBounds:function(t,i,s){var o=new e.Point(r(t),r(i)),a=new e.Point(n(t),n(i)),h={width:a.x-o.x||0,height:a.y-o.y||0};return s||(h.left=o.x||0,h.top=o.y||0,"center"===this.originX&&(h.left+=h.width/2),"right"===this.originX&&(h.left+=h.width),"center"===this.originY&&(h.top+=h.height/2),"bottom"===this.originY&&(h.top+=h.height)),h},toSVG:function(t){var e=this._createBaseSVGMarkup();e.push("<g ",this.getSvgId(),'transform="',this.getSvgTransform(),this.getSvgTransformMatrix(),'" style="',this.getSvgFilter(),'">\n');for(var i=0,r=this._objects.length;i<r;i++)e.push("\t",this._objects[i].toSVG(t));return e.push("</g>\n"),t?t(e.join("")):e.join("")},get:function(t){if(t in s){if(this[t])return this[t];for(var e=0,i=this._objects.length;e<i;e++)if(this._objects[e][t])return!0;return!1}return t in this.delegatedProperties?this._objects[0]&&this._objects[0].get(t):this[t]}}),e.Group.fromObject=function(t,i){e.util.enlivenObjects(t.objects,function(r){delete t.objects,i&&i(new e.Group(r,t,!0))})},e.Group.async=!0}}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=fabric.util.object.extend;if(t.fabric||(t.fabric={}),t.fabric.Image)return void fabric.warn("fabric.Image is already defined.");var i=fabric.Object.prototype.stateProperties.concat();i.push("alignX","alignY","meetOrSlice"),fabric.Image=fabric.util.createClass(fabric.Object,{type:"image",crossOrigin:"",alignX:"none",alignY:"none",meetOrSlice:"meet",strokeWidth:0,_lastScaleX:1,_lastScaleY:1,_filterScalingX:1,_filterScalingY:1,minimumScaleTrigger:.5,stateProperties:i,objectCaching:!1,cacheKey:"",initialize:function(t,e){e||(e={}),this.filters=[],this.callSuper("initialize",e),this._initElement(t,e),this.cacheKey="texture"+fabric.Object.__uid++},getElement:function(){return this._element},setElement:function(t,e){return this._element=t,this._originalElement=t,this._initConfig(e),this.resizeFilter&&this.applyResizeFilters(),0!==this.filters.length&&this.applyFilters(),this},setCrossOrigin:function(t){return this.crossOrigin=t,this._element.crossOrigin=t,this},getOriginalSize:function(){var t=this.getElement();return{width:t.width,height:t.height}},_stroke:function(t){if(this.stroke&&0!==this.strokeWidth){var e=this.width/2,i=this.height/2;t.beginPath(),t.moveTo(-e,-i),t.lineTo(e,-i),t.lineTo(e,i),t.lineTo(-e,i),t.lineTo(-e,-i),t.closePath()}},_renderDashedStroke:function(t){var e=-this.width/2,i=-this.height/2,r=this.width,n=this.height;t.save(),this._setStrokeStyles(t,this),t.beginPath(),fabric.util.drawDashedLine(t,e,i,e+r,i,this.strokeDashArray),fabric.util.drawDashedLine(t,e+r,i,e+r,i+n,this.strokeDashArray),fabric.util.drawDashedLine(t,e+r,i+n,e,i+n,this.strokeDashArray),fabric.util.drawDashedLine(t,e,i+n,e,i,this.strokeDashArray),t.closePath(),t.restore()},toObject:function(t){var i=[];this.filters.forEach(function(t){t&&i.push(t.toObject())});var r=e(this.callSuper("toObject",["crossOrigin","alignX","alignY","meetOrSlice"].concat(t)),{src:this.getSrc(),filters:i});return this.resizeFilter&&(r.resizeFilter=this.resizeFilter.toObject()),r.width/=this._filterScalingX,r.height/=this._filterScalingY,r},toSVG:function(t){var e=this._createBaseSVGMarkup(),i=-this.width/2,r=-this.height/2,n="none",s=!0;if("none"!==this.alignX&&"none"!==this.alignY&&(n="x"+this.alignX+"Y"+this.alignY+" "+this.meetOrSlice),e.push('<g transform="',this.getSvgTransform(),this.getSvgTransformMatrix(),'">\n',"<image ",this.getSvgId(),'xlink:href="',this.getSvgSrc(s),'" x="',i,'" y="',r,'" style="',this.getSvgStyles(),'" width="',this.width,'" height="',this.height,'" preserveAspectRatio="',n,'"',"></image>\n"),this.stroke||this.strokeDashArray){var o=this.fill;this.fill=null,e.push("<rect ",'x="',i,'" y="',r,'" width="',this.width,'" height="',this.height,'" style="',this.getSvgStyles(),'"/>\n'),this.fill=o}return e.push("</g>\n"),t?t(e.join("")):e.join("")},getSrc:function(t){var e=t?this._element:this._originalElement;return e?fabric.isLikelyNode?e._src:e.src:this.src||""},setSrc:function(t,e,i){return fabric.util.loadImage(t,function(t){this.setElement(t,i),e(this)},this,i&&i.crossOrigin),this},toString:function(){return'#<fabric.Image: { src: "'+this.getSrc()+'" }>'},applyResizeFilters:function(){var t=this.resizeFilter,e=this.canvas?this.canvas.getRetinaScaling():1,i=this.minimumScaleTrigger,r=this.scaleX<i?this.scaleX:1,n=this.scaleY<i?this.scaleY:1;if(r*e<1&&(r*=e),n*e<1&&(n*=e),!t||r>=1&&n>=1)return void(this._element=this._filteredEl);fabric.filterBackend||(fabric.filterBackend=fabric.initFilterBackend());var s,o=this._filteredEl||this._originalElement;if(this._element===this._originalElement){var a=fabric.util.createCanvasElement();a.width=o.width,a.height=o.height,this._element=a}var h=this._element.getContext("2d");o.getContext?s=o.getContext("2d").getImageData(0,0,o.width,o.height):(h.drawImage(o,0,0),s=h.getImageData(0,0,o.width,o.height));var c={imageData:s,scaleX:r,scaleY:n};t.applyTo2d(c),this.width=this._element.width=c.imageData.width,this.height=this._element.height=c.imageData.height,h.putImageData(c.imageData,0,0)},applyFilters:function(t){if(t=t||this.filters||[],t=t.filter(function(t){return t}),0===t.length)return this._element=this._originalElement,this._filterScalingX=1,this._filterScalingY=1,this;var e=this._originalElement,i=e.naturalWidth||e.width,r=e.naturalHeight||e.height;if(this._element===this._originalElement){var n=fabric.util.createCanvasElement();n.width=e.width,n.height=e.height,this._element=n}else this._element.getContext("2d").clearRect(0,0,i,r);return fabric.filterBackend||(fabric.filterBackend=fabric.initFilterBackend()),fabric.filterBackend.applyFilters(t,this._originalElement,i,r,this._element,this.cacheKey),this.width===this._element.width&&this.height===this._element.height||(this._filterScalingX=this._element.width/this.width,this._filterScalingY=this._element.height/this.height,this.width=this._element.width,this.height=this._element.height),this},_render:function(t){var e,i=-this.width/2,r=-this.height/2,n=this._findMargins();"slice"===this.meetOrSlice&&(t.beginPath(),t.rect(i,r,this.width,this.height),t.clip()),this.isMoving===!1&&this.resizeFilter&&this._needsResize()&&(this._lastScaleX=this.scaleX,this._lastScaleY=this.scaleY,this.applyResizeFilters()),e=this._element,e&&t.drawImage(e,i+n.marginX,r+n.marginY,n.width,n.height),this._stroke(t),this._renderStroke(t)},_needsResize:function(){return this.scaleX!==this._lastScaleX||this.scaleY!==this._lastScaleY},_findMargins:function(){var t,e,i=this.width,r=this.height,n=0,s=0;return"none"===this.alignX&&"none"===this.alignY||(t=[this.width/this._element.width,this.height/this._element.height],e="meet"===this.meetOrSlice?Math.min.apply(null,t):Math.max.apply(null,t),i=this._element.width*e,r=this._element.height*e,"Mid"===this.alignX&&(n=(this.width-i)/2),"Max"===this.alignX&&(n=this.width-i),"Mid"===this.alignY&&(s=(this.height-r)/2),"Max"===this.alignY&&(s=this.height-r)),{width:i,height:r,marginX:n,marginY:s}},_resetWidthHeight:function(){var t=this.getElement();this.set("width",t.width),this.set("height",t.height)},_initElement:function(t,e){this.setElement(fabric.util.getById(t),e),fabric.util.addClass(this.getElement(),fabric.Image.CSS_CANVAS)},_initConfig:function(t){t||(t={}),this.setOptions(t),this._setWidthHeight(t),this._element&&this.crossOrigin&&(this._element.crossOrigin=this.crossOrigin)},_initFilters:function(t,e){t&&t.length?fabric.util.enlivenObjects(t,function(t){e&&e(t)},"fabric.Image.filters"):e&&e()},_setWidthHeight:function(t){this.width="width"in t?t.width:this.getElement()?this.getElement().width||0:0,this.height="height"in t?t.height:this.getElement()?this.getElement().height||0:0}}),fabric.Image.CSS_CANVAS="canvas-img",fabric.Image.prototype.getSvgSrc=fabric.Image.prototype.getSrc,fabric.Image.fromObject=function(t,e){fabric.util.loadImage(t.src,function(i,r){return r?void(e&&e(null,r)):void fabric.Image.prototype._initFilters.call(t,t.filters,function(r){t.filters=r||[],fabric.Image.prototype._initFilters.call(t,[t.resizeFilter],function(r){t.resizeFilter=r[0];var n=new fabric.Image(i,t);e(n)})})},null,t.crossOrigin)},fabric.Image.fromURL=function(t,e,i){fabric.util.loadImage(t,function(t){e&&e(new fabric.Image(t,i))},null,i&&i.crossOrigin)},fabric.Image.ATTRIBUTE_NAMES=fabric.SHARED_ATTRIBUTES.concat("x y width height preserveAspectRatio xlink:href crossOrigin".split(" ")),fabric.Image.fromElement=function(t,i,r){var n,s=fabric.parseAttributes(t,fabric.Image.ATTRIBUTE_NAMES);s.preserveAspectRatio&&(n=fabric.util.parsePreserveAspectRatioAttribute(s.preserveAspectRatio),e(s,n)),fabric.Image.fromURL(s["xlink:href"],i,e(r?fabric.util.object.clone(r):{},s))},fabric.Image.async=!0,fabric.Image.pngCompression=1}("undefined"!=typeof exports?exports:this),fabric.util.object.extend(fabric.Object.prototype,{_getAngleValueForStraighten:function(){var t=this.getAngle()%360;return t>0?90*Math.round((t-1)/90):90*Math.round(t/90)},straighten:function(){return this.setAngle(this._getAngleValueForStraighten()),this},fxStraighten:function(t){t=t||{};var e=function(){},i=t.onComplete||e,r=t.onChange||e,n=this;return fabric.util.animate({startValue:this.get("angle"),endValue:this._getAngleValueForStraighten(),duration:this.FX_DURATION,onChange:function(t){n.setAngle(t),r()},onComplete:function(){n.setCoords(),i()},onStart:function(){n.set("active",!1)}}),this}}),fabric.util.object.extend(fabric.StaticCanvas.prototype,{straightenObject:function(t){return t.straighten(),this.renderAll(),this},fxStraightenObject:function(t){return t.fxStraighten({onChange:this.renderAll.bind(this)}),this}}),function(){"use strict";function t(t){t&&t.tileSize&&(this.tileSize=t.tileSize),this.setupGLContext(this.tileSize,this.tileSize),this.captureGPUInfo()}fabric.isWebglSupported=function(t){if(fabric.isLikelyNode)return!1;t=t||fabric.WebglFilterBackend.prototype.tileSize;var e=document.createElement("canvas"),i=e.getContext("webgl")||e.getContext("experimental-webgl"),r=!1;return i&&(fabric.maxTextureSize=i.getParameter(i.MAX_TEXTURE_SIZE),r=fabric.maxTextureSize>=t),this.isSupported=r,r},fabric.WebglFilterBackend=t,t.prototype={tileSize:2048,resources:{},setupGLContext:function(t,e){this.dispose(),this.createWebGLCanvas(t,e),this.squareVertices=new Float32Array([0,0,0,1,1,0,1,1])},createWebGLCanvas:function(t,e){var i=fabric.util.createCanvasElement();i.width=t,i.height=e;var r={premultipliedAlpha:!1},n=i.getContext("webgl",r);n||(n=i.getContext("experimental-webgl",r)),n&&(n.clearColor(0,0,0,0),this.canvas=i,this.gl=n)},applyFilters:function(t,e,i,r,n,s){var o,a=this.gl;s&&(o=this.getCachedTexture(s,e));var h={originalWidth:e.width||e.originalWidth,originalHeight:e.height||e.originalHeight,sourceWidth:i,sourceHeight:r,context:a,sourceTexture:this.createTexture(a,i,r,!o&&e),targetTexture:this.createTexture(a,i,r),originalTexture:o||this.createTexture(a,i,r,!o&&e),passes:t.length,webgl:!0,squareVertices:this.squareVertices,programCache:this.programCache,pass:0},c=a.createFramebuffer();return a.bindFramebuffer(a.FRAMEBUFFER,c),t.forEach(function(t){t&&t.applyTo(h)}),this.copyGLTo2D(a.canvas,n),a.bindTexture(a.TEXTURE_2D,null),a.deleteTexture(h.sourceTexture),a.deleteTexture(h.targetTexture),a.deleteFramebuffer(c),n.getContext("2d").setTransform(1,0,0,1,0,0),h},applyFiltersDebug:function(t,e,i,r,n,s){var o=this.gl,a=this.applyFilters(t,e,i,r,n,s),h=o.getError();if(h!==o.NO_ERROR){var c=this.glErrorToString(o,h),l=new Error("WebGL Error "+c);throw l.glErrorCode=h,l}return a},glErrorToString:function(t,e){if(!t)return"Context undefined for error code: "+e;if("number"!=typeof e)return"Error code is not a number";switch(e){case t.NO_ERROR:return"NO_ERROR";case t.INVALID_ENUM:return"INVALID_ENUM";case t.INVALID_VALUE:return"INVALID_VALUE";case t.INVALID_OPERATION:return"INVALID_OPERATION";case t.INVALID_FRAMEBUFFER_OPERATION:return"INVALID_FRAMEBUFFER_OPERATION";case t.OUT_OF_MEMORY:return"OUT_OF_MEMORY";case t.CONTEXT_LOST_WEBGL:return"CONTEXT_LOST_WEBGL";default:return"UNKNOWN_ERROR"}},dispose:function(){this.canvas&&(this.canvas=null,this.gl=null),this.clearWebGLCaches()},clearWebGLCaches:function(){this.programCache={},this.textureCache={}},createTexture:function(t,e,i,r){var n=t.createTexture();return t.bindTexture(t.TEXTURE_2D,n),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),r?t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,r):t.texImage2D(t.TEXTURE_2D,0,t.RGBA,e,i,0,t.RGBA,t.UNSIGNED_BYTE,null),n},getCachedTexture:function(t,e){if(this.textureCache[t])return this.textureCache[t];var i=this.createTexture(this.gl,e.width,e.height,e);return this.textureCache[t]=i,i},copyGLTo2D:function(t,e){var i=e.getContext("2d");i.translate(0,e.height),i.scale(1,-1);var r=t.height-e.height;i.drawImage(t,0,r,e.width,e.height,0,0,e.width,e.height)},evictCachesForKey:function(t){this.textureCache[t]&&(this.gl.deleteTexture(this.textureCache[t]),delete this.textureCache[t])},captureGPUInfo:function(){if(this.gpuInfo)return this.gpuInfo;var t=this.gl,e=t.getExtension("WEBGL_debug_renderer_info"),i={renderer:"",vendor:""};if(e){var r=t.getParameter(e.UNMASKED_RENDERER_WEBGL),n=t.getParameter(e.UNMASKED_VENDOR_WEBGL);r&&(i.renderer=r.toLowerCase()),n&&(i.vendor=n.toLowerCase())}return this.gpuInfo=i,i}}}(),function(){"use strict";function t(){}var e=function(){};fabric.Canvas2dFilterBackend=t,t.prototype={evictCachesForKey:e,dispose:e,clearWebGLCaches:e,resources:{},applyFilters:function(t,e,i,r,n){var s=n.getContext("2d");s.drawImage(e,0,0,i,r);var o=s.getImageData(0,0,i,r),a=s.getImageData(0,0,i,r),h={sourceWidth:i,sourceHeight:r,imageData:o,originalEl:e,originalImageData:a,canvasEl:n,ctx:s};return t.forEach(function(t){t.applyTo(h)}),h.imageData.width===i&&h.imageData.height===r||(n.width=h.imageData.width,n.height=h.imageData.height),s.putImageData(h.imageData,0,0),h}}}(),fabric.Image.filters=fabric.Image.filters||{},fabric.Image.filters.BaseFilter=fabric.util.createClass({type:"BaseFilter",vertexSource:"attribute vec2 aPosition;\nattribute vec2 aTexCoord;\nvarying vec2 vTexCoord;\nvoid main() {\nvTexCoord = aTexCoord;\ngl_Position = vec4(aPosition * 2.0 - 1.0, 0.0, 1.0);\n}",fragmentSource:"precision highp float;\nvarying vec2 vTexCoord;\nuniform sampler2d uTexture;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\n}",initialize:function(t){t&&this.setOptions(t)},setOptions:function(t){for(var e in t)this[e]=t[e]},createProgram:function(t,e,i){if(this.vertexSource&&this.fragmentSource){var r=t.createShader(t.VERTEX_SHADER);if(t.shaderSource(r,i||this.vertexSource),t.compileShader(r),!t.getShaderParameter(r,t.COMPILE_STATUS))throw new Error('Vertex shader compile error for "${this.type}": '+t.getShaderInfoLog(r));var n=t.createShader(t.FRAGMENT_SHADER);if(t.shaderSource(n,e||this.fragmentSource),t.compileShader(n),!t.getShaderParameter(n,t.COMPILE_STATUS))throw new Error('Fragment shader compile error for "${this.type}": '+t.getShaderInfoLog(n));var s=t.createProgram();if(t.attachShader(s,r),t.attachShader(s,n),t.linkProgram(s),!t.getProgramParameter(s,t.LINK_STATUS))throw new Error('Shader link error for "${this.type}" '+t.getProgramInfoLog(s));var o=this.getAttributeLocations(t,s),a=this.getUniformLocations(t,s)||{};return a.uWidth=t.getUniformLocation(s,"uWidth"),a.uHeight=t.getUniformLocation(s,"uHeight"),{program:s,attributeLocations:o,uniformLocations:a}}},getAttributeLocations:function(t,e){return{aPosition:t.getAttribLocation(e,"aPosition"),aTexCoord:t.getAttribLocation(e,"aTexCoord")}},getUniformLocations:function(){},sendAttributeData:function(t,e,i){["aPosition","aTexCoord"].forEach(function(r){var n=e[r],s=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,s),t.enableVertexAttribArray(n),t.vertexAttribPointer(n,2,t.FLOAT,!1,0,0),t.bufferData(t.ARRAY_BUFFER,i,t.STATIC_DRAW)})},_setupFrameBuffer:function(t){var e=t.context;t.passes>1?e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t.targetTexture,0):(e.bindFramebuffer(e.FRAMEBUFFER,null),e.finish())},_swapTextures:function(t){t.passes--,t.pass++;var e=t.targetTexture;t.targetTexture=t.sourceTexture,t.sourceTexture=e},isNeutralState:function(){return!1},applyTo:function(t){if(t.webgl){if(t.passes>1&&this.isNeutralState(t))return;this._setupFrameBuffer(t),this.applyToWebGL(t),this._swapTextures(t)}else this.applyTo2d(t)},retrieveShader:function(t){return t.programCache.hasOwnProperty(this.type)||(t.programCache[this.type]=this.createProgram(t.context)),t.programCache[this.type]},applyToWebGL:function(t){var e=t.context,i=this.retrieveShader(t);0===t.pass&&t.originalTexture?e.bindTexture(e.TEXTURE_2D,t.originalTexture):e.bindTexture(e.TEXTURE_2D,t.sourceTexture),e.useProgram(i.program),this.sendAttributeData(e,i.attributeLocations,t.squareVertices),e.uniform1f(i.uniformLocations.uStepW,1/t.sourceWidth),e.uniform1f(i.uniformLocations.uStepH,1/t.sourceHeight),this.sendUniformData(e,i.uniformLocations),e.viewport(0,0,t.sourceWidth,t.sourceHeight),e.drawArrays(e.TRIANGLE_STRIP,0,4)},bindAdditionalTexture:function(t,e,i){t.activeTexture(i),t.bindTexture(t.TEXTURE_2D,e),t.activeTexture(t.TEXTURE0)},unbindAdditionalTexture:function(t,e){t.activeTexture(e),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE0)},getMainParameter:function(){return this[this.mainParameter]},setMainParameter:function(t){this[this.mainParameter]=t},sendUniformData:function(){},createHelpLayer:function(t){if(!t.helpLayer){var e=document.createElement("canvas");e.width=t.sourceWidth,e.height=t.sourceHeight,t.helpLayer=e}},toObject:function(){var t={type:this.type},e=this.mainParameter;return e&&(t[e]=this[e]),t},toJSON:function(){return this.toObject()}}),fabric.Image.filters.BaseFilter.fromObject=function(t,e){var i=new fabric.Image.filters[t.type](t);return e&&e(i),i},function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.Image.filters,r=e.util.createClass;i.ColorMatrix=r(i.BaseFilter,{type:"ColorMatrix",fragmentSource:"precision highp float;\nuniform sampler2D uTexture;\nvarying vec2 vTexCoord;\nuniform mat4 uColorMatrix;\nuniform vec4 uConstants;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\ncolor *= uColorMatrix;\ncolor += uConstants;\ngl_FragColor = color;\n}",matrix:[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],mainParameter:"matrix",colorsOnly:!0,initialize:function(t){this.callSuper("initialize",t),this.matrix=this.matrix.slice(0)},applyTo2d:function(t){var e,i,r,n,s,o=t.imageData,a=o.data,h=a.length,c=this.matrix,l=this.colorsOnly;for(s=0;s<h;s+=4)e=a[s],i=a[s+1],r=a[s+2],l?(a[s]=e*c[0]+i*c[1]+r*c[2]+255*c[4],a[s+1]=e*c[5]+i*c[6]+r*c[7]+255*c[9],a[s+2]=e*c[10]+i*c[11]+r*c[12]+255*c[14]):(n=a[s+3],a[s]=e*c[0]+i*c[1]+r*c[2]+n*c[3]+255*c[4],a[s+1]=e*c[5]+i*c[6]+r*c[7]+n*c[8]+255*c[9],a[s+2]=e*c[10]+i*c[11]+r*c[12]+n*c[13]+255*c[14],a[s+3]=e*c[15]+i*c[16]+r*c[17]+n*c[18]+255*c[19])},getUniformLocations:function(t,e){return{uColorMatrix:t.getUniformLocation(e,"uColorMatrix"),uConstants:t.getUniformLocation(e,"uConstants")}},sendUniformData:function(t,e){var i=this.matrix,r=[i[0],i[1],i[2],i[3],i[5],i[6],i[7],i[8],i[10],i[11],i[12],i[13],i[15],i[16],i[17],i[18]],n=[i[4],i[9],i[14],i[19]];t.uniformMatrix4fv(e.uColorMatrix,!1,r),t.uniform4fv(e.uConstants,n)}}),e.Image.filters.ColorMatrix.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.Image.filters,r=e.util.createClass;i.Brightness=r(i.BaseFilter,{type:"Brightness",fragmentSource:"precision highp float;\nuniform sampler2D uTexture;\nuniform float uBrightness;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\ncolor.rgb += uBrightness;\ngl_FragColor = color;\n}",brightness:0,mainParameter:"brightness",applyTo2d:function(t){if(0!==this.brightness){var e,i=t.imageData,r=i.data,n=r.length,s=Math.round(255*this.brightness);for(e=0;e<n;e+=4)r[e]=r[e]+s,r[e+1]=r[e+1]+s,r[e+2]=r[e+2]+s}},getUniformLocations:function(t,e){return{uBrightness:t.getUniformLocation(e,"uBrightness")}},sendUniformData:function(t,e){t.uniform1f(e.uBrightness,this.brightness)}}),e.Image.filters.Brightness.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend,r=e.Image.filters,n=e.util.createClass;r.Convolute=n(r.BaseFilter,{type:"Convolute",opaque:!1,matrix:[0,0,0,0,1,0,0,0,0],fragmentSource:{Convolute_3_1:"precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[9];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 0);\nfor (float h = 0.0; h < 3.0; h+=1.0) {\nfor (float w = 0.0; w < 3.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 1), uStepH * (h - 1));\ncolor += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 3.0 + w)];\n}\n}\ngl_FragColor = color;\n}",Convolute_3_0:"precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[9];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 1);\nfor (float h = 0.0; h < 3.0; h+=1.0) {\nfor (float w = 0.0; w < 3.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 1.0), uStepH * (h - 1.0));\ncolor.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 3.0 + w)];\n}\n}\nfloat alpha = texture2D(uTexture, vTexCoord).a;\ngl_FragColor = color;\ngl_FragColor.a = alpha;\n}",Convolute_5_1:"precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[25];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 0);\nfor (float h = 0.0; h < 5.0; h+=1.0) {\nfor (float w = 0.0; w < 5.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 2.0), uStepH * (h - 2.0));\ncolor += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 5.0 + w)];\n}\n}\ngl_FragColor = color;\n}",
Convolute_5_0:"precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[25];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 1);\nfor (float h = 0.0; h < 5.0; h+=1.0) {\nfor (float w = 0.0; w < 5.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 2.0), uStepH * (h - 2.0));\ncolor.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 5.0 + w)];\n}\n}\nfloat alpha = texture2D(uTexture, vTexCoord).a;\ngl_FragColor = color;\ngl_FragColor.a = alpha;\n}",Convolute_7_1:"precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[49];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 0);\nfor (float h = 0.0; h < 7.0; h+=1.0) {\nfor (float w = 0.0; w < 7.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 3.0), uStepH * (h - 3.0));\ncolor += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 7.0 + w)];\n}\n}\ngl_FragColor = color;\n}",Convolute_7_0:"precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[49];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 1);\nfor (float h = 0.0; h < 7.0; h+=1.0) {\nfor (float w = 0.0; w < 7.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 3.0), uStepH * (h - 3.0));\ncolor.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 7.0 + w)];\n}\n}\nfloat alpha = texture2D(uTexture, vTexCoord).a;\ngl_FragColor = color;\ngl_FragColor.a = alpha;\n}",Convolute_9_1:"precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[81];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 0);\nfor (float h = 0.0; h < 9.0; h+=1.0) {\nfor (float w = 0.0; w < 9.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 4.0), uStepH * (h - 4.0));\ncolor += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 9.0 + w)];\n}\n}\ngl_FragColor = color;\n}",Convolute_9_0:"precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[81];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 1);\nfor (float h = 0.0; h < 9.0; h+=1.0) {\nfor (float w = 0.0; w < 9.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 4.0), uStepH * (h - 4.0));\ncolor.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 9.0 + w)];\n}\n}\nfloat alpha = texture2D(uTexture, vTexCoord).a;\ngl_FragColor = color;\ngl_FragColor.a = alpha;\n}"},retrieveShader:function(t){var e=Math.sqrt(this.matrix.length),i=this.type+"_"+e+"_"+this.opaque?1:0,r=this.fragmentSource[i];return t.programCache.hasOwnProperty(i)||(t.programCache[i]=this.createProgram(t.context,r)),t.programCache[i]},applyTo2d:function(t){var e,i,r,n,s,o,a,h,c,l,u,f,d,g=t.imageData,p=g.data,v=this.matrix,m=Math.round(Math.sqrt(v.length)),b=Math.floor(m/2),_=g.width,y=g.height,x=t.ctx.createImageData(_,y),C=x.data,S=this.opaque?1:0;for(u=0;u<y;u++)for(l=0;l<_;l++){for(s=4*(u*_+l),e=0,i=0,r=0,n=0,d=0;d<m;d++)for(f=0;f<m;f++)a=u+d-b,o=l+f-b,a<0||a>y||o<0||o>_||(h=4*(a*_+o),c=v[d*m+f],e+=p[h]*c,i+=p[h+1]*c,r+=p[h+2]*c,S||(n+=p[h+3]*c));C[s]=e,C[s+1]=i,C[s+2]=r,S?C[s+3]=p[s+3]:C[s+3]=n}t.imageData=x},getUniformLocations:function(t,e){return{uMatrix:t.getUniformLocation(e,"uMatrix"),uOpaque:t.getUniformLocation(e,"uOpaque"),uHalfSize:t.getUniformLocation(e,"uHalfSize"),uSize:t.getUniformLocation(e,"uSize")}},sendUniformData:function(t,e){t.uniform1fv(e.uMatrix,this.matrix)},toObject:function(){return i(this.callSuper("toObject"),{opaque:this.opaque,matrix:this.matrix})}}),e.Image.filters.Convolute.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.Image.filters,r=e.util.createClass;i.Grayscale=r(i.BaseFilter,{type:"Grayscale",fragmentSource:{average:"precision highp float;\nuniform sampler2D uTexture;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nfloat average = (color.r + color.b + color.g) / 3.0;\ngl_FragColor = vec4(average, average, average, color.a);\n}",lightness:"precision highp float;\nuniform sampler2D uTexture;\nuniform int uMode;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 col = texture2D(uTexture, vTexCoord);\nfloat average = (max(max(col.r, col.g),col.b) + min(min(col.r, col.g),col.b)) / 2.0;\ngl_FragColor = vec4(average, average, average, col.a);\n}",luminosity:"precision highp float;\nuniform sampler2D uTexture;\nuniform int uMode;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 col = texture2D(uTexture, vTexCoord);\nfloat average = 0.21 * col.r + 0.72 * col.g + 0.07 * col.b;\ngl_FragColor = vec4(average, average, average, col.a);\n}"},mode:"average",mainParameter:"mode",applyTo2d:function(t){var e,i,r=t.imageData,n=r.data,s=n.length,o=this.mode;for(e=0;e<s;e+=4)"average"===o?i=(n[e]+n[e+1]+n[e+2])/3:"lightness"===o?i=(Math.min(n[e],n[e+1],n[e+2])+Math.max(n[e],n[e+1],n[e+2]))/2:"luminosity"===o&&(i=.21*n[e]+.72*n[e+1]+.07*n[e+2]),n[e]=i,n[e+1]=i,n[e+2]=i},retrieveShader:function(t){var e=this.type+"_"+this.mode,i=this.fragmentSource[this.mode];return t.programCache.hasOwnProperty(e)||(t.programCache[e]=this.createProgram(t.context,i)),t.programCache[e]},getUniformLocations:function(t,e){return{uMode:t.getUniformLocation(e,"uMode")}},sendUniformData:function(t,e){var i=1;t.uniform1i(e.uMode,i)}}),e.Image.filters.Grayscale.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.Image.filters,r=e.util.createClass;i.Invert=r(i.BaseFilter,{type:"Invert",fragmentSource:"precision highp float;\nuniform sampler2D uTexture;\nuniform int uInvert;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nif (uInvert == 1) {\ngl_FragColor = vec4(1.0 - color.r,1.0 -color.g,1.0 -color.b,color.a);\n} else {\ngl_FragColor = color;\n}\n}",invert:!0,mainParameter:"invert",applyTo2d:function(t){if(this.invert){var e,i=t.imageData,r=i.data,n=r.length;for(e=0;e<n;e+=4)r[e]=255-r[e],r[e+1]=255-r[e+1],r[e+2]=255-r[e+2]}},getUniformLocations:function(t,e){return{uInvert:t.getUniformLocation(e,"uInvert")}},sendUniformData:function(t,e){t.uniform1i(e.uInvert,this.invert)}}),e.Image.filters.Invert.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend,r=e.Image.filters,n=e.util.createClass;r.Noise=n(r.BaseFilter,{type:"Noise",fragmentSource:"precision highp float;\nuniform sampler2D uTexture;\nuniform float uHeight;\nuniform float uNoise;\nuniform float uSeed;\nvarying vec2 vTexCoord;\nfloat rand(vec2 co, float seed, float vScale) {\nreturn fract(sin(dot(co.xy * vScale ,vec2(12.9898 , 78.233))) * 43758.5453 * (seed + 0.01) / 2.0);\n}\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\ncolor.rgb += (0.5 - rand(vTexCoord, uSeed, uHeight / 10.0)) * uNoise;\ngl_FragColor = color;\n}",mainParameter:"noise",noise:0,applyTo2d:function(t){if(0!==this.noise)for(var e,i,r=t.imageData,n=r.data,s=n.length,o=this.noise,e=0,s=n.length;e<s;e+=4)i=(.5-Math.random())*o,n[e]+=i,n[e+1]+=i,n[e+2]+=i},getUniformLocations:function(t,e){return{uNoise:t.getUniformLocation(e,"uNoise"),uSeed:t.getUniformLocation(e,"uSeed")}},sendUniformData:function(t,e){t.uniform1f(e.uNoise,this.noise/255),t.uniform1f(e.uSeed,Math.random())},toObject:function(){return i(this.callSuper("toObject"),{noise:this.noise})}}),e.Image.filters.Noise.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.Image.filters,r=e.util.createClass;i.Pixelate=r(i.BaseFilter,{type:"Pixelate",blocksize:4,mainParameter:"blocksize",fragmentSource:"precision highp float;\nuniform sampler2D uTexture;\nuniform float uBlocksize;\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nfloat blockW = uBlocksize * uStepW;\nfloat blockH = uBlocksize * uStepW;\nint posX = int(vTexCoord.x / blockW);\nint posY = int(vTexCoord.y / blockH);\nfloat fposX = float(posX);\nfloat fposY = float(posY);\nvec2 squareCoords = vec2(fposX * blockW, fposY * blockH);\nvec4 color = texture2D(uTexture, squareCoords);\ngl_FragColor = color;\n}",applyTo2d:function(t){if(1!==this.blocksize){var e,i,r,n,s,o,a,h,c,l,u,f=t.imageData,d=f.data,g=f.height,p=f.width;for(i=0;i<g;i+=this.blocksize)for(r=0;r<p;r+=this.blocksize)for(e=4*i*p+4*r,n=d[e],s=d[e+1],o=d[e+2],a=d[e+3],l=Math.min(i+this.blocksize,g),u=Math.min(r+this.blocksize,p),h=i;h<l;h++)for(c=r;c<u;c++)e=4*h*p+4*c,d[e]=n,d[e+1]=s,d[e+2]=o,d[e+3]=a}},getUniformLocations:function(t,e){return{uBlocksize:t.getUniformLocation(e,"uBlocksize"),uWidth:t.getUniformLocation(e,"uWidth"),uHeight:t.getUniformLocation(e,"uHeight")}},sendUniformData:function(t,e){t.uniform1f(e.uBlocksize,this.blocksize)}}),e.Image.filters.Pixelate.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend,r=e.Image.filters,n=e.util.createClass;r.RemoveColor=n(r.BaseFilter,{type:"RemoveColor",color:"#FFFFFF",fragmentSource:"precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uLow;\nuniform vec4 uHigh;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\nif(all(greaterThan(gl_FragColor.rgb,uLow.rgb)) && all(greaterThan(uHigh.rgb,gl_FragColor.rgb))) {\ngl_FragColor.a = 0.0;\n}\n}",distance:.02,useAlpha:!1,applyTo2d:function(t){var i,r,n,s,o=t.imageData,a=o.data,h=255*this.distance,c=new e.Color(this.color).getSource(),l=[c[0]-h,c[1]-h,c[2]-h],u=[c[0]+h,c[1]+h,c[2]+h];for(i=0;i<a.length;i+=4)r=a[i],n=a[i+1],s=a[i+2],r>l[0]&&n>l[1]&&s>l[2]&&r<u[0]&&n<u[1]&&s<u[2]&&(a[i+3]=0)},getUniformLocations:function(t,e){return{uLow:t.getUniformLocation(e,"uLow"),uHigh:t.getUniformLocation(e,"uHigh")}},sendUniformData:function(t,i){var r=new e.Color(this.color).getSource(),n=parseFloat(this.distance),s=[0+r[0]/255-n,0+r[1]/255-n,0+r[2]/255-n,1],o=[r[0]/255+n,r[1]/255+n,r[2]/255+n,1];t.uniform4fv(i.uLow,s),t.uniform4fv(i.uHigh,o)},toObject:function(){return i(this.callSuper("toObject"),{color:this.color,distance:this.distance})}}),e.Image.filters.RemoveColor.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.Image.filters,r=e.util.createClass,n={Brownie:[.5997,.34553,-.27082,0,.186,-.0377,.86095,.15059,0,-.1449,.24113,-.07441,.44972,0,-.02965,0,0,0,1,0],Vintage:[.62793,.32021,-.03965,0,.03784,.02578,.64411,.03259,0,.02926,.0466,-.08512,.52416,0,.02023,0,0,0,1,0],Kodachrome:[1.12855,-.39673,-.03992,0,.24991,-.16404,1.08352,-.05498,0,.09698,-.16786,-.56034,1.60148,0,.13972,0,0,0,1,0],Technicolor:[1.91252,-.85453,-.09155,0,.04624,-.30878,1.76589,-.10601,0,-.27589,-.2311,-.75018,1.84759,0,.12137,0,0,0,1,0],Polaroid:[1.438,-.062,-.062,0,0,-.122,1.378,-.122,0,0,-.016,-.016,1.483,0,0,0,0,0,1,0],Sepia:[.393,.769,.189,0,0,.349,.686,.168,0,0,.272,.534,.131,0,0,0,0,0,1,0],BlackWhite:[1.5,1.5,1.5,0,-1,1.5,1.5,1.5,0,-1,1.5,1.5,1.5,0,-1,0,0,0,1,0]};for(var s in n)i[s]=r(i.ColorMatrix,{type:s,matrix:n[s],mainParameter:!1,colorsOnly:!0}),e.Image.filters[s].fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric,i=e.Image.filters,r=e.util.createClass;i.BlendColor=r(i.BaseFilter,{type:"BlendColor",color:"#F95C63",mode:"multiply",alpha:1,fragmentSource:{multiply:"precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\ncolor.rgb *= uColor.rgb;\ngl_FragColor = color;\n}",screen:"precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\ncolor.rgb = 1.0 - (1.0 - color.rgb) * (1.0 - uColor.rgb);\ngl_FragColor = color;\n}",add:"precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\ngl_FragColor.rgb += uColor.rgb;\n}",diff:"precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\ngl_FragColor.rgb = abs(gl_FragColor.rgb - uColor.rgb);\n}",subtract:"precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\ngl_FragColor.rgb -= uColor.rgb;\n}",lighten:"precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\ngl_FragColor.rgb = max(gl_FragColor.rgb, uColor.rgb);\n}",darken:"precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\ngl_FragColor.rgb = min(gl_FragColor.rgb, uColor.rgb);\n}",exclusion:"precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\ngl_FragColor.rgb += uColor.rgb - 2.0 * (uColor.rgb * gl_FragColor.rgb);\n}",overlay:"precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\nif (uColor.r < 0.5) {\ngl_FragColor.r *= 2.0 * uColor.r;\n} else {\ngl_FragColor.r = 1.0 - 2.0 * (1.0 - gl_FragColor.r) * (1.0 - uColor.r);\n}\nif (uColor.g < 0.5) {\ngl_FragColor.g *= 2.0 * uColor.g;\n} else {\ngl_FragColor.g = 1.0 - 2.0 * (1.0 - gl_FragColor.g) * (1.0 - uColor.g);\n}\nif (uColor.b < 0.5) {\ngl_FragColor.b *= 2.0 * uColor.b;\n} else {\ngl_FragColor.b = 1.0 - 2.0 * (1.0 - gl_FragColor.b) * (1.0 - uColor.b);\n}\n}",tint:"precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\ngl_FragColor.rgb *= (1.0 - uColor.a);\ngl_FragColor.rgb += uColor.rgb;\n}"},retrieveShader:function(t){var e=this.type+"_"+this.mode,i=this.fragmentSource[this.mode];return t.programCache.hasOwnProperty(e)||(t.programCache[e]=this.createProgram(t.context,i)),t.programCache[e]},applyTo2d:function(t){var i,r,n,s,o,a,h,c=t.imageData,l=c.data,u=l.length,f=1-this.alpha;h=new e.Color(this.color).getSource(),i=h[0]*this.alpha,r=h[1]*this.alpha,n=h[2]*this.alpha;for(var d=0;d<u;d+=4)switch(s=l[d],o=l[d+1],a=l[d+2],this.mode){case"multiply":l[d]=s*i/255,l[d+1]=o*r/255,l[d+2]=a*n/255;break;case"screen":l[d]=255-(255-s)*(255-i)/255,l[d+1]=255-(255-o)*(255-r)/255,l[d+2]=255-(255-a)*(255-n)/255;break;case"add":l[d]=s+i,l[d+1]=o+r,l[d+2]=a+n;break;case"diff":case"difference":l[d]=Math.abs(s-i),l[d+1]=Math.abs(o-r),l[d+2]=Math.abs(a-n);break;case"subtract":l[d]=s-i,l[d+1]=o-r,l[d+2]=a-n;break;case"darken":l[d]=Math.min(s,i),l[d+1]=Math.min(o,r),l[d+2]=Math.min(a,n);break;case"lighten":l[d]=Math.max(s,i),l[d+1]=Math.max(o,r),l[d+2]=Math.max(a,n);break;case"overlay":l[d]=i<128?2*s*i/255:255-2*(255-s)*(255-i)/255,l[d+1]=r<128?2*o*r/255:255-2*(255-o)*(255-r)/255,l[d+2]=n<128?2*a*n/255:255-2*(255-a)*(255-n)/255;break;case"exclusion":l[d]=i+s-2*i*s/255,l[d+1]=r+o-2*r*o/255,l[d+2]=n+a-2*n*a/255;break;case"tint":l[d]=i+s*f,l[d+1]=r+o*f,l[d+2]=n+a*f}},getUniformLocations:function(t,e){return{uColor:t.getUniformLocation(e,"uColor")}},sendUniformData:function(t,i){var r=new e.Color(this.color).getSource();r[0]=this.alpha*r[0]/255,r[1]=this.alpha*r[1]/255,r[2]=this.alpha*r[2]/255,r[3]=this.alpha,t.uniform4fv(i.uColor,r)},toObject:function(){return{color:this.color,mode:this.mode,alpha:this.alpha}}}),e.Image.filters.BlendColor.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=Math.pow,r=Math.floor,n=Math.sqrt,s=Math.abs,o=Math.round,a=Math.sin,h=Math.ceil,c=e.Image.filters,l=e.util.createClass;c.Resize=l(c.BaseFilter,{type:"Resize",resizeType:"hermite",scaleX:0,scaleY:0,lanczosLobes:3,applyTo2d:function(t){var e=t.imageData,i=t.scaleX||this.scaleX,r=t.scaleY||this.scaleY;if(1!==i||1!==r){this.rcpScaleX=1/i,this.rcpScaleY=1/r;var n,s=e.width,a=e.height,h=o(s*i),c=o(a*r);"sliceHack"===this.resizeType?n=this.sliceByTwo(t,s,a,h,c):"hermite"===this.resizeType?n=this.hermiteFastResize(t,s,a,h,c):"bilinear"===this.resizeType?n=this.bilinearFiltering(t,s,a,h,c):"lanczos"===this.resizeType&&(n=this.lanczosResize(t,s,a,h,c)),t.imageData=n}},sliceByTwo:function(t,i,n,s,o){var a,h,c=t.imageData,l=.5,u=!1,f=!1,d=i*l,g=n*l,p=e.filterBackend.resources,v=0,m=0,b=i,_=0;for(p.sliceByTwo||(p.sliceByTwo=document.createElement("canvas")),a=p.sliceByTwo,(a.width<1.5*i||a.height<n)&&(a.width=1.5*i,a.height=n),h=a.getContext("2d"),h.clearRect(0,0,1.5*i,n),h.putImageData(c,0,0),s=r(s),o=r(o);!u||!f;)i=d,n=g,s<r(d*l)?d=r(d*l):(d=s,u=!0),o<r(g*l)?g=r(g*l):(g=o,f=!0),h.drawImage(a,v,m,i,n,b,_,d,g),v=b,m=_,_+=g;return h.getImageData(v,m,s,o)},lanczosResize:function(t,e,o,c,l){function u(t){return function(e){if(e>t)return 0;if(e*=Math.PI,s(e)<1e-16)return 1;var i=e/t;return a(e)*a(i)/e/i}}function f(t){var a,h,u,O,k,j,D,E,P,A,M;for(T.x=(t+.5)*m,w.x=r(T.x),a=0;a<l;a++){for(T.y=(a+.5)*b,w.y=r(T.y),k=0,j=0,D=0,E=0,P=0,h=w.x-x;h<=w.x+x;h++)if(!(h<0||h>=e)){A=r(1e3*s(h-T.x)),S[A]||(S[A]={});for(var L=w.y-C;L<=w.y+C;L++)L<0||L>=o||(M=r(1e3*s(L-T.y)),S[A][M]||(S[A][M]=v(n(i(A*_,2)+i(M*y,2))/1e3)),u=S[A][M],u>0&&(O=4*(L*e+h),k+=u,j+=u*d[O],D+=u*d[O+1],E+=u*d[O+2],P+=u*d[O+3]))}O=4*(a*c+t),p[O]=j/k,p[O+1]=D/k,p[O+2]=E/k,p[O+3]=P/k}return++t<c?f(t):g}var d=t.imageData.data,g=t.ctx.creteImageData(c,l),p=g.data,v=u(this.lanczosLobes),m=this.rcpScaleX,b=this.rcpScaleY,_=2/this.rcpScaleX,y=2/this.rcpScaleY,x=h(m*this.lanczosLobes/2),C=h(b*this.lanczosLobes/2),S={},T={},w={};return f(0)},bilinearFiltering:function(t,e,i,n,s){var o,a,h,c,l,u,f,d,g,p,v,m,b,_=0,y=this.rcpScaleX,x=this.rcpScaleY,C=4*(e-1),S=t.imageData,T=S.data,w=t.ctx.createImageData(n,s),O=w.data;for(f=0;f<s;f++)for(d=0;d<n;d++)for(l=r(y*d),u=r(x*f),g=y*d-l,p=x*f-u,b=4*(u*e+l),v=0;v<4;v++)o=T[b+v],a=T[b+4+v],h=T[b+C+v],c=T[b+C+4+v],m=o*(1-g)*(1-p)+a*g*(1-p)+h*p*(1-g)+c*g*p,O[_++]=m;return w},hermiteFastResize:function(t,e,i,o,a){for(var c=this.rcpScaleX,l=this.rcpScaleY,u=h(c/2),f=h(l/2),d=t.imageData,g=d.data,p=t.ctx.createimageData(o,a),v=p.data,m=0;m<a;m++)for(var b=0;b<o;b++){for(var _=4*(b+m*o),y=0,x=0,C=0,S=0,T=0,w=0,O=0,k=(m+.5)*l,j=r(m*l);j<(m+1)*l;j++)for(var D=s(k-(j+.5))/f,E=(b+.5)*c,P=D*D,A=r(b*c);A<(b+1)*c;A++){var M=s(E-(A+.5))/u,L=n(P+M*M);L>1&&L<-1||(y=2*L*L*L-3*L*L+1,y>0&&(M=4*(A+j*e),O+=y*g[M+3],C+=y,g[M+3]<255&&(y=y*g[M+3]/250),S+=y*g[M],T+=y*g[M+1],w+=y*g[M+2],x+=y))}v[_]=S/x,v[_+1]=T/x,v[_+2]=w/x,v[_+3]=O/C}return p},toObject:function(){return{type:this.type,scaleX:this.scaleX,scaleY:this.scaleY,resizeType:this.resizeType,lanczosLobes:this.lanczosLobes}}}),e.Image.filters.Resize.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.Image.filters,r=e.util.createClass;i.Contrast=r(i.BaseFilter,{type:"Contrast",fragmentSource:"precision highp float;\nuniform sampler2D uTexture;\nuniform float uContrast;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nfloat contrastF = 1.015 * (uContrast + 1.0) / (1.0 * (1.015 - uContrast));\ncolor.rgb = contrastF * (color.rgb - 0.5) + 0.5;\ngl_FragColor = color;\n}",contrast:0,mainParameter:"contrast",applyTo2d:function(t){if(0!==this.contrast){var e,i,r=t.imageData,n=r.data,i=n.length,s=Math.floor(255*this.contrast),o=259*(s+255)/(255*(259-s));for(e=0;e<i;e+=4)n[e]=o*(n[e]-128)+128,n[e+1]=o*(n[e+1]-128)+128,n[e+2]=o*(n[e+2]-128)+128}},getUniformLocations:function(t,e){return{uContrast:t.getUniformLocation(e,"uContrast")}},sendUniformData:function(t,e){t.uniform1f(e.uContrast,this.contrast)}}),e.Image.filters.Contrast.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.Image.filters,r=e.util.createClass;i.Saturation=r(i.BaseFilter,{type:"Saturation",fragmentSource:"precision highp float;\nuniform sampler2D uTexture;\nuniform float uSaturation;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nfloat rgMax = max(color.r, color.g);\nfloat rgbMax = max(rgMax, color.b);\ncolor.r += rgbMax != color.r ? (rgbMax - color.r) * uSaturation : 0.00;\ncolor.g += rgbMax != color.g ? (rgbMax - color.g) * uSaturation : 0.00;\ncolor.b += rgbMax != color.b ? (rgbMax - color.b) * uSaturation : 0.00;\ngl_FragColor = color;\n}",saturation:0,mainParameter:"saturation",applyTo2d:function(t){if(0!==this.saturation){var e,i,r=t.imageData,n=r.data,s=n.length,o=-this.saturation;for(e=0;e<s;e+=4)i=Math.max(n[e],n[e+1],n[e+2]),n[e]+=i!==n[e]?(i-n[e])*o:0,n[e+1]+=i!==n[e+1]?(i-n[e+1])*o:0,n[e+2]+=i!==n[e+2]?(i-n[e+2])*o:0}},getUniformLocations:function(t,e){return{uSaturation:t.getUniformLocation(e,"uSaturation")}},sendUniformData:function(t,e){t.uniform1f(e.uSaturation,-this.saturation)}}),e.Image.filters.Saturation.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.Image.filters,r=e.util.createClass;i.Blur=r(i.BaseFilter,{type:"Blur",fragmentSource:"precision highp float;\nuniform sampler2D uTexture;\nuniform vec2 uDelta;\nvarying vec2 vTexCoord;\nconst float nSamples = 15.0;\nvec3 v3offset = vec3(12.9898, 78.233, 151.7182);\nfloat random(vec3 scale) {\nreturn fract(sin(dot(gl_FragCoord.xyz, scale)) * 43758.5453);\n}\nvoid main() {\nvec4 color = vec4(0.0);\nfloat total = 0.0;\nfloat offset = random(v3offset);\nfor (float t = -nSamples; t <= nSamples; t++) {\nfloat percent = (t + offset - 0.5) / nSamples;\nfloat weight = 1.0 - abs(percent);\ncolor += texture2D(uTexture, vTexCoord + uDelta * percent) * weight;\ntotal += weight;\n}\ngl_FragColor = color / total;\n}",blur:0,mainParameter:"blur",applyTo:function(t){t.webgl?(this.aspectRatio=t.sourceWidth/t.sourceHeight,t.passes++,this._setupFrameBuffer(t),this.horizontal=!0,this.applyToWebGL(t),this._swapTextures(t),this._setupFrameBuffer(t),this.horizontal=!1,this.applyToWebGL(t),this._swapTextures(t)):this.applyTo2d(t)},applyTo2d:function(t){t.imageData=this.simpleBlur(t)},simpleBlur:function(t){var i,r,n=e.filterBackend.resources,s=t.imageData.width,o=t.imageData.height;n.blurLayer1||(n.blurLayer1=document.createElement("canvas"),n.blurLayer2=document.createElement("canvas")),i=n.blurLayer1,r=n.blurLayer2,i.width===s&&i.height===o||(r.width=i.width=s,r.height=i.height=o);var a,h,c,l,u=i.getContext("2d"),f=r.getContext("2d"),d=15,g=.06*this.blur*.5;for(u.putImageData(t.imageData,0,0),f.clearRect(0,0,s,o),l=-d;l<=d;l++)a=(Math.random()-.5)/4,h=l/d,c=g*h*s+a,f.globalAlpha=1-Math.abs(h),f.drawImage(i,c,a),u.drawImage(r,0,0),f.globalAlpha=1,f.clearRect(0,0,r.width,r.height);for(l=-d;l<=d;l++)a=(Math.random()-.5)/4,h=l/d,c=g*h*o+a,f.globalAlpha=1-Math.abs(h),f.drawImage(i,a,c),u.drawImage(r,0,0),f.globalAlpha=1,f.clearRect(0,0,r.width,r.height);t.ctx.drawImage(i,0,0);var p=t.ctx.getImageData(0,0,i.width,i.height);return u.globalAlpha=1,u.clearRect(0,0,i.width,i.height),p},getUniformLocations:function(t,e){return{delta:t.getUniformLocation(e,"uDelta")}},sendUniformData:function(t,e){var i=this.chooseRightDelta();t.uniform2fv(e.delta,i)},chooseRightDelta:function(){var t,e=1,i=[0,0];return this.horizontal?this.aspectRatio>1&&(e=1/this.aspectRatio):this.aspectRatio<1&&(e=this.aspectRatio),t=e*this.blur*.12,this.horizontal?i[0]=t:i[1]=t,i}}),i.Blur.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.Image.filters,r=e.util.createClass;i.Gamma=r(i.BaseFilter,{type:"Gamma",fragmentSource:"precision highp float;\nuniform sampler2D uTexture;\nuniform vec3 uGamma;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nvec3 correction = (1.0 / uGamma);\ncolor.r = pow(color.r, correction.r);\ncolor.g = pow(color.g, correction.g);\ncolor.b = pow(color.b, correction.b);\ngl_FragColor = color;\ngl_FragColor.rgb *= color.a;\n}",gamma:[1,1,1],mainParameter:"gamma",applyTo2d:function(t){var e,i=t.imageData,r=i.data,n=this.gamma,s=r.length,o=1/n[0],a=1/n[1],h=1/n[2];for(this.rVals||(this.rVals=new Uint8Array(256),this.gVals=new Uint8Array(256),this.bVals=new Uint8Array(256)),e=0,s=256;e<s;e++)this.rVals[e]=255*Math.pow(e/255,o),this.gVals[e]=255*Math.pow(e/255,a),this.bVals[e]=255*Math.pow(e/255,h);for(e=0,s=r.length;e<s;e+=4)r[e]=this.rVals[r[e]],r[e+1]=this.gVals[r[e+1]],r[e+2]=this.bVals[r[e+2]]},getUniformLocations:function(t,e){return{uGamma:t.getUniformLocation(e,"uGamma")}},sendUniformData:function(t,e){t.uniform3fv(e.uGamma,this.gamma)}}),e.Image.filters.Gamma.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.Image.filters,r=e.util.createClass;i.Composed=r(i.BaseFilter,{type:"Composed",subFilters:[],initialize:function(t){this.callSuper("initialize",t),this.subFilters=this.subFilters.slice(0)},applyTo:function(t){t.passes+=this.subFilters.length-1,this.subFilters.forEach(function(e){e.applyTo(t)})},toObject:function(){return e.util.object.extend(this.callSuper("toObject"),{subFilters:this.subFilters.map(function(t){return t.toObject()})})}}),e.Image.filters.Composed.fromObject=function(t,i){var r=t.subFilters||[],n=r.map(function(t){return new e.Image.filters[t.type](t)}),s=new e.Image.filters.Composed({subFilters:n});return i&&i(s),s}}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.clone,r=2,n=200;if(e.Text)return void e.warn("fabric.Text is already defined");var s=e.Object.prototype.stateProperties.concat();s.push("fontFamily","fontWeight","fontSize","text","underline","overline","linethrough","textAlign","fontStyle","lineHeight","textBackgroundColor","charSpacing","styles");var o=e.Object.prototype.cacheProperties.concat();o.push("fontFamily","fontWeight","fontSize","text","underline","overline","linethrough","textAlign","fontStyle","lineHeight","textBackgroundColor","charSpacing","styles"),e.Text=e.util.createClass(e.Object,{_dimensionAffectingProps:["fontSize","fontWeight","fontFamily","fontStyle","lineHeight","text","charSpacing","textAlign","styles"],_reNewline:/\r?\n/,_reSpacesAndTabs:/[ \t\r]/g,_reSpaceAndTab:/[ \t\r]/,_reWords:/\S+/g,type:"text",fontSize:40,fontWeight:"normal",fontFamily:"Times New Roman",underline:!1,overline:!1,linethrough:!1,textAlign:"left",fontStyle:"normal",lineHeight:1.16,textBackgroundColor:"",stateProperties:s,cacheProperties:o,stroke:null,shadow:null,_fontSizeFraction:.222,offsets:{underline:.1,linethrough:-.315,overline:-.88},_fontSizeMult:1.13,charSpacing:0,styles:null,_measuringContext:null,_styleProperties:["stroke","strokeWidth","fill","fontFamily","fontSize","fontWeight","fontStyle","underline","overline","linethrough"],__charBounds:[],initialize:function(t,e){e=e||{},this.text=t,this.__skipDimension=!0,this.callSuper("initialize",e),this.__skipDimension=!1,this.initDimensions(),this.setCoords(),this.setupState({propertySet:"_dimensionAffectingProps"})},getMeasuringContext:function(){return e._measuringContext||(e._measuringContext=this.canvas&&this.canvas.contextCache||e.util.createCanvasElement().getContext("2d")),e._measuringContext},isEmptyStyles:function(t){if(!this.styles)return!0;if("undefined"!=typeof t&&!this.styles[t])return!0;var e="undefined"==typeof t?this.styles:{line:this.styles[t]};for(var i in e)for(var r in e[i])for(var n in e[i][r])return!1;return!0},styleHas:function(t,e){if(!this.styles)return!1;if("undefined"!=typeof e&&!this.styles[e])return!1;var i="undefined"==typeof e?this.styles:{line:this.styles[e]};for(var r in i)for(var n in i[r])if("undefined"!=typeof i[r][n][t])return!0;return!1},_extendStyles:function(t,i){var r=this.get2DCursorLocation(t);this._getLineStyle(r.lineIndex)||this._setLineStyle(r.lineIndex,{}),this._getStyleDeclaration(r.lineIndex,r.charIndex)||this._setStyleDeclaration(r.lineIndex,r.charIndex,{}),e.util.object.extend(this._getStyleDeclaration(r.lineIndex,r.charIndex),i)},initDimensions:function(){if(!this.__skipDimension){var t=this._splitTextIntoLines(this.text);this.textLines=t.lines,this._unwrappedTextLines=t._unwrappedLines,this._textLines=t.graphemeLines,this._text=t.graphemeText,this._clearCache(),this.width=this.calcTextWidth()||this.cursorWidth||r,"justify"===this.textAlign&&this.enlargeSpaces(),this.height=this.calcTextHeight()}},enlargeSpaces:function(){for(var t,e,i,r,n,s,o,a=0,h=this._textLines.length;a<h;a++)if(r=0,n=this._textLines[a],e=this.getLineWidth(a),e<this.width&&(o=this.textLines[a].match(this._reSpacesAndTabs))){i=o.length,t=(this.width-e)/i;for(var c=0,l=n.length;c<=l;c++)s=this.__charBounds[a][c],this._reSpaceAndTab.test(n[c])?(s.width+=t,s.kernedWidth+=t,s.left+=r,r+=t):s.left+=r}},toString:function(){return"#<fabric.Text ("+this.complexity()+'): { "text": "'+this.text+'", "fontFamily": "'+this.fontFamily+'" }>'},_getCacheCanvasDimensions:function(){var t=this.callSuper("_getCacheCanvasDimensions"),e=this.fontSize;return t.width+=e*t.zoomX,t.height+=e*t.zoomY,t},_render:function(t){this._setTextStyles(t),this._renderTextLinesBackground(t),this._renderTextDecoration(t,"underline"),this._renderText(t),this._renderTextDecoration(t,"overline"),this._renderTextDecoration(t,"linethrough")},_renderText:function(t){this._renderTextFill(t),this._renderTextStroke(t)},_setTextStyles:function(t,e,i){t.textBaseline="alphabetic",t.font=this._getFontDeclaration(e,i)},calcTextWidth:function(){for(var t=this.getLineWidth(0),e=1,i=this._textLines.length;e<i;e++){var r=this.getLineWidth(e);r>t&&(t=r)}return t},_renderTextLine:function(t,e,i,r,n,s){this._renderChars(t,e,i,r,n,s)},_renderTextLinesBackground:function(t){if(this.textBackgroundColor||this.styleHas("textBackgroundColor")){for(var e,i,r,n,s,o,a=0,h=t.fillStyle,c=this._getLeftOffset(),l=this._getTopOffset(),u=0,f=0,d=0,g=this._textLines.length;d<g;d++)if(e=this.getHeightOfLine(d),this.textBackgroundColor||this.styleHas("textBackgroundColor",d)){r=this._textLines[d],i=this._getLineLeftOffset(d),f=0,u=0,n=this.getValueOfPropertyAt(d,0,"textBackgroundColor");for(var p=0,v=r.length;p<v;p++)s=this.__charBounds[d][p],o=this.getValueOfPropertyAt(d,p,"textBackgroundColor"),o!==n?(t.fillStyle=n,n&&t.fillRect(c+i+u,l+a,f,e/this.lineHeight),u=s.left,f=s.width,n=o):f+=s.kernedWidth;o&&(t.fillStyle=o,t.fillRect(c+i+u,l+a,f,e/this.lineHeight)),a+=e}else a+=e;t.fillStyle=h,this._removeShadow(t)}},getFontCache:function(t){var i=t.fontFamily.toLowerCase();e.charWidthsCache[i]||(e.charWidthsCache[i]={});var r=e.charWidthsCache[i],n=t.fontStyle.toLowerCase()+"_"+t.fontWeight.toLowerCase();return r[n]||(r[n]={}),r[n]},_applyCharStyles:function(t,e,i,r,n){this._setFillStyles(e,n),this._setStrokeStyles(e,n),e.font=this._getFontDeclaration(n)},_getStyleDeclaration:function(t,e){var i=this.styles&&this.styles[t];return i?i[e]:null},getCompleteStyleDeclaration:function(t,e){for(var i,r=this._getStyleDeclaration(t,e)||{},n={},s=0;s<this._styleProperties.length;s++)i=this._styleProperties[s],n[i]="undefined"==typeof r[i]?this[i]:r[i];return n},_setStyleDeclaration:function(t,e,i){this.styles[t][e]=i},_deleteStyleDeclaration:function(t,e){delete this.styles[t][e];
},_getLineStyle:function(t){return this.styles[t]},_setLineStyle:function(t,e){this.styles[t]=e},_deleteLineStyle:function(t){delete this.styles[t]},_measureChar:function(t,e,i,r){var s,o,a,h,c=this.getFontCache(e),l=this._getFontDeclaration(e),u=this._getFontDeclaration(r),f=i+t,d=l===u,g=e.fontSize/n;if(i&&c[i]&&(a=c[i]),c[t]&&(h=s=c[t]),d&&c[f]&&(o=c[f],h=o-a),!s||!a||!o){var p=this.getMeasuringContext();this._setTextStyles(p,e,!0)}if(s||(h=s=p.measureText(t).width,c[t]=s),!a&&d&&i&&(a=p.measureText(i).width,c[i]=a),d&&!o&&(o=p.measureText(f).width,c[f]=o,h=o-a,h>s)){var v=h-s;c[t]=h,c[f]+=v,s=h}return{width:s*g,kernedWidth:h*g}},getHeightOfChar:function(t,e){return this.getValueOfPropertyAt(t,e,"fontSize")},measureLine:function(t){var e=this._measureLine(t);return 0!==this.charSpacing&&(e.width-=this._getWidthOfCharSpacing()),e.width<0&&(e.width=0),e},_measureLine:function(t){var e,i,r,n,s=0,o=this._textLines[t],a=0,h=new Array(o.length);for(this.__charBounds[t]=h,e=0;e<o.length;e++)i=o[e],n=this._getGraphemeBox(i,t,e,r),h[e]=n,s+=n.kernedWidth,r=i;return h[e]={left:n?n.left+n.width:0,width:0,kernedWidth:0,height:this.fontSize},{width:s,numOfSpaces:a}},_getGraphemeBox:function(t,e,i,r,n){var s=this.getCompleteStyleDeclaration(e,i),o=r?this.getCompleteStyleDeclaration(e,i-1):{},a=this._measureChar(t,s,r,o),h=a.kernedWidth,c=a.width;0!==this.charSpacing&&(c+=this._getWidthOfCharSpacing(),h+=this._getWidthOfCharSpacing());var l={width:c,left:0,height:s.fontSize,kernedWidth:h};if(i>0&&!n){var u=this.__charBounds[e][i-1];l.left=u.left+u.width+a.kernedWidth-a.width}return l},getHeightOfLine:function(t){if(this.__lineHeights[t])return this.__lineHeights[t];for(var e=this._textLines[t],i=this.getHeightOfChar(t,0),r=1,n=e.length;r<n;r++){var s=this.getHeightOfChar(t,r);s>i&&(i=s)}return this.__lineHeights[t]=i*this.lineHeight*this._fontSizeMult,this.__lineHeights[t]},calcTextHeight:function(){for(var t,e=0,i=0,r=this._textLines.length;i<r;i++)t=this.getHeightOfLine(i),e+=i===r-1?t/this.lineHeight:t;return e},_getLeftOffset:function(){return-this.width/2},_getTopOffset:function(){return-this.height/2},_renderTextCommon:function(t,e){for(var i=0,r=this._getLeftOffset(),n=this._getTopOffset(),s=0,o=this._textLines.length;s<o;s++){var a=this.getHeightOfLine(s),h=a/this.lineHeight,c=this._getLineLeftOffset(s);this._renderTextLine(e,t,this._textLines[s],r+c,n+i+h,s),i+=a}},_renderTextFill:function(t){(this.fill||this.styleHas("fill"))&&this._renderTextCommon(t,"fillText")},_renderTextStroke:function(t){(this.stroke&&0!==this.strokeWidth||!this.isEmptyStyles())&&(this.shadow&&!this.shadow.affectStroke&&this._removeShadow(t),t.save(),this._setLineDash(t,this.strokeDashArray),t.beginPath(),this._renderTextCommon(t,"strokeText"),t.closePath(),t.restore())},_renderChars:function(t,e,i,r,n,s){var o,a,h,c,l=this.getHeightOfLine(s),u="",f=0;e.save(),n-=l*this._fontSizeFraction/this.lineHeight;for(var d=0,g=i.length-1;d<=g;d++)c=d===g||this.charSpacing,u+=i[d],h=this.__charBounds[s][d],0===f&&(r+=h.kernedWidth-h.width),f+=h.kernedWidth,"justify"!==this.textAlign||c||this._reSpaceAndTab.test(i[d])&&(c=!0),c||(o=o||this.getCompleteStyleDeclaration(s,d),a=this.getCompleteStyleDeclaration(s,d+1),c=this._hasStyleChanged(o,a)),c&&(this._renderChar(t,e,s,d,u,r,n,l),u="",o=a,r+=f,f=0);e.restore()},_renderChar:function(t,e,i,r,n,s,o){var a=this._getStyleDeclaration(i,r),h=this.getCompleteStyleDeclaration(i,r),c="fillText"===t&&h.fill,l="strokeText"===t&&h.stroke&&h.strokeWidth;(l||c)&&(a&&e.save(),this._applyCharStyles(t,e,i,r,h),a&&a.textBackgroundColor&&this._removeShadow(e),c&&e.fillText(n,s,o),l&&e.strokeText(n,s,o),a&&e.restore())},_hasStyleChanged:function(t,e){return t.fill!==e.fill||t.stroke!==e.stroke||t.strokeWidth!==e.strokeWidth||t.fontSize!==e.fontSize||t.fontFamily!==e.fontFamily||t.fontWeight!==e.fontWeight||t.fontStyle!==e.fontStyle},_getLineLeftOffset:function(t){var e=this.getLineWidth(t);return"center"===this.textAlign?(this.width-e)/2:"right"===this.textAlign?this.width-e:0},_clearCache:function(){this.__lineWidths=[],this.__lineHeights=[],this.__numberOfSpaces=[],this.__charBounds=[]},_shouldClearDimensionCache:function(){var t=this._forceClearCache;return t||(t=this.hasStateChanged("_dimensionAffectingProps")),t&&(this.saveState({propertySet:"_dimensionAffectingProps"}),this.dirty=!0,this._forceClearCache=!1),t},getLineWidth:function(t){if(this.__lineWidths[t])return this.__lineWidths[t];var e,i,r=this._textLines[t];return""===r?e=0:(i=this.measureLine(t),e=i.width),this.__lineWidths[t]=e,this.__numberOfSpaces[t]=i.numberOfSpaces,e},_getWidthOfCharSpacing:function(){return 0!==this.charSpacing?this.fontSize*this.charSpacing/1e3:0},getValueOfPropertyAt:function(t,e,i){var r=this._getStyleDeclaration(t,e),n=r&&"undefined"!=typeof r[i];return n?r[i]:this[i]},_renderTextDecoration:function(t,e){if(this[e]||this.styleHas(e)){for(var i,r,n,s,o,a,h,c,l,u,f,d=this._getLeftOffset(),g=this._getTopOffset(),p=0,v=this._textLines.length;p<v;p++)if(i=this.getHeightOfLine(p),this[e]||this.styleHas(e,p)){n=this._textLines[p],l=i/this.lineHeight,r=this._getLineLeftOffset(p),o=0,a=0,s=this.getValueOfPropertyAt(p,0,e),f=this.getValueOfPropertyAt(p,0,"fill");for(var m=0,b=n.length;m<b;m++)h=this.__charBounds[p][m],c=this.getValueOfPropertyAt(p,m,e),u=this.getValueOfPropertyAt(p,m,"fill"),(c!==s||u!==f)&&a>0?(t.fillStyle=f,s&&f&&t.fillRect(d+r+o,g+l*(1-this._fontSizeFraction)+this.offsets[e]*this.fontSize,a,this.fontSize/15),o=h.left,a=h.width,s=c,f=u):a+=h.kernedWidth;t.fillStyle=u,c&&u&&t.fillRect(d+r+o,g+l*(1-this._fontSizeFraction)+this.offsets[e]*this.fontSize,a,this.fontSize/15),g+=i}else g+=i;this._removeShadow(t)}},_getFontDeclaration:function(t,i){var r=t||this;return[e.isLikelyNode?r.fontWeight:r.fontStyle,e.isLikelyNode?r.fontStyle:r.fontWeight,i?n+"px":r.fontSize+"px",e.isLikelyNode?'"'+r.fontFamily+'"':r.fontFamily].join(" ")},render:function(t){this.visible&&(this.canvas&&this.canvas.skipOffscreen&&!this.group&&!this.isOnScreen()||(this._shouldClearDimensionCache()&&this.initDimensions(),this.callSuper("render",t)))},_splitTextIntoLines:function(t){for(var i=t.split(this._reNewline),r=new Array(i.length),n=["\n"],s=[],o=0;o<i.length;o++)r[o]=e.util.string.graphemeSplit(i[o]),s=s.concat(r[o],n);return s.pop(),{_unwrappedLines:r,lines:i,graphemeText:s,graphemeLines:r}},toObject:function(t){var e=["text","fontSize","fontWeight","fontFamily","fontStyle","lineHeight","underline","overline","linethrough","textAlign","textBackgroundColor","charSpacing"].concat(t),r=this.callSuper("toObject",e);return r.styles=i(this.styles,!0),r},_set:function(t,e){this.callSuper("_set",t,e),this._dimensionAffectingProps.indexOf(t)>-1&&(this.initDimensions(),this.setCoords())},complexity:function(){return 1}}),e.Text.ATTRIBUTE_NAMES=e.SHARED_ATTRIBUTES.concat("x y dx dy font-family font-style font-weight font-size text-decoration text-anchor".split(" ")),e.Text.DEFAULT_SVG_FONT_SIZE=16,e.Text.fromElement=function(t,r){if(!t)return null;var n=e.parseAttributes(t,e.Text.ATTRIBUTE_NAMES);if(r=e.util.object.extend(r?i(r):{},n),r.top=r.top||0,r.left=r.left||0,n.textDecoration){var s=n.textDecoration;s.indexOf("underline")!==-1&&(r.underline=!0),s.indexOf("overline")!==-1&&(r.overline=!0),s.indexOf("line-through")!==-1&&(r.linethrough=!0),delete r.textDecoration}"dx"in n&&(r.left+=n.dx),"dy"in n&&(r.top+=n.dy),"fontSize"in r||(r.fontSize=e.Text.DEFAULT_SVG_FONT_SIZE),r.originX||(r.originX="left");var o="";"textContent"in t?o=t.textContent:"firstChild"in t&&null!==t.firstChild&&"data"in t.firstChild&&null!==t.firstChild.data&&(o=t.firstChild.data),o=o.replace(/^\s+|\s+$|\n+/g,"").replace(/\s+/g," ");var a=new e.Text(o,r),h=a.getHeight()/a.height,c=(a.height+a.strokeWidth)*a.lineHeight-a.height,l=c*h,u=a.getHeight()+l,f=0;return"center"===a.originX&&(f=a.getWidth()/2),"right"===a.originX&&(f=a.getWidth()),a.set({left:a.getLeft()-f,top:a.getTop()-(u-a.fontSize*(.18+a._fontSizeFraction))/a.lineHeight}),a.originX="left",a.originY="top",a},e.Text.fromObject=function(t,i,r){return e.Object._fromObject("Text",t,i,r,"text")},e.util.createAccessors(e.Text)}("undefined"!=typeof exports?exports:this),function(){function t(t){t.textDecoration&&(t.textDecoration.indexOf("underline")>-1&&(t.underline=!0),t.textDecoration.indexOf("line-through")>-1&&(t.linethrough=!0),t.textDecoration.indexOf("overline")>-1&&(t.overline=!0),delete t.textDecoration)}fabric.IText=fabric.util.createClass(fabric.Text,fabric.Observable,{type:"i-text",selectionStart:0,selectionEnd:0,selectionColor:"rgba(17,119,255,0.3)",isEditing:!1,editable:!0,editingBorderColor:"rgba(102,153,255,0.25)",cursorWidth:2,cursorColor:"#333",cursorDelay:1e3,cursorDuration:600,caching:!0,_reSpace:/\s|\n/,_currentCursorOpacity:0,_selectionDirection:null,_abortCursorAnimation:!1,__widthOfSpace:[],inCompositionMode:!1,initialize:function(t,e){this.styles=e?e.styles||{}:{},this.callSuper("initialize",t,e),this.initBehavior()},setSelectionStart:function(t){t=Math.max(t,0),this._updateAndFire("selectionStart",t)},setSelectionEnd:function(t){t=Math.min(t,this.text.length),this._updateAndFire("selectionEnd",t)},_updateAndFire:function(t,e){this[t]!==e&&(this._fireSelectionChanged(),this[t]=e),this._updateTextarea()},_fireSelectionChanged:function(){this.fire("selection:changed"),this.canvas&&this.canvas.fire("text:selection:changed",{target:this})},getSelectionStyles:function(t,e){if(2===arguments.length){for(var i=[],r=t;r<e;r++)i.push(this.getSelectionStyles(r));return i}var n=this.get2DCursorLocation(t),s=this._getStyleDeclaration(n.lineIndex,n.charIndex);return s||{}},setSelectionStyles:function(t){if(this.selectionStart===this.selectionEnd)return this;for(var e=this.selectionStart;e<this.selectionEnd;e++)this._extendStyles(e,t);return this._forceClearCache=!0,this},initDimensions:function(){this.abortCursorAnimation(),this.clearContextTop(),this.callSuper("initDimensions")},render:function(t){this.clearContextTop(),this.callSuper("render",t),this.cursorOffsetCache={},this.renderCursorOrSelection()},_render:function(t){this.callSuper("_render",t),this.ctx=t},clearContextTop:function(t){if(this.active&&this.isEditing&&this.canvas&&this.canvas.contextTop){var e=this.canvas.contextTop;e.save(),e.transform.apply(e,this.canvas.viewportTransform),this.transform(e),this.transformMatrix&&e.transform.apply(e,this.transformMatrix),this._clearTextArea(e),t||e.restore()}},renderCursorOrSelection:function(){if(this.active&&this.isEditing){var t,e=this._getCursorBoundaries();this.canvas&&this.canvas.contextTop?(t=this.canvas.contextTop,this.clearContextTop(!0)):(t=this.ctx,t.save()),this.selectionStart===this.selectionEnd?this.renderCursor(e,t):this.renderSelection(e,t),t.restore()}},_clearTextArea:function(t){var e=this.width+4,i=this.height+4;t.clearRect(-e/2,-i/2,e,i)},get2DCursorLocation:function(t,e){"undefined"==typeof t&&(t=this.selectionStart);for(var i=e?this._unwrappedTextLines:this._textLines,r=i.length,n=0;n<r;n++){if(t<=i[n].length)return{lineIndex:n,charIndex:t};t-=i[n].length+1}return{lineIndex:n-1,charIndex:i[n-1].length<t?i[n-1].length:t}},_getCursorBoundaries:function(t){"undefined"==typeof t&&(t=this.selectionStart);var e=this._getLeftOffset(),i=this._getTopOffset(),r=this._getCursorBoundariesOffsets(t);return{left:e,top:i,leftOffset:r.left,topOffset:r.top}},_getCursorBoundariesOffsets:function(t){if(this.cursorOffsetCache&&"top"in this.cursorOffsetCache)return this.cursorOffsetCache;for(var e,i,r=0,n=0,s=0,o=0,a=this.get2DCursorLocation(t),h=0;h<a.lineIndex;h++)s+=this.getHeightOfLine(h);e=this._getLineLeftOffset(a.lineIndex);var c=this.__charBounds[a.lineIndex][a.charIndex];return c&&(o=c.left),0!==this.charSpacing&&n===this._textLines[r].length&&(o-=this._getWidthOfCharSpacing()),i={top:s,left:e+(o>0?o:0)},this.cursorOffsetCache=i,this.cursorOffsetCache},renderCursor:function(t,e){var i=this.get2DCursorLocation(),r=i.lineIndex,n=i.charIndex>0?i.charIndex-1:0,s=this.getValueOfPropertyAt(r,n,"fontSize"),o=this.scaleX*this.canvas.getZoom(),a=this.cursorWidth/o,h=t.topOffset;h+=(1-this._fontSizeFraction)*this.getHeightOfLine(r)/this.lineHeight-s*(1-this._fontSizeFraction),this.inCompositionMode&&this.renderSelection(t,e),e.fillStyle=this.getValueOfPropertyAt(r,n,"fill"),e.globalAlpha=this.__isMousedown?1:this._currentCursorOpacity,e.fillRect(t.left+t.leftOffset-a/2,h+t.top,a,s)},renderSelection:function(t,e){for(var i=this.inCompositionMode?this.hiddenTextarea.selectionStart:this.selectionStart,r=this.inCompositionMode?this.hiddenTextarea.selectionEnd:this.selectionEnd,n=this.get2DCursorLocation(i),s=this.get2DCursorLocation(r),o=n.lineIndex,a=s.lineIndex,h=n.charIndex<0?0:n.charIndex,c=s.charIndex<0?0:s.charIndex,l=o;l<=a;l++){var u=this._getLineLeftOffset(l)||0,f=this.getHeightOfLine(l),d=0,g=0,p=0;l===o&&(g=this.__charBounds[o][h].left),l>=o&&l<a?p=this.getLineWidth(l)||5:l===a&&(p=0===c?this.__charBounds[a][c].left:this.__charBounds[a][c-1].left+this.__charBounds[a][c-1].width),d=f,(this.lineHeight<1||l===a&&this.lineHeight>1)&&(f/=this.lineHeight),this.inCompositionMode?(e.fillStyle=this.compositionColor||"black",e.fillRect(t.left+u+g,t.top+t.topOffset+f,p-g,1)):(e.fillStyle=this.selectionColor,e.fillRect(t.left+u+g,t.top+t.topOffset,p-g,f)),t.topOffset+=d}},getCurrentCharFontSize:function(){var t=this._getCurrentCharIndex();return this.getValueOfPropertyAt(t.l,t.c,"fontSize")},getCurrentCharColor:function(){var t=this._getCurrentCharIndex();return this.getValueOfPropertyAt(t.l,t.c,"fill")},_getCurrentCharIndex:function(){var t=this.get2DCursorLocation(this.selectionStart,!0),e=t.charIndex>0?t.charIndex-1:0;return{l:t.lineIndex,c:e}}}),fabric.IText.fromObject=function(e,i,r){if(t(e),e.styles)for(var n in e.styles)for(var s in e.styles[n])t(e.styles[n][s]);return fabric.Object._fromObject("IText",e,i,r,"text")}}(),function(){var t=fabric.util.object.clone;fabric.util.object.extend(fabric.IText.prototype,{initBehavior:function(){this.initAddedHandler(),this.initRemovedHandler(),this.initCursorSelectionHandlers(),this.initDoubleClickSimulation(),this.mouseMoveHandler=this.mouseMoveHandler.bind(this)},onDeselect:function(){this.isEditing&&this.exitEditing(),this.selected=!1,this.callSuper("onDeselect")},initAddedHandler:function(){var t=this;this.on("added",function(){var e=t.canvas;e&&(e._hasITextHandlers||(e._hasITextHandlers=!0,t._initCanvasHandlers(e)),e._iTextInstances=e._iTextInstances||[],e._iTextInstances.push(t))})},initRemovedHandler:function(){var t=this;this.on("removed",function(){var e=t.canvas;e&&(e._iTextInstances=e._iTextInstances||[],fabric.util.removeFromArray(e._iTextInstances,t),0===e._iTextInstances.length&&(e._hasITextHandlers=!1,t._removeCanvasHandlers(e)))})},_initCanvasHandlers:function(t){t._mouseUpITextHandler=function(){t._iTextInstances&&t._iTextInstances.forEach(function(t){t.__isMousedown=!1})}.bind(this),t.on("mouse:up",t._mouseUpITextHandler)},_removeCanvasHandlers:function(t){t.off("mouse:up",t._mouseUpITextHandler)},_tick:function(){this._currentTickState=this._animateCursor(this,1,this.cursorDuration,"_onTickComplete")},_animateCursor:function(t,e,i,r){var n;return n={isAborted:!1,abort:function(){this.isAborted=!0}},t.animate("_currentCursorOpacity",e,{duration:i,onComplete:function(){n.isAborted||t[r]()},onChange:function(){t.canvas&&t.selectionStart===t.selectionEnd&&t.renderCursorOrSelection()},abort:function(){return n.isAborted}}),n},_onTickComplete:function(){var t=this;this._cursorTimeout1&&clearTimeout(this._cursorTimeout1),this._cursorTimeout1=setTimeout(function(){t._currentTickCompleteState=t._animateCursor(t,0,this.cursorDuration/2,"_tick")},100)},initDelayedCursor:function(t){var e=this,i=t?0:this.cursorDelay;this.abortCursorAnimation(),this._currentCursorOpacity=1,this._cursorTimeout2=setTimeout(function(){e._tick()},i)},abortCursorAnimation:function(){var t=this._currentTickState||this._currentTickCompleteState;this._currentTickState&&this._currentTickState.abort(),this._currentTickCompleteState&&this._currentTickCompleteState.abort(),clearTimeout(this._cursorTimeout1),clearTimeout(this._cursorTimeout2),this._currentCursorOpacity=0,t&&this.canvas&&this.canvas.clearContext(this.canvas.contextTop||this.ctx)},selectAll:function(){this.selectionStart=0,this.selectionEnd=this._text.length,this._fireSelectionChanged(),this._updateTextarea()},getSelectedText:function(){return this._text.slice(this.selectionStart,this.selectionEnd).join("")},findWordBoundaryLeft:function(t){var e=0,i=t-1;if(this._reSpace.test(this._text[i]))for(;this._reSpace.test(this._text[i]);)e++,i--;for(;/\S/.test(this._text[i])&&i>-1;)e++,i--;return t-e},findWordBoundaryRight:function(t){var e=0,i=t;if(this._reSpace.test(this._text[i]))for(;this._reSpace.test(this._text[i]);)e++,i++;for(;/\S/.test(this._text[i])&&i<this.text.length;)e++,i++;return t+e},findLineBoundaryLeft:function(t){for(var e=0,i=t-1;!/\n/.test(this._text[i])&&i>-1;)e++,i--;return t-e},findLineBoundaryRight:function(t){for(var e=0,i=t;!/\n/.test(this._text[i])&&i<this.text.length;)e++,i++;return t+e},searchWordBoundary:function(t,e){for(var i=this._reSpace.test(this.text.charAt(t))?t-1:t,r=this.text.charAt(i),n=/[ \n\.,;!\?\-]/;!n.test(r)&&i>0&&i<this.text.length;)i+=e,r=this.text.charAt(i);return n.test(r)&&"\n"!==r&&(i+=1===e?0:1),i},selectWord:function(t){t=t||this.selectionStart;var e=this.searchWordBoundary(t,-1),i=this.searchWordBoundary(t,1);this.selectionStart=e,this.selectionEnd=i,this._fireSelectionChanged(),this._updateTextarea(),this.renderCursorOrSelection()},selectLine:function(t){t=t||this.selectionStart;var e=this.findLineBoundaryLeft(t),i=this.findLineBoundaryRight(t);this.selectionStart=e,this.selectionEnd=i,this._fireSelectionChanged(),this._updateTextarea()},enterEditing:function(t){if(!this.isEditing&&this.editable)return this.canvas&&this.exitEditingOnOthers(this.canvas),this.isEditing=!0,this.initHiddenTextarea(t),this.hiddenTextarea.focus(),this.hiddenTextarea.value=this.text,this._updateTextarea(),this._saveEditingProps(),this._setEditingProps(),this._textBeforeEdit=this.text,this._tick(),this.fire("editing:entered"),this._fireSelectionChanged(),this.canvas?(this.canvas.fire("text:editing:entered",{target:this}),this.initMouseMoveHandler(),this.canvas.renderAll(),this):this},exitEditingOnOthers:function(t){t._iTextInstances&&t._iTextInstances.forEach(function(t){t.selected=!1,t.isEditing&&t.exitEditing()})},initMouseMoveHandler:function(){this.canvas.on("mouse:move",this.mouseMoveHandler)},mouseMoveHandler:function(t){if(this.__isMousedown&&this.isEditing){var e=this.getSelectionStartFromPointer(t.e),i=this.selectionStart,r=this.selectionEnd;(e===this.__selectionStartOnMouseDown&&i!==r||i!==e&&r!==e)&&(e>this.__selectionStartOnMouseDown?(this.selectionStart=this.__selectionStartOnMouseDown,this.selectionEnd=e):(this.selectionStart=e,this.selectionEnd=this.__selectionStartOnMouseDown),this.selectionStart===i&&this.selectionEnd===r||(this.restartCursorIfNeeded(),this._fireSelectionChanged(),this._updateTextarea(),this.renderCursorOrSelection()))}},_setEditingProps:function(){this.hoverCursor="text",this.canvas&&(this.canvas.defaultCursor=this.canvas.moveCursor="text"),this.borderColor=this.editingBorderColor,this.hasControls=this.selectable=!1,this.lockMovementX=this.lockMovementY=!0},fromStringToGraphemeSelection:function(t,e,i){var r=i.slice(0,t),n=fabric.util.string.graphemeSplit(r).length;if(t===e)return{selectionStart:n,selectionEnd:n};var s=i.slice(t,e),o=fabric.util.string.graphemeSplit(s).length;return{selectionStart:n,selectionEnd:n+o}},fromGraphemeToStringSelection:function(t,e,i){var r=i.slice(0,t),n=r.join("").length;if(t===e)return{selectionStart:n,selectionEnd:n};var s=i.slice(t,e),o=s.join("").length;return{selectionStart:n,selectionEnd:n+o}},_updateTextarea:function(){if(this.cursorOffsetCache={},this.hiddenTextarea){if(!this.inCompositionMode){var t=this.fromGraphemeToStringSelection(this.selectionStart,this.selectionEnd,this._text);this.hiddenTextarea.selectionStart=t.selectionStart,this.hiddenTextarea.selectionEnd=t.selectionEnd}this.updateTextareaPosition()}},updateFromTextArea:function(){if(this.hiddenTextarea){this.cursorOffsetCache={},this.text=this.hiddenTextarea.value;var t=this.fromStringToGraphemeSelection(this.hiddenTextarea.selectionStart,this.hiddenTextarea.selectionEnd,this.hiddenTextarea.value);this.selectionEnd=this.selectionStart=t.selectionEnd,this.inCompositionMode||(this.selectionStart=t.selectionStart),this.updateTextareaPosition()}},updateTextareaPosition:function(){if(this.selectionStart===this.selectionEnd){var t=this._calcTextareaPosition();this.hiddenTextarea.style.left=t.left,this.hiddenTextarea.style.top=t.top}},_calcTextareaPosition:function(){if(!this.canvas)return{x:1,y:1};var t=this.inCompositionMode?this.compositionStart:this.selectionStart,e=this._getCursorBoundaries(t),i=this.get2DCursorLocation(t),r=i.lineIndex,n=i.charIndex,s=this.getValueOfPropertyAt(r,n,"fontSize")*this.lineHeight,o=e.leftOffset,a=this.calcTransformMatrix(),h={x:e.left+o,y:e.top+e.topOffset+s},c=this.canvas.upperCanvasEl,l=c.width-s,u=c.height-s;return h=fabric.util.transformPoint(h,a),h=fabric.util.transformPoint(h,this.canvas.viewportTransform),h.x<0&&(h.x=0),h.x>l&&(h.x=l),h.y<0&&(h.y=0),h.y>u&&(h.y=u),h.x+=this.canvas._offset.left,h.y+=this.canvas._offset.top,{left:h.x+"px",top:h.y+"px",fontSize:s+"px",charHeight:s}},_saveEditingProps:function(){this._savedProps={hasControls:this.hasControls,borderColor:this.borderColor,lockMovementX:this.lockMovementX,lockMovementY:this.lockMovementY,hoverCursor:this.hoverCursor,defaultCursor:this.canvas&&this.canvas.defaultCursor,moveCursor:this.canvas&&this.canvas.moveCursor}},_restoreEditingProps:function(){this._savedProps&&(this.hoverCursor=this._savedProps.overCursor,this.hasControls=this._savedProps.hasControls,this.borderColor=this._savedProps.borderColor,this.lockMovementX=this._savedProps.lockMovementX,this.lockMovementY=this._savedProps.lockMovementY,this.canvas&&(this.canvas.defaultCursor=this._savedProps.defaultCursor,this.canvas.moveCursor=this._savedProps.moveCursor))},exitEditing:function(){var t=this._textBeforeEdit!==this.text;return this.selected=!1,this.isEditing=!1,this.selectable=!0,this.selectionEnd=this.selectionStart,this.hiddenTextarea&&(this.hiddenTextarea.blur&&this.hiddenTextarea.blur(),this.canvas&&this.hiddenTextarea.parentNode.removeChild(this.hiddenTextarea),this.hiddenTextarea=null),this.abortCursorAnimation(),this._restoreEditingProps(),this._currentCursorOpacity=0,this.fire("editing:exited"),t&&this.fire("modified"),this.canvas&&(this.canvas.off("mouse:move",this.mouseMoveHandler),this.canvas.fire("text:editing:exited",{target:this}),t&&this.canvas.fire("object:modified",{target:this})),this},_removeExtraneousStyles:function(){for(var t in this.styles)this._textLines[t]||delete this.styles[t]},removeStyleFromTo:function(t,e){var i,r,n=this.get2DCursorLocation(t,!0),s=this.get2DCursorLocation(e,!0),o=n.lineIndex,a=n.charIndex,h=s.lineIndex,c=s.charIndex;if(o!==h){if(this.styles[o])for(i=a;i<this._textLines[o].length;i++)delete this.styles[o][i];if(this.styles[h])for(i=c;i<this._textLines[h].length;i++)r=this.styles[h][i],r&&(this.styles[o]||(this.styles[o]={}),this.styles[o][a+i-c]=r);for(i=o+1;i<=h;i++)delete this.styles[i];this.shiftLineStyles(h,o-h)}else if(this.styles[o]){r=this.styles[o];var l=c-a;for(i=a;i<c;i++)delete r[i];for(i=c;i<this._textLines[o].length;i++)r[i]&&(r[i-l]=r[i],delete r[i])}},shiftLineStyles:function(e,i){var r=t(this.styles);for(var n in this.styles){var s=parseInt(n,10);s>e&&(this.styles[s+i]=r[s],r[s-i]||delete this.styles[s])}},restartCursorIfNeeded:function(){this._currentTickState&&!this._currentTickState.isAborted&&this._currentTickCompleteState&&!this._currentTickCompleteState.isAborted||this.initDelayedCursor()},insertNewlineStyleObject:function(e,i,r,n){var s,o={},a=!1;r||(r=1),this.shiftLineStyles(e,r),this.styles[e]&&this.styles[e][i-1]&&(s=this.styles[e][i-1]);for(var h in this.styles[e]){var c=parseInt(h,10);c>=i&&(a=!0,o[c-i]=this.styles[e][h],delete this.styles[e][h])}for(a?this.styles[e+r]=o:delete this.styles[e+r];r>1;)r--,n[r]?this.styles[e+r]={0:t(n[r])}:s?this.styles[e+r]={0:t(s)}:delete this.styles[e+r];this._forceClearCache=!0},insertCharStyleObject:function(e,i,r,n){var s=this.styles[e],o=t(s);r||(r=1);for(var a in o){var h=parseInt(a,10);h>=i&&(s[h+r]=o[h],o[h-r]||delete s[h])}if(this._forceClearCache=!0,s)if(n)for(;r--;)this.styles[e][i+r]=t(n[r]);else for(var c=s[i?i-1:1];c&&r--;)this.styles[e][i+r]=t(c)},insertNewStyleBlock:function(t,e,i){for(var r=this.get2DCursorLocation(e,!0),n=0,s=0,o=0;o<t.length;o++)"\n"===t[o]?(s&&(this.insertCharStyleObject(r.lineIndex,r.charIndex,s,i),i=i&&i.slice(s),s=0),n++):(n&&(this.insertNewlineStyleObject(r.lineIndex,r.charIndex,n,i),i=i&&i.slice(n),n=0),s++);s&&this.insertCharStyleObject(r.lineIndex,r.charIndex,s,i),n&&this.insertNewlineStyleObject(r.lineIndex,r.charIndex,n,i)},setSelectionStartEndWithShift:function(t,e,i){i<=t?(e===t?this._selectionDirection="left":"right"===this._selectionDirection&&(this._selectionDirection="left",this.selectionEnd=t),this.selectionStart=i):i>t&&i<e?"right"===this._selectionDirection?this.selectionEnd=i:this.selectionStart=i:(e===t?this._selectionDirection="right":"left"===this._selectionDirection&&(this._selectionDirection="right",this.selectionStart=e),this.selectionEnd=i)},setSelectionInBoundaries:function(){var t=this.text.length;this.selectionStart>t?this.selectionStart=t:this.selectionStart<0&&(this.selectionStart=0),this.selectionEnd>t?this.selectionEnd=t:this.selectionEnd<0&&(this.selectionEnd=0)}})}(),fabric.util.object.extend(fabric.IText.prototype,{initDoubleClickSimulation:function(){this.__lastClickTime=+new Date,this.__lastLastClickTime=+new Date,this.__lastPointer={},this.on("mousedown",this.onMouseDown.bind(this))},onMouseDown:function(t){this.__newClickTime=+new Date;var e=this.canvas.getPointer(t.e);this.isTripleClick(e,t.e)?(this.fire("tripleclick",t),this._stopEvent(t.e)):this.isDoubleClick(e)&&(this.fire("dblclick",t),this._stopEvent(t.e)),this.__lastLastClickTime=this.__lastClickTime,this.__lastClickTime=this.__newClickTime,this.__lastPointer=e,this.__lastIsEditing=this.isEditing,this.__lastSelected=this.selected},isDoubleClick:function(t){return this.__newClickTime-this.__lastClickTime<500&&this.__lastPointer.x===t.x&&this.__lastPointer.y===t.y&&this.__lastIsEditing},isTripleClick:function(t){return this.__newClickTime-this.__lastClickTime<500&&this.__lastClickTime-this.__lastLastClickTime<500&&this.__lastPointer.x===t.x&&this.__lastPointer.y===t.y},_stopEvent:function(t){t.preventDefault&&t.preventDefault(),t.stopPropagation&&t.stopPropagation()},initCursorSelectionHandlers:function(){this.initMousedownHandler(),this.initMouseupHandler(),this.initClicks()},initClicks:function(){this.on("dblclick",function(t){this.selectWord(this.getSelectionStartFromPointer(t.e))}),this.on("tripleclick",function(t){this.selectLine(this.getSelectionStartFromPointer(t.e))})},initMousedownHandler:function(){this.on("mousedown",function(t){if(this.editable&&(!t.e.button||1===t.e.button)){var e=this.canvas.getPointer(t.e);this.__mousedownX=e.x,this.__mousedownY=e.y,this.__isMousedown=!0,this.selected&&this.setCursorByClick(t.e),this.isEditing&&(this.__selectionStartOnMouseDown=this.selectionStart,this.selectionStart===this.selectionEnd&&this.abortCursorAnimation(),this.renderCursorOrSelection())}})},_isObjectMoved:function(t){var e=this.canvas.getPointer(t);return this.__mousedownX!==e.x||this.__mousedownY!==e.y},initMouseupHandler:function(){this.on("mouseup",function(t){this.__isMousedown=!1,!this.editable||this._isObjectMoved(t.e)||t.e.button&&1!==t.e.button||(this.__lastSelected&&!this.__corner&&(this.enterEditing(t.e),this.selectionStart===this.selectionEnd?this.initDelayedCursor(!0):this.renderCursorOrSelection()),this.selected=!0)})},setCursorByClick:function(t){var e=this.getSelectionStartFromPointer(t),i=this.selectionStart,r=this.selectionEnd;t.shiftKey?this.setSelectionStartEndWithShift(i,r,e):(this.selectionStart=e,this.selectionEnd=e),this.isEditing&&(this._fireSelectionChanged(),this._updateTextarea())},getSelectionStartFromPointer:function(t){for(var e,i,r=this.getLocalPointer(t),n=0,s=0,o=0,a=0,h=0,c=0,l=this._textLines.length;c<l&&o<=r.y;c++)o+=this.getHeightOfLine(c)*this.scaleY,h=c,c>0&&(a+=this._textLines[c-1].length+1);e=this._getLineLeftOffset(h),s=e*this.scaleX,i=this._textLines[h];for(var u=0,f=i.length;u<f&&(n=s,s+=this.__charBounds[h][u].kernedWidth*this.scaleX,s<=r.x);u++)a++;return this._getNewSelectionStartFromOffset(r,n,s,a,f)},_getNewSelectionStartFromOffset:function(t,e,i,r,n){var s=t.x-e,o=i-t.x,a=o>s?0:1,h=r+a;return this.flipX&&(h=n-h),h>this._text.length&&(h=this._text.length),h}}),fabric.util.object.extend(fabric.IText.prototype,{initHiddenTextarea:function(){this.hiddenTextarea=fabric.document.createElement("textarea"),this.hiddenTextarea.setAttribute("autocapitalize","off"),this.hiddenTextarea.setAttribute("autocorrect","off"),this.hiddenTextarea.setAttribute("autocomplete","off"),this.hiddenTextarea.setAttribute("spellcheck","false");var t=this._calcTextareaPosition();this.hiddenTextarea.style.cssText="white-space: nowrap; position: absolute; top: "+t.top+"; left: "+t.left+"; z-index: -999; opacity: 0; width: 1px; height: 1px; font-size: 1px; line-height: 1px; paddingｰtop: "+t.fontSize+";",fabric.document.body.appendChild(this.hiddenTextarea),fabric.util.addListener(this.hiddenTextarea,"keydown",this.onKeyDown.bind(this)),fabric.util.addListener(this.hiddenTextarea,"keyup",this.onKeyUp.bind(this)),fabric.util.addListener(this.hiddenTextarea,"input",this.onInput.bind(this)),fabric.util.addListener(this.hiddenTextarea,"copy",this.copy.bind(this)),fabric.util.addListener(this.hiddenTextarea,"cut",this.copy.bind(this)),fabric.util.addListener(this.hiddenTextarea,"paste",this.paste.bind(this)),fabric.util.addListener(this.hiddenTextarea,"compositionstart",this.onCompositionStart.bind(this)),fabric.util.addListener(this.hiddenTextarea,"compositionupdate",this.onCompositionUpdate.bind(this)),fabric.util.addListener(this.hiddenTextarea,"compositionend",this.onCompositionEnd.bind(this)),!this._clickHandlerInitialized&&this.canvas&&(fabric.util.addListener(this.canvas.upperCanvasEl,"click",this.onClick.bind(this)),this._clickHandlerInitialized=!0)},_keysMap:{9:"exitEditing",27:"exitEditing",33:"moveCursorUp",34:"moveCursorDown",35:"moveCursorRight",36:"moveCursorLeft",37:"moveCursorLeft",38:"moveCursorUp",39:"moveCursorRight",40:"moveCursorDown"},_ctrlKeysMapUp:{67:"copy",88:"cut"},_ctrlKeysMapDown:{65:"selectAll"},onClick:function(){this.hiddenTextarea&&this.hiddenTextarea.focus()},onKeyDown:function(t){if(this.isEditing&&!this.inCompositionMode){if(t.keyCode in this._keysMap)this[this._keysMap[t.keyCode]](t);else{if(!(t.keyCode in this._ctrlKeysMapDown&&(t.ctrlKey||t.metaKey)))return;this[this._ctrlKeysMapDown[t.keyCode]](t)}t.stopImmediatePropagation(),t.preventDefault(),t.keyCode>=33&&t.keyCode<=40?(this.clearContextTop(),this.renderCursorOrSelection()):this.canvas&&this.canvas.renderAll()}},onKeyUp:function(t){return!this.isEditing||this._copyDone||this.inCompositionMode?void(this._copyDone=!1):void(t.keyCode in this._ctrlKeysMapUp&&(t.ctrlKey||t.metaKey)&&(this[this._ctrlKeysMapUp[t.keyCode]](t),t.stopImmediatePropagation(),t.preventDefault(),this.canvas&&this.canvas.renderAll()))},onInput:function(t){var e=this.fromPaste;if(this.fromPaste=!1,t&&t.stopPropagation(),this.isEditing){var i,r,n=this._splitTextIntoLines(this.hiddenTextarea.value).graphemeText,s=this._text.length,o=n.length,a=o-s;""===this.hiddenTextarea.value&&(this.styles={},this.updateFromTextArea(),this.fire("changed"),this.canvas&&(this.canvas.fire("text:changed",{target:this}),this.canvas.renderAll())),this.selectionStart!==this.selectionEnd?(i=this._text.slice(this.selectionStart,this.selectionEnd),
a+=this.selectionEnd-this.selectionStart):o<s&&(i=this._text.slice(this.selectionEnd+a,this.selectionEnd));var h=this.fromStringToGraphemeSelection(this.hiddenTextarea.selectionStart,this.hiddenTextarea.selectionEnd,this.hiddenTextarea.value);r=n.slice(h.selectionEnd-a,h.selectionEnd),i&&i.length&&(this.selectionStart!==this.selectionEnd?this.removeStyleFromTo(this.selectionStart,this.selectionEnd):this.selectionStart>h.selectionStart?this.removeStyleFromTo(this.selectionEnd-i.length,this.selectionEnd):this.removeStyleFromTo(this.selectionEnd,this.selectionEnd+i.length)),r.length&&(e&&r.join("")===fabric.copiedText?this.insertNewStyleBlock(r,this.selectionStart,fabric.copiedTextStyle):this.insertNewStyleBlock(r,this.selectionStart)),this.updateFromTextArea(),this.fire("changed"),this.canvas&&(this.canvas.fire("text:changed",{target:this}),this.canvas.renderAll())}},onCompositionStart:function(){this.inCompositionMode=!0},onCompositionEnd:function(){this.inCompositionMode=!1},onCompositionUpdate:function(t){this.compositionStart=t.target.selectionStart,this.compositionEnd=t.target.selectionEnd,this.updateTextareaPosition()},copy:function(){if(this.selectionStart!==this.selectionEnd){var t=this.getSelectedText();fabric.copiedText=t,fabric.copiedTextStyle=this.getSelectionStyles(this.selectionStart,this.selectionEnd),this._copyDone=!0}},paste:function(){this.fromPaste=!0},_getClipboardData:function(t){return t&&t.clipboardData||fabric.window.clipboardData},_getWidthBeforeCursor:function(t,e){var i,r=this._getLineLeftOffset(t);return e>0&&(i=this.__charBounds[t][e-1],r+=i.left+i.width),r},getDownCursorOffset:function(t,e){var i=this._getSelectionForOffset(t,e),r=this.get2DCursorLocation(i),n=r.lineIndex;if(n===this._textLines.length-1||t.metaKey||34===t.keyCode)return this._text.length-i;var s=r.charIndex,o=this._getWidthBeforeCursor(n,s),a=this._getIndexOnLine(n+1,o),h=this._textLines[n].slice(s);return h.length+a+2},_getSelectionForOffset:function(t,e){return t.shiftKey&&this.selectionStart!==this.selectionEnd&&e?this.selectionEnd:this.selectionStart},getUpCursorOffset:function(t,e){var i=this._getSelectionForOffset(t,e),r=this.get2DCursorLocation(i),n=r.lineIndex;if(0===n||t.metaKey||33===t.keyCode)return-i;var s=r.charIndex,o=this._getWidthBeforeCursor(n,s),a=this._getIndexOnLine(n-1,o),h=this._textLines[n].slice(0,s);return-this._textLines[n-1].length+a-h.length},_getIndexOnLine:function(t,e){for(var i,r,n=this._textLines[t],s=this._getLineLeftOffset(t),o=s,a=0,h=0,c=n.length;h<c;h++)if(i=this.__charBounds[t][h].width,o+=i,o>e){r=!0;var l=o-i,u=o,f=Math.abs(l-e),d=Math.abs(u-e);a=d<f?h:h-1;break}return r||(a=n.length-1),a},moveCursorDown:function(t){this.selectionStart>=this._text.length&&this.selectionEnd>=this._text.length||this._moveCursorUpOrDown("Down",t)},moveCursorUp:function(t){0===this.selectionStart&&0===this.selectionEnd||this._moveCursorUpOrDown("Up",t)},_moveCursorUpOrDown:function(t,e){var i="get"+t+"CursorOffset",r=this[i](e,"right"===this._selectionDirection);e.shiftKey?this.moveCursorWithShift(r):this.moveCursorWithoutShift(r),0!==r&&(this.setSelectionInBoundaries(),this.abortCursorAnimation(),this._currentCursorOpacity=1,this.initDelayedCursor(),this._fireSelectionChanged(),this._updateTextarea())},moveCursorWithShift:function(t){var e="left"===this._selectionDirection?this.selectionStart+t:this.selectionEnd+t;return this.setSelectionStartEndWithShift(this.selectionStart,this.selectionEnd,e),0!==t},moveCursorWithoutShift:function(t){return t<0?(this.selectionStart+=t,this.selectionEnd=this.selectionStart):(this.selectionEnd+=t,this.selectionStart=this.selectionEnd),0!==t},moveCursorLeft:function(t){0===this.selectionStart&&0===this.selectionEnd||this._moveCursorLeftOrRight("Left",t)},_move:function(t,e,i){var r;if(t.altKey)r=this["findWordBoundary"+i](this[e]);else{if(!t.metaKey&&35!==t.keyCode&&36!==t.keyCode)return this[e]+="Left"===i?-1:1,!0;r=this["findLineBoundary"+i](this[e])}if(void 0!==typeof r&&this[e]!==r)return this[e]=r,!0},_moveLeft:function(t,e){return this._move(t,e,"Left")},_moveRight:function(t,e){return this._move(t,e,"Right")},moveCursorLeftWithoutShift:function(t){var e=!0;return this._selectionDirection="left",this.selectionEnd===this.selectionStart&&0!==this.selectionStart&&(e=this._moveLeft(t,"selectionStart")),this.selectionEnd=this.selectionStart,e},moveCursorLeftWithShift:function(t){return"right"===this._selectionDirection&&this.selectionStart!==this.selectionEnd?this._moveLeft(t,"selectionEnd"):0!==this.selectionStart?(this._selectionDirection="left",this._moveLeft(t,"selectionStart")):void 0},moveCursorRight:function(t){this.selectionStart>=this._text.length&&this.selectionEnd>=this._text.length||this._moveCursorLeftOrRight("Right",t)},_moveCursorLeftOrRight:function(t,e){var i="moveCursor"+t+"With";this._currentCursorOpacity=1,i+=e.shiftKey?"Shift":"outShift",this[i](e)&&(this.abortCursorAnimation(),this.initDelayedCursor(),this._fireSelectionChanged(),this._updateTextarea())},moveCursorRightWithShift:function(t){return"left"===this._selectionDirection&&this.selectionStart!==this.selectionEnd?this._moveRight(t,"selectionStart"):this.selectionEnd!==this._text.length?(this._selectionDirection="right",this._moveRight(t,"selectionEnd")):void 0},moveCursorRightWithoutShift:function(t){var e=!0;return this._selectionDirection="right",this.selectionStart===this.selectionEnd?(e=this._moveRight(t,"selectionStart"),this.selectionEnd=this.selectionStart):this.selectionStart=this.selectionEnd,e},removeChars:function(t){this.selectionStart===this.selectionEnd?this._removeCharsNearCursor(t):this._removeCharsFromTo(this.selectionStart,this.selectionEnd),this.set("dirty",!0),this.setSelectionEnd(this.selectionStart),this._removeExtraneousStyles(),this.canvas&&this.canvas.renderAll(),this.setCoords(),this.fire("changed"),this.canvas&&this.canvas.fire("text:changed",{target:this})},_removeCharsNearCursor:function(t){if(0!==this.selectionStart)if(t.metaKey){var e=this.findLineBoundaryLeft(this.selectionStart);this._removeCharsFromTo(e,this.selectionStart),this.setSelectionStart(e)}else if(t.altKey){var i=this.findWordBoundaryLeft(this.selectionStart);this._removeCharsFromTo(i,this.selectionStart),this.setSelectionStart(i)}else this._removeSingleCharAndStyle(this.selectionStart),this.setSelectionStart(this.selectionStart-1)}}),function(){var t=fabric.util.toFixed,e=fabric.Object.NUM_FRACTION_DIGITS;fabric.util.object.extend(fabric.Text.prototype,{toSVG:function(t){var e=this._createBaseSVGMarkup(),i=this._getSVGLeftTopOffsets(),r=this._getSVGTextAndBg(i.textTop,i.textLeft);return this._wrapSVGTextAndBg(e,r),t?t(e.join("")):e.join("")},_getSVGLeftTopOffsets:function(){return{textLeft:-this.width/2,textTop:-this.height/2,lineTop:this.getHeightOfLine(0)}},_wrapSVGTextAndBg:function(t,e){var i=!0,r=this.getSvgFilter(),n=""===r?"":' style="'+r+'"';t.push("\t<g ",this.getSvgId(),'transform="',this.getSvgTransform(),this.getSvgTransformMatrix(),'"',n,">\n",e.textBgRects.join(""),"\t\t<text ",this.fontFamily?'font-family="'+this.fontFamily.replace(/"/g,"'")+'" ':"",this.fontSize?'font-size="'+this.fontSize+'" ':"",this.fontStyle?'font-style="'+this.fontStyle+'" ':"",this.fontWeight?'font-weight="'+this.fontWeight+'" ':"",this.textDecoration?'text-decoration="'+this.textDecoration+'" ':"",'style="',this.getSvgStyles(i),'" >\n',e.textSpans.join(""),"\t\t</text>\n","\t</g>\n")},_getSVGTextAndBg:function(t,e){var i,r=[],n=[],s=t;this._setSVGBg(n);for(var o=0,a=this._textLines.length;o<a;o++)i=this._getLineLeftOffset(o),(this.textBackgroundColor||this.styleHas("textBackgroundColor",o))&&this._setSVGTextLineBg(n,o,e+i,s),this._setSVGTextLineText(r,o,e+i,s),s+=this.getHeightOfLine(o);return{textSpans:r,textBgRects:n}},_createTextCharSpan:function(i,r,n,s){var o=this.getSvgSpanStyles(r,!1),a=o?'style="'+o+'"':"";return['\t\t\t<tspan x="',t(n,e),'" y="',t(s,e),'" ',a,">",fabric.util.string.escapeXml(i),"</tspan>\n"].join("")},_setSVGTextLineText:function(t,e,i,r){var n,s,o,a,h,c=this.getHeightOfLine(e),l="",u=0,f=this._textLines[e];r+=c*(1-this._fontSizeFraction)/this.lineHeight;for(var d=0,g=f.length-1;d<=g;d++)h=d===g||this.charSpacing,l+=f[d],o=this.__charBounds[e][d],0===u&&(i+=o.kernedWidth-o.width),u+=o.kernedWidth,"justify"!==this.textAlign||h||this._reSpaceAndTab.test(f[d])&&(h=!0),h||(n=n||this.getCompleteStyleDeclaration(e,d),s=this.getCompleteStyleDeclaration(e,d+1),h=this._hasStyleChanged(n,s)),h&&(a=this._getStyleDeclaration(e,d)||{},t.push(this._createTextCharSpan(l,a,i,r)),l="",n=s,i+=u,u=0)},_pushTextBgRect:function(i,r,n,s,o,a){i.push("\t\t<rect ",this._getFillAttributes(r),' x="',t(n,e),'" y="',t(s,e),'" width="',t(o,e),'" height="',t(a,e),'"></rect>\n')},_setSVGTextLineBg:function(t,e,i,r){for(var n,s,o=this._textLines[e],a=this.getHeightOfLine(e)/this.lineHeight,h=0,c=0,l=this.getValueOfPropertyAt(e,0,"textBackgroundColor"),u=0,f=o.length;u<f;u++)n=this.__charBounds[e][u],s=this.getValueOfPropertyAt(e,u,"textBackgroundColor"),s!==l?(l&&this._pushTextBgRect(t,l,i+c,r,h,a),c=n.left,h=n.width,l=s):h+=n.kernedWidth;s&&this._pushTextBgRect(t,s,i+c,r,h,a)},_getFillAttributes:function(t){var e=t&&"string"==typeof t?new fabric.Color(t):"";return e&&e.getSource()&&1!==e.getAlpha()?'opacity="'+e.getAlpha()+'" fill="'+e.setAlpha(1).toRgb()+'"':'fill="'+t+'"'},_getSVGLineTopOffset:function(t){for(var e=0,i=0,r=0;r<t;r++)e+=this.getHeightOfLine(r);return i=this.getHeightOfLine(r),{lineTop:e,offset:(this._fontSizeMult-this._fontSizeFraction)*i/(this.lineHeight*this._fontSizeMult)}}})}(),function(t){"use strict";var e=t.fabric||(t.fabric={});e.Textbox=e.util.createClass(e.IText,e.Observable,{type:"textbox",minWidth:20,dynamicMinWidth:2,__cachedLines:null,lockScalingY:!0,lockScalingFlip:!0,noScaleCache:!1,initialize:function(t,i){this.callSuper("initialize",t,i),this.setControlsVisibility(e.Textbox.getTextboxControlVisibility()),this.ctx=this.objectCaching?this._cacheContext:e.util.createCanvasElement().getContext("2d"),this._dimensionAffectingProps.push("width")},initDimensions:function(){if(!this.__skipDimension){this.initDelayedCursor(),this.clearContextTop(),this._clearCache(),this.dynamicMinWidth=0;var t=this._splitTextIntoLines(this.text);this.textLines=t.lines,this._textLines=t.graphemeLines,this._unwrappedTextLines=t._unwrappedLines,this._text=t.graphemeText,this._styleMap=this._generateStyleMap(t),this.dynamicMinWidth>this.width&&this._set("width",this.dynamicMinWidth),"justify"===this.textAlign&&this.enlargeSpaces(),this.height=this.calcTextHeight()}},_generateStyleMap:function(t){for(var e=0,i=0,r=0,n={},s=0;s<t.graphemeLines.length;s++)"\n"===t.graphemeText[r]&&s>0?(i=0,r++,e++):this._reSpaceAndTab.test(t.graphemeText[r])&&s>0&&(i++,r++),n[s]={line:e,offset:i},r+=t.graphemeLines[s].length,i+=t.graphemeLines[s].length;return n},styleHas:function(t,i){if(this._styleMap&&!this.isWrapping){var r=this._styleMap[i];r&&(i=r.line)}return e.Text.prototype.styleHas.call(this,t,i)},_getStyleDeclaration:function(t,e){if(this._styleMap&&!this.isWrapping){var i=this._styleMap[t];if(!i)return null;t=i.line,e=i.offset+e}return this.callSuper("_getStyleDeclaration",t,e)},_setStyleDeclaration:function(t,e,i){var r=this._styleMap[t];t=r.line,e=r.offset+e,this.styles[t][e]=i},_deleteStyleDeclaration:function(t,e){var i=this._styleMap[t];t=i.line,e=i.offset+e,delete this.styles[t][e]},_getLineStyle:function(t){var e=this._styleMap[t];return this.styles[e.line]},_setLineStyle:function(t,e){var i=this._styleMap[t];this.styles[i.line]=e},_deleteLineStyle:function(t){var e=this._styleMap[t];delete this.styles[e.line]},_wrapText:function(t,e){var i,r=[];for(this.isWrapping=!0,i=0;i<t.length;i++)r=r.concat(this._wrapLine(t[i],i,e));return this.isWrapping=!1,r},_measureWord:function(t,e,i){var r,n=0,s=!0;i=i||0;for(var o=0,a=t.length;o<a;o++){var h=this._getGraphemeBox(t[o],e,o+i,r,s);n+=h.kernedWidth,r=t[o]}return n},_wrapLine:function(t,i,r){for(var n=0,s=[],o=[],a=t.split(this._reSpaceAndTab),h="",c=0,l=" ",u=0,f=0,d=0,g=!0,p=this._getWidthOfCharSpacing(),v=0;v<a.length;v++)h=e.util.string.graphemeSplit(a[v]),u=this._measureWord(h,i,c),c+=h.length,n+=f+u-p,n>=r&&!g&&(s.push(o),o=[],n=u,g=!0),g||o.push(l),o=o.concat(h),f=this._measureWord([l],i,c),c++,g=!1,u>d&&(d=u);return v&&s.push(o),d>this.dynamicMinWidth&&(this.dynamicMinWidth=d-p),s},_splitTextIntoLines:function(t){for(var i=e.Text.prototype._splitTextIntoLines.call(this,t),r=this._wrapText(i.lines,this.width),n=new Array(r.length),s=0;s<r.length;s++)n[s]=r[s].join("");return i.lines=n,i.graphemeLines=r,i},setOnGroup:function(t,e){"scaleX"===t&&(this.set("scaleX",Math.abs(1/e)),this.set("width",this.get("width")*e/("undefined"==typeof this.__oldScaleX?1:this.__oldScaleX)),this.__oldScaleX=e)},getMinWidth:function(){return Math.max(this.minWidth,this.dynamicMinWidth)},toObject:function(t){return this.callSuper("toObject",["minWidth"].concat(t))}}),e.Textbox.fromObject=function(t,i,r){return e.Object._fromObject("Textbox",t,i,r,"text")},e.Textbox.getTextboxControlVisibility=function(){return{tl:!1,tr:!1,br:!1,bl:!1,ml:!0,mt:!1,mr:!0,mb:!1,mtr:!0}}}("undefined"!=typeof exports?exports:this),function(){var t=fabric.Canvas.prototype._setObjectScale;fabric.Canvas.prototype._setObjectScale=function(e,i,r,n,s,o,a){var h=i.target;if(!(h instanceof fabric.Textbox))return t.call(fabric.Canvas.prototype,e,i,r,n,s,o,a);var c=h.width*(e.x/i.scaleX/(h.width+h.strokeWidth));return c>=h.getMinWidth()?(h.set("width",c),!0):void 0},fabric.Group.prototype._refreshControlsVisibility=function(){if("undefined"!=typeof fabric.Textbox)for(var t=this._objects.length;t--;)if(this._objects[t]instanceof fabric.Textbox)return void this.setControlsVisibility(fabric.Textbox.getTextboxControlVisibility())},fabric.util.object.extend(fabric.Textbox.prototype,{_removeExtraneousStyles:function(){for(var t in this._styleMap)this._textLines[t]||delete this.styles[this._styleMap[t].line]}})}(),function(){function request(t,e,i){var r=URL.parse(t);r.port||(r.port=0===r.protocol.indexOf("https:")?443:80);var n=0===r.protocol.indexOf("https:")?HTTPS:HTTP,s=n.request({hostname:r.hostname,port:r.port,path:r.path,method:"GET"},function(t){var r="";e&&t.setEncoding(e),t.on("end",function(){i(r)}),t.on("data",function(e){200===t.statusCode&&(r+=e)})});s.on("error",function(t){t.errno===process.ECONNREFUSED?fabric.log("ECONNREFUSED: connection refused to "+r.hostname+":"+r.port):fabric.log(t.message),i(null)}),s.end()}function requestFs(t,e){var i=require("fs");i.readFile(t,function(t,i){if(t)throw fabric.log(t),t;e(i)})}if("undefined"==typeof document||"undefined"==typeof window){var DOMParser=require("xmldom").DOMParser,URL=require("url"),HTTP=require("http"),HTTPS=require("https"),Canvas=require(fabric.canvasModule),Image=require(fabric.canvasModule).Image;fabric.util.loadImage=function(t,e,i){function r(r){r?(n.src=new Buffer(r,"binary"),n._src=t,e&&e.call(i,n)):(n=null,e&&e.call(i,null,!0))}var n=new Image;t&&(t instanceof Buffer||0===t.indexOf("data"))?(n.src=n._src=t,e&&e.call(i,n)):t&&0!==t.indexOf("http")?requestFs(t,r):t?request(t,"binary",r):e&&e.call(i,t)},fabric.loadSVGFromURL=function(t,e,i){t=t.replace(/^\n\s*/,"").replace(/\?.*$/,"").trim(),0!==t.indexOf("http")?requestFs(t,function(t){fabric.loadSVGFromString(t.toString(),e,i)}):request(t,"",function(t){fabric.loadSVGFromString(t,e,i)})},fabric.loadSVGFromString=function(t,e,i){var r=(new DOMParser).parseFromString(t);fabric.parseSVGDocument(r.documentElement,function(t,i){e&&e(t,i)},i)},fabric.util.getScript=function(url,callback){request(url,"",function(body){eval(body),callback&&callback()})},fabric.createCanvasForNode=function(t,e,i,r){r=r||i;var n=fabric.document.createElement("canvas"),s=new Canvas(t||600,e||600,r),o=new Canvas(t||600,e||600,r);n.width=s.width,n.height=s.height,i=i||{},i.nodeCanvas=s,i.nodeCacheCanvas=o;var a=fabric.Canvas||fabric.StaticCanvas,h=new a(n,i);return h.nodeCanvas=s,h.nodeCacheCanvas=o,h.contextContainer=s.getContext("2d"),h.contextCache=o.getContext("2d"),h.Font=Canvas.Font,h};var originaInitStatic=fabric.StaticCanvas.prototype._initStatic;fabric.StaticCanvas.prototype._initStatic=function(t,e){t=t||fabric.document.createElement("canvas"),this.nodeCanvas=new Canvas(t.width,t.height),this.nodeCacheCanvas=new Canvas(t.width,t.height),originaInitStatic.call(this,t,e),this.contextContainer=this.nodeCanvas.getContext("2d"),this.contextCache=this.nodeCacheCanvas.getContext("2d"),this.Font=Canvas.Font},fabric.StaticCanvas.prototype.createPNGStream=function(){return this.nodeCanvas.createPNGStream()},fabric.StaticCanvas.prototype.createJPEGStream=function(t){return this.nodeCanvas.createJPEGStream(t)},fabric.StaticCanvas.prototype._initRetinaScaling=function(){if(this._isRetinaScaling())return this.lowerCanvasEl.setAttribute("width",this.width*fabric.devicePixelRatio),this.lowerCanvasEl.setAttribute("height",this.height*fabric.devicePixelRatio),this.nodeCanvas.width=this.width*fabric.devicePixelRatio,this.nodeCanvas.height=this.height*fabric.devicePixelRatio,this.contextContainer.scale(fabric.devicePixelRatio,fabric.devicePixelRatio),this},fabric.Canvas&&(fabric.Canvas.prototype._initRetinaScaling=fabric.StaticCanvas.prototype._initRetinaScaling);var origSetBackstoreDimension=fabric.StaticCanvas.prototype._setBackstoreDimension;fabric.StaticCanvas.prototype._setBackstoreDimension=function(t,e){return origSetBackstoreDimension.call(this,t,e),this.nodeCanvas[t]=e,this},fabric.Canvas&&(fabric.Canvas.prototype._setBackstoreDimension=fabric.StaticCanvas.prototype._setBackstoreDimension)}}();


/*
 *
 * More info at [www.dropzonejs.com](http://www.dropzonejs.com)
 *
 * Copyright (c) 2012, Matias Meno
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

(function() {
  var Dropzone, Emitter, ExifRestore, camelize, contentLoaded, detectVerticalSquash, drawImageIOSFix, noop, without,
    slice = [].slice,
    extend1 = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  noop = function() {};

  Emitter = (function() {
    function Emitter() {}

    Emitter.prototype.addEventListener = Emitter.prototype.on;

    Emitter.prototype.on = function(event, fn) {
      this._callbacks = this._callbacks || {};
      if (!this._callbacks[event]) {
        this._callbacks[event] = [];
      }
      this._callbacks[event].push(fn);
      return this;
    };

    Emitter.prototype.emit = function() {
      var args, callback, callbacks, event, j, len;
      event = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      this._callbacks = this._callbacks || {};
      callbacks = this._callbacks[event];
      if (callbacks) {
        for (j = 0, len = callbacks.length; j < len; j++) {
          callback = callbacks[j];
          callback.apply(this, args);
        }
      }
      return this;
    };

    Emitter.prototype.removeListener = Emitter.prototype.off;

    Emitter.prototype.removeAllListeners = Emitter.prototype.off;

    Emitter.prototype.removeEventListener = Emitter.prototype.off;

    Emitter.prototype.off = function(event, fn) {
      var callback, callbacks, i, j, len;
      if (!this._callbacks || arguments.length === 0) {
        this._callbacks = {};
        return this;
      }
      callbacks = this._callbacks[event];
      if (!callbacks) {
        return this;
      }
      if (arguments.length === 1) {
        delete this._callbacks[event];
        return this;
      }
      for (i = j = 0, len = callbacks.length; j < len; i = ++j) {
        callback = callbacks[i];
        if (callback === fn) {
          callbacks.splice(i, 1);
          break;
        }
      }
      return this;
    };

    return Emitter;

  })();

  Dropzone = (function(superClass) {
    var extend, resolveOption;

    extend1(Dropzone, superClass);

    Dropzone.prototype.Emitter = Emitter;


    /*
    This is a list of all available events you can register on a dropzone object.

    You can register an event handler like this:

        dropzone.on("dragEnter", function() { });
     */

    Dropzone.prototype.events = ["drop", "dragstart", "dragend", "dragenter", "dragover", "dragleave", "addedfile", "addedfiles", "removedfile", "thumbnail", "error", "errormultiple", "processing", "processingmultiple", "uploadprogress", "totaluploadprogress", "sending", "sendingmultiple", "success", "successmultiple", "canceled", "canceledmultiple", "complete", "completemultiple", "reset", "maxfilesexceeded", "maxfilesreached", "queuecomplete"];

    Dropzone.prototype.defaultOptions = {
      url: null,
      method: "post",
      withCredentials: false,
      timeout: 30000,
      parallelUploads: 2,
      uploadMultiple: false,
      maxFilesize: 256,
      paramName: "file",
      createImageThumbnails: true,
      maxThumbnailFilesize: 10,
      thumbnailWidth: 120,
      thumbnailHeight: 120,
      thumbnailMethod: 'crop',
      resizeWidth: null,
      resizeHeight: null,
      resizeMimeType: null,
      resizeQuality: 0.8,
      resizeMethod: 'contain',
      filesizeBase: 1000,
      maxFiles: null,
      params: {},
      headers: null,
      clickable: true,
      ignoreHiddenFiles: true,
      acceptedFiles: null,
      acceptedMimeTypes: null,
      autoProcessQueue: true,
      autoQueue: true,
      addRemoveLinks: false,
      previewsContainer: null,
      hiddenInputContainer: "body",
      capture: null,
      renameFilename: null,
      forceFallback: false,
      dictDefaultMessage: "Drop files here to upload",
      dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
      dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
      dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
      dictInvalidFileType: "You can't upload files of this type.",
      dictResponseError: "Server responded with {{statusCode}} code.",
      dictCancelUpload: "Cancel upload",
      dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",
      dictRemoveFile: "Remove file",
      dictRemoveFileConfirmation: null,
      dictMaxFilesExceeded: "You can not upload any more files.",
      init: function() {
        return noop;
      },
      accept: function(file, done) {
        return done();
      },
      fallback: function() {
        var child, j, len, messageElement, ref, span;
        this.element.className = this.element.className + " dz-browser-not-supported";
        ref = this.element.getElementsByTagName("div");
        for (j = 0, len = ref.length; j < len; j++) {
          child = ref[j];
          if (/(^| )dz-message($| )/.test(child.className)) {
            messageElement = child;
            child.className = "dz-message";
            continue;
          }
        }
        if (!messageElement) {
          messageElement = Dropzone.createElement("<div class=\"dz-message\"><span></span></div>");
          this.element.appendChild(messageElement);
        }
        span = messageElement.getElementsByTagName("span")[0];
        if (span) {
          if (span.textContent != null) {
            span.textContent = this.options.dictFallbackMessage;
          } else if (span.innerText != null) {
            span.innerText = this.options.dictFallbackMessage;
          }
        }
        return this.element.appendChild(this.getFallbackForm());
      },
      resize: function(file, width, height, resizeMethod) {
        var info, srcRatio, trgRatio;
        info = {
          srcX: 0,
          srcY: 0,
          srcWidth: file.width,
          srcHeight: file.height
        };
        srcRatio = file.width / file.height;
        if ((width == null) && (height == null)) {
          width = info.srcWidth;
          height = info.srcHeight;
        } else if (width == null) {
          width = height * srcRatio;
        } else if (height == null) {
          height = width / srcRatio;
        }
        width = Math.min(width, info.srcWidth);
        height = Math.min(height, info.srcHeight);
        trgRatio = width / height;
        if (info.srcWidth > width || info.srcHeight > height) {
          if (resizeMethod === 'crop') {
            if (srcRatio > trgRatio) {
              info.srcHeight = file.height;
              info.srcWidth = info.srcHeight * trgRatio;
            } else {
              info.srcWidth = file.width;
              info.srcHeight = info.srcWidth / trgRatio;
            }
          } else if (resizeMethod === 'contain') {
            if (srcRatio > trgRatio) {
              height = width / srcRatio;
            } else {
              width = height * srcRatio;
            }
          } else {
            throw new Error("Unknown resizeMethod '" + resizeMethod + "'");
          }
        }
        info.srcX = (file.width - info.srcWidth) / 2;
        info.srcY = (file.height - info.srcHeight) / 2;
        info.trgWidth = width;
        info.trgHeight = height;
        return info;
      },
      transformFile: function(file, done) {
        if ((this.options.resizeWidth || this.options.resizeHeight) && file.type.match(/image.*/)) {
          return this.resizeImage(file, this.options.resizeWidth, this.options.resizeHeight, this.options.resizeMethod, done);
        } else {
          return done(file);
        }
      },
      previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><img data-dz-thumbnail /></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Check</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Error</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <g id=\"Check-+-Oval-2\" sketch:type=\"MSLayerGroup\" stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n          <path d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" sketch:type=\"MSShapeGroup\"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>",

      /*
      Those functions register themselves to the events on init and handle all
      the user interface specific stuff. Overwriting them won't break the upload
      but can break the way it's displayed.
      You can overwrite them if you don't like the default behavior. If you just
      want to add an additional event handler, register it on the dropzone object
      and don't overwrite those options.
       */
      drop: function(e) {
        return this.element.classList.remove("dz-drag-hover");
      },
      dragstart: noop,
      dragend: function(e) {
        return this.element.classList.remove("dz-drag-hover");
      },
      dragenter: function(e) {
        return this.element.classList.add("dz-drag-hover");
      },
      dragover: function(e) {
        return this.element.classList.add("dz-drag-hover");
      },
      dragleave: function(e) {
        return this.element.classList.remove("dz-drag-hover");
      },
      paste: noop,
      reset: function() {
        return this.element.classList.remove("dz-started");
      },
      addedfile: function(file) {
        var j, k, l, len, len1, len2, node, ref, ref1, ref2, removeFileEvent, removeLink, results;
        if (this.element === this.previewsContainer) {
          this.element.classList.add("dz-started");
        }
        if (this.previewsContainer) {
          file.previewElement = Dropzone.createElement(this.options.previewTemplate.trim());
          file.previewTemplate = file.previewElement;
          this.previewsContainer.appendChild(file.previewElement);
          ref = file.previewElement.querySelectorAll("[data-dz-name]");
          for (j = 0, len = ref.length; j < len; j++) {
            node = ref[j];
            node.textContent = this._renameFilename(file.name, file);
          }
          ref1 = file.previewElement.querySelectorAll("[data-dz-size]");
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            node = ref1[k];
            node.innerHTML = this.filesize(file.size);
          }
          if (this.options.addRemoveLinks) {
            file._removeLink = Dropzone.createElement("<a class=\"dz-remove\" href=\"javascript:undefined;\" data-dz-remove>" + this.options.dictRemoveFile + "</a>");
            file.previewElement.appendChild(file._removeLink);
          }
          removeFileEvent = (function(_this) {
            return function(e) {
              e.preventDefault();
              e.stopPropagation();
              if (file.status === Dropzone.UPLOADING) {
                return Dropzone.confirm(_this.options.dictCancelUploadConfirmation, function() {
                  return _this.removeFile(file);
                });
              } else {
                if (_this.options.dictRemoveFileConfirmation) {
                  return Dropzone.confirm(_this.options.dictRemoveFileConfirmation, function() {
                    return _this.removeFile(file);
                  });
                } else {
                  return _this.removeFile(file);
                }
              }
            };
          })(this);
          ref2 = file.previewElement.querySelectorAll("[data-dz-remove]");
          results = [];
          for (l = 0, len2 = ref2.length; l < len2; l++) {
            removeLink = ref2[l];
            results.push(removeLink.addEventListener("click", removeFileEvent));
          }
          return results;
        }
      },
      removedfile: function(file) {
        var ref;
        if (file.previewElement) {
          if ((ref = file.previewElement) != null) {
            ref.parentNode.removeChild(file.previewElement);
          }
        }
        return this._updateMaxFilesReachedClass();
      },
      thumbnail: function(file, dataUrl) {
        var j, len, ref, thumbnailElement;
        if (file.previewElement) {
          file.previewElement.classList.remove("dz-file-preview");
          ref = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
          for (j = 0, len = ref.length; j < len; j++) {
            thumbnailElement = ref[j];
            thumbnailElement.alt = file.name;
            thumbnailElement.src = dataUrl;
          }
          return setTimeout(((function(_this) {
            return function() {
              return file.previewElement.classList.add("dz-image-preview");
            };
          })(this)), 1);
        }
      },
      error: function(file, message) {
        var j, len, node, ref, results;
        if (file.previewElement) {
          file.previewElement.classList.add("dz-error");
          if (typeof message !== "String" && message.error) {
            message = message.error;
          }
          ref = file.previewElement.querySelectorAll("[data-dz-errormessage]");
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            node = ref[j];
            results.push(node.textContent = message);
          }
          return results;
        }
      },
      errormultiple: noop,
      processing: function(file) {
        if (file.previewElement) {
          file.previewElement.classList.add("dz-processing");
          if (file._removeLink) {
            return file._removeLink.textContent = this.options.dictCancelUpload;
          }
        }
      },
      processingmultiple: noop,
      uploadprogress: function(file, progress, bytesSent) {
        var j, len, node, ref, results;
        if (file.previewElement) {
          ref = file.previewElement.querySelectorAll("[data-dz-uploadprogress]");
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            node = ref[j];
            if (node.nodeName === 'PROGRESS') {
              results.push(node.value = progress);
            } else {
              results.push(node.style.width = progress + "%");
            }
          }
          return results;
        }
      },
      totaluploadprogress: noop,
      sending: noop,
      sendingmultiple: noop,
      success: function(file) {
        if (file.previewElement) {
          return file.previewElement.classList.add("dz-success");
        }
      },
      successmultiple: noop,
      canceled: function(file) {
        return this.emit("error", file, "Upload canceled.");
      },
      canceledmultiple: noop,
      complete: function(file) {
        if (file._removeLink) {
          file._removeLink.textContent = this.options.dictRemoveFile;
        }
        if (file.previewElement) {
          return file.previewElement.classList.add("dz-complete");
        }
      },
      completemultiple: noop,
      maxfilesexceeded: noop,
      maxfilesreached: noop,
      queuecomplete: noop,
      addedfiles: noop
    };

    extend = function() {
      var j, key, len, object, objects, target, val;
      target = arguments[0], objects = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      for (j = 0, len = objects.length; j < len; j++) {
        object = objects[j];
        for (key in object) {
          val = object[key];
          target[key] = val;
        }
      }
      return target;
    };

    function Dropzone(element1, options) {
      var elementOptions, fallback, ref;
      this.element = element1;
      this.version = Dropzone.version;
      this.defaultOptions.previewTemplate = this.defaultOptions.previewTemplate.replace(/\n*/g, "");
      this.clickableElements = [];
      this.listeners = [];
      this.files = [];
      if (typeof this.element === "string") {
        this.element = document.querySelector(this.element);
      }
      if (!(this.element && (this.element.nodeType != null))) {
        throw new Error("Invalid dropzone element.");
      }
      if (this.element.dropzone) {
        throw new Error("Dropzone already attached.");
      }
      Dropzone.instances.push(this);
      this.element.dropzone = this;
      elementOptions = (ref = Dropzone.optionsForElement(this.element)) != null ? ref : {};
      this.options = extend({}, this.defaultOptions, elementOptions, options != null ? options : {});
      if (this.options.forceFallback || !Dropzone.isBrowserSupported()) {
        return this.options.fallback.call(this);
      }
      if (this.options.url == null) {
        this.options.url = this.element.getAttribute("action");
      }
      if (!this.options.url) {
        throw new Error("No URL provided.");
      }
      if (this.options.acceptedFiles && this.options.acceptedMimeTypes) {
        throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
      }
      if (this.options.acceptedMimeTypes) {
        this.options.acceptedFiles = this.options.acceptedMimeTypes;
        delete this.options.acceptedMimeTypes;
      }
      this.options.method = this.options.method.toUpperCase();
      if ((fallback = this.getExistingFallback()) && fallback.parentNode) {
        fallback.parentNode.removeChild(fallback);
      }
      if (this.options.previewsContainer !== false) {
        if (this.options.previewsContainer) {
          this.previewsContainer = Dropzone.getElement(this.options.previewsContainer, "previewsContainer");
        } else {
          this.previewsContainer = this.element;
        }
      }
      if (this.options.clickable) {
        if (this.options.clickable === true) {
          this.clickableElements = [this.element];
        } else {
          this.clickableElements = Dropzone.getElements(this.options.clickable, "clickable");
        }
      }
      this.init();
    }

    Dropzone.prototype.getAcceptedFiles = function() {
      var file, j, len, ref, results;
      ref = this.files;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        file = ref[j];
        if (file.accepted) {
          results.push(file);
        }
      }
      return results;
    };

    Dropzone.prototype.getRejectedFiles = function() {
      var file, j, len, ref, results;
      ref = this.files;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        file = ref[j];
        if (!file.accepted) {
          results.push(file);
        }
      }
      return results;
    };

    Dropzone.prototype.getFilesWithStatus = function(status) {
      var file, j, len, ref, results;
      ref = this.files;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        file = ref[j];
        if (file.status === status) {
          results.push(file);
        }
      }
      return results;
    };

    Dropzone.prototype.getQueuedFiles = function() {
      return this.getFilesWithStatus(Dropzone.QUEUED);
    };

    Dropzone.prototype.getUploadingFiles = function() {
      return this.getFilesWithStatus(Dropzone.UPLOADING);
    };

    Dropzone.prototype.getAddedFiles = function() {
      return this.getFilesWithStatus(Dropzone.ADDED);
    };

    Dropzone.prototype.getActiveFiles = function() {
      var file, j, len, ref, results;
      ref = this.files;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        file = ref[j];
        if (file.status === Dropzone.UPLOADING || file.status === Dropzone.QUEUED) {
          results.push(file);
        }
      }
      return results;
    };

    Dropzone.prototype.init = function() {
      var eventName, j, len, noPropagation, ref, ref1, setupHiddenFileInput;
      if (this.element.tagName === "form") {
        this.element.setAttribute("enctype", "multipart/form-data");
      }
      if (this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message")) {
        this.element.appendChild(Dropzone.createElement("<div class=\"dz-default dz-message\"><span>" + this.options.dictDefaultMessage + "</span></div>"));
      }
      if (this.clickableElements.length) {
        setupHiddenFileInput = (function(_this) {
          return function() {
            if (_this.hiddenFileInput) {
              _this.hiddenFileInput.parentNode.removeChild(_this.hiddenFileInput);
            }
            _this.hiddenFileInput = document.createElement("input");
            _this.hiddenFileInput.setAttribute("type", "file");
            if ((_this.options.maxFiles == null) || _this.options.maxFiles > 1) {
              _this.hiddenFileInput.setAttribute("multiple", "multiple");
            }
            _this.hiddenFileInput.className = "dz-hidden-input";
            if (_this.options.acceptedFiles != null) {
              _this.hiddenFileInput.setAttribute("accept", _this.options.acceptedFiles);
            }
            if (_this.options.capture != null) {
              _this.hiddenFileInput.setAttribute("capture", _this.options.capture);
            }
            _this.hiddenFileInput.style.visibility = "hidden";
            _this.hiddenFileInput.style.position = "absolute";
            _this.hiddenFileInput.style.top = "0";
            _this.hiddenFileInput.style.left = "0";
            _this.hiddenFileInput.style.height = "0";
            _this.hiddenFileInput.style.width = "0";
            document.querySelector(_this.options.hiddenInputContainer).appendChild(_this.hiddenFileInput);
            return _this.hiddenFileInput.addEventListener("change", function() {
              var file, files, j, len;
              files = _this.hiddenFileInput.files;
              if (files.length) {
                for (j = 0, len = files.length; j < len; j++) {
                  file = files[j];
                  _this.addFile(file);
                }
              }
              _this.emit("addedfiles", files);
              return setupHiddenFileInput();
            });
          };
        })(this);
        setupHiddenFileInput();
      }
      this.URL = (ref = window.URL) != null ? ref : window.webkitURL;
      ref1 = this.events;
      for (j = 0, len = ref1.length; j < len; j++) {
        eventName = ref1[j];
        this.on(eventName, this.options[eventName]);
      }
      this.on("uploadprogress", (function(_this) {
        return function() {
          return _this.updateTotalUploadProgress();
        };
      })(this));
      this.on("removedfile", (function(_this) {
        return function() {
          return _this.updateTotalUploadProgress();
        };
      })(this));
      this.on("canceled", (function(_this) {
        return function(file) {
          return _this.emit("complete", file);
        };
      })(this));
      this.on("complete", (function(_this) {
        return function(file) {
          if (_this.getAddedFiles().length === 0 && _this.getUploadingFiles().length === 0 && _this.getQueuedFiles().length === 0) {
            return setTimeout((function() {
              return _this.emit("queuecomplete");
            }), 0);
          }
        };
      })(this));
      noPropagation = function(e) {
        e.stopPropagation();
        if (e.preventDefault) {
          return e.preventDefault();
        } else {
          return e.returnValue = false;
        }
      };
      this.listeners = [
        {
          element: this.element,
          events: {
            "dragstart": (function(_this) {
              return function(e) {
                return _this.emit("dragstart", e);
              };
            })(this),
            "dragenter": (function(_this) {
              return function(e) {
                noPropagation(e);
                return _this.emit("dragenter", e);
              };
            })(this),
            "dragover": (function(_this) {
              return function(e) {
                var efct;
                try {
                  efct = e.dataTransfer.effectAllowed;
                } catch (undefined) {}
                e.dataTransfer.dropEffect = 'move' === efct || 'linkMove' === efct ? 'move' : 'copy';
                noPropagation(e);
                return _this.emit("dragover", e);
              };
            })(this),
            "dragleave": (function(_this) {
              return function(e) {
                return _this.emit("dragleave", e);
              };
            })(this),
            "drop": (function(_this) {
              return function(e) {
                noPropagation(e);
                return _this.drop(e);
              };
            })(this),
            "dragend": (function(_this) {
              return function(e) {
                return _this.emit("dragend", e);
              };
            })(this)
          }
        }
      ];
      this.clickableElements.forEach((function(_this) {
        return function(clickableElement) {
          return _this.listeners.push({
            element: clickableElement,
            events: {
              "click": function(evt) {
                if ((clickableElement !== _this.element) || (evt.target === _this.element || Dropzone.elementInside(evt.target, _this.element.querySelector(".dz-message")))) {
                  _this.hiddenFileInput.click();
                }
                return true;
              }
            }
          });
        };
      })(this));
      this.enable();
      return this.options.init.call(this);
    };

    Dropzone.prototype.destroy = function() {
      var ref;
      this.disable();
      this.removeAllFiles(true);
      if ((ref = this.hiddenFileInput) != null ? ref.parentNode : void 0) {
        this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput);
        this.hiddenFileInput = null;
      }
      delete this.element.dropzone;
      return Dropzone.instances.splice(Dropzone.instances.indexOf(this), 1);
    };

    Dropzone.prototype.updateTotalUploadProgress = function() {
      var activeFiles, file, j, len, ref, totalBytes, totalBytesSent, totalUploadProgress;
      totalBytesSent = 0;
      totalBytes = 0;
      activeFiles = this.getActiveFiles();
      if (activeFiles.length) {
        ref = this.getActiveFiles();
        for (j = 0, len = ref.length; j < len; j++) {
          file = ref[j];
          totalBytesSent += file.upload.bytesSent;
          totalBytes += file.upload.total;
        }
        totalUploadProgress = 100 * totalBytesSent / totalBytes;
      } else {
        totalUploadProgress = 100;
      }
      return this.emit("totaluploadprogress", totalUploadProgress, totalBytes, totalBytesSent);
    };

    Dropzone.prototype._getParamName = function(n) {
      if (typeof this.options.paramName === "function") {
        return this.options.paramName(n);
      } else {
        return "" + this.options.paramName + (this.options.uploadMultiple ? "[" + n + "]" : "");
      }
    };

    Dropzone.prototype._renameFilename = function(name, file) {
      if (typeof this.options.renameFilename !== "function") {
        return name;
      }
      return this.options.renameFilename(name, file);
    };

    Dropzone.prototype.getFallbackForm = function() {
      var existingFallback, fields, fieldsString, form;
      if (existingFallback = this.getExistingFallback()) {
        return existingFallback;
      }
      fieldsString = "<div class=\"dz-fallback\">";
      if (this.options.dictFallbackText) {
        fieldsString += "<p>" + this.options.dictFallbackText + "</p>";
      }
      fieldsString += "<input type=\"file\" name=\"" + (this._getParamName(0)) + "\" " + (this.options.uploadMultiple ? 'multiple="multiple"' : void 0) + " /><input type=\"submit\" value=\"Upload!\"></div>";
      fields = Dropzone.createElement(fieldsString);
      if (this.element.tagName !== "FORM") {
        form = Dropzone.createElement("<form action=\"" + this.options.url + "\" enctype=\"multipart/form-data\" method=\"" + this.options.method + "\"></form>");
        form.appendChild(fields);
      } else {
        this.element.setAttribute("enctype", "multipart/form-data");
        this.element.setAttribute("method", this.options.method);
      }
      return form != null ? form : fields;
    };

    Dropzone.prototype.getExistingFallback = function() {
      var fallback, getFallback, j, len, ref, tagName;
      getFallback = function(elements) {
        var el, j, len;
        for (j = 0, len = elements.length; j < len; j++) {
          el = elements[j];
          if (/(^| )fallback($| )/.test(el.className)) {
            return el;
          }
        }
      };
      ref = ["div", "form"];
      for (j = 0, len = ref.length; j < len; j++) {
        tagName = ref[j];
        if (fallback = getFallback(this.element.getElementsByTagName(tagName))) {
          return fallback;
        }
      }
    };

    Dropzone.prototype.setupEventListeners = function() {
      var elementListeners, event, j, len, listener, ref, results;
      ref = this.listeners;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        elementListeners = ref[j];
        results.push((function() {
          var ref1, results1;
          ref1 = elementListeners.events;
          results1 = [];
          for (event in ref1) {
            listener = ref1[event];
            results1.push(elementListeners.element.addEventListener(event, listener, false));
          }
          return results1;
        })());
      }
      return results;
    };

    Dropzone.prototype.removeEventListeners = function() {
      var elementListeners, event, j, len, listener, ref, results;
      ref = this.listeners;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        elementListeners = ref[j];
        results.push((function() {
          var ref1, results1;
          ref1 = elementListeners.events;
          results1 = [];
          for (event in ref1) {
            listener = ref1[event];
            results1.push(elementListeners.element.removeEventListener(event, listener, false));
          }
          return results1;
        })());
      }
      return results;
    };

    Dropzone.prototype.disable = function() {
      var file, j, len, ref, results;
      this.clickableElements.forEach(function(element) {
        return element.classList.remove("dz-clickable");
      });
      this.removeEventListeners();
      ref = this.files;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        file = ref[j];
        results.push(this.cancelUpload(file));
      }
      return results;
    };

    Dropzone.prototype.enable = function() {
      this.clickableElements.forEach(function(element) {
        return element.classList.add("dz-clickable");
      });
      return this.setupEventListeners();
    };

    Dropzone.prototype.filesize = function(size) {
      var cutoff, i, j, len, selectedSize, selectedUnit, unit, units;
      selectedSize = 0;
      selectedUnit = "b";
      if (size > 0) {
        units = ['TB', 'GB', 'MB', 'KB', 'b'];
        for (i = j = 0, len = units.length; j < len; i = ++j) {
          unit = units[i];
          cutoff = Math.pow(this.options.filesizeBase, 4 - i) / 10;
          if (size >= cutoff) {
            selectedSize = size / Math.pow(this.options.filesizeBase, 4 - i);
            selectedUnit = unit;
            break;
          }
        }
        selectedSize = Math.round(10 * selectedSize) / 10;
      }
      return "<strong>" + selectedSize + "</strong> " + selectedUnit;
    };

    Dropzone.prototype._updateMaxFilesReachedClass = function() {
      if ((this.options.maxFiles != null) && this.getAcceptedFiles().length >= this.options.maxFiles) {
        if (this.getAcceptedFiles().length === this.options.maxFiles) {
          this.emit('maxfilesreached', this.files);
        }
        return this.element.classList.add("dz-max-files-reached");
      } else {
        return this.element.classList.remove("dz-max-files-reached");
      }
    };

    Dropzone.prototype.drop = function(e) {
      var files, items;
      if (!e.dataTransfer) {
        return;
      }
      this.emit("drop", e);
      files = e.dataTransfer.files;
      this.emit("addedfiles", files);
      if (files.length) {
        items = e.dataTransfer.items;
        if (items && items.length && (items[0].webkitGetAsEntry != null)) {
          this._addFilesFromItems(items);
        } else {
          this.handleFiles(files);
        }
      }
    };

    Dropzone.prototype.paste = function(e) {
      var items, ref;
      if ((e != null ? (ref = e.clipboardData) != null ? ref.items : void 0 : void 0) == null) {
        return;
      }
      this.emit("paste", e);
      items = e.clipboardData.items;
      if (items.length) {
        return this._addFilesFromItems(items);
      }
    };

    Dropzone.prototype.handleFiles = function(files) {
      var file, j, len, results;
      results = [];
      for (j = 0, len = files.length; j < len; j++) {
        file = files[j];
        results.push(this.addFile(file));
      }
      return results;
    };

    Dropzone.prototype._addFilesFromItems = function(items) {
      var entry, item, j, len, results;
      results = [];
      for (j = 0, len = items.length; j < len; j++) {
        item = items[j];
        if ((item.webkitGetAsEntry != null) && (entry = item.webkitGetAsEntry())) {
          if (entry.isFile) {
            results.push(this.addFile(item.getAsFile()));
          } else if (entry.isDirectory) {
            results.push(this._addFilesFromDirectory(entry, entry.name));
          } else {
            results.push(void 0);
          }
        } else if (item.getAsFile != null) {
          if ((item.kind == null) || item.kind === "file") {
            results.push(this.addFile(item.getAsFile()));
          } else {
            results.push(void 0);
          }
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    Dropzone.prototype._addFilesFromDirectory = function(directory, path) {
      var dirReader, errorHandler, readEntries;
      dirReader = directory.createReader();
      errorHandler = function(error) {
        return typeof console !== "undefined" && console !== null ? typeof console.log === "function" ? console.log(error) : void 0 : void 0;
      };
      readEntries = (function(_this) {
        return function() {
          return dirReader.readEntries(function(entries) {
            var entry, j, len;
            if (entries.length > 0) {
              for (j = 0, len = entries.length; j < len; j++) {
                entry = entries[j];
                if (entry.isFile) {
                  entry.file(function(file) {
                    if (_this.options.ignoreHiddenFiles && file.name.substring(0, 1) === '.') {
                      return;
                    }
                    file.fullPath = path + "/" + file.name;
                    return _this.addFile(file);
                  });
                } else if (entry.isDirectory) {
                  _this._addFilesFromDirectory(entry, path + "/" + entry.name);
                }
              }
              readEntries();
            }
            return null;
          }, errorHandler);
        };
      })(this);
      return readEntries();
    };

    Dropzone.prototype.accept = function(file, done) {
      if (file.size > this.options.maxFilesize * 1024 * 1024) {
        return done(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(file.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize));
      } else if (!Dropzone.isValidFile(file, this.options.acceptedFiles)) {
        return done(this.options.dictInvalidFileType);
      } else if ((this.options.maxFiles != null) && this.getAcceptedFiles().length >= this.options.maxFiles) {
        done(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles));
        return this.emit("maxfilesexceeded", file);
      } else {
        return this.options.accept.call(this, file, done);
      }
    };

    Dropzone.prototype.addFile = function(file) {
      file.upload = {
        progress: 0,
        total: file.size,
        bytesSent: 0
      };
      this.files.push(file);
      file.status = Dropzone.ADDED;
      this.emit("addedfile", file);
      this._enqueueThumbnail(file);
      return this.accept(file, (function(_this) {
        return function(error) {
          if (error) {
            file.accepted = false;
            _this._errorProcessing([file], error);
          } else {
            file.accepted = true;
            if (_this.options.autoQueue) {
              _this.enqueueFile(file);
            }
          }
          return _this._updateMaxFilesReachedClass();
        };
      })(this));
    };

    Dropzone.prototype.enqueueFiles = function(files) {
      var file, j, len;
      for (j = 0, len = files.length; j < len; j++) {
        file = files[j];
        this.enqueueFile(file);
      }
      return null;
    };

    Dropzone.prototype.enqueueFile = function(file) {
      if (file.status === Dropzone.ADDED && file.accepted === true) {
        file.status = Dropzone.QUEUED;
        if (this.options.autoProcessQueue) {
          return setTimeout(((function(_this) {
            return function() {
              return _this.processQueue();
            };
          })(this)), 0);
        }
      } else {
        throw new Error("This file can't be queued because it has already been processed or was rejected.");
      }
    };

    Dropzone.prototype._thumbnailQueue = [];

    Dropzone.prototype._processingThumbnail = false;

    Dropzone.prototype._enqueueThumbnail = function(file) {
      if (this.options.createImageThumbnails && file.type.match(/image.*/) && file.size <= this.options.maxThumbnailFilesize * 1024 * 1024) {
        this._thumbnailQueue.push(file);
        return setTimeout(((function(_this) {
          return function() {
            return _this._processThumbnailQueue();
          };
        })(this)), 0);
      }
    };

    Dropzone.prototype._processThumbnailQueue = function() {
      var file;
      if (this._processingThumbnail || this._thumbnailQueue.length === 0) {
        return;
      }
      this._processingThumbnail = true;
      file = this._thumbnailQueue.shift();
      return this.createThumbnail(file, this.options.thumbnailWidth, this.options.thumbnailHeight, this.options.thumbnailMethod, true, (function(_this) {
        return function(dataUrl) {
          _this.emit("thumbnail", file, dataUrl);
          _this._processingThumbnail = false;
          return _this._processThumbnailQueue();
        };
      })(this));
    };

    Dropzone.prototype.removeFile = function(file) {
      if (file.status === Dropzone.UPLOADING) {
        this.cancelUpload(file);
      }
      this.files = without(this.files, file);
      this.emit("removedfile", file);
      if (this.files.length === 0) {
        return this.emit("reset");
      }
    };

    Dropzone.prototype.removeAllFiles = function(cancelIfNecessary) {
      var file, j, len, ref;
      if (cancelIfNecessary == null) {
        cancelIfNecessary = false;
      }
      ref = this.files.slice();
      for (j = 0, len = ref.length; j < len; j++) {
        file = ref[j];
        if (file.status !== Dropzone.UPLOADING || cancelIfNecessary) {
          this.removeFile(file);
        }
      }
      return null;
    };

    Dropzone.prototype.resizeImage = function(file, width, height, resizeMethod, callback) {
      return this.createThumbnail(file, width, height, resizeMethod, false, (function(_this) {
        return function(dataUrl, canvas) {
          var resizeMimeType, resizedDataURL;
          if (canvas === null) {
            return callback(file);
          } else {
            resizeMimeType = _this.options.resizeMimeType;
            if (resizeMimeType == null) {
              resizeMimeType = file.type;
            }
            resizedDataURL = canvas.toDataURL(resizeMimeType, _this.options.resizeQuality);
            if (resizeMimeType === 'image/jpeg' || resizeMimeType === 'image/jpg') {
              resizedDataURL = ExifRestore.restore(file.dataURL, resizedDataURL);
            }
            return callback(Dropzone.dataURItoBlob(resizedDataURL));
          }
        };
      })(this));
    };

    Dropzone.prototype.createThumbnail = function(file, width, height, resizeMethod, fixOrientation, callback) {
      var fileReader;
      fileReader = new FileReader;
      fileReader.onload = (function(_this) {
        return function() {
          file.dataURL = fileReader.result;
          if (file.type === "image/svg+xml") {
            if (callback != null) {
              callback(fileReader.result);
            }
            return;
          }
          return _this.createThumbnailFromUrl(file, width, height, resizeMethod, fixOrientation, callback);
        };
      })(this);
      return fileReader.readAsDataURL(file);
    };

    Dropzone.prototype.createThumbnailFromUrl = function(file, width, height, resizeMethod, fixOrientation, callback, crossOrigin) {
      var img;
      img = document.createElement("img");
      if (crossOrigin) {
        img.crossOrigin = crossOrigin;
      }
      img.onload = (function(_this) {
        return function() {
          var loadExif;
          loadExif = function(callback) {
            return callback(1);
          };
          if ((typeof EXIF !== "undefined" && EXIF !== null) && fixOrientation) {
            loadExif = function(callback) {
              return EXIF.getData(img, function() {
                return callback(EXIF.getTag(this, 'Orientation'));
              });
            };
          }
          return loadExif(function(orientation) {
            var canvas, ctx, ref, ref1, ref2, ref3, resizeInfo, thumbnail;
            file.width = img.width;
            file.height = img.height;
            resizeInfo = _this.options.resize.call(_this, file, width, height, resizeMethod);
            canvas = document.createElement("canvas");
            ctx = canvas.getContext("2d");
            canvas.width = resizeInfo.trgWidth;
            canvas.height = resizeInfo.trgHeight;
            if (orientation > 4) {
              canvas.width = resizeInfo.trgHeight;
              canvas.height = resizeInfo.trgWidth;
            }
            switch (orientation) {
              case 2:
                ctx.translate(canvas.width, 0);
                ctx.scale(-1, 1);
                break;
              case 3:
                ctx.translate(canvas.width, canvas.height);
                ctx.rotate(Math.PI);
                break;
              case 4:
                ctx.translate(0, canvas.height);
                ctx.scale(1, -1);
                break;
              case 5:
                ctx.rotate(0.5 * Math.PI);
                ctx.scale(1, -1);
                break;
              case 6:
                ctx.rotate(0.5 * Math.PI);
                ctx.translate(0, -canvas.height);
                break;
              case 7:
                ctx.rotate(0.5 * Math.PI);
                ctx.translate(canvas.width, -canvas.height);
                ctx.scale(-1, 1);
                break;
              case 8:
                ctx.rotate(-0.5 * Math.PI);
                ctx.translate(-canvas.width, 0);
            }
            drawImageIOSFix(ctx, img, (ref = resizeInfo.srcX) != null ? ref : 0, (ref1 = resizeInfo.srcY) != null ? ref1 : 0, resizeInfo.srcWidth, resizeInfo.srcHeight, (ref2 = resizeInfo.trgX) != null ? ref2 : 0, (ref3 = resizeInfo.trgY) != null ? ref3 : 0, resizeInfo.trgWidth, resizeInfo.trgHeight);
            thumbnail = canvas.toDataURL("image/png");
            if (callback != null) {
              return callback(thumbnail, canvas);
            }
          });
        };
      })(this);
      if (callback != null) {
        img.onerror = callback;
      }
      return img.src = file.dataURL;
    };

    Dropzone.prototype.processQueue = function() {
      var i, parallelUploads, processingLength, queuedFiles;
      parallelUploads = this.options.parallelUploads;
      processingLength = this.getUploadingFiles().length;
      i = processingLength;
      if (processingLength >= parallelUploads) {
        return;
      }
      queuedFiles = this.getQueuedFiles();
      if (!(queuedFiles.length > 0)) {
        return;
      }
      if (this.options.uploadMultiple) {
        return this.processFiles(queuedFiles.slice(0, parallelUploads - processingLength));
      } else {
        while (i < parallelUploads) {
          if (!queuedFiles.length) {
            return;
          }
          this.processFile(queuedFiles.shift());
          i++;
        }
      }
    };

    Dropzone.prototype.processFile = function(file) {
      return this.processFiles([file]);
    };

    Dropzone.prototype.processFiles = function(files) {
      var file, j, len;
      for (j = 0, len = files.length; j < len; j++) {
        file = files[j];
        file.processing = true;
        file.status = Dropzone.UPLOADING;
        this.emit("processing", file);
      }
      if (this.options.uploadMultiple) {
        this.emit("processingmultiple", files);
      }
      return this.uploadFiles(files);
    };

    Dropzone.prototype._getFilesWithXhr = function(xhr) {
      var file, files;
      return files = (function() {
        var j, len, ref, results;
        ref = this.files;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          file = ref[j];
          if (file.xhr === xhr) {
            results.push(file);
          }
        }
        return results;
      }).call(this);
    };

    Dropzone.prototype.cancelUpload = function(file) {
      var groupedFile, groupedFiles, j, k, len, len1, ref;
      if (file.status === Dropzone.UPLOADING) {
        groupedFiles = this._getFilesWithXhr(file.xhr);
        for (j = 0, len = groupedFiles.length; j < len; j++) {
          groupedFile = groupedFiles[j];
          groupedFile.status = Dropzone.CANCELED;
        }
        file.xhr.abort();
        for (k = 0, len1 = groupedFiles.length; k < len1; k++) {
          groupedFile = groupedFiles[k];
          this.emit("canceled", groupedFile);
        }
        if (this.options.uploadMultiple) {
          this.emit("canceledmultiple", groupedFiles);
        }
      } else if ((ref = file.status) === Dropzone.ADDED || ref === Dropzone.QUEUED) {
        file.status = Dropzone.CANCELED;
        this.emit("canceled", file);
        if (this.options.uploadMultiple) {
          this.emit("canceledmultiple", [file]);
        }
      }
      if (this.options.autoProcessQueue) {
        return this.processQueue();
      }
    };

    resolveOption = function() {
      var args, option;
      option = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      if (typeof option === 'function') {
        return option.apply(this, args);
      }
      return option;
    };

    Dropzone.prototype.uploadFile = function(file) {
      return this.uploadFiles([file]);
    };

    Dropzone.prototype.uploadFiles = function(files) {
      var doneCounter, doneFunction, file, formData, handleError, headerName, headerValue, headers, i, input, inputName, inputType, j, k, key, l, len, len1, len2, len3, m, method, o, option, progressObj, ref, ref1, ref2, ref3, ref4, ref5, response, results, updateProgress, url, value, xhr;
      xhr = new XMLHttpRequest();
      for (j = 0, len = files.length; j < len; j++) {
        file = files[j];
        file.xhr = xhr;
      }
      method = resolveOption(this.options.method, files);
      url = resolveOption(this.options.url, files);
      xhr.open(method, url, true);
      xhr.timeout = resolveOption(this.options.timeout, files);
      xhr.withCredentials = !!this.options.withCredentials;
      response = null;
      handleError = (function(_this) {
        return function() {
          var k, len1, results;
          results = [];
          for (k = 0, len1 = files.length; k < len1; k++) {
            file = files[k];
            results.push(_this._errorProcessing(files, response || _this.options.dictResponseError.replace("{{statusCode}}", xhr.status), xhr));
          }
          return results;
        };
      })(this);
      updateProgress = (function(_this) {
        return function(e) {
          var allFilesFinished, k, l, len1, len2, len3, m, progress, results;
          if (e != null) {
            progress = 100 * e.loaded / e.total;
            for (k = 0, len1 = files.length; k < len1; k++) {
              file = files[k];
              file.upload = {
                progress: progress,
                total: e.total,
                bytesSent: e.loaded
              };
            }
          } else {
            allFilesFinished = true;
            progress = 100;
            for (l = 0, len2 = files.length; l < len2; l++) {
              file = files[l];
              if (!(file.upload.progress === 100 && file.upload.bytesSent === file.upload.total)) {
                allFilesFinished = false;
              }
              file.upload.progress = progress;
              file.upload.bytesSent = file.upload.total;
            }
            if (allFilesFinished) {
              return;
            }
          }
          results = [];
          for (m = 0, len3 = files.length; m < len3; m++) {
            file = files[m];
            results.push(_this.emit("uploadprogress", file, progress, file.upload.bytesSent));
          }
          return results;
        };
      })(this);
      xhr.onload = (function(_this) {
        return function(e) {
          var error1, ref;
          if (files[0].status === Dropzone.CANCELED) {
            return;
          }
          if (xhr.readyState !== 4) {
            return;
          }
          response = xhr.responseText;
          if (xhr.getResponseHeader("content-type") && ~xhr.getResponseHeader("content-type").indexOf("application/json")) {
            try {
              response = JSON.parse(response);
            } catch (error1) {
              e = error1;
              response = "Invalid JSON response from server.";
            }
          }
          updateProgress();
          if (!((200 <= (ref = xhr.status) && ref < 300))) {
            return handleError();
          } else {
            return _this._finished(files, response, e);
          }
        };
      })(this);
      xhr.onerror = (function(_this) {
        return function() {
          if (files[0].status === Dropzone.CANCELED) {
            return;
          }
          return handleError();
        };
      })(this);
      progressObj = (ref = xhr.upload) != null ? ref : xhr;
      progressObj.onprogress = updateProgress;
      headers = {
        "Accept": "application/json",
        "Cache-Control": "no-cache",
        "X-Requested-With": "XMLHttpRequest"
      };
      if (this.options.headers) {
        extend(headers, this.options.headers);
      }
      for (headerName in headers) {
        headerValue = headers[headerName];
        if (headerValue) {
          xhr.setRequestHeader(headerName, headerValue);
        }
      }
      formData = new FormData();
      if (this.options.params) {
        ref1 = this.options.params;
        for (key in ref1) {
          value = ref1[key];
          formData.append(key, value);
        }
      }
      for (k = 0, len1 = files.length; k < len1; k++) {
        file = files[k];
        this.emit("sending", file, xhr, formData);
      }
      if (this.options.uploadMultiple) {
        this.emit("sendingmultiple", files, xhr, formData);
      }
      if (this.element.tagName === "FORM") {
        ref2 = this.element.querySelectorAll("input, textarea, select, button");
        for (l = 0, len2 = ref2.length; l < len2; l++) {
          input = ref2[l];
          inputName = input.getAttribute("name");
          inputType = input.getAttribute("type");
          if (input.tagName === "SELECT" && input.hasAttribute("multiple")) {
            ref3 = input.options;
            for (m = 0, len3 = ref3.length; m < len3; m++) {
              option = ref3[m];
              if (option.selected) {
                formData.append(inputName, option.value);
              }
            }
          } else if (!inputType || ((ref4 = inputType.toLowerCase()) !== "checkbox" && ref4 !== "radio") || input.checked) {
            formData.append(inputName, input.value);
          }
        }
      }
      doneCounter = 0;
      results = [];
      for (i = o = 0, ref5 = files.length - 1; 0 <= ref5 ? o <= ref5 : o >= ref5; i = 0 <= ref5 ? ++o : --o) {
        doneFunction = (function(_this) {
          return function(file, paramName, fileName) {
            return function(transformedFile) {
              formData.append(paramName, transformedFile, fileName);
              if (++doneCounter === files.length) {
                return _this.submitRequest(xhr, formData, files);
              }
            };
          };
        })(this);
        results.push(this.options.transformFile.call(this, files[i], doneFunction(files[i], this._getParamName(i), this._renameFilename(file.name, file))));
      }
      return results;
    };

    Dropzone.prototype.submitRequest = function(xhr, formData, files) {
      return xhr.send(formData);
    };

    Dropzone.prototype._finished = function(files, responseText, e) {
      var file, j, len;
      for (j = 0, len = files.length; j < len; j++) {
        file = files[j];
        file.status = Dropzone.SUCCESS;
        this.emit("success", file, responseText, e);
        this.emit("complete", file);
      }
      if (this.options.uploadMultiple) {
        this.emit("successmultiple", files, responseText, e);
        this.emit("completemultiple", files);
      }
      if (this.options.autoProcessQueue) {
        return this.processQueue();
      }
    };

    Dropzone.prototype._errorProcessing = function(files, message, xhr) {
      var file, j, len;
      for (j = 0, len = files.length; j < len; j++) {
        file = files[j];
        file.status = Dropzone.ERROR;
        this.emit("error", file, message, xhr);
        this.emit("complete", file);
      }
      if (this.options.uploadMultiple) {
        this.emit("errormultiple", files, message, xhr);
        this.emit("completemultiple", files);
      }
      if (this.options.autoProcessQueue) {
        return this.processQueue();
      }
    };

    return Dropzone;

  })(Emitter);

  Dropzone.version = "5.0.0";

  Dropzone.options = {};

  Dropzone.optionsForElement = function(element) {
    if (element.getAttribute("id")) {
      return Dropzone.options[camelize(element.getAttribute("id"))];
    } else {
      return void 0;
    }
  };

  Dropzone.instances = [];

  Dropzone.forElement = function(element) {
    if (typeof element === "string") {
      element = document.querySelector(element);
    }
    if ((element != null ? element.dropzone : void 0) == null) {
      throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
    }
    return element.dropzone;
  };

  Dropzone.autoDiscover = true;

  Dropzone.discover = function() {
    var checkElements, dropzone, dropzones, j, len, results;
    if (document.querySelectorAll) {
      dropzones = document.querySelectorAll(".dropzone");
    } else {
      dropzones = [];
      checkElements = function(elements) {
        var el, j, len, results;
        results = [];
        for (j = 0, len = elements.length; j < len; j++) {
          el = elements[j];
          if (/(^| )dropzone($| )/.test(el.className)) {
            results.push(dropzones.push(el));
          } else {
            results.push(void 0);
          }
        }
        return results;
      };
      checkElements(document.getElementsByTagName("div"));
      checkElements(document.getElementsByTagName("form"));
    }
    results = [];
    for (j = 0, len = dropzones.length; j < len; j++) {
      dropzone = dropzones[j];
      if (Dropzone.optionsForElement(dropzone) !== false) {
        results.push(new Dropzone(dropzone));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  Dropzone.blacklistedBrowsers = [/opera.*Macintosh.*version\/12/i];

  Dropzone.isBrowserSupported = function() {
    var capableBrowser, j, len, ref, regex;
    capableBrowser = true;
    if (window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector) {
      if (!("classList" in document.createElement("a"))) {
        capableBrowser = false;
      } else {
        ref = Dropzone.blacklistedBrowsers;
        for (j = 0, len = ref.length; j < len; j++) {
          regex = ref[j];
          if (regex.test(navigator.userAgent)) {
            capableBrowser = false;
            continue;
          }
        }
      }
    } else {
      capableBrowser = false;
    }
    return capableBrowser;
  };

  Dropzone.dataURItoBlob = function(dataURI) {
    var ab, byteString, i, ia, j, mimeString, ref;
    byteString = atob(dataURI.split(',')[1]);
    mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    ab = new ArrayBuffer(byteString.length);
    ia = new Uint8Array(ab);
    for (i = j = 0, ref = byteString.length; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {
      type: mimeString
    });
  };

  without = function(list, rejectedItem) {
    var item, j, len, results;
    results = [];
    for (j = 0, len = list.length; j < len; j++) {
      item = list[j];
      if (item !== rejectedItem) {
        results.push(item);
      }
    }
    return results;
  };

  camelize = function(str) {
    return str.replace(/[\-_](\w)/g, function(match) {
      return match.charAt(1).toUpperCase();
    });
  };

  Dropzone.createElement = function(string) {
    var div;
    div = document.createElement("div");
    div.innerHTML = string;
    return div.childNodes[0];
  };

  Dropzone.elementInside = function(element, container) {
    if (element === container) {
      return true;
    }
    while (element = element.parentNode) {
      if (element === container) {
        return true;
      }
    }
    return false;
  };

  Dropzone.getElement = function(el, name) {
    var element;
    if (typeof el === "string") {
      element = document.querySelector(el);
    } else if (el.nodeType != null) {
      element = el;
    }
    if (element == null) {
      throw new Error("Invalid `" + name + "` option provided. Please provide a CSS selector or a plain HTML element.");
    }
    return element;
  };

  Dropzone.getElements = function(els, name) {
    var e, el, elements, error1, j, k, len, len1, ref;
    if (els instanceof Array) {
      elements = [];
      try {
        for (j = 0, len = els.length; j < len; j++) {
          el = els[j];
          elements.push(this.getElement(el, name));
        }
      } catch (error1) {
        e = error1;
        elements = null;
      }
    } else if (typeof els === "string") {
      elements = [];
      ref = document.querySelectorAll(els);
      for (k = 0, len1 = ref.length; k < len1; k++) {
        el = ref[k];
        elements.push(el);
      }
    } else if (els.nodeType != null) {
      elements = [els];
    }
    if (!((elements != null) && elements.length)) {
      throw new Error("Invalid `" + name + "` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");
    }
    return elements;
  };

  Dropzone.confirm = function(question, accepted, rejected) {
    if (window.confirm(question)) {
      return accepted();
    } else if (rejected != null) {
      return rejected();
    }
  };

  Dropzone.isValidFile = function(file, acceptedFiles) {
    var baseMimeType, j, len, mimeType, validType;
    if (!acceptedFiles) {
      return true;
    }
    acceptedFiles = acceptedFiles.split(",");
    mimeType = file.type;
    baseMimeType = mimeType.replace(/\/.*$/, "");
    for (j = 0, len = acceptedFiles.length; j < len; j++) {
      validType = acceptedFiles[j];
      validType = validType.trim();
      if (validType.charAt(0) === ".") {
        if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {
          return true;
        }
      } else if (/\/\*$/.test(validType)) {
        if (baseMimeType === validType.replace(/\/.*$/, "")) {
          return true;
        }
      } else {
        if (mimeType === validType) {
          return true;
        }
      }
    }
    return false;
  };

  if (typeof jQuery !== "undefined" && jQuery !== null) {
    jQuery.fn.dropzone = function(options) {
      return this.each(function() {
        return new Dropzone(this, options);
      });
    };
  }

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Dropzone;
  } else {
    window.Dropzone = Dropzone;
  }

  Dropzone.ADDED = "added";

  Dropzone.QUEUED = "queued";

  Dropzone.ACCEPTED = Dropzone.QUEUED;

  Dropzone.UPLOADING = "uploading";

  Dropzone.PROCESSING = Dropzone.UPLOADING;

  Dropzone.CANCELED = "canceled";

  Dropzone.ERROR = "error";

  Dropzone.SUCCESS = "success";


  /*

  Bugfix for iOS 6 and 7
  Source: http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
  based on the work of https://github.com/stomita/ios-imagefile-megapixel
   */

  detectVerticalSquash = function(img) {
    var alpha, canvas, ctx, data, ey, ih, iw, py, ratio, sy;
    iw = img.naturalWidth;
    ih = img.naturalHeight;
    canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = ih;
    ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    data = ctx.getImageData(1, 0, 1, ih).data;
    sy = 0;
    ey = ih;
    py = ih;
    while (py > sy) {
      alpha = data[(py - 1) * 4 + 3];
      if (alpha === 0) {
        ey = py;
      } else {
        sy = py;
      }
      py = (ey + sy) >> 1;
    }
    ratio = py / ih;
    if (ratio === 0) {
      return 1;
    } else {
      return ratio;
    }
  };

  drawImageIOSFix = function(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
    var vertSquashRatio;
    vertSquashRatio = detectVerticalSquash(img);
    return ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
  };

  ExifRestore = (function() {
    function ExifRestore() {}

    ExifRestore.KEY_STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    ExifRestore.encode64 = function(input) {
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4, i, output;
      output = '';
      chr1 = void 0;
      chr2 = void 0;
      chr3 = '';
      enc1 = void 0;
      enc2 = void 0;
      enc3 = void 0;
      enc4 = '';
      i = 0;
      while (true) {
        chr1 = input[i++];
        chr2 = input[i++];
        chr3 = input[i++];
        enc1 = chr1 >> 2;
        enc2 = (chr1 & 3) << 4 | chr2 >> 4;
        enc3 = (chr2 & 15) << 2 | chr3 >> 6;
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }
        output = output + this.KEY_STR.charAt(enc1) + this.KEY_STR.charAt(enc2) + this.KEY_STR.charAt(enc3) + this.KEY_STR.charAt(enc4);
        chr1 = chr2 = chr3 = '';
        enc1 = enc2 = enc3 = enc4 = '';
        if (!(i < input.length)) {
          break;
        }
      }
      return output;
    };

    ExifRestore.restore = function(origFileBase64, resizedFileBase64) {
      var image, rawImage, segments;
      if (!origFileBase64.match('data:image/jpeg;base64,')) {
        return resizedFileBase64;
      }
      rawImage = this.decode64(origFileBase64.replace('data:image/jpeg;base64,', ''));
      segments = this.slice2Segments(rawImage);
      image = this.exifManipulation(resizedFileBase64, segments);
      return 'data:image/jpeg;base64,' + this.encode64(image);
    };

    ExifRestore.exifManipulation = function(resizedFileBase64, segments) {
      var aBuffer, exifArray, newImageArray;
      exifArray = this.getExifArray(segments);
      newImageArray = this.insertExif(resizedFileBase64, exifArray);
      aBuffer = new Uint8Array(newImageArray);
      return aBuffer;
    };

    ExifRestore.getExifArray = function(segments) {
      var seg, x;
      seg = void 0;
      x = 0;
      while (x < segments.length) {
        seg = segments[x];
        if (seg[0] === 255 & seg[1] === 225) {
          return seg;
        }
        x++;
      }
      return [];
    };

    ExifRestore.insertExif = function(resizedFileBase64, exifArray) {
      var array, ato, buf, imageData, mae, separatePoint;
      imageData = resizedFileBase64.replace('data:image/jpeg;base64,', '');
      buf = this.decode64(imageData);
      separatePoint = buf.indexOf(255, 3);
      mae = buf.slice(0, separatePoint);
      ato = buf.slice(separatePoint);
      array = mae;
      array = array.concat(exifArray);
      array = array.concat(ato);
      return array;
    };

    ExifRestore.slice2Segments = function(rawImageArray) {
      var endPoint, head, length, seg, segments;
      head = 0;
      segments = [];
      while (true) {
        if (rawImageArray[head] === 255 & rawImageArray[head + 1] === 218) {
          break;
        }
        if (rawImageArray[head] === 255 & rawImageArray[head + 1] === 216) {
          head += 2;
        } else {
          length = rawImageArray[head + 2] * 256 + rawImageArray[head + 3];
          endPoint = head + length + 2;
          seg = rawImageArray.slice(head, endPoint);
          segments.push(seg);
          head = endPoint;
        }
        if (head > rawImageArray.length) {
          break;
        }
      }
      return segments;
    };

    ExifRestore.decode64 = function(input) {
      var base64test, buf, chr1, chr2, chr3, enc1, enc2, enc3, enc4, i, output;
      output = '';
      chr1 = void 0;
      chr2 = void 0;
      chr3 = '';
      enc1 = void 0;
      enc2 = void 0;
      enc3 = void 0;
      enc4 = '';
      i = 0;
      buf = [];
      base64test = /[^A-Za-z0-9\+\/\=]/g;
      if (base64test.exec(input)) {
        console.warning('There were invalid base64 characters in the input text.\n' + 'Valid base64 characters are A-Z, a-z, 0-9, \'+\', \'/\',and \'=\'\n' + 'Expect errors in decoding.');
      }
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
      while (true) {
        enc1 = this.KEY_STR.indexOf(input.charAt(i++));
        enc2 = this.KEY_STR.indexOf(input.charAt(i++));
        enc3 = this.KEY_STR.indexOf(input.charAt(i++));
        enc4 = this.KEY_STR.indexOf(input.charAt(i++));
        chr1 = enc1 << 2 | enc2 >> 4;
        chr2 = (enc2 & 15) << 4 | enc3 >> 2;
        chr3 = (enc3 & 3) << 6 | enc4;
        buf.push(chr1);
        if (enc3 !== 64) {
          buf.push(chr2);
        }
        if (enc4 !== 64) {
          buf.push(chr3);
        }
        chr1 = chr2 = chr3 = '';
        enc1 = enc2 = enc3 = enc4 = '';
        if (!(i < input.length)) {
          break;
        }
      }
      return buf;
    };

    return ExifRestore;

  })();


  /*
   * contentloaded.js
   *
   * Author: Diego Perini (diego.perini at gmail.com)
   * Summary: cross-browser wrapper for DOMContentLoaded
   * Updated: 20101020
   * License: MIT
   * Version: 1.2
   *
   * URL:
   * http://javascript.nwbox.com/ContentLoaded/
   * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
   */

  contentLoaded = function(win, fn) {
    var add, doc, done, init, poll, pre, rem, root, top;
    done = false;
    top = true;
    doc = win.document;
    root = doc.documentElement;
    add = (doc.addEventListener ? "addEventListener" : "attachEvent");
    rem = (doc.addEventListener ? "removeEventListener" : "detachEvent");
    pre = (doc.addEventListener ? "" : "on");
    init = function(e) {
      if (e.type === "readystatechange" && doc.readyState !== "complete") {
        return;
      }
      (e.type === "load" ? win : doc)[rem](pre + e.type, init, false);
      if (!done && (done = true)) {
        return fn.call(win, e.type || e);
      }
    };
    poll = function() {
      var e, error1;
      try {
        root.doScroll("left");
      } catch (error1) {
        e = error1;
        setTimeout(poll, 50);
        return;
      }
      return init("poll");
    };
    if (doc.readyState !== "complete") {
      if (doc.createEventObject && root.doScroll) {
        try {
          top = !win.frameElement;
        } catch (undefined) {}
        if (top) {
          poll();
        }
      }
      doc[add](pre + "DOMContentLoaded", init, false);
      doc[add](pre + "readystatechange", init, false);
      return win[add](pre + "load", init, false);
    }
  };

  Dropzone._autoDiscoverFunction = function() {
    if (Dropzone.autoDiscover) {
      return Dropzone.discover();
    }
  };

  contentLoaded(window, Dropzone._autoDiscoverFunction);

}).call(this);

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// https://github.com/sroucheray/event-class
var multiChannelSep = /(?:,|\s)+/g;
var channelSep = /:+/g;
var channelsSymbol = Symbol('channels');

var EventClass = function () {
    function EventClass() {
        _classCallCheck(this, EventClass);

        this[channelsSymbol] = {};
    }

    _createClass(EventClass, [{
        key: '_getChannels',
        value: function _getChannels(channelString) {
            return channelString.trim().split(multiChannelSep);
        }
    }, {
        key: '_getNameSpaces',
        value: function _getNameSpaces(channel) {
            var namespaces = [];
            var splittedChannels = channel.trim().split(channelSep);

            for (var i = splittedChannels.length; i >= 1; i--) {
                namespaces.push(splittedChannels.slice(0, i).join(':'));
            }

            return namespaces;
        }
    }, {
        key: 'trigger',
        value: function trigger(event) {
            var channels = this._getChannels(event);

            for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                data[_key - 1] = arguments[_key];
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = channels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var channel = _step.value;

                    var namespaces = this._getNameSpaces(channel);
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = namespaces[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var namespace = _step2.value;

                            if (!this[channelsSymbol][namespace]) {
                                continue;
                            }

                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                for (var _iterator3 = this[channelsSymbol][namespace][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var callback = _step3.value;

                                    callback.apply(this, data);
                                }
                            } catch (err) {
                                _didIteratorError3 = true;
                                _iteratorError3 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                        _iterator3.return();
                                    }
                                } finally {
                                    if (_didIteratorError3) {
                                        throw _iteratorError3;
                                    }
                                }
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'on',
        value: function on(event, callback) {
            var channels = this._getChannels(event);

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = channels[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var channel = _step4.value;

                    if (!this[channelsSymbol][channel]) {
                        this[channelsSymbol][channel] = [];
                    }

                    this[channelsSymbol][channel].push(callback);
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }
    }, {
        key: 'off',
        value: function off(event, callback) {
            var channels = this._getChannels(event);

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = channels[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var channel = _step5.value;

                    if (!this[channelsSymbol][channel]) {
                        return;
                    }

                    var index = this[channelsSymbol][channel].indexOf(callback);

                    if (index > -1) {
                        this[channelsSymbol][channel].splice(index, 1);
                    }
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }
        }
    }, {
        key: 'once',
        value: function once(event, callback) {
            function offCallback() {
                this.off(event, callback);
                this.off(event, offCallback);
            }

            this.on(event, callback);
            this.on(event, offCallback);
        }
    }]);

    return EventClass;
}();

/**
 * Book class that keeps track of the comic data.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */


var Book = function (_EventClass) {
    _inherits(Book, _EventClass);

    /**
     * Takes in a configuration object for the
     * application settings.
     *
     * @constructs Book
     * @param {PanelzCreator} app    PanelzCreator instance
     * @param {Object}        config Configuration options
     */
    function Book(app, config) {
        _classCallCheck(this, Book);

        /**
         * PanelzCreator application instance
         * @type {PanelzCreator}
         */
        var _this = _possibleConstructorReturn(this, (Book.__proto__ || Object.getPrototypeOf(Book)).call(this));

        _this.app = app;
        /**
         * Configuration options
         * @type {Object}
         */
        _this.config = config;
        /**
         * Comic identifier
         * @type {String}
         */
        _this.id = config.id;
        /**
         * Title of the comic
         * @type {String}
         */
        _this.title = config.title;
        /**
         * Holds all the data for each page
         * @type {Array}
         */
        _this.pages = config.pages || [];
        /**
         * Holds the class instance for the
         * current page active in the workspace
         * @type {Page}
         */
        _this.currentPage = false;

        _this.makeSortable();
        _this.setEventListeners();
        return _this;
    }

    /**
     * When the title property is updated, update
     * the viewport element.
     *
     * @param  {String} title Title of comic
     */


    _createClass(Book, [{
        key: 'makeSortable',


        /**
         * Makes the page section sortable. Uses the jQuery UI
         * sortable method to allow drag and drop sorting of pages.
         */
        value: function makeSortable() {
            $(".workspace-navigation__list").sortable({
                placeholder: "workspace-navigation__list-item ui-state-highlight",
                start: function start(e, ui) {
                    ui.placeholder.height(ui.item.height());
                },
                update: this.onPageSort.bind(this),
                axis: 'y'
            });
        }

        /**
         * Sets event listeners. When editing a page, set the current
         * page to that item.
         */

    }, {
        key: 'setEventListeners',
        value: function setEventListeners() {
            this.on('editingPage', this.setCurrentPage.bind(this));
        }

        /**
         * Initializes a page object configuration into a class
         * instance and adds it to the internal pages array.
         *
         * @param {Object} pageConfig Page configuration options
         * @fires Book#pageAdded
         */

    }, {
        key: 'add',
        value: function add(pageConfig) {
            // In some cases, the item may already be a Page instance,
            // if this is the case, no need to initialize it again, simply
            // add it to the pages array.
            if (pageConfig instanceof Page) {
                return this.pages.push(pageConfig);
            }
            var page = new Page(this.app, this, pageConfig);
            this.pages.push(page);

            // Create the item for the pages list in the UI
            var $element = $('<li class="workspace-navigation__list-item"><span class="workspace-navigation__delete-page"><i class="fa fa-times-circle"></i></span><img src="' + page.url + '" /></li>').data('page', page);

            $('.workspace-navigation__list').append($element);
            /**
             * Page added event
             *
             * @event Book#pageAdded
             * @type {Object}
             * @property {Page} Page instance
             */
            this.trigger('pageAdded', page);
        }

        /**
         * Sets the current page active in the workspace
         *
         * @param {Page} page Page instance
         */

    }, {
        key: 'setCurrentPage',
        value: function setCurrentPage(page) {
            this.currentPage = page;
        }

        /**
         * User has sorted the page order in the interface. Use the
         * data method to pull the class instance from the element
         * and reorder the pages array property.
         */

    }, {
        key: 'onPageSort',
        value: function onPageSort() {
            this.pages = $('.workspace-navigation__list-item').map(function (i, el) {
                return $(el).data('page');
            }).get();
        }

        /**
         * Turn the class instance into an array. Loops through all of
         * pages and turns them into an array as well.
         *
         * @return {Object}
         */

    }, {
        key: 'toArray',
        value: function toArray() {
            var pages = this.pages.map(function (page) {
                return page.toArray();
            });
            return {
                id: this.id,
                title: $('.viewport__title-input').val(),
                pages: pages
            };
        }
    }, {
        key: 'title',
        set: function set(title) {
            $('.viewport__title-input').val(title);
            this._title = title;
        }

        /**
         * Gets the title internal
         *
         * @return {String}
         */
        ,
        get: function get() {
            return this._title;
        }

        /**
         * When setting pages, loop through each and call
         * the add method to initialize each page as a
         * class instance.
         *
         * @param {Array} pages Pages for the comic
         */

    }, {
        key: 'pages',
        set: function set(pages) {
            this._pages = [];
            pages.forEach(this.add.bind(this));
        }

        /**
         * Gets pages internal
         *
         * @return {Array}
         */
        ,
        get: function get() {
            return this._pages;
        }
    }]);

    return Book;
}(EventClass);

/**
 * Represents a Page within a comic. Has an array that
 * keeps track of all of the panels on the page. Keeps
 * track of what labels have been used for panels to
 * try and produce unique panels names per page.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */


var Page = function (_EventClass2) {
    _inherits(Page, _EventClass2);

    /**
     * Sets up a page instance and intializes event listeners.
     *
     * @param  {PanelzCreator} app    Application instance
     * @param  {Book}          Book   Book this page belongs to
     * @param  {Object}        config Configuration options
     */
    function Page(app, Book, config) {
        _classCallCheck(this, Page);

        /**
         * Application instance
         * @type {PanelzCreator}
         */
        var _this2 = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this));

        _this2.app = app;
        /**
         * Comic this page belongs to
         * @type {Book}
         */
        _this2.book = Book;
        /**
         * URL of the image that is this page
         * @type {String}
         */
        _this2.url = config.url;
        /**
         * Size of the page image in bytes
         * @type {Number}
         */
        _this2.size = config.size;
        /**
         * Width of the page image
         * @type {Number}
         */
        _this2.width = config.width;
        /**
         * Height of the page image
         * @type {Number}
         */
        _this2.height = config.height;
        /**
         * All of the available labels.
         * Each character is broken off as a new label.
         * @type {String}
         */
        _this2.labels = "abcdefghijklmnopqrstuvwxyz";
        /**
         * Holds the active labels that can be used.
         * @type {Array}
         */
        _this2.remainingLabels = [];
        /**
         * Number of times the labels have been used up
         * @type {Number}
         */
        _this2.labelRound = 0;
        /**
         * Array of panel instances.
         * @type {Array}
         */
        _this2.panels = config.panels || [];
        /**
         * Holds the image element reference.
         * @type {Object}
         */
        _this2.$element = false;

        _this2.setEventListeners();
        return _this2;
    }

    /**
     * When setting the panels array, loop through
     * all of the panes and attempt to convert them
     * to a Panel class instance. If it's already a
     * panel, no need to create a new one.
     *
     * @param  {Array} panels Array of panel configuration objects or instances
     */


    _createClass(Page, [{
        key: 'getNextLabel',


        /**
         * Gets the next available label. Splits the labels array
         * and pops it off the front. If the options have all been
         * used up, it begins doubling up on the label (AA, BB);
         * @return {String}
         */
        value: function getNextLabel() {
            // No labels left, up the label round and recreate
            // the remaining labels array with a repeated string
            // of each label option (A -> AA -> AAA)
            if (!this.remainingLabels.length) {
                this.labelRound += 1;
                this.remainingLabels = this.labels.toUpperCase().split("").map(function (val) {
                    return val.repeat(this.labelRound);
                }.bind(this));
            }

            return 'Panel ' + this.remainingLabels.shift();
        }

        /**
         * Sets event listeners for editing this page, adding and removing
         * panel objects from the workspace.
         */

    }, {
        key: 'setEventListeners',
        value: function setEventListeners() {
            this.on('edit', this.onEdit.bind(this));
            this.on('panelObjectAdded', this.onPanelObjectAdded.bind(this));
            this.on('panelObjectRemoved', this.onPanelObjectRemoved.bind(this));
        }

        /**
         * When the user wants to edit this page, set the element
         * property and tell the book the page is ready to be edited.
         *
         * @param {Object} pageObject FabricJS canvas object
         * @fires Book#editingPage
         */

    }, {
        key: 'onEdit',
        value: function onEdit(pageObject) {
            this.$element = pageObject;
            /**
             * Editing page event
             *
             * @event Book#editingPage
             * @type {Object}
             * @property {Page} Page being edited
             */
            this.book.trigger('editingPage', this);
        }

        /**
         * A new canvas rectangle representing a panel has been
         * added to the canvas. If this is a brand new panel,
         * add it to the panels array, otherwise it's already
         * be added to the canvas before (we may be loading
         * a page with panels already created).
         *
         * @param {Object} panelObject FabricJS panel object
         * @param {Panel}  panel       Panel instance
         * @fires Book#panelSet
         */

    }, {
        key: 'onPanelObjectAdded',
        value: function onPanelObjectAdded(panelObject, panel) {
            if (!panel) {
                var panel = new Panel(this.app, this, {});
                this.panels.push(panel);
            }
            panel.$element = panelObject;
            /**
             * Panel added event
             *
             * @event Book#panelAdded
             * @type {Object}
             * @property {Page} Panel that was added
             */
            this.book.trigger('panelSet', panel);
        }

        /**
         * A canvas panel object has been removed from the
         * canvas. Unlike the add event, this means it's
         * gone for good and we want to remove it from the
         * panels array that keeps track of all the panels.
         *
         * @param {Panel} panel Panel being removed
         * @fires Book#panelRemoved
         */

    }, {
        key: 'onPanelObjectRemoved',
        value: function onPanelObjectRemoved(panel) {
            var index = this.panels.indexOf(panel);
            this.panels.splice(index, 1);
            this.book.trigger('panelRemoved', panel);
        }

        /**
         * Gets the width of the page image element
         *
         * @return {Number}
         */

    }, {
        key: 'getWidth',
        value: function getWidth() {
            return this.width;
        }

        /**
         * Gets the height of the page image element
         * @return {Number}
         */

    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this.height;
        }

        /**
         * Converts the class data to an array. Loops through
         * all of the panels and turns them into an array as well.
         *
         * @return {Object}
         */

    }, {
        key: 'toArray',
        value: function toArray() {
            var panels = this.panels.map(function (panel) {
                return panel.toArray();
            });
            return {
                url: this.url,
                size: this.size,
                width: this.width,
                height: this.height,
                panels: panels
            };
        }
    }, {
        key: 'panels',
        set: function set(panels) {
            this._panels = [];
            panels.forEach(function (data) {
                var panel = data instanceof Panel ? data : new Panel(this.app, this, data);
                this._panels.push(panel);
            }.bind(this));
        }

        /**
         * Returns the panels array internal.
         *
         * @return {Array} [description]
         */
        ,
        get: function get() {
            return this._panels;
        }
    }]);

    return Page;
}(EventClass);

/**
 * Represents a panel within a page. When on the workspace,
 * this panel is a canvas rectangle object. It has an object
 * width and height that needs to be converted to what size
 * and location it would be on the actual page image.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */


var Panel = function (_EventClass3) {
    _inherits(Panel, _EventClass3);

    /**
     * Initiates a new panel instance with a few properties.
     *
     * @param {PanelzCreator} app    Application instance
     * @param {Page}          Page   Page this panel belongs to
     * @param {Object}        config Configuration options
     */
    function Panel(app, Page, config) {
        _classCallCheck(this, Panel);

        /**
         * Application instance
         * @type {PanelzCreator}
         */
        var _this3 = _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).call(this));

        _this3.app = app;
        /**
         * Page this panel belongs to
         * @type {Page}
         */
        _this3.page = Page;
        /**
         * Configuration options
         * @type {config}
         */
        _this3.config = config || {};
        /**
         * X coordinate on a page
         * @type {Number}
         */
        _this3.x = _this3.config.x;
        /**
         * Y coordinate on a page
         * @type {Number}
         */
        _this3.y = _this3.config.y;
        /**
         * Width of the panel
         * @type {Number}
         */
        _this3.width = _this3.config.width;
        /**
         * Height of a panel
         * @type {Numeber}
         */
        _this3.height = _this3.config.height;
        /**
         * Panel label for organization purposes
         * @type {String}
         */
        _this3.label = _this3.config.label || _this3.page.getNextLabel();
        /**
         * Element representing the FabricJS object on the canvas
         * @type {Object}
         */
        _this3.$element = false;
        return _this3;
    }

    /**
     * When the element is set, begin listening to canvas events.
     *
     * @param  {Object} value FabricJS object instance
     */


    _createClass(Panel, [{
        key: 'setObjectEventListeners',


        /**
         * Listen for events on the object in order to update
         * the true x/y and width/height values.
         */
        value: function setObjectEventListeners() {
            this.$element.on('moving', this.onObjectMoved.bind(this));
            this.$element.on('scaling', this.onObjectScaled.bind(this));
            this.$element.on('removed', this.onObjectRemoved.bind(this));
            this.$element.on('selected', this.onObjectSelected.bind(this));
            this.$element.on('deselected', this.onObjectDeselected.bind(this));
        }

        /**
         * When the object is selected on the canvas, make sure it's also
         * selected in the panels menu.
         */

    }, {
        key: 'onObjectSelected',
        value: function onObjectSelected() {
            var index = this.page.panels.indexOf(this);
            $('.controls__menu--panels .controls__menu-item').eq(index).addClass('controls__menu-item--selected');
        }

        /**
         * Object has been deselected on the canvas, deselect the menu
         * option as well.
         */

    }, {
        key: 'onObjectDeselected',
        value: function onObjectDeselected() {
            var index = this.page.panels.indexOf(this);
            $('.controls__menu--panels .controls__menu-item').eq(index).removeClass('controls__menu-item--selected');
        }

        /**
         * The object has moved from the canvas. Update the internal coordinates,
         * as well as provide restrictions on its movements to make sure
         * it does not flow outside of the page element.
         *
         * @param  {Object} e Event object
         */

    }, {
        key: 'onObjectMoved',
        value: function onObjectMoved(e) {
            this.setPropertiesFromCanvas();

            if (this.getLeft() < 0) {
                this.$element.left = this.page.$element.left;
                this.setPropertiesFromCanvas();
            }

            if (this.getCurrentLeft() + this.getCurrentWidth() > this.page.$element.left + this.page.$element.getWidth()) {
                this.$element.left = Math.max(this.page.$element.left + this.page.$element.getWidth() - this.getCurrentWidth(), this.page.$element.left);
                this.setPropertiesFromCanvas();
            }

            if (this.getTop() < 0) {
                this.$element.top = this.page.$element.top;
                this.setPropertiesFromCanvas();
            }

            if (this.getCurrentTop() + this.getCurrentHeight() > this.page.$element.top + this.page.$element.getHeight()) {
                this.$element.top = Math.max(this.page.$element.top + this.page.$element.getHeight() - this.getCurrentHeight(), this.page.$element.top);
                this.setPropertiesFromCanvas();
            }

            this.$element.setCoords();
        }

        /**
         * The object has been scaled on the canvas. Update the width/height
         * internal values and restrict it's size and location so it does not
         * overflow the current page element.
         *
         * @param {Object} e Event object
         */

    }, {
        key: 'onObjectScaled',
        value: function onObjectScaled(e) {
            this.setPropertiesFromCanvas();

            if (this.getLeft() < 0) {
                this.$element.left = this.page.$element.left;
                this.setPropertiesFromCanvas();
            }

            if (this.getCurrentLeft() + this.getCurrentWidth() > this.page.$element.left + this.page.$element.getWidth()) {
                var width = this.page.$element.left + this.page.$element.getWidth() - this.getCurrentLeft();
                this.$element.scaleX = width / this.$element.width;
                this.setPropertiesFromCanvas();
            }

            if (this.getTop() < 0) {
                this.$element.top = this.page.$element.top;
                this.setPropertiesFromCanvas();
            }

            if (this.getCurrentTop() + this.getCurrentHeight() > this.page.$element.top + this.page.$element.getHeight()) {
                var height = this.page.$element.top + this.page.$element.getHeight() - this.getCurrentTop();
                this.$element.scaleY = height / this.$element.height;
                this.setPropertiesFromCanvas();
            }

            this.$element.setCoords();
        }

        /**
         * Updates the class properties based on the size and location the
         * panel is on the canvas.
         */

    }, {
        key: 'setPropertiesFromCanvas',
        value: function setPropertiesFromCanvas() {
            this.x = Math.round((this.getCurrentLeft() - this.page.$element.left) * this.page.getWidth() / this.page.$element.getWidth());
            this.y = Math.round((this.getCurrentTop() - this.page.$element.top) * this.page.getHeight() / this.page.$element.getHeight());
            this.width = Math.round(this.getCurrentWidth() * this.page.getWidth() / this.page.$element.getWidth());
            this.height = Math.round(this.getCurrentHeight() * this.page.getHeight() / this.page.$element.getHeight());
        }

        /**
         * Converts the actual location and size of panel to the coordinates and
         * sizes needed for the page element on the canvas.
         *
         * @return {Object}
         */

    }, {
        key: 'getPropertiesForCanvas',
        value: function getPropertiesForCanvas() {
            return {
                x: Math.round(this.getLeft() * this.page.$element.getWidth() / this.page.getWidth() + this.page.$element.left),
                y: Math.round(this.getTop() * this.page.$element.getHeight() / this.page.getHeight() + this.page.$element.top),
                width: Math.round(this.getWidth() * this.page.$element.getWidth() / this.page.getWidth()),
                height: Math.round(this.getHeight() * this.page.$element.getHeight() / this.page.getHeight())
            };
        }

        /**
         * The panel object has been removed, so trigger an event
         * on the page class instance.
         *
         * @fires Page#panelObjectRemoved
         */

    }, {
        key: 'onObjectRemoved',
        value: function onObjectRemoved() {
            /**
             * Panel object removed event
             *
             * @event Page#panelObjectRemoved
             * @type {Object}
             * @property {Panel} Panel that was removed
             */
            this.page.trigger('panelObjectRemoved', this);
        }

        /**
         * Gets the width of the panel
         * @return {Number}
         */

    }, {
        key: 'getWidth',
        value: function getWidth() {
            return this.width;
        }

        /**
         * Gets the height of the panel.
         *
         * @return {Number}
         */

    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this.height;
        }

        /**
         * Gets the y coordinate of the panel
         *
         * @return {Number}
         */

    }, {
        key: 'getTop',
        value: function getTop() {
            return this.y;
        }

        /**
         * Gets the x coordinate of the panel
         *
         * @return {Number}
         */

    }, {
        key: 'getLeft',
        value: function getLeft() {
            return this.x;
        }

        /**
         * Gets the current width of the panel, sized
         * to fit the current page element.
         *
         * @return {Number}
         */

    }, {
        key: 'getCurrentWidth',
        value: function getCurrentWidth() {
            return this.$element.width * this.$element.scaleX;
        }

        /**
         * Gets the current heiht of the panel, sized
         * to fit the current page element.
         *
         * @return {Number}
         */

    }, {
        key: 'getCurrentHeight',
        value: function getCurrentHeight() {
            return this.$element.height * this.$element.scaleY;
        }

        /**
         * Gets the current y coordinate of the panel,
         * sized to fit the current page element.
         *
         * @return {Number}
         */

    }, {
        key: 'getCurrentTop',
        value: function getCurrentTop() {
            return this.$element.top;
        }

        /**
         * Gets the current x coordinate of the panel,
         * sized to fit the current page element.
         *
         * @return {Number}
         */

    }, {
        key: 'getCurrentLeft',
        value: function getCurrentLeft() {
            return this.$element.left;
        }

        /**
         * Returns an array value of this class instance
         *
         * @return {Object}
         */

    }, {
        key: 'toArray',
        value: function toArray() {
            return {
                x: this.getLeft(),
                y: this.getTop(),
                width: this.getWidth(),
                height: this.getHeight(),
                label: this.label
            };
        }
    }, {
        key: '$element',
        set: function set(value) {
            if (value) {
                this._$element = value;
                this.setObjectEventListeners();
                this.onObjectScaled();
            }
        }

        /**
         * Returns the FabricJS object internal.
         *
         * @return {Object}
         */
        ,
        get: function get() {
            return this._$element;
        }
    }]);

    return Panel;
}(EventClass);

/**
 * The main client class for the Panelz Creator application.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */


var PanelzCreator = function (_EventClass4) {
    _inherits(PanelzCreator, _EventClass4);

    /**
     * Takes in a configuration object for the
     * application settings.
     *
     * @constructs PanelzCreator
     * @param config
     */
    function PanelzCreator(config) {
        _classCallCheck(this, PanelzCreator);

        var _this4 = _possibleConstructorReturn(this, (PanelzCreator.__proto__ || Object.getPrototypeOf(PanelzCreator)).call(this));

        _this4.DEFAULTS = {
            /**
             * The container to load the comic reader into.
             * Should be a jQuery selector
             *
             * @type {String}
             * @default
             */
            container: '.panelz-creator-container',
            /**
             * The method by which to load the interface.
             * id: fetch comic book data
             * data: load the comic via an object
             * ui: allow them to create from scratch
             * @type {String}
             */
            method: 'ui',
            /**
             * ID of the book to load when fetching the data.
             * This value is required if a <#comic> object
             * has not been provided.
             *
             * @type {String}
             * @default
             */
            id: false,
            /**
             * Object of comic data to load into the creator. Must
             * contain an id, title, and array of pages. Each page
             * object must look like the following:
             *     id: "<stringID>",
             *     title: "<title>",
             *     pages = [
             *         {
             *             url: "<urlOfImage>",
             *             size: <size> //in bytes
             *             panels: [
             *                 {
             *                     x: xCoordinateOfPanel
             *                     y: yCoordinateOfPanel
             *                     width: widthOfPanel
             *                     height: heightOfPanel
             *                 }
             *                 ...
             *             ]
             *         }
             *         ...
             *     ]
             * The panels array within each page can be empty if the
             * page contains to panels to zoom to for the Panel Zoom feature.
             *
             * @type {Object}
             * @default
             */
            comic: {},
            /**
             * Supply a custom list of endpoints. The Panelz reader
             * requires a number of configured URLs.
             *
             * The {id} placeholder will be swapped for the supplied
             * <#id> configuration parameter.
             *
             * @type {Object}
             * @default
             */
            endpoints: {
                /**
                 * Link to view the comic
                 *
                 * @type {String}
                 */
                view: '/read/?id={id}',
                /**
                 * Gets comic data
                 *
                 * Method: GET
                 * Request:
                 *     {
                 *         id: <id>
                 *     }
                 * Response:
                 *     {
                 *         id: <id>,
                 *         title: <title>,
                 *         panels: [
                 *             {
                 *                 x: <x>,
                 *                 y: <y>,
                 *                 width: <width>,
                 *                 height: <height>
                 *             }
                 *             ...
                 *         ]
                 *     }
                 */
                get: '/comic/{id}',
                /**
                 * Creates a comic book and returns the new ID
                 *
                 * Method: POST
                 * Request:
                 *     {
                 *         title: <title>
                 *     }
                 * Response:
                 *     {
                 *         id: <id>,
                 *         title: <title>,
                 *         panels: []
                 *     }
                 */
                create: '/create',
                /**
                 * Saves comic data wholesale
                 *
                 * Method: PUT
                 * Request:
                 *     {
                 *         id: <id>,
                 *         title: <title>,
                 *         panels: [
                 *             {
                 *                 x: <x>,
                 *                 y: <y>,
                 *                 width: <width>,
                 *                 height: <height>
                 *             }
                 *             ...
                 *         ]
                 *     }
                 * Response:
                 *     {
                 *         id: <id>,
                 *         title: <title>,
                 *         panels: [
                 *             {
                 *                 x: <x>,
                 *                 y: <y>,
                 *                 width: <width>,
                 *                 height: <height>
                 *             }
                 *             ...
                 *         ]
                 *     }
                 */
                save: '/save',
                /**
                 * Uploads a page to a comic
                 *
                 * Method: POST
                 * Request:
                 *     {
                 *         page: <file>
                 *         id: <id>
                 *     }
                 * Response:
                 *     {
                 *         url: <url>
                 *         size: <size>
                 *         width: <width>
                 *         height: <height>
                 *     }
                 */
                upload: '/upload'
            },
            /**
             * Callback for when a comic is created, for the user
             * to hook into if they need to. Good for redirecting
             * or changing the URL to include the ID.
             *
             * @type {Function}
             * @default
             */
            onCreateComicSuccess: function onCreateComicSuccess() {}
        };
        /**
         * Holds the ID of the book, either from the passed
         * in configuration or from the fetched comic book data.
         *
         * @type {String}
         */
        _this4.id = false;
        /**
         * jQuery object that holds the interface markup
         *
         * @type {Object}
         */
        _this4.$container = false;
        /**
         * Message callback function
         * @type {Function}
         */
        _this4.messageTimeout = false;

        _this4.config = $.extend(true, {}, _this4.DEFAULTS, config);

        _this4.setEventListeners();

        if (_this4.config.method === 'id') {
            _this4.loadById(_this4.config.id);
        } else if (_this4.config.method === 'data') {
            _this4.loadByData(config.comic);
        } else {
            _this4.loadByUI();
        }
        return _this4;
    }

    /**
     * When setting the configuration, set each of the keys
     * as a property in the application.
     *
     * @param {Object} config Configuration options
     */


    _createClass(PanelzCreator, [{
        key: 'loadById',


        /**
         * Load the comic by fetching the data via the id.
         *
         * @param {String} id ID of comic to fetch
         */
        value: function loadById(id) {
            $.ajax({
                url: this.getEndpoint('get'),
                method: 'GET',
                error: this.onRequestError.bind(this),
                success: this.loadByData.bind(this)
            });
        }

        /**
         * Load the comic data. Shows the editor interface and
         * initializes the classes needed. Also updates the view
         * comic link with the view endpoint.
         *
         * @param {Object} data Comic data
         */

    }, {
        key: 'loadByData',
        value: function loadByData(data) {
            this.showEditor();
            this.id = data.id;
            this.book = new Book(this, data);
            this.upload = new Upload(this);
            this.workspace = new Workspace(this, this.book, this.upload);

            this.upload.on('pageUploaded', this.onPageUploaded.bind(this));
            this.book.on('pageAdded', this.updateViewButton.bind(this));
            this.book.on('pageDeleted', this.updateViewButton.bind(this));

            this.updateViewButton();
            $('[data-view-link]').attr('href', this.getEndpoint('view'));
        }

        /**
         * Load the creation UI and allow them to save a comic from scratch.
         */

    }, {
        key: 'loadByUI',
        value: function loadByUI() {
            this.showCreateUI();
            $('body').on('click', '.viewport__entry-submit', this.createComic.bind(this));
        }

        /**
         * Shows the creation UI by hiding and removing elements with special classes.
         */

    }, {
        key: 'showCreateUI',
        value: function showCreateUI() {
            $('.viewport__loading').addClass('viewport__loading--hidden');
            $('.viewport__entry').removeClass('viewport__entry--hidden');
            $('.viewport__title-bar').addClass('viewport__title-bar--hidden');
            $('.viewport__content').addClass('viewport__content--hidden');
        }

        /**
         * Shows the editor interface by hiding and removing elements
         * with special classes. Makes sure the save comic transaction
         * occurs when they leave (unload) the page.
         */

    }, {
        key: 'showEditor',
        value: function showEditor() {
            $('.viewport__loading').addClass('viewport__loading--hidden');
            $('.viewport__entry').addClass('viewport__entry--hidden');
            $('.viewport__title-bar').removeClass('viewport__title-bar--hidden');
            $('.viewport__content').removeClass('viewport__content--hidden');
            $(window).on('beforeunload', this.saveComic.bind(this));
        }

        /**
         * Sets event listeners for the page.
         */

    }, {
        key: 'setEventListeners',
        value: function setEventListeners() {
            console.log('Set event listeners');
            $('body').on('click', '.button--submit', this.onSubmitButtonClick.bind(this));
            $('body').on('complete', '.button--submit', this.onSubmitButtonComplete.bind(this));
            $('body').on('click', '.button--save', this.saveComic.bind(this));
            $('body').on('click', '[data-view-link]', this.onViewButtonClick.bind(this));
        }

        /**
         * Creates a comic by sending off the title to the create endpoint. This
         * endpoint should create an ID and return it with the title.
         *
         * @param {Object} e Event object
         */

    }, {
        key: 'createComic',
        value: function createComic(e) {
            e.preventDefault();
            $.ajax({
                url: this.getEndpoint('create'),
                method: 'POST',
                data: {
                    title: $('.viewport__entry-input').val()
                },
                error: this.onCreateComicError.bind(this),
                success: function (data) {
                    this.config.onCreateComicSuccess.call(this, data);
                    this.loadByData(data);
                }.bind(this),
                complete: function complete() {
                    $(e.currentTarget).trigger('complete', e);
                }
            });
        }

        /**
         * An error has occured attempting to create a comic. Message
         * the user with the error, if possible.
         *
         * @param {Object} response Response object from the server
         */

    }, {
        key: 'onCreateComicError',
        value: function onCreateComicError(response) {
            try {
                var data = JSON.parse(response.responseText);
            } catch (Exeception) {
                data = { message: 'Something terrible has happened. Try again?' };
            }
            $('.viewport__entry-error').text(data.message).show();
        }

        /**
         * Ships of the comic data to the save endpoint.
         *
         * @param {Object} e Event object
         */

    }, {
        key: 'saveComic',
        value: function saveComic(e) {
            e.preventDefault();
            $.ajax({
                url: this.getEndpoint('save'),
                method: 'PUT',
                async: e.type === "beforeunload" ? false : true,
                data: this.book.toArray(),
                error: this.onRequestError.bind(this),
                success: this.onSaveComicSuccess.bind(this),
                complete: function complete() {
                    $(e.currentTarget).trigger('complete', e);
                }
            });
        }

        /**
         * When a save has been successful, message the user.
         *
         * @param  {Object} data Comic data
         */

    }, {
        key: 'onSaveComicSuccess',
        value: function onSaveComicSuccess(data) {
            console.log('SUCCESS!', data);
            this.message('Your comic has been saved.');
        }

        /**
         * A request to the server has failed. Attempt to message them
         * with any message from the server, or fall back on a generic message.
         *
         * @param  {Object} response Server response data
         */

    }, {
        key: 'onRequestError',
        value: function onRequestError(response) {
            try {
                var data = JSON.parse(response.responseText);
            } catch (Exeception) {
                data = { message: 'Something terrible has happened. Try again?' };
            }
            this.message(data.message);
        }

        /**
         * Submit button has been clicked, show a progress icon
         *
         * @param {Object} e Event object
         */

    }, {
        key: 'onSubmitButtonClick',
        value: function onSubmitButtonClick(e) {
            var $this = $(e.currentTarget);
            $this.width($this.width());
            $this.find('.button__icon').css('display', 'inline-block');
            $this.find('.button__text').hide();
        }

        /**
         * Submission was complete after pressing a submit button, so
         * hide the icon and show the text.
         *
         * @param {Object} e Event object
         */

    }, {
        key: 'onSubmitButtonComplete',
        value: function onSubmitButtonComplete(e) {
            var $this = $(e.currentTarget);
            $this.css('width', 'auto');
            $this.find('.button__icon').hide();
            $this.find('.button__text').show();
        }

        /**
         * Enables or disables the view comic button based on the comic
         * book page length. If there are no pages, don't let them view.
         */

    }, {
        key: 'updateViewButton',
        value: function updateViewButton() {
            $('[data-view-link]').attr('disabled', !this.book.pages.length);
        }

        /**
         * When the view link is clicked, if it's disabled, don't go anywhere.
         * @param {Object} e Event object
         */

    }, {
        key: 'onViewButtonClick',
        value: function onViewButtonClick(e) {
            if ($(e.currentTarget).attr('disabled')) {
                e.preventDefault();
            }
        }

        /**
         * Page has been uploaded via the interface, add the page
         * data to the book.
         *
         * @param  {Object} data Page data
         */

    }, {
        key: 'onPageUploaded',
        value: function onPageUploaded(data) {
            this.book.add(data);
        }

        /**
         * Gets a specific endpoint from the array of endpoints. Replaces
         * the {id} placeholder with the id set in the configuration.
         *
         * @param  {String} endpoint Which endpoint to grab from the array
         * @return {String}
         */

    }, {
        key: 'getEndpoint',
        value: function getEndpoint(endpoint) {
            return this.endpoints[endpoint].replace('{id}', this.id);
        }

        /**
         * Displays a message for the user within the viewport.
         *
         * @param  {String} message Message to display
         * @param  {Number} time    Time in ms to display the message
         */

    }, {
        key: 'message',
        value: function message(_message, time) {
            var time = time ? time : 4000;

            clearTimeout(this.messageTimeout);

            $('.viewport__message').text(_message).fadeIn();
            this.messageTimeout = setTimeout(function () {
                $('.viewport__message').fadeOut();
            }, time);
        }
    }, {
        key: 'config',
        set: function set(config) {
            Object.keys(config).forEach(function (key) {
                this[key] = config[key];
            }.bind(this));
            this._config = config;
        }

        /**
         * Gets internal config property
         *
         * @return {Object}
         */
        ,
        get: function get() {
            return this._config;
        }

        /**
         * When setting the container, also set a $container property
         * holding appended markup.
         *
         * @param {String} container jQuery selector for container
         */

    }, {
        key: 'container',
        set: function set(container) {
            this._container = container;
            this.$container = $(container).append(PANELZ_CREATOR_MARKUP);
        }

        /**
         * Gets the internal container property
         * @return {Object}
         */
        ,
        get: function get() {
            return _$container;
        }
    }]);

    return PanelzCreator;
}(EventClass);

/**
 * Handles uploads for a page. Uses the Dropzone
 * library to do drag and drop or selectable uploads.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */


var Upload = function (_EventClass5) {
    _inherits(Upload, _EventClass5);

    /**
     * Initiates the Upload item and initiates the Dropzone library
     *
     * @constructs
     * @param {PanelzCreator} app PanelzCreator instance
     */
    function Upload(app) {
        _classCallCheck(this, Upload);

        /**
         * PanelzCreator instance
         * @type {[PanelzCreator]}
         */
        var _this5 = _possibleConstructorReturn(this, (Upload.__proto__ || Object.getPrototypeOf(Upload)).call(this));

        _this5.app = app;
        /**
         * Dropzone instance
         * @type {Dropzone}
         */
        _this5.dropzone = new Dropzone(".upload__dropzone", {
            acceptedFiles: "image/jpeg,image/png",
            url: _this5.app.getEndpoint('upload'),
            paramName: "page",
            clickable: $('.upload .button--upload')[0],
            addRemoveLinks: true,
            headers: {
                "Cache-Control": "",
                "X-Requested-With": ""
            }
        });

        _this5.setEventListeners();
        return _this5;
    }

    /**
     * Sets event listeners on the application and dropzone
     */


    _createClass(Upload, [{
        key: 'setEventListeners',
        value: function setEventListeners() {
            this.app.on('cancelUpload', this.onCancelUpload.bind(this));
            this.dropzone.on("sending", this.onFileSending.bind(this));
            this.dropzone.on("success", this.onUploadSuccess.bind(this));
            this.dropzone.on('complete', this.onUploadComplete.bind(this));
            this.dropzone.on('error', this.onUploadError.bind(this));
        }

        /**
         * Cancel upload has been initiated, so clear all files from
         * the Dropzone instance.
         *
         * @return {Boolean}
         */

    }, {
        key: 'onCancelUpload',
        value: function onCancelUpload() {
            if (this.areUploadsComplete()) {
                return true;
            }
            this.dropzone.removeAllFiles(true);
            return this.app.message('Upload canceled');
        }

        /**
         * A file is being sent, add the comic ID to the data being sent.
         *
         * @param {Object} file     File being sent
         * @param {xhr}    xhr      xhr object
         * @param {Object} formData Data being sent
         */

    }, {
        key: 'onFileSending',
        value: function onFileSending(file, xhr, formData) {
            formData.append("comicID", this.app.book.id);
        }

        /**
         * The file has been uploaded, remove it from the the dropzone
         * instance and trigger an uploaded event.
         *
         * @param  {Object} file   dropzone file
         * @param  {Object} server Server response object
         * @fires  Upload#pageUploaded
         */

    }, {
        key: 'onUploadSuccess',
        value: function onUploadSuccess(file, server) {
            this.dropzone.removeFile(file);
            /**
             * Page Uploaded event
             *
             * @event Upload#pageUploaded
             * @type {Object}
             * @property {Object} Server response
             */
            this.trigger('pageUploaded', server);
        }

        /**
         * A file upload is complete. If all of the uploads
         * have been completed, we can trigger the complete event.
         *
         * @param  {Object} file   dropzone file
         * @param  {Object} server Server response object\
         * @fires  Upload#complete
         */

    }, {
        key: 'onUploadComplete',
        value: function onUploadComplete(file, server) {
            if (this.areUploadsComplete()) {
                /**
                 * Complete event
                 *
                 * @event Upload#complete
                 * @type {Object}
                 */
                this.trigger('complete');
            }
        }

        /**
         * Checks to see if all dropzone uploads have been completed.
         * @return {Boolean}
         */

    }, {
        key: 'areUploadsComplete',
        value: function areUploadsComplete() {
            return this.dropzone.getUploadingFiles().length === 0 && this.dropzone.getQueuedFiles().length === 0;
        }

        /**
         * When there is an upload error, message the user (unless
         * the user canceled the upload);
         *
         * @param  {Object} file         Dropzone file
         * @param  {String} errorMessage Error message from server
         * @return {Boolean}
         */

    }, {
        key: 'onUploadError',
        value: function onUploadError(file, errorMessage) {
            if (file.status === 'canceled') {
                return false;
            }
            this.app.message('Error uploading ' + file.name);
            return this.dropzone.removeFile(file);
        }
    }]);

    return Upload;
}(EventClass);

/**
 * String value for draw mode
 *
 * @constant
 * @type {String}
 */


var DRAW_MODE = 'DRAW_MODE';
/**
 * String value for select mode
 *
 * @constant
 * @type {String}
 */
var SELECT_MODE = 'SELECT_MODE';
/**
 * Class representing the workspace area for working
 * and uploading pages.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */

var Workspace = function (_EventClass6) {
    _inherits(Workspace, _EventClass6);

    /**
     * Initiates the Workspace object with settings
     * and initiates sortable lists.
     *
     * @constructs
     * @param  {PanelzCreator} app    PanelzCreator instance
     * @param  {Book}          book   Book instance
     * @param  {Upload}        upload Upload Instance
     */
    function Workspace(app, book, upload) {
        _classCallCheck(this, Workspace);

        /**
         * PanelzCreator instance
         * @type {PanelzCreator}
         */
        var _this6 = _possibleConstructorReturn(this, (Workspace.__proto__ || Object.getPrototypeOf(Workspace)).call(this));

        _this6.app = app;
        /**
         * Book class instance
         * @type {Book}
         */
        _this6.book = book;
        /**
         * Upload instance
         * @type {Upload}
         */
        _this6.upload = upload;
        /**
         * Current mode
         * @type {String}
         */
        _this6.mode = SELECT_MODE;
        /**
         * Keeps track of whether or not the
         * user is in the middle of drawing
         * @type {Boolean}
         */
        _this6.drawStarted = false;
        /**
         * The x coordinate of the draw
         * @type {Number}
         */
        _this6.drawX = 0;
        /**
         * The y coordinate of the draw
         * @type {Number}
         */
        _this6.drawY = 0;
        /**
         * Default object settings for creating rectangles
         * @type {Object}
         */
        _this6.OBJECT_SETTINGS = {
            originX: 'left',
            originY: 'top',
            angle: 0,
            fill: 'rgba(255,0,0,0.5)',
            transparentCorners: false,
            cornerColor: 'rgba(102,153,255,0.5)',
            cornerSize: 12,
            lockRotation: true,
            hasRotatingPoint: false,
            selectable: false
        };
        /**
         * Reference to the working canvas element,
         * using the FabricJS library.
         * @type {fabric}
         */
        _this6.canvas = new fabric.Canvas('workspace__canvas');

        $(".controls__menu").sortable({
            placeholder: "controls__menu-item ui-state-highlight",
            start: function start(e, ui) {
                ui.placeholder.height(ui.item.height());
            },
            update: _this6.onPanelOrderUpdate.bind(_this6),
            axis: 'y'
        });

        _this6.setEventListeners();

        if (_this6.book.pages.length) {
            $('.workspace-navigation__list-item:eq(0)').trigger('activate');
        }
        return _this6;
    }

    /**
     * Assigns all sorts of event listeners to both the
     * controls and to local class instances.
     */


    _createClass(Workspace, [{
        key: 'setEventListeners',
        value: function setEventListeners() {
            var $body = $('body');
            $body.on('click activate', '.workspace-navigation__add', this.showUploadScreen.bind(this));
            $body.on('click activate', '.workspace-navigation__list-item', this.selectPage.bind(this));
            $body.on('contextmenu', '.upper-canvas', this.onContextMenuClick.bind(this));
            $body.on('click activate', '.controls__button', this.onControlsClick.bind(this));
            $body.on('focusout', '.controls__option--panels', this.onControlButtonBlur.bind(this));
            $body.on('click activate', '.controls__button--delete', this.deleteObject.bind(this));
            $body.on('click activate', '.controls__button--duplicate', this.duplicateObject.bind(this));
            $body.on('mousedown', '.controls__menu-item', this.onPanelSelect.bind(this));
            $body.on('click activate', '.workspace-navigation__delete-page', this.onDeletePage.bind(this));
            $body.on('click activate', '.upload__cancel', this.hideUploadScreen.bind(this));
            $body.on('keyup', this.onKeyUp.bind(this));
            $(window).on('resize', this.onResize.bind(this)).trigger('resize');
            this.app.on('renderCanvas', this.render.bind(this));
            this.book.on('panelSet', this.onPanelSet.bind(this));
            this.book.on('editingPage', this.onEditingPage.bind(this));
            this.upload.on('complete', this.onUploadComplete.bind(this));
            this.canvas.observe('mouse:down', this.mousedown.bind(this));
            this.canvas.observe('mouse:move', this.mousemove.bind(this));
            this.canvas.observe('mouse:up', this.mouseup.bind(this));
            this.canvas.observe('object:selected', this.setContextControlPosition.bind(this));
            this.canvas.observe('object:modified', this.setContextControlPosition.bind(this));
            this.canvas.observe('object:moving', this.hideContextControls.bind(this));
            this.canvas.observe('object:scaling', this.hideContextControls.bind(this));
            this.canvas.observe('selection:cleared', this.hideContextControls.bind(this));
        }

        /**
         * Shows the upload screen by removing a CSS class. If there are
         * pages, make sure the cancel link is showing (otherwise hide it).
         */

    }, {
        key: 'showUploadScreen',
        value: function showUploadScreen() {
            $('.upload').removeClass('upload--hidden');
            if (this.book.pages.length) {
                $('.upload__cancel').show();
            } else {
                $('.upload__cancel').hide();
            }
        }

        /**
         * Hides the upload screen and makes sure any current
         * queued uploads are canceled.
         *
         * @fires PanelzCreator#cancelUpload
         */

    }, {
        key: 'hideUploadScreen',
        value: function hideUploadScreen() {
            $('.upload').addClass('upload--hidden');
            /**
             * Cancel upload event
             *
             * @event PanelzCreator#cancelUpload
             * @type {Object}
             */
            this.app.trigger('cancelUpload');
        }

        /**
         * When the upload is complete, activate the final page
         * to trigger editing it on the canvas.
         */

    }, {
        key: 'onUploadComplete',
        value: function onUploadComplete() {
            $('.workspace-navigation__list-item:last-child').trigger('activate');
        }

        /**
         * Editing a page. Set up the page on the canvas with all of the panels.
         * If there are no panels, bail from this method and do not proceed.
         *
         * @param  {Page} page Class instance
         * @return {Boolean}
         */

    }, {
        key: 'onEditingPage',
        value: function onEditingPage(page) {
            if (!page.panels.length) {
                return $('.controls__option--draw .controls__button').trigger('activate');
            }

            page.panels.forEach(function (panel) {
                var properties = panel.getPropertiesForCanvas();
                var rect = new fabric.Rect($.extend({}, this.OBJECT_SETTINGS, {
                    left: properties.x,
                    top: properties.y,
                    width: properties.width,
                    height: properties.height
                }));
                this.canvas.add(rect);
                this.book.currentPage.trigger('panelObjectAdded', rect, panel);
            }.bind(this));
            $('.controls__option--select .controls__button').trigger('activate');
        }

        /**
         * When a panel has been set, create an entry in the panel editor menu.
         * Assigns it a few events for renaming and selecting.
         *
         * @param  {Panel} panel Panel instance
         */

    }, {
        key: 'onPanelSet',
        value: function onPanelSet(panel) {
            var $element = $('<li class="controls__menu-item panel-item" title="Double click to rename"><span><span data-panel-num>' + (this.book.currentPage.panels.indexOf(panel) + 1) + '</span>.</span> <span class="panel-item__text">' + panel.label + '</span><input type="text" value="' + panel.label + '" class="panel-item__input" /></li>').data('panel', panel);
            var $text = $element.find('.panel-item__text');
            var $input = $element.find('.panel-item__input');
            $('.controls__menu--panels').append($element);
            $('.controls__option--panels .controls__button').prop('disabled', false);

            // If the menu element is double clicked on, hide the text and show the text input
            $element.on('dblclick', function (e) {
                $text.hide();
                $input.val($text.text()).show().focus();
            });
            // If they hit enter, save the text as the panel label and hide the input/show text
            $input.on('keyup blur', function (e) {
                if ((e.keyCode === 13 || e.type === 'blur') && $input.val().length) {
                    $input.hide();
                    $text.text($input.val()).show();
                    panel.label = $text.text();
                }
            });
            // If the panel element is removed on the canvas, remove this item from
            // the mennu and renumber the menu.
            panel.$element.on('removed', function () {
                $element.remove();
                $('.controls__menu-item').each(function (index, element) {
                    $(element).find('[data-panel-num]').text(index + 1);
                });
                if (!this.book.currentPage.panels.length) {
                    $('.controls__option--panels .controls__button').prop('disabled', true);
                }
            }.bind(this));
        }

        /**
         * When the panel menu order is updated, reset the panels array for the
         * current page class instance.
         */

    }, {
        key: 'onPanelOrderUpdate',
        value: function onPanelOrderUpdate() {
            this.book.currentPage.panels = $('.controls__menu-item').map(function (i, el) {
                var panel = $(el).data('panel');
                $(el).find('[data-panel-num]').text(i + 1);
                this.canvas.moveTo(panel.$element, i + 1);
                return panel;
            }.bind(this)).get();
        }

        /**
         * A panel has been selected from the menu. Extract the panel
         * information from the data in the element and activate it
         * on the canvas.
         *
         * @param {Object} e Event object
         */

    }, {
        key: 'onPanelSelect',
        value: function onPanelSelect(e) {
            var $this = $(e.currentTarget);
            var panel = $this.data('panel');
            this.canvas.setActiveObject(panel.$element);
        }

        /**
         * User has selected the delete page option. Remove the page
         * from the array and the the actual element. If there are
         * more pages, activate the next page. If there are no more
         * pages, clear the canvas.
         *
         * @param {Object} e Event object
         * @fires Book#pageDeleted
         */

    }, {
        key: 'onDeletePage',
        value: function onDeletePage(e) {
            var $this = $(e.currentTarget);
            var $element = $this.closest('.workspace-navigation__list-item');
            var page = $element.data('page');
            var index = this.book.pages.indexOf(page);

            e.stopPropagation();

            this.book.pages.splice(index, 1);

            /**
             * Page deleted event
             *
             * @event Book#pageDeleted
             * @type {Object}
             * @property {Page} Page
             */
            this.book.trigger('pageDeleted', page);

            $element.remove();

            if (this.book.pages.length) {
                var nextIndex = this.book.pages.length > index ? index : 0;
                $('.workspace-navigation__list-item').eq(nextIndex).trigger('activate');
            } else {
                this.canvas.clear();
                $('.controls--edit').addClass('controls--hidden');
                $('.workspace-navigation__add').trigger('activate');
            }
        }

        /**
         * Key bindings for actions
         * @param {Object} e EventObject
         */

    }, {
        key: 'onKeyUp',
        value: function onKeyUp(e) {
            // Delete - Delete panel
            if (e.which === 8 && this.mode === SELECT_MODE) {
                this.deleteObject();
                // C - Duplicate panel
            } else if (e.which === 67 && this.mode === SELECT_MODE) {
                this.duplicateObject();
                // S - Select mode
            } else if (e.which === 83) {
                $('.controls__option--select .controls__button').trigger('activate');
                // D - Draw mode
            } else if (e.which === 68) {
                $('.controls__option--draw .controls__button').trigger('activate');
                // P - Panels menu
            } else if (e.which === 80 && !$('.controls__option--panels .controls__button[disabled]').length) {
                $('.controls__option--panels .controls__button').trigger('activate');
            }
        }

        /**
         * A page has been selected by the user. Center the image in
         * the workspace canvas and trigger an edit
         *
         * @param {Object} e Event object
         * @fires Page#edit
         */

    }, {
        key: 'selectPage',
        value: function selectPage(e) {
            var $this = $(e.currentTarget);
            var index = $this.index();
            var page = this.book.pages[index];

            var canvasWidth = this.canvas.getWidth();
            var canvasHeight = this.canvas.getHeight();
            var width = canvasWidth;
            var height = page.getHeight() * canvasWidth / page.getWidth();

            if (height > canvasHeight) {
                height = canvasHeight;
                width = page.getWidth() * canvasHeight / page.getHeight();
            }

            var imageSettings = {
                top: (canvasHeight - height) / 2,
                left: (canvasWidth - width) / 2,
                width: width,
                height: height,
                selectable: false
            };

            this.canvas.clear();

            $('.controls__option--panels .controls__button').prop('disabled', true);
            $('.controls__menu--panels').empty();
            $('.controls--edit').removeClass('controls--hidden');

            this.hideUploadScreen();

            $('.workspace-navigation__list-item--active').removeClass('workspace-navigation__list-item--active');
            $this.addClass('workspace-navigation__list-item--active');
            $('.workspace-navigation__list').animate({
                scrollTop: $this.position().top + $('.workspace-navigation__list').scrollTop() - 20
            }, 850);

            fabric.Image.fromURL(page.url, function (oImg) {
                oImg.set(imageSettings);
                this.canvas.add(oImg);
                /**
                 * Page edit event
                 *
                 * @event Page#edit
                 * @type {Object}
                 * @property {Object} Canvas element
                 */
                page.trigger('edit', oImg);
            }.bind(this));
        }

        /**
         * User has clicked on the canvas. If the current
         * mode is Draw Mode, begin drawing a rectangle.
         *
         * @param  {Object} o Mouse down event
         */

    }, {
        key: 'mousedown',
        value: function mousedown(o) {
            if (this.mode !== DRAW_MODE) return true;

            this.drawStarted = true;
            var pointer = this.canvas.getPointer(o.e);
            this.drawX = pointer.x;
            this.drawY = pointer.y;
            var rect = new fabric.Rect($.extend({}, this.OBJECT_SETTINGS, {
                left: this.drawX,
                top: this.drawY,
                width: pointer.x - this.drawX,
                height: pointer.y - this.drawY
            }));
            this.canvas.add(rect);
            this.drawStarted = rect;
        }

        /**
         * User has mousemoved across the canvas. If this is draw mode
         * and they have begun to draw a rectangle. Continue drawing
         * the rectangle.
         *
         * @param  {Object} o Mouse event object
         */

    }, {
        key: 'mousemove',
        value: function mousemove(o) {
            if (this.mode !== DRAW_MODE || !this.drawStarted) return true;

            var pointer = this.canvas.getPointer(o.e);
            var rect = this.drawStarted;

            if (this.drawX > pointer.x) {
                rect.set({ left: Math.abs(pointer.x) });
            }
            if (this.drawY > pointer.y) {
                rect.set({ top: Math.abs(pointer.y) });
            }

            rect.set({ width: Math.abs(this.drawX - pointer.x) });
            rect.set({ height: Math.abs(this.drawY - pointer.y) });
            rect.setCoords();

            this.canvas.renderAll();
        }

        /**
         * User has let up on the mouse. If the current mode is in draw
         * mode and they were drawing a rectangle, consider this a complete
         * panel draw and add it to the current page.
         *
         * If the object does not have any size (mouseup without drag), then
         * do not add the object as a panel and delete it from the canvas.
         *
         * @param {Object} e Mouse event object
         */

    }, {
        key: 'mouseup',
        value: function mouseup(e) {
            if (this.mode === DRAW_MODE && this.drawStarted) {
                if (!this.drawStarted.width || !this.drawStarted.height) {
                    this.canvas.remove(this.drawStarted);
                } else {
                    this.book.currentPage.trigger('panelObjectAdded', this.drawStarted);
                }
                this.canvas.deactivateAllWithDispatch().renderAll();
                this.drawStarted = false;
                this.drawX = 0;
                this.drawY = 0;
            }
        }

        /**
         * Switches the mode of the app. If they switch to Draw Mode
         * clear all activated items.
         *
         * @param  {String} mode Mode to switch to
         */

    }, {
        key: 'switchModes',
        value: function switchModes(mode) {
            this.mode = mode;
            if (mode === DRAW_MODE) {
                this.canvas.deactivateAllWithDispatch().renderAll();
            }
            this.book.currentPage.panels.forEach(function (panel) {
                panel.$element.selectable = mode === DRAW_MODE ? false : true;
            });
        }

        /**
         * A controls menu item with a mode attribute has been
         * selected, so switch to that mode.
         *
         * @param  {Object} e Event object
         */

    }, {
        key: 'onControlsClick',
        value: function onControlsClick(e) {
            var $this = $(e.currentTarget);
            var mode = $this.attr('data-mode');
            $('.controls__button').removeClass('controls__button--active');
            $this.addClass('controls__button--active');
            $('.controls__menu').hide();
            if ($this.attr('data-menu')) {
                $this.closest('.controls__option').find('.controls__menu').show();
            }

            this.switchModes(mode);
        }

        /**
         * The user has right clicked on the canvas. If they have right
         * clicked on a panel, select that item. Return false to prevent
         * an actual context menu event from propagating.
         *
         * @param  {Object} e Event object
         * @return {Boolean}
         */

    }, {
        key: 'onContextMenuClick',
        value: function onContextMenuClick(e) {
            var pointer = this.canvas.getPointer(e.originalEvent);
            var objects = this.canvas.getObjects();
            for (var i = objects.length - 1; i >= 0; i--) {
                if (objects[i].containsPoint(pointer)) {
                    this.canvas.setActiveObject(objects[i]);
                    break;
                }
            }

            if (i < 0) {
                this.canvas.deactivateAllWithDispatch();
            }

            this.canvas.renderAll();

            e.preventDefault();
            return false;
        }

        /**
         * Sets the position of the context control menu. This is the menu
         * that appears along side an activated panel. Appears above it,
         * unless there's no room, at which it appears below it. In case
         * neither works, appears at the top inside of it.
         *
         * @param  {Object} e Event object
         */

    }, {
        key: 'setContextControlPosition',
        value: function setContextControlPosition(e) {
            var panel = e.target;
            var top = panel.top - 40 > 0 ? panel.top - 40 : panel.top + panel.height * panel.scaleY + 5;
            var left = panel.left;

            if (top > this.canvas.getHeight() - $('.controls--context').outerHeight() - 5) {
                top = Math.max(5, panel.top + 5);
                left += 5;
            }
            $('.controls--context').css({
                top: top,
                left: left
            }).removeClass('controls--hidden');
        }

        /**
         * Hides the context control menu items
         */

    }, {
        key: 'hideContextControls',
        value: function hideContextControls() {
            if ($('.controls__option--panels > .controls__button--active').length) {
                $('.controls__option--select .controls__button').trigger('activate');
            }
            $('.controls--context').addClass('controls--hidden');
        }

        /**
         * Delete a panel. If the selection is a group, delete each
         * item in the group.
         *
         * @param  {Object} e Event object
         */

    }, {
        key: 'deleteObject',
        value: function deleteObject(e) {
            if (this.canvas.getActiveGroup()) {
                this.canvas.getActiveGroup().forEachObject(function (o) {
                    this.canvas.remove(o);
                }.bind(this));
                this.canvas.discardActiveGroup().renderAll();
            } else {
                this.canvas.remove(this.canvas.getActiveObject());
            }
            $('.controls__option--select .controls__button').trigger('activate');
        }

        /**
         * Duplicates a panel. If it's a group, make sure we duplicate
         * all items within the group.
         *
         * @fires Page#panelObjectAdded
         */

    }, {
        key: 'duplicateObject',
        value: function duplicateObject() {

            var panels = [this.canvas.getActiveObject()];

            if (this.canvas.getActiveGroup()) {
                panels = this.canvas.getActiveGroup().getObjects();
            }

            this.canvas.deactivateAllWithDispatch().renderAll();

            panels.forEach(function (obj) {
                var panel = obj.clone();
                panel.set(this.OBJECT_SETTINGS);
                panel.set("top", panel.top + 5);
                panel.set("left", panel.left + 5);
                this.canvas.add(panel);
                /**
                 * Panel object added event
                 *
                 * @event Page#panelObjectAdded
                 * @type {Object}
                 * @property {Object} panel
                 */
                this.book.currentPage.trigger('panelObjectAdded', panel);
                this.canvas.setActiveObject(panel);
            }.bind(this));

            $('.controls__option--select .controls__button').trigger('activate');
        }

        /**
         * A control menu botton is blurred, under certain circumstances don't
         * do anything because we want the panels order menu to stay up. Otherwise
         * select the selection option.
         *
         * @param  {Object}  e Event object
         * @return {Boolean}
         */

    }, {
        key: 'onControlButtonBlur',
        value: function onControlButtonBlur(e) {
            if ($(e.relatedTarget).is('.panel-item__input') || $(e.target).is('.panel-item__input')) {
                return true;
            }
            $('.controls__option--select .controls__button').trigger('activate');
        }

        /**
         * When the window is resized, resize the working canvas.
         *
         * @param  {Object} e Event object
         */

    }, {
        key: 'onResize',
        value: function onResize(e) {
            this.canvas.setWidth($('.workspace').width()).setHeight($('.workspace').height());
        }

        /**
         * Renders all of the canvas object
         */

    }, {
        key: 'render',
        value: function render() {
            this.canvas.renderAll();
        }
    }]);

    return Workspace;
}(EventClass);

var PANELZ_CREATOR_MARKUP = '\n    <div class="viewport">\n        <div class="viewport__message"></div>\n        <div class="viewport__loading">\n            <h2>Loading...</h2>\n            <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>\n        </div>\n        <form class="viewport__entry viewport__entry--hidden">\n            <h1>Enter the name of your comic to get started.</h1>\n            <p class="viewport__entry-error"></p>\n            <input type="text" class="viewport__entry-input" name="title" placeholder="Comic Title" />\n            <button class="button button--submit viewport__entry-submit" type="submit">\n                <span class="button__icon"><i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i></span>\n                <span class="button__text">Create Your Comic</span>\n            </button>\n        </form>\n        <form class="viewport__title-bar viewport__title-bar--hidden">\n            <input type="text" class="viewport__title-input" placeholder="Comic Title" />\n            <button class="button button--submit button--save viewport__title-bar-button" type="submit">\n                <span class="button__icon"><i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i></span>\n                <span class="button__text">Save Comic</span>\n            </button>\n            <a href="#" class="button button--alt viewport__title-bar-button" data-view-link disabled>View Comic</a>\n        </form>\n        <div class="viewport__content viewport__content--hidden">\n            <div class="viewport__workspace-navigation workspace-navigation">\n                <div class="workspace-navigation__title">Pages</div>\n                <ul class="workspace-navigation__list"></ul>\n                <div class="workspace-navigation__add">\n                    <i class="fa fa-plus workspace-navigation__add-icon"></i>\n                    <span>Add Page</span>\n                </div>\n            </div>\n            <div class="viewport__workspace workspace">\n                <canvas id="workspace__canvas" class="workspace__canvas" width="100" hieght="100"></canvas>\n                <div class="workspace__controls">\n                    <ul class="controls controls--edit controls--hidden">\n                        <li class="controls__option controls__option--select controls__button--active">\n                            <button class="controls__button" data-mode="SELECT_MODE" title="Select Panel (S)">\n                                <i class="fa fa-hand-pointer-o"></i>\n                            </button>\n                        </li>\n                        <li class="controls__option controls__option--draw">\n                            <button class="controls__button" data-mode="DRAW_MODE" title="Draw Panel (D)">\n                                <i class="fa fa-pencil-square-o"></i>\n                            </button>\n                        </li>\n                        <li class="controls__option controls__option--panels">\n                            <button class="controls__button" data-mode="SELECT_MODE" data-menu="panels" disabled title="Organize Panels (P)">\n                                <i class="fa fa-list"></i>\n                            </button>\n                            <ul class="controls__menu controls__menu--panels">\n                                <li class="controls__menu-item">Panel A</li>\n                                <li class="controls__menu-item">Panel B</li>\n                                <li class="controls__menu-item">Panel C</li>\n                                <li class="controls__menu-item">Panel D</li>\n                                <li class="controls__menu-item">Panel E</li>\n                                <li class="controls__menu-item">Panel F</li>\n                                <li class="controls__menu-item">Panel G</li>\n                                <li class="controls__menu-item">Panel H</li>\n                                <li class="controls__menu-item">Panel I</li>\n                            </ul>\n                        </li>\n                    </ul>\n                </div>\n                <ul class="controls controls--context controls--hidden">\n                    <li class="controls__option">\n                        <button class="controls__button controls__button--duplicate" data-mode="SELECT_MODE" title="Clone Panel (C)">\n                            <i class="fa fa-clone"></i>\n                        </button>\n                    </li>\n                    <li class="controls__option">\n                        <button class="controls__button controls__button--delete" data-mode="SELECT_MODE" title="Delete Panel (Del)">\n                            <i class="fa fa-trash"></i>\n                        </button>\n                    </li>\n                </ul>\n                <div class="upload">\n                    <a href="#" class="upload__cancel">Cancel</a>\n                    <div class="upload__dropzone">\n                        <div class="upload__select">\n                            <i class="fa fa-cloud-upload upload__dropzone-icon"></i>\n                            <span>Drag and Drop to Upload</span>\n                            <span style="font-size: 14px;">or</span>\n                            <button class="button button--upload">Select File(s) From Your Computer</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n';