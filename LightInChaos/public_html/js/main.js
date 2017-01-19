var breakBigScreen = 1500;
var breakMediumScreen = 1310;
var breakTabletAndSmallScreen = 900;
var breakPhoneScreen = 500;

var coeffSlowBigToMedium = 100 / (breakBigScreen - breakMediumScreen);
var coeffSpeedBigToMedium = 134 / (breakBigScreen - breakMediumScreen);
var coeffMediumToTablette = 45 / (breakMediumScreen - breakTabletAndSmallScreen);

$(window).on('load', function ()
{ // makes sure the whole site is loaded 

    if ($("#canvasHolder").hasClass("finished"))
    {
        finishUp();
    }
    else
    {
        $("#preloader").addClass('remove');
    }
});

function finishUp()
{
    $('#info-opener').animate({opacity: '1'}, 'slow');

    $('body').css({'overflow': 'visible'});

    $('#preloader').delay(500).fadeOut('slow', function ()
    {
        $('#backdiv').animate({opacity: '1'}, 'slow');
        $('#status').delay(500).fadeOut('slow');
    });
}

$(document).ready(function ()
{
    $('#sidebar').css({left: getDivPosition($('#sidebar'))});
    $('#status').css({left: getDivPosition($('#sidebar'))});
    var finalHeight = ($('#status').height());
    var finalWidth = ($('#status').width());
    $('#status').width('3px');
    $('#status').height('0px');
    $('#status').css("opacity", 1);
    $('#my-video').backgroundVideo();
    $('.service-list').toggle('height');
    $('#info-content').css({left: '-500px'});
    $('#horiz-line').toggle('width');
    $('#vert-line').toggle('height');
    $('#left-line').toggle('width');
    $('#right-line').toggle('width');
    $('#manifest-bar').css({left: '-500px'});
    $('#info-bar').toggle('visibility');
    $('#logo-phrase').css("opacity", 0);
    $('#info-opener').css("opacity", 0);
    $(window).scroll(checkTopPos);
    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: 160
    });
    $('#status').animate({height: finalHeight}, 'slow');
    $('#status').animate({width: finalWidth}, 'slow', function () {

        $('#wrapper-bars').removeClass('onload');
        $('#logo-phrase').animate({opacity: '1'}, {
            duration: 2500,
            specialEasing: {
                opacity: "swing"
            }});

        $('#canvasHolder').animate({opacity: '1'}, {complete: function ()
            {
                $('#circle').circleProgress({
                    value: 100,
                    size: 77,
                    thickness: 1,
                    fill: {
                        gradient: ["white", "white"]
                    }
                });
                setTimeout(function () {
                    var newLeft = $('#arrow-img').position().left + 60;
                    $('#arrow-img').animate({left: newLeft + 'px'}, 300, function ()
                    {
                        if (!$("#preloader").hasClass('remove'))
                        {
                            $("#canvasHolder").addClass("finished");
                        }
                        else
                        {
                            finishUp();
                        }
                    });
                }, 1000);
            }});
        if ($("#canvasHolder").hasClass("finished") && $("#preloader").hasClass('remove'))
        {
            finishUp();
        }
    });
});

$('a[href^="#"]').on('click', function (event) {
    var target = $(this.getAttribute('href'));
    var offset = 180;
    console.log(target.offset().top);
    console.log($('#video-wrap').offset().top);
    if (target.attr('id') === $('#video-wrap').attr('id'))
    {
        offset = -10;
    }
    if (target.length) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top - offset
        }, 1000);
    }
});


$('.custom-button').mouseenter(function () {
    if ($(this).hasClass('custom-open-button') && !$(this).hasClass('animate-open-button'))
    {
        $(this).addClass('animate-open-button');
    }
});

