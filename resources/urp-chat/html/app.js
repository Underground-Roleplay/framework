/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function colorify(text)
{
	let matches = [];
	let m = null;
	let curPos = 0;
	do {
		m = /\{[A-Fa-f0-9]{3}\}|\{[A-Fa-f0-9]{6}\}/g.exec(text.substr(curPos));
		if(!m)
			break;
		matches.push({
			found: m[0],
			index: m['index'] + curPos
		});
		curPos = curPos + m['index'] + m[0].length;
	} while(m != null);
	if (matches.length > 0) {
		text += '</font>';
		for(let i = matches.length - 1; i >= 0; --i) {
			let color = matches[i].found.substring(1, matches[i].found.length - 1);
			let insertHtml = (i != 0 ? '</font>' : '') + '<font color="#' + color + '">';
			text = text.slice(0, matches[i].index) + insertHtml + text.slice(matches[i].index + matches[i].found.length, text.length);
		}
	}
	return text;
}

var chatOpened = false;
var chatHighlighted = false;
var timeout;
var buffer = [];
var currentBufferIndex = -1;
var messagesBlock = null;
var msgInputBlock = null;
var msgInputLine = null;

function fadeIn(el, time) {
	el.style.opacity = 0;
	el.style.display = 'block';

	var last = +new Date();
	var tick = function() {
		el.style.opacity = (+new Date() - last) / time;

		if (el.style.opacity < 1)
			(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
	};

	tick();
}

function fadeOut(el, time) {
	el.style.opacity = 1;

	var last = +new Date();
	var tick = function() {
		el.style.opacity = 1 - (new Date() - last) / time;

		if (+el.style.opacity > 0)
			(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
	};
	tick();
}

function scrollTo(el, to, time) {
	if (time <= 0) {
		el.scrollTop = to;
		return;
	}
	var neg = false;
	if(to < el.scrollTop)
		neg = true;

	var diff = to - el.scrollTop;
	var prevVal = el.scrollTop;

	var last = +new Date();
	var tick = function() {
		el.scrollTop = (neg ? -el.scrollTop : el.scrollTop) + diff * ((new Date() - last) / time);
		if(el.scrollTop == prevVal)
			return;
		prevVal = el.scrollTop;
		last = +new Date();

		if ((el.scrollTop < to && !neg) || (el.scrollTop > to && neg)) {
			(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
		}
	};

	tick();
}

function checkOverflow() {
	if(document.querySelector('.messages').clientHeight > document.querySelector('.msglist').clientHeight) {
		if(!document.querySelector('.msglist').classList.contains('overflowed'))
			document.querySelector('.msglist').classList.add('overflowed');
	}
	else if(document.querySelector('.msglist').classList.contains('overflowed'))
		document.querySelector('.msglist').classList.remove('overflowed');
}

window.addEventListener('load', function(){
	messagesBlock = document.querySelector('.messages');
	msgInputBlock = document.querySelector('.msginput');
	msgInputLine = document.querySelector('.msginput input');
	alt.emit('chatloaded');
});

function addString(text) {
	if(messagesBlock.children.length > 100)
		messagesBlock.removeChild(messagesBlock.children[0]);
	var p = document.createElement('p');
	p.innerHTML = colorify(text);
	messagesBlock.appendChild(p);
	checkOverflow();
	highlightChat();
}

function addMessage(name, text) {
	if(messagesBlock.children.length > 100)
		messagesBlock.removeChild(messagesBlock.children[0]);
	var p = document.createElement('p');
	p.innerHTML = '<b>' + name + ': </b>' + colorify(text);
	messagesBlock.appendChild(p);
	checkOverflow();
	highlightChat();
}

function saveBuffer()
{
	if(buffer.length > 100)
		buffer.pop();
	buffer.unshift(msgInputLine.value);

	currentBufferIndex = -1;
}

function loadBuffer(idx)
{
	msgInputLine.value = buffer[idx];
}

function openChat(insertSlash) {
	insertSlash = insertSlash || false;
	clearTimeout(timeout);
	if (!chatOpened) {
		document.querySelector('.chatbox').classList.add('active');

		//fadeIn(msgInputBlock, 200);
		msgInputBlock.style.display = 'block';
		msgInputBlock.style.opacity = 1;

		if(insertSlash)
			msgInputLine.value = '/';
		msgInputLine.focus();
		chatOpened = true;
	} else {
		return false;
	}
}

function closeChat() {
	if (chatOpened) {
		if(document.querySelector('.chatbox').classList.contains('active'))
			document.querySelector('.chatbox').classList.remove('active');
		msgInputLine.blur();
		msgInputBlock.style.display = 'none';
		chatOpened = false;
		msgInputLine.value = '';
	} else {
		return false;
	}
}

function highlightChat() {

	scrollTo(document.querySelector('.msglist'), document.querySelector('.msglist').scrollHeight, 0);

	if (!chatHighlighted) {
		document.querySelector('.chatbox').classList.add('active');
		chatHighlighted = true;
	}

	clearTimeout(timeout);
	timeout = setTimeout(function() {
		if(document.querySelector('.chatbox').classList.contains('active'))
			document.querySelector('.chatbox').classList.remove('active');
		chatHighlighted = false;
	}, 4000);
}

function hideChat(state) {
	console.log('hideChat called');
	document.querySelector('.content').style.display = state ? 'none' : 'block';
}

document.querySelector('#message').addEventListener('submit', function(e) {
	e.preventDefault();
	var message = msgInputLine.value;
	alt.emit('chatmessage', message);
	saveBuffer();
	msgInputLine.value = '';
	closeChat();
});


document.querySelector('.msginput input').addEventListener('keydown', function(e) {
	if (e.keyCode === 9) {
		e.preventDefault();
	}
	else if (e.keyCode == 40) {
		e.preventDefault();
		if(currentBufferIndex > 0) {
			loadBuffer(--currentBufferIndex);
		}
		else {
			currentBufferIndex = -1;
			msgInputLine.value = '';
		}
	}
	else if (e.keyCode == 38) {
		e.preventDefault();
		if(currentBufferIndex < (buffer.length - 1)) {
			loadBuffer(++currentBufferIndex);
		}
	}
});

if('alt' in window) {
	alt.on('addString', addString);
	alt.on('addMessage', addMessage);
	alt.on('openChat', openChat);
	alt.on('closeChat', closeChat);
	alt.on('hideChat', hideChat);
}
