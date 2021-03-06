/* eslint-env browser */

var getParameters = function (paramName) {
  // 리턴값을 위한 변수 선언
  var returnValue;

  // 현재 URL 가져오기
  var url = location.href;

  // get 파라미터 값을 가져올 수 있는 ? 를 기점으로 slice 한 후 split 으로 나눔
  var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');

  // 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return
  for (var i = 0; i < parameters.length; i++) {
    var varName = parameters[i].split('=')[0];
    if (varName.toUpperCase() == paramName.toUpperCase()) {
      returnValue = parameters[i].split('=')[1];
      return decodeURIComponent(returnValue);
    }
  }
};

/////////////////////////////////////
const REMOTE_DIR = 'http://ec2-52-79-228-242.ap-northeast-2.compute.amazonaws.com:8080/output'

var img_id = getParameters('img_id');
var img_picked = getParameters('img_picked');

var croppedUrl = `${REMOTE_DIR}/${img_id}_${img_picked}.jpg`;
var sourceUrl = decodeURIComponent(getParameters('original'));
var title = decodeURIComponent(getParameters('title').replace(/\+/g, '%20'));

// croppedUrl = './cropped-example.jpg';
// sourceUrl = './source-example.jpg';

document.querySelector('#source_img').src = sourceUrl;
document.querySelector('#cropped_img').src = croppedUrl;
document.querySelector('.message > span').textContent = title;

// orignal : 카톡 서버에 있는 원본 사진 url
// https://ec2-52-79-228-242.ap-northeast-2.compute.amazonaws.com/output/img_id + '_' + 'img_picked' : 크롭된(picked) 사진 url