$('.custom-button').click(function ()
{
    var myDivName = $(this).get(0).getAttribute("data-div");
    var myParentName = $(this).get(0).getAttribute("data-parent");
    var myDiv = document.getElementById(myDivName);
    var myParent = document.getElementById(myParentName);
    if ($(myParent).hasClass('primary-bloc'))
    {
        var leftDivPos = getDivPosition($(myDiv));
        $(myDiv).animate({left: leftDivPos + 'px'});
        console.log("left div pos : " + leftDivPos);

        var leftParentPos = getDivPosition($(myParent), true);
        $(myParent).animate({left: leftParentPos + 'px'});

        $(this).removeClass('custom-open-button');
        $(this).removeClass('animate-open-button');
        $(this).addClass('custom-close-button');

        $(myParent).removeClass('primary-bloc');
        $(myDiv).addClass('primary-bloc');
    }
    else
    {
        var width = window.innerWidth;
        if (width > breakTabletAndSmallScreen && !($(myDiv).hasClass('primary-bloc')))
        {
            var myDivDependantName = $(this).get(0).getAttribute("data-div-control");
            if (typeof myDivDependantName === 'string' || myDivDependantName instanceof String)
            {
                var myDivDependant = document.getElementById(myDivDependantName);
                if ($(myDivDependant).position().left !== 0)
                {
                    $(myDiv).find('.custom-button').click();
                }
            }
        }
        var leftParentPos = getDivPosition($(myParent), true);
        console.log(leftParentPos);
        $(myParent).animate({left: leftParentPos + 'px'});

        var leftDivPos = getDivPosition($(myDiv));
        $(myDiv).animate({left: leftDivPos + 'px'});

        $(this).removeClass('custom-close-button');
        $(this).addClass('custom-open-button');


        $(myParent).addClass('primary-bloc');
        $(myDiv).removeClass('primary-bloc');
        /*
         if ($(myParent).offset().left < 0)
         {
         $(myParent).css({marginLeft: '0px', marginRight: '0px'});
         $(myParent).animate({left: ($(window).width() / 2 - $(myParent).width() / 2) + 'px'}, function () {
         console.log('1');
         $(myParent).css({marginLeft: '', marginRight: ''});
         $(myParent).css({left: ''});
         // window.onresize();
         
         });
         }*/

    }
    // window.onresize();


});

$('.close-icon').click(function ()
{
    var myButtonName = $(this).get(0).getAttribute("data-correspond-button");

    var myButton = document.getElementById(myButtonName);
    $(myButton).click();
});

$('.close-icon').hover(function ()
{
    var endAngle = -45;
    var curAngle = 45;
    var marginTop = parseInt($(this).css('margin-top'), 10);
    var marginRight = parseInt($(this).css('margin-right'), 10);
    console.log(marginTop);
    console.log(marginRight);
    function animate(icon, current) {
        var deltapx = Math.cos((current * Math.PI) / 180) * 12.02 - 8.5;
        var deltatop = marginTop - deltapx;
        var deltaright = marginRight - deltapx;

        if (current >= 0)
        {
            icon.css({
                width: 2 * Math.cos((current * Math.PI) / 180) * 12.02,
                height: 2 * Math.cos((current * Math.PI) / 180) * 12.02,
                margin: deltatop + "px " + deltaright + "px 0px 0px",
                background: "linear-gradient(-" + current + "deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 46%, #000000 46%, #aeaeae 56%, rgba(0, 0, 0, 0) 56%, rgba(0, 0, 0, 0) 100%), \n\
linear-gradient(" + current + "deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 46%, #000000 46%, #727272 56%, rgba(0, 0, 0, 0) 56%, rgba(0, 0, 0, 0) 100%)"
            });
        }
        else
        {
            tmp = -current;

            icon.css({width: 2 * Math.cos((current * Math.PI) / 180) * 12.02,
                height: 2 * Math.cos((current * Math.PI) / 180) * 12.02,
                margin: deltatop + "px " + deltaright + "px 0px 0px",
                background: "linear-gradient(-" + tmp + "deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 46%, #000000 46%, #aeaeae 56%, rgba(0, 0, 0, 0) 56%, rgba(0, 0, 0, 0) 100%), \n\
linear-gradient(" + tmp + "deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 46%, #000000 46%, #727272 56%, rgba(0, 0, 0, 0) 56%, rgba(0, 0, 0, 0) 100%)"
            });
        }
        if (current > endAngle) {
            requestAnimationFrame(function () {
                current -= 3;
                animate(icon, current);
            });
        }
    }
    animate($(this), curAngle);
});


