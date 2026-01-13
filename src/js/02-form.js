const STORAGE_KEY = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');

let formData = {
  email: '',
  message: '',
};

const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    const parsed = JSON.parse(savedData);

    formData = {
      email: parsed.email ?? '',
      message: parsed.message ?? '',
    };

    formEl.elements.email.value = formData.email;
    formEl.elements.message.value = formData.message;
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

formEl.addEventListener('input', event => {
  const { name, value } = event.target;
  if (name !== 'email' && name !== 'message') return;

  formData[name] = value.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

formEl.addEventListener('submit', event => {
  event.preventDefault();

  const email = formData.email.trim();
  const message = formData.message.trim();

  if (!email || !message) {
    alert('Lütfen tüm alanları doldurun!');
    return;
  }

  console.log({ email, message });

  
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  formEl.reset();
});
