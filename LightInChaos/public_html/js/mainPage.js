/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
}());


$(window).on('load', function ()
{ // makes sure the whole site is loaded
    //
//    $('#preloader').css({opacity: '0.5'});

    $('#DropDown').css({opacity: 1});
    $('#DropDown').animate({height: '50%'}, 'slow', function () {

        curHeight = $('#DropDown').height();
        TotalHeight = $('#DropDown').height();

        function animate(height) {
            $('#DropDown').css({'height': height + 'px',
                'margin-top': (TotalHeight - height) + 'px'});
            $('#Circle').circleProgress({
                value: 100,
                size: 20,
                thickness: 10,
                fill: {
                    gradient: ["#6bc8e6", "#6bc8e6"]
                }
            });

            if (height > 0)
            {
                if (height < 20)
                {
                    setTimeout(function () {

                        function translate(x, y) {
                            if (x > $('#logo').offset().left + 2 * $('#logo').width() / 3 + 15 || y > $('#logo').offset().top + 40)
                            {
                                if (x > $('#logo').offset().left + 2 * $('#logo').width() / 3 + 15) {
                                    $('#Circle').css({'left': x + 'px'});
                                }
                                if (y > $('#logo').offset().top + 40) {
                                    $('#Circle').css({'top': y + 'px'});
                                }
                                requestAnimationFrame(function () {
                                    var tmpX = x - 20;
                                    var tmpY = y - 10;
                                    translate(tmpX, tmpY);
                                });
                            }
                            else
                            {
                               // $('#Circle').css({'left': '352px'});
                                //$('#Circle').css({'top': '203px'});
                                $('body').css({'overflow': 'visible'});

                                $('#preloader').delay(500).fadeOut('slow', function ()
                                {
                                    $('#backdiv').animate({opacity: '1'}, 'slow');
                                });
                            }
                        }
                        ;
                        curX = $('#Circle').offset().left;
                        curY = $('#Circle').offset().top;
                        translate(curX, curY);
                    }, 1000);
                    $('#DropDown').css({opacity: '0'});
                }
                else
                {
                    height -= 20;
                    requestAnimationFrame(function () {
                        animate(height);
                    });
                }
            }
        }
        animate(curHeight);
    });
});



$(document).ready(function () {

});

function revealShowreel()
{
    //$('.displayon').toggle(':visible');

    $('#video-filter').css('opacity') === "1" ? $('#video-filter').animate({opacity: 0}) : $('#video-filter').animate({opacity: 1});
    var newHeight = $("#ContentHolder").height();
    newHeight !== 0 ? newHeight = 0 : newHeight = '100%';

    $("#ContentHolder").animate({height: newHeight}, 300, function () {
        $('.barContainer').css('opacity') === "1" ? $('.barContainer').animate({opacity: 0}, 300 ,manageShowReelZIndex) : $('.barContainer').animate({opacity: 1},300,manageShowReelZIndex);

        
    });
}
;

function erase()
{
    $("#ContentHolder").width(0);
}

function manageShowReelZIndex()
{
            $('.background').css('opacity') === "1" ? $('.background').animate({opacity: 0}) : $('.background').animate({opacity: 1});
    $('#ShowReelPlayerHolder').css('z-index') === "0" ? $('#ShowReelPlayerHolder').css({'z-index': 50}) : $('#ShowReelPlayerHolder').css({'z-index': 0});
}

function displayAbout()
{
    $("#InfosBar").slideToggle();
}
