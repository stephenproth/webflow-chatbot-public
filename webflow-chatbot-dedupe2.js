function saveConversationHistory() {
    localStorage.setItem("chatbot-conversationHistory", JSON.stringify(conversationHistory));
                                     }
  
  function loadConversationHistory() {
    const savedHistory = localStorage.getItem("chatbot-conversationHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  }
  
  const keywordResponses = [
      {
        keywords: ["workblock"],
        response: "A workblock is a fixed duration of time dedicated to focused work on a specific task. You can find more information about workblocks <a href='https://indraintelligence.com' target='_blank'>here</a>.",
        matchType: "exact",
        triggered: false,
      },
      {
        keywords: ["organic", "social"],
        response: "Organic social media management involves creating...",
        matchType: "multiple-required",
        triggered: false,
      },
      {
        keywords: ["paid advertising"],
        response: "Paid advertising includes various strategies...",
        matchType: "phrase",
        triggered: false,
      },
      {
        keywords: ["email marketing services"],
        response: "We offer email marketing services...",
        // Not providing a matchType will default to general/fuzzy match
        triggered: false,
      },
      // Add more keyword-response pairs if needed
    ];
    
  function getPresetResponse(userInput) {
    
    for (const preset of keywordResponses) {
      // Check if the preset response is not yet triggered
      if (!preset.triggered) {
        if (preset.matchType === "multiple-required") {
          const allRequiredKeywordsFound = preset.keywords.every(
            (requiredKeyword) =>
              userInput.toLowerCase().includes(requiredKeyword.toLowerCase())
          );
          if (allRequiredKeywordsFound) {
            preset.triggered = true;
            return preset.response;
          }
        } else {
          const found = preset.keywords.some((keyword) => {
            const lowercasedUserInput = userInput.toLowerCase();
            const lowercasedKeyword = keyword.toLowerCase();
  
            if (preset.matchType === "exact") {
              return lowercasedUserInput === lowercasedKeyword;
            } else if (preset.matchType === "phrase") {
              return lowercasedUserInput.includes(lowercasedKeyword);
            } else {
              // Default to general/fuzzy match
              return lowercasedUserInput.includes(lowercasedKeyword);
            }
          });
  
          if (found) {
            preset.triggered = true;
            return preset.response;
          }
        }
      }
    }
  
    return null;
  }
  
  
  let conversationHistory = loadConversationHistory();
  conversationHistory.length === 0 && (conversationHistory = [
    {
      role: "system",
      content: "You are a helpful assistant.",
    },
    {
      role: "assistant",
      content: "Hi, how can I help you today?",
    },
    {
      role: "bot-options",
      content: JSON.stringify(["Pricing", "Services", "Get in Touch", "Other"]),
    },
  ])
  
  function clearChatHistory() {
    localStorage.removeItem("chatbot-conversationHistory");
    conversationHistory = [
      {
        role: "assistant",
        content: "Hi, how can I help you today?",
      },
      {
        role: "bot-options",
        content: JSON.stringify(["Pricing", "Services", "Get in Touch", "Other"]),
      },
    ];
    const messagesWrapper = document.querySelector(".messages-wrapper");
    messagesWrapper.innerHTML = '';
    conversationHistory.forEach(message => addMessageToWidget(message.content, message.role));
  }
  
  
  function showLoadingSpinner() {
    const spinner = document.createElement("div");
    spinner.className = "loading-spinner";
  
    const messagesWrapper = document.querySelector(".messages-wrapper");
    messagesWrapper.appendChild(spinner);
    messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
  }
  
  function removeLoadingSpinner() {
    const spinner = document.querySelector(".loading-spinner");
    if (spinner) {
      spinner.remove();
    }
  }
  
  function displayMessageOptions(options) {
    const optionsContainer = document.createElement("div");
    optionsContainer.className = "option-container";
    optionsContainer.innerHTML = options.map(option => `<button class="option-button">${option}</button>`).join('');
    
    const messagesWrapper = document.querySelector(".messages-wrapper");
    messagesWrapper.appendChild(optionsContainer);
    messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
    
    const optionButtons = document.querySelectorAll(".option-button");
    optionButtons.forEach(button => {
      button.addEventListener("click", function (event) {
        event.preventDefault(); // Add this line
        event.stopImmediatePropagation(); // Add this line
        const userOption = event.target.textContent;
        handleUserOption(userOption);
      });
    });
  }
  
  function handleUserOption(option) {
    addMessageToWidget(option, "user");
    conversationHistory.push({ role: "user", content: option });
    saveConversationHistory();
  
    if (option === "Other") {
      addMessageToWidget("Ask me anything! I'm a general knowledge AI ready to help!", "bot");
    } else if (option === "Pricing") {
      addMessageToWidget("We offer 'a la carte' services along with retainer-based flex & cohesion packages: <a href='https://www.indraintelligence.com/packages' target='_blank'>View Our Packages</a>", "bot");
    } else if (option === "Services") {
      addMessageToWidget("We can do almost anything you need to help you <a href='https://www.indraintelligence.com/build' target='_blank'>Build,</a> <a href='https://www.indraintelligence.com/reach' target='_blank'>Reach,</a> and <a href='https://www.indraintelligence.com/grow' target='_blank'>Grow!</a>", "bot");
      // Add more information about the services here
    } else if (option === "Get in Touch") {
      addMessageToWidget("You can contact us and setup a time to talk <a href='https://www.indraintelligence.com/#lets-talk' target='_blank'>here!</a>", "bot");
    } else {
      // Default case (free conversation with the chatbot)
    }
  }
  
  function addSpinnerStyles() {
    const style = document.createElement("style");
    style.innerHTML = `
      .loading-spinner {
        display: inline-block;
        width: 30px;
        height: 30px;
        border: 3px solid rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        border-top-color: #3b40f8;
        animation: spin 1s ease infinite;
      }
    
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      
      .bot-message a {
        text-decoration: underline;
        color: #3b40f8;
        cursor: pointer;
      }
      .option-container {
             display: flex;
            justify-content: space-evenly;
            flex-wrap: wrap;
            margin: 5px;
          }
  
          .option-button {
            border: 1px solid #1f0b38;
            background-color: #ffffff;
            color: #1f0b38;
            border-radius: 3px;
            padding: 5px 10px;
            font-size: 14px;
            cursor: pointer;
            margin: 5px;
          }
  
          .option-button:hover {
            background-color: #1f0b38;
            color: #ffffff;
          }
    `;
  
    document.head.appendChild(style);
  }

  function resetAndPopulateChatWidget() {
    // Clear the chat widget
    const messagesWrapper = document.querySelector(".messages-wrapper");
    messagesWrapper.innerHTML = '';
  
    // Populate the chat widget with the conversation history
    conversationHistory
      .filter(message => message.role !== "system")
      .forEach(message => addMessageToWidget(message.content, message.role));
  }  
  
  function sendToPipedream(message, callback) {
    conversationHistory.push({ role: "user", content: message });
    saveConversationHistory();
  
    const initializationMessage = {
      role: "system",
      content: "You are a chatbot designed to help visitors to the Indra Intelligence website. Indra Intelligence (also known as Indra, indra, indra intelligence) is a digital services agency that specializes in paid digital advertising, email marketing, organic social media management, website & product development, and several other growth, development, and reach related services. Indra or Indra Intelligence or any combination of the name is a United States company tbat does exactly what was stated previously. Do not refer to any other version of Indra.",
    };
    // Check if the previous message is an assistant's preset response
    let adjustedConversationHistory;
    if (conversationHistory.length >= 2 && conversationHistory[conversationHistory.length - 2].role === 'assistant') {
      // Add the preset response to the conversation history
      const presetInfoMessage = {
        role: "assistant",
        content: conversationHistory[conversationHistory.length - 2].content,
      };
  
      adjustedConversationHistory = [
        initializationMessage,
        presetInfoMessage, // Adding the preset response to the history
        ...conversationHistory.filter((msg) => msg.role !== 'bot-options')
      ];
    } else {
      adjustedConversationHistory = [
        initializationMessage,
        ...conversationHistory.filter((msg) => msg.role !== 'bot-options')
      ];
    }
    showLoadingSpinner();
  
    $.ajax({
      method: "POST",
      url: "https://eo3v9szynasnkt1.m.pipedream.net",
      data: JSON.stringify({ conversationHistory: adjustedConversationHistory }),
      contentType: "application/json",
      success: function (response) {
        console.log(response);
        removeLoadingSpinner();
        let chatbotResponse = response.message;
  
        const keywordLinkMapping = {
          "flex": "https://www.indraintelligence.com/packages#Flex"
        };
  
        for (const [keyword, link] of Object.entries(keywordLinkMapping)) {
          const regex = new RegExp(`\\b${keyword}\\b`, "gi");
          if (regex.test(chatbotResponse)) {
            chatbotResponse = chatbotResponse.replace(regex, `<a href="${link}" target="_blank">${keyword}</a>`);
          }
        }
  
        addAssistantMessageWithStreamingEffect(chatbotResponse, function () {
          conversationHistory.push({ role: "assistant", content: chatbotResponse });
          saveConversationHistory();
        });
      },
    });
  }
  
  function addAssistantMessageWithStreamingEffect(content, callback = null) {
    const messageElement = document.createElement("div");
    messageElement.className = "bot-message";
  
    const messagesWrapper = document.querySelector(".messages-wrapper");
    messagesWrapper.appendChild(messageElement);
    messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
  
    let currentIndex = 0;
  
    function showNextLetter() {
      if (currentIndex < content.length) {
        const letter = content[currentIndex];
        messageElement.innerHTML += letter;
        currentIndex++;
        setTimeout(showNextLetter, 30); // Adjust the delay between letters (in milliseconds)
      } else if (callback) {
        callback();
      }
    }
  
    showNextLetter();
  }

      function handleUserInputKeypress(e) {
        if (e.which == 13) {
          e.preventDefault(); // Prevent default form submission behavior
          const userInput = $("#user-input").val().trim();
  
      if (userInput) {
        addMessageToWidget(userInput, "user");
        conversationHistory.push({ role: "user", content: userInput });
        saveConversationHistory();
  
        // Check for preset response
        const presetResponse = getPresetResponse(userInput);
  
        if (presetResponse) {
            addMessageToWidget(presetResponse, "assistant");
            conversationHistory.push({ role: "assistant", content: presetResponse });
            saveConversationHistory();
              } else {
          sendToPipedream(userInput, function (aiResponse) {
            addMessageToWidget(aiResponse, "assistant");
          });
        }
  
        $("#user-input").val("");
      }
    }
}
  
  
  addSpinnerStyles();
  // Display the initial greeting and message options
  conversationHistory
    .filter(message => message.role !== "system")
    .forEach(message => addMessageToWidget(message.content, message.role));
  

    document.addEventListener("DOMContentLoaded", function() {
        document.querySelector(".clear-chat-button").addEventListener("click", function () {
          clearChatHistory();
        });
      
        resetAndPopulateChatWidget();
      
        // Update the event binding logic for the #user-input element
        $("#user-input").off("keypress").on("keypress", handleUserInputKeypress);
      });   
  