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

        function rowTemplate(cart) {
            let oneRow = "<tr><td>" + cart.product_name + "</td><td>" + cart.product_desc + "</td>" + "<td>" + cart.amount + "</td>" + "<td>" + cart.price + "</td>";
            if (cart.image !== "") {
                oneRow +=
                    "<td><img src= " +
                    base_url +
                    "uploads/" +
                    cart.image +
                    " width='60' /></td>";
            } else {
                oneRow += "<td> No Image </td>";
            }

            oneRow +=
                '<td> <button type="button" class="btn btn-success order" data-toggle="modal" data-target="#exampleModal" cart_id=' + cart._id +
                "><i class='fas fa-check'></i> Order Now</button>";
            oneRow +=
                '<button type="button"   class="btn btn-danger delete" style="margin-left:7px"  cart_id=' + cart._id +
                "><i class='fas fa-trash'></i> Remove product from cart</button></td> </tr>";
            return oneRow;
        }


        $.ajax({
            type: "GET",
            url: base_url + "carts" + "/findmycart",
            success: function (carts) {
                let myRows = [];
                $.each(carts, function (index, cart) {
                    myRows.push(rowTemplate(cart));
                });
                tblBody.append(myRows);
            },
            error: function () {
                alert("Something went wrong!");
            }
        });

        tblBody.on("click", ".delete", function () {
            $.ajax({
                type: "DELETE",
                url: base_url + "carts/" + $(this).attr("cart_id"),
                success: function () {
                    alert("Cart deleted successfully!!!!");
                    window.location.href = "mycarts.html";
                }
            });
        });

        let cartId;
        tblBody.on("click", '.order', function () {
            cartId = $(this).attr('cart_id');
            $.ajax({
                type: 'GET',
                url: base_url + 'carts/' + cartId,
                success: function (cart) {
                    console.log(cart);

                    $('#carts').val(cart._id);


                },
                error: function () {
                    console.log("Something went wrong!");
                }
            });
        });
        $("#add-order").on("click", function () {
            let order = {
                carts: $("#carts").val(),

            };

            $.ajax({
                type: "POST",
                url: base_url + "orders",
                data: order,
                success: function (order) {
                    tblBody.append(rowTemplate(order));
                    window.location.href = "mycarts.html"
                    alert("Item order has been placed!");

                },
                error: function () {
                    alert("something went wrong");
                }
            });
        });

        $("#remove-carts").on("click", function () {
            if (confirm("Do you want to delete all carts?")) {
                $.ajax({
                    type: "DELETE",
                    url: base_url + "carts",
                    success: function () {
                        window.location.href = "mycarts.html";
                    },
                    error: function () {
                        alert("Couldn't delete all the carts");
                    }
                });
            }
        });

    });

});