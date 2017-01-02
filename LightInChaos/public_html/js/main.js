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
    $('#status').delay(500).fadeOut('slow', function ()
    {
        $('#preloader').delay(500).fadeOut('slow', function ()
        {
            $('#backdiv').animate({opacity: '1'}, 'slow');
            
        });
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
    $('#manifest').toggle('height');
    $('#info-bar').toggle('visibility');
    $('#logo-phrase').css("opacity", 0);
    $('#info-opener').css("opacity", 0);
    $(window).scroll(checkTopPos);
    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: 160
    });
    $('#status').animate({height: '53%'}, {complete: function () {
            $('#status').animate({width: '21.7%'}, {complete: function () {
                    $('#wrapper-bars').removeClass('onload');
                    $('#logo-phrase').animate({opacity: '1'}, {duration: 2, complete: function () {
//$('#logohiding').fadeOut('slow');//, {complete: function () {
//}});


                            $('#canvasHolder').animate({opacity: '1'}, {complete: myCircle()});
                            if ($("#canvasHolder").hasClass("finished") && $("#preloader").hasClass('remove'))
                            {
                                finishUp();
                            }
                        }});
                }});
        }});
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
$('#sidebar-button').click(function () {

    if ($("#info-content").position().left === 0)
    {
        $('#sidebar-button').removeClass('custom-open-button');
        $('#sidebar-button').addClass('custom-close-button');
        $('#info-content').animate({left: 'toggle'}, "slow", growHorizLine);
    }
    else
    {
        $('#sidebar-button').removeClass('custom-close-button');
        $('#sidebar-button').addClass('custom-open-button');
        shrinkContent();
    }
});
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

function growContent()
{
    $('#manifest').animate({height: 'toggle'});
}


function shrinkContent()
{
    $('#manifest').animate({height: 'toggle'}, shrinkStartContent);
}

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
        var radius = canvas.height / 5;
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