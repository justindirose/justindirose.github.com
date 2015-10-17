//****************************************************
// MAIN APP JQUERY
// ****************************************************


// NAVIGATION
// Triggers change on nav-icon from hamburger to X
$(document).ready(function(){
    $('label[for="nav-trigger"]').click(function(){
        $('#nav-icon').toggleClass('open');
    });
});
