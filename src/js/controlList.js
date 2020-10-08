(function (root) {
    function ControlSongList(dom) {
        this.list = document.createElement('div');
        this.dl = document.createElement('dl');
        this.dt = document.createElement('dt');
        this.close = document.createElement('div');
        this.ddList = [];
        this.list.className = 'list hidden';
        this.dt.innerHTML = '播放列表';
        this.close.innerHTML = '关闭';
        this.close.className = 'close';
        this.dl.appendChild(this.dt);
        this.list.appendChild(this.dl);
        this.list.appendChild(this.close);
        dom.appendChild(this.list);
    }

    ControlSongList.prototype = {
        initList: function (data,index) {
            if(this.ddList.length === data.length){
                return;
            }
            var domList = document.createDocumentFragment();
            for(var i = 0; i < data.length; i++){
                var dd = document.createElement('dd');
                dd.innerHTML = data[i].name;
                if(i === index){
                    dd.className = 'active';
                }
                this.ddList.push(dd);           
                domList.appendChild(dd);
            }
            this.dl.appendChild(domList);
            var This = this;
            this.close.addEventListener('touchend',function(){
                This.hiddenList();
            })
        },

        hiddenList:function(){
            this.list.classList.add('hidden');
        },
        showList:function(index){
            this.ddList.forEach(function(dd){
                dd.className = '';
            })
            this.ddList[index].className = 'active';
            this.list.classList.remove('hidden');
        }
    }

    root.selectMusic = ControlSongList;
})(window.player || (window.player = {}))