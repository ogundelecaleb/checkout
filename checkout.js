const PaylodeCheckout = {
    records: undefined,
    onCloseCallback: undefined,
    setup: function (data) {
      // Create the payment modal iframe
      records = data;
      // if (data.onClose != undefined) {
      //   data.onClose();
      // }
      //data.onClose();
      //data.callback();
      this.onCloseCallback = data.onClose;
      console.log(records);
      return this;
    },
    openIframe: function () {
      var onCloseCallbackStr = this.onCloseCallback ? this.onCloseCallback.toString() : '';
  
  
      var iframe = document.createElement("iframe");
      iframe.src = `https://Widget-paylode.netlify.app?publicKey=${encodeURIComponent(
        records.publicKey
      )}&amount=${encodeURIComponent(
        records.amount
      )}&currency=${encodeURIComponent(records.currency)}&onCloseCallback=${encodeURIComponent(onCloseCallbackStr)}`;
      iframe.style.border = "none";
      iframe.style.width = "100%";
      iframe.style.height = "100vh";
      iframe.style.position = "fixed";
      iframe.style.top = "0";
      iframe.style.left = "0";
      iframe.style.zIndex = "9999";
  
      // Append the iframe to the body
      document.body.appendChild(iframe);
  
      // Listen for messages from the iframe
      window.addEventListener("message", this.receiveMessage.bind(this), false);
      
    },
    receiveMessage: function (event) {
      // Check if the message is from the iframe and contains the expected data
      if (
        // event.data.source === "Widget-paylode" &&
        // event.data.type === "closeModal" &&
        typeof this.onCloseCallback === "function"
      ) {
        // Call the onClose callback function with the desired return values
        this.onCloseCallback(event.data.data);
  
        // Remove the iframe from the body
        document.body.removeChild(event.source.frameElement);
      }
    }
  };
  