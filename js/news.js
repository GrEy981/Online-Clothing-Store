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

        function rowTemplate(news) {
            let oneRow = "<tr><td>" + news.topic + "</td><td>" + news.description + "</td>"

            oneRow +=
                '<td> <button type="button" data-toggle="modal" data-target="#exampleModal" class="btn btn-primary update" news_id=' + news._id +
                "><i class='fa fa-edit'></i> Edit news</button>";
            oneRow +=
                '<button type="button"   class="btn btn-danger delete" style="margin-left:7px"  news_id=' + news._id +
                "><i class='fa fa-trash'></i> Delete</button></td> </tr>";
            return oneRow;
        }


        $.ajax({
            type: "GET",
            url: base_url + "news",
            success: function (news) {
                let myRows = [];
                $.each(news, function (index, news) {
                    myRows.push(rowTemplate(news));
                });
                tblBody.append(myRows);
            },
            error: function () {
                alert("Something went wrong!");
            }
        });


        $("#add-news").on("click", function () {
            let news = {
                topic: $("#topic").val(),
                description: $("#description").val(),

            };

            $.ajax({
                type: "POST",
                url: base_url + "news",
                data: news,
                success: function (news) {
                    tblBody.append(rowTemplate(news));
                    imageFile = "";
                    $("#news-form").trigger("reset");
                    alert("News added successfully!");
                },
                error: function () {
                    alert("Fill all the form fields!");
                }
            });
        });

        $("#remove-news").on("click", function () {
            if (confirm("Do you want to delete all news?")) {
                $.ajax({
                    type: "DELETE",
                    url: base_url + "news",
                    success: function () {
                        windows.location.href = "news.html";
                        alert("All news deleted!");
                    },
                    error: function () {
                        alert("Couldn't delete all news!");
                    }
                });
            }
        });

        tblBody.on("click", ".delete", function () {
            $.ajax({
                type: "DELETE",
                url: base_url + "news/" + $(this).attr("news_id"),
                success: function () {
                    alert("News deleted successfully");
                    window.location.href = "news.html";
                }
            });
        });

        let newsId;
        tblBody.on("click", '.update', function () {
            newsId = $(this).attr('news_id');
            $.ajax({
                type: 'GET',
                url: base_url + 'news/' + newsId,
                success: function (news) {
                    console.log(news);
                    $('#topic').val(news.topic);
                    $('#description').val(news.description);

                    $('#add-news').hide();
                    $('#edit-news').show();
                },
                error: function () {
                    console.log("Something went wrong!");
                }
            });
        });

        $('#edit-news').on('click', function () {
            let news = {
                topic: $("#topic").val(),
                description: $("#description").val(),

            };
            $.ajax({
                type: 'PUT',
                url: base_url + 'news/' + newsId,
                data: news,
                success: function (news) {
                    console.log(news);
                    window.location.href = "news.html";
                }
            })
        });


    });
});