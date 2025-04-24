     const text = document.getElementById('movingText');
      let position = window.innerHeight;
  
      function moveTextUp() {
        position -= 0.9; 
        // Ajuste a velocidade alterando o valor subtraído
        if (position + text.offsetHeight > 0) {
          text.style.top = position + 'px';
          requestAnimationFrame(moveTextUp);
        } else {
          // Reinicia a posição para a parte inferior da janela
          position = window.innerHeight;
          requestAnimationFrame(moveTextUp);
        }
      }
  
      text.style.top = position + 'px';
      moveTextUp();
