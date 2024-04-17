
// object storing the character along with array which have two values  frequency and wrong pressed frequecy
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
  
  

  const data = [];



  // function calculating the accuracy , keypressed and totalKeypressed from the object and updating the values in result
  function  analysis(){

    let totalChar=0;
    let totalKeyPressed=0;
    for (const key in manageChar) {
        if (manageChar.hasOwnProperty(key)) {
           totalChar  += manageChar[key][0];
           totalKeyPressed += manageChar[key][1];
        }
    }
    let accuracyOverall = Math.round((totalKeyPressed/totalChar)*100);
    

    let anaOne = document.querySelector('.analysisOne');
    anaOne.textContent=`${totalChar}`;

    let anaTwo = document.querySelector('.analysisTwo');
    anaTwo.textContent=`${totalKeyPressed}`;

    let anaThree = document.querySelector('.analysisThree');
    anaThree.textContent=`${accuracyOverall}`;

}


// function generating the  accuracy chart which have functionality to sort 

function chartGenerate(){
    
// Iterate over each key-value pair in manageChar
for (const key in manageChar) {
    if (manageChar.hasOwnProperty(key)) {
        const keyFreq = manageChar[key][0];
        const pressedFreq = manageChar[key][1];
        const accuracy = (pressedFreq / keyFreq) * 100;

        // Construct an object with 'letter' and 'frequency' properties
        data.push({ letter: key, frequency: accuracy });
    }
}

// Define color scale based on accuracy thresholds
const colorScale = d3.scaleThreshold()
    .domain([50, 60, 75, 100]) // Define accuracy thresholds
    .range(["red", "#f4e285", "#ffb703", "green"]); // Define corresponding colors

// D3.js code for the dynamic bar chart
// Define the chart dimensions
const width = 640;
const height = 400;
const marginTop = 20;
const marginRight = 0;
const marginBottom = 30;
const marginLeft = 40;

// Create the x-scale
const x = d3.scaleBand()
    .domain(data.map(d => d.letter))
    .range([marginLeft, width - marginRight])
    .padding(0.1);

// Create the y-scale
const y = d3.scaleLinear()
    .domain([0, 100]).nice() // Accuracy ranges from 0 to 100
    .range([height - marginBottom, marginTop]);

// Create the SVG container
const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("style", `max-width: ${width}px; height: auto; font: 10px sans-serif; overflow: visible;`);

// Define a linear gradient with the new colors
const gradient2 = svg.append("defs")
    .append("linearGradient")
    .attr("id", "barGradient2")
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", 0).attr("y1", "100%")
    .attr("x2", 0).attr("y2", 0);
gradient2.append("stop").attr("offset", "0%").attr("stop-color", "#f71e06");
gradient2.append("stop").attr("offset", "50%").attr("stop-color", "#f2e713");
gradient2.append("stop").attr("offset", "100%").attr("stop-color", "#2a8d08");

// Create bars for each data point
const bars = svg.append("g")
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", d => x(d.letter))
    .attr("y", d => y(d.frequency))
    .attr("height", d => y(0) - y(d.frequency))
    .attr("width", x.bandwidth())
    .style("fill", "url(#barGradient2)") // Apply the new gradient fill to each bar
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("rx", 5) // Rounded corner x-radius
    .attr("ry", 5); // Rounded corner y-radius


// Create the x-axis
const xAxis = g => g
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .selectAll("text") // Selecting all text elements of x-axis
    .attr("font-weight", "bolder") // Making text bold
    .attr("font-size", "14px") // Increasing font size
    .attr("color","#FEFCFB")


svg.append("g")
    .attr("class", "x-axis")
    .call(xAxis);

// Create the y-axis
const yAxis = g => g
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).tickFormat((y) => y.toFixed())) // Remove multiplication by 100
    .call(g => g.select(".domain").remove())
    .selectAll("text") // Selecting all text elements of y-axis
    .attr("font-weight", "bolder") // Making text bold
    .attr("font-size", "14px") // Increasing font size
    .attr("color","#FEFCFB");

svg.append("g")
    .call(yAxis);

    document.querySelector(".btn_sort")
.addEventListener('click',function(){
    // Sort data by frequency
    data.sort((a, b) => b.frequency - a.frequency);

    // Update x domain
    x.domain(data.map(d => d.letter));

    // Transition bars
    bars.transition()
        .duration(750)
        .attr("x", d => x(d.letter));

    // Transition x-axis
    svg.select(".x-axis")
        .transition()
        .duration(750)
        .call(xAxis);

})


// Append the chart to the container
document.querySelector(".chart-container").appendChild(svg.node());

}



// function to generate a random character and return the randomly generated character
function randomCharacter() {

    // the character from which a character is picked randomly
    const characters = "abcdefghijklmnopqrstuvwxyz";

    // return a randomly chosen character
    return characters.charAt(Math.floor(Math.random() * characters.length));

}

