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
    // will first fade out the loading animation 
    // will fade out the white DIV that covers the website. 
    /*
     $('#sidebar').width('3px');
     $('#wrapper-bars').addClass('showbar');
     $('#sidebar').animate({height: '53%'}, function () {
     $('#sidebar').animate({width: '21.7%'}, function () {
     $('div[class^="grid-item--height"]').animate({opacity: '1'}, function() {
     $('div[class^="grid-item--height"]').removeClass('firstload');
     });
     });
     });*/
});

function finishUp()
{
    $('#info-opener').animate({opacity: '1'}, 'slow');
    $('body').css({'overflow': 'visible'});
    $('#sidebar').css({'background': 'rgba(35, 31, 32, 1)'});
    $('#preloader').delay(500).fadeOut('slow', function ()
    {
        $('#backdiv').animate({opacity: '1'}, 'slow');
        $('#status').delay(500).fadeOut('slow');
    });
}

$(document).ready(function ()
{
    $('#my-video').backgroundVideo();
    $('.service-list').toggle('height');
    $('#info-content').toggle('left');
    $('#horiz-line').toggle('width');
    $('#vert-line').toggle('height');
    $('#left-line').toggle('width');
    $('#right-line').toggle('width');
    $('#manifest-bar').toggle('left');
    $('#info-bar').toggle('visibility');
    $('#logo-phrase').css("opacity", 0);
    $('#info-opener').css("opacity", 0);
    $(window).scroll(checkTopPos);
    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: 160
    });
    $('#status').animate({height: '630px'}, 'slow');
    $('#status').animate({width: '416px'}, 'slow', function () {
        $('#wrapper-bars').removeClass('onload');
        $('#logo-phrase').animate({opacity: '1'}, {
            duration: 2500,
            specialEasing: {
                opacity: "swing"
            }});

        $('#canvasHolder').animate({opacity: '1'}, {complete: myCircle()});
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


$('.close-icon').click(function ()
{
    var myButtonName = $(this).get(0).getAttribute("data-correspond-button");
    var myButton = document.getElementById(myButtonName);
    $(myButton).click();
});

$('.custom-button').click(function ()
{
    var myDivName = $(this).get(0).getAttribute("data-div");
    var myDiv = document.getElementById(myDivName);
    if ($(myDiv).position().left === 0)
    {
        $(this).removeClass('custom-open-button');
        $(this).removeClass('animate-open-button');
        $(this).addClass('custom-close-button');

    }
    else
    {
        $(this).removeClass('custom-close-button');
        $(this).addClass('custom-open-button');

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
    $(myDiv).animate({left: 'toggle'}, "slow");
});

/*
 function growHorizLine() {
 $('#horiz-line').animate({width: 'toggle'}, growVertLine);
 }
 
 
 function growVertLine() {
 $('#vert-line').animate({height: 'toggle'}, growStartContent);
 }
 
 function growStartContent() {
 $('#left-line').animate({width: 'toggle'});
 $('#right-line').animate({width: 'toggle'}, growContent);
 }
 */
function growContent()
{
    $('#manifest').animate({height: 'toggle'});
}


function shrinkContent()
{
    $('#manifest').animate({height: 'toggle'}/*, shrinkStartContent*/);
}
/*
 function shrinkStartContent() {
 $('#left-line').animate({width: 'toggle'});
 $('#right-line').animate({width: 'toggle'}, shrinkVertLine);
 }
 
 function shrinkVertLine() {
 $('#vert-line').animate({height: 'toggle'}, shrinkHorizLine);
 }
 
 function shrinkHorizLine() {
 $('#horiz-line').animate({width: 'toggle'}, shrinkInfoContent);
 }
 */
function shrinkInfoContent() {
    $('#info-content').animate({left: 'toggle'});
}


$('input[type="checkbox"]').on('change', function () {
    if ($(this).is(":checked")) {
        $("#backdiv").removeClass('displayon');
    }
    else
    {
        $("#backdiv").addClass('displayon');
    }

});

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
    context.canvas.width = $("#canvasHolder").width();
    context.canvas.height = $("#canvasHolder").height();
    createCircle();
    function createCircle() {
        var x = canvas.width / 2;
        var y = 3.93 * canvas.height / 6;
        var radius = 44;
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