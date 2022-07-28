let list = document.querySelectorAll('.list');

for(let i = 0; i < list.length; i++){
    list[i].onmouseover = () => {
        let j = 0;
        while(j < list.length) {
            list[j++].className = 'list';
        }
        list[i].className = 'list active';
    }
}
window.addEventListener('scroll', reveal);

function reveal() {
    let reveals = document.querySelectorAll('.reveal');

    for(let i = 0; i < reveals.length; i++) {
        let windowheight = window.innerHeight;
        let revealtop = reveals[i].getBoundingClientRect().top;
        let revealpoint = 150;

        if(revealtop < windowheight - revealpoint) {
            reveals[i].classList.add('active');
            let j = 0;
            while(j < list.length) {
                list[j++].classList.remove('active');
            }
            list[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

$(function() {
    $('#home').click(function() {
        $('html,body').animate({scrollTop: $('#Home').offset().top}, 600);
    });
    $('#developer').click(function() {
        $('html,body').animate({scrollTop: $('#developer1').offset().top}, 600);
    });
    $('#operate').click(function() {
        $('html,body').animate({scrollTop: $('#intro4').offset().top}, 600);
    });
    $('#intro').click(function() {
        $('html,body').animate({scrollTop: $('#intro1').offset().top}, 600);
    });
    $('#skill').click(function() {
        $('html,body').animate({scrollTop: $('#intro2').offset().top}, 600);
    });
    $('#role').click(function() {
        $('html,body').animate({scrollTop: $('#intro3').offset().top}, 600);
    });
    $('#MintNFT').click(function() {
        $('html,body').animate({scrollTop: $('#mint').offset().top}, 600);
    });
    $('#aboutNFT').click(function() {
        $('html,body').animate({scrollTop: $('#aboutNFT1').offset().top}, 600);
    });
})