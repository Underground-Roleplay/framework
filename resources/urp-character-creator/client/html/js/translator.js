let language = [], reg = null;

function addTranslation(t) {
  language.push(JSON.parse(t));
}

function getRegex(number) {
  return new RegExp('\(\\$\\{' + number + '\\})');
}

function getTranslation(...args) {
  let find = language.find(function(l) { return l.short == args[0]});
  
  if(find) {
    let length = args.length - 1;
    text = JSON.parse(JSON.stringify(find));

    if(length > 0) {
        for(let i = 0; i < length; i++) {
            let reg_ex = getRegex(i + 1);
            let match = text.meaning.match(reg_ex);

            if(match) {
                text.meaning = text.meaning.replace(reg_ex, args[i + 1]);
            }
        }
    }

    return text.meaning;
  } else '< Text is missing >';
}

function translate(regex = null) {
  if(regex != null) reg = regex;
  let text = $("#translator").html();
  let match = text.match(reg);

  if(match) {
    match.forEach((m) => {
      let s = m.substring(2,m.length - 1);

      let find = language.find(function(l) { return l.short == s});
  
      if(find) {
        text = text.replace(m, find.meaning);
      }
    });  
  }

  $("#translator").html(text);

  return text;
}