var apikey = 'f3d1f1dba2454d5e815ff2e5230e3e33';

 var api_url = 'https://api.opencagedata.com/geocode/v1/json'

 // Access DOM elements
 const searchForm = document.getElementById('search-form');
 const placeInput = document.getElementById('place');
 const currentLocation = document.getElementById('currentLocation');
 const currentTime = document.getElementById('currentTime');
 const result = document.getElementById('result');

 // Access Popular Places
 const londonTime = document.querySelector('.london h2');
 const sydneyTime = document.querySelector('.sydney h2');
 const greeceTime = document.querySelector('.greece h2');
 const delhiTime = document.querySelector('.delhi h2');
 const tokyoTime = document.querySelector('.tokyo h2');

 var getLocation = () => {
   fetch('https://ipinfo.io/json')
     .then(res => res.json())
     .then(res => {
       currentLocation.textContent = res.city + ', ' + res.country;
      //  console.log(res)
     })
     .catch(err => console.log(err))
 }
 getLocation();

 var getTime =  (place, targetElement, timeOnly) => {
   var request_url = api_url
     + '?'
     + 'key=' + apikey
     + '&q=' + place
     + '&pretty=1';
     // + '&no_annotations=1';

     console.log(result.textContent);

   fetch(request_url)
     .then(res => res.json())
     .then(response => {
       // console.log(response.results[0].annotations.timezone.name);
       var text = response.results[0].annotations.timezone.name;
       fetch('https://api.ipgeolocation.io/timezone?apiKey=c8eff193453a414daf64eca681ff993e&tz=' + text)
         .then(res => res.json())
         .then(res => {
           if(timeOnly) targetElement.textContent = res.time_24.slice(0, 5);
           else targetElement.textContent = "Time in " + place + " is " + res.time_24.slice(0, 5) + " (" + res.date + ")";
         })
         .catch(err => console.log(err));
     }
   )
   .catch(err => console.log(err))

 };

const getCurrentTime = () => {
  const today = new Date();
  currentTime.textContent  = (today.getHours() < 10 ? '0' : '') + today.getHours() + ":" +  (today.getMinutes()<10?'0':'') + today.getMinutes();
}

const getAllTime = () => {
  getCurrentTime();
  getTime("london", londonTime, true);
  getTime("sydney", sydneyTime, true);
  getTime("greece", greeceTime, true);
  getTime("delhi", delhiTime, true);
  getTime("tokyo", tokyoTime, true);
};
getAllTime();

setInterval(function(){
  getAllTime();
}, 60000);



 searchForm.addEventListener('submit', ($event) => {
   $event.preventDefault();
   if(placeInput.value.toLowerCase() === "lagos"){
     placeInput.value = "lagos, nigeria";
   }

   getTime(placeInput.value, result, false);


 });
