(function ($, player) {
    function MusicPlayer() {
        this.dom = document.getElementById('wrapper')
        this.dataList = [];
        this.timer = null;
        this.indexObj = null;
        this.currIndex = 0;
        this.lastindex = this.currIndex;
        this.progress = player.progress.pro();
        console.log($, player)
    }

    MusicPlayer.prototype = {
        init: function () {
            this.getDom();
            this.getData('../mock/data.json');
        },
        getDom: function () {
            this.record = document.querySelector('.songImg img');
            this.controlList = document.querySelectorAll('.control li');
        },
        getData: function (url) {
            var This = this;
            $.ajax({
                url: url,
                method: 'get',
                success: function (data) {
                    This.dataList = data;
                    This.indexObj = new player.controlIndex(data.length);
                    This.loadMusic(This.indexObj.index);
                    This.selectSong = new player.selectMusic(This.dom);
                    This.musicControl();
                    This.dragEvent();
                },
                error: function () {
                    console.log('数据请求失败');
                }
            })
        },
        loadMusic: function (index) {
            player.render(this.dataList[index]);
            player.music.load(this.dataList[index].audioSrc);
            this.progress.renderAllTime(this.dataList[index].duration);
            console.log(player.music.status)
            if (player.music.status == 'play') {
                player.music.play();
                this.progress.move(0);
                this.lastindex = this.currIndex;
                console.log(this.lastindex);
                this.currIndex = index;
                this.indexObj.index = index;
                this.controlList[2].className = 'playing';
                this.imgRotate(0);
            }
            //音乐播放完成事件
            var This = this;
            player.music.end(function () {
                This.loadMusic(This.indexObj.next());
            })
        },
        musicControl: function () {
            var This = this;
            //歌曲喜欢标记
            this.controlList[0].addEventListener('touchend', function () {
                
            });
            //上一首
            this.controlList[1].addEventListener('touchend', function () {
                player.music.status = 'play';
                This.loadMusic(This.indexObj.prev());
            });
            //音乐播放暂停事件
            this.controlList[2].addEventListener('touchend', function () {
                if (player.music.status == 'play') { //暂停
                    player.music.pause();
                    This.progress.stop();
                    this.className = '';
                    This.imgStop();
                } else {
                    player.music.play(); //播放
                    This.progress.move();
                    this.className = 'playing'
                    var deg = This.record.dataset.rotate || 0;
                    This.imgRotate(deg);
                }
            });
            //下一首
            this.controlList[3].addEventListener('touchend', function () {
                player.music.status = 'play';
                This.loadMusic(This.indexObj.next());
            });
            //切歌列表
            this.controlList[4].addEventListener('touchend', function () {
                This.selectSong.initList(This.dataList, This.currIndex);
                This.selectSong.showList(This.currIndex);
                var ddList = This.selectSong.ddList;
                var lastDom = ddList[This.lastindex];
                for (var i = 0; i < ddList.length; i++) {
                    (function (index) {
                        ddList[index].addEventListener('touchend', function () {
                            if (player.music.status == 'play' && index === This.currIndex) {
                                return;
                            }
                            player.music.status = 'play';
                            This.loadMusic(index);
                            lastDom = ddList[This.lastindex];
                            lastDom.className = '';
                            this.className = 'active';
                        })
                    })(i)
                }
            })
        },
        dragEvent: function () {
            var drag = player.progress.drag(document.querySelector('.circle'));
            var This = this;
            drag.init();
            drag.move = function (per) {
                This.progress.update(per)
                
            };
            drag.end = function (per) {
                var currTime = This.dataList[This.indexObj.index].duration * per;
                player.music.playTo(currTime);
                player.music.play();
                This.progress.move(per);
                This.controlList[2].className = 'playing';
                var deg = This.record.dataset.rotate || 0;
                This.imgRotate(deg);
            }

        },
        imgRotate: function (deg) {
            var This = this;
            clearInterval(this.timer);
            this.timer = setInterval(function () {
                deg = +deg + 0.2;
                This.record.style.transform = 'rotate(' + deg + 'deg)';
                This.record.dataset.rotate = deg;
            }, 1000 / 60)
        },
        imgStop: function () {
            clearInterval(this.timer);
        }

    }
    var musicPlayer = new MusicPlayer();
    musicPlayer.init();
})(window.Zepto, window.player);