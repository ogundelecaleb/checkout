import { encrypt } from 'n-krypta';

const PaylodeCheckout = {
  // secret key for encryption
  records: undefined,
  onCloseCallback: undefined,
  onSuccessCallback: undefined,
  setup: function (data) {
    // Create the payment modal iframe
    records = data;
    // if (data.onClose != undefined) {
    //   data.onClose();
    // }
    //data.onClose();
    //data.callback();
    this.onSuccessCallback = data.onSuccess;
    this.onCloseCallback = data.onClose;
    console.log(records);
    return this;
  },
  openIframe: function () {
    const secret = "my-secret";
    var onCloseCallbackStr = this.onCloseCallback
      ? this.onCloseCallback.toString()
      : "";
    var onSuccessCallbackStr = this.onSuccessCallback
      ? this.onSuccessCallback.toString()
      : "";
    const encryptedString = encrypt(onCloseCallbackStr, secret);
    console.log(encryptedString);

    var iframe = document.createElement("iframe");
    iframe.src = `http://94.229.79.27:3812?publicKey=${encodeURIComponent(
      records.publicKey
    )}&amount=${encodeURIComponent(
      records.amount
    )}&currency=${encodeURIComponent(
      records.currency
    )}&email=${encodeURIComponent(
      records.email
    )}&onCloseCallback=${encodeURIComponent(
      encryptedString
    )}&onSuccessCallback=${encodeURIComponent(onSuccessCallbackStr)}`;
    iframe.style.border = "none";
    iframe.style.width = "100%";
    iframe.style.height = "100vh";
    iframe.style.position = "fixed";
    iframe.style.top = "0";
    iframe.style.left = "0";
    iframe.onload = '<!DOCTYPE html><p style="color: green;">Loading...</p>';
    iframe.style.zIndex = "9999";

    // Append the iframe to the body
    document.body.appendChild(iframe);

    // Listen for messages from the iframe
    window.addEventListener("message", this.receiveMessage.bind(this), false);
  },
  receiveMessage: function (event) {
    // Check if the message is from the iframe and contains the expected data
    if (
      typeof this.onCloseCallback === "function" ||
      typeof this.onSuccessCallback === "function"
    ) {
      // Call the onClose callback function with the desired return values
      this.onCloseCallback(event.data.data);
      this.onSuccessCallback(event.data.data);
      // Remove the iframe from the body
      document.body.removeChild(event.source.frameElement);
    }
  },
};

// export default PaylodeCheckout;