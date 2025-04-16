import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';

export const ComputationalCore = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create a more detailed core geometry
    const coreGeometry = new THREE.IcosahedronGeometry(2, 4);
    const coreMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color('#9C27B0') }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float time;
        
        void main() {
          vNormal = normal;
          vPosition = position;
          
          // Add wave effect
          vec3 newPosition = position;
          newPosition += normal * sin(time * 2.0 + position.y) * 0.1;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float time;
        uniform vec3 color;
        
        void main() {
          // Create energy pulse effect
          float pulse = sin(time * 3.0 - length(vPosition)) * 0.5 + 0.5;
          
          // Create holographic grid pattern
          float grid = 0.05 * (
            sin(vPosition.x * 10.0 + time) +
            sin(vPosition.y * 10.0 + time) +
            sin(vPosition.z * 10.0 + time)
          );
          
          vec3 finalColor = color + vec3(grid) + vec3(pulse * 0.3);
          
          // Add fresnel effect
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
          finalColor += vec3(fresnel * 0.5);
          
          gl_FragColor = vec4(finalColor, 0.95);
        }
      `,
      transparent: true
    });

    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add point lights
    const lights = [
      { color: 0x9C27B0, position: [5, 5, 5] },
      { color: 0x2196F3, position: [-5, -5, 5] },
      { color: 0xFF4081, position: [5, -5, -5] }
    ];

    lights.forEach(light => {
      const pointLight = new THREE.PointLight(light.color, 1, 20);
      pointLight.position.set(...light.position);
      scene.add(pointLight);
    });

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      core.rotation.x += 0.005;
      core.rotation.y += 0.005;

      coreMaterial.uniforms.time.value += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-black">
      <div ref={containerRef} className="absolute inset-0" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white p-8 bg-black bg-opacity-50 rounded-lg backdrop-blur-lg">
          <h1 className="text-4xl font-bold mb-4">Computational Core</h1>
          <p className="text-xl mb-6">The central nexus of our advanced computing infrastructure</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Return to Overview
          </button>
        </div>
      </div>
    </div>
  );
};