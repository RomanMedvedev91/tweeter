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

  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      //append each tweet to tweet container in html page
      $("#tweet_container").prepend(createTweetElement(tweet));
    }
  };

  $("form").on("submit", function (event) {
    event.preventDefault();
    const $output = $(this).children("#tweet-text").val();
    const $labal = $(this).children(".labal_textarea");
    const errorEmptyValue =
      "<p class='error_message'>Error: value is empty</p>";
    const errorExceedValue =
      "<p class='error_message'>Error: You exceed message limit</p>";
    //check if error already shown then hide it
    if ($(this).children(".error_message")) {
      $(this).children(".error_message").hide("slow");
    }

    if (!$output) {
      $(this).prepend(errorEmptyValue);
      $(this).first().hide().slideDown("slow");
      return;
    }
    if ($output.length > 140) {
      $(this).prepend(errorExceedValue);
      $(this).first().hide().slideDown("slow");
      return;
    }
    if ($labal.text() !== "What are you humming about?") {
      $labal.text("What are you humming about?");
      $labal.removeClass("error_message");
    }

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $(this).serialize(),
    }).then((result) => {
      $("textarea").val("");
    });
    $.get("http://localhost:8080/tweets", (data) => {
      const newTweet = data.slice(-1).pop();
      const newTweetEl = createTweetElement(newTweet);
      $("#tweet_container").prepend(newTweetEl);
    });
  });

  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
    }).then((result) => {
      renderTweets(result);
    });
  };
  loadTweets();
});
