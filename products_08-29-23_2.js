document.addEventListener('DOMContentLoaded', (event) => {
    let productType = document.getElementById('productType').innerText;
    let productDescription = document.getElementById('productDescription').innerText;
    let memberId = document.getElementById('memberId').innerText;
    let thisProductDesc = document.getElementById('thisProductDesc').innerText;
    let productName = document.getElementById('productName').innerText;
    let productId = document.getElementById('productId').innerText;

function checkField(field) {
  return field && field !== "" ? field : 'not available';
}

function initScript(suffix, customPrompt, url, productId, title) {
    let currentResponse = "";
    window.addEventListener("load", function () {
      // Check for stored text and populate the response container if it exists
      const storedText = localStorage.getItem('aiText' + suffix + productId);
      const storedCurrentResponse = localStorage.getItem('currentResponse' + suffix + productId);
      if (storedText) {
        const responseContainer = document.getElementById("response-container" + suffix);
        responseContainer.innerHTML = `<div class="rich-text-output" style="white-space: pre-wrap;">${storedText}</div>`;
        // Update currentResponse
        currentResponse = storedCurrentResponse;
      }
  
      const submitButton = document.getElementById("submit-button" + suffix);
      submitButton.addEventListener("click", function (e) {
        e.preventDefault();
        generateCustomResponse(suffix, customPrompt, url, productId, title);
      });
  
      // Show the Download PDF button if there is a response
      if (currentResponse) {
        const downloadButton = document.getElementById("download-pdf-button" + suffix);
        downloadButton.style.display = "block";
      }
    });
    document.getElementById("download-pdf-button" + suffix).addEventListener("click", function () {
      generatePDF(currentResponse, suffix);
    });
 
  function generateCustomResponse(suffix, customPrompt, url) {
        showLoadingAnimation(suffix);

    let prompt = customPrompt;
  
		// Replace placeholders in the prompt with actual values  
        requestAnimationFrame(() => {
            sendToPipedream(prompt, memberId, productId, productName, function (response) {
              removeLoadingAnimation(suffix);
                displayAIOutput(response, suffix);
            }, url, title, suffix);
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
    localStorage.setItem('aiText' + suffix + productId, formattedResponse);
    localStorage.setItem('currentResponse' + suffix + productId, response);    

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

function sendToPipedream(prompt, memberId, productId, productName, callback, url, title, suffix) {
  
    const xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
    const response = JSON.parse(xhr.responseText).message;
        callback(response);
        }
      };
        // Get the styles from the form
        const styles = {
            photorealistic: document.getElementById('photorealistic' + suffix) ? document.getElementById('photorealistic' + suffix).checked : false,
            illustrated: document.getElementById('illustrated' + suffix) ? document.getElementById('illustrated' + suffix).checked : false,
            cinematic: document.getElementById('cinematic' + suffix) ? document.getElementById('cinematic' + suffix).checked : false,
            modern: document.getElementById('modern' + suffix) ? document.getElementById('modern' + suffix).checked : false,
            retro: document.getElementById('retro' + suffix) ? document.getElementById('retro' + suffix).checked : false,
            abstract: document.getElementById('abstract' + suffix) ? document.getElementById('abstract' + suffix).checked : false,
            moody: document.getElementById('moody' + suffix) ? document.getElementById('moody' + suffix).checked : false,
            vibrant: document.getElementById('vibrant' + suffix) ? document.getElementById('vibrant' + suffix).checked : false,
        };
        
        // Get the tone of voice from the form
        const toneOfVoice = {
            Authoritative: document.getElementById('Authoritative' + suffix) ? document.getElementById('Authoritative' + suffix).checked : false,
            Whimsical: document.getElementById('Whimsical' + suffix) ? document.getElementById('Whimsical' + suffix).checked : false,
            Educational: document.getElementById('Educational' + suffix) ? document.getElementById('Educational' + suffix).checked : false,
            Inspirational: document.getElementById('Inspirational' + suffix) ? document.getElementById('Inspirational' + suffix).checked : false,
            Witty: document.getElementById('Witty' + suffix) ? document.getElementById('Witty' + suffix).checked : false,
            Minimalistic: document.getElementById('Minimalistic' + suffix) ? document.getElementById('Minimalistic' + suffix).checked : false,
            Nostalgic: document.getElementById('Nostalgic' + suffix) ? document.getElementById('Nostalgic' + suffix).checked : false,
            Relatable: document.getElementById('Relatable' + suffix) ? document.getElementById('Relatable' + suffix).checked : false,
        };
        

const data = {
  memberId: memberId,
  productId: productId,
  productName: productName,
  title: title,
  styles: styles,
  toneOfVoice: toneOfVoice,
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
be used to promote the following product: ${productName}; that is described as: ${thisProductDesc}; for a business that offers 
a product/service that falls under the category of: ${productType}; and is described as: ${productDescription}.`;

const prompt2 = `Generate a detailed numbered list of 6 potential facebook/instagram ad set targets including interests, demographics,
geographical targeting, income level, education level, employment type/status, relationship type/status, and any other relevant details that would be used to promote a
product titlted: ${productName}; that is described as: ${thisProductDesc}; for a business that offers 
a product/service that falls under the category of: ${productType}; and is described as: ${productDescription}.`;

const prompt3 = `Generate a detailed numbered list of 6 potential product variations of a
product titled: ${productName}; that is described as: ${thisProductDesc}; for a business that currently offers 
a product/service that falls under the category of: ${productType}; and is described as: ${productDescription}.`;

const prompt4 = `Generate a detailed numbered list of 6 potential Google search ads including headlines, primary text, and keywords to promote
a product titled: ${productName}; that is described as: ${thisProductDesc}; for a business that currently offers 
a product/service that falls under the category of: ${productType}; and is described as: ${productDescription}.`;

const prompt5 = `Generate a detailed numbered list of 6 potential email marketing campaigns including subject lines, body, and themes that would promote
a product titled: ${productName}; that is described as: ${thisProductDesc}; for a business that currently offers 
a product/service that falls under the category of: ${productType}; and is described as: ${productDescription}.`;

const prompt6 = `Generate a detailed numbered list of 6 potential influencers and/or brand collaborations to promote a 
product titled: ${productName}; that is described as: ${thisProductDesc}; for a business that currently offers 
a product/service that falls under the category of: ${productType}; and is described as: ${productDescription}.`;

const prompt7 = `Generate a detailed numbered list of potential SEO Keywords & strategy that would be used to promote
a product titled: ${productName}; that is described as: ${thisProductDesc}; for a business that currently offers 
a product/service that falls under the category of: ${productType}; and is described as: ${productDescription}.`;

const prompt8 = `Generate a detailed numbered list of 6 potential organic social media posts that would be used to promote
a product titled: ${productName}; that is described as: ${thisProductDesc}; for a business that currently offers 
a product/service that falls under the category of: ${productType}; and is described as: ${productDescription}.`;

const prompt9 = `Generate a detailed long-form blog post complete with header, subheader, and several body sections that would be used to promote a
product titled: ${productName}; that is described as: ${thisProductDesc}; for a business that currently offers 
a product/service that falls under the category of: ${productType}; and is described as: ${productDescription}.`;

const prompt10 = `Generate a list of 6 potential variations to the following product description: ${thisProductDesc} for a product titled: ${productName} for a business that currently offers 
a product/service that falls under the category of: ${productType}; and is described as: ${productDescription}.`;

initScript("P1", prompt1, "https://eofos187figz1wp.m.pipedream.net", productId, "Ad Ideas");
initScript("P2", prompt2, "https://eop08nkzsd5gl08.m.pipedream.net", productId, "Ad Set Targets");
initScript("P3", prompt3, "https://eol0crbythpyuhq.m.pipedream.net", productId, "Product Variations");
initScript("P4", prompt4, "https://eo22p5u4w0d8ejz.m.pipedream.net", productId, "Google Search Ads");
initScript("P5", prompt5, "https://eo898112vpzfhgo.m.pipedream.net", productId, "Email Marketing");
initScript("P6", prompt6, "https://eozb3cfjzdyi0cs.m.pipedream.net", productId, "Influencers & Brand Collaborations");
initScript("P7", prompt7, "https://eo6o9dl6d6yoc65.m.pipedream.net", productId, "SEO Keywords & Strategy");
initScript("P8", prompt8, "https://eozu4iid7g51ngj.m.pipedream.net", productId, "Organic Social Posts");
initScript("P9", prompt9, "https://eohcuno6b6jefwb.m.pipedream.net", productId, "Blost Post - Product");
initScript("P10", prompt10, "https://eo8pp937aj7w0ow.m.pipedream.net", productId, "New Product Descriptions");


});