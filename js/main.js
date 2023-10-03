let CLIENT_IP_ADDRESS="";
let TEXTAREA_INTERACTION = $("#id_hackConsoleTextarea");
let CLIENT_DETAILS={};
let BASE_MESSAGES=['Connecting...', 'Connection Successful!' , 'Injecting HTML markup input...', 'Access Granted!', 'Declassifying documents...','Connection Interrupted!'];
let FBI_MESSAGES=['THIS IS THE FBI - AN ILLEGAL CONNECTION HAS BEEN DETECTED!', 'Localizing...' , 'Location Retrieved!', 'Tracking...'];

$( document ).ready(function() {
  addToTextarea('STARTING....');
  addToTextarea('DO NOT CLOSE THIS WINDOW!');

  $.getJSON("https://api.ipify.org/?format=json", function(e) {
    CLIENT_IP_ADDRESS = e.ip;
  });
  $.ajax({
    url: "https://json.geoiplookup.io/"+CLIENT_IP_ADDRESS,
    success: function(data){
      CLIENT_DETAILS = data;
    }
  });
});

//add listener
$("#id_submitQueryButton").click(function (){
  $('#id_donateForm').hide();
  let count = 0;
  let baseInterval = setInterval(function () {
    if(count===BASE_MESSAGES.length){
      clearInterval(baseInterval);
      fbiMessages();
    }else {
      addToTextarea(BASE_MESSAGES[count])
    }
    count++;
  }, 1500);
});

function fbiMessages(){
  let count = 0;
  let fbiInterval = setInterval(function () {
    if(count===FBI_MESSAGES.length){
      clearInterval(fbiInterval);
      trackingMessages();
    }else {
      addToTextarea(FBI_MESSAGES[count])
    }
    count++;
  }, 2500);
}

function trackingMessages(){
  let count = 0;
  let trackingInfoArray = ['Connected from: '+CLIENT_DETAILS.ip, 'Country: '+CLIENT_DETAILS.country_name, 'State: '
  + CLIENT_DETAILS.region,'City: '+ CLIENT_DETAILS.city, 'Internet Provided By: ' + CLIENT_DETAILS.isp,'Coordinates: '
  +CLIENT_DETAILS.latitude + ' ' + CLIENT_DETAILS.longitude, 'Postal Code: ' + CLIENT_DETAILS.postal_code,'FBI Authorized to break in!','10','9','8','7','6','5'
    ,'4','3','2','1', 'THE END - THANKS FOR PLAYING - Please donate $1 to keep this game alive'];
  let trackingInterval = setInterval(function () {
    if(count===trackingInfoArray.length){
      clearInterval(trackingInterval);
      $('#id_donateForm').show();
      $('#id_modal_cancel').prop("disabled", false);
    }else {
      addToTextarea(trackingInfoArray[count])
    }
    count++;
  }, 2000);
}

$("#id_modal_cancel").click(function(){
  clear();
});

function clear(){
  TEXTAREA_INTERACTION.html("");
  $('#id_modal_cancel').prop("disabled", true);
}

function addToTextarea(data){
  TEXTAREA_INTERACTION.html(TEXTAREA_INTERACTION.html() +data + "\n");
}
