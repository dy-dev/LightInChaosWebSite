var breakBigScreen = 1500;
var breakMediumScreen = 1310;
var breakTabletAndSmallScreen = 900;
var breakPhoneScreen = 500;

var coeffSlowBigToMedium = 100 / (breakBigScreen - breakMediumScreen);
var coeffSpeedBigToMedium = 134 / (breakBigScreen - breakMediumScreen);
var coeffSlowMediumToTablette = 100 / (breakMediumScreen - breakTabletAndSmallScreen);
var coeffMediumToTablette = 232 / (breakMediumScreen - breakTabletAndSmallScreen);

var breakBigScreenHeight = 900;
var breakMediumScreenHeight = 750;
var breakSmallScreenHeight = 480;

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
    window.onresize();
    $('#info-opener').animate({opacity: '1'}, 'slow');

    $('body').css({'overflow': 'visible'});
   // $('#preloader').css({opacity: '0.5'});

    $('#preloader').delay(500).fadeOut('slow', function ()
    {
        $('#backdiv').animate({opacity: '1'}, 'slow');
        $('#status').delay(500).fadeOut('slow');
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
    var finalWidth = ($('#status').outerWidth());
    if (window.innerWidth < breakPhoneScreen)
    {
        $('#arrow-img').css({left: window.innerWidth / 2 - $('#arrow-img').width() / 2 - 57 + 'px'});
        $('#button-cache').css({left: (window.innerWidth / 2 - $('#button-cache').width() / 2) + 'px'});
    }
    if (window.innerHeight < breakBigScreenHeight && window.innerHeight >= breakMediumScreenHeight)
    {
        $('#arrow-img').css({top: getElementValBigToMedium(476, 411, window.innerHeight) + 'px'});
        $('#button-cache').css({top: getElementValBigToMedium(442, 378, window.innerHeight) + 'px'});
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

        if (window.innerHeight < breakMediumScreenHeight)
        {
            if (window.innerWidth < breakPhoneScreen)
            {
                $('#canvas-clamp').css({top: getElementValMediumToSmall(33, 10, window.innerHeight) + 'px'});
//                $('#arrow-img').css({top: getElementValMediumToSmall(553.5, 400, window.innerHeight) + 'px'});
//                $('#button-cache').css({top: getElementValMediumToSmall(519, 374, window.innerHeight) + 'px'});
                $('#button-cache').css({top: $('#circle').offset().top + 'px'});
                $('#button-cache').css({height: getElementValMediumToSmall(80, 65, window.innerHeight)});

                $('#arrow-img').css({top: ($('#circle').offset().top + $('#button-cache').height() / 2 - $('#arrow-img').height() / 2 - 1) + 'px'});
                $('#arrow-img').css({width: getElementValMediumToSmall(26, 20, window.innerHeight)});
                //$('#arrow-img').css({top: $('#info-opener').offset().top + $('#button-cache').height() / 2 - $('#arrow-img').height() / 2 - 3 + 'px'});
            }
            else if (window.innerHeight > breakSmallScreenHeight)
            {
                $('#arrow-img').css({top: getElementValMediumToSmall(412, 344, window.innerHeight) + 'px'});
                $('#button-cache').css({top: getElementValMediumToSmall(379, 310, window.innerHeight) + 'px'});
            }
            else
            {
                $('#arrow-img').css({top: '373px'});
                $('#button-cache').css({top: '340px'});
            }
        }
        else if (window.innerWidth < breakPhoneScreen)
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
                statusCircleSize = window.innerHeight <= breakMediumScreenHeight && window.innerWidth < breakPhoneScreen ? getElementValMediumToSmall(77, 60, window.innerHeight) : 77;
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
                if (width <= breakPhoneScreen)
                {
                    return 0;
                }
                else
                {
                    console.log($('#manifest-bar').outerWidth());
                    return $(window).innerWidth() / 2 - $('#manifest-bar').outerWidth() / 2 - $('#info-bar').position().left;
                }
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

//        console.log(myDiv);
        // console.log("(myDiv.get(0) === $('#sidebar').get(0) && $('#sidebar').hasClass('primary-bloc')) : " + (myDiv.get(0) === $('#sidebar').get(0) && $('#sidebar').hasClass('primary-bloc')));
        //   console.log("(myDiv.get(0) === $('#sidebar').get(0) && $('#info-content').hasClass('primary-bloc') && ($('#manifest-bar').hasClass('closing-bloc') || $('#info-content').hasClass('closing-bloc') || $('#sidebar').hasClass('resizing')) ) : " + (myDiv.get(0) === $('#sidebar').get(0) && $('#info-content').hasClass('primary-bloc') && ($('#manifest-bar').hasClass('closing-bloc') || $('#info-content').hasClass('closing-bloc') || $('#sidebar').hasClass('resizing'))));
        //   console.log("(myDiv.get(0) === $('#sidebar').get(0) && isParent && $('#manifest-bar').hasClass('primary-bloc')) : " + (myDiv.get(0) === $('#sidebar').get(0) && isParent && $('#manifest-bar').hasClass('primary-bloc')));
        //   console.log(" (myDiv.get(0) === $('#info-content').get(0) && !$('#info-content').hasClass('primary-bloc') && !myDiv.hasClass('resizing')) : " + (myDiv.get(0) === $('#info-content').get(0) && !$('#info-content').hasClass('primary-bloc') && !myDiv.hasClass('resizing')));
        if (((myDiv.get(0) === $('#sidebar').get(0) && $('#sidebar').hasClass('primary-bloc')) ||
                (myDiv.get(0) === $('#sidebar').get(0) && $('#info-content').hasClass('primary-bloc') &&
                        ($('#manifest-bar').hasClass('closing-bloc') || $('#info-content').hasClass('closing-bloc') || $('#sidebar').hasClass('resizing'))) ||
                (myDiv.get(0) === $('#sidebar').get(0) && isParent && $('#manifest-bar').hasClass('primary-bloc')) ||
                (myDiv.get(0) === $('#info-content').get(0) && !$('#info-content').hasClass('primary-bloc') && !myDiv.hasClass('resizing')) ||
                (myDiv.get(0) === $('#info-content').get(0) && $('#info-content').hasClass('primary-bloc') && myDiv.hasClass('resizing'))))
        {
            console.log("deltaLeft : " + deltaLeft);
            console.log("$('#info-content').outerWidth() : " + $('#info-content').outerWidth());
            console.log("$('#sidebar')outerWidth() : " + $('#sidebar').outerWidth());
            var value = Math.min(100, outerWidth / 2 - $('#info-content').outerWidth() / 2 - $('#sidebar').outerWidth() / 2);
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
                // console.log("deltaLeft : " + deltaLeft);
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
                console.log("deltaleft : " + deltaLeft);
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
                deltaLeft = coeffSpeedBigToMedium * width - 980;
            else if (width >= breakTabletAndSmallScreen && width < breakMediumScreen)
                deltaLeft = coeffMediumToTablette * width - 980;

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
            return [782, 84];
        }
        else if (myDiv.get(0) === $('#manifest-bar').get(0))
        {
            return [630, 69];
        }
    }
    else if (height < breakBigScreenHeight && height >= breakMediumScreenHeight)
    {
        if (myDiv.get(0) === $('#sidebar').get(0))
        {
            return [getElementValBigToMedium(590, 530, height), getElementValBigToMedium(163, 60, height)];
        }
        else if (myDiv.get(0) === $('#info-content').get(0))
        {
            return [getElementValBigToMedium(782, 722, height), getElementValBigToMedium(84, 7, height)];
        }

        else if (myDiv.get(0) === $('#manifest-bar').get(0))
        {
            return [630, getElementValBigToMedium(69, 15, height)];
        }
    }

    else if (height < breakMediumScreenHeight && height >= breakSmallScreenHeight)
    {
        if (myDiv.get(0) === $('#sidebar').get(0))
        {
            return [getElementValBigToMedium(590, 530, height), getElementValMediumToSmall(60, 20, height)];
        }
        else if (myDiv.get(0) === $('#info-content').get(0))
        {
            return [getElementValBigToMedium(670, 635, height), getElementValBigToMedium(84, 7, height)];
        }

        else if (myDiv.get(0) === $('#manifest-bar').get(0))
        {
            return [getElementValMediumToSmall(630, 530, height), getElementValMediumToSmall(15, 5, height)];
        }
    }
    else
    {
        if (myDiv.get(0) === $('#sidebar').get(0))
        {
            return [480, 0];
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
    adaptSideBarElement();
    adaptInfoContentElement();
    adaptManifestBarElement();
};


function adaptSideBarElement()
{
    $('#sidebar').addClass('resizing');
    $('#sidebar').css({left: getDivPosition($('#sidebar')) + 'px'});
    $('#sidebar').css({height: getDivVerticalDimAndPos($('#sidebar'))[0] + 'px'});
    $('#sidebar').css({top: getDivVerticalDimAndPos($('#sidebar'))[1] + 'px'});

    var myFontSize = 18;
    var myLineHeight = 26;
    var myMarginTop = 57;
    var myMarginBottom = 35;
    var grid4Height = '54%';
    var InfoOpenerHeight = 220;
    var InfoOpenerTop = 33;
    console.log("window.innerHeight : " + window.innerHeight + ", breakMediumScreenHeight : " + breakMediumScreenHeight + ", breakBigScreenHeight" + breakBigScreenHeight);
    if (window.innerHeight >= breakMediumScreenHeight && window.innerHeight < breakBigScreenHeight)
    {
        myMarginTop = getElementValBigToMedium(57, 25, window.innerHeight);
        if (window.innerWidth < breakPhoneScreen)
        {
            grid4Height = '66vh';
        }

    }
    else if (window.innerHeight < breakMediumScreenHeight && window.innerWidth < breakPhoneScreen)
    {
        myFontSize = getElementValMediumToSmall(18, 14, window.innerHeight);
        myLineHeight = getElementValMediumToSmall(26, 18, window.innerHeight);
        myMarginTop = getElementValMediumToSmall(25, 15, window.innerHeight);
        myMarginBottom = getElementValMediumToSmall(35, 0, window.innerHeight);
        grid4Height = getElementValMediumToSmall(66, 71, window.innerHeight) + 'vh';

        if (window.innerHeight < 380)
        {
            grid4Height = '70%';
        }
        InfoOpenerHeight = getElementValMediumToSmall(220, 170, window.innerHeight);
        InfoOpenerTop = getElementValMediumToSmall(33, 10, window.innerHeight);
    }
    else if (window.innerHeight < breakMediumScreenHeight)
    {
        myMarginTop = getElementValMediumToSmall(25, 15, window.innerHeight);
    }
    $('#sidebar').find($('h5')).css({fontSize: myFontSize + 'px',
        lineHeight: myLineHeight + 'px'});
    $('.grid-item--height4').css({marginTop: myMarginTop + 'px',
        marginBottom: myMarginBottom + 'px',
        height: grid4Height});

    $('#info-opener').css({height: InfoOpenerHeight + 'px', top: InfoOpenerTop + 'px'});
    $('#sidebar').removeClass('resizing');
}

function adaptInfoContentElement()
{
    $('#info-content').addClass('resizing');

    $('#info-content').css({left: getDivPosition($('#info-content')) + 'px'});

    var myMargin = 40;
    var myFontSize = 17;
    var myIconFontSize = 5;
    var myPaddingTop = 17;
    var myLineHeight = 26;
    var myMarginBottom = 14;
    var myBorderHeight = 117;
    var marginBlock = 5;
    if (window.innerHeight < breakBigScreenHeight && window.innerHeight > breakMediumScreenHeight)
    {
        myMargin = getElementValBigToMedium(40, 15, window.innerHeight);
        myFontSize = getElementValBigToMedium(17, 15, window.innerHeight);
        marginBlock = 0;
    }
    else if (window.innerHeight <= breakMediumScreenHeight)
    {
        myLineHeight = getElementValMediumToSmall(24, 18, window.innerHeight);
        myFontSize = getElementValMediumToSmall(15, 13, window.innerHeight);
        myIconFontSize = getElementValMediumToSmall(5, 3.5, window.innerHeight);
        myMargin = getElementValMediumToSmall(15, 5, window.innerHeight);
        myPaddingTop = getElementValMediumToSmall(17, 5, window.innerHeight);
        myMarginBottom = getElementValMediumToSmall(14, 4, window.innerHeight);
        marginBlock = getElementValMediumToSmall(10, 0, window.innerHeight);
        myBorderHeight = getElementValMediumToSmall(117, 100, window.innerHeight);
    }
    $('#info-bar').find($('li')).css({fontSize: (myFontSize + 1) + 'px'});
    $('#info-bar').find($('h4')).css({paddingTop: myPaddingTop + 'px'});
    $('#info-bar').css({height: getDivVerticalDimAndPos($('#info-content'))[0] + 'px'});
    $('#info-bar').css({top: getDivVerticalDimAndPos($('#info-content'))[1] + 'px'});

    $('#info-bar-text').find($('p')).css({lineHeight: myLineHeight + 'px'});
    $('#info-content').find($('p')).css({fontSize: myFontSize + 'px'});
    $('#border-info').css({height: myBorderHeight});

    $('.contact-mail').css({marginBottom: myMarginBottom + 'px'});
    $('.contact-id').css({marginBottom: (myMarginBottom - 3) + 'px'});
    $('.social-icon').find($('span')).css({fontSize: myIconFontSize + 'em'});

    $('#info-bar').find($('.social-network')).css({marginBottom: marginBlock + '%', marginRight: marginBlock + '%'});
    $('#info-bar').find($('nav')).css({marginBottom: marginBlock + '%', marginRight: marginBlock + '%'});
    $('#info-bar').find($('ul')).css({marginBottom: marginBlock + '%', marginRight: marginBlock + '%'});

    $('#manifest-opener-text').css({marginBottom: marginBlock + '%'});

    $('#services-list').css({marginTop: myMargin + 'px', marginBottom: myMarginBottom + 'px'});

    $('#info-content').removeClass('resizing');
}

function adaptManifestBarElement()
{
    $('#manifest-bar').addClass('resizing');

    var myFontSize = 17;
    var myLineHeight = 26;

    if (window.innerHeight < breakBigScreenHeight && window.innerHeight > breakMediumScreenHeight)
    {
        // myFontSize = getElementValBigToMedium(17, 16, window.innerHeight);
    }
    else if (window.innerHeight <= breakMediumScreenHeight)
    {
        myFontSize = getElementValMediumToSmall(17, 16, window.innerHeight);
        myLineHeight = getElementValMediumToSmall(26, 20, window.innerHeight);

        if (window.innerHeight <= breakSmallScreenHeight && window.innerWidth < breakPhoneScreen)
        {
            //$('#manifest-bar').css({padding: '20px 40px'});
            myFontSize = getElementValMediumToSmall(16, 15, window.innerHeight);
            myLineHeight = getElementValMediumToSmall(20, 17, window.innerHeight);
        }
    }
    $('#manifest-bar').find($('p')).css({fontSize: myFontSize + 'px'});
    $('#manifest-bar').find($('p')).css({lineHeight: myLineHeight + 'px'});

    $('#manifest-bar').css({left: getDivPosition($('#manifest-bar')) + 'px'});
    $('#manifest-bar').css({height: getDivVerticalDimAndPos($('#manifest-bar'))[0] + 'px'});
    $('#manifest-bar').css({top: getDivVerticalDimAndPos($('#manifest-bar'))[1] + 'px'});
    $('#manifest-bar').removeClass('resizing');

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
