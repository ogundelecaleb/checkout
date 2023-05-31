function openPaymentModal(publicKey, secretKey, amount, currency) {
  // Create the payment modal iframe
  var iframe = document.createElement("iframe");
  iframe.src = `https://Widget-paylode.netlify.app?publicKey=${encodeURIComponent(
    publicKey
  )}&secretKey=${encodeURIComponent(secretKey)}&amount=${encodeURIComponent(
    amount
  )}&currency=${encodeURIComponent(currency)}`;
  iframe.style.border = "none";
  iframe.style.width = "100%";
  iframe.style.height = "100vh";
  iframe.style.position = "fixed";
  iframe.style.top = "0";
  iframe.style.left = "0";
  iframe.style.zIndex = "9999";

  // Append the iframe to the body
  document.body.appendChild(iframe);
}

