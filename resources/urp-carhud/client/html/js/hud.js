
let s_playerID;
let s_rpm;
let s_speed;
let s_gear;
let s_IL;
let s_Handbrake;
let s_LS_r;
let s_LS_o;
let s_LS_h;
let calcSpeed;
let speedText = '';
let inVehicle = false;
	alt.on("speedometer:data", (data) => {
        if (data.ShowHud) {
			
			inVehicle   = true;
			s_PlayerID  = data.PlayerID;
			s_Rpm       = data.CurrentCarRPM;
			s_Speed     = data.CurrentCarSpeed;
			s_Kmh       = data.CurrentCarKmh;
			s_Mph       = data.CurrentCarMph;
			s_Gear      = data.CurrentCarGear;
			s_IL        = data.CurrentCarIL;
			s_Handbrake = data.CurrentCarHandbrake;
			s_Brake     = data.CurrentCarBrake;
			s_LS_r      = data.CurrentCarLS_r;
			s_LS_o      = data.CurrentCarLS_o;
			s_LS_h      = data.CurrentCarLS_h;
			CalcSpeed   = s_Kmh;
			CalcRpm     = s_Rpm * 9;
			
			if(CalcSpeed > 999) {
				CalcSpeed = 999;
			}
			
			// Vehicle RPM display
			$("#rpmshow").attr("data-value", CalcRpm.toFixed(2));
			
			// Vehicle Gear display
			if(s_Gear == 0) {
				$(".geardisplay span").html("R");
				$(".geardisplay").attr("style", "color: #FFF;border-color:#FFF;");
			} else {
				$(".geardisplay span").html(s_Gear);
				if(CalcRpm > 7.5) {
					$(".geardisplay").attr("style", "color: rgb(235,30,76);border-color:rgb(235,30,76);");
				} else {
					$(".geardisplay").removeAttr("style");
				}
			}
			
			// Vehicle speed display
			if(CalcSpeed >= 100) {
				var tmpSpeed = Math.floor(CalcSpeed) + '';
				speedText = '<span class="int1">' + tmpSpeed.substr(0, 1) + '</span><span class="int2">' + tmpSpeed.substr(1, 1) + '</span><span class="int3">' + tmpSpeed.substr(2, 1) + '</span>';
			} else if(CalcSpeed > 10 && CalcSpeed < 100) {
				var tmpSpeed = Math.floor(CalcSpeed) + '';
				speedText = '<span class="gray int1">0</span><span class="int2">' + tmpSpeed.substr(0, 1) + '</span><span class="int3">' + tmpSpeed.substr(1, 1) + '</span>';
			} else if(CalcSpeed > 0 && CalcSpeed < 10) {
				speedText = '<span class="gray int1">0</span><span class="gray int2">0</span><span class="int3">' + Math.floor(CalcSpeed) + '</span>';
			} else {
				speedText = '<span class="gray int1">0</span><span class="gray int2">0</span><span class="gray int3">0</span>';
			}
			
			// Handbrake
			if(s_Handbrake) {
				$(".handbrake").html("HBK");
			} else {
				$(".handbrake").html('<span class="gray">HBK</span>');
			}
			
			// Brake ABS
			if(s_Brake > 0) {
				$(".abs").html("ABS");
			} else {
				$(".abs").html('<span class="gray">ABS</span>');
			}
			
			// Display speed and container
			$(".speeddisplay").html(speedText);
			$("#container").fadeIn(500);
			
        } else if (item.HideHud) {
			
			// Hide GUI
			$("#container").fadeOut(500);
			inVehicle = false;
        }
    });