import { useEffect, useRef, useState } from 'react';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Estado para controlar a direção e a posição do personagem
  const [direction, setDirection] = useState('down'); // Direção inicial (pode ser 'up', 'down', 'left', 'right')
  const [x, setX] = useState(50); // Posição inicial no eixo X
  const [y, setY] = useState(50); // Posição inicial no eixo Y
  const [currentFrame, setCurrentFrame] = useState(0); // Quadro atual para animação (se tiver animações com múltiplos quadros)

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const speed = 10; // Velocidade do movimento

    // Estado para controlar as teclas pressionadas
    const keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
    };

    // Função que lida com o pressionamento de teclas
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key in keys) {
        keys[e.key as keyof typeof keys] = true;
      }
    };

    // Função que lida com o levantamento de teclas
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key in keys) {
        keys[e.key as keyof typeof keys] = false;
      }
    };

    // Escuta os eventos de pressionamento e levantamento de teclas
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Carregar as 4 imagens separadas
    const upImage = new Image();
    const downImage = new Image();
    const leftImage = new Image();
    const rightImage = new Image();
    upImage.src = '/MainGirlBack.png'; // Caminho da imagem para cima
    downImage.src = '/MainGirlFront.png'; // Caminho da imagem para baixo
    leftImage.src = '/MainGirlRight.png'; // Caminho da imagem para esquerda
    rightImage.src = '/MainGirlLeft.png'; // Caminho da imagem para direita

    // Função para desenhar o personagem no canvas
    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

      // Mover o personagem dependendo das teclas pressionadas
      if (keys.ArrowUp) {
        setY(y - speed);
        setDirection('up'); // Muda a direção para cima
      }
      if (keys.ArrowDown) {
        setY(y + speed);
        setDirection('down'); // Muda a direção para baixo
      }
      if (keys.ArrowLeft) {
        setX(x - speed);
        setDirection('left'); // Muda a direção para esquerda
      }
      if (keys.ArrowRight) {
        setX(x + speed);
        setDirection('right'); // Muda a direção para direita
      }

      // Seleciona a imagem correta com base na direção
      let currentImage;
      switch (direction) {
        case 'up':
          currentImage = upImage;
          break;
        case 'down':
          currentImage = downImage;
          break;
        case 'left':
          currentImage = leftImage;
          break;
        case 'right':
          currentImage = rightImage;
          break;
        default:
          currentImage = downImage;
      }

      // Desenha a imagem do personagem no canvas
      context.drawImage(currentImage, x, y, 64, 64); // Aqui, 64x64 é o tamanho da imagem

      requestAnimationFrame(draw); // Chama a função draw novamente para a próxima animação
    };

    // Inicia a animação quando as imagens estiverem carregadas
    Promise.all([upImage.decode(), downImage.decode(), leftImage.decode(), rightImage.decode()])
      .then(() => {
        draw(); // Inicia o desenho do personagem
      })
      .catch((err) => {
        console.error('Erro ao carregar as imagens', err);
      });

    // Limpeza de event listeners
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [x, y, direction]); // Dependências da animação

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
      <canvas
  ref={canvasRef}
  width={window.innerWidth}
  height={window.innerHeight}
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    border: 'none',
    margin: 0,
    padding: 0,
    display: 'block',
    zIndex: 0,
  }}
/>

    </div>
  );
}

export default App;
