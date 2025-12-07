document.addEventListener('DOMContentLoaded', () => {
    // Function to check answers for exercises
    window.checkAnswer = function(questionId, expectedRadioValue = null) {
        const feedbackElement = document.getElementById(`feedback-${questionId}`);
        feedbackElement.style.display = 'block'; // Show feedback div

        if (questionId.startsWith('q')) { // For fill-in-the-blanks and text areas
            const inputElement = document.getElementById(questionId);
            const userAnswer = inputElement.value.trim().toLowerCase();
            const expectedAnswer = inputElement.dataset.answer.toLowerCase();

            // For translation and write-in, allow some flexibility
            if (questionId === 'q3' || questionId === 'q4' || questionId === 'q5') {
                // Simple check for presence of key phrases or close match
                // This is a basic check; for a real app, more sophisticated NLP might be used
                if (userAnswer.includes(expectedAnswer.split(' ')[0]) && userAnswer.length >= (expectedAnswer.length * 0.7)) {
                    feedbackElement.className = 'exercise-feedback correct';
                    feedbackElement.innerHTML = '✅ Correct! Great job. <br> <strong>Expected Answer:</strong> ' + inputElement.dataset.answer;
                } else {
                    feedbackElement.className = 'exercise-feedback incorrect';
                    feedbackElement.innerHTML = '❌ Incorrect. Keep practicing! <br> <strong>Expected Answer:</strong> ' + inputElement.dataset.answer;
                }
            } else { // For exact fill-in-the-blanks (q1)
                if (userAnswer === expectedAnswer) {
                    feedbackElement.className = 'exercise-feedback correct';
                    feedbackElement.innerHTML = '✅ Correct! Well done.';
                } else {
                    feedbackElement.className = 'exercise-feedback incorrect';
                    feedbackElement.innerHTML = '❌ Incorrect. The correct answer is: ' + inputElement.dataset.answer;
                }
            }
        } else if (questionId === 'q2') { // For the specific radio button example (q2)
            const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);
            if (selectedOption && selectedOption.value === expectedRadioValue) {
                feedbackElement.className = 'exercise-feedback correct';
                feedbackElement.innerHTML = '✅ Correct! That\'s the most suitable option.';
            } else {
                feedbackElement.className = 'exercise-feedback incorrect';
                feedbackElement.innerHTML = '❌ Incorrect. Review the lesson on informal variations. The best option is ' + expectedRadioValue + '.';
            }
        }
    };

    // DabyTalk (Your Interaction) functionality
    const startRecordingBtn = document.getElementById('startRecording');
    const stopRecordingBtn = document.getElementById('stopRecording');
    const transcriptionOutput = document.getElementById('transcriptionOutput');
    const feedbackOutput = document.getElementById('feedbackOutput');
    const recordingStatus = document.getElementById('recordingStatus');
    const emailSummaryBtn = document.getElementById('emailSummary');
    const newConversationBtn = document.getElementById('newConversation');

    if (startRecordingBtn) { // Check if DabyTalk elements exist on the page
        let isRecording = false;

        startRecordingBtn.addEventListener('click', () => {
            if (!isRecording) {
                isRecording = true;
                transcriptionOutput.innerHTML = '🎙️ Recording... Speak now!';
                feedbackOutput.innerHTML = 'DabyTalk is listening...';
                recordingStatus.innerHTML = 'Recording in progress... 🔴';
                startRecordingBtn.disabled = true;
                stopRecordingBtn.disabled = false;
                console.log('Start Recording clicked');
                // In a real application, this would start audio recording
            }
        });

        stopRecordingBtn.addEventListener('click', () => {
            if (isRecording) {
                isRecording = false;
                recordingStatus.innerHTML = 'Recording finished. ✨';
                transcriptionOutput.innerHTML = 'Processing your speech...';
                feedbackOutput.innerHTML = 'DabyTalk is analyzing...';
                startRecordingBtn.disabled = false;
                stopRecordingBtn.disabled = true;
                console.log('Stop Recording clicked');
                // In a real application, this would stop audio recording and send to AI

                // Simulate AI response after a delay
                setTimeout(() => {
                    transcriptionOutput.innerHTML = 'Your Speech (Transcription): "Just a quick heads up, the meeting is at three PM."';
                    feedbackOutput.innerHTML = 'DabyTalk Feedback: "Excellent use of \'just a quick heads-up\'! Your pronunciation of \'three\' was clear. Consider varying your intonation slightly for more natural flow. (Nota: \'Heads-up\' é uma forma concisa de dar um aviso prévio.)"';
                }, 2000);
            }
        });

        emailSummaryBtn.addEventListener('click', () => {
            alert('Email summary functionality would be implemented here!');
            console.log('Email Summary clicked');
        });

        newConversationBtn.addEventListener('click', () => {
            transcriptionOutput.innerHTML = 'Listening...';
            feedbackOutput.innerHTML = 'Awaiting your speech for feedback...';
            recordingStatus.innerHTML = 'Ready to record. ✨';
            startRecordingBtn.disabled = false;
            stopRecordingBtn.disabled = true;
            alert('Starting a new conversation!');
            console.log('New Conversation clicked');
        });

        // Initial state for DabyTalk buttons
        startRecordingBtn.disabled = false;
        stopRecordingBtn.disabled = true;
    }
});