function getDivPosition(myDiv, isParent)
{
    var width = window.innerWidth;
    if (width <= breakPhoneScreen)
    {
        if (myDiv.get(0) === $('#sidebar').get(0))
        {
            if ($('#sidebar').hasClass('primary-bloc'))
            {
                return -$('#sidebar').width();
            }
            else
            {
                return 0;
            }
        }
        else if (myDiv.get(0) === $('#info-content').get(0))
        {
            if ($('#info-content').hasClass('primary-bloc'))
            {
                $('#info-content').css({top: 0, width: '100%', height: '100%'});
                return -$('#info-content').width();
                ;
            }
            else if ($('#manifest-bar').hasClass('primary-bloc'))
            {
                $('#info-content').css({top: 0, width: '100%', height: '100%'});
                return 0;
            }
            else
            {
                $('#info-content').parent().css({left: 0, top: 0, width: '100%', height: '100%'});
                $('#info-content').css({top: 0, width: '100%', height: '100%'});
                return 0;
            }
        }
        else if (myDiv.get(0) === $('#manifest-bar').get(0))
        {
            $('#manifest-bar').css({top: 0, width: '100%', height: '100%'});
            if ($('#manifest-bar').hasClass('primary-bloc'))
            {
                return -$('#manifest-bar').width();
            }
            else
            {
                return 0;
            }
        }
    }
    /* else if (width >= 1030 && width < 1310)
     {
     if (myDiv === $('#sidebar').get(0))
     {
     return 20;
     }
     else if (myDiv === $('#info-content').get(0))
     {
     if (($('#manifest-bar').hasClass('primary-bloc')) ||
     (($('#sidebar').hasClass('primary-bloc')) && !$('#info-content').hasClass('resizing')) ||
     isParent ||
     ($('#info-content').hasClass('resizing') && $('#info-content').position().left !== -500))
     {
     return 808;
     }
     }
     else if (myDiv === $('#manifest-bar').get(0))
     {
     
     }
     }*/
    else if (width > breakPhoneScreen && width < breakTabletAndSmallScreen)
    {
         if ((myDiv.hasClass('primary-bloc'))) 
         {
            myDiv.css({left: '0'});
            myDiv.css({marginLeft: 'auto', marginRight: 'auto'});
        }
    }
    else if (width >= breakTabletAndSmallScreen)
    {
        var deltaLeft = 100;
        if (width < breakBigScreen && width >= breakMediumScreen)
            deltaLeft = (coeffSlowBigToMedium * width - 695);
        else if (width >= breakTabletAndSmallScreen && width < breakMediumScreen)
            deltaLeft = 0;
        

        if (myDiv.get(0) === $('#sidebar').get(0))
        {
            return deltaLeft + 20;
        }
        else if (myDiv.get(0) === $('#info-content').get(0))
        {
            if ((($('#info-content').hasClass('primary-bloc') && !$('#info-content').hasClass('resizing')) || ($('#manifest-bar').hasClass('primary-bloc')) && !isParent) &&
                    width >= breakTabletAndSmallScreen && width < breakMediumScreen)
                deltaLeft = -1207;

            console.log("$('#info-content').hasClass('primary-bloc') = " + $('#info-content').hasClass('primary-bloc') + " , ($('#manifest-bar').hasClass('primary-bloc')) : " + ($('#manifest-bar').hasClass('primary-bloc')));
            if (($('#manifest-bar').hasClass('primary-bloc')) ||
                    (($('#sidebar').hasClass('primary-bloc')) && !$('#info-content').hasClass('resizing')) ||
                    isParent ||
                    ($('#info-content').hasClass('resizing') && $('#info-content').position().left !== -500))
            {
                return deltaLeft + 807;
            }
            else
            {
                return -500;
            }

        }
        else if (myDiv.get(0) === $('#manifest-bar').get(0) )
        {
            if (width < breakBigScreen && width >= breakMediumScreen)
                deltaLeft = coeffSpeedBigToMedium * width - 950;
            else if (width >= breakTabletAndSmallScreen && width < breakMediumScreen)
                deltaLeft = coeffMediumToTablette * width - 544;
            console.log(deltaLeft);
            if (($('#manifest-bar').hasClass('primary-bloc') && !$('#manifest-bar').hasClass('resizing')) ||
                    ($('#manifest-bar').hasClass('resizing') && $('#manifest-bar').position().left === -500))
            {
                return -500;
            }
            else
            {
                return deltaLeft + 1290;
            }
        }
    }
}
;

