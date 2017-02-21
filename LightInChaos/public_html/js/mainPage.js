/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
}());

var currentState = "normal";

$(window).on('load', function ()
{ // makes sure the whole site is loaded
    //
    // $('#preloader').css({opacity: '0.5'});

    //$('#DropDown').css({opacity: 1});
    //$('#DropDown').animate({height: '50%'}, 'slow', function () {

    //  curHeight = $('#DropDown').height();
    //  TotalHeight = $('#DropDown').height();

    // function animate(height) {
    //      $('#DropDown').css({'height': height + 'px',
    //          'margin-top': (TotalHeight - height) + 'px'});
    $('#Circle').circleProgress({
        value: 100,
        size: 70,
        thickness: 35,
        fill: {
            gradient: ["#6bc8e6", "#6bc8e6"]
        }
    });

    setTimeout(function () {
        $('body').css({'overflow': 'visible'});

        $('#preloader').delay(500).fadeOut('slow', function ()
        {
            $('#backdiv').animate({opacity: '1'}, 'slow');
            $("#Eraser").delay(500).css({'right': '-250px', 'background-color': '#6bc8e6'});
        });
    }, 1000);

    if (window.innerWidth <= 850)
    {
        currentState = "small";
    }
    /*    if (height > 0)
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
     animate(curHeight);*/
//});
});


$(document).ready(function () {
    $('#my-video').backgroundVideo();
    nav = responsiveNav(".nav-collapse");
    $('.nav-toggle').css({'z-index': '0'});
    $('.nav-toggle').css({'position': 'absolute'});
    var hash = window.location.hash.substr(1);
    if(hash === "About")
    {
        displayAbout();
    }
    else if( hash === "Contact")
    {
        displayContact();
    }
});


$('.close-icon').click(function ()
{
    displayHome();
});

function manageShowreelDisplay(action)
{
//
//    var newHeight = $("#ContentHolder").height();
//    newHeight !== 0 ? newHeight = 0 : newHeight = '100%';
//    if (newHeight === '100%')
//        manageShowReelZIndex();
//
//    $("#ContentHolder").animate({height: newHeight}, 300, function () {
//
//        $('.barContainer').css('opacity') === "1" ? $('.barContainer').animate({opacity: 0}, 300) : $('.barContainer').animate({opacity: 1}, 300);
//
//        $('.background').css('opacity') === "1" ? $('.background').animate({opacity: 0}) : $('.background').animate({opacity: 1});
//        $('#video-filter').css('opacity') === "1" ? $('#video-filter').animate({opacity: 0}, 300) : $('#video-filter').animate({opacity: 1}, 300);
//
//        if (newHeight === 0)
//            setTimeout(manageShowReelZIndex, 500);
//    });

    if (action === "show")
    {
        if ($('#ShowReelPlayerHolder').length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: $('#ShowReelPlayerHolder').offset().top
            }, 1000);
        }
    }
    else
    {
        if ($('#ContentHolder').length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: 0
            }, 1000);
        }
    }

}
;
function goToNewPage(page)
{
    $('#ShowReelPlayerHolder').css({opacity: 0});
    $("#Eraser").animate({right: window.innerWidth}, 500);
    if ($("#SideBar").is(":visible"))
    {
        $("#SideBar").toggle("slide", {direction: 'left'}, 600);
    }
    if ($("#AboutBar").is(":visible"))
    {
        $("#AboutBar").toggle("slide", {direction: 'left'}, 600);
    }
    if ($("#ContactBar").is(":visible"))
    {
        $("#ContactBar").toggle("slide", {direction: 'left'}, 600);
    }

    if ($("#Menu").is(":visible"))
    {
        $('.nav-toggle').slideUp();
        nav.close();
    }

    $('.background').animate({opacity: 0}, 400, function () {
        $('#video-filter').animate({opacity: 0}, 400);
        setTimeout(
                function () {
                    window.location.href = page;
                }, 1000);
    });
}

function manageShowReelZIndex()
{
    $('#ShowReelPlayerHolder').css('z-index') === "0" ? $('#ShowReelPlayerHolder').css({'z-index': 50}) : $('#ShowReelPlayerHolder').css({'z-index': 0});
}


window.onresize = function (event)
{
    if (window.innerWidth <= 850 && currentState === "normal")
    {
        currentState = "small";
        displayHome();
    }
    else if (window.innerWidth > 850 && currentState === "small")
    {
        currentState = "normal";
        $('#SideBar').slideDown();
    }
}

function displayAbout()
{
    hideAndManage($("#ContactBar"), $(".contactLink"), $("#AboutBar"), $(".about"));
    $("#AboutBar").position().left > 0 ? $("#aboutSideMenu").attr("href", "#home") : $("#aboutSideMenu").attr("href", "#About");
    /* $(".about").toggleClass('active');
     $(".contactLink").removeClass('active');
     
     $("#ContactBar").addClass('hidden');
     
     $("#AboutBar").toggleClass('hidden');
     if (window.innerWidth < 850)
     {
     if (!($("#AboutBar").hasClass('hidden')))
     {
     $('#SideBar').slideUp();
     $('.nav-toggle').css({'position': 'relative'});
     $('.nav-toggle').css({'z-index': '100'});
     
     $('.nav-toggle').css({display: 'block'});
     }
     else
     {
     $('#SideBar').slideDown();
     $('.nav-toggle').css({display: 'none'});
     nav.close();
     }
     }*/
}


function displayContact()
{
    
    hideAndManage($("#AboutBar"), $(".about"), $("#ContactBar"), $(".contactLink"));
    $("#ContactBar").position().left > 0 ? $("#contactSideMenu").attr("href", "#home") : $("#contactSideMenu").attr("href", "#Contact");

    /*    $("#ContactLink").toggleClass('active');
     $(".about").removeClass('active');
     $("#AboutBar").addClass('hidden');
     
     $("#ContactBar").toggleClass('hidden');
     //$("#").offset().left === -1500 ? $("#InfosBar").animate({left: newLeft + 'px'}, 400) : $("#InfosBar").animate({left: '-1500px'}, 400);*/

}

function displayHome()
{
    $(".contactLink").removeClass('active');
    $(".about").removeClass('active');
    $("#AboutBar").addClass('hidden');
    $("#ContactBar").addClass('hidden');

    manageHamburger($("#AboutBar"));
}

function hideAndManage(divToHide, linkToDeActivate, divToManage, linkToManage)
{
    linkToManage.toggleClass('active');
    linkToDeActivate.removeClass('active');
    divToHide.addClass('hidden');
    divToManage.toggleClass('hidden');

    manageHamburger(divToManage);
    nav.close();
}

function manageHamburger(divToManage)
{
    if (window.innerWidth < 850)
    {
        if ($('.nav-toggle').css("z-index") === "0")
        {
            $('.nav-toggle').slideUp(1);
        }
        if (!(divToManage.hasClass('hidden')))
        {
            $('#SideBar').slideUp();
            $('.nav-toggle').slideDown();
            nav.resize();

            $('.nav-toggle').css({'position': 'relative'});
            $('.nav-toggle').css({'z-index': '100'});
            // $('.nav-toggle').css({display: 'block'});
        }
        else
        {
            $('#SideBar').slideDown();
            // $('.nav-toggle').css({display: 'none'});
            $('.nav-toggle').slideUp();
            nav.close();
        }
    }
}