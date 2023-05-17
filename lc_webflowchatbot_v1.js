function saveConversationHistory()
{
  localStorage.setItem( "chatbot-conversationHistory", JSON.stringify( conversationHistory ) )
}

function loadConversationHistory()
{
  let e = localStorage.getItem( "chatbot-conversationHistory" );
  return e ? JSON.parse( e ) : []
}
const keywordResponses = [
{
  keywords: [ "workblock" ],
  response: "A workblock is a fixed duration of time dedicated to focused work on a specific task. You can find more information about workblocks <a href='https://indraintelligence.com' target='_blank'>here</a>.",
  matchType: "exact",
  triggered: !1
},
{
  keywords: [ "organic", "social" ],
  response: "Organic social media management involves creating...",
  matchType: "multiple-required",
  triggered: !1
},
{
  keywords: [ "paid advertising" ],
  response: "Paid advertising includes various strategies...",
  matchType: "phrase",
  triggered: !1
},
{
  keywords: [ "email marketing services" ],
  response: "We offer email marketing services...",
  triggered: !1
} ];

function getPresetResponse( e )
{
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
          return "exact" === t.matchType ? n === r : ( t.matchType, n.includes( r ) )
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
  } ), saveConversationHistory(), "Other" === e ? addMessageToWidget( "Ask me anything! I'm a general knowledge AI ready to help!", "bot" ) : "Pricing" === e ? addMessageToWidget( "We offer 'a la carte' services along with retainer-based flex & cohesion packages: <a href='https://www.indraintelligence.com/packages' target='_blank'>View Our Packages</a>", "bot" ) : "Services" === e ? addMessageToWidget( "We can do almost anything you need to help you <a href='https://www.indraintelligence.com/build' target='_blank'>Build,</a> <a href='https://www.indraintelligence.com/reach' target='_blank'>Reach,</a> and <a href='https://www.indraintelligence.com/grow' target='_blank'>Grow!</a>", "bot" ) : "Get in Touch" === e && addMessageToWidget( "You can contact us and setup a time to talk <a href='https://www.indraintelligence.com/#lets-talk' target='_blank'>here!</a>", "bot" )
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
      content: "You are a chatbot designed to help visitors to the Indra Intelligence website. Indra Intelligence (also known as Indra, indra, indra intelligence) is a digital services agency that specializes in paid digital advertising, email marketing, organic social media management, website & product development, and several other growth, development, and reach related services. Indra or Indra Intelligence or any combination of the name is a United States company tbat does exactly what was stated previously. Do not refer to any other version of Indra."
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
    url: "https://eo6ym25h01swzhx.m.pipedream.net",
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
  
  document.addEventListener( "DOMContentLoaded", function () {
    document.querySelector(".clear-chat-button").addEventListener("click", function () {
      clearChatHistory();
    });
  });
  