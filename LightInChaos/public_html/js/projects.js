/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(window).on('load', function ()
{
    projectContentPosition();
    setTimeout(function () {
        $("#Eraser").delay(500).css({'right': '-250px', 'background-color': '#6bc8e6'});
    }, 1000);
    $("#MainContent").animate({
        opacity: 1
    }, 1000);

});

window.onresize = function (event)
{
    projectContentPosition();
}

function projectContentPosition()
{
    $(".projectContent").each(function (index) {
       // $(this).css('bottom', ($(this).find('h3').height() - $(this).height()) + 'px');
    });
}

$(document).ready(function () {
    nav = responsiveNav(".nav-collapse");
    $('.nav-toggle').css({'z-index': '0'});
    $('.nav-toggle').css({'position': 'absolute'});
});

function goHome(activeLink)
{
    $('#ShowReelPlayerHolder').css({opacity: 0});
    $("#Eraser").animate({right: window.innerWidth}, 500);
    if ($("#SideBar").is(":visible"))
    {
        $("#SideBar").toggle("slide", {direction: 'left'}, 600);
    }
    if ($("#Menu").is(":visible"))
    {
        $('.nav-toggle').slideUp();
        nav.close();
    }

    setTimeout(
            function () {
                window.location.href = activeLink;
            }, 1000);

}

