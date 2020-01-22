$(document).ready(function () {
    console.log("ready!");



    $.ajaxSetup({
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true
    });

    $(function () {
        let tblBody = $("#tblbody");
        let base_url = "http://localhost:3000/";

        function rowTemplate(user) {
            let oneRow = "<tr><td>" + user.First_name + "</td><td>" + user.Last_name + "</td>" + "<td>" + user.Address + "</td>" + "<td>" + user.Phone_number + "</td>" + "<td>" + user.username + "</td>";
            if (user.image !== "") {
                oneRow +=
                    "<td><img src= " +
                    base_url +
                    "uploads/" +
                    user.image +
                    " width='60' /></td>";
            } else {
                oneRow += "<td> No Image </td>";
            }
            oneRow +=
                '<td><button type="button"   class="btn btn-danger delete" style="margin-left:7px"  user_id=' + user._id +
                "><i class='fa fa-trash'></i> Delete</button></td> </tr>";
            return oneRow;
        }


        $.ajax({
            type: "GET",
            url: base_url + "users",
            success: function (users) {
                let myRows = [];
                $.each(users, function (index, user) {
                    myRows.push(rowTemplate(user));
                });
                tblBody.append(myRows);
            },
            error: function () {
                alert("Something went wrong!");
            }
        });


        tblBody.on("click", ".delete", function () {
            if (confirm("Are you sure you want to delete this user account?")) {
                $.ajax({
                    type: "DELETE",
                    url: base_url + "users/" + $(this).attr("user_id"),
                    success: function () {
                        alert("User deleted successfully!!");
                        window.location.href = "adminViewusers.html";
                    },
                    error: function () {
                        alert("Couldn't delete the user!!");
                    }
                });
            }
        });

    });
});