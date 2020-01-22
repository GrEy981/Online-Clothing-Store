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
        let imageFile = "";
        let userid = localStorage.getItem('userid');

        function rowTemplate(furnitures) {
            let oneRow = '<div class="col-sm-6 mb-5" style="padding: 0 15px">';
            if (furnitures.image !== "") {
                oneRow +=
                    "<div class=card style=border:0> <img src= " + base_url + "uploads/" + furnitures.image + " /><div class=card-body>";
            } else {
                oneRow += "<p> No Image </p>";
            }
            oneRow += '<h3 class="card-title" style="text-align:center">' + furnitures.product_name + '</h3>' + ' <p class="card-text">' + '<b> Description: ' + furnitures.product_desc + '</b>' + '</p>' + '<p class="card-text">' + '<b> Quantity: ' + furnitures.quantity + '</b>' + '</p>'
                ;
            oneRow +=
                '<p class="card-footer " >' + '<b> Price: NRs. ' + furnitures.price + '</b>' + '</p>';


            oneRow +=
                '<td> <button type="button" data-toggle="modal" data-target="#exampleModal" class="btn btn-dark fa-pull-right cart" furnitures_id=' + furnitures._id +
                ">Add to cart</button>" + '</div> </div> </div>';

            return oneRow;

        }


        $.ajax({
            type: "GET",
            url: base_url + "furniture",
            success: function (furniture) {
                let myRows = [];
                $.each(furniture, function (index, furnitures) {
                    myRows.push(rowTemplate(furnitures));
                });
                tblBody.append(myRows);
            },
            error: function () {
                alert("Something went wrong!");
            }
        });
        let furnituresId;
        tblBody.on("click", '.cart', function () {
            furnituresId = $(this).attr('furnitures_id');
            $.ajax({
                type: 'GET',
                url: base_url + 'furniture/' + furnituresId,
                success: function (furnitures) {
                    console.log(furnitures);
                    $('#product_name').val(furnitures.product_name);
                    $('#product_desc').val(furnitures.product_desc);
                    $('#quantity').val(furnitures.quantity);
                    $('#price').val(furnitures.price);
                    $('#image').val(furnitures.image);

                    $('#edit-furnitures').show();
                },
                error: function () {
                    console.log("Something went wrong!");
                }
            });
        });

        $("#add-cart").on("click", function () {
            let cart = {
                product_name: $("#product_name").val(),
                product_desc: $("#product_desc").val(),
                quantity: $("#quantity").val(),
                price: $("#price").val(),
                image: $("#image").val(),
                amount: $("#amount").val()
            };

            $.ajax({
                type: "POST",
                url: base_url + "carts/",
                data: cart,
                success: function (cart) {
                    tblBody.append(rowTemplate(cart));
                    imageFile = "";

                    alert("Added to cart successfully!");
                    window.location.href = "home.html";
                },
                error: function () {
                    alert("Select the amount to buy!");
                }
            });
        });

    });
});
