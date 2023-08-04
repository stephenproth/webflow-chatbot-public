document.addEventListener('DOMContentLoaded', (event) => {
    let productType = document.getElementById('productType').innerText;
    let productDescription = document.getElementById('productDescription').innerText;
    let memberId = document.getElementById('memberId').innerText;
    let personaName = document.getElementById('personaName').innerText;
    let personaDesc = document.getElementById('personaDesc').innerText;
    let personaId = document.getElementById('personaId').innerText;


function checkField(field) {
  return field && field !== "" ? field : 'not available';
}

function initScript(suffix, customPrompt, url, personaId) {
    let currentResponse = "";
    window.addEventListener("load", function () {
      // Check for stored text and populate the response container if it exists
      const storedText = localStorage.getItem('aiText' + suffix + personaId);
      const storedCurrentResponse = localStorage.getItem('currentResponse' + suffix + personaId);
      if (storedText) {
        const responseContainer = document.getElementById("response-container" + suffix);
        responseContainer.innerHTML = `<div class="rich-text-output" style="white-space: pre-wrap;">${storedText}</div>`;
        // Update currentResponse
        currentResponse = storedCurrentResponse;
      }
  
      const submitButton = document.getElementById("submit-button" + suffix);
      submitButton.addEventListener("click", function (e) {
        e.preventDefault();
        generateCustomResponse(suffix, customPrompt, url);
      });
  
      // Show the Download PDF button if there is a response
      if (currentResponse) {
        const downloadButton = document.getElementById("download-pdf-button" + suffix);
        downloadButton.style.display = "block";
      }
    });
    document.getElementById("download-pdf-button" + suffix).addEventListener("click", function () {
        generatePDF(suffix);
    });
    
 
  function generateCustomResponse(suffix, customPrompt, url) {
        showLoadingAnimation(suffix);

    let prompt = customPrompt;
  
		// Replace placeholders in the prompt with actual values  
        requestAnimationFrame(() => {
            sendToPipedream(prompt, memberId, personaId, personaName, function (response) {
              removeLoadingAnimation(suffix);
                displayAIOutput(response, suffix);
            }, url);
        });
  }

function showLoadingAnimation(suffix) {
  const lottieContainer = document.getElementById("lottie-container" + suffix);
    lottieContainer.style.display = "flex";
  }
  
  function removeLoadingAnimation(suffix) {
      const lottieContainer = document.getElementById("lottie-container" + suffix);
        lottieContainer.style.display = "none";
  }
  
  function displayAIOutput(response, suffix) {
    let md = window.markdownit({ linkify: true });
    const responseContainer = document.getElementById("response-container" + suffix);
    const downloadButton = document.getElementById("download-pdf-button" + suffix);
    const keywords = {};

    let hyperlinkedResponse = response;
    for (let [keyword, url] of Object.entries(keywords)) {
        let regex = new RegExp(`\\b${keyword}\\b`, "gi");
        if (regex.test(hyperlinkedResponse)) {
            hyperlinkedResponse = hyperlinkedResponse.replace(regex, `<a href="${url}" target="_blank">${keyword}</a>`);
        } 
    }

    let formattedResponse = md.render(hyperlinkedResponse);

    responseContainer.innerHTML = `<div class="rich-text-output" style="white-space: pre-wrap;">${formattedResponse}</div>`;

    // Save the response to localStorage
    localStorage.setItem('aiText' + suffix + personaId, formattedResponse);
    localStorage.setItem('currentResponse' + suffix + personaId, response);    

    downloadButton.style.display = "block";

    currentResponse = response;
}

function generatePDF(suffix) {
    // Get the response container
    const responseContainer = document.getElementById("response-container" + suffix);
    
    // Create a new div and copy the innerHTML of the response container
    const div = document.createElement("div");
    div.innerHTML = responseContainer.innerHTML;
    
    // Append the new div to the body (it will not be visible because of 'display: none')
    div.style.display = 'none';
    document.body.appendChild(div);
    
    const opt = {
        margin: 1,
        filename: 'generated_report_' + suffix + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
  
    html2pdf().from(div).set(opt)
      .save()
      .then(() => document.body.removeChild(div));  // Remove the new div from the body after the PDF is saved
}




function sendToPipedream(prompt, memberId, personaId, personaName, callback, url) {
    const xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
    const response = JSON.parse(xhr.responseText).message;
        callback(response);
        }
      };

const data = {
  memberId: memberId,
  personaId: personaId,
  personaName: personaName,
  conversationHistory: [
    {
      role: "system",
      content:
        "You are a business and marketing expert who is designed to generate detailed reports, predictions, and analysis for any business or marketing related topic.",
    },
    {
      role: "user",
      content: prompt,
    },
  ],
};

xhr.send(JSON.stringify(data));
  }
}

const prompt1 = `Generate a detailed numbered list of 6 potential instagram ad ideas including headlines, captions, and imagery/video descriptions that would 
be used to target a consumer persona/audience segment titled: ${personaName}; that is described as: ${personaDesc}; for a business that offers 
a product/service that falls under the category of: ${productType}; and is described as: ${productDescription}.`;

const prompt2 = `Generate a detailed numbered list of 6 potential facebook/instagram ad set targets including interests, demographics,
geographical targeting, income level, education level, employment type/status, relationship type/status, and any other relevant details that would be used to target a
consumer persona/audience segment titled: ${personaName}; that is described as: ${personaDesc}; for a business that offers 
a product/service that falls under the category of: ${productType}; and is described as: ${productDescription}.`;

const prompt3 = `Generate a detailed numbered list of 6 potential interests and/or activities that could be applied to
a consumer persona/audience segment titled: ${personaName}; that is described as: ${personaDesc}; for a business that offers 
a product/service that falls under the category of: ${productType}; and is described as: ${productDescription}.`;

const prompt4 = `Generate a detailed numbered list of 6 specific entertainment-based interests and/or activities including items that would fall under the categories 
of music, theater, film, TV, and other similar categories that could be applied
a consumer persona/audience segment titled: ${personaName}; that is described as: ${personaDesc}; for a business that offers 
a product/service that falls under the category of: ${productType}; and is described as: ${productDescription}.`;

const prompt5 = `Generate a detailed numbered list of 6 specific sports and fitness activity-based interests and/or activities 
including items that would fall under the categories of sports watching, types of exercise, and other similar categories that could be applied to
a consumer persona/audience segment titled: ${personaName}; that is described as: ${personaDesc}; for a business that offers 
a product/service that falls under the category of: ${productType}; and is described as: ${productDescription}.`;

const prompt6 = `Generate a detailed numbered list of 6 health and wellness interests and/or activities including items
that would fall under the categories of skincare, supplements, hollistic wellness, and other similar categories that could be applied to
a consumer persona/audience segment titled: ${personaName}; that is described as: ${personaDesc}; for a business that offers 
a product/service that falls under the category of: ${productType}; and is described as: ${productDescription}.`;

const prompt7 = `Generate a detailed numbered list of 6 potential product concepts or ideas that would appeal to a
consumer persona/audience segment titled: ${personaName}; that is described as: ${personaDesc}; for a business that currently offers 
a product/service that falls under the category of: ${productType}; and is described as: ${productDescription}.`;

const prompt8 = `Generate a detailed numbered list of 6 potential Google search ads including headlines, primary text, and keywords that would appeal to a
consumer persona/audience segment titled: ${personaName}; that is described as: ${personaDesc}; for a business that currently offers 
a product/service that falls under the category of: ${productType}; and is described as: ${productDescription}.`;

const prompt9 = `Generate a detailed numbered list of 6 potential email marketing campaigns including subject lines, body, and themes that would appeal to a
consumer persona/audience segment titled: ${personaName}; that is described as: ${personaDesc}; for a business that currently offers 
a product/service that falls under the category of: ${productType}; and is described as: ${productDescription}.`;

const prompt10 = `Generate a detailed numbered list of 6 potential influencers and/or brand collaborations that would appeal to a
consumer persona/audience segment titled: ${personaName}; that is described as: ${personaDesc}; for a business that currently offers 
a product/service that falls under the category of: ${productType}; and is described as: ${productDescription}.`;

const prompt11 = `Generate a detailed numbered list of potential SEO Keywords & strategy that would be used to target a
consumer persona/audience segment titled: ${personaName}; that is described as: ${personaDesc}; for a business that currently offers 
a product/service that falls under the category of: ${productType}; and is described as: ${productDescription}.`;

initScript("7", prompt1, "https://eow9kj7yrsd5v27.m.pipedream.net", personaId);
initScript("8", prompt2, "https://eow0cpoqxmz9upi.m.pipedream.net", personaId);
initScript("9", prompt3, "https://eo6ll1l9xtq9x8n.m.pipedream.net", personaId);
initScript("10", prompt4, "https://eodyl3ogsspcoca.m.pipedream.net", personaId);
initScript("11", prompt5, "https://eoeh0oukg24dmzn.m.pipedream.net", personaId);
initScript("12", prompt6, "https://eo44dpdqeblzb7g.m.pipedream.net", personaId);
initScript("13", prompt7, "https://eou9am0xy8c9cdb.m.pipedream.net", personaId);
initScript("14", prompt8, "https://eow0cpoqxmz9upi.m.pipedream.net", personaId);
initScript("15", prompt9, "https://eow0cpoqxmz9upi.m.pipedream.net", personaId);
initScript("16", prompt10, "https://eow0cpoqxmz9upi.m.pipedream.net", personaId);
initScript("17", prompt11, "https://eow0cpoqxmz9upi.m.pipedream.net", personaId);

});