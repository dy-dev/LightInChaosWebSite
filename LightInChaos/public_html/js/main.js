var breakBigScreen = 1500;
var breakMediumScreen = 1310;
var breakTabletAndSmallScreen = 900;
var breakPhoneScreen = 500;

var coeffSlowBigToMedium = 100 / (breakBigScreen - breakMediumScreen);
var coeffSpeedBigToMedium = 134 / (breakBigScreen - breakMediumScreen);
var coeffSlowMediumToTablette = 100 / (breakMediumScreen - breakTabletAndSmallScreen);
var coeffMediumToTablette = 232 / (breakMediumScreen - breakTabletAndSmallScreen);

var breakBigScreenHeight = 900;
var breakMediumScreenHeight = 650;
var breakSmallScreenHeight = 320;

function getElementValBigToMedium(MaxSideBarHeight, MinSideBarHeight, CurrentoDocHeight)
{
    return ((MaxSideBarHeight - MinSideBarHeight) / (breakBigScreenHeight - breakMediumScreenHeight)) * (CurrentoDocHeight - breakMediumScreenHeight) + MinSideBarHeight;
}

function getElementValMediumToSmall(MaxSideBarHeight, MinSideBarHeight, CurrentoDocHeight)
{
    return ((MaxSideBarHeight - MinSideBarHeight) / (breakMediumScreenHeight - breakSmallScreenHeight)) * (CurrentoDocHeight - breakSmallScreenHeight) + MinSideBarHeight;
}

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
    // $('#preloader').css({opacity: '0.5'});

    $('#preloader').delay(500).fadeOut('slow', function ()
    {
        $('#backdiv').animate({opacity: '1'}, 'slow');
        $('#status').delay(500).fadeOut('slow');
        window.onresize();
    });
}


