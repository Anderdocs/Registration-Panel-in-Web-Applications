document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const showPassword = document.getElementById('showPassword');
    const submitButton = document.getElementById('submitButton');

    // Регулярні вирази для валідації
    const nameRegex = /^[A-ZА-Я][a-zа-яA-ZА-Я]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    const validateField = (input, regex, errorMessage) => {
        const errorSpan = input.nextElementSibling;
        if (!regex.test(input.value.trim())) {
            input.classList.add('invalid');
            input.classList.remove('valid');
            errorSpan.textContent = errorMessage;
            errorSpan.style.display = 'block';
            return false;
        } else {
            input.classList.add('valid');
            input.classList.remove('invalid');
            errorSpan.style.display = 'none';
            return true;
        }
    };

    const validateForm = () => {
        const isFirstNameValid = validateField(
            firstName,
            nameRegex,
            "Має починатися з великої літери і містити тільки літери"
        );
        const isLastNameValid = validateField(
            lastName,
            nameRegex,
            "Має починатися з великої літери і містити тільки літери"
        );
        const isEmailValid = validateField(email, emailRegex, "Невірний формат e-mail");
        const isPasswordValid = validateField(
            password,
            passwordRegex,
            "Пароль має бути мінімум 8 символів і містити велику літеру, маленьку літеру, цифру та спеціальний символ"
        );

        submitButton.disabled = !(isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid);
    };

    [firstName, lastName, email, password].forEach((input) => {
        input.addEventListener('input', validateForm);
    });

    showPassword.addEventListener('change', () => {
        password.type = showPassword.checked ? 'text' : 'password';
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!submitButton.disabled) {
            console.log({
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                password: password.value,
            });
            alert("Дані успішно відправлено!");
        }
    });
});
