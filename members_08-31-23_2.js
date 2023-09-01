let productType, serviceType, productDescription, marketLocation, firstName, lastName, memberId, businessName, primaryProduct, ancillaryProduct, monthlyRevenue, monthlyVisitors, competitorList, audienceDetails, audienceAge, audienceGender, conversionRate, averageOrderValue, monthlyBudget, digitalBudget, influencerBudget, onlineSales, retailSales, name;

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Checking data before retrieval:');
    console.log('productType:', document.getElementById('productType').innerText);
    console.log('serviceType:', document.getElementById('serviceType').innerText);
    console.log('productDescription:', document.getElementById('productDescription').innerText);

    productType = document.getElementById('productType').innerText;
    serviceType = document.getElementById('serviceType').innerText;
    productDescription = document.getElementById('productDescription').innerText;
    marketLocation = document.getElementById('marketLocation').innerText;
    firstName = document.getElementById('firstName').innerText;
    lastName = document.getElementById('lastName').innerText;
    memberId = document.getElementById('memberId').innerText;
    businessName = document.getElementById('businessName').innerText;
    primaryProduct = document.getElementById('primaryProduct').innerText;
    ancillaryProduct = document.getElementById('ancillaryProduct').innerText;
    monthlyRevenue= document.getElementById('monthlyRevenue').innerText || "not available";
    monthlyVisitors= document.getElementById('monthlyVisitors').innerText || "not available";
    competitorList= document.getElementById('competitorList').innerText || "not available";
    audienceDetails= document.getElementById('audienceDetails').innerText || "not available";
    audienceAge= document.getElementById('audienceAge').innerText || "not available";
    audienceGender= document.getElementById('audienceGender').innerText || "not available";
    conversionRate= document.getElementById('conversionRate').innerText || "not available";
    averageOrderValue= document.getElementById('averageOrderValue').innerText || "not available";
    monthlyBudget= document.getElementById('monthlyBudget').innerText || "not available";
    digitalBudget= document.getElementById('digitalBudget').innerText || "not available";
    influencerBudget= document.getElementById('influencerBudget').innerText || "not available";
    onlineSales= document.getElementById('onlineSales').innerText || "not available";
    retailSales= document.getElementById('retailSales').innerText || "not available";
    name= document.getElementById('name').innerText || "not available";

    // Initialize all scripts here
    initScript("", prompt1, "https://eoxj2na136w4ffz.m.pipedream.net", memberId, "Market Analysis");
    initScript("2", prompt2, "https://eogd5hkxlde4ujl.m.pipedream.net", memberId, "Competitor Analysis");
    initScript("3", prompt3, "https://eozc33fki2b37c1.m.pipedream.net", memberId, "Audience Segments");
    initScript("4", prompt4, "https://eovldljm4znyz5o.m.pipedream.net", memberId, "Marketing Plan");
    initScript("5", prompt5, "https://eocjo3vx82oo2ri.m.pipedream.net", memberId, "CRO Checklist");
    initScript("6", prompt6, "https://eodj4vleiayggxq.m.pipedream.net", memberId, "SEO Analysis");
    initScript("20", prompt7, "https://eoww9c4fxmc4shg.m.pipedream.net", memberId, "Blog Post Ideas");
});

