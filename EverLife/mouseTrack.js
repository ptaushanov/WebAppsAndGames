const trackMouse = (canvas,dom) =>{
    canvas.addEventListener('mousemove', function(evt) {
        let rect = canvas.getBoundingClientRect();
        let mousePos = {
            x: Math.round(evt.clientX - rect.left),
            y: Math.round(evt.clientY - rect.top)
          }
        let message = `X:${mousePos.x} Y:${mousePos.y}`;
        dom.innerHTML = message;
      });
  }
