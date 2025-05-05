import { useEffect, useRef, useState } from 'react';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posRef = useRef({ x: 900, y: 600 });
  const directionRef = useRef('down');
  const keys = useRef({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  });

  const [renderPos, setRenderPos] = useState({ x: 900, y: 600 });
  const [direction, setDirection] = useState('down');
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  const [modalContent, setModalContent] = useState<string | null>(null);

  const npcs = [
    {
      id: 1,
      x: 650,
      y: 200,
      radius: 100,
      message: 'Clique ENTER para visitar meu GitHub!',
      action: () => {
        window.open('https://github.com/ThiTarantino', '_blank');
      },
    },
    {
      id: 2,
      x: 1250,
      y: 300,
      radius: 100,
      message: 'Aperte ENTER para falar comigo no WhatsApp!',
      action: () => {
        window.open('https://wa.me/5551986044261', '_blank');
      },
    },
    {
      id: 3,
      x: 350,
      y: 400,
      radius: 100,
      message: 'Pressione ENTER para ver minhas habilidades!',
      action: () => {
        setModalContent('Habilidades: JavaScript, TypeScript, React, Node.js, etc.');
      },
    },
    {
      id: 4,
      x: 1650,
      y: 500,
      radius: 100,
      message: 'Use ENTER para ver meus projetos!',
      action: () => {
        setModalContent('Projetos: Portfólio online, aplicação web X, jogo 2D Y.');
      },
    },
    {
      id: 5,
      x: 550,
      y: 700,
      radius: 100,
      message: 'Aperte ENTER para uma surpresa!',
      action: () => {
        setModalContent('Você encontrou um NPC surpresa!');
      },
    },
  ];

  const nearNPCRef = useRef<typeof npcs[0] | null>(null);
  const showModalRef = useRef(false);
  const bandeiraCarregadaRef = useRef(false);
  const fogueiraCarregadaRef = useRef(false);

  // Configuração da animação da bandeira
  const flagAnimationRef = useRef({
    frame: 0,
    frameCount: 6,
    frameWidth: 32,
    frameHeight: 64,
    animationSpeed: 0.1,
    time: 0,
  });
  const fogueiraa = useRef({
    frame: 0,
    frameCount: 6,
    frameWidth: 32,
    frameHeight: 64,
    animationSpeed: 0.1,
    time: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const speed = 5;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key in keys.current) {
        keys.current[e.key as keyof typeof keys.current] = true;
        setShowWelcomePopup(false);
      }

      if (e.key === 'Enter' && nearNPCRef.current && !showModalRef.current) {
        showModalRef.current = true;
        if (nearNPCRef.current.action) {
          nearNPCRef.current.action();
        }
        setTimeout(() => {
          showModalRef.current = false;
        }, 500);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key in keys.current) {
        keys.current[e.key as keyof typeof keys.current] = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const images = {
      up: new Image(),
      down: new Image(),
      left: new Image(),
      right: new Image(),
      mulher: new Image(),
      mulher1: new Image(),
      homem: new Image(),
      homem1: new Image(),
      homem2: new Image(),
      house: new Image(),
      arvore2: new Image(),
      arvore1: new Image(),
      arbusto: new Image(),
      planta: new Image(),
      terra: new Image(),
      terra1: new Image(),
      terra2: new Image(),
      terra3: new Image(),
      terra4: new Image(),
      tronco: new Image(),
      tronco1: new Image(),
      tronco2: new Image(),
      localfogueira: new Image(),
      bandeira: new Image(),
      fogueira: new Image(),
    };

    // Carregar imagens
    images.localfogueira.src = '/localfogueira.png';
    images.tronco.src = '/tronco.png';
    images.tronco1.src = '/tronco1.png';
    images.tronco2.src = '/tronco2.png';
    images.terra.src = '/terra.png';
    images.terra1.src = '/terra1.png';
    images.terra2.src = '/terra2.png';
    images.terra3.src = '/terra3.png';
    images.terra4.src = '/terra4.png';
    images.arbusto.src = '/arbusto.png';
    images.arvore2.src = '/arvore2.png';
    images.arvore1.src = '/arvore1.png';
    images.up.src = '/MainGirlBack.png';
    images.down.src = '/MainGirlFront.png';
    images.left.src = '/MainGirlRight.png';
    images.right.src = '/MainGirlLeft.png';
    images.planta.src = '/Planta.png';
    images.homem.src = '/homem.png';
    images.homem1.src = '/homem1.png';
    images.homem2.src = '/homem2.png';
    images.house.src = '/house1.png';
    images.mulher.src = '/mulher.png';
    images.mulher1.src = '/mulher1.png';
    images.bandeira.src = '/bandeira.png';
    images.fogueira.src = '/fogueira.png';

    let animationFrameId: number;

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Lógica de movimento
      if (!showModalRef.current && !modalContent) {
        if (keys.current.ArrowUp) {
          posRef.current.y -= speed;
          directionRef.current = 'up';
        }
        if (keys.current.ArrowDown) {
          posRef.current.y += speed;
          directionRef.current = 'down';
        }
        if (keys.current.ArrowLeft) {
          posRef.current.x -= speed;
          directionRef.current = 'left';
        }
        if (keys.current.ArrowRight) {
          posRef.current.x += speed;
          directionRef.current = 'right';
        }
      }
      if (posRef.current.x > 1864) {
        posRef.current.x = 0;
      }
      if (posRef.current.x < -4) {
        posRef.current.x = 1864;
      }

      if (posRef.current.y < 0) {
        posRef.current.y = 900;
      }
      if (posRef.current.y > 900) {
        posRef.current.y = 0;
      }

      setRenderPos({ x: posRef.current.x, y: posRef.current.y });
      setDirection(directionRef.current);

      // Verificação de NPCs próximos
      if (!showModalRef.current && !modalContent) {
        let closestNPC = null;
        let minDistance = Infinity;

        for (const npc of npcs) {
          const distance = Math.hypot(
            posRef.current.x - npc.x,
            posRef.current.y - npc.y
          );
          if (distance < npc.radius && distance < minDistance) {
            minDistance = distance;
            closestNPC = npc;
          }
        }

        nearNPCRef.current = closestNPC;
      }

      // Desenhar elementos do mapa
      context.drawImage(images.terra1, 588, 270, 40, 40);
      context.drawImage(images.terra1, 588, 310, 40, 40);
      context.drawImage(images.terra3, 588, 350, 40, 40);
      context.drawImage(images.terra2, 588, 390, 40, 40);
      context.drawImage(images.terra4, 588, 410, 40, 40);
      context.drawImage(images.terra3, 588, 270, 40, 40);
      context.drawImage(images.terra1, 588, 270, 40, 40);
      context.drawImage(images.terra1, 1288, 270, 40, 40);
      context.drawImage(images.terra1, 1288, 310, 40, 40);
      context.drawImage(images.terra3, 1288, 350, 40, 40);
      context.drawImage(images.terra2, 1288, 390, 40, 40);
      context.drawImage(images.terra4, 1288, 410, 40, 40);
      context.drawImage(images.terra3, 1288, 270, 40, 40);
      context.drawImage(images.terra1, 1288, 270, 40, 40);
      context.drawImage(images.localfogueira, 300, 500, 100, 100);
      context.drawImage(images.tronco, 258, 470, 40, 40);
      context.drawImage(images.arbusto, 300, 700, 50, 40);
      context.drawImage(images.planta, 700, 200, 1200, 1200);
      context.drawImage(images.house, 500, 20, 254, 254);
      context.drawImage(images.house, 1200, 20, 254, 254);
      context.drawImage(images.mulher, 600, 200, 80, 100);
      context.drawImage(images.mulher1, 1200, 300, 90, 90);
      context.drawImage(images.homem, 300, 400, 100, 100);
      context.drawImage(images.homem1, 1600, 500, 100, 100);
      context.drawImage(images.homem2, 500, 700, 100, 100);
      context.drawImage(images.arvore1, 1500, 200, 150, 150);
      context.drawImage(images.arvore1, 200, 200, 150, 150);
      context.drawImage(images.arvore2, 200, 400, 50, 50);

      // Desenhar bandeira animada (apenas quando carregada)
      if (images.bandeira.complete) {
        if (!bandeiraCarregadaRef.current) {
          bandeiraCarregadaRef.current = true;
        }

        flagAnimationRef.current.time += flagAnimationRef.current.animationSpeed;
        flagAnimationRef.current.frame =
          Math.floor(flagAnimationRef.current.time) % flagAnimationRef.current.frameCount;

        context.drawImage(
          images.bandeira,
          flagAnimationRef.current.frame * flagAnimationRef.current.frameWidth,
          0,
          flagAnimationRef.current.frameWidth,
          flagAnimationRef.current.frameHeight,
          1400, // Posição X da bandeira
          200, // Posição Y da bandeira
          flagAnimationRef.current.frameWidth,
          flagAnimationRef.current.frameHeight
        );
      }
      if (images.fogueira.complete) {
        if (!fogueiraCarregadaRef.current) {
          fogueiraCarregadaRef.current = true;
        }

        fogueiraa.current.time += fogueiraa.current.animationSpeed;
        fogueiraa.current.frame =
          Math.floor(fogueiraa.current.time) % fogueiraa.current.frameCount;

        context.drawImage(
          images.fogueira,
          fogueiraa.current.frame * fogueiraa.current.frameWidth,
          0,
          fogueiraa.current.frameWidth,
          fogueiraa.current.frameHeight,
          335, //
          483, //
          fogueiraa.current.frameWidth,
          fogueiraa.current.frameHeight
        );
      }

      // Desenhar personagem
      const currentImage = images[directionRef.current as keyof typeof images] || images.down;
      context.drawImage(currentImage, posRef.current.x, posRef.current.y, 64, 64);

      animationFrameId = requestAnimationFrame(draw);
    };

    Promise.all(
      Object.values(images).map((img) =>
        img.decode().catch(() => {
          console.warn('Erro ao carregar imagem:', img.src);
        })
      )
    ).then(draw);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const closeModal = () => {
    setModalContent(null);
  };

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

      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'rgba(255, 255, 255, 0.7)',
          padding: '10px',
          borderRadius: '5px',
          zIndex: 1000,
          fontFamily: 'sans-serif',
          fontSize: '14px',
        }}
      >
        Coordenadas: X: {Math.round(renderPos.x)}, Y: {Math.round(renderPos.y)}
      </div>

      {showWelcomePopup && (
        <div
          style={{
            position: 'absolute',
            top: renderPos.y - 100,
            left: renderPos.x,
            background: 'white',
            color: 'black',
            padding: '6px 12px',
            borderRadius: '4px',
            transform: 'translateX(-35%)',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          <p>
            Olá, seja bem-vindo!
            <br />
            venha conhecer o mundo de Thiago
          </p>
        </div>
      )}

      {nearNPCRef.current && !showModalRef.current && !modalContent && (
        <div
          style={{
            position: 'absolute',
            top: nearNPCRef.current.y - 50,
            left: nearNPCRef.current.x,
            background: 'white',
            color: 'black',
            padding: '8px 16px',
            borderRadius: '8px',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            zIndex: 10,
            border: '2px solid #4a90e2',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            maxWidth: '200px',
            textAlign: 'center',
            fontSize: '14px',
          }}
        >
          {nearNPCRef.current.message}
          <div
            style={{
              position: 'absolute',
              bottom: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: '10px solid white',
            }}
          />
        </div>
      )}

      {modalContent && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            color: 'black',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            zIndex: 20,
            textAlign: 'center',
            minWidth: '300px',
          }}
        >
          <button
            onClick={closeModal}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            X
          </button>
          <p>{modalContent}</p>
        </div>
      )}
    </div>
  );
}

export default App;