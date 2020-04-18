module.exports = {
  correctText: text => {
    let ok = false;
    const pos = [];
    for (let i = 0; i < text.length; i++) {
      if (text[i] === "'") {
        pos.push(i);
        ok = true;
      }
    }
    if (ok === true) {
      for (let i = 0; i < pos.length; i++) {
        pos[i]++;
        text = [text.slice(0, pos[i]), "'", text.slice(pos[i])].join('');
      }
    }
    return text;
  }
}
