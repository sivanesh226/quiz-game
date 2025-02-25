export class manageExams {
    notify
    categories
    displayData = {}
    categoryId
    subCategoryId
    constructor(notification) {
        this.notify = new notification
        this.onInit()
    }
    onInit() {
        this.getCategories()
        let subCategory = document.getElementById('sub-category')
        subCategory.addEventListener('change', (event) => {
            this.subCategoryId = event.target.value;
            document.getElementById('question-section').innerHTML = '';
            this.getQuestions()
        });
    }
    getCategories() {
        fetch('Controller/category.php?action=view', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.storage.userData.token },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    this.categories = data.result
                    console.log(this.categories)
                    // this.notify.showNotification("Login Successfully ", "success")s
                    this.categoryId = this.categories[0].id
                    this.subCategoryId = this.categories[0].subcategories[0].id
                    this.setCategory()
                    this.setSubCategory(this.categories[0])
                    this.getQuestions()

                } else {
                    this.notify.showNotification(data.message, "danger")
                }
            }).catch(err => {
                this.notify.showNotification('Error: ' + err, 'danger')
            });
    }

    setCategory() {
        // let catagory = [{ mainCatagoryName: "General Knowledge", subCatagory: [{ subCatagoryName: 'History', subCatagoryId: 1 }, { subCatagoryName: 'Money', subCatagoryId: 2 }, { subCatagoryName: 'Earth', subCatagoryId: 3 }] }]
        console.log(this.categories)
        let mCategory = document.getElementById('m-category')
        this.categories.forEach(mcat => {
            let option = document.createElement("option");
            option.value = mcat.id;
            option.text = mcat.category_name
            mCategory.appendChild(option)

        })
        mCategory.addEventListener('change', (event) => {
            this.categoryId = event.target.value;
            const selectedCategory = this.categories.find(mcat => mcat.id == this.categoryId);
            this.setSubCategory(selectedCategory);
            document.getElementById('question-section').innerHTML = ''
        });
    }
    setSubCategory(category) {
        let subCategory = document.getElementById('sub-category')
        subCategory.innerHTML = ''

        category.subcategories.forEach(subCat => {
            let opt = document.createElement("option");
            opt.value = subCat.id;
            opt.text = subCat.sub_category_name
            subCategory.appendChild(opt)
        })

    }
    getQuestions() {
        fetch(`Controller/questions.php?action=admin_view_question&category_id=${this.categoryId}&subcategory_id=${this.subCategoryId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.storage.userData.token },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    document.getElementById('no-questions').style.display = 'none'
                    data.result.questions.forEach(row => { row['isEdit'] = false; row['isNew'] = false })
                    this.questionsData = structuredClone(data.result);
                    this.displayData = data.result
                    this.setQuestions()

                } else {
                    document.getElementById('no-questions').style.display = 'flex'
                    this.notify.showNotification(data.message, "danger")
                }
            });

    }
    setQuestions() {
        document.getElementById('question-section').innerHTML = '';

        if (this.displayData && this.displayData.questions.length) {
            document.getElementById('no-questions').style.display = 'none'
            let questionTemplate = ''
            this.displayData.questions.forEach((row, i) => {
                let optionsTemplate = ''
                row.options.forEach((opt, oi) => {
                    optionsTemplate += `         
                    <div class="d-flex mt-2 opt">
                        <input onclick="manageExams.updateAnswers(${i},${oi})" id="opt${i}${oi}" type="radio" name="option${i}" class="option${i}" ${opt.option_name === row.correct_option ? 'checked' : ''} ${row.isEdit ? '' : 'disabled'} >&nbsp;&nbsp;&nbsp;
                        ${row.isEdit ?
                            `<input type="text" id="input-opt${i}${oi}" value="${opt.option_value}" onkeyup="manageExams.updateAnswers(${i},${oi})" >` :
                            `<label for="opt${i}${oi}">${opt.option_name})${opt.option_value}</label>`
                        }
                    </div>`
                })

                questionTemplate += `
                    <div class="question-set mt-3">
                        <div class="d-flex justify-content-between">
                            <label class="text-primary" style="font-size: 17px; font-weight: 500;">Question ${i + 1}</label>`
                if (row.isEdit) {
                    questionTemplate += `
                         <div class="px-3">
                          <button class="btn pe-2" onclick="manageExams.updateQuestion(${i})"><i class="bi bi-check-lg text-success"></i></button>
                            <button class="btn pe-2" onclick="manageExams.deleteQuestion(${i})"><i class="bi bi-trash text-danger"></i></button>
                             ${row['isNew'] ? '' : `<button class="btn" onclick="manageExams.editQuestion(${i},'cancel')"><i class="bi bi-x-lg"></i></button>`}
                        </div>`
                }
                else {
                    questionTemplate += `
                        <div class="px-3">
                            <button class="btn" onclick="manageExams.editQuestion(${i},'edit')"><i class="bi bi-pencil-fill"></i></button>
                        </div>`
                }

                questionTemplate += `
                        </div>
                        <div class="p-4" style="font-size: 17px;">
                            <div class="question"> ${row['isEdit'] ? `<textarea class="form-control" id="question-textarea" onkeyup="manageExams.updateAnswers(${i},-1)">${row.question_text}</textarea>` : row.question_text}
                        </div>
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
    }
    editQuestion(index, type) {
        if (type == 'edit') {
            this.displayData.questions[index].isEdit = true
            this.setQuestions()
        }
        else {
            this.questionsData.questions[index].isEdit = false
            this.displayData.questions[index] = this.questionsData.questions[index]
            this.setQuestions()
        }
    }
    updateAnswers(qnIndex, optIndex) {

        this.displayData.questions[qnIndex].question_text = document.getElementById('question-textarea').value
        if (optIndex != -1) {
            console.log(document.getElementById(`input-opt${qnIndex}${optIndex}`).value)
            this.displayData.questions[qnIndex].options[optIndex].option_value = document.getElementById(`input-opt${qnIndex}${optIndex}`).value
            this.displayData.questions[qnIndex].correct_option = this.displayData.questions[qnIndex].options[optIndex].option_name
        }
        console.log(this.displayData, this.questionsData)

    }
    addNewQuestion() {
        let template = {}
        template = {
            "id": null,
            "question_text": "",
            "isEdit": true,
            "isNew": true,
            "options": [
                {
                    "option_name": "A",
                    "option_value": ""
                },
                {
                    "option_name": "B",
                    "option_value": ""
                },
                {
                    "option_name": "C",
                    "option_value": ""
                },
                {
                    "option_name": "D",
                    "option_value": ""
                }
            ],
            "correct_option": "",
        }
        if (!this.displayData.hasOwnProperty('questions')) {
            // template = { questions: [template] }
            this.displayData['questions'] = []
        }
        console.log(template)
        this.displayData['questions'].push(template)
        this.setQuestions()
    }
    deleteQuestion(index) {
        if (this.displayData.questions[index].isNew)
            this.displayData.questions.splice(index, 1)
        else {
            fetch(`Controller/questions.php?action=delete_question`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.storage.userData.token },
                body: JSON.stringify({ id: this.displayData.questions[index].id })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status) {
                        this.displayData.questions.splice(index, 1)
                        this.questionsData.questions.splice(index, 1)
                        this.setQuestions()
                        this.notify.showNotification("Question Deleted", "danger")
                    } else {
                        this.notify.showNotification(data.message, "danger")
                    }
                });
        }
        this.setQuestions()
    }
    updateQuestion(index) {
        if (
            this.displayData.questions[index].question_text != '' &&
            this.displayData.questions[index].options[0].option_value != '' &&
            this.displayData.questions[index].options[1].option_value != '' &&
            this.displayData.questions[index].options[2].option_value != '' &&
            this.displayData.questions[index].options[3].option_value != ''
        ) {
            let payload = {
                category_id: this.categoryId,
                subcategory_id: this.subCategoryId,
                id: this.displayData.questions[index].id,
                question_text: this.displayData.questions[index].question_text,
                option_a: this.displayData.questions[index].options[0].option_value,
                option_b: this.displayData.questions[index].options[1].option_value,
                option_c: this.displayData.questions[index].options[2].option_value,
                option_d: this.displayData.questions[index].options[3].option_value,
                correct_option: this.displayData.questions[index].correct_option
            }

            let reqType = this.displayData.questions[index].isNew ? 'insert_question' : 'update_question'
            fetch(`Controller/questions.php?action=${reqType}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.storage.userData.token },
                body: JSON.stringify(payload)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status) {
                        this.notify.showNotification(this.displayData.questions[index].isNew ? "Questions Successfully Added" : "Question Updated Successfully", "success")
                        this.displayData.questions[index].id = data.result.id
                        this.displayData.questions[index]['isEdit'] = false
                        this.displayData.questions[index]['isNew'] = false
                        this.questionsData.questions.push(this.displayData.questions[index])

                        // this.questionsData.questions[index] = this.displayData.questions[index]
                        this.setQuestions()
                    } else {
                        this.notify.showNotification(data.message, "danger")
                    }
                });
        }
        else {
            this.notify.showNotification("Please fill all field before submit", "warn")
        }
    }
}
