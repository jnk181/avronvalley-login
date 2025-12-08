# Avron Valley
![alt text](https://raw.githubusercontent.com/jnk181/avronvalley-login/refs/heads/main/screenshot.webp)
This login theme was inspired by @ByDrexel's Windows Avron concept: https://x.com/ByDrexel/status/1914076393391992980

# Installation
## Any
* Install `lightdm` and `web-greeter`
** Arch Linux: Official repos -> `lightdm`, AUR -> `web-greeter`
* Set `web-greeter` as the greeter in `/etc/lightdm/lightdm.conf`
* Download this repository as a .zip and extract it to a new folder named "AvronValley"
* Copy `./AvronValley` to `/usr/share/web-greeter/themes/` with `sudo cp -r AvronValley /usr/share/web-greeter/themes`
* Set the `web-greeter` theme to `AvronValley` in `/etc/lightdm/web-greeter.yml`

# Notes
- To make the weather work, you must make a `weather_config.js` file and provide location data and you must turn off `secure_mode` in `/etc/lightdm/webgreeter.yml`

# To-do
