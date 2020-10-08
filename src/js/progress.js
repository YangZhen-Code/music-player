(function (root) {
    var lock = true;
    function Progress() {

        this.duraTime = 0;
        this.frameId = null;
        this.startTime = 0;
        this.lastPro = 0;
        this.per = 0;
        this.init();
    }

    Progress.prototype = {
        init: function () {
            var This = this;
            this.getDom();

        },
        getDom: function () {
            this.currTime = document.querySelector('.currTime');
            this.totalTime = document.querySelector('.totalTime');
            this.circle = document.getElementsByClassName('circle')[0];
            this.frontBg = document.querySelector('.frontBg');
        },
        renderAllTime: function (time) {
            console.log(time)
            this.duraTime = time;
            this.totalTime.innerHTML = formatTime(this.duraTime);
        },
        move: function (per) {
            cancelAnimationFrame(this.frameId);
            this.lastPro = (per === undefined) ? this.lastPro : this.duraTime*per;
            var This = this;
            this.startTime = new Date().getTime();
            

            function frame() {
                var currTime = new Date().getTime() + This.lastPro * 1000 - This.startTime;
                This.per = currTime / (This.duraTime * 1000);
                This.frameId = requestAnimationFrame(frame);
                if (This.per <= 1 && lock) {
                    This.update(This.per)
                }
            }
            frame();
        },
        update: function (per) {
            var time = Math.round(this.duraTime * per);
            this.currTime.innerHTML = formatTime(time);
            this.frontBg.style.width = per * 100 + '%';
            var l = this.circle.parentNode.offsetWidth * per;
            console.log(l)
            this.circle.style.transform = 'translateX(' + l + 'px)';
        },
        stop: function () {
            cancelAnimationFrame(this.frameId);
            this.lastPro = this.duraTime * this.per;
        }

    }

    function instanseOfProgress() {
        return new Progress();
    };

    function Drag(obj) {
        this.obj = obj;
        this.startX = 0;
        this.startLeft = 0;
        this.present = 0;
    }
    Drag.prototype = {
        init:function(){
            var This = this;
            this.obj.style.transform = 'translateX(0)';
            console.log('init')
            this.obj.addEventListener('touchstart',function(ev){
                This.startX = ev.changedTouches[0].pageX;
                This.startLeft = parseFloat(this.style.transform.split('(')[1]);
                This.start && This.start();
            })
            this.obj.addEventListener('touchmove',function(ev){
                This.disX = ev.changedTouches[0].pageX - This.startX;
                var l = This.startLeft + This.disX;
                // console.log(l)
                if(l < 0){
                    l = 0;
                }else if(l > this.parentNode.offsetWidth){
                    l = this.parentNode.offsetWidth;
                }

                this.style.transform = 'translateX('+l+')';
                This.present = l/this.parentNode.offsetWidth;
                lock = false;
                This.move && This.move(This.present);
                ev.preventDefault();
            })

            this.obj.addEventListener('touchend',function(){
                This.end && This.end(This.present);
                lock = true;
            })
        }
    }

    function instanceOfDrag(obj) {
        return new Drag(obj);
    }

    //对时间以（00:00）格式化
    function formatTime(time) {
        var str = '';
        var m = Math.floor(time / 60);
        var s = time % 60;
        m = m > 9 ? m : '0' + m;
        s = s > 9 ? s : '0' + s;
        str = m + ':' + s;
        return str;
    }
    root.progress = {
        pro: instanseOfProgress,
        drag: instanceOfDrag
    }
})(window.player || (window.player = {}))