window.button = function() {
    // Create the custom button
    const customButton = document.createElement('button');
    customButton.setAttribute('aria-haspopup', 'dialog');
    customButton.setAttribute('aria-label', 'custombutton');
    customButton.type = 'button';
    customButton.classList.add('discord-button');
  
    // Create content and icon
    const buttonContent = document.createElement('div');
    buttonContent.classList.add('discord-button-content');
  
    const discordIcon = document.createElement('div');
    discordIcon.classList.add('discord-icon');
  
    discordIcon.innerHTML = `
      <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path class="discord-icon-path" d="M19.73 4.87a18.2 18.2 0 0 0-4.6-1.44c-.21.4-.4.8-.58 1.21-1.69-.25-3.4-.25-5.1 0-.18-.41-.37-.82-.59-1.2-1.6.27-3.14.75-4.6 1.43A19.04 19.04 0 0 0 .96 17.7a18.43 18.43 0 0 0 5.63 2.87c.46-.62.86-1.28 1.2-1.98-.65-.25-1.29-.55-1.9-.92.17-.12.32-.24.47-.37 3.58 1.7 7.7 1.7 11.28 0l.46.37c-.6.36-1.25.67-1.9.92.35.7.75 1.35 1.2 1.98 2.03-.63 3.94-1.6 5.64-2.87.47-4.87-.78-9.09-3.3-12.83ZM8.3 15.12c-1.1 0-2-1.02-2-2.27 0-1.24.88-2.26 2-2.26s2.02 1.02 2 2.26c0 1.25-.89 2.27-2 2.27Zm7.4 0c-1.1 0-2-1.02-2-2.27 0-1.24.88-2.26 2-2.26s2.02 1.02 2 2.26c0 1.25-.88 2.27-2 2.27Z"/>
      </svg>
    `;
  
    buttonContent.appendChild(discordIcon);
    customButton.appendChild(buttonContent);
  
    // Add styles for the button (updated grey color and padding)
    const style = document.createElement('style');
    style.innerHTML = `
      .discord-button {
        background: transparent;
        border: none;
        border-radius: 50%;
        padding: 0px; /* Adjusted padding to move it slightly */
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: 40px; /* Adjust width */
        height: 40px; /* Adjust height */
      }
  
      .discord-button-content {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }
  
      .discord-icon {
        display: flex;
        justify-content: center;
        align-items: center;
      }
  
      .discord-icon svg {
        width: 20px;
        height: 20px;
      }
  
      /* DEFAULT (grey color updated to rgb(170,170,177)) */
      .discord-icon-path {
        fill: rgb(170,170,177);
        transition: fill 0.2s ease;
      }
  
      /* Hover effect: white color */
      .discord-button:hover .discord-icon-path {
        fill: white;
      }
    `;
  
    document.head.appendChild(style);
  
    // Add a simple click handler (it doesn't toggle, just logs when clicked)
    customButton.addEventListener('click', () => {
      console.log("Button clicked!");

      // Function to log the name of the selected channel
      function logSelectedChannel() {
          // Select the element with the class that indicates it is the selected channel
          const selectedChannel = document.querySelector('.selected_c69b6d .name__2ea32');
          
          // If a selected channel is found, log its name and store it
          if (selectedChannel) {
              console.log('Selected Channel:', selectedChannel.textContent.trim());
              channel = selectedChannel.textContent.trim();
          } else {
              console.log('No channel is selected');
              channel = undefined; // Ensures channel is not undefined
          }
      }

      // Call the function to log the selected channel
      logSelectedChannel();

      // Ensure channel is defined before querying the message box
      if (channel) {

          let messageBox = document.querySelector('div[class*="textArea"]');

          if (messageBox) {
              let emojiImages = messageBox.querySelectorAll('img.emoji');
              let formattedText = messageBox.innerHTML;
              let emojiDetails = [];

              // Replace <br> tags with newline characters
              formattedText = formattedText.replace(/<br\s*\/?>/g, '\n');

              // Process each emoji
              let emojiCount = 1;
              emojiImages.forEach(emoji => {
                  let emojiName = emoji.getAttribute('aria-label');
                  let emojiPlaceholder = `:${emojiCount}:`;
                  let emojiURL = emoji.getAttribute('src');
                  let emojiID = emojiURL.match(/\/(\d+)\.webp/);

                  // Check if the emoji is animated
                  if (emojiURL.includes('animated')) {
                      // Prepend 'a' directly in front of the emoji name if the emoji is animated
                      if (emojiName) {
                          emojiName = emojiName.split(':')[0] + 'a:' + emojiName.split(':')[1]; // Prepend 'a' after the first colon
                      }
                      emojiDetails.push({ name: emojiName, id: emojiID ? emojiID[1] : 'anill' }); 
                  } else {
                      emojiDetails.push({ name: emojiName.replace(/^:|:$/g, ''), id: emojiID ? emojiID[1] : 'nill' });
                  }

                  formattedText = formattedText.replace(emoji.outerHTML, emojiPlaceholder);
                  emojiCount++;
              });

              // Clean up text (remove div/span tags and unnecessary attributes)
              let cleanedText = formattedText.replace(/<div[^>]*>|<\/div>/g, '\n')
                                             .replace(/<span[^>]*>|<\/span>/g, '')
                                             .replace(/style="[^"]*"/g, '')
                                             .replace(/data-slate-[^=]*="[^"]*"/g, '');

              // Replace emoji placeholders with actual emoji codes
              let finalText = cleanedText.replace(/:(\d+):/g, (match, placeholder) => {
                  let index = parseInt(placeholder) - 1;
                  let emojiDetail = emojiDetails[index];

                  if (emojiDetail && emojiDetail.id !== 'nill') {
                      return `<${emojiDetail.name}:${emojiDetail.id}>`; // Use the emoji name with 'a' prepended, and the id
                  } else {
                      return `:${emojiDetail.name}:`;
                  }
              });

              // Handle text encoding, making sure not to break words or special characters
              finalText = finalText.replace(/([a-zA-Z0-9]+(?:[-'a-zA-Z0-9]*[a-zA-Z0-9])?)(?=\s|$|[\|\#\-\~])/g, (match) => {
                  if (!match.includes(":") && !match.includes("<") && !match.includes(">") && !/[#~|\\-]/.test(match)) {
                      return match.split('').join('‪'); // Invisible characters for special encoding
                  }
                  return match;
              });

              // Handle spoiler tags (||text||)
              finalText = finalText.replace(/\|\|([^|]+)\|\|/g, (match, content) => {
                  return `||${content.split('').join('‪')}||`; // Add invisible characters within spoilers
              });

              // Clean up extra newlines or redundant spaces
              finalText = finalText.replace(/(\n\s*)+/g, '\n').replace(/^\n/, '');

              console.log("Final Text:", finalText);
              message = finalText;
              console.log("Emoji Details:", emojiDetails);

              let replying = document.querySelector('.replying__5126c');
              let messageId = null;
              
              if (replying) {
                  const fullMessageId = replying.getAttribute('data-list-item-id');
                  messageId = fullMessageId.split('-').pop();
              }
              
              let token = (
                  webpackChunkdiscord_app.push([[''], {}, e => { m = []; for (let c in e.c) m.push(e.c[c]) }]), m
              ).find(x => x?.exports?.default?.getToken !== void 0).exports.default.getToken();
              
              let channelId = window.location.pathname.split("/")[3];
              let bodyContent = {
                  content: message,
                  tts: false
              };
              if (messageId) {
                  bodyContent.message_reference = { message_id: messageId };
              }
              
              fetch(`https://discord.com/api/v9/channels/${channelId}/messages`, {
                  method: "POST",
                  headers: {
                      "Authorization": token,
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify(bodyContent)
              });
      
          } else {
              console.error('Message box not found!');
          }
      } else {
          console.error('No channel selected!');
      }
          });
  
    // Replace the original button
    const originalButton = document.querySelector('button[aria-label="Send a gift"]');
    if (originalButton) {
      originalButton.replaceWith(customButton);
    } else {
      console.log('Original button not found!');
    }
  }
  
  window.button();  // Call the function to replace the button when the script runs
  
// Function to check when the URL changes
function onUrlChange() {
    window.button()
}

// Listen for the 'popstate' event, which is triggered on URL changes without a page reload
window.addEventListener('popstate', onUrlChange);

// Alternatively, you can use MutationObserver if URL changes occur outside of typical browser history events
const observer = new MutationObserver(() => {
    // If the URL changes, log it
    if (window.location.href !== currentUrl) {
        currentUrl = window.location.href;
        window.button();
    }
});

// Start observing the history state for changes
let currentUrl = window.location.href;
observer.observe(document, { childList: true, subtree: true });