function initScript(suffix, customPrompt, url, memberId, title) {
    console.log(title);
    let currentResponse = "";
    window.addEventListener("load", function () {
        const storedText = localStorage.getItem('aiText' + suffix + memberId);
        const storedCurrentResponse = localStorage.getItem('currentResponse' + suffix + memberId);
        if (storedText) {
            const responseContainer = document.getElementById("response-container" + suffix);
            responseContainer.innerHTML = `<div class="rich-text-output" style="white-space: pre-wrap;">${storedText}</div>`;
            currentResponse = storedCurrentResponse;
        }

        const submitButton = document.getElementById("submit-button" + suffix);
        submitButton.addEventListener("click", function (e) {
            e.preventDefault();
            
                // Fetch the values again right before sending them
                productType = document.getElementById('productType').innerText;
                serviceType = document.getElementById('serviceType').innerText;
                productDescription = document.getElementById('productDescription').innerText;
                marketLocation = document.getElementById('marketLocation').innerText;
                firstName = document.getElementById('firstName').innerText;
                lastName = document.getElementById('lastName').innerText;
                memberId = document.getElementById('memberId').innerText;
                businessName = document.getElementById('businessName').innerText;
                primaryProduct = document.getElementById('primaryProduct').innerText;
                ancillaryProduct = document.getElementById('ancillaryProduct').innerText;
                monthlyRevenue= document.getElementById('monthlyRevenue').innerText || "not available";
                monthlyVisitors= document.getElementById('monthlyVisitors').innerText || "not available";
                competitorList= document.getElementById('competitorList').innerText || "not available";
                audienceDetails= document.getElementById('audienceDetails').innerText || "not available";
                audienceAge= document.getElementById('audienceAge').innerText || "not available";
                audienceGender= document.getElementById('audienceGender').innerText || "not available";
                conversionRate= document.getElementById('conversionRate').innerText || "not available";
                averageOrderValue= document.getElementById('averageOrderValue').innerText || "not available";
                monthlyBudget= document.getElementById('monthlyBudget').innerText || "not available";
                digitalBudget= document.getElementById('digitalBudget').innerText || "not available";
                influencerBudget= document.getElementById('influencerBudget').innerText || "not available";
                onlineSales= document.getElementById('onlineSales').innerText || "not available";
                retailSales= document.getElementById('retailSales').innerText || "not available";
                name= document.getElementById('name').innerText || "not available";

            let styles = {
                photorealistic: document.getElementById('photorealistic') ? document.getElementById('photorealistic').checked : false,
                illustrated: document.getElementById('illustrated') ? document.getElementById('illustrated').checked : false,
                cinematic: document.getElementById('cinematic') ? document.getElementById('cinematic').checked : false,
                modern: document.getElementById('modern') ? document.getElementById('modern').checked : false,
                retro: document.getElementById('retro') ? document.getElementById('retro').checked : false,
                abstract: document.getElementById('abstract') ? document.getElementById('abstract').checked : false,
                moody: document.getElementById('moody') ? document.getElementById('moody').checked : false,
                vibrant: document.getElementById('vibrant') ? document.getElementById('vibrant').checked : false,
            };
            
            let toneOfVoice = {
                Authoritative: document.getElementById('Authoritative' + suffix) ? document.getElementById('Authoritative' + suffix).checked : false,
                Whimsical: document.getElementById('Whimsical' + suffix) ? document.getElementById('Whimsical' + suffix).checked : false,
                Educational: document.getElementById('Educational' + suffix) ? document.getElementById('Educational' + suffix).checked : false,
                Inspirational: document.getElementById('Inspirational' + suffix) ? document.getElementById('Inspirational' + suffix).checked : false,
                Witty: document.getElementById('Witty' + suffix) ? document.getElementById('Witty' + suffix).checked : false,
                Minimalistic: document.getElementById('Minimalistic' + suffix) ? document.getElementById('Minimalistic' + suffix).checked : false,
                Nostalgic: document.getElementById('Nostalgic' + suffix) ? document.getElementById('Nostalgic' + suffix).checked : false,
                Relatable: document.getElementById('Relatable' + suffix) ? document.getElementById('Relatable' + suffix).checked : false,
            };
            
            generateCustomResponse(suffix, customPrompt, url, styles, toneOfVoice, title);
        });

        if (currentResponse) {
            const downloadButton = document.getElementById("download-pdf-button" + suffix);
            downloadButton.style.display = "block";
        }
    });
    document.getElementById("download-pdf-button" + suffix).addEventListener("click", function () {
        generatePDF(currentResponse, suffix);
    });
}

function generateCustomResponse(suffix, customPrompt, url, styles, toneOfVoice, title) {
    showLoadingAnimation(suffix);
    let prompt = customPrompt;
    prompt = prompt.replace('monthly_revenue_placeholder', monthlyRevenue);
    prompt = prompt.replace('monthly_traffic_placeholder', monthlyVisitors);
    prompt = prompt.replace('competitors_placeholder', competitorList);
    prompt = prompt.replace('audience_info_placeholder', audienceDetails);
    requestAnimationFrame(() => {
        sendToPipedream(prompt, memberId, function (response) {
            removeLoadingAnimation(suffix);
            displayAIOutput(response, suffix);
        }, url, title, styles, toneOfVoice);
    });
}

function sendToPipedream(prompt, memberId, callback, url, title, styles, toneOfVoice) {
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
        title: title,
        name: name,
        styles: styles,
        toneOfVoice: toneOfVoice,
        conversationHistory: [
            {
                role: "system",
                content: "You are a business and marketing expert who is designed to generate detailed reports, predictions, and analysis for any business or marketing related topic.",
            },
            {
                role: "user",
                content: prompt,
            },
        ],
    };
    xhr.send(JSON.stringify(data));
}

//Please add the remaining functions showLoadingAnimation, removeLoadingAnimation, displayAIOutput and generatePDF here.

  

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

const prompt7 = `Generate a detailed list of 6 potential long-form SEO blog posts including headings, subheadings, and several body sections for a website that sells a product or service that includes but is not limited to the following conditions (please include analysis beyond what is listed here if possible) (ignore any values that are blank or not available).
Please make this a detailed list based on the information that is available. Please do your best to generate a full-spectrum list of potential blog posts regardless of the amount of information available below:


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

