$(document).ready(function () {
    console.log("ready!");



    $.ajaxSetup({
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true
    });
    let userid = localStorage.getItem('userid');
    var base_url = "http://localhost:3000/userprofile/";
    let imageFile = "";

    function view(myDetail) {

        $("#firstName").val(myDetail.First_name);
        $("#lastname").val(myDetail.Last_name);
        $("#username").val(myDetail.username);
        $("#address").val(myDetail.Address);
        $("#contact_no").val(myDetail.Phone_number);
        $("#userid").val(myDetail._id);
        if (myDetail.image !== "") {

            $('#profile-img').attr("src", "http://localhost:3000/uploads/" + myDetail.image);


        } else {

        }
    }
    $("#btn-update").on("click", e => {
        e.preventDefault();

        let data = {
            First_name: $("#firstName").val(),
            Last_name: $("#lastname").val(),
            Address: $("#address").val(),
            Phone_number: $("#contact_no").val(),
            image: imageFile


        };

        $.ajax({
            type: "PUT",
            crossDomain: true,
            withCredentials: true,
            url: base_url + "updateProfile",
            data: data,
            dataType: "json",
            success: function (data) {
                alert("Profile updated sucessfully!!");
                console.log(data);
                location.reload();
                view(myDetail)
            },
            error: function () {
                alert("Something wrong!");
                console.log(data);
            }
        });
    });
    $("#fileToUpload").on("change", function () {
        let formData = new FormData();
        let files = $("#fileToUpload").get(0).files;
        if (files.length > 0) {
            formData.append("imageFile", files[0]);
        }

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/" + "upload",
            contentType: false,
            cache: false,
            processData: false,
            data: formData,
            success: function (data) {
                imageFile = data.filename;

            },
            error: function () {
                alert("Image upload failed!");
            }
        });
    });

    $.ajax({
        type: 'GET',
        url: base_url + "showProfile/" + userid,
        success: function (users) {
            let myDetail = users;
            view(myDetail)
            console.log(users);
            console.log(users.username);
        },
        error: function () {
            alert('Something went wrong!');

        }
    });
});