$(document).ready(function ()
{
    $(document).swipe({
        //Generic swipe handler for all directions
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            if (direction === 'left')
            {
                $('.primary-bloc').find($('.custom-button')).get(0).click();
            }
            else if (direction === 'right')
            {
                $('.primary-bloc').find($('.close-icon')).get(0).click();
            }
        }
    });


    $('#sidebar').addClass('resizing');
    $('#status').addClass('resizing');
    $('#sidebar').css({left: getDivPosition($('#sidebar'))});
    $('#status').css({left: getDivPosition($('#sidebar'))});
    $('#sidebar').css({height: getDivVerticalDimAndPos($('#sidebar'))[0] + 'px'});
    $('#sidebar').css({top: getDivVerticalDimAndPos($('#sidebar'))[1] + 'px'});
    $('#status').css({height: getDivVerticalDimAndPos($('#sidebar'))[0] + 'px'});
    $('#status').css({top: getDivVerticalDimAndPos($('#sidebar'))[1] + 'px'});

    $('#sidebar').removeClass('resizing');
    $('#status').removeClass('resizing');
    var finalHeight = ($('#status').height());
    var finalWidth = ($('#status').width());
    if (window.innerWidth < breakPhoneScreen)
    {
        $('#arrow-img').css({left: window.innerWidth / 2 - $('#arrow-img').width() / 2 - 58 + 'px'});
        $('#button-cache').css({left: window.innerWidth / 2 - $('#button-cache').width() / 2 + 'px'});
    }
    if (window.innerHeight < breakBigScreenHeight && window.innerHeight > breakMediumScreenHeight)
    {
        var arrowTop = $('#arrow-img').position().top;
        var buttonTop = $('#button-cache').position().top;
        $('#arrow-img').css({top: getElementValBigToMedium(476, 442, window.innerHeight) + 'px'});
        $('#button-cache').css({top: getElementValBigToMedium(442, 409, window.innerHeight) + 'px'});
    }
    adaptSideBarElement();
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
        if (window.innerWidth < breakPhoneScreen)
        {
            $('#button-cache').css({top: $('#info-opener').offset().top - 1 + 'px'});
            $('#arrow-img').css({top: $('#info-opener').offset().top + $('#button-cache').height() / 2 - $('#arrow-img').height() / 2 - 1 + 'px'});
        }
        $('#logo-phrase').animate({opacity: '1'}, {
            duration: 2500,
            specialEasing: {
                opacity: "swing"
            }});
        $('#canvasHolder').animate({opacity: '1'}, {complete: function ()
            {
                statusCircleSize = window.innerHeight < breakMediumScreenHeight ? getElementValMediumToSmall(77, 60, window.innerHeight) : 77;
                $('#circle').circleProgress({
                    value: 100,
                    size: statusCircleSize,
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
                            if (window.innerWidth < breakPhoneScreen)
                            {
                                $('#sidebar').css({height: finalHeight, width: finalWidth});
                                $('#wrapper-bars').css({height: finalHeight, width: finalWidth});
                            }
                            finishUp();
                            if (window.innerWidth < breakPhoneScreen)
                            {
                                $('#sidebar').css({height: '', width: ''});
                                $('#wrapper-bars').css({height: '', width: ''});
                            }
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
        $(myDiv).addClass('opening-bloc');
        $(myDiv).animate({left: leftDivPos + 'px'});
        var leftParentPos = getDivPosition($(myParent), true);
        $(myParent).animate({left: leftParentPos + 'px'});

        var width = window.innerWidth;
        if (width > breakTabletAndSmallScreen && width <= breakBigScreen && $(myParent).get(0) === $('#info-content').get(0))
        {
            var leftSideBar = getDivPosition($('#sidebar'), true);
            $('#sidebar').animate({left: leftSideBar + 'px'});
        }

        $(this).removeClass('custom-open-button');
        $(this).removeClass('animate-open-button');
        $(this).addClass('custom-close-button');
        $(myParent).removeClass('primary-bloc');
        $(myDiv).addClass('primary-bloc');
        $(myDiv).removeClass('opening-bloc');

    }
    else
    {
        $(myDiv).addClass('closing-bloc');
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
        $(myParent).animate({left: leftParentPos + 'px'});
        var leftDivPos = getDivPosition($(myDiv));
        $(myDiv).animate({left: leftDivPos + 'px'});

        var width = window.innerWidth;
        if (width > breakTabletAndSmallScreen && width <= breakBigScreen && $(myParent).get(0) === $('#info-content').get(0))
        {
            var leftSideBar = getDivPosition($('#sidebar'), true);
            $('#sidebar').animate({left: leftSideBar + 'px'});
        }

        $(this).removeClass('custom-close-button');
        $(this).addClass('custom-open-button');
        $(myParent).addClass('primary-bloc');
        $(myDiv).removeClass('primary-bloc');
        $(myDiv).removeClass('closing-bloc');
    }
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

//    function animate(icon, current) {
//        var deltapx = Math.cos((current * Math.PI) / 180) * 12.02 - 8.5;
//        var deltatop = marginTop - deltapx;
//        var deltaright = marginRight - deltapx;
//        if (current >= 0)
//        {
//            icon.css({
//                width: 2 * Math.cos((current * Math.PI) / 180) * 12.02,
//                height: 2 * Math.cos((current * Math.PI) / 180) * 12.02,
//                margin: deltatop + "px " + deltaright + "px 0px 0px",
//                background: "linear-gradient(-" + current + "deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 46%, #000000 46%, #aeaeae 56%, rgba(0, 0, 0, 0) 56%, rgba(0, 0, 0, 0) 100%), \n\
//linear-gradient(" + current + "deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 46%, #000000 46%, #727272 56%, rgba(0, 0, 0, 0) 56%, rgba(0, 0, 0, 0) 100%)"
//            });
//        }
//        else
//        {
//            tmp = -current;
//            icon.css({width: 2 * Math.cos((current * Math.PI) / 180) * 12.02,
//                height: 2 * Math.cos((current * Math.PI) / 180) * 12.02,
//                margin: deltatop + "px " + deltaright + "px 0px 0px",
//                background: "linear-gradient(-" + tmp + "deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 46%, #000000 46%, #aeaeae 56%, rgba(0, 0, 0, 0) 56%, rgba(0, 0, 0, 0) 100%), \n\
//linear-gradient(" + tmp + "deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 46%, #000000 46%, #727272 56%, rgba(0, 0, 0, 0) 56%, rgba(0, 0, 0, 0) 100%)"
//            });
//        }
//        if (current > endAngle) {
//            requestAnimationFrame(function () {
//                current -= 3;
//                animate(icon, current);
//            });
//        }
//    }
//    animate($(this), curAngle);
});

function getDivPosition(myDiv, isParent)
{
    var width = window.innerWidth;
    //If div is not resizing and is primary bloc when function is called, it is on the verge of giving
    ///the primary class to its child div so in small resolution it will have to be hidden
    //If the div is not primary class and we are at small resolution, during resize it must stay hidden
    var hideDiv = (myDiv.hasClass('primary-bloc')) && !(myDiv.hasClass('resizing')) ||
            (!(myDiv.hasClass('primary-bloc')) && (myDiv.hasClass('resizing')));
    //reset the margin in case of resize that leave the breakPhone < - > breakTablette limit
    myDiv.css({marginLeft: '', marginRight: ''});
    if (width < breakTabletAndSmallScreen)
    {
        console.log($('#sidebar').height());
        //The div must be centered if the window size is between phone and tablette
        if (width > breakPhoneScreen && width < breakTabletAndSmallScreen)
        {
            myDiv.css({marginLeft: 'auto', marginRight: 'auto'});
        }
        if (hideDiv)
        {
            return -700;
        }
        else
        {
            if (myDiv.get(0) === $('#sidebar').get(0))
            {
                if (width > breakPhoneScreen && width < breakTabletAndSmallScreen)
                { //Status must be updated so it is look nice on first load
                    $('#status').css({marginLeft: 'auto', marginRight: 'auto'});
                }
                return 0;
            }
            else if (myDiv.get(0) === $('#info-content').get(0))
            {
                return -$('#info-bar').position().left;
            }

            else if (myDiv.get(0) === $('#manifest-bar').get(0))
            {
                return $(window).width() / 2 - myDiv.width() / 2 - $('#info-bar').position().left;
            }
        }
    }
    else if (width >= breakTabletAndSmallScreen)
    {
        var deltaLeft = 100;
        //left div positionning is different according to the size area 
        if (width < breakBigScreen && width >= breakMediumScreen)
            deltaLeft = (coeffSlowBigToMedium * width - 695);
        else if (width >= breakTabletAndSmallScreen && width < breakMediumScreen)
        {
            deltaLeft = coeffSlowMediumToTablette * width - 220;
        }

        console.log(myDiv);
        console.log("(myDiv.get(0) === $('#sidebar').get(0) && $('#sidebar').hasClass('primary-bloc')) : " + (myDiv.get(0) === $('#sidebar').get(0) && $('#sidebar').hasClass('primary-bloc')));
        console.log("(myDiv.get(0) === $('#sidebar').get(0) && $('#info-content').hasClass('primary-bloc') && ($('#manifest-bar').hasClass('closing-bloc') || $('#info-content').hasClass('closing-bloc') || $('#sidebar').hasClass('resizing')) ) : " + (myDiv.get(0) === $('#sidebar').get(0) && $('#info-content').hasClass('primary-bloc') && ($('#manifest-bar').hasClass('closing-bloc') || $('#info-content').hasClass('closing-bloc') || $('#sidebar').hasClass('resizing'))));
        console.log("(myDiv.get(0) === $('#sidebar').get(0) && isParent && $('#manifest-bar').hasClass('primary-bloc')) : " + (myDiv.get(0) === $('#sidebar').get(0) && isParent && $('#manifest-bar').hasClass('primary-bloc')));
        console.log(" (myDiv.get(0) === $('#info-content').get(0) && !$('#info-content').hasClass('primary-bloc') && !myDiv.hasClass('resizing')) : " + (myDiv.get(0) === $('#info-content').get(0) && !$('#info-content').hasClass('primary-bloc') && !myDiv.hasClass('resizing')));
        if (((myDiv.get(0) === $('#sidebar').get(0) && $('#sidebar').hasClass('primary-bloc')) ||
                (myDiv.get(0) === $('#sidebar').get(0) && $('#info-content').hasClass('primary-bloc') &&
                        ($('#manifest-bar').hasClass('closing-bloc') || $('#info-content').hasClass('closing-bloc') || $('#sidebar').hasClass('resizing'))) ||
                (myDiv.get(0) === $('#sidebar').get(0) && isParent && $('#manifest-bar').hasClass('primary-bloc')) ||
                (myDiv.get(0) === $('#info-content').get(0) && !$('#info-content').hasClass('primary-bloc') && !myDiv.hasClass('resizing'))))
        {
            console.log("deltaLeft : " + deltaLeft);
            var value = Math.min(100, width / 2 - $('#info-content').width() / 2 - $('#sidebar').width() / 2);
            deltaLeft = Math.max(20, value);
            console.log("deltaLeft : " + deltaLeft);
        }
        if (myDiv.get(0) === $('#sidebar').get(0))
        {
            if (myDiv.hasClass('primary-bloc') && width >= breakMediumScreen)
            {
                return 120;
            }
            else
            {
                console.log("deltaLeft : " + deltaLeft);
                return deltaLeft + 20;
            }
        }
        else if (myDiv.get(0) === $('#info-content').get(0))
        {
            //If we have clicked the manifestbutton, the info content is still primary bloc 
            //so it needs to be repositionned to the left, to follow the sidebar offset
            //in case of window size between tablette and medium screen
            //If the manifestbar is primary and call to the function is made by info-content 
            //as parent it must also be offseted
            if (((myDiv.hasClass('primary-bloc') && !myDiv.hasClass('resizing')) ||
                    ($('#manifest-bar').hasClass('primary-bloc')) && !isParent) &&
                    width >= breakTabletAndSmallScreen && width < breakMediumScreen)
            {
                deltaLeft = -1207;
            }

            //if manifest bar is visible but the area to display is big enough 
            //or if info-content is called by the click on the sidebar button 
            //or if call to the function is done by info-content as parent
            //or if the user resize the window and the div is visble
            //we calcultate the div position
            if (($('#manifest-bar').hasClass('primary-bloc')) ||
                    (($('#sidebar').hasClass('primary-bloc')) && !myDiv.hasClass('resizing')) ||
                    isParent ||
                    (myDiv.hasClass('resizing') && myDiv.position().left > 0))
            {
                return deltaLeft + 807;
            }
            else
            {
                return -500;
            }

        }
        else if (myDiv.get(0) === $('#manifest-bar').get(0))
        {
            if (width < breakBigScreen && width >= breakMediumScreen)
                deltaLeft = coeffSpeedBigToMedium * width - 950;
            else if (width >= breakTabletAndSmallScreen && width < breakMediumScreen)
                deltaLeft = coeffMediumToTablette * width - 941;

            if (hideDiv)
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

//
//
//
//;
//document.addEventListener('touchstart', handleTouchStart, false);
//document.addEventListener('touchmove', handleTouchMove, false);
//
//var xDown = null;
//var yDown = null;
//
//function handleTouchStart(evt) {
//    xDown = evt.touches[0].clientX;
//    yDown = evt.touches[0].clientY;
//};
//
//function handleTouchMove(evt) {
//    if (!xDown || !yDown) {
//        return;
//    }
//
//    var xUp = evt.touches[0].clientX;
//    var yUp = evt.touches[0].clientY;
//
//    var xDiff = xDown - xUp;
//    var yDiff = yDown - yUp;
//
//    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
//        if (xDiff > 0) {
//           $('.primary-bloc').find($('.custom-button')).get(0).click();
//        } else {
//            $('.primary-bloc').find($('.close-icon')).get(0).click();
//        }
//    } else {
//        if (yDiff > 0) {
//            /* up swipe */
//        } else {
//            /* down swipe */
//        }
//    }
//    /* reset values */
//    xDown = null;
//    yDown = null;
//}
//;
function getDivVerticalDimAndPos(myDiv)
{
    var height = window.innerHeight;
    if (height >= breakBigScreenHeight)
    {
        if (myDiv.get(0) === $('#sidebar').get(0))
        {
            return [590, 163];
        }
        else if (myDiv.get(0) === $('#info-content').get(0))
        {
            return [782, 74];
        }
        else if (myDiv.get(0) === $('#manifest-bar').get(0))
        {
            return [680, 69];
        }
    }
    else if (height < breakBigScreenHeight && height > breakSmallScreenHeight)
    {
        if (myDiv.get(0) === $('#sidebar').get(0))
        {
            return [getElementValBigToMedium(590, 530, height), getElementValBigToMedium(163, 60, height)];
        }
        else if (myDiv.get(0) === $('#info-content').get(0))
        {
            return [getElementValBigToMedium(782, 635, height), getElementValBigToMedium(74, 7, height)];
        }

        else if (myDiv.get(0) === $('#manifest-bar').get(0))
        {
            return [getElementValBigToMedium(680, 600, height), getElementValBigToMedium(69, 15, height)];
        }
    }
    else
    {
        if (myDiv.get(0) === $('#sidebar').get(0))
        {
            return [height, 0];
        }
        else if (myDiv.get(0) === $('#info-content').get(0))
        {
            return [782, 74];
        }
        else if (myDiv.get(0) === $('#manifest-bar').get(0))
        {
            return [680, 69];
        }
    }

}

window.onresize = function (event)
{
    $('#sidebar').addClass('resizing');
    $('#info-content').addClass('resizing');
    $('#manifest-bar').addClass('resizing');

    $('#sidebar').css({left: getDivPosition($('#sidebar')) + 'px'});
    $('#sidebar').css({height: getDivVerticalDimAndPos($('#sidebar'))[0] + 'px'});
    $('#sidebar').css({top: getDivVerticalDimAndPos($('#sidebar'))[1] + 'px'});
    adaptSideBarElement();

    $('#info-content').css({left: getDivPosition($('#info-content')) + 'px'});
    $('#info-bar').css({height: getDivVerticalDimAndPos($('#info-content'))[0] + 'px'});
    $('#info-bar').css({top: getDivVerticalDimAndPos($('#info-content'))[1] + 'px'});
    var myMargin = 40;
    var myFontSize = 17;

    if (window.innerHeight < breakBigScreenHeight && window.innerHeight > breakSmallScreenHeight)
    {
        myMargin = getElementValBigToMedium(40, 15, window.innerHeight);
        myFontSize = getElementValBigToMedium(17, 15, window.innerHeight);
    }

    $('#services-list').css({marginTop: myMargin + 'px'});
    $('#services-list').css({marginBottom: myMargin + 'px'});

    $('#manifest-bar').find($('p')).css({fontSize: myFontSize + 'px'});
    $('#info-content').find($('p')).css({fontSize: myFontSize + 'px'});

    $('#manifest-bar').css({left: getDivPosition($('#manifest-bar')) + 'px'});
    $('#manifest-bar').css({height: getDivVerticalDimAndPos($('#manifest-bar'))[0] + 'px'});
    $('#manifest-bar').css({top: getDivVerticalDimAndPos($('#manifest-bar'))[1] + 'px'});

    $('#sidebar').removeClass('resizing');
    $('#info-content').removeClass('resizing');
    $('#manifest-bar').removeClass('resizing');
};


function adaptSideBarElement()
{
    var myFontSize = 18;
    var myLineHeight = 26;
    var myMarginTop = 57;
    var myMarginBottom = 10;
    var grid4Height = 70;
    var InfoOpenerHeight = 220;

    if (window.innerHeight >= breakMediumScreenHeight && window.innerHeight < breakBigScreenHeight)
    {
        console.log("ici");
        myMarginTop = getElementValBigToMedium(57, 25, window.innerHeight);

    }
    else if (window.innerHeight < breakMediumScreenHeight)
    {
        myFontSize = getElementValMediumToSmall(18, 14, window.innerHeight);
        myLineHeight = getElementValMediumToSmall(26, 18, window.innerHeight);
        myMarginTop = getElementValMediumToSmall(25, 0, window.innerHeight);
        myMarginBottom = getElementValMediumToSmall(10, 0, window.innerHeight);
        grid4Height = getElementValMediumToSmall(70, 62, window.innerHeight);
        InfoOpenerHeight = getElementValMediumToSmall(220, 170, window.innerHeight);
    }
    $('#sidebar').find($('h5')).css({fontSize: myFontSize + 'px',
        lineHeight: myLineHeight + 'px'});
    $('.grid-item--height4').css({marginTop: myMarginTop + 'px',
        marginBottom: myMarginBottom + 'px',
        height: grid4Height + '%'});

    $('#info-opener').css({height: InfoOpenerHeight + 'px'});
}

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