// function to set random positions to the balls within the ball-container
function randomPositions(ball) {

    // get the width of the ball-container
    const ballContWidth = document.querySelector(".ball-container").offsetWidth;
    
    // get the width of the ball
    const ballWidth = ball.offsetWidth;

    // calculate a random position within the ball-container
    const randomPos = Math.floor((Math.random() * (ballContWidth - 2*ballWidth) + 1 ));
    
    // setting the random postion to ball
    ball.style.left = `${randomPos}px`;
}

// function to create a ball, add required classes, set a random character, random position, and append it to the ball-container
function createBall() {
    
    // Creating a new div element for the ball
    const ball = document.createElement('div');

    // adding the required classes to  give ball it  properites
    ball.classList.add('ball_falling');
    ball.classList.add('ball-falling-animation')

    // calling the function to set the random value to ball
    ball.textContent = randomCharacter();
    let ballVal = ball.textContent;
    manageChar[`${ballVal}`][0]++;

    // calling the function to set the random  position to the ball within the container
    randomPositions(ball);

    // appending the ball to container
    const ballContainer = document.querySelector('.ball-container')
    ballContainer.appendChild(ball);

    // returning the ball
    return ball;
}

// function to create and show a set of balls
function createAndShowBalls(balls) {

    // creating and storing the ball into balls array
    for (let i = 0; i < 4; i++) {
        const ball = createBall(); // calling the function to create a ball
        balls.push(ball);
    }
}

// this function is used to remove existing balls, clear the array, and adding the new balls 
function removeAndUpdateBalls(balls) {
    // Remove each ball from the DOM
    balls.forEach(function(ball){
        ball.remove();
    })

    // Clear the array of balls
    balls.length = 0;
    
    // Calling the function to add new set of balls
    createAndShowBalls(balls);
}


function updateTimer(timeRemaining) {
    const timerContainer = document.querySelector('.timer-container');
    timerContainer.textContent = `${timeRemaining}`;
}




// function creating the structure for displaying the result of game
function displayResultPage() {
    const popupContainer = document.createElement('div');
    popupContainer.classList.add('popup-container');

    const resultPageContent = `
    <div class="result-container">
        
    <div class="head-content">
        <label >Time's Up</label>
    </div>

    <div class="chart-container">

    <button class="btn_sort">
        Sort Data
    </button>
    </div>
    
    <div>
    <video autoplay loop muted id="video-bg">
            <source src="background_content\\background_video.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
    </div>

    <div class="analysis-container">
        <div class="one">
            <div class="analysisOne"></div>
            <h3>Total Characters</h3>
        </div>


        <div class="two">
            <div class="analysisTwo"></div>
            <h3>Key Pressed</h3>
        </div>
        
        <div class="three">
            <div class="analysisThree"></div>
            <h3>Accuracy</h3>
        </div>

    </div>

</div>
    `;

    popupContainer.innerHTML = resultPageContent;
    document.body.appendChild(popupContainer);

}


//displaying the result with transition
function displayResultPageWithTransition() {
    const mainContainer = document.querySelector('.main-container');
    const resultContainer = document.querySelector('.result-container');

    // Hide main-container content smoothly
    mainContainer.style.transition = 'opacity 1s, visibility 1s';
    mainContainer.style.opacity = '0';
    mainContainer.style.visibility = 'hidden';

    // Show result-container content smoothly after a delay
    setTimeout(function() {
        resultContainer.style.transition = 'opacity 1s, visibility 1s';
        resultContainer.style.opacity = '1';
        resultContainer.style.visibility = 'visible';
    }, 1000); // Delay should match the duration of the main-container transition
}




// main function which is leading the other functions
function initializeBalls() {
    let balls = [];
    createAndShowBalls(balls);

    const intervalId = setInterval(function() {
        removeAndUpdateBalls(balls);
    }, 2000);

    const totalDuration = 30000;
    let currentTimeInSeconds = 0;

    const updateTimerInterval = setInterval(function() {
        currentTimeInSeconds += 1;
        const timeRemaining = Math.floor(totalDuration / 1000) - currentTimeInSeconds;

        if (timeRemaining <= 0) {
            clearInterval(intervalId);
            clearInterval(updateTimerInterval);
            displayResultPage();
            displayResultPageWithTransition();
            chartGenerate();
            analysis();
        }

        updateTimer(timeRemaining);
    }, 1000);

    document.addEventListener('keydown', function(e) {
        const pressedKey = e.key.toLowerCase();
        balls.forEach(ball => {
            if (pressedKey === ball.textContent.toLowerCase()) {
                manageChar[pressedKey][1]++;
                ball.remove();
                const pressedKeyElement = document.getElementById(pressedKey.toUpperCase());
                if (pressedKeyElement) {
                    pressedKeyElement.style.backgroundColor = "#F28C28";
                    setTimeout(function() {
                        pressedKeyElement.style.backgroundColor = "#3f3f3f";
                    }, 200);
                }
                balls.splice(balls.indexOf(ball), 1);
            }
        });
    });
}


initializeBalls();

