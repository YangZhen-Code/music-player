(function (root) {
    //渲染图片
    function renderImg(src) {
        root.blurImg(src);
        var img = document.querySelector('.songImg img');
        img.src = src;
    }

    //渲染音乐信息
    function renderMusicInfo(data) {
        var songInfoChildren = document.querySelector('.songInfo').children;
        songInfoChildren[0].innerHTML = data.name;
        songInfoChildren[1].innerHTML = data.singer;
        songInfoChildren[2].innerHTML = data.album;
    }

    //渲染是否喜欢
    function renderIsLike(isLike) {
        var lis = document.querySelector('.control').children;
        lis[0].className = isLike ? 'liking' : '';
    }

    //导出函数
    root.render = function(data){
        renderImg(data.image);
        renderMusicInfo(data);
        renderIsLike(data.isLike);
    }

})(window.player || (window.player = {}));