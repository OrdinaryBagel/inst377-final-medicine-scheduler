function Swipe(){
    const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'vertical',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});  
}

async function articles(){
    const newsrq = await fetch(`/NYTnews`);
    const newsjson = await newsrq.json();
    for(let i = 0;i<5;i++){
      article = document.getElementById(`s${i+1}`)
      article.src = newsjson['results'][i]['multimedia'][0]['url']
      article.onclick = function(){window.location.href =newsjson['results'][i]['url'] }
    }
    Swipe()
}

window.onload = articles;