window.onresize = function (event)
{
    $('#sidebar').addClass('resizing');
    $('#info-content').addClass('resizing');
    $('#manifest-bar').addClass('resizing');

    $('#sidebar').css({left: getDivPosition($('#sidebar')) + 'px'});
    $('#info-content').css({left: getDivPosition($('#info-content')) + 'px'});
    $('#manifest-bar').css({left: getDivPosition($('#manifest-bar')) + 'px'});

    $('#sidebar').removeClass('resizing');
    $('#info-content').removeClass('resizing');
    $('#manifest-bar').removeClass('resizing');

    /*
     
     else if (width < 1030 && width >= 850 && $("#info-content").is(":visible"))
     {
     var deltaLeft = (0.54 * width - 456);
     if ($('#sidebar').offset().left < 0)
     {
     $('#sidebar.custom-button').removeClass('custom-close-button');
     $('#sidebar.custom-button').addClass('custom-open-button');
     
     $('#sidebar').css({left: ''});
     $('#sidebar').css({marginLeft: '', marginRight: ''});
     }
     else
     {
     console.log('sidebar is visible');
     $('#sidebar').css({left: 20 + deltaLeft + 'px'});
     }
     $('#info-content').css({left: 807 + deltaLeft + 'px'});
     }
     else if (width < 850 && $("#info-content").is(":visible"))
     {
     if ($("#sidebar").is(":visible"))
     {
     $('#sidebar.custom-button').removeClass('custom-open-button');
     $('#sidebar.custom-button').removeClass('animate-open-button');
     $('#sidebar.custom-button').addClass('custom-close-button');
     
     $('#sidebar').animate({left: -$('#sidebar').width() + 'px'});
     $('#sidebar').css({marginLeft: '1px', marginRight: '1px'});
     
     }
     //        
     var divLeftPos = $(window).width() / 2 - $('#info-content').width() / 2 - $('#info-content').parent().position().left;
     $('#info-content').css({left: divLeftPos + 'px'});
     
     }
     else {
     $('#sidebar').css({left: ''});
     console.log('2');
     }*/
};

function manageInfoDisplay()
{
    /*  if ($("#text-bar").is(":visible"))
     {
     toggle('#text-bar');
     }
     toggle('#info-bar');*/
}
function checkTopPos()
{
    /*var height = $(window).scrollTop();
     
     if (height > 0)
     {
     $('nav').removeClass('active');
     $('.wrapper').removeClass('active');
     $('#logo_container').removeClass('active');
     }
     else
     {
     $('nav').addClass('active');
     $('.wrapper').addClass('active');
     $('#logo_container').addClass('active');
     }*/
}


//$('#sidebar-button').click(toggle('#info-content'));
//function toggle(myDiv)
//{
//    if (!$("info-bar").is(":visible"))
//    {
//        $("info-bar").toggle('visibility');
//    }
//  $(myDiv).animate({width: 'toggle'});
//   $(myDiv).animate({left: 'toggle'});
//alert(this.id);

//}



function myCircle()
{
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    $('#canvas-clamp').height($('#sidebar-button').height());
    //$('#canvas-clamp').width($('#sidebar-button').width());
    context.canvas.width = $('#canvas-clamp').width();
    context.canvas.height = $('#canvas-clamp').height() + 4;
    createCircle();
    function createCircle() {
        var radius = $('#sidebar-button').height() / 2.0;
        var x = canvas.width / 2;
        var y = radius + 2;
        // var y = 3.93 * canvas.height / 6;
        var endPercent = 101;
        var curPerc = 0;
        var circ = Math.PI * 2;
        var quart = Math.PI / 2;
        context.lineWidth = 2;
        context.strokeStyle = '#FFFFFF';
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        function animate(current) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();
            context.arc(x, y, radius, -(quart), ((circ) * current) - quart, false);
            context.stroke();
            curPerc++;
            if (curPerc < endPercent) {
                requestAnimationFrame(function () {
                    animate(curPerc / 100);
                });
            }
            else
            {
                if (!$("#preloader").hasClass('remove'))
                {
                    $("#canvasHolder").addClass("finished");
                }
                else
                {
                    finishUp();
                }
            }
        }
        animate();
    }
}