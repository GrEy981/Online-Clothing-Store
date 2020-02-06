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

        function rowTemplate(order) {
            let oneRow = "<tr><td>" + order.carts.product_name + "</td><td>" + order.carts.product_desc + "</td>" + "<td>" + order.carts.amount + "</td>" + "<td>" + order.carts.price + "</td>" + "<td>" + order.User.username + "</td>" + "<td>" + order.User.Address + "</td>" + "<td>" + order.User.Phone_number + "</td>";
            if (order.carts.image !== "") {
                oneRow +=
                    "<td><img src= " +
                    base_url +
                    "uploads/" +
                    order.carts.image +
                    " width='60' /></td>";
            } else {
                oneRow += "<td> No Image </td>";
            }

            oneRow +=
                '<td><button type="button"   class="btn btn-success delete" style="margin-left:7px"  order_id=' + order._id +
                "><i class='fas fa-check'></i> Order delivered</button></td> </tr>";
            return oneRow;
        }


        $.ajax({
            type: "GET",
            url: base_url + "orders",
            success: function (orders) {
                let myRows = [];
                $.each(orders, function (index, order) {
                    myRows.push(rowTemplate(order));
                });
                tblBody.append(myRows);
            },
            error: function () {
                alert("Something went wrong!");
            }
        });


        tblBody.on("click", ".delete", function () {
            if (confirm("Are you sure the orders are delivered?")) {
                $.ajax({
                    type: "DELETE",
                    url: base_url + "orders/" + $(this).attr("order_id"),
                    success: function () {
                        alert("Orders deleted successfully!!");
                        window.location.href = "adminorders.html";
                    },
                    error: function () {
                        alert("Couldn't delete the order!!");
                    }
                });
            }
        });

    });
});