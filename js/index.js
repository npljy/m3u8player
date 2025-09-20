
/**
 * 获取指定参数的单个值
 * @param {string} name - 参数名
 * @param {string} url - 要解析的URL，默认为当前页面URL
 * @returns {string|null} 参数值，如果不存在则返回null
 */
function getQueryStringParam(name, url = window.location.href) {
  // 创建正则表达式，匹配指定参数
  const regex = new RegExp(`[?&]${name}=([^&]*)`);
  const match = url.match(regex);

  return match ? decodeURIComponent(match[1]) : null;
}


let player = undefined;

function play() {
  const ipt = document.getElementById('url');
  const url = ipt.value?.trim()
  if (!url) {
    alert("请输入m3u8播放地址");
    return;
  }

  if (player === undefined) {
    player = TCPlayer('player-container-id', {
      sources: [{
        src: url,
      }],
      // licenseUrl需自己去腾讯云申请
      licenseUrl: 'https://license.vod2.myqcloud.com/license/v2/1257958038_1/v_cube.license'
    });
  }

  player.pause();
  player.src(url); // url 播放地址
}


document.addEventListener('DOMContentLoaded', function () {





  const loc = window.location.origin + window.location.pathname;
  const ipt = document.getElementById('url');
  const pre = document.getElementById('pre');
  const locUrl = getQueryStringParam('url')





  if (locUrl) {
    ipt.value = locUrl?.trim()
    pre.innerHTML = `&lt;iframe src="${loc}?url=${ipt.value?.trim()}"&gt;&lt;/iframe&gt;`;
  } else {
    pre.innerHTML = `&lt;iframe src="${loc}?url=https://****.m3u8"&gt;&lt;/iframe&gt;`;
  }

  ipt.oninput = function () {
    if (ipt.value) {
      pre.innerHTML = `&lt;iframe src="${loc}?url=${ipt.value?.trim()}"&gt;&lt;/iframe&gt;`;
    } else {
      pre.innerHTML = `&lt;iframe src="${loc}?url=https://****.m3u8"&gt;&lt;/iframe&gt;`;
    }
  };

})

