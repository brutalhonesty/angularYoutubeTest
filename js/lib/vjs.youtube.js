videojs.Youtube=videojs.MediaTechController.extend({init:function(a,b,c){videojs.MediaTechController.call(this,a,b,c);if("undefined"!=typeof b.source)for(var e in b.source)a.options()[e]=b.source[e];this.player_=a;this.player_el_=document.getElementById(a.id());this.player_el_.className+=" vjs-youtube";videojs.IS_IOS&&(a.options().ytcontrols=!0);this.id_=this.player_.id()+"_youtube_api";this.el_=videojs.Component.prototype.createEl("iframe",{id:this.id_,className:"vjs-tech",scrolling:"no",marginWidth:0,
marginHeight:0,frameBorder:0,webkitAllowFullScreen:"true",mozallowfullscreen:"true",allowFullScreen:"true"});b=videojs.Component.prototype.createEl("div",{className:"iframeblocker"});var d=this;c=function(){d.paused()?d.play():d.pause()};b.addEventListener?b.addEventListener("click",c):b.attachEvent("onclick",c);this.player_el_.insertBefore(b,this.player_el_.firstChild);this.player_el_.insertBefore(this.el_,b);this.parseSrc(a.options().src);a={enablejsapi:1,iv_load_policy:3,playerapiid:this.id(),
disablekb:1,wmode:"transparent",controls:this.player_.options().ytcontrols?1:0,showinfo:0,modestbranding:1,rel:0,autoplay:this.player_.options().autoplay?1:0,loop:this.player_.options().loop?1:0,list:this.playlistId};"undefined"==typeof a.list&&delete a.list;"file:"!=window.location.protocol&&(a.origin=window.location.protocol+"//"+window.location.host);this.el_.src="https://www.youtube.com/embed/"+this.videoId+"?"+videojs.Youtube.makeQueryString(a);this.player_.options().ytcontrols?this.player_.controls(!1):
this.player_.poster()||this.player_.poster("https://img.youtube.com/vi/"+this.videoId+"/0.jpg");videojs.Youtube.apiReady?this.loadYoutube():(videojs.Youtube.loadingQueue.push(this),videojs.Youtube.apiLoading||(a=document.createElement("script"),a.src="//www.youtube.com/iframe_api",b=document.getElementsByTagName("script")[0],b.parentNode.insertBefore(a,b),videojs.Youtube.apiLoading=!0));this.triggerReady()}});videojs.Youtube.prototype.dispose=function(){videojs.MediaTechController.prototype.dispose.call(this)};
videojs.Youtube.prototype.parseSrc=function(a){this.srcVal=a;var b=a.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);this.videoId=b&&11==b[2].length?b[2]:null;b=a.match(/[?&]list=([^#\&\?]+)/);null!=b&&1<b.length?this.playlistId=b[1]:this.playlistId&&delete this.playlistId};
videojs.Youtube.prototype.src=function(a){a&&(this.parseSrc(a),this.ytplayer.loadVideoById(this.videoId),this.player_el_.getElementsByClassName("vjs-poster")[0].style.backgroundImage="url(https://img.youtube.com/vi/"+this.videoId+"/0.jpg)",this.player_.poster("https://img.youtube.com/vi/"+this.videoId+"/0.jpg"));return this.srcVal};videojs.Youtube.prototype.load=function(){};
videojs.Youtube.prototype.play=function(){this.isReady_?this.ytplayer.playVideo():(this.player_.trigger("waiting"),this.playOnReady=!0)};videojs.Youtube.prototype.pause=function(){this.ytplayer.pauseVideo()};videojs.Youtube.prototype.paused=function(){return this.ytplayer?this.lastState!==YT.PlayerState.PLAYING&&this.lastState!==YT.PlayerState.BUFFERING:!0};videojs.Youtube.prototype.currentTime=function(){return this.ytplayer?this.ytplayer.getCurrentTime():0};
videojs.Youtube.prototype.setCurrentTime=function(a){this.ytplayer.seekTo(a,!0);this.player_.trigger("timeupdate")};videojs.Youtube.prototype.duration=function(){return this.ytplayer?this.ytplayer.getDuration():0};videojs.Youtube.prototype.volume=function(){this.ytplayer&&isNaN(this.volumeVal)&&(this.volumeVal=this.ytplayer.getVolume()/100);return this.volumeVal};videojs.Youtube.prototype.setVolume=function(a){a&&a!=this.volumeVal&&(this.ytplayer.setVolume(100*a),this.volumeVal=a,this.player_.trigger("volumechange"))};
videojs.Youtube.prototype.muted=function(){return this.mutedVal};videojs.Youtube.prototype.setMuted=function(a){a?this.ytplayer.mute():this.ytplayer.unMute();this.mutedVal=a;this.player_.trigger("volumechange")};
videojs.Youtube.prototype.buffered=function(){if(this.ytplayer&&this.ytplayer.getVideoBytesLoaded){var a=this.ytplayer.getVideoBytesLoaded(),b=this.ytplayer.getVideoBytesTotal();if(!a||!b)return 0;var c=this.ytplayer.getDuration(),a=a/b*c,b=this.ytplayer.getVideoStartBytes()/b*c;return videojs.createTimeRange(b,b+a)}return videojs.createTimeRange(0,0)};videojs.Youtube.prototype.supportsFullScreen=function(){return!0};videojs.Youtube.isSupported=function(){return!0};
videojs.Youtube.canPlaySource=function(a){return"video/youtube"==a.type};videojs.Youtube.canControlVolume=function(){return!0};videojs.Youtube.loadingQueue=[];
videojs.Youtube.prototype.loadYoutube=function(){this.ytplayer=new YT.Player(this.id_,{events:{onReady:function(a){a.target.vjsTech.onReady()},onStateChange:function(a){a.target.vjsTech.onStateChange(a.data)},onPlaybackQualityChange:function(a){a.target.vjsTech.onPlaybackQualityChange(a.data)},onError:function(a){a.target.vjsTech.onError(a.data)}}});this.ytplayer.vjsTech=this};
videojs.Youtube.makeQueryString=function(a){var b=[],c;for(c in a)a.hasOwnProperty(c)&&b.push(encodeURIComponent(c)+"="+encodeURIComponent(a[c]));return b.join("&")};window.onYouTubeIframeAPIReady=function(){for(var a;a=videojs.Youtube.loadingQueue.shift();)a.loadYoutube();videojs.Youtube.loadingQueue=[];videojs.Youtube.apiReady=!0};videojs.Youtube.prototype.onReady=function(){this.isReady_=!0;this.player_.trigger("apiready");this.playOnReady&&this.play()};
videojs.Youtube.prototype.onStateChange=function(a){if(a!=this.lastState){switch(a){case -1:this.player_.trigger("durationchange");break;case YT.PlayerState.ENDED:this.player_.options().ytcontrols||(this.player_el_.getElementsByClassName("vjs-poster")[0].style.display="block",this.player_.bigPlayButton.show());this.player_.trigger("ended");break;case YT.PlayerState.PLAYING:this.player_.bigPlayButton.hide();this.player_.trigger("timeupdate");this.player_.trigger("durationchange");this.player_.trigger("playing");
this.player_.trigger("play");break;case YT.PlayerState.PAUSED:this.player_.trigger("pause");break;case YT.PlayerState.BUFFERING:this.player_.trigger("timeupdate"),this.player_.trigger("waiting")}this.lastState=a}};
videojs.Youtube.prototype.onPlaybackQualityChange=function(a){switch(a){case "medium":this.player_.videoWidth=480;this.player_.videoHeight=360;break;case "large":this.player_.videoWidth=640;this.player_.videoHeight=480;break;case "hd720":this.player_.videoWidth=960;this.player_.videoHeight=720;break;case "hd1080":this.player_.videoWidth=1440;this.player_.videoHeight=1080;break;case "highres":this.player_.videoWidth=1920;this.player_.videoHeight=1080;break;case "small":this.player_.videoWidth=320;
this.player_.videoHeight=240;break;default:this.player_.videoWidth=0,this.player_.videoHeight=0}this.player_.trigger("ratechange")};videojs.Youtube.prototype.onError=function(a){this.player_.error=a;this.player_.trigger("error")};(function(){var a=document.createElement("style");a.innerHTML=" .vjs-youtube .vjs-poster { background-size: cover; }.vjs-youtube.vjs-user-inactive .iframeblocker { position:absolute;top:0;left:0;width:100%;height:100%; }";document.head.appendChild(a)})();