webpackJsonp([1],{"9UVF":function(e,t){},AsQs:function(e,t){},E9ZA:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("7+uW"),r={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var a=n("VU/8")({name:"App"},r,!1,function(e){n("yIw8")},"data-v-4b565f14",null).exports,o=n("/ocq"),s={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},e._l(e.currentComments,function(t){return n("p",{key:t.id,class:{pause:!e.isPlaying},style:{top:t.height+"%"}},[e._v(e._s(t.comment))])}))},staticRenderFns:[]};var c=n("VU/8")({name:"Barrage",props:["isPlaying","playerWidth","playerHeight","currentComments"]},s,!1,function(e){n("hXVG")},"data-v-b74d7b9c",null).exports,u=n("//Fk"),l=n.n(u),d=function(e,t,n,i,r){var a=this;this.el=e,this.id=t;var o=new l.a(function(e){var t=document.createElement("script");t.src="https://www.youtube.com/iframe_api";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n),window.onYouTubeIframeAPIReady=function(){return e(window.YT)}});r.onPlayerStateChange=function(e,t){console.log(t.data),t.data==YT.PlayerState.BUFFERING&&(e.$emit("onTimeUpdate",Math.floor(e.player.player.getCurrentTime())),e.$emit("onReloadComments")),t.data!==YT.PlayerState.PLAYING&&t.data!==YT.PlayerState.PAUSED||e.$emit("onPlayerStateChange",t.data)},r.onPlayerStateChange=r.onPlayerStateChange.bind(null,r),o.then(function(e){a.player=new e.Player(a.el,{height:n,width:i,videoId:a.id,playerVars:{controls:1,disablekb:0,fs:0,showinfo:0,rel:0},events:{onStateChange:r.onPlayerStateChange}})})},m={name:"Player",props:["isPlaying","videoId","playerWidth","playerHeight"],watch:{videoId:function(e,t){this.player.player.loadVideoById(e)}},mounted:function(){console.log("mounted"),this.player=new d(this.$el,this.videoId,this.playerHeight,this.playerWidth,this);var e=this;console.log(this),setInterval(function(){e.$emit("onTimeUpdate",Math.floor(e.player.player.getCurrentTime()))},1e3)},beforeDestroy:function(){console.log("hahahaha"),this.player.player.destroy()}},v={render:function(){var e=this.$createElement;return(this._self._c||e)("div",{staticStyle:{width:"100%"}})},staticRenderFns:[]};var h=n("VU/8")(m,v,!1,function(e){n("OpAi")},"data-v-cbd42914",null).exports,p={name:"CommentsArea",props:["comments"],data:function(){return{newComment:"",addedComment:[]}},methods:{onSubmit:function(){this.$emit("onNewComment",this.newComment),this.addedComment.push(this.newComment),console.log(this.addedComment),this.newComment=""}}},f={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[e._l(e.comments,function(t){return n("p",{key:t.id},[e._v(e._s(t.comment))])}),e._v(" "),e._l(e.addedComment,function(t){return n("p",{key:t.id},[e._v(e._s(t))])}),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newComment,expression:"newComment"}],attrs:{type:"text"},domProps:{value:e.newComment},on:{input:function(t){t.target.composing||(e.newComment=t.target.value)}}}),e._v(" "),n("button",{on:{click:e.onSubmit}},[e._v("Submit")])],2)},staticRenderFns:[]};var y=n("VU/8")(p,f,!1,function(e){n("U890")},"data-v-38a15714",null).exports,g=n("mtWM"),_=n.n(g),C={name:"BarragePlayer",data:function(){return{isPlaying:!1,currentTime:0,currentInput:"",submitedInput:"",playerWidth:.7*window.innerWidth,playerHeight:.7*window.innerWidth/16*9,comments:[],currentComments:[],currentIndex:0}},props:["videoId"],components:{barrage:c,player:h,"comments-area":y},methods:{play:function(e){1===e&&(this.isPlaying=!0),2===e&&(this.isPlaying=!1)},addComment:function(e){console.log(e),this.submitedInput=e;var t={videoId:this.videoId,comment:this.submitedInput,videoTime:this.currentTime};console.log(t),_.a.post("/v1/comment",{videoId:this.videoId,comment:this.submitedInput,videoTime:this.currentTime}).then(function(e){console.log(e.data)}).catch(function(e){console.log(e)}),t.height=5*Math.floor(19*Math.random()),this.currentComments.push(t)},updateCurrentComments:function(e){for(var t=this.comments,n=this.currentIndex,i=this.currentComments;n<t.length&&t[n].videoTime<=e;)i.push(t[n]),t[n].height=5*Math.floor(19*Math.random()),n++;this.currentIndex=n,console.log(this.currentComments)},reload:function(){for(this.currentComments=[],this.currentIndex=0;this.currentIndex<this.comments.length&&this.comments[this.currentIndex].videoTime<this.currentTime;)this.currentIndex++;this.updateCurrentComments(this.currentTime)}},mounted:function(){var e=this;_.a.get("/v1/comments",{params:{videoId:this.videoId}}).then(function(t){console.log(t.data),e.comments=t.data,e.updateCurrentComments.call(e,e.currentTime)})},watch:{currentTime:function(e,t){this.updateCurrentComments.call(this,e)},videoId:function(e,t){this.currentComments=[],this.comments=[],this.currentIndex=0;var n=this;_.a.get("/v1/comments",{params:{videoId:e}}).then(function(e){console.log(e.data),n.comments=e.data,n.updateCurrentComments.call(n,n.currentTime)})}}},w={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{width:"100%"}},[n("div",{staticClass:"player-container"},[n("player",{attrs:{isPlaying:e.isPlaying,videoId:e.videoId,playerWidth:e.playerWidth,playerHeight:e.playerHeight},on:{onTimeUpdate:function(t){e.currentTime=t},onPlayerStateChange:e.play,onReloadComments:e.reload}}),e._v(" "),e._l(e.currentComments,function(t){return n("p",{key:t.id,staticClass:"comment",class:{pause:!e.isPlaying},style:{top:t.height+"%"}},[e._v(e._s(t.comment))])})],2),e._v(" "),n("comments-area",{attrs:{comments:e.comments},on:{onNewComment:e.addComment}})],1)},staticRenderFns:[]};var b=n("VU/8")(C,w,!1,function(e){n("wiGE")},"data-v-58d36aeb",null).exports,I={name:"PlayerContainer",components:{"barrage-player":b},props:["videoId"]},k={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"container"},[t("barrage-player",{attrs:{videoId:this.videoId}})],1)},staticRenderFns:[]};var P=n("VU/8")(I,k,!1,function(e){n("Wjsh")},"data-v-3019a6fa",null).exports,E=(n("QxPg"),{render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"topnav"},[n("router-link",{attrs:{to:"/"}},[e._v("\n        Home\n    ")]),e._v(" "),n("router-link",{attrs:{to:"/career"}},[e._v("\n        Career\n    ")]),e._v(" "),n("router-link",{attrs:{to:"/about"}},[e._v("\n        About Us\n    ")]),e._v(" "),n("div",{staticClass:"search-container"},[n("input",{directives:[{name:"model",rawName:"v-model.lazy",value:e.query,expression:"query",modifiers:{lazy:!0}}],attrs:{type:"text",placeholder:"Search..",name:"search"},domProps:{value:e.query},on:{change:function(t){e.query=t.target.value}}})])],1)},staticRenderFns:[]});var $=n("VU/8")({name:"NavigationMenu",data:function(){return{query:""}},watch:{query:function(e){this.$router.push("/search?keyword="+e)}}},E,!1,function(e){n("bMkP")},"data-v-7c45a00c",null).exports,T={name:"RelatedVideoList",data:function(){return{videos:[],id:this.$route.params.id}},props:["videoID"],watch:{"$route.params.id":function(e){var t=this;this.id=this.$route.params.id,_.a.get("/v1/video/relatedVideo?videoId="+this.id+"&resultNum=10").then(function(e){return t.videos=e.data}).catch(function(e){return console.log(e)})}},mounted:function(){var e=this;_.a.get("/v1/video/relatedVideo?videoId="+this.id+"&resultNum=10").then(function(t){return e.videos=t.data}).catch(function(e){return console.log(e)})}},q={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"row-list"},e._l(e.videos,function(t){return n("div",{key:t.id,staticClass:"gallery"},[n("router-link",{attrs:{to:"/videos/"+t.id}},[n("a",{attrs:{href:t.id}},[n("img",{attrs:{src:t.thumbnail,alt:"video image"}})]),e._v(" "),n("div",{staticClass:"desc"},[e._v(e._s(t.title))])])],1)}))},staticRenderFns:[]};var x={name:"VideoPage",components:{"navigation-menu":$,"player-container":P,"related-video-list":n("VU/8")(T,q,!1,function(e){n("qnzs")},"data-v-dc35c748",null).exports}},V={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("navigation-menu"),this._v(" "),t("player-container",{attrs:{videoId:this.$route.params.id}}),this._v(" "),t("related-video-list")],1)},staticRenderFns:[]};var U=n("VU/8")(x,V,!1,function(e){n("oBOz")},"data-v-445f101a",null).exports,F={name:"VideoList",data:function(){return{videos:[]}},props:["query","searchResult"],watch:{searchResult:function(){this.videos=this.searchResult},"$route.query.keyword":function(){var e=this;this.query=this.$route.query.keyword,_.a.get("/v1/video/search?keyword="+this.query+"&resultNum=10").then(function(t){return e.videos=t.data}).catch(function(e){return console.log(e)})}},mounted:function(){var e=this;void 0===this.query||0==this.query.length?_.a.get("/v1/video/popular?resultNum=21").then(function(t){return e.videos=t.data}).catch(function(e){return console.log(e)}):(console.log("set to search result"),_.a.get("/v1/video/search?keyword="+this.query+"&resultNum=10").then(function(t){return e.videos=t.data}).catch(function(e){return console.log(e)}))}},R={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"row-list"},e._l(e.videos,function(t){return n("div",{key:t.id,staticClass:"gallery"},[n("router-link",{attrs:{to:"/videos/"+t.id}},[n("a",{attrs:{href:t.id}},[n("img",{attrs:{src:t.thumbnail,alt:"video image"}})]),e._v(" "),n("div",{staticClass:"desc"},[e._v(e._s(t.title))])])],1)}))},staticRenderFns:[]};var S=n("VU/8")(F,R,!1,function(e){n("E9ZA")},"data-v-1c5637bf",null).exports,N={name:"HomePage",components:{"navigation-menu":$,"barrage-player":b,"video-list":S}},W={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("navigation-menu"),this._v(" "),t("h1",{attrs:{align:"center"}},[this._v("Share Your Comment!")]),this._v(" "),t("div",[t("video-list")],1)],1)},staticRenderFns:[]};var A=n("VU/8")(N,W,!1,function(e){n("QPdV")},"data-v-44bd52fc",null).exports,B={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"row-list"},e._l(e.members,function(t){return n("div",{key:t.name,staticClass:"gallery"},[n("img",{attrs:{src:t.photo,alt:"member image"}}),e._v(" "),n("h2",[e._v(e._s(t.name))]),e._v(" "),n("h2",[e._v(e._s(t.title))])])}))},staticRenderFns:[]};var H=n("VU/8")({name:"VideoList",data:function(){return{members:[{name:"Yuhan Lin",title:"CEO",photo:"../../static/img/Yuhan.jpeg"},{name:"Zhenguo Chen",title:"CTO",photo:"../../static/img/Zhenguo.jpg"},{name:"Liangjun Song",title:"Entry Level Frontend Engineer",photo:"../../static/img/Liangjun.jpg"}]}}},B,!1,function(e){n("T0BB")},"data-v-ca3d0a42",null).exports,M={name:"CareerPage",components:{"navigation-menu":$,profile:H}},Y={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("navigation-menu"),e._v(" "),n("h1",{attrs:{align:"center"}},[e._v("Start Your Career with Us!!!")]),e._v(" "),e._m(0),e._v(" "),e._m(1),e._v(" "),e._m(2)],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"career"},[n("h2",[e._v("What we offer:")]),e._v(" "),n("ul",[n("li",[e._v("Talk to CEO and CTO directly.")]),e._v(" "),n("li",[e._v("Work on the most important problems in the field with a team who will challenge and support you.")]),e._v(" "),n("li",[e._v("Wellness and commuter benefits")]),e._v(" "),n("li",[e._v("Flexible work hours and competitive vacation policy")]),e._v(" "),n("li",[e._v("Healthy, organic snacks every day")]),e._v(" "),n("li",[e._v("Fun workday activities like soccer, board games, bowling, or movies. Once every month, we take the entire company (including +1s and kids) on a dinner and fun activities")]),e._v(" "),n("li",[e._v("Executive and one-on-one mentorship for everyone")]),e._v(" "),n("li",[e._v("We embrace diversity, and give visa sponsorship")]),e._v(" "),n("li",[e._v("Health, dental, and vision benefits for you and your family, as well as life insurance")]),e._v(" "),n("li",[e._v("401(k) plan")])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"job-list"},[n("h2",[e._v("Opennings:")]),e._v(" "),n("ul",[n("li",[e._v("UX Designer")]),e._v(" "),n("li",[e._v("Frontend Engineer")]),e._v(" "),n("li",[e._v("Backend Engineer")]),e._v(" "),n("li",[e._v("Full Stack Engineer")]),e._v(" "),n("li",[e._v("Infrastructure Engineer")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"to-apply"},[t("h2",[this._v("To apply:")]),this._v(" "),t("p",[this._v("send email to: career@YouBarrageTube.com")])])}]};var O=n("VU/8")(M,Y,!1,function(e){n("9UVF")},"data-v-575b281c",null).exports,j={name:"AboutUs",components:{"navigation-menu":$,profile:H}},L={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("navigation-menu"),this._v(" "),t("h1",{attrs:{align:"center"}},[this._v("We are hiring!!!")]),this._v(" "),t("profile")],1)},staticRenderFns:[]};var z=n("VU/8")(j,L,!1,function(e){n("yMNf")},"data-v-672eb477",null).exports,G={name:"SearchPage",data:function(){return{videos:[],query:this.$route.query.keyword}},components:{"navigation-menu":$,"barrage-player":b,"video-list":S},watch:{"$route.query.keyword":function(){var e=this;this.query=this.$route.query.keyword,_.a.get("/v1/video/search?keyword="+this.query+"&resultNum=10").then(function(t){return e.videos=t.data}).catch(function(e){return console.log(e)})}},mounted:function(){var e=this;this.query=this.$route.query.keyword,_.a.get("/v1/video/search?keyword="+this.query+"&resultNum=10").then(function(t){return e.videos=t.data}).catch(function(e){return console.log(e)})}},Q={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("navigation-menu"),this._v(" "),t("h1",{attrs:{align:"center"}},[this._v("Your Search Result:")]),this._v(" "),t("div",[t("video-list",{attrs:{searchResult:this.videos,query:this.query}})],1)],1)},staticRenderFns:[]};var D=n("VU/8")(G,Q,!1,function(e){n("AsQs")},"data-v-28a48552",null).exports;i.a.use(o.a);var Z=new o.a({routes:[{path:"/",name:"HomePage",component:A},{path:"/videos/:id",name:"VideoPage",component:U},{path:"/career",name:"CareerPage",component:O},{path:"/about",name:"AboutUs",component:z},{path:"/search",name:"SearchPage",component:D,props:function(e){return{query:e.query.keyword}}}]});n("7t+N");i.a.config.productionTip=!1,new i.a({el:"#app",router:Z,components:{App:a},template:"<App/>"})},OpAi:function(e,t){},QPdV:function(e,t){},T0BB:function(e,t){},U890:function(e,t){},Wjsh:function(e,t){},bMkP:function(e,t){},hXVG:function(e,t){},oBOz:function(e,t){},qnzs:function(e,t){},wiGE:function(e,t){},yIw8:function(e,t){},yMNf:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.e1afb542c73a38841685.js.map