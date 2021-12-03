/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const escape = function (str) {
    let p = document.createElement("p");
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
  };

  const createTweetElement = function (obj) {
    const { user, content, created_at } = obj;

    const $tweet = $(`
    <article class="user_tweet">
        <header class="user_tweet-header">
          <div class="user_avatar">
            <img class="user_avatar-photo" src=${user.avatars} alt="img">
            <span class="user_name">${user.name}</span>
          </div>
          <div class="user_tagname">
            <span>@${user.handle}</span>
          </div>
        </header>
  
        <div class="user_tweet-content">
        ${escape(content.text)}
        </div>
  
        <footer class="user_tweet-footer">
          <div class="date_left">
            <p class="data_left-text"><span class="date_left-number">${timeago.format(
              created_at
            )}</span></p>
          </div>
  
          <div class="user_tweet_icons">
            <i class="fas fa-flag tweet_icon"></i>
            <i class="fas fa-retweet tweet_icon"></i>
            <i class="fas fa-heart tweet_icon"></i>
          </div>
        </footer>
      </article>
    `);

    return $tweet;
  };
  //error checker func
  const validateInput = function (tag) {
    const $output = $(tag).children("#tweet-text").val();
    const errorEmptyValue =
      "<p class='error_message'>Error: value is empty</p>";
    const errorExceedValue =
      "<p class='error_message'>Error: You exceed message limit</p>";
    //check if error already shown then hide it
    if ($(tag).children(".error_message")) {
      $(tag).children(".error_message").hide("slow");
    }

    if (!$output) {
      $(tag).prepend(errorEmptyValue);
      $(tag).first().hide().slideDown("slow");
      return true;
    }
    if ($output.length > 140) {
      $(tag).prepend(errorExceedValue);
      $(tag).first().hide().slideDown("slow");
      return true;
    }
  };

  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      //append each tweet to tweet container in html page
      $("#tweet_container").prepend(createTweetElement(tweet));
    }
  };

  $("form").on("submit", function (event) {
    event.preventDefault();
    //check if error exist => stop submiting
    if (validateInput(this)) {
      return;
    }
    //send data to data base
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $(this).serialize(),
    }).then(() => {
      $("textarea").val("");
      //update number of letters
      const $countNum = $(this).children().last().children().last();
      $countNum.val(140);

      //get last added data from data base
      $.ajax({
        url: "/tweets",
        method: "GET",
      }).then((data) => {
        const newTweet = data.pop();
        $("#tweet_container").prepend(createTweetElement(newTweet));
      });
    });
  });

  //attend all users from data base
  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
    }).then((result) => {
      renderTweets(result);

      //add hover style in JS (according to mentor recomendation)
      $("article").hover(
        function () {
          $(this).css("box-shadow", "4px 4px #808080");
        },
        function () {
          $(this).css("box-shadow", "none");
        }
      );
    });
  };
  loadTweets();
});
