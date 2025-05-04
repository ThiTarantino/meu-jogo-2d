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

  const npcs = [
    { id: 1, x: 650, y: 200, radius: 100, message: 'Olá, como vai?' },
    { id: 2, x: 1250, y: 300, radius: 100, message: 'Bom dia!' },
    { id: 3, x: 350, y: 400, radius: 100, message: 'Precisa de ajuda?' },
    { id: 4, x: 1650, y: 500, radius: 100, message: 'Cuidado por aí!' },
    { id: 5, x: 550, y: 700, radius: 100, message: 'Tudo bem?' },
  ];

  const nearNPCRef = useRef<typeof npcs[0] | null>(null);
  const showModalRef = useRef(false);

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
      arvore: new Image(),
      arbusto: new Image(),
      planta: new Image(),
    };

    images.arbusto.src = '/arbusto.png';
    images.arvore.src = '/arvore.png';
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

    let animationFrameId: number;

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      if (!showModalRef.current) {
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

      setRenderPos({ x: posRef.current.x, y: posRef.current.y });
      setDirection(directionRef.current);

      if (!showModalRef.current) {
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

      context.drawImage(images.arbusto, 300, 700, 100, 100);
      context.drawImage(images.planta, 700, 200, 1200, 1200);
      context.drawImage(images.house, 600, 20, 254, 254);
      context.drawImage(images.house, 1200, 20, 254, 254);
      context.drawImage(images.mulher, 600, 200, 90, 90);
      context.drawImage(images.mulher1, 1200, 300, 90, 90);
      context.drawImage(images.homem, 300, 400, 100, 100);
      context.drawImage(images.homem1, 1600, 500, 100, 100);
      context.drawImage(images.homem2, 500, 700, 100, 100);
      context.drawImage(images.planta, 500, 200, 600, 600);

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
  }, []); // Apenas na montagem

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

      {nearNPCRef.current && !showModalRef.current && (
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

      {showModalRef.current && nearNPCRef.current && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            zIndex: 100,
            border: '2px solid #4a90e2',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            maxWidth: '80%',
            width: '400px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '15px',
            }}
          >
            <h3 style={{ margin: 0 }}>Informações</h3>
            <button
              onClick={() => {
                showModalRef.current = false;
              }}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          </div>
          <div>
            <p>{nearNPCRef.current.message}</p>
            <div style={{ marginTop: '20px' }}>
              <h4>Linguagens que domino:</h4>
              <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                <div style={{ textAlign: 'center' }}>
                  <img src="/js-logo.png" alt="JavaScript" width="40" height="40" />
                  <p>JavaScript</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <img src="/ts-logo.png" alt="TypeScript" width="40" height="40" />
                  <p>TypeScript</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <img src="/python-logo.png" alt="Python" width="40" height="40" />
                  <p>Python</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
