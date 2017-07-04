/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(window).on('load', function ()
{
    $("#MenuWrapper").load('../partials/menu.html');
    $("#SideBar").load('../partials/sidebar.html');
    $("#Navigation").load('../partials/navigation.html');


    $('#Circle').circleProgress({
        value: 100,
        size: 70,
        thickness: 35,
        fill: {
            gradient: ["#6bc8e6", "#6bc8e6"]
        }
    });
    setTimeout(function () {
        if ($("#id").length > 0)
        {
            var linkId = $("#id").get(0).getAttribute("data-id");
            var link = document.getElementById(linkId);
            $(link).addClass("active");

            if ($("#ProjectID").length > 0)
            {
                $("#ProjectID").text(linkId);
            }
        }

        $('#preloader').delay(500).fadeOut('slow', function ()
        {
            $("#Eraser").delay(500).css({'right': '-250px', 'background-color': '#6bc8e6', "width": '0'});

        });
        $("#MainContent").animate({
            opacity: 1
        }, 500, function ()
        {
            $('.nav-toggle').animate({opacity: '1'}, 1000, function () {
                $('#MenuWrapper').css({'z-index': '100'});
                $('#MenuWrapper').animate({opacity: '1'}, 1000);
                $('#Menu').css({opacity: '1'});
            });
        });
    }, 500);



});

$(document).ready(function () {
    $('.nav-toggle').css({opacity: '0'});
    if (!(/Mobi/.test(navigator.userAgent))) {
        $('.mobileAccessInfos').css({opacity: '0'});
    }
    nav = responsiveNav(".nav-collapse");
//    $('.nav-toggle').css({'z-index': '0'});
//    $('.nav-toggle').css({'position': 'absolute'});
});

function goTo(activeLink, event)
{
    if (event === undefined || !($(event.srcElement).hasClass('mobileAccessInfos')))
    {
        $("#Eraser").css({"width": '250px'});
        $("#Eraser").animate({right: window.innerWidth}, 500);
        if ($("#SideBar").is(":visible"))
        {
            $("#SideBar").toggle("slide", {direction: 'left'}, 600);
        }
        if ($("#Menu").is(":visible"))
        {
            $('.nav-toggle').slideUp();
            nav.close();
            $('.nav-toggle').css({'opacity': '0'});
        }
        $("#MainContent").toggle("slide", {direction: 'left'}, 600);


        setTimeout(
                function () {
                    window.location.href = activeLink;
                }, 500);
    }
}

function displayInfos(event)
{
    var element = $(event.currentTarget.offsetParent);
    console.log(element[0].style.bottom);
    $(event.currentTarget).hasClass('chevronUp') ? slideUpProjectContent(element) : slideDownProjectContent(element);
}

function slideUpProjectContent(element)
{
    $(event.currentTarget).switchClass('chevronUp', 'chevronDown', 1000, "easeInOutQuad");
    element.css({'bottom': '-15%'});
}


function slideDownProjectContent(element)
{
    $(event.currentTarget).switchClass('chevronDown', 'chevronUp', 1000, "easeInOutQuad");
    element.css({'bottom': '-85%'});
}

