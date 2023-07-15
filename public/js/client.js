const ws = new WebSocket('ws://localhost:5000');

// Connect to the server via WebSocket
ws.addEventListener('open', () => {
  console.log('Connected to server');
});

// Handle face recognition results received from the server
ws.addEventListener('message', (event) => {
  const results = JSON.parse(event.data);
  console.log('Face recognition results:', results);
  // Handle the results as needed (e.g., display a message, update UI)
});

// Use Face-API.js to detect and recognize faces in the video stream
const videoPlayer = document.getElementById('videoPlayer');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Load the face detection model
faceapi.nets.tinyFaceDetector.loadFromUri('/models')
  .then(() => {
    // Start the face detection process
    startFaceDetection();
  })
  .catch((error) => {
    console.error('Error loading face detection model:', error);
  });

function startFaceDetection() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      videoPlayer.srcObject = stream;
      videoPlayer.addEventListener('play', () => {
        const videoWidth = videoPlayer.videoWidth;
        const videoHeight = videoPlayer.videoHeight;
        canvas.width = videoWidth;
        canvas.height = videoHeight;

        // Define a recursive function to continuously detect faces
        function detectFaces() {
          ctx.drawImage(videoPlayer, 0, 0, videoWidth, videoHeight);

          faceapi.detectAllFaces(canvas, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptors()
            .then((detections) => {
              if (detections.length > 0) {
                const faceDescriptors = detections.map((detection) => Array.from(detection.descriptor));
                ws.send(JSON.stringify(faceDescriptors));
              }
            })
            .catch((error) => {
              console.error('Error detecting faces:', error);
            })
            .finally(() => {
              // Schedule the next face detection
              requestAnimationFrame(detectFaces);
            });
        }

        // Start the face detection loop
        detectFaces();
      });
    })
    .catch((error) => {
      console.error('Error accessing webcam:', error);
    });
}
