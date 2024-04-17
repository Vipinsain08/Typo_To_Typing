let data;
let currentIndex = 0;
let cursorSpan;
let timer=0;
let intervalId;


// object storing the character frequency and  wrong typed frequency
const manageChar = {
    'a': [0, 0],
    'b': [0, 0],
    'c': [0, 0],
    'd': [0, 0],
    'e': [0, 0],
    'f': [0, 0],
    'g': [0, 0],
    'h': [0, 0],
    'i': [0, 0],
    'j': [0, 0],
    'k': [0, 0],
    'l': [0, 0],
    'm': [0, 0],
    'n': [0, 0],
    'o': [0, 0],
    'p': [0, 0],
    'q': [0, 0],
    'r': [0, 0],
    's': [0, 0],
    't': [0, 0],
    'u': [0, 0],
    'v': [0, 0],
    'w': [0, 0],
    'x': [0, 0],
    'y': [0, 0],
    'z': [0, 0]
  };
  




// api call to get the random text every time.
async function getMetaphorParagraphs(numberOfSentences) {
    try {
        let apiUrl;
        if (numberOfSentences) {
            apiUrl = `http://metaphorpsum.com/sentences/${numberOfSentences}`;
        } else {
            apiUrl = 'http://metaphorpsum.com/sentences/1';
        }

        const response = await fetch(apiUrl);
        data = await response.text();

        updateDisplay();

    } catch (error) {
        console.error('Error fetching data from Metaphorpsum API:', error.message);
    }
}


// function  updating the value of cursor
function updateDisplay() {

    const before = data.substring(0, currentIndex);
   // console.log(`before content: ${before}`);
    const currentChar = data[currentIndex];
   // console.log(`current character is  : ${currentChar}`);
    const after = data.substring(currentIndex + 1);
   // console.log(`after content: ${after}`);

    const generatedContent = document.querySelector('.generated-content');

    generatedContent.innerHTML = "";

    const beforeSpan = document.createElement("span");
    beforeSpan.textContent = before;
    beforeSpan.style.color='#646669';

     cursorSpan = document.createElement("span");
    cursorSpan.textContent = currentChar;
    cursorSpan.style.borderBottom = "4px solid azure"; // Cursor styling

    const afterSpan = document.createElement("span");
    afterSpan.textContent = after;

    generatedContent.appendChild(beforeSpan);
    generatedContent.appendChild(cursorSpan);
    generatedContent.appendChild(afterSpan);
}



// handling the keypress and storing the values into manageChar
function handleKeyDown(flag,event) {
    let key = event.key;
    
    const expectedChar = data[currentIndex];
    let tempKeyConvsn = expectedChar;
    tempKeyConvsn = tempKeyConvsn.toLowerCase();

    let tempKey = key;
    if(flag)
    {
        key = key.toUpperCase();
    }

    if ( key === expectedChar) {
        currentIndex++;


    if(manageChar.hasOwnProperty(tempKeyConvsn))
     {
        manageChar[`${tempKeyConvsn}`][0]++;
     }

     // stopping the typing when full paragraph is typed or when 60 minutes is completed
        if (timer == 60 || currentIndex == data.length  ) 
        {
            clearInterval(intervalId);
            //alert("Congratulations! You've completed the content.");
            const timerCont= document.querySelector('.timer-container');    
            timerCont.textContent= '0';
            // calling the function to display result
            chartTwo();
            typingInfo();
            pointingGame();
            displayResultPageWithTransition();

            //resetGame();
        } 
        else{

            // if the key typed are correct updating the keyboard
            key = key.toUpperCase();
            const keyPressed = document.getElementById(`${key}`);
            if (keyPressed) {
                keyPressed.style.backgroundColor = "#ddb892";
                if(tempKey === key.toLowerCase())
                {
                    keyPressed.textContent=`${tempKey}`;
                }
                keyPressed.style.color='black';
            }
            setTimeout(function(){
                if(keyPressed){

                    keyPressed.style.backgroundColor = "#3f3f3f";
                    if(tempKey === key.toLowerCase())
                    {
                        keyPressed.textContent=`${key}`;
                    }
                    
                        keyPressed.style.color='whitesmoke';
                }

            },200);
            updateDisplay();
        }
    }
    else{
// if key pressed is wrong then  updating key with red color
        if(manageChar.hasOwnProperty(tempKeyConvsn))
     {
        manageChar[tempKeyConvsn][1]++;
     }
        key = key.toUpperCase();
        const keyPressed = document.getElementById(`${key}`);
        if (keyPressed) {

            keyPressed.style.backgroundColor = "red";
            setTimeout(function(){
                keyPressed.style.backgroundColor = "#3f3f3f";
            },200);
        }
        
        let tempcusorSpan = cursorSpan;
        tempcusorSpan.style.color='red';
    }
    
}





