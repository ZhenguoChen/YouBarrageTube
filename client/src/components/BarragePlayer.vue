<template>
    <div style="width:100%; height:100%; position:relative" id="player">
        <div class="player-input">
          <div class="player-container">
            <player :isPlaying="isPlaying" :videoId="videoId" @onTimeUpdate="currentTime = $event" @onPlayerStateChange="play" @onReloadComments="reload" />
            <div v-show="isShow">
              <div class="comment" 
              v-for="(comment,index) in currentComments" 
              :class="[{pause: !isPlaying},comment.duration]" 
              :key="index" 
              :style="{top: (index%15+1) * 5.5 + '%'}">{{comment.comment}}</div>
            </div>
          </div>
          <div class="danmu-control">
            <input v-model="newComment" type="text" placeholder="Type your comment..." @keyup.enter="addComment">
            <button @click = "addComment">Submit</button>
            <button @click = "disableDanmu">{{buttonValue}}</button>
          </div>
        </div>
        <comments-area :comments="comments"/>
    </div>
</template>

<script>
import Player from "./Player";
import CommentsArea from "./CommentsArea";
import axios from "axios";

export default {
  name: "BarragePlayer",
  data: function() {
    return {
      isPlaying: false,
      currentTime: 0,
      submitedInput: "",
      comments: [],
      currentComments: [],
      currentIndex: 0,
      isShow: true,
      newComment:'',
    };
  },
  props: ["videoId"],
  components: {
    player: Player,
    "comments-area": CommentsArea
  },
  methods: {
    play: function(e) {
      if (e === 1) this.isPlaying = true;
      if (e === 2) this.isPlaying = false;
    },

    loadComment: function() {
      var that = this;
      axios
        .get("/v1/comments", {
          params: {
            videoId: this.videoId
          }
        })
        .then(function(response) {
          // console.log(response.data);
          that.comments = response.data;
          that.updateCurrentComments.call(that, that.currentTime);
        });
    },

    addComment: function() {
      this.submitedInput = this.newComment;
      this.newComment = '';
      var newComment = {
        videoId: this.videoId,
        comment: this.submitedInput,
        videoTime: this.currentTime
      };
      axios
        .post("/v1/comment", {
          videoId: this.videoId,
          comment: this.submitedInput,
          videoTime: this.currentTime
        });
        // .then(function(response) {
        //   console.log(response.data);
        // })
        // .catch(function(error) {
        //   console.log(error);
        // });
      this.updateCurrentComments(this.currentTime);  
      this.currentIndex++;
      newComment.duration = this.randomSpeed();
      this.currentComments.push(newComment);
      this.loadComment();
    },

    updateCurrentComments: function(currentTime) {
      var allComments = this.comments;
      var i = this.currentIndex;
      var currentComments = this.currentComments;
      let num = 0;

      while (
        i < allComments.length &&
        allComments[i].videoTime <= currentTime
      ) {
        if(allComments[i].videoTime === currentTime && num<15){
          currentComments.push(allComments[i]);
          allComments[i].duration = this.randomSpeed();
          num ++;
        };
        i++;
      }

      this.currentIndex = i;
      // console.log(this.currentComments);
    },

    reload: function() {
      this.currentComments = [];
      this.currentIndex = 0;
      while (
        this.currentIndex < this.comments.length &&
        this.comments[this.currentIndex].videoTime < this.currentTime
      ) {
        this.currentIndex++;
      }
      this.updateCurrentComments(this.currentTime);
    },

    randomSpeed: function(){
        var temp = Math.random() * 10;
        if (temp < 1.5) return 'slow';
        if (temp > 8.5) return 'fast';
        else return 'medium';
    },

    disableDanmu: function(){
      if(!this.isShow) this.reload();
      this.isShow = !this.isShow;
    }
  },
  mounted() {
    // Load video comments by video ID
    this.loadComment();
  },
  watch: {
    currentTime: function(newVal, oldVal) {
      this.updateCurrentComments.call(this, newVal);
    },
    videoId: function(newVal, oldVal) {
      this.currentComments = [];
      this.comments = [];
      this.currentIndex = 0;
      var that = this;
      axios
        .get("/v1/comments", {
          params: {
            videoId: newVal
          }
        })
        .then(function(response) {
          // console.log(response.data);
          that.comments = response.data;
          that.updateCurrentComments.call(that, that.currentTime);
        });
    }
  },
  computed: {
    buttonValue:function(){
      if(!this.isShow) return 'Enable';
      else return 'Disable';
    }
  }
};
</script>


<style scoped>
button{
  border:1px solid #e9e9e9;
  border-radius: 5px;
  width:9%;
}

button:hover{
  background-color: #e9e9e9;
}

button:active{
  outline:none;
}

button:focus{
  outline:none;
}

.danmu-control{
  display:inline-block;
  height:8%;
  width:100%;
}

.player-input{
  /* display:inline-block; */
  float:left;
  width:70%; 
  height:100%; 
  position:relative;
  border-right: 1px solid #e9e9e9;
}

.player-container {
  float: left;
  position: relative;
  /* display:inline-block; */
  height: 92%;
  width: 100%;
  overflow: hidden;
}

.comment {
  font-family: Arial, Helvetica, sans-serif;
  pointer-events: none;
  user-select: none;
  will-change: transform;
  font-size: 1.25em;
  z-index: 100;
  display: inline-block;
  position: absolute;
  color: white;
  left: 105%;
  width: 100%;
  text-shadow: rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) 0px 1px 1px,
    rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) -1px 0px 1px;
  /* animation: wordmove 10s linear; */
}

.slow {
  animation: wordmove 12s linear;
}

.medium {
  animation: wordmove 10s linear;
}

.fast {
  animation: wordmove 8s linear;
}

@keyframes wordmove {
  from {
    left: 105%;
  }
  to {
    left: -100%;
  }
}

.pause {
  animation-play-state: paused;
}

input{
  box-sizing: border-box;
  display:inline-block;
  font-size: 100%;
  margin: 0;
  margin-left:1%;
  padding: 0;
  height:95%;
  width: 78%;
  border: none;
}

input:focus{
  border:none;
  outline: none;
}

input::-webkit-input-placeholder{
  color:#99a2aa;
  font-size: 0.8em;
}
</style>
