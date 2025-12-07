document.addEventListener('DOMContentLoaded', () => {
    // Function to check answers for fill-in-the-blanks and text areas
    window.checkAnswer = function(questionId, correctAnswer = null) {
        const feedbackElement = document.getElementById(`feedback-${questionId}`);
        feedbackElement.style.display = 'block'; // Show feedback div

        if (questionId.startsWith('q')) { // For fill-in-the-blanks and text areas
            const inputElement = document.getElementById(questionId);
            const userAnswer = inputElement.value.trim().toLowerCase();
            const expectedAnswer = inputElement.dataset.answer.toLowerCase();

            // For translation and write-in, allow some flexibility
            if (questionId === 'q3' || questionId === 'q4' || questionId === 'q5') {
                // Simple check for presence of key phrases or close match
                if (userAnswer.includes(expectedAnswer.split(' ')[0]) && userAnswer.length > (expectedAnswer.length * 0.7)) {
                    feedbackElement.className = 'exercise-feedback correct';
                    feedbackElement.innerHTML = '✅ Correct! Great job. <br> <strong>Expected Answer:</strong> ' + inputElement.dataset.answer;
                } else {
                    feedbackElement.className = 'exercise-feedback incorrect';
                    feedbackElement.innerHTML = '❌ Incorrect. Keep practicing! <br> <strong>Expected Answer:</strong> ' + inputElement.dataset.answer;
                }
            } else { // For exact fill-in-the-blanks
                if (userAnswer === expectedAnswer) {
                    feedbackElement.className = 'exercise-feedback correct';
                    feedbackElement.innerHTML = '✅ Correct! Well done.';
                } else {
                    feedbackElement.className = 'exercise-feedback incorrect';
                    feedbackElement.innerHTML = '❌ Incorrect. The correct answer is: ' + inputElement.dataset.answer;
                }
            }
        } else if (questionId.startsWith('mcq')) { // For multiple choice questions (if added later)
            // This part is a placeholder for future multiple-choice logic
            // For now, we use the q2 example which is handled by a specific checkAnswer call
        } else if (correctAnswer) { // For the specific radio button example (q2)
            const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);
            if (selectedOption && selectedOption.value === correctAnswer) {
                feedbackElement.className = 'exercise-feedback correct';
                feedbackElement.innerHTML = '✅ Correct! That\'s the most suitable option.';
            } else {
                feedbackElement.className = 'exercise-feedback incorrect';
                feedbackElement.innerHTML = '❌ Incorrect. Review the lesson on informal variations.';
            }
        }
    };

    // DabyTalk (Your Interaction) functionality - Placeholder for now
    const startRecordingBtn = document.getElementById('startRecording');
    const stopRecordingBtn = document.getElementById('stopRecording');
    const transcriptionOutput = document.getElementById('transcriptionOutput');
    const feedbackOutput = document.getElementById('feedbackOutput');
    const emailSummaryBtn = document.getElementById('emailSummary');
    const newConversationBtn = document.getElementById('newConversation');

    if (startRecordingBtn) { // Check if DabyTalk elements exist on the page
        startRecordingBtn.addEventListener('click', () => {
            transcriptionOutput.innerHTML = '🎙️ Recording... Speak now!';
            feedbackOutput.innerHTML = 'DabyTalk is listening...';
            // In a real application, this would start audio recording
            console.log('Start Recording clicked');
        });

        stopRecordingBtn.addEventListener('click', () => {
            transcriptionOutput.innerHTML = 'Recording finished. ✨';
            feedbackOutput.innerHTML = 'Processing your speech...';
            // In a real application, this would stop audio recording and send to AI
            console.log('Stop Recording clicked');
            // Simulate AI response
            setTimeout(() => {
                transcriptionOutput.innerHTML = 'Your Speech (Transcription): "Just a quick heads up, the meeting is at three PM."';
                feedbackOutput.innerHTML = 'DabyTalk Feedback: "Excellent use of \'just a quick heads-up\'! Your pronunciation of \'three\' was clear. Consider varying your intonation slightly for more natural flow. (Nota: \'Heads-up\' é uma forma concisa de dar um aviso prévio.)"';
            }, 2000);
        });

        emailSummaryBtn.addEventListener('click', () => {
            alert('Email summary functionality would be implemented here!');
            console.log('Email Summary clicked');
        });

        newConversationBtn.addEventListener('click', () => {
            transcriptionOutput.innerHTML = 'Listening...';
            feedbackOutput.innerHTML = 'Awaiting your speech for feedback...';
            alert('Starting a new conversation!');
            console.log('New Conversation clicked');
        });
    }
});
