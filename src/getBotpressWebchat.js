const getBotpressWebchat = (testingConfig) => {
  // This will generate the base URL for your Botpress Webchat bot
  const baseUrl = `https://mediafiles.botpress.cloud/${testingConfig.botId}/webchat/bot.html`;

  // Create the HTML string to embed inside the iframe
  const html = `<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1 viewport-fit=cover, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <style>
      body {
        margin: 0 auto;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        height: 100vh;
      }
      #bp-web-widget-container {
        height: 100%;
        width: 100%;
        margin: auto;
        flex-grow: 1;
      }
      #bp-web-widget-container div {
        height: 100%;
      }
      .webchatIframe {
        position: relative !important;
      }
    </style>
    <title>Chatbot</title>
  </head>
  <body>
    <script src="https://cdn.botpress.cloud/webchat/v1/inject.js"></script>
    <script>
      window.botpressWebChat.init(${JSON.stringify(testingConfig)});
      window.botpressWebChat.onEvent(function () { 
        window.botpressWebChat.sendEvent({ type: 'show' }) 
      }, ['LIFECYCLE.LOADED']);
    </script>
  </body>
  </html>`;

  // Return the baseUrl and the HTML for use in the iframe
  return {
    baseUrl,
    html
  };
};

module.exports = getBotpressWebchat;
