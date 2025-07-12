import * as THREE from 'three';
import { Heatmap3DOptions, Heatmap3DData, ThreeJSHeatmap, Keyboard3DLayout, Key3DPosition } from '../types';
import { QWERTY_3D_LAYOUT, TURKISH_F_3D_LAYOUT, findKeyPosition, calculateKeyHeight, interpolateColor, prepare3DData } from './keyboard3DLayout';

// Default 3D heatmap options
const DEFAULT_3D_OPTIONS: Required<Heatmap3DOptions> = {
  width: 800,
  height: 600,
  depth: 400,
  colorScale: ['#e3f2fd', '#1976d2'],
  showLabels: true,
  minHeight: 0.1,
  maxHeight: 3,
  keySpacing: 0.1,
  backgroundColor: '#f5f5f5',
  lightIntensity: 0.8,
  cameraPosition: [0, 8, 12],
  enableAnimation: true,
  animationDuration: 1000,
  wireframe: false,
  enableInteraction: true,
  enableOrbitControls: true,
  quality: 'high'
};

/**
 * Three.js 3D Heatmap Implementation
 */
export class ThreeJSHeatmapImpl implements ThreeJSHeatmap {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public controls: any = null;
  public mesh: THREE.Group;
  
  private options: Required<Heatmap3DOptions>;
  private layout: Keyboard3DLayout;
  private keyMeshes: Map<string, THREE.Mesh> = new Map();
  private labelMeshes: Map<string, THREE.Mesh> = new Map();
  private animationMixer: THREE.AnimationMixer | null = null;
  private currentData: Heatmap3DData | null = null;
  private isAnimating = false;
  private animationFrame: number | null = null;

  constructor(
    container: HTMLElement,
    layout: Keyboard3DLayout = QWERTY_3D_LAYOUT,
    options: Heatmap3DOptions = {}
  ) {
    this.options = { ...DEFAULT_3D_OPTIONS, ...options };
    this.layout = layout;

    // Initialize Three.js scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.options.backgroundColor);

    // Initialize camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.options.width / this.options.height,
      0.1,
      1000
    );
    this.camera.position.set(...this.options.cameraPosition);
    this.camera.lookAt(0, 0, 0);

