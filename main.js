img = "";
status= "";
objects=[];
object_user = "";

function setup(){
    canvas = createCanvas(400, 375);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400, 300);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
}

function draw(){
    image(video, 0, 0, 480, 400);

    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++){

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        
        if(objects[i].label == object_user){
            document.getElementById("status").innerHTML = "Status - " + object_user + " not found";
        }
        else{
            document.getElementById("status").innerHTML = "Status - " + object_user + " not found";
        }

        }

        }
    }

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}