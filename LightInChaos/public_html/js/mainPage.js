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

//            $("#aboutSideMenu").animate({"color": "#6bc8e6"}, 300, function ()
//            {
//                $("#contactSideMenu").animate({"color": "#6bc8e6"}, 300, function ()
//                {
//                    $("#projectsSideMenu").animate({"color": "#6bc8e6"}, 300, function ()
//                    {
//                        $("#blogSideMenu").animate({"color": "#6bc8e6"}, 300);
//                    });
//                });
//            });
            colorizeMenu($(".sideLinks"), 0);
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

function colorizeMenu(menuList, index)
{
    if (index < menuList.length)
    {
        var ref = $(menuList[index]).find("div");
        var element = $(ref).get(0);
        $(element).animate({"color": "#6bc8e6"}, 500, function () {
            colorizeMenu(menuList, index + 1);
        });
    }
}

$(document).ready(function () {
//    jwplayer.key = "eHDLhj7CypCmtx3BTai7P36Y3M0n5mOCGPkkBA==";
    $('#my-video').backgroundVideo();
    nav = responsiveNav(".nav-collapse");
    $('.nav-toggle').css({'z-index': '0'});
    $('.nav-toggle').css({'position': 'absolute'});


    var hash = window.location.hash.substr(1);
    if (hash === "About")
    {
        displayAbout();
        $('#MenuWrapper').css({'z-index': '100'});
    }
    else if (hash === "Trust")
    {
        displayTrust();
        $('#MenuWrapper').css({'z-index': '100'});
    }
    else if (hash === "Contact")
    {
        displayContact();
        $('#MenuWrapper').css({'z-index': '100'});
    }
    else
    {
        $('#MenuWrapper').css({'z-index': '0'});
    }
});


$('.close-icon').click(function ()
{
    //displayHome();
    hideAndManage(null, null);
});

function manageShowreelDisplay(action, event)
{
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
function goToNewPage(page, event)
{
    event.preventDefault();
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
    if ($("#TrustBar").is(":visible"))
    {
        $("#TrustBar").toggle("slide", {direction: 'left'}, 600);
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
    $("#border-info").height($("#contentInfos").height() - 10);
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
    hideAndManage($("#AboutBar"), $("#aboutSideMenu"));
    $("#AboutBar").position().left > 0 ? $("#aboutSideMenu").attr("href", "#home") : $("#aboutSideMenu").attr("href", "#About");
}


function displayTrust()
{
    hideAndManage($("#TrustBar"), $("#trustSideMenu"));
    $("#TrustBar").position().left > 0 ? $("#trustSideMenu").attr("href", "#home") : $("#trustSideMenu").attr("href", "#Trust");
}


function displayContact()
{

    hideAndManage($("#ContactBar"), $("#contactSideMenu"));
    $("#ContactBar").position().left > 0 ? $("#contactSideMenu").attr("href", "#home") : $("#contactSideMenu").attr("href", "#Contact");
}


function displayHome()
{
    hideAndManage(null, null);

    manageHamburger($("#AboutBar"));
}

function hideAndManage(divToManage, linkToManage)
{
    var navLinkName;
    var navLink;
    if (linkToManage !== null)
    {
        linkToManage.parent().toggleClass('active');
        navLinkName = linkToManage.parent().get(0).getAttribute("data-nav");
        navLink = document.getElementById(navLinkName);
        $(navLink).toggleClass('active');
    }
    $('.sideLinks').each(function ()
    {
        var ref = $(this).find("div");
        if (linkToManage === null || $(ref).get(0) !== linkToManage.get(0))
        {
            navLinkName = $(this).get(0).getAttribute("data-nav");
            navLink = document.getElementById(navLinkName);
            $(navLink).removeClass('active');
            $(this).removeClass('active');
        }
    });


    $('.infos').each(function ()
    {
        if (divToManage === null || $(this).get(0) !== divToManage.get(0))
        {
            $(this).addClass('hidden');
        }
    });
    if (divToManage !== null)
    {
        divToManage.toggleClass('hidden');
        manageHamburger(divToManage);
    }
    else
    {
        manageHamburger($("#AboutBar"));
    }

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
            $('#MenuWrapper').css({'z-index': '100'});
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