/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  // Fake data taken from initial-tweets.json
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

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
          <p>${content.text}</p>
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
      $(".container").append(createTweetElement(tweet));
    }
  };

  renderTweets(data);
});
