$(document).ready(function () {
  // --- our code goes here ---
  $("#tweet-text").on("input", function () {
    let length = this.value.length;
    let leftNumber = 140 - length;

    const $output = $(this).parent().children().last().children().last();

    $output.val(leftNumber);

    if ($output.val() < 0) {
      $output.addClass("counter-red");
    } else {
      $output.removeClass("counter-red");
    }
  });
});
