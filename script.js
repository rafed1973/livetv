// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;
function onYouTubePlayerAPIReady() {
    player = new YT.Player('ytplayer', {
      //height: '360',
      width: '100%'//,
      //videoId: 'M7lc1UVf-VE'
  });
}
const channelList = document.querySelector('.list');

const getChannelsList = async () => {
  
  let uri = 'http://localhost:3000/channels';
  const res = await fetch(uri);
  const channels = await res.json();

  let template = '';
  channels.forEach(channel => {
    template += `
    <a href = "${channel.youtubeId}">
    <div class="card" id="${channel.youtubeId}">${channel.name}</div>
    </a>
    `;
  });
  channelList.innerHTML = template;
}

const switchChannel = e => {
  e.preventDefault();
  if (e.target.classList.contains('card')){
    console.log(e.target.id);
    player.loadVideoById(e.target.id, 5, "large");
  }
}

channelList.addEventListener('click', switchChannel);
addEventListener ('DOMContentLoaded', () => getChannelsList ());