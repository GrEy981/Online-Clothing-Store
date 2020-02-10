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
            let oneRow = '<div class="card col-md-12 mb-5" style="width: 45rem;" >' +
                '<div class=card-body>' + '<h5 class="card-title" style="text-align:center">' + news.topic + '</h5>' + '  <p class="card-text">' + news.description +
                '</p>' +

                '</div> </div>' +
                '<hr size="30px"> ';

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






    });
});