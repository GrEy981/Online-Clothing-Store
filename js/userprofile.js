$(document).ready(function () {
    console.log("ready!");



    $.ajaxSetup({
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true
    });
    let userid = localStorage.getItem('userid');
    var url_profile = "http://localhost:3000/userprofile/";
    function add(forProfile) {
        $("#First_name").text(forProfile.First_name);
        $("#Last_name").text(forProfile.Last_name);
        $("#Address").text(forProfile.Address);
        $("#Phone_number").text(forProfile.Phone_number);
        $("#username").text(forProfile.username);
        $("#password").text(forProfile.pasword);
    }

    $.ajax({
        type: "GET",
        url: url_profile + "showProfile/" + userid,
        success: function (prof) {

            console.log(prof);
            let forProfile = prof;
            add(forProfile);
        },

        error: function () {

            alert("Something went wrong!!");
        }
    });

});