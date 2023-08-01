document.addEventListener('DOMContentLoaded', (event) => {
    let productType = document.getElementById('productType').innerText;
    let productDescription = document.getElementById('productDescription').innerText;
    let memberId = document.getElementById('memberId').innerText;
    let personaName = document.getElementById('personaName').innerText;
    let personaDesc = document.getElementById('personaDesc').innerText;


function checkField(field) {
  return field && field !== "" ? field : 'not available';
}

function initScript(suffix, customPrompt, url) {
  let currentResponse = "";
  window.addEventListener("load", function () {
    	    // Check for stored text and populate the response container if it exists
		const storedText = localStorage.getItem('aiText' + suffix);
		const storedCurrentResponse = localStorage.getItem('currentResponse' + suffix);
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
  });
  document.getElementById("download-pdf-button" + suffix).addEventListener("click", function () {
      generatePDF(currentResponse, suffix);
  });
  
  function generateCustomResponse(suffix, customPrompt, url) {
        showLoadingAnimation(suffix);

    let prompt = customPrompt;
    const businessName = checkField(`${businessName}`);
  
		// Replace placeholders in the prompt with actual values
			prompt = prompt.replace('businessName', businessName);
  
        requestAnimationFrame(() => {
            sendToPipedream(prompt, memberId, personaName, function (response) {
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

    responseContainer.innerHTML = `<div class="rich-text-output" style="white-space: pre-wrap;">${hyperlinkedResponse}</div>`;

      // Save the response to localStorage
    localStorage.setItem('aiText' + suffix, hyperlinkedResponse);
    localStorage.setItem('currentResponse' + suffix, response);

    downloadButton.style.display = "block";

    currentResponse = response;
  }

  function generatePDF(response, suffix) {
      const doc = new jsPDF();
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
          let paragraphs = response.split("\n\n");
          let yOffset = 10;
        paragraphs.forEach((paragraph, index) => {
          let lines = doc.splitTextToSize(paragraph, 190);
          let lineHeight = doc.getFontSize() * 1.15; // Adjust the multiplier to control the line spacing
          let pageHeight = doc.internal.pageSize.height - 20; // Subtracting margin from page height
      if (yOffset + lines.length * lineHeight > pageHeight) {
        doc.addPage();
          yOffset = 20;
      }

        doc.text(lines, 10, yOffset);
          yOffset += lines.length * lineHeight;
// Add a smaller line break between sections, except for the last section
      if (index !== paragraphs.length - 1) {
          yOffset += lineHeight / 3; // Adjust the divisor to control the spacing between sections
      }
        });
        doc.save("generated_report_" + suffix + ".pdf");
    }

function sendToPipedream(prompt, memberId, personaName, callback, url) {
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

const prompt3 = `"Generate a detailed numbered list of 6 potential interests and/or activities that could be applied to
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

initScript("", prompt1, "https://eow9kj7yrsd5v27.m.pipedream.net");
initScript("2", prompt2, "https://eow0cpoqxmz9upi.m.pipedream.net");
initScript("3", prompt3, "https://eo6ll1l9xtq9x8n.m.pipedream.net");
initScript("4", prompt4, "https://eodyl3ogsspcoca.m.pipedream.net");
initScript("5", prompt5, "https://eoeh0oukg24dmzn.m.pipedream.net");
initScript("6", prompt6, "https://eo44dpdqeblzb7g.m.pipedream.net");
initScript("7", prompt7, "https://eou9am0xy8c9cdb.m.pipedream.net");
initScript("8", prompt8, "https://eow0cpoqxmz9upi.m.pipedream.net");
initScript("9", prompt9, "https://eow0cpoqxmz9upi.m.pipedream.net");
initScript("10", prompt10, "https://eow0cpoqxmz9upi.m.pipedream.net");
initScript("11", prompt11, "https://eow0cpoqxmz9upi.m.pipedream.net");

});