
$(function () {

    let wrongTriesHolder = $("#wrong-tries");
    let cards = $(".cards .card");
    let isElementFlipped = true;
    let numberOfWrongTries = 0;

    let prevFlipped = null;

    for (let i = 0; i < cards.length; ++i)
        $(cards[i]).css({ order: Math.floor(Math.random() * cards.length) + 1 });

    $(cards).click(function () {
        if (!$(this).hasClass("flip")) {

            if ($(this).hasClass("flip") || !isElementFlipped)
                return;

            $(this).addClass("flip");

            let image = $(this).find(".back img");

            if (prevFlipped == null) {
                prevFlipped = image;
                return;
            }

            if ($(image).attr("data") == $(prevFlipped).attr("data")) {
                $(this).css({ cursor: "auto" });
                $($(prevFlipped).parents(".card")).css({ cursor: "auto" });

                $("#success").get(0).play();
            }
            else {
                ++numberOfWrongTries;
                $(wrongTriesHolder).text(" wrong tries " + numberOfWrongTries);
                isElementFlipped = false;
                let current = this;
                let previous = $(prevFlipped).parents(".card");
                setTimeout(function () {
                    $(current).removeClass("flip");
                    $(previous).removeClass("flip");
                    isElementFlipped = true;
                }, 1000);

                $("#failure").get(0).play();
            }

            prevFlipped = null;
        }
    })


    $("#start-button").click(function () {
        $(this).parent().fadeOut("slow");
        $("#backgroundSound").get(0).pause();
    })


})