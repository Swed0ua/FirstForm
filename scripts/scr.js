"use strict"


document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById("form");
    form.addEventListener('submit', formSend);

    async function formSend (e) {
        e.preventDefault();

        let error = formValidate(form);


        let formData = new FormData(form);
        formData.append('image', formImage.files[0]);

        if (error === 0) {
            form.classList.add('_sending');
            let response =  await fetch('sendmail.php', {
                method : 'POST',
                body : formData
            })
            if (response.ok){
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = "";
                form.reset();

            } else {
                alert('Error');
                form.classList.remove('_sending');

            }
        } else {
             alert('заповніть всі поля')
             }
    }


    function formValidate(form){
        let error = 0;
        let formRequire = document.querySelectorAll('._req');

        for (let i = 0;  i < formRequire.length; i++){
            const input = formRequire[i];
            
            toFormDellClassErr(input);
            

            if (input.classList.contains('_req')){
                if (emailTest(input) == false && input.classList.contains('_email')){
                    toFormAddClassErr(input);  
                    error++;
                } else if (input.getAttribute('type') === "checkbox" && input.checked === false){
                    toFormAddClassErr(input);  
                    error++;
                }else{
                    if (input.value === ""){
                        toFormAddClassErr(input);  
                    error++;
                    }
                }
            }
        }



        function toFormAddClassErr (input){
            input.parentElement.classList.add('_ERROR');
            input.classList.add('_ERROR');
        }
        function toFormDellClassErr (input) {
            input.parentElement.classList.remove('_ERROR');
            input.classList.remove('_ERROR');
        }


        function emailTest(input) {
            const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            return re.test(input.value);
            
        } console.log(error)
        return error;
    }

    let formPreview = document.querySelector('.file__preview');
    let formImage = document.querySelector('#formImage');

    formImage.addEventListener('change', () => {
        upLoadFile( formImage.files[0]);
    })

    function upLoadFile(file) {
        if(!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)){
            alert('Виберіть фото з підтримуючими розширеннями!!!!')
            return;
        }
        
        if(file.size > 2*1024*1024){
            alert('Фото маэ бути не більше 2МБ ')
            return;
        }

        var reader = new FileReader();

        reader.onload = function (e) {
            formPreview.innerHTML = `<img src="${e.target.result}" alt = "Photo" >`;
        }
        reader.onerror = function (e) {
            formPreview.innerHTML = 'Error';
        }
        reader.readAsDataURL(file);
    }
   
    setTimeout(tep, 0);

})


function tep(){
    const checkbox = document.getElementById('formCheckbox');
    const buttonMain = document.querySelector('.form_MainBut');
    if (checkbox.checked === false){
        buttonMain.classList.add('button__inactive');
        buttonMain.disabled = true;
    } else {
        buttonMain.classList.remove('button__inactive');
        buttonMain.disabled = false;
    }
}