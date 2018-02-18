  'use strict';


window.onload = function() {
    var video_out = document.getElementById("vid-box");

    function login(form) {
      var phone = window.phone = PHONE({
        number        : form.username.value || "Anonymous", // listen on username line else Anonymous
        publish_key   : 'pub-c-da6a1135-eae5-44bb-86f5-3ebdd87d500b',
        subscribe_key : 'sub-c-445d9000-142a-11e8-91c1-eac6831c625c',
      });
      phone.ready(function(){ form.username.style.background="#55ff5b"; });
      phone.receive(function(session){
        session.connected(function(session) { video_out.appendChild(session.video); });
        session.ended(function(session) { video_out.innerHTML=''; });
      });
      return false;   // So the form does not submit.
    }
      
    function makeCall(form){
      if (!window.phone) alert("Login First!");
      else phone.dial(form.number.value);
      return false;
    }

    function takepicture() { while (hangupButton==0) {
      var context = canvas.getContext('2d');
      if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
      
        var datanew = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
          VTHacksnewtestsnew.htm(data);
          if ( VTHacksnewtestsnew.htm >.9)
          document.getElementById("lres").innerHTML = "You laughed You lost";
          return hangup();
     
      }
      else {
        clearphoto();
      }
        
      }
      return hangup();
      }

    function processImage() {
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
        var sourceImageUrl = document.getElementById("inputImage").value;
        document.querySelector("#sourceImage").src = sourceImageUrl;
        // Perform the REST API call.
        $.ajax({
            url: uriBase + "?" + $.param(params),
            // Request headers.
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },
            type: "POST",
            // Request body.
            data: '{"url": ' + '"' + sourceImageUrl + '"}',
        })
        .done(function(data) {
            // Show formatted JSON on webpage.
    $("#smileval").text(data[0].faceAttributes.smile);
    $("#happyval").text(data[0].faceAttributes.emotion.happiness);
    
            $("#responseTextArea").val(JSON.stringify(data, null, 1));
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ? 
                jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
    };
}