    // Initialize renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: this.options.quality === 'high',
      alpha: true
    });
    this.renderer.setSize(this.options.width, this.options.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    container.appendChild(this.renderer.domElement);

    // Initialize mesh group
    this.mesh = new THREE.Group();
    this.scene.add(this.mesh);

    // Setup lighting
    this.setupLighting();

    // Setup controls
    if (this.options.enableOrbitControls) {
      this.setupOrbitControls();
    }

    // Create keyboard mesh
    this.createKeyboardMesh();

    // Start animation loop
    this.startAnimation();
  }

  private setupLighting(): void {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambientLight);

    // Main directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, this.options.lightIntensity);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    this.scene.add(directionalLight);

    // Fill light
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 5, -5);
    this.scene.add(fillLight);

    // Spotlight for dramatic effect
    const spotlight = new THREE.SpotLight(0xffffff, 0.5);
    spotlight.position.set(0, 15, 0);
    spotlight.angle = Math.PI / 6;
    spotlight.penumbra = 0.1;
    spotlight.castShadow = true;
    this.scene.add(spotlight);
  }

  private setupOrbitControls(): void {
    // Note: OrbitControls would need to be imported separately
    // For now, we'll implement basic mouse controls
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseDown = (event: MouseEvent) => {
      isMouseDown = true;
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!isMouseDown) return;

      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;

      // Rotate camera around the scene
      const spherical = new THREE.Spherical();
      spherical.setFromVector3(this.camera.position);
      
      spherical.theta -= deltaX * 0.01;
      spherical.phi += deltaY * 0.01;
      
      // Clamp phi to avoid flipping
      spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));
      
      this.camera.position.setFromSpherical(spherical);
      this.camera.lookAt(0, 0, 0);

      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    const onWheel = (event: WheelEvent) => {
      const distance = this.camera.position.distanceTo(new THREE.Vector3(0, 0, 0));
      const newDistance = distance + event.deltaY * 0.01;
      
      if (newDistance > 5 && newDistance < 50) {
        this.camera.position.normalize().multiplyScalar(newDistance);
      }
    };

    this.renderer.domElement.addEventListener('mousedown', onMouseDown);
    this.renderer.domElement.addEventListener('mousemove', onMouseMove);
    this.renderer.domElement.addEventListener('mouseup', onMouseUp);
    this.renderer.domElement.addEventListener('wheel', onWheel);
  }

  private createKeyboardMesh(): void {
    // Create base plate
    const baseGeometry = new THREE.BoxGeometry(
      this.layout.width,
      this.layout.baseHeight,
      this.layout.depth
    );
    const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
    const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
    baseMesh.position.set(this.layout.width / 2 - 0.5, -this.layout.baseHeight / 2, -this.layout.depth / 2);
    baseMesh.receiveShadow = true;
    this.mesh.add(baseMesh);

    // Create individual key meshes
    this.layout.keys.forEach(keyPos => {
      this.createKeyMesh(keyPos);
    });
  }

  private createKeyMesh(keyPos: Key3DPosition): void {
    // Key geometry
    const keyGeometry = new THREE.BoxGeometry(
      keyPos.width - this.options.keySpacing,
      this.layout.keyDepth,
      keyPos.height - this.options.keySpacing
    );

    // Key material
    const keyMaterial = new THREE.MeshLambertMaterial({
      color: this.options.colorScale[0],
      transparent: true,
      opacity: 0.9,
      wireframe: this.options.wireframe
    });

    // Create key mesh
    const keyMesh = new THREE.Mesh(keyGeometry, keyMaterial);
    keyMesh.position.set(
      keyPos.x,
      this.layout.keyDepth / 2 + this.options.minHeight,
      -keyPos.y
    );
    keyMesh.castShadow = true;
    keyMesh.receiveShadow = true;

    // Store mesh reference
    this.keyMeshes.set(keyPos.key, keyMesh);
    this.mesh.add(keyMesh);

    // Create label if enabled
    if (this.options.showLabels) {
      this.createKeyLabel(keyPos, keyMesh);
    }
  }

  private createKeyLabel(keyPos: Key3DPosition, keyMesh: THREE.Mesh): void {
    // Create canvas for text
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    
    // Set canvas size
    canvas.width = 128;
    canvas.height = 128;
    
    // Draw text
    context.font = '48px Arial';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(
      keyPos.key === ' ' ? 'Space' : keyPos.key.toUpperCase(),
      64,
      64
    );

    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);
    
    // Create label material
    const labelMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.8
    });

    // Create label geometry
    const labelGeometry = new THREE.PlaneGeometry(0.6, 0.6);
    const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
    
    // Position label above key
    labelMesh.position.copy(keyMesh.position);
    labelMesh.position.y += this.layout.keyDepth / 2 + 0.1;
    labelMesh.lookAt(this.camera.position);

    // Store label reference
    this.labelMeshes.set(keyPos.key, labelMesh);
    this.mesh.add(labelMesh);
  }

  private startAnimation(): void {
    const animate = () => {
      this.animationFrame = requestAnimationFrame(animate);
      
      // Update controls if available
      if (this.controls && this.controls.update) {
        this.controls.update();
      }

      // Update label orientations to face camera
      if (this.options.showLabels) {
        this.labelMeshes.forEach(label => {
          label.lookAt(this.camera.position);
        });
      }

      // Render scene
      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }

  public update(data: Heatmap3DData): void {
    this.currentData = data;
    const prepared3DData = prepare3DData(data);

    // Update each key
    this.layout.keys.forEach(keyPos => {
      const frequency = prepared3DData.frequencies[keyPos.key] || 0;
      const intensity = prepared3DData.heatmapIntensities[keyPos.key] || 0;
      
      this.updateKeyVisuals(keyPos, frequency, intensity, prepared3DData.maxFrequency);
    });
  }

  private updateKeyVisuals(
    keyPos: Key3DPosition,
    frequency: number,
    intensity: number,
    maxFrequency: number
  ): void {
    const keyMesh = this.keyMeshes.get(keyPos.key);
    if (!keyMesh) return;

    // Calculate new height
    const newHeight = calculateKeyHeight(
      frequency,
      maxFrequency,
      this.options.minHeight,
      this.options.maxHeight
    );

    // Update key height and position
    if (this.options.enableAnimation) {
      // Animate height change
      this.animateKeyHeight(keyMesh, newHeight);
    } else {
      this.setKeyHeight(keyMesh, newHeight);
    }

    // Update key color
    const color = interpolateColor(
      this.options.colorScale[0],
      this.options.colorScale[1],
      intensity
    );
    
    if (keyMesh.material instanceof THREE.MeshLambertMaterial) {
      keyMesh.material.color.setStyle(color);
    }

    // Update label with frequency count
    if (this.options.showLabels && frequency > 0) {
      this.updateKeyLabel(keyPos, frequency);
    }
  }

  private animateKeyHeight(keyMesh: THREE.Mesh, targetHeight: number): void {
    const currentHeight = keyMesh.scale.y;
    const duration = this.options.animationDuration;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const newHeight = currentHeight + (targetHeight - currentHeight) * easeOut;
      this.setKeyHeight(keyMesh, newHeight);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }

  private setKeyHeight(keyMesh: THREE.Mesh, height: number): void {
    keyMesh.scale.y = height;
    keyMesh.position.y = this.layout.keyDepth / 2 * height + this.options.minHeight;
  }

  private updateKeyLabel(keyPos: Key3DPosition, frequency: number): void {
    const labelMesh = this.labelMeshes.get(keyPos.key);
    if (!labelMesh) return;

    // Update label text to show frequency
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    
    canvas.width = 128;
    canvas.height = 128;
    
    context.font = '32px Arial';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    
    // Draw key name
    context.fillText(
      keyPos.key === ' ' ? 'Space' : keyPos.key.toUpperCase(),
      64,
      40
    );
    
    // Draw frequency
    context.font = '24px Arial';
    context.fillStyle = '#ffff00';
    context.fillText(frequency.toString(), 64, 80);

    // Update texture
    const texture = new THREE.CanvasTexture(canvas);
    if (labelMesh.material instanceof THREE.MeshBasicMaterial) {
      labelMesh.material.map = texture;
      labelMesh.material.needsUpdate = true;
    }
  }

  public resize(width: number, height: number): void {
    this.options.width = width;
    this.options.height = height;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(width, height);
  }

  public animate(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.startAnimation();
  }

  public setTheme(colorScale: [string, string]): void {
    this.options.colorScale = colorScale;
    
    // Update existing keys
    if (this.currentData) {
      this.update(this.currentData);
    }
  }

  public toggleWireframe(): void {
    this.options.wireframe = !this.options.wireframe;
    
    this.keyMeshes.forEach(keyMesh => {
      if (keyMesh.material instanceof THREE.MeshLambertMaterial) {
        keyMesh.material.wireframe = this.options.wireframe;
      }
    });
  }

  public resetCamera(): void {
    this.camera.position.set(...this.options.cameraPosition);
    this.camera.lookAt(0, 0, 0);
  }

  public dispose(): void {
    // Stop animation
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    // Clean up Three.js objects
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        if (object.material instanceof THREE.Material) {
          object.material.dispose();
        }
      }
    });

    this.renderer.dispose();
    this.keyMeshes.clear();
    this.labelMeshes.clear();
  }
}

