/* eslint-disable */

document.getElementById('copy_date').innerHTML = new Date().getFullYear();

function toggleSpinner(btn, text, show){
  if(show){
    btn.text(text.loading);
    // btn.prepend('<div class="lds-dual-ring"></div>');
    btn.attr('disabled', true);
  }
  else{
    btn.empty();
    btn.text(text.normal);
    btn.attr('disabled', false);
  }
}

//Makes request to login user
const login = async (email, password, btn) =>{
  let text = {normal: 'Login', loading: 'Login in....'};
  toggleSpinner(btn, text, true);
  console.log(email, password);
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password
      }
    });

    if(res.data.status === 'success'){
      console.log('success', 'Logged in successfully!');
      md.showNotification('Success!', 'success', 'thumb_up');
      window.setTimeout(() =>{
        location.assign('/');
      }, 1000);
   }
  } 
  catch (err) {
    md.showNotification(err.response.data.message, 'danger', 'error_outline');
    console.log('error', err.response.data);
    toggleSpinner(btn, text, false);
  }
  
};

//Makes request to submit employment form
const submitEmploymentForm = async (payload, btn) =>{
  let text = {normal: 'Submit Application', loading: 'Submitting Application...'};
  toggleSpinner(btn, text, true);
  try {
    const res = await axios({
      method: 'POST',
      url: `/employment`,
      data: payload
    });

    if(res.data.status === 'success'){
      md.showNotification(`Success! ${res.data.message || ''}`, 'success', 'thumb_up');
      window.setTimeout(() =>{
        location.assign('/');
      }, 1000);
   }
  } 
  catch (err) {
    md.showNotification(err.response.data.message, 'danger', 'error_outline');
    console.log('error', err);
    toggleSpinner(btn, text, false);
  }
  
};

//Makes request to submit agency registration
const submitAgencyRegistration = async (payload, btn) =>{
  let text = {normal: 'Submit', loading: 'Submitting...'};
  toggleSpinner(btn, text, true);
  try {
    const res = await axios({
      method: 'POST',
      url: `/agency`,
      data: payload
    });

    if(res.data.status === 'success'){
      md.showNotification(`${res.data.message}`, 'success', 'thumb_up');
      window.setTimeout(() =>{
        location.assign('/');
      }, 2000);
   }
  } 
  catch (err) {
    md.showNotification(err.response.data.message, 'danger', 'error_outline');
    console.log('error', err);
    toggleSpinner(btn, text, false);
  }
  
};


//Logs out user | Clears cookies
const logout = async() =>{
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout'
    });
    if(res.data.status === 'success'){
      md.showNotification('Logging you out', 'success', 'sentiment_satisfied_alt');
      window.setTimeout(() =>{
        location.assign('/');
      }, 1000); //location.reload(true); //Reload from server
    }
  } 
  catch (err) {
    md.showNotification(err.response.data.message, 'danger', 'error_outline');
  }
}

//Get Form Data
const loginForm = document.querySelector('.form');
const logOutBtn = document.querySelector('#logout_btn');
const loginBtn = $('#btn-login'); //document.querySelector('#btn-login');
const employmentForm = document.querySelector('.employment_form');
const agencyForm = document.querySelector('.agency_form');
const employmentFormSubmit = document.getElementById('employment_form_submit');

let payload = {};
let country;

//returns country and payload
function setPayload(){
  country = document.getElementById('country-select').value;
  const agency = document.getElementById('agency-select').value;
  
    payload = {
    firstName : document.getElementById('firstName').value,
    lastName : document.getElementById('lastName').value,
    address : document.getElementById('address').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    ssn : document.getElementById('ssn').value,
    high_school : document.getElementById('highSchool').value
  }

  if(country === '0'){
    return md.showNotification('Please select a country', 'danger', 'error_outline');
  }
  payload.phone = `${country}${payload.phone[0] === '0'? payload.phone.substring(1): payload.phone}`;

  if(agency === '0'){
    return md.showNotification('Please select an agency', 'danger', 'error_outline');
  }

  payload.agency = agency;
}

if(loginForm){
    loginForm.addEventListener('submit', e =>{
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      login(email, password, loginBtn);
  });
}

if(employmentForm){
    const navReferences = document.getElementById('nav-references');

    navReferences.addEventListener('click', e =>{
      setPayload();
      console.log(payload);
    });

    employmentForm.addEventListener('submit', e =>{
      e.preventDefault();
      navReferences.click();
      console.log(payload);
  });
}

