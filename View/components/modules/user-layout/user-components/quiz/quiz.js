export class quiz {
    notify
    categoryId
    subCategoryId
    isIncomplete = false
    questionsData = []
    constructor(notification) {
        this.categoryId = window.userDashboard.categoryId;
        this.subCategoryId = window.userDashboard.subCategoryId;
        this.notify = new notification;
        if (this.categoryId && this.subCategoryId) {
            this.getQuestions()
            // this.setQuestions()

        }
        else {
            this.notify.showNotification('Something Went Wrong', 'danger')
        }

    }
    setSizeOfQn() {
        setTimeout(() => {
            let questionSize = document.getElementById('question-container').getBoundingClientRect()
            console.log(questionSize)
            let question = document.getElementsByClassName('question-set')
            for (let i = 0; i < question.length; i++) {
                question[i].style.width = questionSize.width + 'px'
            }
        }, 100)
    }
    setQnNavigation() {
        let navigationPannel = document.getElementById('qn-navigation');
        let navTemplate = ''
        for (let i = 0; i < this.questionsData.questions.length; i++) {
            navTemplate += `<button class="navigation-btn" onclick="quiz.qnNavigateTo(${i})">${i + 1}</button>`
        }
        navigationPannel.innerHTML = navTemplate
    }
    getQuestions() {
        fetch(`Controller/questions.php?action=view_question&category_id=${this.categoryId}&subcategory_id=${this.subCategoryId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.storage.userData.token },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    this.questionsData = data.result
                    console.log(this.questionsData)
                    this.setQuestions()

                } else {
                    this.notify.showNotification(data.message, "danger")
                }
            });

    }
    timerInterval
    startTimer() {
        let duration = this.questionsData.questions.length * 60; // 1 hour in seconds

        // Start countdown
        this.timerInterval = setInterval(() => {
            let hours = Math.floor(duration / 3600);
            let minutes = Math.floor((duration % 3600) / 60);
            let seconds = duration % 60;

            // Format time to HH:MM:SS
            let formattedTime =
                (hours < 10 ? "0" + hours : hours) + ":" +
                (minutes < 10 ? "0" + minutes : minutes) + ":" +
                (seconds < 10 ? "0" + seconds : seconds);

            // Display time in HTML
            document.getElementById("time-left").textContent = formattedTime;

            if (duration <= 0) {
                clearInterval(this.timerInterval);
                alert("Time is up! Submitting the exam.");
                this.finishExam()
            }

            duration--; // Decrease time
        }, 1000);
    }
    switchCount = 0;

    detectTabSwitches() {
        let warning = document.getElementById("warning");
        if (!warning) return; // Prevent errors if element not found

        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                warning.style.display = "block"; // Show warning
                this.notify.showNotification(" Warning: Don't switch tabs!", "warn")
                this.switchCount++;

                console.warn("Tab switched! Count:", this.switchCount);

                if (this.switchCount >= 3) {
                    alert("You have switched tabs too many times! The exam will be submitted.");
                    clearInterval(this.timerInterval);
                    this.isIncomplete = true
                    this.finishExam()
                    // Auto-submit exam logic here
                }
            } else {
                // warning.style.display = "none"; // Hide warning
            }
        });
    }

    setQuestions() {
        if (this.questionsData && this.questionsData.questions.length) {
            console.log('asdadasdsadsa')

            let questionTemplate = ''
            this.questionsData.questions.forEach((row, i) => {
                row['isSelected'] = false
                row['isCorrect'] = false
                let optionsTemplate = ''
                row.options.forEach((opt, oi) => {
                    optionsTemplate += `         
                    <div class="d-flex mt-2 opt" onclick="quiz.updateAnswer(${i},${oi})">
                        <input id="opt${i}${oi}" type="radio" name="option${i}" class="option${i}" >&nbsp;&nbsp;&nbsp;
                        <label for="opt${i}${oi}">${opt.option_name})${opt.option_value}</label>
                    </div>`
                })

                questionTemplate += `
                    <div class="question-set">
                        <label class="text-primary" style="font-size: 17px; font-weight: 500;">Question ${i + 1} of 10</label>
                        <div class="p-4" style="font-size: 17px;">
                            <div class="question"> 1) ${row.question_text}</div>
                            <div class="options p-3">
                   `
                questionTemplate += optionsTemplate
                questionTemplate += `     
                            </div>
                        </div>
                    </div>
            `

            });
            document.getElementById('question-section').innerHTML = questionTemplate;

        }
        this.setSizeOfQn()
        this.setQnNavigation()
        this.qnNavigateTo(0)
        this.startTimer()

        this.detectTabSwitches()
    }
    qnValue = 0
    next(type) {
        type == 'forward' ? this.currentQnIndex += 1 : this.currentQnIndex -= 1
        this.qnNavigateTo(this.currentQnIndex)
    }
    currentQnIndex = 0
    preQnIndex = 0
    qnNavigateTo(index) {
        this.currentQnIndex = index
        let navigateBtn = document.getElementsByClassName('navigation-btn')

        let color = this.questionsData.questions[this.preQnIndex]['isSelected'] ? 'success' : 'danger'
        navigateBtn[this.preQnIndex].style.backgroundColor = `var(--color-${color})`
        navigateBtn[index].style.backgroundColor = 'var(--color-warning)'
        navigateBtn[index].style.color = 'var(--color-white)'


        let questionSize = document.getElementById('question-container').getBoundingClientRect()
        let qusetionPannel = document.getElementById('question-section')
        this.qnValue = questionSize.width * index
        console.log(this.qnValue)
        qusetionPannel.style.transform = `translateX(-${this.qnValue}px)`
        qusetionPannel.style.transition = '.5s';
        this.preQnIndex = index
    }
    updateAnswer(questionIndex, optionIndex) {

        this.questionsData.questions[questionIndex]['isSelected'] = true;
        let selectedOption = this.questionsData.questions[questionIndex].options[optionIndex].option_name;
        let correct_option = this.questionsData.questions[questionIndex].correct_option;
        console.log(selectedOption, correct_option, selectedOption == correct_option)
        this.questionsData.questions[questionIndex]['isCorrect'] = (selectedOption == correct_option) ? true : false;
        console.log(this.questionsData)
        // this.qnNavigateTo(questionIndex) //just To update the color
    }

    finishExam() {
        clearInterval(this.timerInterval);
        console.log(document.getElementById("time-left").textContent)
        let noRightAns = this.questionsData.questions.filter(qn => qn.isCorrect == true).length;
        let percentage = noRightAns / this.questionsData.questions.length * 100;
        let payload = {
            user_id: window.storage.userData.user_id,
            category_id: this.categoryId,
            subcategory_id: this.subCategoryId,
            no_attempt_questions: this.questionsData.questions.filter(qn => qn.isSelected == true).length,
            no_right_answer: noRightAns,
            no_wrong_answer: this.questionsData.questions.filter(qn => qn.isCorrect == false && qn.isSelected == true).length,
            total_marks: this.isIncomplete ? 0 : percentage,
            result_status: this.isIncomplete ? "In-Complete" : percentage >= 50 ? 'Pass' : 'Fail',
            time_duration: document.getElementById("time-left").textContent

        }
        console.log(payload)
        fetch(`Controller/result.php?action=store_result`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.storage.userData.token },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                if (data.status) {

                    this.notify.showNotification('Quiz Finished', "success")

                } else {
                    this.notify.showNotification(data.message, "danger")
                }
            });

    }
}

{/* <div class="question-set">
<label class="text-primary" style="font-size: 17px; font-weight: 500;">Question ${i + 1} of 10</label>
<div class="p-4" style="font-size: 17px;">
    <div class="question"> 1) ${row.question_text}</div>
    <div class="options p-3">
        <div class="d-flex mt-2 opt">
            <input id="opt1${i}" type="radio" name="option${i}" class="option${i}" >&nbsp;&nbsp;&nbsp;
            <label for="opt1${i}">a) Modi</label>
        </div>
        <div class="d-flex mt-2 opt">
            <input id="opt2${i}" type="radio" name="option${i}" class="option${i}" >&nbsp;&nbsp;&nbsp;
            <label for="opt2${i}">b) Hitler</label>
        </div>
        <div class="d-flex mt-2 opt">
            <input id="opt3${i}" type="radio" name="option${i}" class="option${i}" >&nbsp;&nbsp;&nbsp;
            <label for="opt3${i}">c) Trump</label>
        </div>
        <div class="d-flex mt-2 opt">
            <input id="opt4${i}" type="radio" name="option${i}" class="option${i}" >&nbsp;&nbsp;&nbsp;
            <label for="opt4${i}">d) Ronaldo</label>
        </div>
    </div>
</div>
</div> */}