/**
 * Generate 3D Heatmap
 * @param container HTML element to render the 3D heatmap in
 * @param data Heatmap data to visualize
 * @param options 3D visualization options
 * @param layout Keyboard layout to use (default: QWERTY)
 * @returns ThreeJS heatmap instance
 */
export function generate3DHeatmap(
  container: HTMLElement,
  data: any,
  options: Heatmap3DOptions = {},
  layout: Keyboard3DLayout = QWERTY_3D_LAYOUT
): ThreeJSHeatmap {
  const heatmap = new ThreeJSHeatmapImpl(container, layout, options);
  
  if (data) {
    const prepared3DData = prepare3DData(data);
    heatmap.update(prepared3DData);
  }
  
  return heatmap;
}

/**
 * Create 3D Heatmap with Turkish F Layout
 */
export function generate3DTurkishFHeatmap(
  container: HTMLElement,
  data: any,
  options: Heatmap3DOptions = {}
): ThreeJSHeatmap {
  return generate3DHeatmap(container, data, options, TURKISH_F_3D_LAYOUT);
}

/**
 * Default 3D Themes
 */
export const HEATMAP_3D_THEMES = {
  ocean: ['#e3f2fd', '#1976d2'] as [string, string],
  forest: ['#e8f5e8', '#2e7d32'] as [string, string],
  sunset: ['#fff3e0', '#f57c00'] as [string, string],
  cherry: ['#fce4ec', '#c2185b'] as [string, string],
  night: ['#263238', '#37474f'] as [string, string],
  neon: ['#0a0a0a', '#00ff41'] as [string, string],
  purple: ['#f3e5f5', '#7b1fa2'] as [string, string],
  fire: ['#fff8e1', '#d84315'] as [string, string]
}; 