if(employmentFormSubmit){

  const submitBtn = $('#btn-submit');

  let idCard, ssCard, highSchoolCert;
  const idCardLab = $('#lab_id_card').html();
  const ssCardLab = $('#lab_ss_card').html();
  const highSchoolLab = $('#lab_high_school_cert').html();

  console.log(idCardLab);

  $('#id_card').on('change', () =>{ 
    idCard = document.getElementById('id_card').files[0];
    idCard ? $('#lab_id_card').html(idCard.name.slice(0, 15)).css('color', '#222f3e'): $('#lab_id_card').html(idCardLab).css('color', '#d13e3e');
  });

  $('#ss_card').on('change', () =>{
    ssCard = document.getElementById('ss_card').files[0];
    ssCard ? $('#lab_ss_card').html(ssCard.name.slice(0, 15)).css('color', '#222f3e'): $('#lab_ss_card').html(ssCardLab).css('color', '#d13e3e');
  });

  $('#high_school_cert').on('change', () =>{ 
    highSchoolCert = document.getElementById('high_school_cert').files[0];
    highSchoolCert? $('#lab_high_school_cert').html(highSchoolCert.name.slice(0, 15)).css('color', '#222f3e'): $('#lab_high_school_cert').html(highSchoolLab).css('color', '#d13e3e');
  });


  employmentFormSubmit.addEventListener('submit', e =>{

    const country1 = document.getElementById('country-select-1').value;
    const country2 = document.getElementById('country-select-2').value;
    const country3 = document.getElementById('country-select-3').value;

    const phone1 = document.getElementById('ref1_phone').value;
    const phone2 = document.getElementById('ref2_phone').value;
    const phone3 = document.getElementById('ref3_phone').value

    e.preventDefault();

    if(
      !payload.firstName 
      || !payload.lastName 
      || !payload.address 
      || !payload.email 
      || !payload.ssn 
      || !payload.high_school
      || !payload.phone
      || !payload.agency
      || country === '0'
      ){
        return md.showNotification('Your basic info is incomplete, please check and fill in all required fields', 'danger', 'error_outline');
      }

      console.log(country1, country2, country3);

    if(!idCard || !ssCard || !highSchoolCert){
      return md.showNotification('One or more files have\'t been selected', 'danger', 'error_outline');
    }

    if(country1 === '0' || country2 === '0' || country3 === '0'){
      return md.showNotification('Please select all country fields', 'danger', 'error_outline');
    }

    const references = [
      { 
        name: document.getElementById('ref1_name').value,
        phone:`${country1}${phone1[0] === '0'? phone1.substring(1): phone1}` 
      },
      { 
        name: document.getElementById('ref2_name').value,
        phone:`${country2}${phone2[0] === '0'? phone2.substring(1): phone2}`
      },
      { 
        name: document.getElementById('ref3_name').value,
        phone:`${country3}${phone3[0] === '0'? phone3.substring(1): phone3}`
      }
    ];

    payload.references = references;
    console.log(payload);

    const form = new FormData();

    form.append('firstName', payload.firstName); form.append('lastName', payload.lastName);
    form.append('address', payload.address); form.append('email', payload.email);
    form.append('phone', payload.phone); form.append('agency', payload.agency);
    form.append('ssn', payload.ssn); form.append('high_school', payload.high_school);
    form.append('references', JSON.stringify(payload.references)); form.append('id_card', idCard);
    form.append('idCardExpiry', document.getElementById('id_card_expiry').value);
    form.append('ss_card', ssCard); form.append('highSchool_cert', highSchoolCert);

    console.log(Array.from(form.values()));
    
    submitEmploymentForm(form, submitBtn);
  });
}

if(agencyForm){
  const agencyBtn = $('#agency-btn');

  agencyForm.addEventListener('submit', e =>{
    e.preventDefault();
    
    // const country = document.getElementById('country-select').value;

    const payload = {
      email: document.getElementById('agencyEmail').value.trim(),
      name : document.getElementById('agencyName').value,
      location : document.getElementById('agencyLocation').value,
      description : document.getElementById('agencyDesc').value
    }

    // if(country === '0'){
    //   return md.showNotification('Please select a country', 'danger', 'error_outline');
    // }

    // payload.phone = `${country}${payload.phone[0] === '0'? payload.phone.substring(1): payload.phone}`;

    console.log(payload);
    submitAgencyRegistration(payload, agencyBtn);
  });
}

if(logOutBtn){

  //For mobile phones
  $(document).on("touchstart", "#logout_btn", function() {
    logout();
  });

  //For desktop browsers
  logOutBtn.addEventListener('click', () =>{
    logout();
  });
}