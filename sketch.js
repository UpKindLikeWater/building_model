async function faceMesh(video){
  this.Model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
  this.detectorConfig = {
  runtime: 'mediapipe',
  solutionPath:' base/node_modules/@mediapipe/face_mesh',
};
  this.detector = await faceLandmarksDetection.createDetector(Model, detectorConfig);
  this.estimationConfig = {flipHorizontal: false};
  this.detect = await detector.estimateFaces(video, estimationConfig);
}

function setup() {
  createCanvas(360, 270);

  // load up your video
  video = createCapture(VIDEO);
  video.size(width, height);
  picture = {'r':0, 'g':0, 'b':0}
  facemesh = faceMesh(picture);
  // facemesh = faceMesh(video);
}

function modelReady() {
  console.log("ready!");
  console.log(facemesh);
  facemesh.detect(gotResults);
}

function gotResults(err, result) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(result)
  detections = result;

  facemesh.detect(gotResults);
}

