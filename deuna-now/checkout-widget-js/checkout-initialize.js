document.addEventListener("DOMContentLoaded", function(event) {
	//document is fully loaded 
  const popupModal = document.querySelector('.popup-modal')
  const bodyBlackout = document.querySelector('.body-blackout')    
  popupModal.querySelector('.popup-modal__close').addEventListener('click', () => {
      popupModal.classList.remove('is--visible')
      bodyBlackout.classList.remove('is-blacked-out')
  })

  bodyBlackout.addEventListener('click', () => {
    // TODO: Turn into a function to close modal
    popupModal.classList.remove('is--visible')
    bodyBlackout.classList.remove('is-blacked-out')
  })
})

/**
 * Order tokenization
 * @param object order - Order data
 * @return string token
 */

// Initialize checkout
//const dunaCheckout = window.DeunaCheckout();

/**
 * Open modal checkout widget
 */

const shouldOpen = async () => {
  const data = editor.get();
  try {
    const response = await fetch(`https://api.stg.deuna.io/merchants/orders`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': DEUNA_PRIVATE_API_KEY
      },
      body: JSON.stringify(data),
    });
    const newResponse = await response.json();
    // Configure checkout
    await window.DeunaPay.default.configure({
      apiKey: DEUNA_PRIVATE_API_KEY,
      orderToken: newResponse.token,
      env: "staging",
    });
    
    await window.DeunaPay.default.renderWidget({ target: "#root" });
    const bodyBlackout = document.querySelector('.body-blackout')
    const popupModal = document.querySelector('.popup-modal')

    popupModal.classList.add('is--visible')
    bodyBlackout.classList.add('is-blacked-out')

      
    /*await dunaCheckout.configure({
      env: ENVIRONMENT,
      apiKey: DEUNA_PRIVATE_API_KEY,
      orderToken: newResponse.body.token,
    });
    await dunaCheckout.show();*/
  } catch (error) {
    alert(error);
  }
};

const handlePay = async () => {
    const data = payEditor.get();
    const response = await fetch(`https://api.stg.deuna.io/merchants/transactions/purchase`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': DEUNA_PRIVATE_API_KEY
      },
      body: JSON.stringify(data),
    });

  if (error) {
    setRequestStatus({ message: 'Hubo un error al pagar', status: 'error' })
    return;
  }

  console.log(data)
  setRequestStatus({ message: 'Se realizó el pago satisfactoriamente', status: 'success' })
};
