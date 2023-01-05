let timeFrame = null;
function searchInputFunc(e){
   console.log(e)
   
}
0

function ClickTimeSeries(evt, timeframes) {
    document.getElementById("INTRADAY").style.backgroundColor="gray";
    document.getElementById("DAILY").style.backgroundColor="gray";
    document.getElementById("WEEKLY").style.backgroundColor="gray";
    document.getElementById("MONTHLY").style.backgroundColor="gray";

    
    document.getElementById(timeframes).style.backgroundColor="red";
    timeFrame = timeframes;
  }

  function submitSearchFunc(){
    
    let searchVal = document.getElementById("inputSearchBox").value;

    if(searchVal != "" && timeFrame != null){
        
       let url = "https://www.alphavantage.co/query?function=TIME_SERIES_"+timeFrame+"&symbol="+searchVal+"&interval="+5+"min&apikey=TTCY25MVPCB3LIJV";
        const data = fetch(url).then((resonse)=>resonse.json())
        .then((data)=>{
          fetchApiData(data,searchVal,timeFrame);
        })
    }else if(searchVal == "" && timeFrame != null){
           alert("Please enter Symbol....");
    }else if(searchVal != "" && timeFrame == null){
      alert("Please Select Time Frame....");
    }else{
      alert("Please Enter Symbol and select Time Frame....");
    }
}
let stockBoxId =1;
function fetchApiData(data,searchVal,timeFrame){
  console.log(data);
  let watchListArea = document.getElementsByClassName("stockArea")[0]
          watchListArea.innerHTML="";
      //  watchListArea.innerHTML= createStockBox(stockBoxId, data, searchVal, timeFrame);
         watchListArea.append(createStockBox(stockBoxId, data, searchVal, timeFrame));
 
}

function createStockBox(stockBoxId, data, searchVal, timeFrame){
    
         let stockBox = document.createElement("p");
          stockBox.setAttribute("class","BtnWatchList");
          stockBox.setAttribute("id","stock"+stockBoxId);
          
         let spanSymbolTxt = document.createElement("span");
           spanSymbolTxt.setAttribute("class","symbolTxt");
         //spanSymbolTxt.innerText=data['Meta Data']['2. Symbol'];
           spanSymbolTxt.innerText=searchVal;
           stockBox.append(spanSymbolTxt);
  
        let spanStockRate = document.createElement("span");
           spanStockRate.setAttribute("class","rateWatchListBox");
           spanStockRate.innerText=123.65;
           stockBox.append(spanStockRate);

        let stockBtnTimeFrame = document.createElement("button");
          stockBtnTimeFrame.setAttribute("class","stockBtnArea");
          stockBtnTimeFrame.innerText=timeFrame; 
          stockBox.append(stockBtnTimeFrame);

        let stockCloseBtn = document.createElement("button");
          stockCloseBtn.setAttribute("class","closeIconeBtn");
          stockCloseBtn.innerHTML = `<i class="fa fa-times" aria-hidden="true"></i>`;
          stockBox.append(stockCloseBtn);

          return stockBox;
        //watchListArea.append(stockBox);
}