function resetGame() {
    currentIndex = 0;
    getMetaphorParagraphs(5);
}




// driven code which is making the whole code functional
document.addEventListener("DOMContentLoaded", function () {
    //getMetaphorParagraphs(10);
    getMetaphorParagraphs(8);
    
    // increasing the timer value until we reach to the end
   
       intervalId =  setInterval(manageTimer,1000);

    let flag=false;
    document.addEventListener("keydown", function(e){
        
        if(e.key==='CapsLock')
        {
            flag = (flag)?false:true;
        }
        else{
            handleKeyDown(flag,e);
        }
    });


   

});



// updating the timer value every second
function manageTimer(){
    const timerCont= document.querySelector('.timer-container');    
        timerCont.textContent=`${timer}`;
        timer++;
}



// when result is displayed then send user to game part to increase it speed and accuracy
function pointingGame() {

    const timeInfo =document.createElement('div');
    timeInfo.classList.add('time_info');
    timeInfo.textContent=`Time Taken : ${timer}sec`;

    const practiceInfo = document.createElement('div');
    const practiceInfoContent =`<div class="text_content">
    <h1>Level up your typing with tailored games!</h1>
    <button class ="btn_main" type="button">
    <span>Let's Go</span>
    <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="37" cy="37" r="35.5" stroke="black" stroke-width="3"></circle>
        <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
    </svg>
</button>
  </div>`
  practiceInfo.innerHTML=practiceInfoContent;
  document.body.appendChild(practiceInfo);
   document.body.appendChild(timeInfo);

   const stbtn =document.querySelector('.btn_main');
    stbtn.addEventListener('click',function(){
    window.open('practiceGame.html', '_self');
  })
}

// // Call the function to display the mistake characters
// showMistakes();




// function which help in displaying the result part by giving an transition
function displayResultPageWithTransition() {
    const mainContainer = document.querySelector('.main-container');
    const typingSpeed = document.querySelector('.typing_result_Container');
    const graphContTwo = document.querySelector('.graph_two');
 
   // Hide main-container content smoothly
    mainContainer.style.transition = 'opacity 1s, visibility 1s';
    mainContainer.style.opacity = '0';
    mainContainer.style.visibility = 'hidden';
     

   // Show result-container content smoothly after a delay
    setTimeout(function() {
      typingSpeed.style.transition = 'opacity 1s, visibility 1s';
      typingSpeed.style.opacity = '1';
      typingSpeed.style.visibility = 'visible';

        graphContTwo.style.transition = 'opacity 1s, visibility 1s';
        graphContTwo.style.opacity = '1';
        graphContTwo.style.visibility = 'visible';
    }, 1000); // Delay should match the duration of the main-container transition

}




// function displaying the wrong pressed character chart
function chartTwo(){
    const mistakeData = {
        labels: [],
        datasets: [{
          label: 'Wrong Presses',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          data: []
        }]
      };
  
      // Populate data for the chart
      Object.entries(manageChar).forEach(([char, [total, wrong]]) => {
        if (wrong > total / 4) {
          mistakeData.labels.push(char);
          mistakeData.datasets[0].data.push(wrong);
        }
      });
      
  
      const ctx = document.getElementById('mistakeChart').getContext('2d');
      const mistakeChart = new Chart(ctx, {
        type: 'bar',
        data: mistakeData,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
}



// displaying the  typing speed
function typingInfo() {

  const typing_result_cont = document.createElement('div');
  typing_result_cont.classList.add('typing_result_Container');

  const result =document.createElement('div');
  result.classList.add('typing_result');

  // calculating the typing speed 
    const word = Math.round((currentIndex+1)/5);
    const min = timer/60;
    const typingSpeed = Math.round(word/min);
    const textData = document.createElement('span');
    textData.textContent = `${typingSpeed}wpm`;


    result.appendChild(textData);
 // typing_result_cont.innerHTML= `<h1> Typing Speed </h1>`;
  typing_result_cont.appendChild(result);


  document.body.appendChild(typing_result_cont);
}
