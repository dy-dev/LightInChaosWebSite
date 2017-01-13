/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var percentComplete = 0;
var radius = 0;
var x = 0;
var y = 0;
var endPercent = 100;
var curPerc = 0;
var circ = Math.PI * 2;
var quart = Math.PI / 2;
var start = 0;

(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
}());

document.onreadystatechange = function (e)
{
    if (document.readyState === "interactive")
    {
        start = new Date().getTime();
        var finalHeight = ($('#status').height());
        var finalWidth = ($('#status').width());
        $('#status').width('3px');
        $('#status').height('0px');
        $('#status').css("opacity", 1);

        $('#status').animate({height: finalHeight}, 'slow');
        $('#status').animate({width: finalWidth}, 'slow', function () {
            $('#wrapper-bars').removeClass('onload');
            $('#logo-phrase').animate({opacity: '1'});/*, {
             duration: 2500,
             specialEasing: {
             opacity: "swing"
             }});*/



            var canvas = document.getElementById('myCanvas');
            var context = canvas.getContext('2d');
            $('#canvas-clamp').height($('#sidebar-button').height());
            //$('#canvas-clamp').width($('#sidebar-button').width());
            context.canvas.width = $('#canvas-clamp').width();
            context.canvas.height = $('#canvas-clamp').height() + 4;
            createCircle();
            function createCircle() {
                radius = $('#sidebar-button').height() / 2.0;
                x = canvas.width / 2;
                y = radius + 2;
                // var y = 3.93 * canvas.height / 6;
                curPerc = 0;
                circ = Math.PI * 2;
                quart = Math.PI / 2;
                context.lineWidth = 2;
                context.strokeStyle = '#FFFFFF';
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;

            }


            var all = document.getElementsByTagName("*");
            for (var i = 0, max = all.length; i < max; i++)
            {
                set_ele(all[i], context);
            }
            /* if (new Date().getTime() - start < 2000)
             {
             alert(new Date().getTime() - start);
             }*/
            // if ($("#canvasHolder").hasClass("finished") && $("#preloader").hasClass('remove'))
            //  {
            //finishUp();
            //  }

        });
    }
};

function check_element(ele, context)
{
    var all = document.getElementsByTagName("*");
    var totalele = all.length;
    var per_inc = 100 / all.length;

    if ($(ele).on())
    {
        percentComplete = per_inc + Number(document.getElementById("progress_width").value);
        document.getElementById("progress_width").value = percentComplete;
        /* */
        curPerc = percentComplete;
        $("#bar1").animate({width: percentComplete + "%"}, 10);
        $('#circle').circleProgress({
            value: percentComplete,
            size: 80,
            fill: {
                gradient: ["red", "orange"]
            }
        }).on('circle-animation-progress', function (event, progress) {
            $(this).find('strong').html(Math.round(100 * progress) + '<i>%</i>');

            var canvas = document.getElementById('myCanvas');
            function animate(current) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.beginPath();
                context.arc(x, y, radius, -(quart), ((circ) * current) - quart, false);
                context.stroke();
                /*curPerc++;
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
                }*/
            }
            animate(progress);
        });
    }

    else
    {
        set_ele(ele);
    }
}

function set_ele(set_element, context)
{
    check_element(set_element, context);
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
    $('#circle2').circleProgress({
        value: percentComplete,
        size: 80,
        fill: {
            gradient: ["red", "orange"]
        }
    });
    /*$('#info-opener').animate({opacity: '1'}, 'slow');
     $('body').css({'overflow': 'visible'});
     
     $('#preloader').delay(500).fadeOut('slow', function ()
     {
     $('#backdiv').animate({opacity: '1'}, 'slow');
     $('#status').delay(500).fadeOut('slow');     });*/
}



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
            curPerc = percentComplete;
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