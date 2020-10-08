(function(root){
    function AudioControl(){
        this.audio = new Audio();
        this.status = 'pause';
        this.readyState = false;
    }
    AudioControl.prototype = {
        //加载音乐
        load:function(src){
            this.audio.src = src;
            this.audio.load();
        },
        //播放音乐
        play:function(){
            this.audio.play();
            this.status = 'play'
        },

        //暂停音乐
        pause:function(){
            this.audio.pause();
            this.status = 'pause'
        },
        //音乐播放完成事件
        end:function(fn){
            this.audio.onended = fn;
        },
        //音乐进度跳转
        playTo:function(time){
            this.audio.currentTime = time;//时间（秒）
        }
    }
    root.music = new AudioControl();
})(window.player || (window.player = {}))