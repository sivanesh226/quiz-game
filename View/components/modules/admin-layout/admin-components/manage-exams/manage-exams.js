export class manageExams {
    constructor() {
        this.setCategory()

    }

    onInit() {
        setTimeout(() => {
            this.setCategory()

        }, 1000)
    }
    setCategory() {
        let catagory = [{ mainCatagoryName: "General Knowledge", subCatagory: [{ subCatagoryName: 'History', subCatagoryId: 1 }, { subCatagoryName: 'Money', subCatagoryId: 2 }, { subCatagoryName: 'Earth', subCatagoryId: 3 }] }]
        console.log(catagory)
        let mCategory = document.getElementById('m-category')
        let subCategory = document.getElementById('sub-category')
        catagory.forEach(mcat => {
            console.log(mcat.mainCatagoryName)
            let option = document.createElement("option");
            option.value = mcat.mainCatagoryName;
            option.text = mcat.mainCatagoryName
            mCategory.appendChild(option)
            mcat.subCatagory.forEach(subCat => {
                let opt = document.createElement("option");
                opt.value = subCat.subCatagoryId;
                opt.text = subCat.subCatagoryName
                subCategory.appendChild(opt)
            })
        })

    }
}