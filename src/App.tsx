import { useEffect, useRef, useState } from 'react';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Estado para controlar a direção e a posição do personagem
  const [direction, setDirection] = useState('down'); // Direção inicial (pode ser 'up', 'down', 'left', 'right')
  const [x, setX] = useState(900); // Posição inicial no eixo X
  const [y, setY] = useState(600); // Posição inicial no eixo Y
  const [currentFrame, setCurrentFrame] = useState(0); // Quadro atual para animação (se tiver animações com múltiplos quadros)
  const [showPopup, setShowPopup] = useState(true);


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
        setShowPopup(false);
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

    // Carregar as 4 imagens separadas para o personagem
    const papel1Image = new Image();
    const upImage = new Image();
    const downImage = new Image();
    const leftImage = new Image();
    const rightImage = new Image();
    const penguinImage= new Image();
    const houseImage = new Image();
    const nearnpc = new Image();
    const arvoreImage = new Image();
    const arbustoImage = new Image();
    papel1Image.src = '/papel1.png';
    arbustoImage.src = '/arbusto.png';
    arvoreImage.src = '/arvore.png';
    upImage.src = '/MainGirlBack.png'; // Caminho da imagem para cima
    downImage.src = '/MainGirlFront.png'; // Caminho da imagem para baixo
    leftImage.src = '/MainGirlRight.png'; // Caminho da imagem para esquerda
    rightImage.src = '/MainGirlLeft.png'; // Caminho da imagem para direita

    // Carregar a imagem da casa
    papel1Image.src = '/papel1.png';
    houseImage.src = '/house1.png'; // Caminho para a imagem da casa
    penguinImage.src = '/penguin.png'; // Caminho para a imagem da casa
    nearnpc.src = '/penguin2.png';

    // Função para desenhar o personagem e a casa no canvas
    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

      context.drawImage(arbustoImage, 300, 700, 100, 100); // Desenha a casa em (200, 200)
      context.drawImage(arvoreImage, 800, 300, 400, 400); // Desenha a casa em (200, 200)
      context.drawImage(houseImage, 600, 20, 204, 204); // Desenha a casa em (200, 200)
      context.drawImage(houseImage, 1200, 20, 204, 204); // Desenha a casa em (200, 200)
      context.drawImage(penguinImage, 900, 200, 90, 90); // Desenha a casa em (200, 200)
      context.drawImage(arvoreImage, 800, 300, 400, 400); // Desenha a casa em (200, 200)
      context.drawImage(papel1Image, 300, 400, 100, 100); // Desenha a casa em (200, 200)

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

      // Desenha o personagem no canvas
      context.drawImage(currentImage, x, y, 64, 64); // Aqui, 64x64 é o tamanho da imagem do personagem

      requestAnimationFrame(draw); // Chama a função draw novamente para a próxima animação
    };

    // Inicia a animação quando as imagens estiverem carregadas
    Promise.all([
      upImage.decode(),
      downImage.decode(),
      leftImage.decode(),
      rightImage.decode(),
      houseImage.decode() // Espera carregar a imagem da casa também
    ])
      .then(() => {
        draw(); // Inicia o desenho do personagem e da casa
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
      {showPopup && (
  <div
    style={{
      position: 'absolute',
      top: y - 60, // 40px acima do personagem
      left: x,
      background: 'rgb(255, 255, 255)',
      color: 'black',
      padding: '6px 12px',
      borderRadius: '4px',
      transform: 'translateX(-35%)',
      pointerEvents: 'none',
      zIndex: 10
    }}
  >
    <p>Olá, seja bem vindo!<br />venha conhecer o mundo de Thiago</p>
  </div>
)}

    </div>
  );
}

export default App;
