// Myanmar Recording Studio - Recording JavaScript

let mediaRecorder = null;
let audioChunks = [];
let audioBlob = null;

// DOM Elements
const recordBtn = document.getElementById('recordBtn');
const stopBtn = document.getElementById('stopBtn');
const audioPreview = document.getElementById('audioPreview');
const audioPlayer = document.getElementById('audioPlayer');
const audioFile = document.getElementById('audioFile');
const submitBtn = document.getElementById('submitBtn');
const retryBtn = document.getElementById('retryBtn');
const errorMessage = document.getElementById('errorMessage');

// Initialize recording
recordBtn.addEventListener('click', startRecording);
stopBtn.addEventListener('click', stopRecording);
submitBtn.addEventListener('click', submitRecording);
retryBtn.addEventListener('click', retryRecording);

// Handle form submission via AJAX
function submitRecording() {
    if (!audioBlob) {
        showError('အသံဖမ်းမှတ်တမ်းမရှိပါတယ်။');
        return;
    }
    
    const formData = new FormData();
    formData.append('language', language);
    formData.append('promptGroup', promptGroup);
    formData.append('promptId', promptId);
    formData.append('text', text);
    formData.append('format', 'webm');
    formData.append('audio', audioBlob, 'recording.webm');
    
    fetch('/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.done) {
            window.location.href = '/done.html';
        } else {
            // Load next prompt
            window.location.href = `/record?language=${language}`;
        }
    })
    .catch(error => {
        showError('ပါးစုလုပ်ရန် မအောင်မြင်ပါတယ်။ ပြန်လုပ်ပါ။');
        console.error('Error:', error);
    });
}

function retryRecording() {
    audioBlob = null;
    audioChunks = [];
    audioPreview.style.display = 'none';
    audioPlayer.src = '';
    recordBtn.disabled = false;
    stopBtn.disabled = true;
    hideError();
}

async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'audio/webm;codecs=opus'
        });
        
        audioChunks = [];
        
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunks.push(event.data);
            }
        };
        
        mediaRecorder.onstop = () => {
            audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(audioBlob);
            audioPlayer.src = audioUrl;
            audioPreview.style.display = 'block';
            
            // Stop all tracks
            stream.getTracks().forEach(track => track.stop());
        };
        
        mediaRecorder.start();
        
        recordBtn.disabled = true;
        stopBtn.disabled = false;
        recordBtn.classList.add('recording');
        hideError();
        
    } catch (error) {
        showError('အသံဖမ်းလုပ်ရန် မအောင်မြင်ပါတယ်။ မိုက်ကုဖုန်း ခွင့်ပါးသောက်ပါ။');
        console.error('Error accessing microphone:', error);
    }
}

function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        recordBtn.classList.remove('recording');
    }
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function hideError() {
    errorMessage.style.display = 'none';
}