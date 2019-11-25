var apikey = 'f3d1f1dba2454d5e815ff2e5230e3e33';

 var api_url = 'https://api.opencagedata.com/geocode/v1/json'

 // Access DOM elements
 const searchForm = document.getElementById('search-form');
 const placeInput = document.getElementById('place');
 const currentLocation = document.getElementById('currentLocation');
 const currentTime = document.getElementById('currentTime');
 const result = document.getElementById('result');

 var getLocation = () => {
   fetch('https://ipinfo.io/json')
     .then(res => res.json())
     .then(res => {
       currentLocation.textContent = res.city + ', ' + res.country;

       // fetch('https://api.ipgeolocation.io/timezone?apiKey=c8eff193453a414daf64eca681ff993e&ip=' + res.query)
       //   .then(res => res.json())
       //   .then(res => {
       //     currentTime.textContent = res.time_24.slice(0, 5);
       //   })
       //   .catch(err => console.log(err))
     })
     .catch(err => console.log(err))
 }
 getLocation();

const getCurrentTime = () => {
  const today = new Date();
  currentTime.textContent  = today.getHours() + ":" +  (today.getMinutes()<10?'0':'') + today.getMinutes() + ":" +today.getSeconds();
}
getCurrentTime();

setInterval(function(){
  getCurrentTime();
}, 1000);



 searchForm.addEventListener('submit', ($event) => {
   $event.preventDefault();
   if(placeInput.value.toLowerCase() === "lagos"){
     placeInput.value = "lagos, nigeria";
   }

   var request_url = api_url
     + '?'
     + 'key=' + apikey
     + '&q=' + placeInput.value
     + '&pretty=1';
     // + '&no_annotations=1';

     var getTime =  () => {
       fetch(request_url)
         .then(res => res.json())
         .then(response => {
           // console.log(response.results[0].annotations.timezone.name);
           var text = response.results[0].annotations.timezone.name;
           fetch('https://api.ipgeolocation.io/timezone?apiKey=c8eff193453a414daf64eca681ff993e&tz=' + text)
             .then(res => res.json())
             .then(res => result.textContent = "Time in " + placeInput.value + " is " + res.time_24.slice(0, 5) + " | " + res.date )
             .catch(err => console.log(err))
         }
       )
       .catch(err => console.log(err))

     };

     getTime();


 });
