function modifyImages() {
    const imageElements = document.querySelectorAll(
      'image[height="115"][transform="scale(.01 .0087)"][width="100"]'
    );
    const imageElement = imageElements[0];
  
    if (!imageElement) return;
  
    const imageUrl = chrome.runtime.getURL("logo/twitter.png");
  
    imageToBase64(imageUrl, function (base64ImageData) {
      console.log(base64ImageData);
      imageElement.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "xlink:href",
        base64ImageData
      );
    });
  }
  
  function imageToBase64(imageUrl, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", imageUrl, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
      if (xhr.status === 200) {
        const reader = new FileReader();
        reader.onloadend = function () {
          callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      }
    };
    xhr.send();
  }
  
  document.addEventListener("load", modifyImages);
