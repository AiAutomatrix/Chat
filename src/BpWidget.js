import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from "react";
import getBotpressWebchat from "./getBotpressWebchat";

const BpWidget = forwardRef((props, ref) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef();

  const { botConfig, onMessage } = props;
  const { html, baseUrl } = getBotpressWebchat(botConfig);

  // Expose sendEvent method with react ref
  useImperativeHandle(ref, () => ({
    sendEvent: (event) => {
      // Send custom events through iframe if needed
      iframeRef.current.contentWindow.postMessage(event, baseUrl);
    },
    sendPayload: (payload) => {
      iframeRef.current.contentWindow.postMessage(payload, baseUrl);
    },
    mergeConfig: (config) => {
      iframeRef.current.contentWindow.postMessage(config, baseUrl);
    },
  }));

  useEffect(() => {
    const onMessageListener = (event) => {
      if (event.origin !== baseUrl) return;
      // Handle the incoming message from the iframe here
      if (onMessage) {
        onMessage(event);
      }
    };

    window.addEventListener("message", onMessageListener);
    return () => {
      window.removeEventListener("message", onMessageListener);
    };
  }, [baseUrl, onMessage]);

  return (
    <div style={{ flex: 1, position: "relative", height: "100%" }}>
      <iframe
        ref={iframeRef}
        srcDoc={html}
        style={{ width: "100%", height: "100%", border: "none" }}
        onLoad={() => setIframeLoaded(true)}
        title="Botpress Webchat"
      />
      {!iframeLoaded && <div>Loading Chat...</div>} {/* Optional Loading State */}
    </div>
  );
});

export default BpWidget;
