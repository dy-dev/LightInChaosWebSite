/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).ready(function () {
    var randVal = getRandomInt(1, 2);
    var fileName = "videos/Mashup" + randVal;
  //  var fileName = "videos/BG";

    $('#mp4').attr("src", fileName + ".mp4");
    $('#wbm').attr("src", fileName + ".webm");
});
