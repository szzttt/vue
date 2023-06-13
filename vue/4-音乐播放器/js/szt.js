/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/
var szt = new Vue({
    el: '#player',
    data: {
        sousha: '林俊杰',
        gedan: [],
        dizhi: "",
        tu: "",
        ping: [],
        isplay: false,
        mvdizhi: '',
        isshow: false
    },
    methods: {
        sousuo: function () {
            var that = this;
            axios.get('https://autumnfish.cn/search?keywords=' + this.sousha).then(
                function (response) {

                    that.gedan = response.data.result.songs
                },
                function (err) { }

            )

        },
        fang: function (id) {
            var that = this;
            axios.get('https://autumnfish.cn/song/url?id=' + id).then(
                function (response) {
                    that.dizhi = response.data.data[0].url
                },
                function (err) {

                }

            )
            axios.get('https://autumnfish.cn/song/detail?ids=' + id).then(
                function (response) {

                    that.tu = response.data.songs[0].al.picUrl
                },
                function (err) { }
            )
            axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + id).then(
                function (response) {

                    that.ping = response.data.hotComments
                },
                function (err) { }
            )

        },
        play: function () {
            this.isplay = true;
        },
        pause: function () {
            this.isplay = 0;
        },
        fangmv: function (id) {
            var that = this;

            axios.get("https://autumnfish.cn/mv/url?id=" + id).then(
                function (response) {
                    that.isshow = true;
                    that.mvdizhi = response.data.data.url
                }, function (err) { }
            )
        },
        hide: function () {
            this.isshow = 0;
        }




    }

})