$(document).ready(function () {

    $('#my-video').backgroundVideo();
    $('.service-list').toggle('height');
    $('#info-content').toggle('left');
    $('#horiz-line').toggle('width');
    $('#vert-line').toggle('height');
    $('#left-line').toggle('width');
    $('#right-line').toggle('width');
    $('#manifest').toggle('height');

    $('#info-bar').toggle('visibility');
    // $('#text-bar').toggle('width');
    //console.log("add scroll event");
    $(window).scroll(checkTopPos);

    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: 160
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

$('input[type="checkbox"]').on('change', function() {
    if($(this).is(":checked")) {
       $("#backdiv").removeClass('displayon');
    }
    else
    {
       $("#backdiv").addClass('displayon');
    }
});