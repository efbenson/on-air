
require('dotenv').config();
console.dir(process.env)
const HomeAssistant = require('homeassistant')
const hass = new HomeAssistant({
    // Your Home Assistant host
    host: process.env.HOME_ASSISTANT_HOST,
   
    // Your Home Assistant port number
    // Optional, defaults to 8123
    port: process.env.HOME_ASSISTANT_PORT,
   
    // Your long lived access token generated on your profile page.
    // Optional
    token: process.env.HOME_ASSISTANT_TOKEN,
   
    // Your Home Assistant Legacy API password
    // Optional
    // password: 'api_password',
   
    // Ignores SSL certificate errors, use with caution
    // Optional, defaults to false
    ignoreCert: process.env.HOME_ASSISTANT_IGNORE_CERT === 'true' ? true : false
  });

  // toggle, turn_off, turn_on, color_name: 'green'

  //zshass.services.list().then((val)=> console.dir(val, {depth: 10}))

async function setBusy() {
  await setState(true, 'red');
}

async function setAvailable() {
  await setState(true, 'green');
}

async function setAway() {
  await setState(false);
}


async function setState(on, color) {
  const action = on ? 'turn_on' : 'turn_off';
  const params = {entity_id: process.env.HOME_ASSISTANT_ENTITY};

  if (on && color && process.env.HOME_ASSISTANT_COLOR) {
    params.color_name = color;
  }

  await hass.services.call(action, 'light', params)
      .catch(err => console.error(err));

}


module.exports = {
  setBusy,
  setAvailable,
  setAway
}