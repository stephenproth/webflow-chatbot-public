let productType, serviceType, productDescription, marketLocation, firstName, lastName, memberId, businessName, primaryProduct, ancillaryProduct, monthlyRevenue, monthlyVisitors, competitorList, audienceDetails, audienceAge, audienceGender, conversionRate, averageOrderValue, monthlyBudget, digitalBudget, influencerBudget, onlineSales, retailSales;

document.addEventListener('DOMContentLoaded', (event) => {
    let productType = document.getElementById('productType').innerText;
    let serviceType = document.getElementById('serviceType').innerText;
    let productDescription = document.getElementById('productDescription').innerText;
    let marketLocation = document.getElementById('marketLocation').innerText;
    let firstName = document.getElementById('firstName').innerText;
    let lastName = document.getElementById('lastName').innerText;
    let memberId = document.getElementById('memberId').innerText;
    let businessName = document.getElementById('businessName').innerText;
    let primaryProduct = document.getElementById('primaryProduct').innerText;
    let ancillaryProduct = document.getElementById('ancillaryProduct').innerText;
    let monthlyRevenue= document.getElementById('monthlyRevenue').innerText;
    let monthlyVisitors= document.getElementById('monthlyVisitors').innerText;
    let competitorList= document.getElementById('competitorList').innerText;
    let audienceDetails= document.getElementById('audienceDetails').innerText;
    let audienceAge= document.getElementById('audienceAge').innerText;
    let audienceGender= document.getElementById('audienceGender').innerText;
    let conversionRate= document.getElementById('conversionRate').innerText;
    let averageOrderValue= document.getElementById('averageOrderValue').innerText;
    let monthlyBudget= document.getElementById('monthlyBudget').innerText;
    let digitalBudget= document.getElementById('digitalBudget').innerText;
    let influencerBudget= document.getElementById('influencerBudget').innerText;
    let onlineSales= document.getElementById('onlineSales').innerText;
    let retailSales= document.getElementById('retailSales').innerText;
    let name= document.getElementById('name').innerText;
    let photorealistic = document.getElementById('photorealistic').checked;
    let illustrated = document.getElementById('illustrated').checked;
    let cinematic = document.getElementById('cinematic').checked;
    let modern = document.getElementById('modern').checked;
    let retro = document.getElementById('retro').checked;
    let abstract = document.getElementById('abstract').checked;
    let moody = document.getElementById('moody').checked;
    let vibrant = document.getElementById('vibrant').checked;



function checkField(field) {
  return field && field !== "" ? field : 'not available';
}
function initScript(suffix, customPrompt, url, memberId, title) {
  console.log(title);
  let currentResponse = "";
  window.addEventListener("load", function () {
    // Check for stored text and populate the response container if it exists
		const storedText = localStorage.getItem('aiText' + suffix + memberId);
		const storedCurrentResponse = localStorage.getItem('currentResponse' + suffix + memberId);
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
    generatePDF(currentResponse, suffix);
  });

  //double check above line
  
  function generateCustomResponse(suffix, customPrompt, url) {
    console.log(title);
    showLoadingAnimation(suffix);
    
    let prompt = customPrompt;
    const monthlyRevenueValue = checkField(`${monthlyRevenue}`);
    const monthlyTrafficValue = checkField(`${monthlyVisitors}`);
    const competitorsValue = checkField(`${competitorList}`);
    const audienceInfoValue = checkField(`${audienceDetails}`);
  
		// Replace placeholders in the prompt with actual values
			prompt = prompt.replace('monthly_revenue_placeholder', monthlyRevenueValue);
			prompt = prompt.replace('monthly_traffic_placeholder', monthlyTrafficValue);
			prompt = prompt.replace('competitors_placeholder', competitorsValue);
			prompt = prompt.replace('audience_info_placeholder', audienceInfoValue);

  
    requestAnimationFrame(() => {
      sendToPipedream(prompt, memberId, function (response) {
        removeLoadingAnimation(suffix);
        displayAIOutput(response, suffix);
      }, url, title);
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
  localStorage.setItem('aiText' + suffix + memberId, formattedResponse);
  localStorage.setItem('currentResponse' + suffix + memberId, response);

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

function sendToPipedream(prompt, memberId, callback, url, title) {
  console.log(title); 
const xhr = new XMLHttpRequest();
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const response = JSON.parse(xhr.responseText).message;
    callback(response);
  }
};

let styles = {
    photorealistic: photorealistic,
    illustrated: illustrated,
    cinematic: cinematic,
    modern: modern,
    retro: retro,
    abstract: abstract,
    moody: moody,
    vibrant: vibrant,
}

const data = {
	memberId: memberId,
    title: title,
    name: name,
    styles: styles,
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


const prompt1 = `Generate a detailed market analysis for a product or service that includes but is not limited to the following values (please include analysis beyond what is listed here if possible) (ignore any values that are blank or not available). 
Please make this a detailed analysis based on the information that is available. Please do your best to generate a full-spectrum analysis regardless of the amount of information available below:

Product Category: ${productType},
Product Description: ${productDescription}, 
Product Market: ${marketLocation},
Business Owners Name: ${firstName} ${lastName},
Monthly Recurring Revenue: monthly_revenue_placeholder,
Monthly Website Traffic: monthly_traffic_placeholder,
List of potential competitors: competitors_placeholder,
Business Name: ${businessName}, 
Primary Product or service that is being sold: ${primaryProduct},
Ancillary products or services that are being sold: ${ancillaryProduct},
Average ages of target audience: ${audienceAge},
Typical gender of target audience: ${audienceGender},
Average website conversion rate: ${conversionRate},
Average website purchase order value: ${averageOrderValue},
Estimated overall monthly marketing budget: ${monthlyBudget},
Estimated monthly digital advertising budget: ${digitalBudget},
Estimated monthly influencer or brand collaboration budget: ${influencerBudget},
Average percentage of total sales that are made direct-to-consumer online: ${onlineSales},
Average percentage of total sales that are from in-person retail: ${retailSales},
Key target audience information: audience_info_placeholder.`;

const prompt2 = `Generate a detailed competitor analysis for a product or service that includes but is not limited to the following values (please include analysis beyond what is listed here if possible) (ignore any values that are blank or not available).
Please make this a detailed analysis based on the information that is available. Please do your best to generate a full-spectrum analysis regardless of the amount of information available below:

Product Category: ${productType},
Product Description: ${productDescription}, 
Product Market: ${marketLocation},
Business Owners Name: ${firstName} ${lastName},
Monthly Recurring Revenue: monthly_revenue_placeholder,
Monthly Website Traffic: monthly_traffic_placeholder,
List of potential competitors: competitors_placeholder,
Business Name: ${businessName}, 
Primary Product or service that is being sold: ${primaryProduct},
Ancillary products or services that are being sold: ${ancillaryProduct},
Average ages of target audience: ${audienceAge},
Typical gender of target audience: ${audienceGender},
Average website conversion rate: ${conversionRate},
Average website purchase order value: ${averageOrderValue},
Estimated overall monthly marketing budget: ${monthlyBudget},
Estimated monthly digital advertising budget: ${digitalBudget},
Estimated monthly influencer or brand collaboration budget: ${influencerBudget},
Average percentage of total sales that are made direct-to-consumer online: ${onlineSales},
Average percentage of total sales that are from in-person retail: ${retailSales},
Key target audience information: audience_info_placeholder.`;

const prompt3 = `Generate a detailed numbered list of 6 potential consumer personas/audience segments to target when marketing for a product or service that includes but is not limited to the following values (please include analysis beyond what is listed here if possible) (ignore any values that are blank or not available).
Please make this a detailed analysis based on the information that is available. Please do your best to generate a full-spectrum analysis regardless of the amount of information available below:


Product Category: ${productType},
Product Description: ${productDescription}, 
Product Market: ${marketLocation},
Business Owners Name: ${firstName} ${lastName},
Monthly Recurring Revenue: monthly_revenue_placeholder,
Monthly Website Traffic: monthly_traffic_placeholder,
List of potential competitors: competitors_placeholder,
Business Name: ${businessName}, 
Primary Product or service that is being sold: ${primaryProduct},
Ancillary products or services that are being sold: ${ancillaryProduct},
Average ages of target audience: ${audienceAge},
Typical gender of target audience: ${audienceGender},
Average website conversion rate: ${conversionRate},
Average website purchase order value: ${averageOrderValue},
Estimated overall monthly marketing budget: ${monthlyBudget},
Estimated monthly digital advertising budget: ${digitalBudget},
Estimated monthly influencer or brand collaboration budget: ${influencerBudget},
Average percentage of total sales that are made direct-to-consumer online: ${onlineSales},
Average percentage of total sales that are from in-person retail: ${retailSales},
Key target audience information: audience_info_placeholder.`;

const prompt4 = `Generate a detailed marketing plan/strategy broken out into quarterly segments for a product or service that includes but is not limited to the following conditions (please include analysis beyond what is listed here if possible) (ignore any values that are blank or not available).
Please make this a detailed analysis based on the information that is available. Please do your best to generate a full-spectrum analysis regardless of the amount of information available below:

Product Category: ${productType},
Product Description: ${productDescription}, 
Product Market: ${marketLocation},
Business Owners Name: ${firstName} ${lastName},
Monthly Recurring Revenue: monthly_revenue_placeholder,
Monthly Website Traffic: monthly_traffic_placeholder,
List of potential competitors: competitors_placeholder,
Business Name: ${businessName}, 
Primary Product or service that is being sold: ${primaryProduct},
Ancillary products or services that are being sold: ${ancillaryProduct},
Average ages of target audience: ${audienceAge},
Typical gender of target audience: ${audienceGender},
Average website conversion rate: ${conversionRate},
Average website purchase order value: ${averageOrderValue},
Estimated overall monthly marketing budget: ${monthlyBudget},
Estimated monthly digital advertising budget: ${digitalBudget},
Estimated monthly influencer or brand collaboration budget: ${influencerBudget},
Average percentage of total sales that are made direct-to-consumer online: ${onlineSales},
Average percentage of total sales that are from in-person retail: ${retailSales},
Key target audience information: audience_info_placeholder.`;

const prompt5 = `Generate a detailed conversion rate optimization checklist for a website that sells a product or service that includes but is not limited to the following conditions (please include analysis beyond what is listed here if possible) (ignore any values that are blank or not available).
Please make this a detailed analysis based on the information that is available. Please do your best to generate a full-spectrum analysis regardless of the amount of information available below:


Product Category: ${productType},
Product Description: ${productDescription}, 
Product Market: ${marketLocation},
Business Owners Name: ${firstName} ${lastName},
Monthly Recurring Revenue: monthly_revenue_placeholder,
Monthly Website Traffic: monthly_traffic_placeholder,
List of potential competitors: competitors_placeholder,
Business Name: ${businessName}, 
Primary Product or service that is being sold: ${primaryProduct},
Ancillary products or services that are being sold: ${ancillaryProduct},
Average ages of target audience: ${audienceAge},
Typical gender of target audience: ${audienceGender},
Average website conversion rate: ${conversionRate},
Average website purchase order value: ${averageOrderValue},
Estimated overall monthly marketing budget: ${monthlyBudget},
Estimated monthly digital advertising budget: ${digitalBudget},
Estimated monthly influencer or brand collaboration budget: ${influencerBudget},
Average percentage of total sales that are made direct-to-consumer online: ${onlineSales},
Average percentage of total sales that are from in-person retail: ${retailSales},
Key target audience information: audience_info_placeholder.`;

const prompt6 = `Generate a detailed SEO & keyword analysis for a website that sells a product or service that includes but is not limited to the following conditions (please include analysis beyond what is listed here if possible) (ignore any values that are blank or not available).
Please make this a detailed analysis based on the information that is available. Please do your best to generate a full-spectrum analysis regardless of the amount of information available below:


Product Category: ${productType},
Product Description: ${productDescription}, 
Product Market: ${marketLocation},
Business Owners Name: ${firstName} ${lastName},
Monthly Recurring Revenue: monthly_revenue_placeholder,
Monthly Website Traffic: monthly_traffic_placeholder,
List of potential competitors: competitors_placeholder,
Business Name: ${businessName}, 
Primary Product or service that is being sold: ${primaryProduct},
Ancillary products or services that are being sold: ${ancillaryProduct},
Average ages of target audience: ${audienceAge},
Typical gender of target audience: ${audienceGender},
Average website conversion rate: ${conversionRate},
Average website purchase order value: ${averageOrderValue},
Estimated overall monthly marketing budget: ${monthlyBudget},
Estimated monthly digital advertising budget: ${digitalBudget},
Estimated monthly influencer or brand collaboration budget: ${influencerBudget},
Average percentage of total sales that are made direct-to-consumer online: ${onlineSales},
Average percentage of total sales that are from in-person retail: ${retailSales},
Key target audience information: audience_info_placeholder.`;

initScript("", prompt1, "https://eoxj2na136w4ffz.m.pipedream.net", memberId, "Market Analysis");
initScript("2", prompt2, "https://eogd5hkxlde4ujl.m.pipedream.net", memberId, "Competitor Analysis");
initScript("3", prompt3, "https://eozc33fki2b37c1.m.pipedream.net", memberId, "Audience Segments");
initScript("4", prompt4, "https://eovldljm4znyz5o.m.pipedream.net", memberId, "Marketing Plan");
initScript("5", prompt5, "https://eocjo3vx82oo2ri.m.pipedream.net", memberId, "CRO Checklist");
initScript("6", prompt6, "https://eodj4vleiayggxq.m.pipedream.net", memberId, "SEO Analysis");

});





