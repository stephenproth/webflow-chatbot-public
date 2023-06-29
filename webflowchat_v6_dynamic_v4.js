function saveConversationHistory()
{
  localStorage.setItem( "chatbot-conversationHistory", JSON.stringify( conversationHistory ) )
}

function loadConversationHistory()
{
  let e = localStorage.getItem( "chatbot-conversationHistory" );
  return e ? JSON.parse( e ) : []
}

function levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
  
    const matrix = [];
  
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
  
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
  
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
        }
      }
    }
  
    return matrix[b.length][a.length];
  }
const keywordResponses = [
{
  keywords: [ "workblock" ],
  response: "We break our flex and cohesion retainer packages out into workblocks. With each pricing tier of our packages, you receive a set amount of workblocks per month. The workblocks are broken down by the type of labor/service involved. For example, 1 hr of software development work would equate to 1 workblock while 4 hrs of basic account management would also equate to 1 workblock. You can find more information about workblocks <a href='https://www.indraintelligence.com/packages' target='_blank'>here</a>.",
  matchType: "phrase",
  triggered: !1
},
{
  keywords: [ "social", "media" ],
  response: "We offer everything you need to reach new and existing customers. With the precision to reach just the right customer, at just the right time, with just the right message. Improving returns and optimizing results. You can find more information about our organic social media services <a href='https://www.indraintelligence.com/reach' target='_blank'>here</a>.",
  matchType: "multiple-required",
  triggered: !1
},
]

function getPresetResponse( e )
{
  const similarityThreshold = 2; // Adjust this value to control the match sensitivity

  for ( let t of keywordResponses )
    if ( !t.triggered )
    {
      if ( "multiple-required" === t.matchType )
      {
        let o = t.keywords.every( t => e.toLowerCase().includes( t.toLowerCase() ) );
        if ( o ) return t.triggered = !0, t.response
      }
      else
      {
        let n = t.keywords.some( o =>
        {
          let n = e.toLowerCase(),
            r = o.toLowerCase();
          let distance = levenshtein(n, r);

          return "exact" === t.matchType ? n === r : ( "phrase" === t.matchType, n.includes( r ) || distance <= similarityThreshold )
        } );
        if ( n ) return t.triggered = !0, t.response
      }
    } return null
}
let conversationHistory = loadConversationHistory();

function clearChatHistory()
{
  localStorage.removeItem( "chatbot-conversationHistory" ), conversationHistory = [
  {
    role: "assistant",
    content: "Hi, how can I help you today?"
  },
  {
    role: "bot-options",
    content: JSON.stringify( [ "Pricing", "Services", "Get in Touch", "Other" ] )
  }, ];
  let e = document.querySelector( ".messages-wrapper" );
  e.innerHTML = "", conversationHistory.forEach( e => addMessageToWidget( e.content, e.role ) )
}

function showLoadingSpinner()
{
  let e = document.createElement( "div" );
  e.className = "loading-spinner";
  let t = document.querySelector( ".messages-wrapper" );
  t.appendChild( e ), t.scrollTop = t.scrollHeight
}

function removeLoadingSpinner()
{
  let e = document.querySelector( ".loading-spinner" );
  e && e.remove()
}

function displayMessageOptions( e )
{
  let t = document.createElement( "div" );
  t.className = "option-container", t.innerHTML = e.map( e => `<button class="option-button">${e}</button>` ).join( "" );
  let o = document.querySelector( ".messages-wrapper" );
  o.appendChild( t ), o.scrollTop = o.scrollHeight;
  let n = document.querySelectorAll( ".option-button" );
  n.forEach( e =>
  {
    e.addEventListener( "click", function ( e )
    {
      e.preventDefault(), e.stopImmediatePropagation();
      let t = e.target.textContent;
      handleUserOption( t )
    } )
  } )
}

function handleUserOption( e )
{
  addMessageToWidget( e, "user" ), conversationHistory.push(
  {
    role: "user",
    content: e
  } ), saveConversationHistory(), "Other" === e ? addMessageToWidget( "Ask me anything! I'm a general knowledge AI ready to help!", "bot" ) 
  : "Pricing" === e ? addMessageToWidget( "We offer 'a la carte' services along with retainer-based flex & cohesion packages: <a href='https://www.indraintelligence.com/packages' target='_blank'>View Our Packages</a>", "bot" ) 
  : "Services" === e ? addMessageToWidget( "We can do almost anything you need to help you <a href='https://www.indraintelligence.com/build' target='_blank'>Build,</a> <a href='https://www.indraintelligence.com/reach' target='_blank'>Reach,</a> and <a href='https://www.indraintelligence.com/grow' target='_blank'>Grow!</a>", "bot" ) 
  : "Get in Touch" === e && addMessageToWidget( "You can contact us and setup a time to talk <a href='https://www.indraintelligence.com/#lets-talk' target='_blank'>here!</a>", "bot" )
}

