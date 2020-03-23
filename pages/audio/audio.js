// pages/audio/audio.js

//声明audio
var audio = {};
var audioList = [
  {
    poster: 'https://p3fx.kgimg.com/stdmusic/20191108/20191108161628273583.jpg',
    name: '桥边姑娘',
    author: '张茜',
    src: 'https://webfs.yun.kugou.com/202003231453/cb8c67b2231b9e6fe622e07be9beb130/G180/M07/04/08/9A0DAF3FKAqATsbCACy595OooJM759.mp3',
  },{
    poster: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000000EI9tu27e5iy.jpg?max_age=2592000',
    name: "少年",
    author: '梦然',
    src: "https://webfs.yun.kugou.com/202003231459/8f053352487bd65596db0a01a4428c3f/G170/M07/16/11/SocBAF3H3aqAUYOEADmpdloW3bU827.mp3"
  }, {
    poster: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000001r6H560AOJMq.jpg?max_age=2592000',
    name: "芒种",
    author: '腾格尔',
    src: "http://ws.stream.qqmusic.qq.com/C4000028eLE80E7F02.m4a?guid=3824832145&vkey=BC8178297C4ED3C6E28F213005553FC4BDD61ED06E436F042F32EDDDF9F654F12B08690CA4AFFC65BC5860D553E9A6A202F89D242BE23B70&uin=7383&fromtag=66"
  }, {
    poster: 'https://p3fx.kgimg.com/stdmusic/20200211/20200211211039345221.jpg',
    name: "最美的伤口",
    author: '最美的伤口',
    src: "https://webfs.yun.kugou.com/202003231447/34cceec47365f8f76f21d5d04cb3cd76/G192/M06/0C/1F/YIcBAF5CpduAP7AiACucQG42EYM045.mp3"
  }, {
    poster: 'https://p3fx.kgimg.com/stdmusic/240/20200104/20200104130421411707.jpg',
    name: "一个人挺好",
    author: '杨小壮',
    src: "https://webfs.yun.kugou.com/202003231505/1382e381808e279791c424457de6887b/G166/M09/10/07/5g0DAF1TbqmAJ8zhAEHuiqN03YQ912.mp3"
  }, {
    poster: 'https://p3fx.kgimg.com/stdmusic/20190605/20190605155235947489.jpg',
    name: "芒种",
    author: '芒种',
    src: "https://webfs.yun.kugou.com/202003231502/e10785d1677c5a11d2a5997189d65619/G153/M04/13/14/OYcBAFz3fF6AbF0fADS_2OPt0ag626.mp3"
  }

];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    current: 1,//从第一首歌播放
    slide_length:0,
    duration:200,
    poster: audioList[0].poster,
    name: audioList[0].name,
    author: audioList[0].author,
    src: audioList[0].src,
    images:[],
  },

  //播放
  audioPlay:function(){
    this.audio.play();
  },
  audioPause:function(){
    this.audio.pause();
  },
  audioStart:function(){
    this.audio.seek(0);
  },
  audioNext:function(res){
    let id = +res.target.dataset.id;//转为number类型
    console.log(id);
    let next = id;
    let audios_length = audioList.length;
    next = next < audios_length ? next : (next == audios_length ? 0 : next);

    let current = id + 1;
    current = current <= audios_length ? current : 1;
    this.setData({
      current: current,
      slide_length: 0,
      poster: audioList[next].poster,
      name: audioList[next].name,
      author: audioList[next].author,
      src: audioList[next].src,
    });
    this.audio.play();
  },
  //播放到end触发事件
  audioEnd:function(res){
    //console.log(res);
    let current = +res.target.dataset.id;//转为number类型
    let length = audioList.length;
    let song = audioList[0];
    let next = current + 1;
    //console.log(next ,length);
    if (next <= length){
      wx.showToast({
        title: '正在播下一首歌..',
      });
      //下一首歌
      song = audioList[current];
      this.setData({
        current: next
      });
    }else{
      this.setData({
        current : 1
      });
    }
    this.setData({
      poster: song.poster,
      name: song.name,
      author: song.author,
      src: song.src,
      slide_length: 0,
      duration: 0
    });
    
    this.audio.play();
  },

  //播放进度
  jindu:function(res){
    //console.log(res);
    this.setData({
      slide_length: res.detail.currentTime,
      duration: res.detail.duration
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //视频
    this.videoContext = wx.createVideoContext('myVideo');

    this.audio = wx.createAudioContext('myAudio');
    //自动播放
    this.audio.play();

    let that = this;
    //图片加载
    wx.request({
      url: 'https://apii.79bk.cn/imgj.php',
      success:function(res){
        //console.log(res)
         that.setData({
           images:res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})