"use client"

import { useEffect, useRef, useState } from "react"
import "./App.css"

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const posRef = useRef({ x: 870, y: 500 })
  const directionRef = useRef("down")
  const keys = useRef({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  })

  const [renderPos, setRenderPos] = useState({ x: 900, y: 600 })
  const [direction, setDirection] = useState("down")
  const [showWelcomePopup, setShowWelcomePopup] = useState(true)
  const [modalContent, setModalContent] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)

  const npcs = [
    {
      id: 1,
      x: 750,
      y: 240,
      radius: 100,
      message: "Clique ENTER para visitar meu GitHub!",
      action: () => {
        window.open("https://github.com/ThiTarantino", "_blank")
      },
    },
    {
      id: 2,
      x: 1250,
      y: 300,
      radius: 100,
      message: "Aperte ENTER para falar comigo no WhatsApp!",
      action: () => {
        window.open("https://wa.me/5551986044261", "_blank")
      },
    },
    {
      id: 3,
      x: 350,
      y: 400,
      radius: 100,
      message: "Pressione ENTER para ver minhas habilidades!",
      action: () => {
        setModalContent(`
          <div style="display: flex; gap: 30px;">
            <div>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                <img src="/javascript.png" alt="JavaScript" style="width: 150px; height: 150px; cursor: pointer; transition: transform 0.2s;" 
                  onmouseover="this.style.transform='scale(1.05)'; document.getElementById('previewImage').src='/javascript.png'; document.getElementById('previewTitle').innerText='JavaScript'; document.getElementById('previewDesc').innerText='Linguagem de programação de alto nível, interpretada e com tipagem dinâmica. É uma das principais tecnologias da web moderna.'; document.getElementById('preview').style.display='block';" 
                  onmouseout="this.style.transform='scale(1.0)';" />
                
                <img src="/typescript.png" alt="TypeScript" style="width: 150px; height: 150px; cursor: pointer; transition: transform 0.2s;" 
                  onmouseover="this.style.transform='scale(1.05)'; document.getElementById('previewImage').src='/typescript.png'; document.getElementById('previewTitle').innerText='TypeScript'; document.getElementById('previewDesc').innerText='Superset do JavaScript que adiciona tipagem estática opcional e outros recursos para melhorar a qualidade do código.'; document.getElementById('preview').style.display='block';" 
                  onmouseout="this.style.transform='scale(1.0)';" />
                
                <img src="/react.png" alt="React" style="width: 150px; height: 150px; cursor: pointer; transition: transform 0.2s;" 
                  onmouseover="this.style.transform='scale(1.05)'; document.getElementById('previewImage').src='/react.png'; document.getElementById('previewTitle').innerText='React'; document.getElementById('previewDesc').innerText='Biblioteca JavaScript para construir interfaces de usuário com componentes reutilizáveis e gerenciamento eficiente do DOM.'; document.getElementById('preview').style.display='block';" 
                  onmouseout="this.style.transform='scale(1.0)';" />
                
                <img src="/node.png" alt="Node.js" style="width: 150px; height: 150px; cursor: pointer; transition: transform 0.2s;" 
                  onmouseover="this.style.transform='scale(1.05)'; document.getElementById('previewImage').src='/node.png'; document.getElementById('previewTitle').innerText='Node.js'; document.getElementById('previewDesc').innerText='Ambiente de execução JavaScript do lado do servidor que permite construir aplicações de rede escaláveis.'; document.getElementById('preview').style.display='block';" 
                  onmouseout="this.style.transform='scale(1.0)';" />
                
                <img src="/docker.png" alt="Docker" style="width: 150px; height: 150px; cursor: pointer; transition: transform 0.2s;" 
                  onmouseover="this.style.transform='scale(1.05)'; document.getElementById('previewImage').src='/docker.png'; document.getElementById('previewTitle').innerText='Docker'; document.getElementById('previewDesc').innerText='Plataforma de containerização que facilita a criação, implantação e execução de aplicações em ambientes isolados.'; document.getElementById('preview').style.display='block';" 
                  onmouseout="this.style.transform='scale(1.0)';" />
                
                <img src="/prisma.png" alt="Prisma" style="width: 150px; height: 150px; cursor: pointer; transition: transform 0.2s;" 
                  onmouseover="this.style.transform='scale(1.05)'; document.getElementById('previewImage').src='/prisma.png'; document.getElementById('previewTitle').innerText='Prisma'; document.getElementById('previewDesc').innerText='ORM (Object-Relational Mapping) de próxima geração que facilita o acesso e manipulação de bancos de dados.'; document.getElementById('preview').style.display='block';" 
                  onmouseout="this.style.transform='scale(1.0)';" />
                
                <img src="/c++.png" alt="C++" style="width: 150px; height: 150px; cursor: pointer; transition: transform 0.2s;" 
                  onmouseover="this.style.transform='scale(1.05)'; document.getElementById('previewImage').src='/c++.png'; document.getElementById('previewTitle').innerText='C++'; document.getElementById('previewDesc').innerText='Linguagem de programação de propósito geral, compilada e multiparadigma, com foco em desempenho e eficiência.'; document.getElementById('preview').style.display='block';" 
                  onmouseout="this.style.transform='scale(1.0)';" />
                
                <img src="/git.png" alt="Git" style="width: 150px; height: 150px; cursor: pointer; transition: transform 0.2s;" 
                  onmouseover="this.style.transform='scale(1.05)'; document.getElementById('previewImage').src='/git.png'; document.getElementById('previewTitle').innerText='Git'; document.getElementById('previewDesc').innerText='Sistema de controle de versão distribuído para rastrear mudanças no código-fonte durante o desenvolvimento de software.'; document.getElementById('preview').style.display='block';" 
                  onmouseout="this.style.transform='scale(1.0)';" />
                
                <img src="/java.webp" alt="Java" style="width: 150px; height: 150px; cursor: pointer; transition: transform 0.2s;" 
                  onmouseover="this.style.transform='scale(1.05)'; document.getElementById('previewImage').src='/java.webp'; document.getElementById('previewTitle').innerText='Java'; document.getElementById('previewDesc').innerText='Linguagem de programação orientada a objetos, de alto nível, com portabilidade através da JVM (Java Virtual Machine).'; document.getElementById('preview').style.display='block';" 
                  onmouseout="this.style.transform='scale(1.0)';" />
              </div>
            </div>
            
            <div id="preview" style="display: none; width: 300px;">
              <img id="previewImage" src="/placeholder.svg" alt="Preview" style="width: 250px; height: 250px; object-fit: contain; margin-bottom: 15px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
              <h3 id="previewTitle" style="margin: 0 0 10px 0; font-size: 24px; color: #333;"></h3>
              <p id="previewDesc" style="margin: 0; font-size: 16px; line-height: 1.5; color: #555;"></p>
            </div>
          </div>
        `)
        setShowModal(true)
      },
    },
    {
      id: 4,
      x: 1650,
      y: 500,
      radius: 100,
      message: "Use ENTER para ver minha criatividade!",
      action: () => {
        setModalContent(`
          <div>
            Olá, Não sei o que colocar aqui!!!!!!
          </div>
        `)
        setShowModal(true)
      },
    },
    {
  id: 5,
  x: 550,
  y: 700,
  radius: 100,
  message: "Aperte ENTER para conhecer mais sobre mim!",
  action: () => {
    setModalContent(`
      <div style="display: flex; align-items: center; gap: 30px;">
        <div style="flex-shrink: 0;">
          <img src="/eu.jpeg" alt="Minha Foto" style="width: 300px; height: 300px; object-fit: cover; border-radius: 10px; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.31);" onerror="this.src='/placeholder.svg?height=300&width=300'; this.onerror=null;" />
        </div>
        <div>
          <h2 style="margin-top: 0; color: #333; font-size: 28px; border-bottom: 2px solid #4a90e2; padding-bottom: 10px; margin-bottom: 20px;">Thiago Tarantino</h2>
          <p style="font-size: 18px; line-height: 1.6; color: #444; margin-bottom: 15px;">
            Desenvolvedor Full Stack apaixonado por criar soluções inovadoras e experiências interativas como este mundo virtual.
          </p>
          <p style="font-size: 18px; line-height: 1.6; color: #444; margin-bottom: 15px;">
            Com experiência em desenvolvimento web e aplicações interativas, estou sempre em busca de novos desafios e oportunidades para expandir meus conhecimentos.
          </p>
          <p style="font-size: 18px; line-height: 1.6; color: #444; margin-bottom: 15px;">
            Quando não estou codando, gosto de explorar novas tecnologias, jogar videogames e contribuir para projetos open source.
          </p>
          <div style="margin-top: 25px;">
            <h3 style="color: #4a90e2; margin-bottom: 10px; font-size: 20px;">Contato</h3>
            <p style="font-size: 16px; color: #555;">
              <strong>Email:</strong> <a href="mailto:thiagoatarantino@gmail.com" style="color: #007bff; text-decoration: none;">thiagoatarantino@gmail.com</a><br>
              <strong>Localização:</strong> Brasil
            </p>
          </div>
        </div>
      </div>
    `);
    setShowModal(true);
  },
},
  ]

  const nearNPCRef = useRef<(typeof npcs)[0] | null>(null)
  const showModalRef = useRef(false)
  const bandeiraCarregadaRef = useRef(false)
  const fogueiraCarregadaRef = useRef(false)
  const fogueira1CarregadaRef = useRef(false)

  // Configuração da animação da bandeira
  const flagAnimationRef = useRef({
    frame: 0,
    frameCount: 6,
    frameWidth: 32,
    frameHeight: 64,
    animationSpeed: 0.1,
    time: 0,
  })
  const fogueiraa = useRef({
    frame: 0,
    frameCount: 6,
    frameWidth: 32,
    frameHeight: 64,
    animationSpeed: 0.08,
    time: 0,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context) return

    const speed = 5

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key in keys.current) {
        keys.current[e.key as keyof typeof keys.current] = true
        setShowWelcomePopup(false)
      }

      if (e.key === "Enter" && nearNPCRef.current && !showModalRef.current) {
        showModalRef.current = true
        if (nearNPCRef.current.action) {
          nearNPCRef.current.action()
          // Remove o setTimeout que fechava o modal automaticamente
          if (!nearNPCRef.current.message.includes("GitHub") && !nearNPCRef.current.message.includes("WhatsApp")) {
            // O modal com conteúdo será controlado pelo botão 'X' e 'Escape'
          } else {
            setTimeout(() => {
              showModalRef.current = false
            }, 500)
          }
        } else {
          // Remove o setTimeout para NPCs sem ação de conteúdo
          setTimeout(() => {
            showModalRef.current = false
          }, 500)
        }
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key in keys.current) {
        keys.current[e.key as keyof typeof keys.current] = false
      }
    }
    const handleEscClose = (e: KeyboardEvent) => {
      if (e.key === "Escape" && (modalContent || showModalRef.current)) {
        closeModal()
      }
    }

    window.addEventListener("keydown", handleEscClose)
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

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
      arbusto1: new Image(),
      arbusto2: new Image(),
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
      fogueira1: new Image(),
      barraca: new Image(),
      pedra: new Image(),
      pedra1: new Image(),
      pedra2: new Image(),
      javascript: new Image(),
      java: new Image(),
      typescript: new Image(),
      react: new Image(),
      node: new Image(),
      docker: new Image(),
      prisma: new Image(),
      c: new Image(),
      git: new Image(),
      whats: new Image(),
      github: new Image(),
      lamp: new Image(),
    }

    // Carregar imagens
    images.lamp.src = "/Lamp1.png"
    images.github.src = "/github.png"
    images.whats.src = "/whats.png"
    images.javascript.src = "/javascript.png"
    images.java.src = "/java.webp"
    images.typescript.src = "/typescript.png"
    images.react.src = "/react.png"
    images.node.src = "/node.png"
    images.docker.src = "/docker.png"
    images.prisma.src = "/prisma.png"
    images.c.src = "/c++.png"
    images.git.src = "/git.png"
    images.pedra.src = "/pedra.png"
    images.pedra1.src = "/pedra1.png"
    images.pedra2.src = "/pedra2.png"
    images.localfogueira.src = "/localfogueira.png"
    images.tronco.src = "/tronco.png"
    images.tronco1.src = "/tronco1.png"
    images.tronco2.src = "/tronco2.png"
    images.terra.src = "/terra.png"
    images.terra1.src = "/terra1.png"
    images.terra2.src = "/terra2.png"
    images.terra3.src = "/terra3.png"
    images.terra4.src = "/terra4.png"
    images.arbusto.src = "/arbusto.png"
    images.arbusto1.src = "/arbusto1.png"
    images.arbusto2.src = "/arbusto2.png"
    images.arvore2.src = "/arvore2.png"
    images.arvore1.src = "/arvore1.png"
    images.up.src = "/MainGirlBack.png"
    images.down.src = "/MainGirlFront.png"
    images.left.src = "/MainGirlRight.png"
    images.right.src = "/MainGirlLeft.png"
    images.planta.src = "/Planta.png"
    images.homem.src = "/homem.png"
    images.homem1.src = "/homem1.png"
    images.homem2.src = "/homem2.png"
    images.house.src = "/house1.png"
    images.mulher.src = "/mulher.png"
    images.mulher1.src = "/mulher1.png"
    images.bandeira.src = "/bandeira.png"
    images.fogueira.src = "/fogueira.png"
    images.fogueira1.src = "/fogueira1.png"
    images.barraca.src = "/barraca.png"
    

    let animationFrameId: number

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)

     
      if (!modalContent) {
        if (keys.current.ArrowUp) {
          posRef.current.y -= speed
          directionRef.current = "up"
        }
        if (keys.current.ArrowDown) {
          posRef.current.y += speed
          directionRef.current = "down"
        }
        if (keys.current.ArrowLeft) {
          posRef.current.x -= speed
          directionRef.current = "left"
        }
        if (keys.current.ArrowRight) {
          posRef.current.x += speed
          directionRef.current = "right"
        }
      }
      //limita o mapa
      if (posRef.current.x > 1864) {
        posRef.current.x = 0
      }
      if (posRef.current.x < -4) {
        posRef.current.x = 1864
      }

      if (posRef.current.y < 0) {
        posRef.current.y = 900
      }
      if (posRef.current.y > 900) {
        posRef.current.y = 0
      }
      //coloca colisao
      if (posRef.current.y < 260 && posRef.current.y > 200 && posRef.current.x <= 660 && posRef.current.x >= 480) {
        posRef.current.y = 260
      }
      if (posRef.current.y < 210 && posRef.current.y > 50 && posRef.current.x >= 460 && posRef.current.x <= 470) {
        posRef.current.x = 460
      }
      if (posRef.current.y < 260 && posRef.current.y > 50 && posRef.current.x >= 600 && posRef.current.x <= 700) {
        posRef.current.x = 700
      }
      //casa2
      if (posRef.current.y < 260 && posRef.current.y > 50 && posRef.current.x >= 1165 && posRef.current.x <= 1170) {
        posRef.current.x = 1165
      }
      if (posRef.current.y < 210 && posRef.current.y > 50 && posRef.current.x >= 1350 && posRef.current.x <= 1390) {
        posRef.current.x = 1390
      }
      if (posRef.current.y < 260 && posRef.current.y > 200 && posRef.current.x <= 1380 && posRef.current.x >= 1165) {
        posRef.current.y = 260
      }
        if (posRef.current.y <= 535 && posRef.current.y >= 525 && posRef.current.x >= 900 && posRef.current.x < 970) {
        posRef.current.y = 535;
       }
       if (posRef.current.y <= 455 && posRef.current.y >= 445 && posRef.current.x >= 900 && posRef.current.x < 970) {
        posRef.current.y = 445;
       }
        if (posRef.current.y < 535 && posRef.current.y > 445 && posRef.current.x >= 900 && posRef.current.x <= 910) {
        posRef.current.x = 900
      }
       if (posRef.current.y < 535 && posRef.current.y > 445 && posRef.current.x >= 960 && posRef.current.x <= 970) {
        posRef.current.x = 970
      }
     


      setRenderPos({ x: posRef.current.x, y: posRef.current.y })
      setDirection(directionRef.current)

      // Verificação de NPCs próximos
      if (!showModalRef.current && !modalContent) {
        let closestNPC = null
        let minDistance = Number.POSITIVE_INFINITY

        for (const npc of npcs) {
          const distance = Math.hypot(posRef.current.x - npc.x, posRef.current.y - npc.y)
          if (distance < npc.radius && distance < minDistance) {
            minDistance = distance
            closestNPC = npc
          }
        }

        nearNPCRef.current = closestNPC
      }

      // Desenhar elementos do mapa

      context.drawImage(images.whats, 1250, 270, 30, 30)

      //vertical esqerda
      context.drawImage(images.terra1, 588, 270, 40, 40)
      context.drawImage(images.terra1, 588, 310, 40, 40)
      context.drawImage(images.terra3, 588, 350, 40, 40)
      context.drawImage(images.terra2, 588, 390, 40, 40)
      context.drawImage(images.terra4, 588, 410, 40, 40)
      context.drawImage(images.terra1, 588, 450, 40, 40)
      context.drawImage(images.terra1, 588, 490, 40, 40)
      context.drawImage(images.terra3, 588, 530, 40, 40)
      context.drawImage(images.terra2, 588, 570, 40, 40)
      context.drawImage(images.terra4, 588, 610, 40, 40)
      context.drawImage(images.terra4, 548, 410, 40, 40)
      context.drawImage(images.terra1, 548, 450, 40, 40)
      context.drawImage(images.terra1, 548, 490, 40, 40)
      context.drawImage(images.terra1, 548, 530, 40, 40)
      context.drawImage(images.terra2, 548, 570, 40, 40)
      context.drawImage(images.terra4, 548, 610, 40, 40)

      context.drawImage(images.terra1, 508, 450, 40, 40)
      context.drawImage(images.terra1, 508, 490, 40, 40)
      context.drawImage(images.terra1, 508, 530, 40, 40)
      context.drawImage(images.terra2, 508, 570, 40, 40)
      context.drawImage(images.terra1, 468, 450, 40, 40)
      context.drawImage(images.terra1, 468, 490, 40, 40)
      context.drawImage(images.terra1, 468, 530, 40, 40)
      context.drawImage(images.terra2, 468, 570, 40, 40)
      //vertical esquerda centro
      context.drawImage(images.terra4, 788, 410, 40, 40)
      context.drawImage(images.terra1, 788, 450, 40, 40)
      context.drawImage(images.terra1, 788, 490, 40, 40)
      context.drawImage(images.terra3, 788, 530, 40, 40)
      context.drawImage(images.terra2, 788, 570, 40, 40)
      //vertical direita centro
      context.drawImage(images.terra4, 1088, 410, 40, 40)
      context.drawImage(images.terra1, 1088, 450, 40, 40)
      context.drawImage(images.terra1, 1088, 490, 40, 40)
      context.drawImage(images.terra3, 1088, 530, 40, 40)
      context.drawImage(images.terra2, 1088, 570, 40, 40)

      // horizontam superior
      context.drawImage(images.terra1, 588, 410, 40, 40)
      context.drawImage(images.terra1, 628, 410, 40, 40)
      context.drawImage(images.terra3, 668, 410, 40, 40)
      context.drawImage(images.terra2, 708, 410, 40, 40)
      context.drawImage(images.terra4, 748, 410, 40, 40)
      context.drawImage(images.terra1, 788, 410, 40, 40)
      context.drawImage(images.terra1, 828, 410, 40, 40)
      context.drawImage(images.terra3, 868, 410, 40, 40)
      context.drawImage(images.terra2, 908, 410, 40, 40)
      context.drawImage(images.terra4, 948, 410, 40, 40)
      context.drawImage(images.terra1, 988, 410, 40, 40)
      context.drawImage(images.terra1, 1028, 410, 40, 40)
      context.drawImage(images.terra3, 1068, 410, 40, 40)
      context.drawImage(images.terra2, 1108, 410, 40, 40)
      context.drawImage(images.terra4, 1148, 410, 40, 40)
      context.drawImage(images.terra2, 1188, 410, 40, 40)
      context.drawImage(images.terra1, 1248, 410, 40, 40)
      // horizontam inferior
      context.drawImage(images.terra1, 588, 610, 40, 40)
      context.drawImage(images.terra1, 628, 610, 40, 40)
      context.drawImage(images.terra3, 668, 610, 40, 40)
      context.drawImage(images.terra2, 708, 610, 40, 40)
      context.drawImage(images.terra4, 748, 610, 40, 40)
      context.drawImage(images.terra1, 788, 610, 40, 40)
      context.drawImage(images.terra1, 828, 610, 40, 40)
      context.drawImage(images.terra3, 868, 610, 40, 40)
      context.drawImage(images.terra2, 908, 610, 40, 40)
      context.drawImage(images.terra4, 948, 610, 40, 40)
      context.drawImage(images.terra1, 988, 610, 40, 40)
      context.drawImage(images.terra1, 1028, 610, 40, 40)
      context.drawImage(images.terra3, 1068, 610, 40, 40)
      context.drawImage(images.terra2, 1108, 610, 40, 40)
      context.drawImage(images.terra4, 1148, 610, 40, 40)
      context.drawImage(images.terra2, 1188, 610, 40, 40)
      context.drawImage(images.terra4, 1208, 610, 40, 40)
      context.drawImage(images.terra1, 1248, 610, 40, 40)
      context.drawImage(images.terra1, 588, 650, 40, 40)
      context.drawImage(images.terra1, 628, 650, 40, 40)
      context.drawImage(images.terra3, 668, 650, 40, 40)
      context.drawImage(images.terra2, 708, 650, 40, 40)
      context.drawImage(images.terra4, 748, 650, 40, 40)
      context.drawImage(images.terra1, 788, 650, 40, 40)
      context.drawImage(images.terra1, 828, 650, 40, 40)
      context.drawImage(images.terra3, 868, 650, 40, 40)
      context.drawImage(images.terra2, 908, 650, 40, 40)
      context.drawImage(images.terra4, 948, 650, 40, 40)
      context.drawImage(images.terra2, 908, 690, 40, 40)
      context.drawImage(images.terra2, 908, 730, 40, 40)
      context.drawImage(images.terra2, 948, 690, 40, 40)
      context.drawImage(images.terra2, 948, 730, 40, 40)
      context.drawImage(images.terra2, 988, 690, 40, 40)
      context.drawImage(images.terra2, 988, 730, 40, 40)
      
      context.drawImage(images.terra2, 908, 770, 40, 40)
      context.drawImage(images.terra2, 908, 810, 40, 40)
      context.drawImage(images.terra2, 948, 770, 40, 40)
      context.drawImage(images.terra2, 948, 810, 40, 40)
      context.drawImage(images.terra2, 988, 770, 40, 40)
      context.drawImage(images.terra2, 988, 810, 40, 40)
      context.drawImage(images.terra2, 908, 850, 40, 40)
      context.drawImage(images.terra2, 908, 890, 40, 40)
      context.drawImage(images.terra2, 948, 850, 40, 40)
      context.drawImage(images.terra2, 948, 890, 40, 40)
      context.drawImage(images.terra2, 988, 850, 40, 40)
      context.drawImage(images.terra2, 988, 890, 40, 40)

      context.drawImage(images.terra1, 988, 650, 40, 40)
      context.drawImage(images.terra1, 1028, 650, 40, 40)
      context.drawImage(images.terra3, 1068, 650, 40, 40)
      context.drawImage(images.terra2, 1108, 650, 40, 40)
      context.drawImage(images.terra4, 1148, 650, 40, 40)
      context.drawImage(images.terra2, 1188, 650, 40, 40)
      context.drawImage(images.terra4, 1208, 650, 40, 40)
      context.drawImage(images.terra1, 1248, 650, 40, 40)
      context.drawImage(images.terra1, 1288, 650, 40, 40)

      //vertical direita
      context.drawImage(images.terra1, 1288, 270, 40, 40)
      context.drawImage(images.terra1, 1288, 310, 40, 40)
      context.drawImage(images.terra3, 1288, 350, 40, 40)
      context.drawImage(images.terra2, 1288, 390, 40, 40)
      context.drawImage(images.terra4, 1288, 410, 40, 40)
      context.drawImage(images.terra1, 1288, 450, 40, 40)
      context.drawImage(images.terra1, 1288, 490, 40, 40)
      context.drawImage(images.terra3, 1288, 530, 40, 40)
      context.drawImage(images.terra2, 1288, 570, 40, 40)
      context.drawImage(images.terra4, 1288, 610, 40, 40)

      context.drawImage(images.terra4, 1318, 410, 40, 40)
      context.drawImage(images.terra1, 1318, 450, 40, 40)
      context.drawImage(images.terra1, 1318, 490, 40, 40)
      context.drawImage(images.terra1, 1318, 530, 40, 40)
      context.drawImage(images.terra2, 1318, 570, 40, 40)
      context.drawImage(images.terra4, 1318, 610, 40, 40)
      

      context.drawImage(images.terra1, 1358, 450, 40, 40)
      context.drawImage(images.terra1, 1358, 490, 40, 40)
      context.drawImage(images.terra1, 1358, 530, 40, 40)
      context.drawImage(images.terra2, 1358, 570, 40, 40)
      context.drawImage(images.terra1, 1398, 450, 40, 40)
      context.drawImage(images.terra1, 1398, 490, 40, 40)
      context.drawImage(images.terra1, 1398, 530, 40, 40)
      context.drawImage(images.terra2, 1398, 570, 40, 40)
      context.drawImage(images.terra1, 1438, 490, 40, 40)
      context.drawImage(images.terra1, 1438, 530, 40, 40)
      context.drawImage(images.terra1, 1478, 490, 40, 40)
      context.drawImage(images.terra1, 1478, 530, 40, 40)
      context.drawImage(images.terra1, 1518, 490, 40, 40)
      context.drawImage(images.terra1, 1518, 530, 40, 40)
      context.drawImage(images.terra1, 1558, 490, 40, 40)
      context.drawImage(images.terra1, 1558, 530, 40, 40)
      context.drawImage(images.terra1, 1598, 490, 40, 40)
      context.drawImage(images.terra1, 1598, 530, 40, 40)
      context.drawImage(images.terra1, 1618, 490, 40, 40)
      context.drawImage(images.terra1, 1618, 530, 40, 40)
      context.drawImage(images.terra1, 1658, 490, 40, 40)
      context.drawImage(images.terra1, 1658, 530, 40, 40)
      context.drawImage(images.terra1, 1698, 490, 40, 40)
      context.drawImage(images.terra1, 1698, 530, 40, 40)
      context.drawImage(images.terra1, 1738, 490, 40, 40)
      context.drawImage(images.terra1, 1738, 530, 40, 40)
      context.drawImage(images.terra1, 1778, 490, 40, 40)
      context.drawImage(images.terra1, 1778, 530, 40, 40)
      context.drawImage(images.terra1, 1818, 490, 40, 40)
      context.drawImage(images.terra1, 1818, 530, 40, 40)
      context.drawImage(images.terra1, 1858, 490, 40, 40)
      context.drawImage(images.terra1, 1858, 530, 40, 40)
      context.drawImage(images.terra1, 1898, 490, 40, 40)
      context.drawImage(images.terra1, 1898, 530, 40, 40)
      
      //Elementos do mapa

      context.drawImage(images.pedra2, 120, 150, 15, 15)
      context.drawImage(images.pedra1, 230, 670, 10, 10)
      context.drawImage(images.pedra2, 180, 120, 12, 12)
      context.drawImage(images.pedra2, 880, 150, 18, 18)
      context.drawImage(images.pedra2, 1500, 150, 20, 20)
      context.drawImage(images.pedra2, 1700, 130, 15, 15)
      context.drawImage(images.pedra2, 100, 520, 14, 14)
      context.drawImage(images.pedra1, 180, 580, 22, 22)
      context.drawImage(images.pedra2, 650, 480, 16, 16)
      context.drawImage(images.pedra2, 1500, 520, 17, 17)
      context.drawImage(images.pedra2, 150, 750, 18, 18)
      context.drawImage(images.pedra2, 950, 780, 15, 15)
      context.drawImage(images.pedra2, 1200, 730, 10, 10)
      context.drawImage(images.pedra1, 1300, 780, 30, 30)
      context.drawImage(images.pedra2, 1500, 750, 20, 20)
      context.drawImage(images.pedra1, 1600, 780, 25, 25)

      context.drawImage(images.tronco, 258, 470, 40, 40)
      context.drawImage(images.tronco2, 290, 580, 70, 30)
      context.drawImage(images.tronco1, 200, 750, 40, 40)
      context.drawImage(images.tronco, 258, 470, 40, 40)
      context.drawImage(images.tronco, 258, 470, 40, 40)
      context.drawImage(images.arbusto2, 950, 500, 60, 40)
      context.drawImage(images.arbusto2, 705, 520, 30, 20)
      context.drawImage(images.arbusto2, 1200, 520, 30, 20)
     
      
      context.drawImage(images.arbusto1, 1710, 390, 50, 40)
      context.drawImage(images.arbusto, 1410, 710, 50, 40)
      context.drawImage(images.arbusto, 720, 750, 50, 40)
      context.drawImage(images.arbusto1, 800, 810, 50, 40)
      context.drawImage(images.arbusto1, 1770, 130, 50, 40)
      context.drawImage(images.arbusto2, 1440, 380, 50, 40)
      context.drawImage(images.arbusto, 110, 330, 50, 40)
      
      context.drawImage(images.arbusto1, 1180, 790, 60, 40)
      context.drawImage(images.arbusto1, 1030, 70, 60, 40)
      

      context.drawImage(images.lamp, 565, 350, 30, 50)
      context.drawImage(images.lamp, 1270, 550, 30, 50)
      context.drawImage(images.mulher, 705, 240, 80, 100)
      context.drawImage(images.mulher1, 1200, 300, 90, 100)
      context.drawImage(images.homem, 300, 400, 100, 100)
      context.drawImage(images.homem1, 1600, 500, 100, 100)
      context.drawImage(images.homem2, 500, 700, 100, 100)
      context.drawImage(images.arvore1, 1500, 200, 150, 150)
      context.drawImage(images.arvore1, 200, 200, 150, 150)
      context.drawImage(images.arvore2, 70, 190, 50, 50)
      context.drawImage(images.arvore2, 130, 670, 50, 50)
      context.drawImage(images.arvore2, 330, 60, 50, 50)
      context.drawImage(images.arvore2, 330, 780, 50, 50)
      context.drawImage(images.arvore1, 20, 500, 150, 150)
      context.drawImage(images.barraca, 380, 320, 130, 130)
      context.drawImage(images.github, 718, 200, 60, 50)

      // Desenhar bandeira animada (apenas quando carregada)
      if (images.bandeira.complete) {
        if (!bandeiraCarregadaRef.current) {
          bandeiraCarregadaRef.current = true
        }

        flagAnimationRef.current.time += flagAnimationRef.current.animationSpeed
        flagAnimationRef.current.frame = Math.floor(flagAnimationRef.current.time) % flagAnimationRef.current.frameCount

        context.drawImage(
          images.bandeira,
          flagAnimationRef.current.frame * flagAnimationRef.current.frameWidth,
          0,
          flagAnimationRef.current.frameWidth,
          flagAnimationRef.current.frameHeight,
          1450, // Posição X da bandeira
          200, // Posição Y da bandeira
          flagAnimationRef.current.frameWidth,
          flagAnimationRef.current.frameHeight,
        )
        context.drawImage(
          images.bandeira,
          flagAnimationRef.current.frame * flagAnimationRef.current.frameWidth,
          0,
          flagAnimationRef.current.frameWidth,
          flagAnimationRef.current.frameHeight,
          1150, // Posição X da bandeira
          200, // Posição Y da bandeira
          flagAnimationRef.current.frameWidth,
          flagAnimationRef.current.frameHeight,
        )
        context.drawImage(
          images.bandeira,
          flagAnimationRef.current.frame * flagAnimationRef.current.frameWidth,
          0,
          flagAnimationRef.current.frameWidth,
          flagAnimationRef.current.frameHeight,
          750, // Posição X da bandeira
          200, // Posição Y da bandeira
          flagAnimationRef.current.frameWidth,
          flagAnimationRef.current.frameHeight,
        )
        context.drawImage(
          images.bandeira,
          flagAnimationRef.current.frame * flagAnimationRef.current.frameWidth,
          0,
          flagAnimationRef.current.frameWidth,
          flagAnimationRef.current.frameHeight,
          450, // Posição X da bandeira
          200, // Posição Y da bandeira
          flagAnimationRef.current.frameWidth,
          flagAnimationRef.current.frameHeight,
        )
      }
      if (images.fogueira1.complete) {
        if (!fogueiraCarregadaRef.current) {
          fogueiraCarregadaRef.current = true
        }

        fogueiraa.current.time += fogueiraa.current.animationSpeed
        fogueiraa.current.frame = Math.floor(fogueiraa.current.time) % fogueiraa.current.frameCount

        context.drawImage(
          images.fogueira1,
          fogueiraa.current.frame * fogueiraa.current.frameWidth,
          0,
          fogueiraa.current.frameWidth,
          fogueiraa.current.frameHeight,
          335, //
          513, //
          fogueiraa.current.frameWidth,
          fogueiraa.current.frameHeight,
        )
      }

      if (images.fogueira.complete) {
        if (!fogueira1CarregadaRef.current) {
          fogueira1CarregadaRef.current = true
        }

        fogueiraa.current.time += fogueiraa.current.animationSpeed
        fogueiraa.current.frame = Math.floor(fogueiraa.current.time) % fogueiraa.current.frameCount

        context.drawImage(
          images.fogueira,
          fogueiraa.current.frame * fogueiraa.current.frameWidth,
          0,
          fogueiraa.current.frameWidth,
          fogueiraa.current.frameHeight,
          1630, //
          600, //
          fogueiraa.current.frameWidth,
          fogueiraa.current.frameHeight,
        )
      }
      context.drawImage(images.github, 718, 200, 60, 50)
      // Desenhar personagem
      const currentImage = images[directionRef.current as keyof typeof images] || images.down
      context.drawImage(currentImage, posRef.current.x, posRef.current.y, 64, 64)

      // Desenhar plantas por cima do personagem
      context.drawImage(images.planta, 700, 200, 1200, 1200)
      context.drawImage(images.planta, 1075, 370, 600, 600)
      context.drawImage(images.planta, 580, 370, 600, 600)
      context.drawImage(images.arbusto1, 1190, 520, 30, 20)
      context.drawImage(images.arbusto, 930, 500, 60, 40)
      context.drawImage(images.arbusto1, 690, 520, 30, 20)
        context.drawImage(images.house, 500, 20, 254, 254)
      context.drawImage(images.house, 1200, 20, 254, 254)

      animationFrameId = requestAnimationFrame(draw)
    }

    Promise.all(
      Object.values(images).map((img) =>
        img.decode().catch(() => {
          console.warn("Erro ao carregar imagem:", img.src)
        }),
      ),
    ).then(draw)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      window.removeEventListener("keydown", handleEscClose)
      cancelAnimationFrame(animationFrameId) // Adicione esta linha para limpar o requestAnimationFrame
    }
  }, [modalContent]) // Remova showModal daqui, pois agora modalContent controla a visibilidade do modal

  const closeModal = () => {
    setModalContent(null)
    showModalRef.current = false // Garante que a interação possa ocorrer novamente
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          border: "none",
          margin: 0,
          padding: 0,
          display: "block",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          background: "rgba(255, 255, 255, 0.7)",
          padding: "10px",
          borderRadius: "5px",
          zIndex: 1000,
          fontFamily: "sans-serif",
          fontSize: "14px",
        }}
      >
        Coordenadas: X: {Math.round(renderPos.x)}, Y: {Math.round(renderPos.y)}
      </div>

      {showWelcomePopup && (
        <div
          style={{
            position: "absolute",
            top: renderPos.y - 100,
            left: renderPos.x,
            background: "white",
            color: "black",
            padding: "6px 12px",
            borderRadius: "4px",
            transform: "translateX(-35%)",
            pointerEvents: "none",
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
            position: "absolute",
            top: nearNPCRef.current.y - 50,
            left: nearNPCRef.current.x,
            background: "white",
            color: "black",
            padding: "8px 16px",
            borderRadius: "8px",
            transform: "translateX(-50%)",
            pointerEvents: "none",
            zIndex: 10,
            border: "2px solid #4a90e2",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            maxWidth: "200px",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          {nearNPCRef.current.message}
          <div
            style={{
              position: "absolute",
              bottom: -10,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "10px solid white",
            }}
          />
        </div>
      )}

      {modalContent && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            fontSize:"200px",
            transform: "translate(-50%, -50%)",
            background: "rgba(255, 255, 255, 0.6)",
            color: "rgba(0, 0, 0, 0.51)",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            zIndex: 20,
            minWidth: "800px",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
          }}
        >
          <button
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            X
          </button>
          <div dangerouslySetInnerHTML={{ __html: modalContent }} />
        </div>
      )}
    </div>
  )
}

export default App
