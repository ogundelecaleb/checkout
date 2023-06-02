const PaylodeCheckout = {
  records: undefined,
  setup: function (data) {
    // Create the payment modal iframe
    records = data;
    if(data.onClose != undefined){
        data.onClose();
    }
    //data.onClose();
    //data.callback();
    console.log(records);
    return this;
  },
  openIframe: function () {
    var iframe = document.createElement("iframe");
    iframe.src = `https://Widget-paylode.netlify.app?publicKey=${encodeURIComponent(
      records.publicKey
    )}&amount=${encodeURIComponent(
      records.amount
    )}&currency=${encodeURIComponent(records.currency)}`;
    iframe.style.border = "none";
    iframe.style.width = "100%";
    iframe.style.height = "100vh";
    iframe.style.position = "fixed";
    iframe.style.top = "0";
    iframe.style.left = "0";
    iframe.style.zIndex = "9999";

    // Append the iframe to the body
    document.body.appendChild(iframe);
  },
};
