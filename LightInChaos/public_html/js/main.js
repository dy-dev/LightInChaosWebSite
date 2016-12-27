$(document).ready(function () {

    $('#my-video').backgroundVideo();
    $('.service-list').toggle('height');
    $('#info-content').toggle('left');
    $('#info-bar').toggle('visibility');
    // $('#text-bar').toggle('width');
    //console.log("add scroll event");
    $(window).scroll(checkTopPos);
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
$('#sidebar-button').click(function () {
    $('#info-content').animate({left: 'toggle'});
    if ($("#info-content").position().left === 0)
    {
        $('#sidebar-button').removeClass('custom-open-button');
        $('#sidebar-button').addClass('custom-close-button');

    }
    else
    {
        $('#sidebar-button').removeClass('custom-close-button');
        $('#sidebar-button').addClass('custom-open-button');

    }
});
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

function manageInfoDisplay()
{
    /*  if ($("#text-bar").is(":visible"))
     {
     toggle('#text-bar');
     }
     toggle('#info-bar');*/
}