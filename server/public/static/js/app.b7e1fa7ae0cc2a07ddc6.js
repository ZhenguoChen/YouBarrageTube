webpackJsonp([1],{Mmb8:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("7+uW"),a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var r=n("VU/8")({name:"App"},a,!1,function(t){n("yIw8")},"data-v-4b565f14",null).exports,o=n("/ocq"),s={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},t._l(t.currentComments,function(e){return n("p",{key:e.id,class:{pause:!t.isPlaying},style:{top:e.height+"%"}},[t._v(t._s(e.comment))])}))},staticRenderFns:[]};var c=n("VU/8")({name:"Barrage",props:["isPlaying","playerWidth","playerHeight","currentComments"]},s,!1,function(t){n("gATq")},"data-v-4d666846",null).exports,d=n("//Fk"),u=n.n(d),m=function(t,e,n,i,a){var r=this;this.el=t,this.id=e;var o=new u.a(function(t){var e=document.createElement("script");e.src="https://www.youtube.com/iframe_api";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n),window.onYouTubeIframeAPIReady=function(){return t(window.YT)}});a.onPlayerStateChange=function(t,e){console.log(e.data),e.data==YT.PlayerState.BUFFERING&&(t.$emit("onTimeUpdate",Math.floor(t.player.player.getCurrentTime())),t.$emit("onReloadComments")),e.data!==YT.PlayerState.PLAYING&&e.data!==YT.PlayerState.PAUSED||t.$emit("onPlayerStateChange",e.data)},a.onPlayerStateChange=a.onPlayerStateChange.bind(null,a),o.then(function(t){r.player=new t.Player(r.el,{height:n,width:i,videoId:r.id,playerVars:{controls:1,disablekb:0,fs:0,showinfo:0,rel:0},events:{onStateChange:a.onPlayerStateChange}})})},l={name:"Player",props:["isPlaying","videoId","playerWidth","playerHeight"],watch:{videoId:function(t,e){this.player.player.loadVideoById(t)}},mounted:function(){this.player=new m(this.$el,this.videoId,this.playerHeight,this.playerWidth,this);var t=this;console.log(this),setInterval(function(){t.$emit("onTimeUpdate",Math.floor(t.player.player.getCurrentTime()))},1e3)}},h={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticStyle:{width:"100%"}})},staticRenderFns:[]};var v=n("VU/8")(l,h,!1,function(t){n("QcXx")},"data-v-3c166fe3",null).exports,p={name:"CommentsArea",props:["comments"],data:function(){return{newComment:"",addedComment:[]}},methods:{onSubmit:function(){this.$emit("onNewComment",this.newComment),this.addedComment.push(this.newComment),console.log(this.addedComment),this.newComment=""}}},f={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[t._l(t.comments,function(e){return n("p",{key:e.id},[t._v(t._s(e.comment))])}),t._v(" "),t._l(t.addedComment,function(e){return n("p",{key:e.id},[t._v(t._s(e))])}),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.newComment,expression:"newComment"}],attrs:{type:"text"},domProps:{value:t.newComment},on:{input:function(e){e.target.composing||(t.newComment=e.target.value)}}}),t._v(" "),n("button",{on:{click:t.onSubmit}},[t._v("Submit")])],2)},staticRenderFns:[]};var g=n("VU/8")(p,f,!1,function(t){n("uJWE")},"data-v-65df4039",null).exports,y=n("mtWM"),_=n.n(y),C={name:"BarragePlayer",data:function(){return{isPlaying:!1,currentTime:0,currentInput:"",submitedInput:"",playerWidth:.7*window.innerWidth,playerHeight:.7*window.innerWidth/16*9,comments:[],currentComments:[],currentIndex:0}},props:["videoId"],components:{barrage:c,player:v,"comments-area":g},methods:{play:function(t){1===t&&(this.isPlaying=!0),2===t&&(this.isPlaying=!1)},addComment:function(t){console.log(t),this.submitedInput=t;var e={videoId:this.videoId,comment:this.submitedInput,videoTime:this.currentTime};console.log(e),_.a.post("/v1/comment",{videoId:this.videoId,comment:this.submitedInput,videoTime:this.currentTime}).then(function(t){console.log(t.data)}).catch(function(t){console.log(t)}),e.height=5*Math.floor(19*Math.random()),this.currentComments.push(e)},updateCurrentComments:function(t){for(var e=this.comments,n=this.currentIndex,i=this.currentComments;n<e.length&&e[n].videoTime<=t;)i.push(e[n]),e[n].height=5*Math.floor(19*Math.random()),n++;this.currentIndex=n,console.log(this.currentComments)},reload:function(){for(this.currentComments=[],this.currentIndex=0;this.currentIndex<this.comments.length&&this.comments[this.currentIndex].videoTime<this.currentTime;)this.currentIndex++;this.updateCurrentComments(this.currentTime)}},mounted:function(){var t=this;_.a.get("/v1/comments",{params:{videoId:this.videoId}}).then(function(e){console.log(e.data),t.comments=e.data,t.updateCurrentComments.call(t,t.currentTime)})},watch:{currentTime:function(t,e){this.updateCurrentComments.call(this,t)},videoId:function(t,e){this.currentComments=[],this.comments=[],this.currentIndex=0;var n=this;_.a.get("/v1/comments",{params:{videoId:t}}).then(function(t){console.log(t.data),n.comments=t.data,n.updateCurrentComments.call(n,n.currentTime)})}}},w={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{width:"100%"}},[n("div",{staticClass:"player-container"},[n("player",{attrs:{isPlaying:t.isPlaying,videoId:t.videoId,playerWidth:t.playerWidth,playerHeight:t.playerHeight},on:{onTimeUpdate:function(e){t.currentTime=e},onPlayerStateChange:t.play,onReloadComments:t.reload}}),t._v(" "),t._l(t.currentComments,function(e){return n("p",{key:e.id,staticClass:"comment",class:{pause:!t.isPlaying},style:{top:e.height+"%"}},[t._v(t._s(e.comment))])})],2),t._v(" "),n("comments-area",{attrs:{comments:t.comments},on:{onNewComment:t.addComment}})],1)},staticRenderFns:[]};var I=n("VU/8")(C,w,!1,function(t){n("dWKE")},"data-v-96fac6c0",null).exports,P={name:"PlayerContainer",components:{"barrage-player":I}},b={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"container"},[e("barrage-player")],1)},staticRenderFns:[]};var T=n("VU/8")(P,b,!1,function(t){n("l++u")},"data-v-0ae701a0",null).exports,x=(n("QxPg"),{render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"topnav"},[e("a",{staticClass:"active",attrs:{href:"#home"}},[this._v("Home")]),this._v(" "),e("a",{attrs:{href:"#about"}},[this._v("About")]),this._v(" "),e("a",{attrs:{href:"#contact"}},[this._v("Contact")]),this._v(" "),e("div",{staticClass:"search-container"},[e("form",{attrs:{action:"/action_page.php"}},[e("input",{attrs:{type:"text",placeholder:"Search..",name:"search"}}),this._v(" "),e("button",{attrs:{type:"submit"}},[e("i",{staticClass:"fa fa-search"})])])])])}]});var $=n("VU/8")({name:"NavigationMenu"},x,!1,function(t){n("Mmb8")},"data-v-137ce1df",null).exports,V={name:"RelatedVideoList",data:function(){return{videos:[],id:this.$route.params.id}},props:["videoID"],watch:{"$route.params.id":function(t){var e=this;this.id=this.$route.params.id,_.a.get("/v1/video/relatedVideo?videoId="+this.id+"&resultNum=10").then(function(t){return e.videos=t.data}).catch(function(t){return console.log(t)})}},mounted:function(){var t=this;_.a.get("/v1/video/relatedVideo?videoId="+this.id+"&resultNum=10").then(function(e){return t.videos=e.data}).catch(function(t){return console.log(t)})}},E={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row-list"},t._l(t.videos,function(e){return n("div",{key:e.id,staticClass:"gallery"},[n("router-link",{attrs:{to:"/videos/"+e.id}},[n("a",{attrs:{href:e.id}},[n("img",{attrs:{src:e.thumbnail,alt:"video image"}})]),t._v(" "),n("div",{staticClass:"desc"},[t._v(t._s(e.title))])])],1)}))},staticRenderFns:[]};var S={name:"VideoPage",components:{"navigation-menu":$,"player-container":T,"related-video-list":n("VU/8")(V,E,!1,function(t){n("YAtg")},"data-v-3cc9629c",null).exports}},R={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("navigation-menu"),this._v(" "),e("player-container",{attrs:{videoId:this.$route.params.id}}),this._v(" "),e("related-video-list")],1)},staticRenderFns:[]};var U=n("VU/8")(S,R,!1,function(t){n("tQ51")},"data-v-5d8b7d44",null).exports,F={name:"VideoList",data:function(){return{videos:[]}},mounted:function(){var t=this;_.a.get("/v1/video/popular?resultNum=21").then(function(e){return t.videos=e.data}).catch(function(t){return console.log(t)})}},N={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row-list"},t._l(t.videos,function(e){return n("div",{key:e.id,staticClass:"gallery"},[n("router-link",{attrs:{to:"/videos/"+e.id}},[n("a",{attrs:{href:e.id}},[n("img",{attrs:{src:e.thumbnail,alt:"video image"}})]),t._v(" "),n("div",{staticClass:"desc"},[t._v(t._s(e.title))])])],1)}))},staticRenderFns:[]};var W={name:"HomePage",components:{"navigation-menu":$,"barrage-player":I,"video-list":n("VU/8")(F,N,!1,function(t){n("oDug")},"data-v-1b53f3ce",null).exports}},k={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("navigation-menu"),this._v(" "),e("h1",{attrs:{align:"center"}},[this._v("Share Your Comment!")]),this._v(" "),e("div",[e("video-list")],1)],1)},staticRenderFns:[]};var A=n("VU/8")(W,k,!1,function(t){n("QPdV")},"data-v-44bd52fc",null).exports;i.a.use(o.a);var H=new o.a({routes:[{path:"/",name:"HomePage",component:A},{path:"/videos/:id",name:"VideoPage",component:U}]});n("7t+N");i.a.config.productionTip=!1,new i.a({el:"#app",router:H,components:{App:r},template:"<App/>"})},QPdV:function(t,e){},QcXx:function(t,e){},YAtg:function(t,e){},dWKE:function(t,e){},gATq:function(t,e){},"l++u":function(t,e){},oDug:function(t,e){},tQ51:function(t,e){},uJWE:function(t,e){},yIw8:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.b7e1fa7ae0cc2a07ddc6.js.map