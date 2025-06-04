import { useEffect } from 'react';

// Declare the custom chat-bot element to avoid TypeScript errors
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'chat-bot': {
        platform_id: string;
        user_id: string;
        chatbot_id: string;
        children?: React.ReactNode;
      };
    }
  }
}

const LiveChat = () => {  useEffect(() => {
    // Load the ChatSimple script
    const script = document.createElement('script');
    script.src = 'https://cdn.chatsimple.ai/chat-bot-loader.js';
    script.defer = true;
    document.body.appendChild(script);

    // Function to force positioning
    const enforcePosition = () => {
      const chatElements = document.querySelectorAll('chat-bot, [id*="chatsimple"], [class*="chatsimple"], [data-chat-simple]');
      chatElements.forEach((element) => {
        if (element instanceof HTMLElement) {
          element.style.position = 'fixed';
          element.style.bottom = '24px';
          element.style.right = '100px';
          element.style.zIndex = '9999';
          element.style.transform = 'none';
          element.style.margin = '0';
          element.style.left = 'auto';
          element.style.top = 'auto';
        }
      });
    };

    // Set up MutationObserver to watch for ChatSimple elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              if (element.tagName === 'CHAT-BOT' || 
                  element.id?.includes('chatsimple') ||
                  element.className?.includes('chatsimple')) {
                setTimeout(enforcePosition, 100);
              }
            }
          });
        }
      });
    });

    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Also enforce position periodically for the first few seconds
    const intervals = [500, 1000, 2000, 3000, 5000].map(delay => 
      setTimeout(enforcePosition, delay)
    );

    return () => {
      // Cleanup
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      observer.disconnect();
      intervals.forEach(clearTimeout);
    };
  }, []);return (
    <>
      <style>{`
        chat-bot, 
        chat-bot *,
        [id*="chatsimple"],
        [class*="chatsimple"],
        [class*="chat-simple"] {
          position: fixed !important;
          bottom: 24px !important;
          right: 100px !important;
          z-index: 9999 !important;
          transform: none !important;
          margin: 0 !important;
          left: auto !important;
          top: auto !important;
        }
        
        /* More specific targeting for ChatSimple elements */
        div[data-chat-simple],
        div[id*="chat"],
        iframe[src*="chatsimple"] {
          position: fixed !important;
          bottom: 24px !important;
          right: 100px !important;
          z-index: 9999 !important;
        }
      `}</style>
      <div className="fixed bottom-6 right-24 z-[9999]" style={{position: 'fixed', bottom: '24px', right: '100px', zIndex: 9999}}>
        <chat-bot 
          platform_id="53c92204-1f5b-4e3b-ae80-40d592380c26" 
          user_id="346f8b04-a535-48cd-a7a1-ee058996478d" 
          chatbot_id="563c7ab8-4f75-4a72-9b20-f5c7a0f263b9"
        >
          <a href="https://www.chatsimple.ai/?utm_source=widget&utm_medium=referral">
            chatsimple
          </a>
        </chat-bot>
      </div>
    </>
  );
};

export default LiveChat;
