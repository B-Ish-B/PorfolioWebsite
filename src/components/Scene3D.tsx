import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
interface Node {
  position: [number, number, number];
  color: string;
  category: string;
  title: string;
  orbitRadius: number;
  orbitSpeed: number;
  phase: number;
  orbitAxis?: [number, number, number]; // Axis of rotation for orbit
  orbitPlane?: number; // Angle of the orbital plane in radians
}
// Central Core node will be created separately

const nodes: Node[] = [
// First Orbit - AI/ML Spectrum
{
  position: [3, 0, 0],
  color: '#FF5252', // Bright Red
  category: 'AI',
  title: 'Neural Networks',
  orbitRadius: 3,
  orbitSpeed: 0.4,
  phase: 0,
  orbitPlane: 0 // Orbital plane angle
},
{
  position: [0, 3, 0],
  color: '#FF9800', // Orange
  category: 'AI',
  title: 'Deep Learning',
  orbitRadius: 3,
  orbitSpeed: 0.4,
  phase: Math.PI,
  orbitPlane: 0
},

// Second Orbit - Financial Models (different plane)
{
  position: [0, 0, 3.5],
  color: '#2196F3', // Blue
  category: 'Finance',
  title: 'Algorithmic Trading',
  orbitRadius: 3.5,
  orbitSpeed: 0.3,
  phase: Math.PI / 2,
  orbitPlane: Math.PI / 3 // Tilted orbital plane
},
{
  position: [0, 0, -3.5],
  color: '#4CAF50', // Green
  category: 'Finance',
  title: 'Quantitative Analysis',
  orbitRadius: 3.5,
  orbitSpeed: 0.3,
  phase: 3 * Math.PI / 2,
  orbitPlane: Math.PI / 3
},

// Third Orbit - Computer Engineering (different plane)
{
  position: [4, 0, 0],
  color: '#FFEB3B', // Yellow
  category: 'CompEng',
  title: 'Parallel Computing',
  orbitRadius: 4,
  orbitSpeed: 0.25,
  phase: 0,
  orbitPlane: Math.PI / 4
},
{
  position: [-4, 0, 0],
  color: '#E91E63', // Pink
  category: 'CompEng',
  title: 'Distributed Systems',
  orbitRadius: 4,
  orbitSpeed: 0.25,
  phase: Math.PI,
  orbitPlane: Math.PI / 4
},

// Fourth Orbit - Data Science (different plane)
{
  position: [0, 4.5, 0],
  color: '#00BCD4', // Cyan
  category: 'DataSci',
  title: 'Big Data Analytics',
  orbitRadius: 4.5,
  orbitSpeed: 0.2,
  phase: Math.PI / 2,
  orbitPlane: -Math.PI / 6
},
{
  position: [0, -4.5, 0],
  color: '#FFC107', // Amber
  category: 'DataSci',
  title: 'Predictive Modeling',
  orbitRadius: 4.5,
  orbitSpeed: 0.2,
  phase: 3 * Math.PI / 2,
  orbitPlane: -Math.PI / 6
}];

