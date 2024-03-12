function setDefault() {
  const local_storage_data = window.localStorage.getItem('feedback-form-state')
    ? JSON.parse(window.localStorage.getItem('feedback-form-state'))
    : null;

  const email_input_element = document.querySelector('input[name="email"]');
  email_input_element.value = local_storage_data
    ? local_storage_data.email
    : '';

  const message_input_element = document.querySelector(
    'textarea[name="message"]'
  );
  message_input_element.value = local_storage_data
    ? local_storage_data.message
    : '';
}

function formEvents() {
  const form_element = document.querySelector('.feedback-form');

  form_element.addEventListener('input', event => {
    if (!['email', 'message'].includes(event.target.name)) {
      return;
    }

    const local_storage_data = window.localStorage.getItem(
      'feedback-form-state'
    )
      ? JSON.parse(window.localStorage.getItem('feedback-form-state'))
      : null;
    const email_current = local_storage_data ? local_storage_data.email : '';
    const message_current = local_storage_data
      ? local_storage_data.message
      : '';

    window.localStorage.setItem(
      'feedback-form-state',
      JSON.stringify({
        email:
          event.target.name == 'email'
            ? event.target.value.trim()
            : email_current,
        message:
          event.target.name == 'message'
            ? event.target.value.trim()
            : message_current,
      })
    );
  });

  form_element.addEventListener('submit', event => {
    event.preventDefault();

    for (let form_data_element of event.target.elements) {
      if (!['email', 'message'].includes(form_data_element.name)) {
        continue;
      }

      if (!form_data_element.value.trim().length > 0) {
        alert('All form fields must be filled in');
        return;
      }
    }

    console.log(JSON.parse(window.localStorage.getItem('feedback-form-state')));
    window.localStorage.clear();
    event.target.reset();
  });
}

setDefault();
formEvents();
