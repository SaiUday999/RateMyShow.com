// Initialize Firebase (using your provided configuration)
const firebaseConfig = {
    apiKey: "AIzaSyBWSl-N_naw3gMmFudD6yQsiosyRs4UZUM",
    authDomain: "dtm-2dd23.firebaseapp.com",
    databaseURL: "https://dtm-2dd23-default-rtdb.firebaseio.com",
    projectId: "dtm-2dd23",
    storageBucket: "dtm-2dd23.appspot.com",
    messagingSenderId: "1020650368885",
    appId: "1:1020650368885:web:8edae36514624416372d3c"
};

firebase.initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = firebase.storage();
const storageRef = storage.ref().child('USER Storage');

document.addEventListener('DOMContentLoaded', function () {
    const feedbackTextarea = document.getElementById('feedback-text');
    const charCountElement = document.querySelector('.char-count');

    feedbackTextarea.addEventListener('input', function () {
        const maxLength = parseInt(feedbackTextarea.getAttribute('maxlength'));
        const currentLength = feedbackTextarea.value.length;
        const charactersLeft = maxLength - currentLength;
        charCountElement.textContent = `Characters left: ${charactersLeft}`;
    });

    const ratingNumberBoxes = document.querySelectorAll('.number-box');
    ratingNumberBoxes.forEach(box => {
        box.addEventListener('click', function () {
            const ratingValue = parseInt(this.getAttribute('data-value'));
            updateRatingBar(ratingValue);
        });
    });

    function updateRatingBar(rating) {
        const filled = document.querySelector('.rating-bar .filled');
        const width = rating * 10 + '%';
        filled.style.width = width;
        document.getElementById('ratingInfo').textContent = `Rating: ${rating}/10`;
    }

    const cameraIcon = document.querySelector('.camera-icon');
    const videoContainer = document.createElement('div');
    document.body.append(videoContainer);

    let isCameraRecording = false;

    cameraIcon.addEventListener('click', () => {
        if (isCameraRecording) {
            stopCameraRecording();
        } else {
            startCameraRecording();
        }
        isCameraRecording = !isCameraRecording;
    });

    function startCameraRecording() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                let video = document.createElement('video');
                video.srcObject = stream;
                video.play();
                videoContainer.appendChild(video);
            })
            .catch(error => {
                console.error('Error accessing camera:', error);
            });
    }

    function stopCameraRecording() {
        let video = videoContainer.querySelector('video');
        let stream = video.srcObject;
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;

        video.toBlob((blob) => {
            createVideoPreview(blob);
            uploadVideo(blob);
        });

        videoContainer.removeChild(video);
    }

    function createVideoPreview(blob) {
        const fileName = Date.now() + '.webm'; // generate a unique file name
        const videoRef = storageRef.child(fileName); // create a reference to the video file

        let preview = document.createElement('video');
        preview.src = URL.createObjectURL(blob);
        preview.controls = true;
        preview.width = 200;
        videoContainer.appendChild(preview);

        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = '&#x1F5D1;'; // Unicode for delete icon
        deleteButton.addEventListener('click', function () {
            videoContainer.removeChild(preview);
            videoContainer.removeChild(deleteButton);
            // Optionally delete from Firebase Storage: videoRef.delete().then(...).catch(...);
        });
        videoContainer.appendChild(deleteButton);
    }

    function uploadVideo(blob) {
        const fileName = Date.now() + '.webm'; // generate a unique file name
        const videoRef = storageRef.child(fileName); // create a reference to the video file

        // Upload the video to Firebase Storage
        videoRef.put(blob).then(snapshot => {
            console.log('Uploaded video successfully:', snapshot);

            // Get the download URL of the video
            videoRef.getDownloadURL().then(url => {
                console.log('Video download URL:', url);
            }).catch(error => {
                console.error('Error getting video download URL:', error);
            });
        }).catch(error => {
            console.error('Error uploading video:', error);
        });
    }

    // Microphone Functionality (similar structure)
    const voiceIcon = document.querySelector('.voice-icon');
    const audioContainer = document.createElement('div');
    document.body.append(audioContainer);

    let isMicRecording = false;
    let mediaRecorder;

    voiceIcon.addEventListener('click', () => {
        if (isMicRecording) {
            stopMicRecording();
        } else {
            startMicRecording();
        }
        isMicRecording = !isMicRecording;
    });

    function startMicRecording() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();

                mediaRecorder.ondataavailable = (e) => {
                    createAudioPreview(e.data);
                    uploadAudio(e.data);
                }
            })
            .catch(error => {
                console.error('Error accessing microphone:', error);
            });
    }

    function stopMicRecording() {
        mediaRecorder.stop();
    }

    function createAudioPreview(blob) {
        const fileName = Date.now() + '.webm'; // generate a unique file name
        const audioRef = storageRef.child(fileName); // create a reference to the audio file

        const audioUrl = URL.createObjectURL(blob);
        let preview = document.createElement('audio');
        preview.src = audioUrl;
        preview.controls = true;
        audioContainer.appendChild(preview);

        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = '&#x1F5D1;'; // Unicode for delete icon
        deleteButton.addEventListener('click', function () {
            audioContainer.removeChild(preview);
            audioContainer.removeChild(deleteButton);
        });
        audioContainer.appendChild(deleteButton);
    }

    function uploadAudio(blob) {
        const fileName = Date.now() + '.webm'; // generate a unique file name
        const audioRef = storageRef.child(fileName); // create a reference to the audio file

        // Upload the audio to Firebase Storage
        audioRef.put(blob).then(snapshot => {
            console.log('Uploaded audio successfully:', snapshot);

            // Get the download URL of the audio
            audioRef.getDownloadURL().then(url => {
                console.log('Audio download URL:', url);
            }).catch(error => {
                console.error('Error getting audio download URL:', error);
            });
        }).catch(error => {
            console.error('Error uploading audio:', error);
        });
    }
});