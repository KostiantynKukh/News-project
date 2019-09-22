class APIService {
    constructor(){
        this._baseURL = "https://newsapi.org/v2/top-headlines?country=";
        this._apiKey = "&apiKey=18f1c87e444741aca30db0a569bba999";
    }


   async getNews(country){
    const data = await fetch(`${this._baseURL}${country}${this._apiKey}`);

    if(!data.ok){
        throw new Error("Could not fatch data from API");
    }
    else{
     return await data.json();
    }
  }

  CreateContent(articles){
    var mainCols = document.getElementsByClassName("main-cols");
    for(var i=0;i<mainCols.length;i++){
      if(mainCols[i].hasChildNodes()){
        while(mainCols[i].hasChildNodes()){
          mainCols[i].firstElementChild.remove();
        }
      } 
    }
    for(var i=0;i<mainCols.length;i++){               
        for(var j=0;j<articles.length;j++){                                
            var div = document.createElement("div");
            var h3 = document.createElement("h5");
            var img = document.createElement("img");
            var a = document.createElement("a");
            a.setAttribute("href", articles[j].url);
            a.setAttribute("target","blank"),
            div.classList.add("hoverEffect");
            div.style.position = "relative";
            if(articles[j].urlToImage==null){
              div.style.height = "100px";
            }
            else{            
            img.src = articles[j].urlToImage;
            img.style.width = "100%";
            } 
            h3.classList.add("title");
            h3.innerHTML = articles[j].title;
            a.prepend(img);          
            a.append(h3);
            div.append(a);            
            mainCols[i].append(div);
            if(j==9){i=1};
        }          
    }   
}

}
window.addEventListener("load", StartApi("ua"));
function StartApi(country){
let api = new APIService();
  api.getNews(country)
  .then(({articles}) => {
    api.CreateContent(articles);       
  })
  .catch(err => console.log(err.message));
}

 var countries = document.getElementsByClassName("country");
  for(i=0;i<countries.length;i++){  
    countries[i].onclick = function(){      
        StartApi(this.id);
      }
  }
    

 