$(document).ready(function () {
    console.log("ready!");

    $.ajaxSetup({
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true
    });

    var base_url = "http://localhost:3000/users/";

    $("#btnLogin").on("click", e => {
        e.preventDefault();
        console.log("Hello");

        let data = {

            username: $("#iptUsername").val(),
            password: $("#iptPassword").val()

        };

        $.ajax({
            type: "POST",
            url: base_url + "login",
            data: data,
            success: function (data) {
                localStorage.setItem('userid', data.userid);
                console.log(data.admin);
                if (data.admin === true) {
                    alert("You are Successfully Logged In as Admin!!");
                    window.location.href = 'adminpanel.html';
                } else {
                    alert("You are Successfully Logged In!!");
                    window.location.href = 'home.html';
                }
            },
            error: function () {
                alert("Please enter correct email or password!!");
            }
        });
    });

    $("#btnRegister").on("click", e => {
        e.preventDefault();

        console.log("register process");

        let data = {
            First_name: $("#iptFirstnameRegister").val(),
            Last_name: $("#iptLastnameRegister").val(),
            Address: $("#iptAddressRegister").val(),
            Phone_number: $("#iptPhonenumberRegister").val(),
            username: $("#iptUsernameRegister").val(),
            password: $("#iptPasswordRegister").val()
        };

        $.ajax({
            type: "POST",
            url: base_url + "signup",
            data: data,
            success: function (data) {
                alert("Successfully Registered!!");
                console.log(data);

                // var url = "signup.html";
                // $(location).attr("href", url);

                window.location.href = "signup.html";
            },
            error: function () {
                alert("Username already taken!");
            }
        });
    });
});