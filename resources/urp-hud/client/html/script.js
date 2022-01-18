alt.on("hud:Tick", (data => {        

    $(".health > .vprogress").css("width", (80 * (data.health / 200)) + "px");
    if (data.health <= 0) {
        $(".health > .vprogress").hide();
    } else {
        $(".health > .vprogress").show();
    }
    $(".armor > .vprogress").css("width", (80 * (data.armor / 100)) + "px");
    if (data.armor <= 0) {
        $(".armor > .vprogress").hide();
    } else {
        $(".armor > .vprogress").show();
    }
    $(".hunger > .vprogress").css("width", (40 * (data.hunger/200) + "px"));
    if (data.hunger <= 0) {
        $(".hunger > .vprogress").hide();
    } else {
        $(".hunger > .vprogress").show();
    }
    $(".thirst > .vprogress").css("width", (40 * (data.thirst/200) + "px"));
    if (data.thirst <= 0) {
        $(".thirst > .vprogress").hide();
    } else {
        $(".thirst > .vprogress").show();
    }

    let hour = data.hour;
    if (hour <= 9) hour = "0" + hour;

    let minute = data.minute;
    if (minute <= 9) minute = "0" + minute;
    let money = data.money
    $(".wallet > font").html( `$ ${money.cash}` );
    $(".bank > font").html( `$ ${money.bank}` );

    $(".date > font").html( hour + ":" + minute);

    if (data.vehicle) {
        $('.vehicle').fadeIn('fast');
        let fuel = Math.ceil(data.fuel)
        if (fuel >= 100) {
            fuel = 99;
        }
        if (fuel <= 20) {
            $('.fuel').css('border', '1px solid rgba(255, 175, 2, 0.5)');
        } else if (fuel <= 10) {
            $('.fuel').css('border', '1px solid rgba(255, 2, 69, 0.5)');
        } else {
            $('.fuel').css('border', '1px solid rgba(255, 255, 255, 0.1)');
        }
        $('.fuel > font').html(fuel + '%');
        if (data.belt) {
            $('.belt > img').css('opacity', '1');
        } else {
            $('.belt > img').css('opacity', '.5');
        }
        
    } else {
        $('.vehicle').css('display', 'none');
        $('.vehicle').fadeOut('fast');
    }
        
        

}));
