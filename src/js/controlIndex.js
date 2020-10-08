(function(root){
    function Index(len){
        this.index = 0;
        this.len = len;//数据长度
    }

    Index.prototype = {
        prev:function(){
            return this.get(-1);
        },
        next:function(){
            return this.get(1);
        },
        get:function(val){//val为+1或-1，用于上一首或下一首切歌
            this.index = (this.index + val + this.len)%this.len;
            return this.index;
        }
    }
    root.controlIndex = Index;
})(window.player || (window.player = {}))