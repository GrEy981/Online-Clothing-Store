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

        function rowTemplate(furnitures) {
            let oneRow = "<tr><td>" + furnitures.product_name + "</td><td>" + furnitures.product_desc + "</td>" + "<td>" + furnitures.quantity + "</td>" + "<td>" + furnitures.price + "</td>";
            if (furnitures.image !== "") {
                oneRow +=
                    "<td><img src= " +
                    base_url +
                    "uploads/" +
                    furnitures.image +
                    " width='60' /></td>";
            } else {
                oneRow += "<td> No Image </td>";
            }

            oneRow +=
                '<td> <button type="button" data-toggle="modal" data-target="#exampleModal" class="btn btn-primary update" furnitures_id=' + furnitures._id +
                "><i class='far fa-edit'></i> Edit</button>";
            oneRow +=
                '<button type="button"   class="btn btn-danger delete" style="margin-left:7px"  furnitures_id=' + furnitures._id +
                "><i class='fa fa-trash'></i> Delete</button></td> </tr>";
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

        $("#fileToUpload").on("change", function () {
            let formData = new FormData();
            let files = $("#fileToUpload").get(0).files;
            if (files.length > 0) {
                formData.append("imageFile", files[0]);
            }

            $.ajax({
                type: "POST",
                url: base_url + "upload",
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

        $("#add-furnitures").on("click", function () {
            let furnitures = {
                product_name: $("#product_name").val(),
                product_desc: $("#product_desc").val(),
                quantity: $("#quantity").val(),
                price: $("#price").val(),
                image: imageFile
            };

            $.ajax({
                type: "POST",
                url: base_url + "furniture",
                data: furnitures,
                success: function (furnitures) {
                    tblBody.append(rowTemplate(furnitures));
                    imageFile = "";
                    $("#furnitures-form").trigger("reset");
                    alert("furniture added successfully!");
                },
                error: function () {
                    alert("Fill all the form fields!");
                }
            });
        });

        $("#remove-furniture").on("click", function () {
            if (confirm("Do you want to delete all furniture?")) {
                $.ajax({
                    type: "DELETE",
                    url: base_url + "furniture",
                    success: function () {
                        window.location.href = "adminpanel.html";
                    },
                    error: function () {
                        alert("Couldn't delete all furniture");
                    }
                });
            }
        });

        tblBody.on("click", ".delete", function () {
            $.ajax({
                type: "DELETE",
                url: base_url + "furniture/" + $(this).attr("furnitures_id"),
                success: function () {
                    alert("furniture deleted successfully");
                    window.location.href = "adminpanel.html";
                }
            });
        });

        let furnituresId;
        tblBody.on("click", '.update', function () {
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

                    $('#add-furnitures').hide();
                    $('#edit-furnitures').show();
                },
                error: function () {
                    console.log("Something went wrong!");
                }
            });
        });

        $('#edit-furnitures').on('click', function () {
            let furnitures = {
                product_name: $("#product_name").val(),
                product_desc: $("#product_desc").val(),
                quantity: $("#quantity").val(),
                price: $("#price").val(),
                image: imageFile
            };
            $.ajax({
                type: 'PUT',
                url: base_url + 'furniture/' + furnituresId,
                data: furnitures,
                success: function (furnitures) {
                    console.log(furnitures);
                    location.reload();
                }
            })
        });


    });
});