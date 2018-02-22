setInterval(canvs, 2000);
function canvs() {
  try {
    var video = document.querySelector('video');
    if (!video)
    throw "no video";
    var canvas = document.querySelector('canvas');
    // Get a handle on the 2d context of the canvas element
    var context = canvas.getContext('2d');
    // Define some vars required later


    var img = new Image();
    img.src = canvas.toDataURL(1);
    img.onload = function() {
      context.drawImage(video, 0, 0, img.width, img.height);
      console.log(img.width);
      console.log(img.height);

      $("#snapshots").empty();
      const formData = new FormData();
      formData.append('image', img.src.split('base64')[1]);
      formData.append('type', 'base64');

      fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: new Headers({
          Authorization: 'Client-ID 90ef1830bd083ba'
        }),
        body: formData
      }).then(response => {
        if (response.ok) {
          console.log(response);
          response.json().then((json) => {
            console.log(json);
            console.log(json.data.link);
            var imgf = json.data.link;

            // **********************************************
            // *** Update or verify the following values. ***
            // **********************************************
            // Replace the subscriptionKey string value with your valid subscription key.
            var subscriptionKey = "8d3c23ec9e66474eb8c482a81d11dae6";
            // Replace or verify the region.
            //
            // You must use the same region in your REST API call as you used to obtain your subscription keys.
            // For example, if you obtained your subscription keys from the westus region, replace
            // "westcentralus" in the URI below with "westus".
            //
            // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
            // a free trial subscription key, you should not need to change this region.
            var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
            // Request parameters.
            var params = {
              "returnFaceAttributes": "smile,emotion",
            };
            // Display the image.
            console.log(img.src);
            // Perform the REST API call.
            $.ajax({
              url: uriBase + "?" + $.param(params),
              // Request headers.
              beforeSend: function(xhrObj) {
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
              },
              type: "POST",
              // Request body.
              data: '{"url": ' + '"' + imgf + '"}',
            })
            .done(function(data) {
              // Show formatted JSON on webpage.
              var smile1 = data[0].faceAttributes.smile;
              if (smile1 >= .9)
              alert("You Lost");
              console.log(smile1);
              var happy1 = data[0].faceAttributes.emotion.happiness;
              if (happy1 >= .9)
              alert("You Lost");
              console.log(happy1);
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
              // Display error message.
              var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
              errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
              jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
              alert(errorString);
            });
          })
          // alert('Image uploaded to album');
        }
      })
    };
  } catch (err) {
    console.log(err);
  }
}