function addSpinnerStyles()
{
  let e = document.createElement( "style" );
  e.innerHTML = `
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
  `, document.head.appendChild( e )
}

function sendToPipedream( e, t )
{
  conversationHistory.push(
  {
    role: "user",
    content: e
  } ), saveConversationHistory();
  let o = {
      role: "system",
      content: systemMessage // use the dynamic system message here
    },
    n;
  if ( conversationHistory.length >= 2 && "assistant" === conversationHistory[ conversationHistory.length - 2 ].role )
  {
    let r = {
      role: "assistant",
      content: conversationHistory[ conversationHistory.length - 2 ].content
    };
    n = [ o, r, ...conversationHistory.filter( e => "bot-options" !== e.role ) ]
  }
  else n = [ o, ...conversationHistory.filter( e => "bot-options" !== e.role ) ];
  showLoadingSpinner(), $.ajax(
  {
    method: "POST",
    url: "https://eo3v9szynasnkt1.m.pipedream.net",
    data: JSON.stringify(
    {
      conversationHistory: n
    } ),
    contentType: "application/json",
    success: function ( e )
    {
      console.log( e ), removeLoadingSpinner();
      let t = e.message;
      for ( let [ o, n ] of Object.entries(
        {
          flex: "https://www.indraintelligence.com/packages#Flex"
        } ) )
      {
        let r = RegExp( `\\b${o}\\b`, "gi" );
        r.test( t ) && ( t = t.replace( r, `<a href="${n}" target="_blank">${o}</a>` ) )
      }
      addMessageToWidget( t, "assistant", null, function ()
      {
        conversationHistory.push(
        {
          role: "assistant",
          content: t
        } ), saveConversationHistory()
      } )
    }
  } )
}


function addMessageToWidget( e, t, o = null, n = null )
{
  if ( "bot-options" === t )
  {
    displayMessageOptions( JSON.parse( e ) );
    return
  }
  let r = document.createElement( "div" );
  if ( r.className = "user" === t ? "user-message" : "bot-message", o )
  {
    let s = document.createElement( "a" );
    s.href = o, s.target = "_blank", s.textContent = e, r.appendChild( s )
  }
  else r.innerHTML = e;
  let a = document.querySelector( ".messages-wrapper" );
  a.appendChild( r ), a.scrollTop = a.scrollHeight, n && n()
}
0 === conversationHistory.length && ( conversationHistory = [
{
  role: "system",
  content: "You are a helpful assistant."
},
{
  role: "assistant",
  content: "Hi, how can I help you today?"
},
{
  role: "bot-options",
  content: JSON.stringify( [ "Pricing", "Services", "Get in Touch", "Other" ] )
}, ] ), 

$( "#user-input" ).keypress( function ( e ) {
    if ( 13 == e.which ) {
      e.preventDefault();
      let t = $( "#user-input" ).val().trim();
      if ( t ) {
        // Check if the last user message is not the same as the current user message
        let lastUserMessage = conversationHistory.slice().reverse().find(e => e.role === "user");
        if (!lastUserMessage || lastUserMessage.content !== t) {
          addMessageToWidget( t, "user" );
          conversationHistory.push({
            role: "user",
            content: t
          });
          saveConversationHistory();
        }
  
        let o = getPresetResponse( t );
        if (o) {
          addMessageToWidget( o, "assistant" );
          conversationHistory.push({
            role: "assistant",
            content: o
          });
          saveConversationHistory();
        } else {
          sendToPipedream( t, function ( e ) {
            addMessageToWidget( e, "assistant" )
          });
        }
        $( "#user-input" ).val( "" );
      }
    }
  });
  
  addSpinnerStyles();
  let lastUserMessageAdded = null;
  conversationHistory.filter(e => "system" !== e.role).forEach(e => {
    if (e.role === "user") {
      if (lastUserMessageAdded !== e.content) {
        addMessageToWidget(e.content, e.role);
        lastUserMessageAdded = e.content;
      }
    } else {
      addMessageToWidget(e.content, e.role);
    }
  });  

  let systemMessage = "";

  document.addEventListener('DOMContentLoaded', (event) => {
    let productType = document.getElementById('productType').innerText;
    let productDescription = document.getElementById('productDescription').innerText;
    let marketLocation = document.getElementById('marketLocation').innerText;
    let firstName = document.getElementById('firstName').innerText;
    let lastName = document.getElementById('lastName').innerText;
  
    systemMessage = `You are a chatbot designed to help businesses generate market analysis, marketing plans/strategies, competitor analysis, and audience segmentation/consumer personas. The specific business you are messaging with now has a product or service that falls under the category of ${productType} and is described as ${productDescription} and is being sold in ${marketLocation} by the business owner named ${firstName} ${lastName}.`;
  
  });
  
  document.addEventListener( "DOMContentLoaded", function () {
    document.querySelector(".clear-chat-button").addEventListener("click", function () {
      clearChatHistory();
    });
  });
  