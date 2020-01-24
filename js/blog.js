$(document).ready(function () {
    console.log("ready!");



    $.ajaxSetup({
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true
    });

    $(function () {
        let row = $("#blog");
        let base_url = "http://localhost:3000/";


        function rowTemplate(blog) {
            let oneRow = '<div class="card col-md-12 mb-5" style="width: 45rem;" >' +
                '<div class=card-body>' + '<h5 class="card-title">' + blog.topic + '</h5>' + '<p class="card-text">' + blog.description +
                '</p>' +
                '<p class="card-footer" >' + 'Blog by: ' + blog.First_name +
                '<p classs="fa-pull-right">' + 'Posted At: ' + blog.createdAt + '</p>'

            '</div> </div>' +
                '<hr size="30px"> ';

            return oneRow;
        }



        $.ajax({
            type: "GET",
            url: base_url + "blog",
            success: function (blogs) {
                let myRows = [];
                $.each(blogs, function (index, blog) {
                    myRows.push(rowTemplate(blog));
                });
                row.append(myRows);
            },
            error: function () {
                alert("Something went wrong!");
            }
        });

        $("#add-blog").on("click", function () {
            let blog = {
                topic: $("#topic").val(),
                description: $("#description").val(),
                First_name: $("#username").val(),
            };

            $.ajax({
                type: "POST",
                url: base_url + "blog",
                data: blog,
                success: function (blog) {
                    row.append(rowTemplate(blog));
                    imageFile = "";
                    $("#blog-form").trigger("reset");
                    alert("Blog added successfully!");
                },
                error: function () {
                    alert("Fill all the blog fields!");
                }
            });
        });
    });
});