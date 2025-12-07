// mock lighdm for testing
if (typeof lightdm == "undefined") {
  lightdm = {};
  lightdm.hostname = "test-host";
  lightdm.languages = [
    {code: "en_US", name: "English(US)", territory: "USA"},
    {code: "en_UK", name: "English(UK)", territory: "UK"}
  ];
  lightdm.default_language = lightdm.languages[0];
  lightdm.layouts = [
    {
      name: "test",
      short_description: "test description",
      short_description: "really long epic description"
    }
  ];
  lightdm.default_layout = lightdm.layouts[0];
  lightdm.layout = lightdm.layouts[0];
  lightdm.sessions = [
    {key: "key1", name: "session 1", comment: "no comment"},
    {key: "key2", name: "session 2", comment: "no comment"}
  ];

  lightdm.default_session = lightdm.sessions[0];
  lightdm.authentication_user = null;
  lightdm.is_authenticated = false;
  lightdm.can_suspend = true;
  lightdm.can_hibernate = true;
  lightdm.can_restart = true;
  lightdm.can_shutdown = true;

  lightdm.users = [
    {
      username: "clarkk",
      real_name: "Superman",
      display_name: "Clark Kent",
      image: "",
      language: "en_US",
      layout: null,
      session: null,
      logged_in: false
    },
    {
      username: "brucew",
      real_name: "Batman",
      display_name: "Bruce Wayne",
      image: "",
      language: "en_US",
      layout: null,
      session: null,
      logged_in: false
    },
    {
      username: "peterp",
      real_name: "Spiderman",
      display_name: "Peter Parker",
      image: "",
      language: "en_US",
      layout: null,
      session: null,
      logged_in: true
    }
  ];

  lightdm.num_users = lightdm.users.length;
  lightdm.timed_login_delay = 0; //set to a number higher than 0 for timed login simulation
  lightdm.timed_login_user =
    lightdm.timed_login_delay > 0 ? lightdm.users[0] : null;

  lightdm.get_string_property = function() {};
  lightdm.get_integer_property = function() {};
  lightdm.get_boolean_property = function() {};
  lightdm.cancel_timed_login = function() {
    _lightdm_mock_check_argument_length(arguments, 0);
    lightdm._timed_login_cancelled = true;
  };

  var user_currently_being_authenticated="";
  window.lightdm.is_authenticated=false;
  window.lightdm.default_session

  lightdm.authenticate= function(username) {
    console.log(username)
    user_currently_being_authenticated=username;
  }

  window.lightdm.authentication_complete= function() {
		if (window.lightdm.is_authenticated) {
			// Start default session
			// let body = document.getElementById('body');
      document.querySelector(".black-fade").style.transition="opacity 0.15s";
      document.querySelector(".black-fade").style.opacity="1";
      setTimeout(() => {
        let session = window.lightdm.default_session
			  window.lightdm.start_session(session)
      }, "150");
		} else {
      hide_loading_image();
			show_message("Authentication failed!", "error");
      document.querySelector(".userlist-item-selected").click();
		}
	};

  window.lightdm.respond = function(passwd) {

    setTimeout(() => {
      var current_user=lightdm.users.find(item => item.username==`${user_currently_being_authenticated}`)
      console.log(current_user)
      if(current_user.username==passwd) window.lightdm.is_authenticated=true;
      window.lightdm.authentication_complete();
    }, 1500);
  }

  window.lightdm.start_session= function() {
    alert("Starting session. Logging in...");
    document.location.reload(true);
  }

  lightdm.cancel_authentication = function() {
    lightdm._username = null;
  };

  lightdm.suspend = function() {
    alert("System Suspended. Bye Bye");
    document.location.reload(true);
  };

  lightdm.hibernate = function() {
    alert("System Hibernated. Bye Bye");
    document.location.reload(true);
  };

  lightdm.restart = function() {
    alert("System restart. Bye Bye");
    document.location.reload(true);
  };

  lightdm.shutdown = function() {
    alert("System Shutdown. Bye Bye");
    document.location.reload(true);
  };

  if (lightdm.timed_login_delay > 0) {
    setTimeout(function() {
      if (!lightdm._timed_login_cancelled()) timed_login();
    }, lightdm.timed_login_delay);
  }
}

if (typeof theme_utils == "undefined") {
  theme_utils = {
    get_current_localized_time: function() {
      return "2002-08-18 00:05:20";
    }
  };
}

if (typeof theme_utils == "undefined") {
	theme_utils = {
		get_current_localized_time: function(){
			return "2002-08-18 00:05:20";
		}
	}
	
}

function _lightdm_mock_check_argument_length(args, length) {
  if (args.length != length) {
    throw "incorrect number of arguments in function call";
  }
}

function _lightdm_mock_get_user(username) {
  var user = null;
  for (var i = 0; i < lightdm.users.length; ++i) {
    if (lightdm.users[i].username == username) {
      user = lightdm.users[i];
      break;
    }
  }
  return user;
}