// Define trail properties
const trailLength = 75; // Increased number of points for smoother trails
const nodeTrails = [];
// Trail fade configuration
const trailFadeStep = 0.95; // Controls how quickly trail opacity fades (0-1)
export const Scene3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const hoveredNodeRef = useRef<THREE.Mesh | null>(null);
  const timeRef = useRef(0);
  const animationFrameRef = useRef<number>();
  const nodeObjectsRef = useRef<THREE.Mesh[]>([]);
  const nodeObjects: THREE.Mesh[] = [];
  const glowMaterials = useRef<THREE.ShaderMaterial[]>([]);
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const composerRef = useRef<EffectComposer>();
  const controlsRef = useRef<OrbitControls>();

  useEffect(() => {
    if (!mountRef.current) return;
    const scene = new THREE.Scene();
    // Create a darker background with stars
    scene.background = new THREE.Color('#000000');
    
    // Initialize camera and renderer first
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;
    
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    
    // Position camera
    camera.position.set(0, 0, 6);
    camera.lookAt(0, 0, 0);
    
    // Initialize EffectComposer and passes
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    composerRef.current = composer;
    rendererRef.current = renderer;
    
    // Create environment map for realistic reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    
    // Create a simple environment map
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color('#000011');
    
    // Add some colored lights to create reflections
    const envLights = [
      { color: '#4B0082', position: [5, 5, 5] },
      { color: '#0000FF', position: [-5, -5, 5] },
      { color: '#800080', position: [5, -5, -5] },
      { color: '#4169E1', position: [-5, 5, -5] }
    ];
    
    envLights.forEach(light => {
      const pointLight = new THREE.PointLight(light.color, 1, 20);
      pointLight.position.set(...light.position);
      envScene.add(pointLight);
    });
    
    const envMap = pmremGenerator.fromScene(envScene).texture;
    scene.environment = envMap;
    
    // Create textures directory if it doesn't exist
    const createTexturesDir = async () => {
      try {
        // Create hardware.jpg, data-analytics.jpg, and core-processor.jpg textures
        const hardwareTexture = textureLoader.load('/textures/hardware.jpg', (texture) => {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        });
        
        const dataAnalyticsTexture = textureLoader.load('/textures/data-analytics.jpg', (texture) => {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        });
        
        const coreProcessorTexture = textureLoader.load('/textures/core-processor.jpg', (texture) => {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        });
      } catch (error) {
        console.error('Error loading textures:', error);
      }
    };
    
    createTexturesDir();
    
    // Add stars to the background
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });
    
    const starsVertices = [];
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      starsVertices.push(x, y, z);
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = true;
    controls.maxDistance = 10;
    controls.minDistance = 3;
    controlsRef.current = controls;
    nodeObjectsRef.current = [];
    glowMaterials.current = [];
    // Create textures for different node categories
    const textureLoader = new THREE.TextureLoader();
    
    // Create high-quality textures for nodes
    const neuralNetworkTexture = textureLoader.load('/textures/neural-network.jpg', (texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    });
    
    const financeTexture = textureLoader.load('/textures/finance-algo.jpg', (texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    });
    
    const systemsTexture = textureLoader.load('/textures/hardware.jpg', (texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    });
    
    const dataTexture = textureLoader.load('/textures/data-analytics.jpg', (texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    });
    
    const coreTexture = textureLoader.load('/textures/core-processor.jpg', (texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    });
    
    // Create the central Core node (purple)
    const aetherGeometry = new THREE.SphereGeometry(0.8, 64, 64);
    const aetherMaterial = new THREE.MeshPhysicalMaterial({
      color: '#9C27B0', // Purple color for Core
      map: coreTexture,
      transparent: true,
      opacity: 0.95,
      roughness: 0.05,
      metalness: 0.95,
      emissive: new THREE.Color('#9C27B0').multiplyScalar(0.6),
      envMapIntensity: 2.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      bumpMap: coreTexture,
      bumpScale: 0.08,
      normalScale: new THREE.Vector2(0.15, 0.15),
      depthWrite: true,
      depthTest: true
    });
    
    const aetherNode = new THREE.Mesh(aetherGeometry, aetherMaterial);
    aetherNode.position.set(0, 0, 0); // Center position
    aetherNode.userData = {
      title: 'Computational Core',
      category: 'Core',
      originalColor: '#9C27B0',
      isAnimating: false
    };
    nodeObjectsRef.current.push(aetherNode);
    nodeObjects.push(aetherNode);
    scene.add(aetherNode);
    
    // Add glow effect to Aether node
    const aetherGlowGeometry = new THREE.SphereGeometry(1.2, 64, 64);
    const aetherGlowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: {
          value: new THREE.Color('#9C27B0')
        },
        viewVector: {
          value: new THREE.Vector3()
        },
        time: { 
          value: 0.0 
        }
      },
      vertexShader: `
        uniform vec3 viewVector;
        uniform float time;
        varying float intensity;
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          vec3 vNormal = normalize(normalMatrix * normal);
          vec3 vNormalized = normalize(viewVector);
          // Add pulsing effect based on time
          float pulse = 1.0 + 0.2 * sin(time * 0.5);
          intensity = pow(1.0 - abs(dot(vNormal, vNormalized)), 2.5) * pulse;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        uniform float time;
        varying float intensity;
        varying vec3 vPosition;
        void main() {
          // Create a more dynamic glow with subtle variation
          float dynamicGlow = intensity * (3.0 + 0.5 * sin(time * 0.3 + length(vPosition)));
          vec3 finalColor = glowColor * dynamicGlow;
          gl_FragColor = vec4(finalColor, 1.0) * dynamicGlow;
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    });
    glowMaterials.push(aetherGlowMaterial);
    const aetherGlowMesh = new THREE.Mesh(aetherGlowGeometry, aetherGlowMaterial);
    aetherNode.add(aetherGlowMesh);
    
    // Initialize trails for each node
    nodes.forEach((node, index) => {
      // Create trail geometry
      const trailGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(trailLength * 3);
      const colors = new Float32Array(trailLength * 3);
      
      // Initialize positions with node's starting position
      for (let i = 0; i < trailLength; i++) {
        positions[i * 3] = node.position[0];
        positions[i * 3 + 1] = node.position[1];
        positions[i * 3 + 2] = node.position[2];
        
        // Enhanced gradient effect with improved fade
        const color = new THREE.Color(node.color);
        const endColor = new THREE.Color(0x000000); // Fade to black for better contrast
        
        // Use a non-linear fade for more dramatic effect
        // This creates a longer bright section that fades more quickly at the end
        const fadeRatio = Math.pow(i / trailLength, 1.5); // Non-linear fade
        const opacity = Math.max(0, 1 - fadeRatio);
        
        // Interpolate between colors for gradient effect
        const gradientColor = new THREE.Color().lerpColors(color, endColor, fadeRatio);
        
        // Apply opacity with a glow effect for the head of the trail
        const glowFactor = i < 5 ? 1.2 : 1.0; // Brighter head of trail
        
        colors[i * 3] = gradientColor.r * opacity * glowFactor;
        colors[i * 3 + 1] = gradientColor.g * opacity * glowFactor;
        colors[i * 3 + 2] = gradientColor.b * opacity * glowFactor;
      }
      
      trailGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      trailGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      
      // Create trail material with vertex colors for gradient effect
      const trailMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        linewidth: 2.0, // Note: This has limited effect in WebGL
        depthWrite: false, // Ensures trails render behind nodes
        depthTest: true // Enable depth testing for proper occlusion
      });
      
      const trail = new THREE.Line(trailGeometry, trailMaterial);
      scene.add(trail);
      
      // Store trail information
      nodeTrails.push({
        line: trail,
        positions: positions,
        colors: colors,
        index: 0,
        full: false
      });
    });
    
    // Create node geometries
    nodes.forEach((node, index) => {
      let geometry;
      let material;
      
      // All nodes are spheres with different colors and textures
      geometry = new THREE.SphereGeometry(0.25, 32, 32);
      
      // Select texture based on category
      let nodeTexture;
      switch(node.category) {
        case 'AI':
          nodeTexture = neuralNetworkTexture;
          break;
        case 'Finance':
          nodeTexture = financeTexture;
          break;
        case 'CompEng':
          nodeTexture = systemsTexture;
          break;
        case 'DataSci':
          nodeTexture = dataTexture;
          break;
        default:
          nodeTexture = coreTexture;
      }
      
      material = new THREE.MeshPhysicalMaterial({
        color: node.color,
        map: nodeTexture,
        transparent: true,
        opacity: 0.95,
        roughness: 0.1,
        metalness: 0.9,
        emissive: new THREE.Color(node.color).multiplyScalar(0.5),
        envMapIntensity: 2.0,
        clearcoat: 0.8,
        clearcoatRoughness: 0.2,
        bumpMap: nodeTexture,
        bumpScale: 0.05,
        depthWrite: true, // Ensures proper depth sorting
        depthTest: true
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(...node.position);
      sphere.userData = {
        title: node.title,
        category: node.category,
        originalColor: node.color,
        orbitRadius: node.orbitRadius,
        orbitSpeed: node.orbitSpeed,
        phase: node.phase,
        isAnimating: true
      };
      nodeObjects.push(sphere);
      scene.add(sphere);
      const glowGeometry = new THREE.SphereGeometry(0.3, 32, 32);
      const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          glowColor: {
            value: new THREE.Color(node.color)
          },
          viewVector: {
            value: new THREE.Vector3()
          }
        },
        vertexShader: `
          uniform vec3 viewVector;
          varying float intensity;
          void main() {
            vec3 vNormal = normalize(normalMatrix * normal);
            vec3 vNormalized = normalize(viewVector);
            intensity = pow(1.0 - abs(dot(vNormal, vNormalized)), 3.0);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 glowColor;
          uniform float time;
          varying float intensity;
          varying vec3 vPosition;
          void main() {
            // Create a more dynamic glow with subtle variation
            float dynamicGlow = intensity * (2.0 + 0.3 * sin(time * 0.5 + length(vPosition)));
            vec3 finalColor = glowColor * dynamicGlow;
            gl_FragColor = vec4(finalColor, 1.0) * dynamicGlow;
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });
      glowMaterials.push(glowMaterial);
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      sphere.add(glowMesh);
    });
    // No connections between nodes - removed as per requirements
    // No connections or orbital rings as per requirements
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    camera.position.z = 5;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const onMouseMove = (event: MouseEvent) => {
      if (!rendererRef.current || !cameraRef.current) return;
      const rect = rendererRef.current.domElement.getBoundingClientRect();
      mouse.x = (event.clientX - rect.left) / rect.width * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, cameraRef.current);
      const intersects = raycaster.intersectObjects(nodeObjectsRef.current);
      if (intersects.length > 0) {
        const newHoveredNode = intersects[0].object as THREE.Mesh;
        if (hoveredNodeRef.current !== newHoveredNode) {
          if (hoveredNodeRef.current) {
            const material = hoveredNodeRef.current.material as THREE.MeshPhongMaterial;
            material.opacity = 0.8;
            hoveredNodeRef.current.userData.isAnimating = true;
          }
          hoveredNodeRef.current = newHoveredNode;
          const material = hoveredNodeRef.current.material as THREE.MeshPhongMaterial;
          material.opacity = 1;
          hoveredNodeRef.current.userData.isAnimating = false;
          if (tooltipRef.current) {
            tooltipRef.current.style.display = 'block';
            tooltipRef.current.style.left = event.clientX + 10 + 'px';
            tooltipRef.current.style.top = event.clientY + 10 + 'px';
            
            // Enhanced tooltip with category-specific styling
            const category = hoveredNodeRef.current.userData.category;
            const title = hoveredNodeRef.current.userData.title;
            
            // Category-specific icons and descriptions
            let categoryIcon = '';
            let description = '';
            
            switch(category) {
              case 'Core':
                categoryIcon = '🧠';
                description = 'The central computational hub integrating all technologies';
                break;
              case 'AI':
                categoryIcon = '🤖';
                description = 'Advanced artificial intelligence and machine learning technologies';
                break;
              case 'Finance':
                categoryIcon = '📈';
                description = 'Sophisticated financial modeling and algorithmic trading systems';
                break;
              case 'CompEng':
                categoryIcon = '💻';
                description = 'Computer engineering innovations and distributed computing architectures';
                break;
              case 'DataSci':
                categoryIcon = '📊';
                description = 'Data science methodologies and predictive analytics frameworks';
                break;
              default:
                categoryIcon = '🔮';
                description = 'Specialized computational technology'
            }
            
            tooltipRef.current.innerHTML = `
              <div class="font-bold text-md">${categoryIcon} ${title}</div>
              <div class="text-xs opacity-80">${category}</div>
              <div class="text-xs mt-1">${description}</div>
            `;
          }
        }
      } else {
        if (hoveredNodeRef.current) {
          const material = hoveredNodeRef.current.material as THREE.MeshPhongMaterial;
          material.opacity = 0.8;
          hoveredNodeRef.current.userData.isAnimating = true;
          hoveredNodeRef.current = null;
          if (tooltipRef.current) {
            tooltipRef.current.style.display = 'none';
          }
        }
      }
    };
    const onClick = () => {
      if (hoveredNodeRef.current) {
        const node = hoveredNodeRef.current;
        if (node.userData.category === 'Core') {
          // Disable controls during transition
          controls.enabled = false;
          
          // Store initial camera state
          const startPosition = camera.position.clone();
          const startRotation = camera.quaternion.clone();
          
          // Calculate target position closer to the core
          const targetPosition = new THREE.Vector3(0, 0, 1.5);
          
          // Create a target quaternion for camera to look at core
          const targetQuaternion = new THREE.Quaternion();
          const targetMatrix = new THREE.Matrix4().lookAt(
            targetPosition,
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 1, 0)
          );
          targetQuaternion.setFromRotationMatrix(targetMatrix);
          
          // Animation duration in milliseconds
          const duration = 2000;
          const startTime = Date.now();
          
          // Create depth-of-field effect
          const bokehPass = new THREE.BokehPass(scene, camera, {
            focus: 1.0,
            aperture: 0.025,
            maxblur: 1.0
          });
          
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Smooth easing function
            const eased = progress < 0.5
              ? 2 * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            
            // Interpolate camera position and rotation
            camera.position.lerpVectors(startPosition, targetPosition, eased);
            camera.quaternion.slerpQuaternion(startRotation, targetQuaternion, eased);
            
            // Fade out other nodes
            nodeObjects.forEach((otherNode) => {
              if (otherNode !== node) {
                const material = otherNode.material as THREE.MeshPhysicalMaterial;
                material.opacity = Math.max(0, 1 - eased);
              }
            });
            
            // Update bokeh effect
            bokehPass.uniforms.focus.value = 1.0 + eased * 2;
            bokehPass.uniforms.aperture.value = eased * 0.025;
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              // Transition complete, navigate to core page
              window.location.href = '/computational-core';
            }
          };
          
          animate();
        } else {
          const material = node.material as THREE.MeshPhongMaterial;
          material.emissive.setHex(0x444444);
          const targetPosition = new THREE.Vector3();
          node.getWorldPosition(targetPosition);
          const startPosition = camera.position.clone();
          const startRotation = camera.quaternion.clone();
        const targetQuaternion = new THREE.Quaternion();
        camera.lookAt(targetPosition);
        camera.getWorldQuaternion(targetQuaternion);
        camera.position.copy(startPosition);
        camera.quaternion.copy(startRotation);
        
        const duration = 1000;
        const startTime = Date.now();
        const animateCamera = () => {
          if (!cameraRef.current) return;
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
          cameraRef.current.position.lerp(targetPosition.clone().normalize().multiplyScalar(3), ease);
          cameraRef.current.quaternion.slerp(targetQuaternion, ease);
          
          if (progress < 1) {
            requestAnimationFrame(animateCamera);
          } else {
            // Reset after 3 seconds
            setTimeout(() => {
              material.emissive.setHex(0x000000);
            }, 500);
          }
        };
        animateCamera();
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('click', onClick);
    // Update trails for each node
    const updateTrails = () => {
      nodes.forEach((node, index) => {
        // Calculate new position based on orbit
        const time = timeRef.current;
        const orbitRadius = node.orbitRadius;
        const orbitSpeed = node.orbitSpeed;
        const phase = node.phase;
        const orbitPlane = node.orbitPlane || 0;
        
        // Calculate position based on orbital plane
        const x = orbitRadius * Math.cos(time * orbitSpeed + phase) * Math.cos(orbitPlane);
        const y = orbitRadius * Math.sin(time * orbitSpeed + phase);
        const z = orbitRadius * Math.cos(time * orbitSpeed + phase) * Math.sin(orbitPlane);
        
        // Update node position
        const nodeObject = nodeObjects[index + 1]; // +1 because index 0 is the Aether node
        if (nodeObject && nodeObject.userData.isAnimating) {
          nodeObject.position.set(x, y, z);
        }
        
        // Update trail
        const trail = nodeTrails[index];
        const positions = trail.positions;
        const colors = trail.colors;
        
        // Shift positions to make room for new point
        for (let i = trailLength - 1; i > 0; i--) {
          positions[i * 3] = positions[(i - 1) * 3];
          positions[i * 3 + 1] = positions[(i - 1) * 3 + 1];
          positions[i * 3 + 2] = positions[(i - 1) * 3 + 2];
          
          // Also update colors for gradient effect
          colors[i * 3] = colors[(i - 1) * 3];
          colors[i * 3 + 1] = colors[(i - 1) * 3 + 1];
          colors[i * 3 + 2] = colors[(i - 1) * 3 + 2];
        }
        
        // Add new position at the front
        positions[0] = x;
        positions[1] = y;
        positions[2] = z;
        
        // Add new color at the front with enhanced glow effect
        const color = new THREE.Color(node.color);
        colors[0] = color.r * 1.5; // Intensify the head of the trail
        colors[1] = color.g * 1.5;
        colors[2] = color.b * 1.5;
        
        // Apply gradient fade to the rest of the trail
        for (let i = 1; i < trailLength; i++) {
          // Non-linear fade for more dramatic effect
          const fadeRatio = Math.pow(i / trailLength, 1.5);
          const opacity = Math.max(0, 1 - fadeRatio);
          
          // Get the color at this position
          const trailColor = new THREE.Color(node.color);
          const endColor = new THREE.Color(0x000000); // Fade to black
          const gradientColor = new THREE.Color().lerpColors(trailColor, endColor, fadeRatio);
          
          // Apply the color with opacity
          colors[i * 3] = gradientColor.r * opacity;
          colors[i * 3 + 1] = gradientColor.g * opacity;
          colors[i * 3 + 2] = gradientColor.b * opacity;
        }
        
        // Update the buffer attributes
        trail.line.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        trail.line.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        trail.line.geometry.attributes.position.needsUpdate = true;
        trail.line.geometry.attributes.color.needsUpdate = true;
        
        // Ensure trails render behind nodes with proper depth sorting
        trail.line.renderOrder = -1;
        trail.line.material.depthTest = true;
        trail.line.material.depthWrite = false;
      });
    };
    
    // Main animation loop with improved performance
    const animate = () => {
      timeRef.current += 0.01;
      
      // Rotate stars slightly for subtle background movement
      stars.rotation.y += 0.0005;
      stars.rotation.x += 0.0002;
      
      // Animate the Core node (central purple node)
      aetherNode.rotation.y += 0.005;
      aetherNode.rotation.x += 0.002;
      
      // Update time uniform for animated glow effects
      glowMaterials.forEach(material => {
        if (material.uniforms.time !== undefined) {
          material.uniforms.time.value = timeRef.current;
        }
      });
      
      // Animate orbital nodes
      nodeObjects.forEach((node, index) => {
        // Skip the Core node (first node in the array)
        if (index === 0) return;
        
        if (node.userData.isAnimating) {
          const radius = node.userData.orbitRadius;
          const speed = node.userData.orbitSpeed;
          const phase = node.userData.phase;
          const orbitPlane = node.userData.orbitPlane || 0;
          
          // Calculate position based on orbital plane and phase
          const t = timeRef.current * speed + phase;
          
          // Create orbital motion in the specified plane
          const x = radius * Math.cos(t);
          const z = radius * Math.sin(t);
          
          // Apply rotation matrix to position the orbit in 3D space
          node.position.x = x * Math.cos(orbitPlane);
          node.position.y = z * Math.sin(orbitPlane);
          node.position.z = z * Math.cos(orbitPlane) - x * Math.sin(orbitPlane);
          
          // Rotate the nodes themselves
          node.rotation.x += 0.01;
          node.rotation.y += 0.01;
          node.rotation.z += 0.01;
          
          // Update trail for this node
          if (index <= nodeTrails.length) {
            const trail = nodeTrails[index - 1];
            const positions = trail.positions;
            const colors = trail.colors;
            
            // Shift all positions one step forward
            for (let i = trailLength - 1; i > 0; i--) {
              positions[i * 3] = positions[(i - 1) * 3];
              positions[i * 3 + 1] = positions[(i - 1) * 3 + 1];
              positions[i * 3 + 2] = positions[(i - 1) * 3 + 2];
            }
            
            // Add current position to the front of the trail
            positions[0] = node.position.x;
            positions[1] = node.position.y;
            positions[2] = node.position.z;
            
            // Update colors based on position in trail
            const nodeColor = new THREE.Color(node.userData.originalColor);
            for (let i = 0; i < trailLength; i++) {
              const opacity = Math.pow(trailFadeStep, i) * 0.7;
              colors[i * 3] = nodeColor.r;
              colors[i * 3 + 1] = nodeColor.g;
              colors[i * 3 + 2] = nodeColor.b * opacity;
            }
            
            // Mark trail as full after enough frames
            if (!trail.full && timeRef.current > 2) {
              trail.full = true;
            }
            
            // Update trail geometry
            const count = trail.full ? trailLength : Math.floor(timeRef.current * 20);
            trail.line.geometry.setDrawRange(0, count);
            trail.line.geometry.attributes.position.needsUpdate = true;
            trail.line.geometry.attributes.color.needsUpdate = true;
          }
        }
      });
      
      // Collision detection and avoidance
      const collisionDistance = 0.6; // Minimum distance between nodes
      for (let i = 1; i < nodeObjectsRef.current.length; i++) {
        for (let j = i + 1; j < nodeObjectsRef.current.length; j++) {
          const nodeA = nodeObjectsRef.current[i];
          const nodeB = nodeObjectsRef.current[j];
          
          const distance = nodeA.position.distanceTo(nodeB.position);
          
          if (distance < collisionDistance) {
            // Calculate repulsion vector
            const repulsion = new THREE.Vector3()
              .subVectors(nodeA.position, nodeB.position)
              .normalize()
              .multiplyScalar((collisionDistance - distance) * 0.5);
            
            // Apply repulsion to both nodes
            nodeA.position.add(repulsion);
            nodeB.position.sub(repulsion);
          }
        }
      }
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      // Update glow effects
      glowMaterials.current.forEach((material, index) => {
        const viewVector = new THREE.Vector3().subVectors(camera.position, nodeObjectsRef.current[index].position);
        material.uniforms.viewVector.value = viewVector;
      });
      
      // Use requestAnimationFrame properly with high priority
      renderer.render(scene, camera);
      animationFrameRef.current = window.requestAnimationFrame(animateScene);
    };
    
    // Set initial camera position
    camera.position.set(0, 0, 6);
    camera.lookAt(0, 0, 0);
    
    // Add more lighting to ensure scene is visible
    const pointLight1 = new THREE.PointLight(0xffffff, 1, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xffffff, 1, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);
    
    // Define the second animation loop
    const animateScene = () => {
      timeRef.current += 0.01;
      
      // Update glow materials
      glowMaterials.forEach(material => {
        if (material.uniforms.time) {
          material.uniforms.time.value = timeRef.current;
        }
      });
      
      // Animate orbital nodes
      nodeObjects.forEach((node, index) => {
        // Skip the Core node (first node in the array)
        if (index === 0) return;
        
        if (node.userData.isAnimating) {
          const radius = node.userData.orbitRadius;
          const speed = node.userData.orbitSpeed;
          const phase = node.userData.phase;
          const orbitPlane = node.userData.orbitPlane || 0;
          
          // Calculate position based on orbital plane and phase
          const t = timeRef.current * speed + phase;
          
          // Create orbital motion in the specified plane
          const x = radius * Math.cos(t);
          const z = radius * Math.sin(t);
          
          // Apply rotation matrix to position the orbit in 3D space
          node.position.x = x * Math.cos(orbitPlane);
          node.position.y = z * Math.sin(orbitPlane);
          node.position.z = z * Math.cos(orbitPlane) - x * Math.sin(orbitPlane);
          
          // Rotate the nodes themselves
          node.rotation.x += 0.01;
          node.rotation.y += 0.01;
          node.rotation.z += 0.01;
          
          // Update trail for this node if trails exist
          if (nodeTrails.length > 0 && index <= nodeTrails.length) {
            const trail = nodeTrails[index - 1];
            if (trail && trail.positions && trail.colors) {
              const positions = trail.positions;
              const colors = trail.colors;
              
              // Shift all positions one step forward
              for (let i = trailLength - 1; i > 0; i--) {
                positions[i * 3] = positions[(i - 1) * 3];
                positions[i * 3 + 1] = positions[(i - 1) * 3 + 1];
                positions[i * 3 + 2] = positions[(i - 1) * 3 + 2];
              }
              
              // Add current position to the front of the trail
              positions[0] = node.position.x;
              positions[1] = node.position.y;
              positions[2] = node.position.z;
              
              // Update colors based on position in trail
              const nodeColor = new THREE.Color(node.userData.originalColor);
              for (let i = 0; i < trailLength; i++) {
                const opacity = Math.pow(trailFadeStep, i) * 0.7;
                colors[i * 3] = nodeColor.r;
                colors[i * 3 + 1] = nodeColor.g;
                colors[i * 3 + 2] = nodeColor.b * opacity;
              }
              
              // Mark trail as full after enough frames
              if (!trail.full && timeRef.current > 2) {
                trail.full = true;
              }
              
              // Update trail geometry
              const count = trail.full ? trailLength : Math.floor(timeRef.current * 20);
              trail.line.geometry.setDrawRange(0, count);
              trail.line.geometry.attributes.position.needsUpdate = true;
              trail.line.geometry.attributes.color.needsUpdate = true;
            }
          }
        }
      });
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      // Update glow effects
      glowMaterials.current.forEach((material, index) => {
        if (material.uniforms.viewVector && index < nodeObjectsRef.current.length && cameraRef.current) {
          const viewVector = new THREE.Vector3().subVectors(cameraRef.current.position, nodeObjectsRef.current[index].position);
          material.uniforms.viewVector.value = viewVector;
        }
      });
      
      // Render using composer for post-processing effects
      if (composerRef.current) {
        composerRef.current.render();
      }
      animationFrameRef.current = window.requestAnimationFrame(animateScene);
    };
    
    // Start the animation loop
    animateScene();
    
    // Add event listeners
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', onMouseMove);
    if (rendererRef.current) {
      rendererRef.current.domElement.addEventListener('click', onClick);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      if (rendererRef.current) {
        rendererRef.current.domElement.removeEventListener('click', onClick);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, [nodes, nodeTrails, trailLength]);
  
  return <>
      <div ref={mountRef} className="w-full h-full" />
      <div ref={tooltipRef} className="fixed hidden bg-gray-900 text-white px-4 py-2 rounded-lg text-sm pointer-events-none z-50 max-w-[250px] border border-opacity-20" style={{
        transform: 'translateZ(0)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderColor: 'rgba(255, 255, 255, 0.2)'
      }} />
    </>;
};