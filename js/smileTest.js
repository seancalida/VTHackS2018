setInterval(analyze, 2000);
function analyze() {
  if (checkSmile) {
    console.log("anotha one");
    var video = document.querySelector('video');
    if (!video){console.log("no video found")};

    var canvas = document.querySelector('canvas');
    var context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, video.width, video.height);
    document.getElementById('photo').setAttribute('src', canvas.toDataURL('image/png'));

    var subscriptionKey = "8d3c23ec9e66474eb8c482a81d11dae6";
    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
    var params = {
      "returnFaceAttributes": "smile,emotion",
    };
    $.ajax({
      url: uriBase + "?" + $.param(params),

      // Request headers.
      beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Content-Type","application/octet-stream");
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
      },

      type: "POST",

      // Request body.
      data: makeblob(canvas.toDataURL()),

      processData: false
    })
    .done(function(data) {
      // Show formatted JSON on webpage.
      console.log("something should be on text");
      console.log(JSON.stringify(data));
      var smile1 = data[0].faceAttributes.smile;
      var happy1 = data[0].faceAttributes.emotion.happiness;
      console.log(smile1);
      console.log(happy1);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      // Display error message.
      var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
      errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
      jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
      alert(errorString);
    });
  }
}

// Makes the image data url into a binary type
makeblob = function (dataURL) {
  var BASE64_MARKER = ';base64,';
  if (dataURL.indexOf(BASE64_MARKER) == -1) {
    var parts = dataURL.split(',');
    var contentType = parts[0].split(':')[1];
    var raw = decodeURIComponent(parts[1]);
    return new Blob([raw], { type: contentType });
  }
  var parts = dataURL.split(BASE64_MARKER);
  var contentType = parts[0].split(':')[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;

  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}
