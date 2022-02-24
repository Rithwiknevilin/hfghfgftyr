song = "";

function preload(){
    song = loadSound("music.mp3");
}

scoreRightWrist = 0;
scoreLefttWrist = 0;

leftWristX = 0;
leftWristY = 0;

function setup () {
    canvas = createCanvas(600, 500);
    canvas.center();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results){
    if(results.legnth > 0){
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLefttWrist);

        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        console.log(" rightWristX = " + rightWristX + " rightWristY = "+ rightWristY);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.2){ 
        circle(rightWristX,rightWristY,20);
        
        if(rightWristY >0 && rightWristY <= 100)
		{
			document.getElementById("speed").innerHTML = "Speed = 0.5x";		
			song.rate(0.5);
		}


        else if(rightWristY >100&& rightWristY <= 200){
            document.getElementById("speed").innerHTML = "Speed = 1x";		
			song.rate(1);
        }



        else if(rightWristY >200&& rightWristY <= 300){
            document.getElementById("speed").innerHTML = "Speed = 1.5x";		
			song.rate(1.5);
        }


        else if(rightWristY >300&& rightWristY <= 400){
            document.getElementById("speed").innerHTML = "Speed = 2";		
			song.rate(2);
        }


        else if(rightWristY >400){
            document.getElementById("speed").innerHTML = "Speed = 2.5";		
			song.rate(2.5);
        }
    }

    if(scoreleftWrist > 0.2){
        circle(leftWristX)
    }
}