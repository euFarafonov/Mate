function Contacts(options) {
    let form = document.getElementById(options.id);
    let bday = form.querySelector('input[type="date"]');
    let minAge = options.minAge; //minimum age for registration
    let minPassLen = options.minPassLen; //minimum for password
    let nowDate = '';
    setDate();
    
    form.addEventListener('click', function(event) {
        let target = event.target;
        
        if (target.classList.contains('form_contacts_btn')) {
            event.preventDefault();
            
            if (validate()) {
                alert('Validation passed');
            }
        }
    });
    
    form.addEventListener('focus', function(event) {
        let target = event.target;
        
        if (target.classList.contains('error_field')) {
            delFieldError(target);
        }
        
        if (target.getAttribute('type') == 'radio') {
            let parent = target.parentElement;
            
            if (parent.classList.contains('label_error')) {
                delRadioError(parent);
            }
        }
    }, true);
    
    function validate() {
        let captcha = form.querySelector('input[name="captcha"]').value;
            
        if (captcha != '') {
            return false;
        }
        
        let textFields = form.querySelectorAll('input[type="text"],input[type="email"],input[type="password"]');
        let select = form.querySelector('select');
        let inputDate = form.querySelector('input[type="date"]');
        let inputRadio = form.querySelectorAll('input[type="radio"]:checked');
        
        for (let i = 0, len = textFields.length; i < len; i++) {
            let input = textFields[i];
            
            if (input.value == '') {
                let textError = 'This field is required';
                setFieldError(input, textError);
                return false;
            }
            
            if (input.dataset.validation == 'text') {
                if (input.value.indexOf('\'') != -1) {
                    let textError = 'symbol «\'» is prohibited';
                    setFieldError(input, textError);
                    return false;
                }
                
                if (input.value.indexOf("\"") != -1) {
                    let textError = 'symbol «\"» is prohibited';
                    setFieldError(input, textError);
                    return false;
                }
            }
            if (input.dataset.validation == 'email') {
                let re = /\S+@\S+\.\S+/;
                if (!re.test(input.value)) {
                    let textError = 'Email address is not valid';
                    setFieldError(input, textError);
                    return false;
                }
            }
            
            if (input.dataset.validation == 'pass') {
                if (input.value.length < minPassLen) {
                    let textError = 'Password must be at least ' + minPassLen + ' characters';
                    setFieldError(input, textError);
                    return false;
                }
            }
        }
        
        if ((new Date()).getFullYear() <= (parseInt(inputDate.value) + minAge)) {
            let textError = 'You can not register if you are under ' + minAge + ' years old';
            setFieldError(inputDate, textError);
            return false;
        }
        
        if (inputRadio.length != 1) {
            let inputRadio = form.querySelector('input[type="radio"]');
            let textError = 'You must select one of the options';
            setRadioError(inputRadio, textError);
            return false;
        }
        
        if (select.value == 'none') {
            let textError = 'This field is required';
            setFieldError(select, textError);
            return false;
        }
        
        return true;
    }
    
    function setFieldError(field, text) {
        field.classList.add('error_field');
        
        let parent = field.parentElement;
        let div = document.createElement('div');
        div.textContent = text;
        div.classList.add('text_error');
        parent.appendChild(div);
        
        smoothScroll(parent);
    }
    
    function delFieldError(field) {
        field.classList.remove('error_field');
        
        let parent = field.parentElement;
        let div = field.nextElementSibling;
        parent.removeChild(div);
    }
    
    function setRadioError(field, text) {
        let parent = field.parentElement;
        parent.classList.add('label_error');
        
        let div = document.createElement('div');
        div.textContent = text;
        div.classList.add('text_error');
        parent.appendChild(div);
        
        smoothScroll(parent);
    }
    
    function delRadioError(elem) {
        elem.classList.remove('label_error');
        
        let div = elem.lastElementChild;
        elem.removeChild(div);
    }
    
    function setDate() {
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        
        if (month < 10) month = '0' + month;
        if (day < 10) day = '0' + day;
        
        nowDate = year + "-" + month + "-" + day;
        bday.value = nowDate;
    }
    
    function smoothScroll(elem) {
        let scrolling = setInterval(function() {
            if (window.pageYOffset <= 0) {
                clearInterval(scrolling);
            }
            scrollBy(0, -10);
        }, 10);
    }
}