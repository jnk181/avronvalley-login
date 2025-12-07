var show_hidden_users=false;
var hidden_users=["admin","clarkk"];
var use_bing_image_of_the_day=false;
var default_pfp_path="img/default_avatar.png";

/*********************************************************/
	/*               Callbacks for the greeter               */
	/*********************************************************/

  window.show_loading_image = showLoadingAnim;

  window.hide_loading_image = hideLoadingAnim;

  window.hide_caps_indicator = function() {
    //document.querySelector(".icon-capslock").style=""
  }

  window.show_caps_indicator = function() {
    //document.querySelector(".icon-capslock").style="opacity:1;"
  }

  //document.querySelector("#de_choose").value=window.lightdm.default_session
  
	/**
	 * show_message callback.
	 */
	window.show_message = function(text, type) {
		// if (0 === text.length) {
		// 	return;
		// }
		// //console.log(type, text);
    // document.querySelector(".message span").innerHTML=text;
    // document.querySelector(".message").style="top:35px; opacity:1;"
    // setTimeout(() => {
    //   document.querySelector(".message").style=""
    // }, "4000");
	};

	/**
	 * authentication_complete callback.
	 */
	window.authentication_complete = function() {
		if (window.lightdm.is_authenticated) {
			// Start default session
			// let body = document.getElementById('body');
      document.querySelector(".body-overlay").style.transition="opacity 0.15s";
      document.querySelector(".body-overlay").style.opacity="1";
      setTimeout(() => {
        let session = window.lightdm.sessions.find(item => item.key==document.querySelector("#de_choose").value);
			  if(session) window.lightdm.start_session(session.key)
        else window.lightdm.start_session(lightdm.default_session)
      }, "150");
		} else {
      hide_loading_image();
			show_message("Authentication failed!", "error");
      document.querySelector(".user.selected").click();
		}
	};

	/**
	 * autologin_timer_expired callback.
	 */
	function autologin_timer_expired(username) {
		/* Stub.  Does nothing. */
	}

	/*******************************************************************/
	/*                Functions local to this theme                    */
	/*******************************************************************/

	/**
	 * clear_messages
	 */
	function clear_messages() {
		//clear
	}

	/**
	 * Kickoff the authentication process
	 */
	window.start_authentication = function(username) {
		clear_messages();
		window.lightdm.authenticate(username);
	};

	/**
	 * handle the input from the entry field.
	 */
	window.handle_input = function() {
		let entry = document.getElementById("password");
		window.lightdm.respond(entry.value);
	};

	window.addEventListener("GreeterReady", () => {
		window.lightdm.show_message.connect(show_message)
		window.lightdm.authentication_complete.connect(authentication_complete)
		window.lightdm.autologin_timer_expired.connect(autologin_timer_expired)
	});

  var capslock=false;

  document.addEventListener( 'keydown', function( event ) {
    if(event.key=="CapsLock") {
      capslock= (!capslock);
    }
    var caps = (capslock);
    if(caps) {
      show_caps_indicator();
    }
    else {
      hide_caps_indicator();
    }
  });

function initialize_sessions() {
  // const template = document.querySelector("#session_template");
  // const container = session_template.parentElement;

  // container.removeChild(template);

  // for (let session of lightdm.sessions) {
  //   const label = s.querySelector(".session_label");

  //   let s = template.cloneNode(true);

  //   s.id = "session_" + session.key;

  //   let radio = s.querySelector("input");

  //   label.innerHTML = session.name;
  //   radio.value = session.key;

  //   if (session.key === lightdm.default_session.key) {
  //     radio.checked = true;
  //   }

  //   session_container.appendChild(s);
  // }
}

function user_clicked(event) {
  
  if (selected_user !== null) {
    selected_user = null;
    lightdm.cancel_authentication();
  }
  clickUser(event.currentTarget)
  selected_user = event.currentTarget.id;
  start_authentication(event.currentTarget.id);
  console.log(event.currentTarget)
  document.querySelector("#password").value="";
  document.querySelector("#password").focus()
  //document.querySelector(".input-username").innerHTML=event.currentTarget.dataset.displayname;

  //show_message("");
  event.stopPropagation();

  return false;
}


/*
 * set default avatar for user if none is found
 * @param {any} err user to set avatar
 */
function on_image_error(err) {
  err.currentTarget.src = "img/default_avatar.png";
}

function handle_inputkeypress(obj,event) {
  if(obj.id=="password" && event.key === 'Enter') {
    //console.log("Handling input...")
    show_loading_image();
    //obj.parent.submit();
    handle_input();
  }
}

/* Initialization */

function initialize() {
  initializeGUI();
  initialize_users();
  initialize_clock();
  //document.addEventListener("keydown", key_press_handler);

  document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.shiftKey && event.altKey) {
      show_hidden_users=true;
      initialize_users();
    }
    if (event.key==" " && selected_user==null) {
      //console.log( document.querySelector(".userlist-item:not(#user_template)") );
      document.querySelector(".userlist-item:not(#user_template)").click();
    }
  });

  //console.log( document.querySelector(".user-select-item:not(#user_template)") );
  //document.querySelector(".user-select-item:not(#user_template)").click();
}

function fade_out(seconds) {
    document.querySelector(".black-fade").style=`transition: opacity ${seconds}s;`
    //document.querySelector("body").style.transform="scale(0.8) perspective(100px) translateZ(-5px) rotate3d(1, 0, 0, 5deg)";
    document.querySelector("body").style.transform="scale(0.6)";
    document.querySelector(".black-fade").style.opacity="1";
}

function initialize_users() {
  selected_user=null;
  const template = document.querySelector(".user.template");
  const parent = template.parentElement;

  //parent.removeChild(template);

  for (let user of lightdm.users) {

    

    //console.log((user.username))
    if(hidden_users.includes(user.username) && !show_hidden_users) {
      //console.log(user.username + " has been hidden")
      //console.log(hidden_users.includes(user.username))
      continue;
    };
    userNode = template.cloneNode(true);
    userNode.classList.remove("template")
    const image = userNode.querySelectorAll(".user .pfp")[0];
    const name = userNode.querySelectorAll(".user .name")[0];

    name.innerHTML = user.display_name;

    if (user.image) {
      image.querySelector(`.pfp-wrap`).style.backgroundImage = `url(${user.image})`;
      image.querySelector(`.blurred-background-image`).style.backgroundImage = `url(${user.image})`;
    } else {
      image.querySelector(`.pfp-wrap`).style.backgroundImage = `url(${default_pfp_path})`;
      image.querySelector(`.blurred-background-image`).style.backgroundImage = `url(${default_pfp_path})`;
    }

    //console.log(user)
    userNode.id = user.username;
    userNode.dataset.displayname=user.display_name;
    if(user.image.length > 0) userNode.dataset.pfppath=user.image;
    userNode.onclick = user_clicked;
    parent.appendChild(userNode);
  }
  document.querySelector(`.user:not(.template)`).click();
}

function system_reboot() {
  fade_out(0.3);
  setTimeout(() => {
    lightdm.restart();
  }, "300");
}

function system_shutdown() {
  fade_out(0.3);
  setTimeout(() => {
    lightdm.shutdown();
  }, "300");
}


function system_suspend() {
  lightdm.suspend();
}

function updateTime() {
  updateClock();
}

function initialize_clock() {
  //const time = document.querySelector("#time");

  //time.innerHTML = theme_utils.get_current_localized_time();
  updateTime();
  setInterval(
    () => {
      updateTime()
    },
    1000
  );
}
