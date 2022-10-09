function genQR() {
    $.ajax({
        method: 'post',
        url: 'http://localhost:3000/generateQR',
        data: {
            amount: parseFloat($("#amount").val())
        },
        success: function(response) {
            console.log('good', response)
            $("#imgqr").attr('src', response.Result)
        }, error: function(err) {
            console.log('bad', err)
        }
    })
}