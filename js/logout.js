$(function () {

    $.ajaxSetup({
        xhrfields: {
            withCredentials: true
        },
        crossDomain: true
    });

    $("#logout").on('click', function (event) {
        console.log("Logout process");
        $.ajax({

            type: 'GET',
            url: 'http://localhost:3000/users/logout',
            success: function () {
                alert('Logged out successfully!!');
                var url = "login.html"
                $(location).attr("href", url);
            },
            error: function () {
                alert('You are not logged in to the website!')
                var url = "login.html"
                $(location).attr("href", url);
            }
        });
    });
});