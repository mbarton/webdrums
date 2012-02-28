function nextNote(cont, restart)
{
	var nextNotes = $(".active").removeClass("active").next();
	if(nextNotes.length === 0 || restart)
	{
		nextNotes = $("li:nth-child(2)").not(".label");
	}
	nextNotes.addClass("active");

	if(!restart)
	{
		playNotes();
	}

	if(cont)
	{
		timeoutId = setTimeout(function(){
			nextNote(true, false);
		}, msPerBeat)
	}
}

function playNotes()
{
	// Todo, remove redundancy in this here method
	if($("#kick li.active.note").length > 0)
	{
		var audKick = document.getElementById("audkick");
		audKick.pause();
		audKick.currentTime = 0;
		audKick.play();
		//console.log("kick");
	}

	if($("#hat li.active.note").length > 0)
	{
		var audHat = document.getElementById("audhat");
		audHat.pause();
		audHat.currentTime = 0;
		audHat.play();
		//console.log("hat");
	}

	if($("#snare li.active.note").length > 0)
	{
		var audSnare = document.getElementById("audsnare");
		audSnare.pause();
		audSnare.currentTime = 0;
		audSnare.play();
		//console.log("snare");
	}

	if($("#crash li.active.note").length > 0)
	{
		var audSnare = document.getElementById("audcrash");
		audSnare.pause();
		audSnare.currentTime = 0;
		audSnare.play();
		//console.log("crash");
	}
}

var msPerBeat = 0;
var timeoutId = 0;

function calcMsPerBeat(val)
{
	val = $("#txtBPM").val();
	if(val >= 30 && val <= 200)
	{
		msPerBeat = Math.floor(((1.0 / $("#txtBPM").val()) * 60 * 1000) / 4);
		$("#txtBPM").removeClass("error");
		return true;
	}
	else
	{
		$("#txtBPM").addClass("error");
		return false;
	}
}

function populateFromURL()
{
	if(window.location.hash.length <= 0)
	{
		return;
	}

	var encoded = window.location.hash.substring(1);
	bpm_encoded = encoded.split("_");
	if(bpm_encoded.length < 2)
	{
		return;
	}

	$("#txtBPM").val(bpm_encoded[0]);
	if(!calcMsPerBeat(bpm_encoded[0]))
	{
		calcMsPerBeat(120);
		$("#txtBPM").val("120");
	}

	var code = bpm_encoded[1];
	var pads = $("li").not(".label");
	for(i = 0; i < code.length; i++)
	{
		var c = code.charAt(i);
		if(c === "1")
		{
			$(pads.get(i)).addClass("note");
		}
	}
}

function updateHash()
{
	var theHash = $("#txtBPM").val() + "_";
	
	$("li").not(".label").each( function(){
		if($(this).hasClass("note"))
		{
			theHash += "1";
		}
		else
		{
			theHash += "0";
		}
	});

	window.location.hash = theHash;
}

$( function()
{
	populateFromURL();

	calcMsPerBeat();

	$("li").not(".label").click( function(){
		$(this).toggleClass("note");
		updateHash();
	});

	$("#btnClear").click( function(){
		$("li").not("label").removeClass("note");
		updateHash();
	});

	$("#btnPlay").click( function()
	{
		nextNote(true, false);	
	});

	$("#btnStop").click( function(){
		clearTimeout(timeoutId);
		nextNote(false, true);
	});

	// JQuery seemed to choke on this... eep
	document.getElementById("txtBPM").oninput = function()
	{
		var val = $("#txtBPM").val();
		if(calcMsPerBeat(val))
		{
			updateHash();
		}
	};
});